import "reflect-metadata";
import { DataSource, QueryRunner } from "typeorm";
import { User } from "./entities/User";
import { Category } from "./entities/Category";
import { Product } from "./entities/Product";
import { Order } from "./entities/Order";
import { OrderItem } from "./entities/OrderItem";

// Configuración de DataSource optimizada
const AppDataSource = new DataSource({
  type: "sqlite",
  database: "optimization-example.sqlite",
  synchronize: true,
  logging: false, // Desactivar logging para claridad en demos
  entities: [User, Category, Product, Order, OrderItem],
  // Configuración de pool de conexiones (para PostgreSQL/MySQL)
  // maxQueryExecutionTime: 1000, // Log queries que tomen más de 1s
});

class OptimizationDemo {
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  // 1. DEMOSTRACIÓN DEL PROBLEMA N+1
  async demonstrateN1Problem() {
    console.log("\n🔴 DEMOSTRACIÓN: Problema N+1");
    console.log("==================================================");

    const start = Date.now();

    // ❌ MAL: Esto causará N+1 queries
    const users = await this.dataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .where("user.status = :status", { status: "active" })
      .limit(5)
      .getMany();

    console.log(`📊 Usuarios obtenidos: ${users.length}`);

    // Cada iteración ejecutará una query adicional
    for (const user of users) {
      const orders = await user.orders; // ❌ Una query por usuario
      console.log(`👤 ${user.fullName}: ${orders.length} pedidos`);
    }

    const duration = Date.now() - start;
    console.log(`⏱️ Tiempo total: ${duration}ms`);
    console.log(
      `🔢 Queries ejecutadas: 1 (usuarios) + ${users.length} (pedidos) = ${
        1 + users.length
      }`
    );
  }

  // 2. SOLUCIÓN AL PROBLEMA N+1
  async solveN1Problem() {
    console.log("\n✅ SOLUCIÓN: Evitar problema N+1");
    console.log("==================================================");

    const start = Date.now();

    // ✅ BIEN: Una sola query con JOIN
    const usersWithOrders = await this.dataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.orders", "order")
      .where("user.status = :status", { status: "active" })
      .limit(5)
      .getMany();

    console.log(`📊 Usuarios obtenidos: ${usersWithOrders.length}`);

    // No hay queries adicionales porque ya están cargados con JOIN
    for (const user of usersWithOrders) {
      const orders = await user.orders;
      console.log(`👤 ${user.fullName}: ${orders.length} pedidos`);
    }

    const duration = Date.now() - start;
    console.log(`⏱️ Tiempo total: ${duration}ms`);
    console.log(`🔢 Queries ejecutadas: 1 (con JOIN)`);
  }

  // 3. CONSULTAS OPTIMIZADAS CON ÍNDICES
  async demonstrateIndexOptimization() {
    console.log("\n🚀 DEMOSTRACIÓN: Optimización con Índices");
    console.log("==================================================");

    // ✅ Consulta optimizada usando índices
    console.log("📈 Consulta usando índice compuesto (categoryId + price):");
    const expensiveProductsInCategory = await this.dataSource
      .getRepository(Product)
      .createQueryBuilder("product")
      .where("product.categoryId = :categoryId", { categoryId: 1 })
      .andWhere("product.price > :minPrice", { minPrice: 100 })
      .andWhere("product.isActive = :isActive", { isActive: true })
      .orderBy("product.price", "DESC")
      .limit(10)
      .getMany();

    console.log(
      `🛍️ Productos caros encontrados: ${expensiveProductsInCategory.length}`
    );

    // ✅ Consulta usando índice de texto
    console.log("\n🔍 Búsqueda por nombre usando índice:");
    const searchResults = await this.dataSource
      .getRepository(Product)
      .createQueryBuilder("product")
      .where("product.name LIKE :search", { search: "%Producto%" })
      .andWhere("product.isActive = :isActive", { isActive: true })
      .orderBy("product.rating", "DESC")
      .limit(5)
      .getMany();

    console.log(`🔍 Resultados de búsqueda: ${searchResults.length}`);
  }

  // 4. SELECT ESPECÍFICOS PARA PERFORMANCE
  async demonstrateSpecificSelects() {
    console.log("\n⚡ DEMOSTRACIÓN: SELECT específicos");
    console.log("==================================================");

    // ❌ MAL: Seleccionar todos los campos
    console.log("❌ Query con SELECT *:");
    const allFieldsStart = Date.now();
    const allFields = await this.dataSource
      .getRepository(Product)
      .find({ take: 100 });
    const allFieldsDuration = Date.now() - allFieldsStart;
    console.log(`⏱️ Tiempo SELECT *: ${allFieldsDuration}ms`);

    // ✅ BIEN: Seleccionar solo campos necesarios
    console.log("\n✅ Query con SELECT específico:");
    const specificStart = Date.now();
    const specificFields = await this.dataSource
      .getRepository(Product)
      .createQueryBuilder("product")
      .select(["product.id", "product.name", "product.price", "product.rating"])
      .take(100)
      .getMany();
    const specificDuration = Date.now() - specificStart;
    console.log(`⏱️ Tiempo SELECT específico: ${specificDuration}ms`);

    if (allFieldsDuration > 0) {
      console.log(
        `📊 Mejora de performance: ${(
          ((allFieldsDuration - specificDuration) / allFieldsDuration) *
          100
        ).toFixed(1)}%`
      );
    } else {
      console.log(`📊 Ambas consultas muy rápidas (<1ms)`);
    }
  }

  // 5. OPERACIONES EN LOTE (BATCH OPERATIONS)
  async demonstrateBatchOperations() {
    console.log("\n🔥 DEMOSTRACIÓN: Operaciones en lote");
    console.log("==================================================");

    // ❌ MAL: Insertar uno por uno
    console.log("❌ Inserción individual:");
    const individualStart = Date.now();
    const userRepo = this.dataSource.getRepository(User);

    for (let i = 100; i < 110; i++) {
      await userRepo.save({
        firstName: `User${i}`,
        lastName: `Test`,
        email: `user${i}@individual.com`,
        status: "active" as const,
      });
    }
    const individualDuration = Date.now() - individualStart;
    console.log(`⏱️ Tiempo inserción individual: ${individualDuration}ms`);

    // ✅ BIEN: Insertar en lote
    console.log("\n✅ Inserción en lote:");
    const batchStart = Date.now();
    const usersToInsert = [];
    for (let i = 200; i < 210; i++) {
      usersToInsert.push({
        firstName: `BatchUser${i}`,
        lastName: `Test`,
        email: `user${i}@batch.com`,
        status: "active" as const,
      });
    }
    await userRepo.save(usersToInsert);
    const batchDuration = Date.now() - batchStart;
    console.log(`⏱️ Tiempo inserción en lote: ${batchDuration}ms`);

    if (individualDuration > 0) {
      console.log(
        `📊 Mejora de performance: ${(
          ((individualDuration - batchDuration) / individualDuration) *
          100
        ).toFixed(1)}%`
      );
    } else {
      console.log(`📊 Ambas operaciones muy rápidas (<1ms)`);
    }
  }

  // 6. TRANSACCIONES OPTIMIZADAS
  async demonstrateOptimizedTransactions() {
    console.log("\n💰 DEMOSTRACIÓN: Transacciones optimizadas");
    console.log("==================================================");

    await this.dataSource.transaction(async (manager) => {
      console.log(
        "🔄 Creando pedido con múltiples items en una transacción..."
      );

      // Buscar usuario y productos en una sola consulta cada uno
      const user = await manager.findOne(User, {
        where: { id: 1 },
      });

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      // Crear pedido
      const order = manager.create(Order, {
        userId: user.id,
        status: "pending",
        total: 0,
        itemCount: 0,
      });

      const savedOrder = await manager.save(order);

      // Obtener productos para el pedido
      const products = await manager.find(Product, {
        where: { isActive: true },
        take: 3,
      });

      if (products.length === 0) {
        throw new Error("No hay productos disponibles");
      }

      // Crear items del pedido en lote
      const orderItems = products.map((product, index) =>
        manager.create(OrderItem, {
          orderId: savedOrder.id,
          productId: product.id,
          quantity: index + 1,
          unitPrice: product.price,
          totalPrice: product.price * (index + 1),
          productName: product.name,
          productSku: product.sku,
        })
      );

      await manager.save(orderItems);

      // Actualizar totales del pedido
      const total = orderItems.reduce(
        (sum, item) => sum + Number(item.totalPrice),
        0
      );
      await manager.update(Order, savedOrder.id, {
        total,
        itemCount: orderItems.length,
      });

      console.log(
        `✅ Pedido creado con ${
          orderItems.length
        } items, total: $${total.toFixed(2)}`
      );
    });
  }

  // 7. MONITORING DE PERFORMANCE
  async demonstratePerformanceMonitoring() {
    console.log("\n📊 DEMOSTRACIÓN: Monitoring de performance");
    console.log("==================================================");

    // Query compleja para monitoring
    const start = Date.now();
    const complexQuery = await this.dataSource
      .getRepository(Order)
      .createQueryBuilder("order")
      .leftJoinAndSelect("order.user", "user")
      .leftJoinAndSelect("order.orderItems", "orderItem")
      .leftJoinAndSelect("orderItem.product", "product")
      .where("order.status IN (:...statuses)", {
        statuses: ["confirmed", "shipped", "pending"],
      })
      .andWhere("order.total > :minTotal", { minTotal: 0 })
      .orderBy("order.createdAt", "DESC")
      .take(5)
      .getMany();

    const duration = Date.now() - start;

    console.log(`📈 Query compleja ejecutada en: ${duration}ms`);
    console.log(`📦 Pedidos obtenidos: ${complexQuery.length}`);

    if (duration > 100) {
      console.log("⚠️ ALERTA: Query lenta detectada (>100ms)");
    } else {
      console.log("✅ Performance aceptable (<100ms)");
    }
  }

  // 8. OPTIMIZACIÓN DE MEMORIA
  async demonstrateMemoryOptimization() {
    console.log("\n🧠 DEMOSTRACIÓN: Optimización de memoria");
    console.log("==================================================");

    // ✅ Usar paginación para datasets grandes
    console.log("📄 Procesando datos con paginación:");

    const pageSize = 10;
    let page = 0;
    let hasMore = true;
    let totalProcessed = 0;

    while (hasMore && page < 3) {
      // Limitar a 3 páginas para demo
      const products = await this.dataSource
        .getRepository(Product)
        .createQueryBuilder("product")
        .where("product.isActive = :isActive", { isActive: true })
        .skip(page * pageSize)
        .take(pageSize)
        .getMany();

      if (products.length === 0) {
        hasMore = false;
      } else {
        console.log(`📦 Página ${page + 1}: ${products.length} productos`);
        totalProcessed += products.length;
        page++;

        if (products.length < pageSize) {
          hasMore = false;
        }
      }
    }

    console.log(
      `✅ Procesados ${totalProcessed} productos con memoria optimizada`
    );
  }
}

// Función para sembrar datos de prueba
async function seedTestData(dataSource: DataSource) {
  console.log("🌱 Sembrando datos de prueba...");

  // Limpiar datos existentes
  await dataSource.getRepository(OrderItem).clear();
  await dataSource.getRepository(Order).clear();
  await dataSource.getRepository(Product).clear();
  await dataSource.getRepository(Category).clear();
  await dataSource.getRepository(User).clear();

  // Crear categorías
  const categoryRepo = dataSource.getRepository(Category);
  const categories = await categoryRepo.save([
    {
      name: "Electrónicos",
      slug: "electronicos",
      description: "Dispositivos electrónicos",
      isActive: true,
      productCount: 0,
    },
    {
      name: "Ropa",
      slug: "ropa",
      description: "Vestimenta y accesorios",
      isActive: true,
      productCount: 0,
    },
  ]);

  // Crear productos
  const productRepo = dataSource.getRepository(Product);
  const products = [];
  for (let i = 1; i <= 50; i++) {
    products.push({
      name: `Producto ${i}`,
      sku: `PROD${i.toString().padStart(3, "0")}`,
      description: `Descripción del producto ${i}`,
      price: Math.random() * 200 + 10,
      stock: Math.floor(Math.random() * 100),
      isActive: true,
      rating: Math.random() * 5,
      totalSales: Math.floor(Math.random() * 1000),
      reviewCount: Math.floor(Math.random() * 100),
      categoryId: categories[i % 2].id,
    });
  }
  await productRepo.save(products);

  // Crear usuarios
  const userRepo = dataSource.getRepository(User);
  const users = [];
  for (let i = 1; i <= 20; i++) {
    users.push({
      firstName: `Usuario${i}`,
      lastName: `Apellido${i}`,
      email: `usuario${i}@ejemplo.com`,
      status: "active" as const,
      totalSpent: Math.random() * 1000,
      lastLoginAt: new Date(),
    });
  }
  await userRepo.save(users);

  // Crear algunos pedidos
  const orderRepo = dataSource.getRepository(Order);
  const orders = [];
  for (let i = 1; i <= 30; i++) {
    orders.push({
      status: ["pending", "confirmed", "shipped", "delivered"][
        Math.floor(Math.random() * 4)
      ] as any,
      total: Math.random() * 500 + 10,
      tax: 10,
      shipping: 5,
      itemCount: Math.floor(Math.random() * 5) + 1,
      userId: Math.floor(Math.random() * 20) + 1,
    });
  }
  await orderRepo.save(orders);

  console.log("✅ Datos de prueba sembrados exitosamente");
}

// Función principal
async function main() {
  try {
    console.log("🚀 INICIANDO EJEMPLOS DE OPTIMIZACIÓN TYPEORM");
    console.log("=".repeat(60));

    await AppDataSource.initialize();
    console.log("✅ Conexión a base de datos establecida");

    // Sembrar datos de prueba
    await seedTestData(AppDataSource);

    const demo = new OptimizationDemo(AppDataSource);

    // Ejecutar demostraciones
    await demo.demonstrateN1Problem();
    await demo.solveN1Problem();
    await demo.demonstrateIndexOptimization();
    await demo.demonstrateSpecificSelects();
    await demo.demonstrateBatchOperations();
    await demo.demonstrateOptimizedTransactions();
    await demo.demonstratePerformanceMonitoring();
    await demo.demonstrateMemoryOptimization();

    console.log("\n🎉 DEMOSTRACIONES COMPLETADAS");
    console.log("=".repeat(60));
    console.log("📚 Técnicas de optimización cubiertas:");
    console.log("  1. ✅ Solución al problema N+1");
    console.log("  2. ✅ Uso eficiente de índices");
    console.log("  3. ✅ SELECT específicos");
    console.log("  4. ✅ Operaciones en lote");
    console.log("  5. ✅ Transacciones optimizadas");
    console.log("  6. ✅ Monitoring de performance");
    console.log("  7. ✅ Optimización de memoria");
  } catch (error) {
    console.error("❌ Error en la demostración:", error);
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log("🔌 Conexión cerrada");
    }
  }
}

// Ejecutar si es el archivo principal
if (require.main === module) {
  main();
}

export { OptimizationDemo, AppDataSource };
