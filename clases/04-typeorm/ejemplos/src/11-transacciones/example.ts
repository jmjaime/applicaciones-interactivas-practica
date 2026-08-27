import "reflect-metadata";
import { DataSource, QueryRunner } from "typeorm";
import { User } from "./entities/User";
import { Account, AccountType } from "./entities/Account";
import {
  TransactionRecord,
  TransactionType,
  TransactionStatus,
} from "./entities/TransactionRecord";
import { Product } from "./entities/Product";
import { Order, OrderStatus } from "./entities/Order";
import { OrderItem } from "./entities/OrderItem";

// DataSource específico para este ejemplo
const AppDataSource = new DataSource({
  type: "sqljs",
  autoSave: true,
  location: "transactions-example.sqlite",
  synchronize: true,
  logging: true,
  entities: [User, Account, TransactionRecord, Product, Order, OrderItem],
});

// Clase para contar queries SQL
class QueryCounter {
  private count = 0;
  private queries: string[] = [];

  reset() {
    this.count = 0;
    this.queries = [];
  }

  increment(query: string) {
    this.count++;
    this.queries.push(query);
  }

  getCount(): number {
    return this.count;
  }

  showSummary(title: string) {
    console.log(`\n📊 ${title}`);
    console.log(`🔍 Queries ejecutadas: ${this.count}`);
  }
}

const queryCounter = new QueryCounter();

async function createSampleData() {
  console.log("📝 Creando datos de ejemplo...\n");

  // Limpiar datos previos
  await AppDataSource.manager.clear(OrderItem);
  await AppDataSource.manager.clear(Order);
  await AppDataSource.manager.clear(TransactionRecord);
  await AppDataSource.manager.clear(Account);
  await AppDataSource.manager.clear(User);
  await AppDataSource.manager.clear(Product);

  // Crear usuarios base
  const users = await AppDataSource.manager.save(User, [
    { name: "Alice Johnson", email: "alice@email.com", balance: 1000 },
    { name: "Bob Smith", email: "bob@email.com", balance: 500 },
    { name: "Charlie Brown", email: "charlie@email.com", balance: 0 },
  ]);

  // Crear productos para ejemplos de pedidos
  const products = await AppDataSource.manager.save(Product, [
    {
      name: "Laptop",
      price: 999.99,
      stock: 10,
      description: "Laptop de alta gama",
    },
    {
      name: "Mouse",
      price: 29.99,
      stock: 50,
      description: "Mouse inalámbrico",
    },
    {
      name: "Teclado",
      price: 89.99,
      stock: 30,
      description: "Teclado mecánico",
    },
    {
      name: "Monitor",
      price: 299.99,
      stock: 5,
      description: "Monitor 24 pulgadas",
    },
  ]);

  console.log("✅ Datos de ejemplo creados exitosamente!");
  return { users, products };
}

// CASO 1: TRANSACCIÓN SIMPLE
async function demonstrateSimpleTransaction() {
  console.log("\n" + "=".repeat(60));
  console.log("💰 CASO 1: TRANSACCIÓN SIMPLE");
  console.log("=".repeat(60));
  console.log("📄 Escenario: Crear usuario y su cuenta bancaria");

  queryCounter.reset();

  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    console.log("🔄 Iniciando transacción...");

    // Crear nuevo usuario
    const newUser = queryRunner.manager.create(User, {
      name: "Diana García",
      email: "diana@email.com",
      balance: 1500,
    });
    await queryRunner.manager.save(newUser);
    console.log(`✅ Usuario creado: ${newUser.displayInfo()}`);

    // Crear cuenta asociada
    const newAccount = queryRunner.manager.create(Account, {
      accountNumber: "ACC-001-2024",
      type: AccountType.CHECKING,
      balance: 1500,
      user: newUser,
    });
    await queryRunner.manager.save(newAccount);
    console.log(`✅ Cuenta creada: ${newAccount.displayInfo()}`);

    // Crear registro de transacción
    const transaction = queryRunner.manager.create(TransactionRecord, {
      type: TransactionType.DEPOSIT,
      amount: 1500,
      status: TransactionStatus.COMPLETED,
      description: "Depósito inicial",
      reference: "DEP-001",
      user: newUser,
    });
    transaction.markAsCompleted();
    await queryRunner.manager.save(transaction);
    console.log(`✅ Transacción registrada: ${transaction.displayInfo()}`);

    // Confirmar transacción
    await queryRunner.commitTransaction();
    console.log("✅ Transacción confirmada exitosamente");

    queryCounter.showSummary("Transacción Simple Completada");
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.error("❌ Error en transacción simple:", error);
  } finally {
    await queryRunner.release();
  }
}

// CASO 2: TRANSACCIÓN CON ROLLBACK
async function demonstrateTransactionRollback() {
  console.log("\n" + "=".repeat(60));
  console.log("🔄 CASO 2: TRANSACCIÓN CON ROLLBACK");
  console.log("=".repeat(60));
  console.log("📄 Escenario: Transferencia que falla por fondos insuficientes");

  queryCounter.reset();

  // Obtener usuarios para la transferencia
  const alice = await AppDataSource.manager.findOne(User, {
    where: { email: "alice@email.com" },
  });
  const bob = await AppDataSource.manager.findOne(User, {
    where: { email: "bob@email.com" },
  });

  if (!alice || !bob) {
    console.error("❌ No se encontraron usuarios para la transferencia");
    return;
  }

  console.log(`👤 Origen: ${alice.displayInfo()}`);
  console.log(`👤 Destino: ${bob.displayInfo()}`);

  const transferAmount = 1500; // Monto mayor al balance de Alice
  console.log(`💸 Intentando transferir: $${transferAmount}`);

  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    console.log("🔄 Iniciando transacción de transferencia...");

    // Crear registro de transacción para el remitente
    const senderTransaction = queryRunner.manager.create(TransactionRecord, {
      type: TransactionType.TRANSFER,
      amount: transferAmount,
      status: TransactionStatus.PENDING,
      description: `Transferencia a ${bob.name}`,
      reference: "TRF-001",
      user: alice,
    });
    await queryRunner.manager.save(senderTransaction);

    // Verificar fondos suficientes
    if (!alice.hasSufficientFunds(transferAmount)) {
      throw new Error(
        `Fondos insuficientes. Balance actual: $${alice.balance}, monto requerido: $${transferAmount}`
      );
    }

    // Si llegamos aquí, proceder con la transferencia
    alice.balance = Number(alice.balance) - transferAmount;
    bob.balance = Number(bob.balance) + transferAmount;

    await queryRunner.manager.save([alice, bob]);

    // Marcar transacción como completada
    senderTransaction.markAsCompleted();
    await queryRunner.manager.save(senderTransaction);

    await queryRunner.commitTransaction();
    console.log("✅ Transferencia completada exitosamente");
  } catch (error) {
    console.log("⚠️ Error detectado durante la transferencia:");
    console.log(`   ${error instanceof Error ? error.message : String(error)}`);

    // Rollback automático
    await queryRunner.rollbackTransaction();
    console.log("🔄 Transacción revertida (ROLLBACK)");

    // Marcar transacción como fallida (fuera de la transacción)
    const failedTransaction = await AppDataSource.manager.findOne(
      TransactionRecord,
      {
        where: { reference: "TRF-001" },
      }
    );
    if (failedTransaction) {
      failedTransaction.markAsFailed();
      await AppDataSource.manager.save(failedTransaction);
      console.log("📝 Transacción marcada como fallida en el registro");
    }

    queryCounter.showSummary("Transacción con Rollback");
  } finally {
    await queryRunner.release();
  }

  // Verificar que los balances no cambiaron
  const aliceAfter = await AppDataSource.manager.findOne(User, {
    where: { email: "alice@email.com" },
  });
  const bobAfter = await AppDataSource.manager.findOne(User, {
    where: { email: "bob@email.com" },
  });

  console.log("\n📊 Estado después del rollback:");
  console.log(`👤 ${aliceAfter?.displayInfo()}`);
  console.log(`👤 ${bobAfter?.displayInfo()}`);
  console.log("✅ Los balances permanecen sin cambios");
}

// CASO 3: TRANSACCIONES ANIDADAS
async function demonstrateNestedTransactions() {
  console.log("\n" + "=".repeat(60));
  console.log("🔗 CASO 3: TRANSACCIONES ANIDADAS");
  console.log("=".repeat(60));
  console.log(
    "📄 Escenario: Crear pedido con múltiples items y actualizar inventario"
  );

  queryCounter.reset();

  // Obtener usuario y productos
  const customer = await AppDataSource.manager.findOne(User, {
    where: { email: "bob@email.com" },
  });
  const products = await AppDataSource.manager.find(Product);

  if (!customer || products.length === 0) {
    console.error("❌ No se encontraron datos necesarios");
    return;
  }

  console.log(`👤 Cliente: ${customer.displayInfo()}`);
  console.log("📦 Productos disponibles:");
  products.forEach((product) => {
    console.log(`   ${product.displayInfo()}`);
  });

  // Definir items del pedido
  const orderItems = [
    { product: products[0], quantity: 1 }, // Laptop
    { product: products[1], quantity: 2 }, // Mouse x2
    { product: products[2], quantity: 1 }, // Teclado
  ];

  const totalAmount = orderItems.reduce((sum, item) => {
    return sum + Number(item.product.price) * item.quantity;
  }, 0);

  console.log(`💰 Total del pedido: $${totalAmount.toFixed(2)}`);

  // TRANSACCIÓN PRINCIPAL
  const mainQueryRunner = AppDataSource.createQueryRunner();
  await mainQueryRunner.connect();
  await mainQueryRunner.startTransaction();

  try {
    console.log("🔄 Iniciando transacción principal (crear pedido)...");

    // 1. Crear el pedido
    const order = mainQueryRunner.manager.create(Order, {
      orderNumber: `ORD-${Date.now()}`,
      user: customer,
      total: totalAmount,
      status: OrderStatus.PENDING,
    });
    await mainQueryRunner.manager.save(order);
    console.log(`✅ Pedido creado: ${order.displayInfo()}`);

    // 2. TRANSACCIÓN ANIDADA: Procesar cada item
    for (let i = 0; i < orderItems.length; i++) {
      const itemData = orderItems[i];

      console.log(
        `\n   🔗 Procesando item ${i + 1}: ${itemData.product.name} x${
          itemData.quantity
        }`
      );

      // Procesar item (dentro de la transacción principal)
      try {
        // Verificar stock disponible
        const currentProduct = await mainQueryRunner.manager.findOne(Product, {
          where: { id: itemData.product.id },
        });

        if (!currentProduct) {
          throw new Error(`Producto no encontrado: ${itemData.product.name}`);
        }

        if (!currentProduct.hasStock(itemData.quantity)) {
          throw new Error(
            `Stock insuficiente para ${currentProduct.name}. Stock: ${currentProduct.stock}, requerido: ${itemData.quantity}`
          );
        }

        // Reducir stock
        currentProduct.reduceStock(itemData.quantity);
        await mainQueryRunner.manager.save(currentProduct);
        console.log(`   📦 Stock actualizado: ${currentProduct.displayInfo()}`);

        // Crear item del pedido
        const orderItem = mainQueryRunner.manager.create(OrderItem, {
          order: order,
          product: currentProduct,
          quantity: itemData.quantity,
          unitPrice: currentProduct.price,
          subtotal: Number(currentProduct.price) * itemData.quantity,
        });
        orderItem.updateSubtotal();
        await mainQueryRunner.manager.save(orderItem);
        console.log(`   ✅ Item agregado: ${orderItem.displayInfo()}`);

        console.log(`   ✅ Item ${i + 1} procesado exitosamente`);
      } catch (error) {
        console.log(
          `   ❌ Error en item ${i + 1}: ${
            error instanceof Error ? error.message : String(error)
          }`
        );
        console.log(
          `   🔄 Error detectado - la transacción principal se revertirá`
        );

        // Esto hace que falle toda la transacción principal
        throw new Error(`Fallo al procesar item: ${itemData.product.name}`);
      }
    }

    // 3. Actualizar balance del usuario (simular pago)
    if (!customer.hasSufficientFunds(totalAmount)) {
      throw new Error(
        `Fondos insuficientes para completar el pedido. Balance: $${customer.balance}, total: $${totalAmount}`
      );
    }

    customer.balance = Number(customer.balance) - totalAmount;
    await mainQueryRunner.manager.save(customer);
    console.log(`💳 Pago procesado: $${totalAmount}`);

    // 4. Confirmar pedido
    order.confirm();
    order.updateTotal();
    await mainQueryRunner.manager.save(order);
    console.log(`✅ Pedido confirmado: ${order.displayInfo()}`);

    // 5. Crear registro de transacción
    const paymentTransaction = mainQueryRunner.manager.create(
      TransactionRecord,
      {
        type: TransactionType.PAYMENT,
        amount: totalAmount,
        status: TransactionStatus.COMPLETED,
        description: `Pago del pedido ${order.orderNumber}`,
        reference: order.orderNumber,
        user: customer,
      }
    );
    paymentTransaction.markAsCompleted();
    await mainQueryRunner.manager.save(paymentTransaction);

    // Confirmar transacción principal
    await mainQueryRunner.commitTransaction();
    console.log("\n🎉 TRANSACCIÓN PRINCIPAL COMPLETADA EXITOSAMENTE");

    queryCounter.showSummary("Transacciones Anidadas Completadas");
  } catch (error) {
    await mainQueryRunner.rollbackTransaction();
    console.log(
      `\n❌ Error en transacción principal: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
    console.log("🔄 TODA la transacción revertida");

    queryCounter.showSummary("Transacciones Anidadas con Rollback");
  } finally {
    await mainQueryRunner.release();
  }

  // Mostrar estado final
  await showFinalState();
}

async function showFinalState() {
  console.log("\n" + "=".repeat(60));
  console.log("📊 ESTADO FINAL DEL SISTEMA");
  console.log("=".repeat(60));

  // Mostrar usuarios
  const users = await AppDataSource.manager.find(User);
  console.log("👥 Usuarios:");
  users.forEach((user) => {
    console.log(`   ${user.displayInfo()}`);
  });

  // Mostrar productos
  const products = await AppDataSource.manager.find(Product);
  console.log("\n📦 Inventario:");
  products.forEach((product) => {
    console.log(`   ${product.displayInfo()}`);
  });

  // Mostrar transacciones
  const transactions = await AppDataSource.manager.find(TransactionRecord, {
    relations: ["user"],
    order: { createdAt: "DESC" },
  });
  console.log("\n💳 Últimas transacciones:");
  transactions.slice(0, 5).forEach((transaction) => {
    console.log(
      `   ${transaction.displayInfo()} - Usuario: ${transaction.user.name}`
    );
  });

  // Mostrar pedidos
  const orders = await AppDataSource.manager.find(Order, {
    relations: ["user", "items", "items.product"],
    order: { createdAt: "DESC" },
  });
  console.log("\n📋 Pedidos:");
  orders.forEach((order) => {
    console.log(`   ${order.displayInfo()} - Cliente: ${order.user.name}`);
    if (order.items && order.items.length > 0) {
      order.items.forEach((item) => {
        console.log(`      • ${item.displayInfo()}`);
      });
    }
  });
}

async function showBestPractices() {
  console.log("\n" + "=".repeat(60));
  console.log("💡 MEJORES PRÁCTICAS PARA TRANSACCIONES");
  console.log("=".repeat(60));

  console.log("✅ USAR TRANSACCIONES CUANDO:");
  console.log("   • Múltiples operaciones deben completarse juntas");
  console.log("   • Los datos deben mantener consistencia");
  console.log("   • Se modifican tablas relacionadas");
  console.log("   • Se transfieren valores entre entidades");

  console.log("\n🔄 ROLLBACK AUTOMÁTICO:");
  console.log("   • Se ejecuta cuando hay cualquier error no capturado");
  console.log("   • Revierte TODAS las operaciones de la transacción");
  console.log("   • Mantiene la integridad de los datos");

  console.log("\n🔗 TRANSACCIONES ANIDADAS:");
  console.log("   • Usa savepoints para sub-transacciones");
  console.log("   • Permite rollback parcial");
  console.log("   • Útil para operaciones complejas");

  console.log("\n⚠️ CONSIDERACIONES:");
  console.log("   • Mantén las transacciones lo más cortas posible");
  console.log("   • Evita operaciones que requieren input del usuario");
  console.log("   • Siempre usa try/catch/finally");
  console.log("   • Libera recursos con release()");

  console.log("\n📝 TIPOS DE TRANSACCIONES:");
  console.log("   • QueryRunner: Control manual completo");
  console.log("   • @Transaction: Decorador automático");
  console.log("   • manager.transaction(): Wrapper funcional");
}

async function main() {
  try {
    console.log("🚀 Iniciando demostración de Transacciones en TypeORM\n");

    // Inicializar base de datos
    await AppDataSource.initialize();
    console.log("✅ Conexión a base de datos establecida");

    // Sincronizar esquemas
    await AppDataSource.synchronize();

    // Crear datos de ejemplo
    await createSampleData();

    // Ejecutar demostraciones
    await demonstrateSimpleTransaction();
    await demonstrateTransactionRollback();
    await demonstrateNestedTransactions();
    await showBestPractices();

    console.log("\n🎉 Demostración de transacciones completada exitosamente!");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
}

main();
