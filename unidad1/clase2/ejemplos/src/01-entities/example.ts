import "reflect-metadata";
import { DataSource } from "typeorm";
import { createDataSource } from "../common/data-source";
import { User } from "./entities/User";
import { Product } from "./entities/Product";
import { Profile } from "../03-relations/entities/Profile";

async function runEntitiesExample() {
  console.log("🚀 Iniciando ejemplo de Entidades Básicas...\n");

  let dataSource: DataSource | undefined;
  try {
    // Inicializar DataSource específico para este ejemplo
    dataSource = createDataSource("entities-example.sqlite", [
      User,
      Product,
      // Incluimos Profile para que TypeORM tenga la metadata de la relación opcional User#profile
      Profile,
    ]);
    await dataSource.initialize();
    console.log("✅ Conexión a la base de datos establecida\n");

    // Obtener repositorios
    const userRepository = dataSource.getRepository(User);
    const productRepository = dataSource.getRepository(Product);

    // Limpiar datos previos para evitar conflictos de UNIQUE
    await productRepository.clear();
    await userRepository.clear();

    // === EJEMPLOS CON USUARIOS ===
    console.log("👥 CRUD de Usuarios:");
    console.log("=".repeat(40));

    // Crear usuarios
    const user1 = userRepository.create({
      firstName: "Juan",
      lastName: "Pérez",
      email: "juan@example.com",
      age: 25,
      role: "user",
      salary: 50000.0,
      bio: "Desarrollador frontend con 3 años de experiencia",
    });

    const user2 = userRepository.create({
      firstName: "María",
      lastName: "García",
      email: "maria@example.com",
      age: 30,
      role: "admin",
      salary: 75000.0,
    });

    const user3 = userRepository.create({
      firstName: "Carlos",
      lastName: "López",
      email: "carlos@example.com",
      age: 28,
      role: "user",
      isActive: false,
    });

    // Guardar usuarios
    await userRepository.save([user1, user2, user3]);
    console.log("✅ Usuarios creados exitosamente");

    // Leer usuarios
    const allUsers = await userRepository.find();
    console.log(`📋 Total de usuarios: ${allUsers.length}`);

    allUsers.forEach((user) => {
      console.log(`  • ${user.getFullName()} (${user.email}) - ${user.role}`);
      if (user.isAdmin()) {
        console.log("    🛡️  Es administrador");
      }
    });

    // Buscar usuario específico
    const adminUser = await userRepository.findOne({
      where: { role: "admin" },
    });
    console.log(`\n🔍 Primer admin encontrado: ${adminUser?.getFullName()}`);

    // Actualizar usuario
    await userRepository.update(user1.id, {
      age: 26,
      salary: 55000.0,
    });
    console.log("✏️  Usuario actualizado");

    // === EJEMPLOS CON PRODUCTOS ===
    console.log("\n📦 CRUD de Productos:");
    console.log("=".repeat(40));

    // Crear productos
    const product1 = productRepository.create({
      name: "Laptop Gaming",
      description: "Laptop de alta gama para gaming",
      price: 1500.0,
      stock: 10,
      category: "Electronics",
      weight: 2.5,
      metadata: {
        brand: "TechCorp",
        color: "Negro",
        size: "15.6 pulgadas",
        tags: ["gaming", "laptop", "high-performance"],
      },
    });

    const product2 = productRepository.create({
      name: "Mouse Inalámbrico",
      description: "Mouse ergonómico inalámbrico",
      price: 45.99,
      stock: 50,
      category: "Accessories",
      weight: 0.1,
      metadata: {
        brand: "ErgoTech",
        color: "Blanco",
        tags: ["wireless", "ergonomic", "mouse"],
      },
    });

    const product3 = productRepository.create({
      name: "Teclado Mecánico",
      description: "Teclado mecánico RGB",
      price: 120.0,
      stock: 0, // Sin stock
      category: "Accessories",
      weight: 0.8,
      metadata: {
        brand: "KeyMaster",
        color: "RGB",
        tags: ["mechanical", "rgb", "keyboard"],
      },
    });

    // Guardar productos
    await productRepository.save([product1, product2, product3]);
    console.log("✅ Productos creados exitosamente");

    // Leer productos
    const allProducts = await productRepository.find();
    console.log(`📋 Total de productos: ${allProducts.length}`);

    allProducts.forEach((product) => {
      console.log(`  • ${product.name} - $${product.price}`);
      console.log(`    SKU: ${product.sku}`);
      console.log(`    Stock: ${product.stock} unidades`);
      console.log(`    Valor total: $${product.calculateTotalValue()}`);
      console.log(`    En stock: ${product.isInStock() ? "✅ Sí" : "❌ No"}`);
      console.log(`    Metadata: ${JSON.stringify(product.metadata)}`);
      console.log("");
    });

    // Probar lógica de negocio
    console.log("🔧 Probando lógica de negocio:");
    console.log("=".repeat(40));

    try {
      // Intentar reducir stock
      const laptop = await productRepository.findOne({
        where: { name: "Laptop Gaming" },
      });
      if (laptop) {
        console.log(`Stock inicial de ${laptop.name}: ${laptop.stock}`);

        // Reducir stock
        laptop.reduceStock(2);
        await productRepository.save(laptop);
        console.log(`✅ Stock reducido. Nuevo stock: ${laptop.stock}`);

        // Intentar vender más de lo disponible
        try {
          laptop.reduceStock(15);
        } catch (error) {
          console.log(`❌ Error esperado: ${(error as Error).message}`);
        }
      }
    } catch (error) {
      console.error("Error en lógica de negocio:", error);
    }

    // Consultas más complejas
    console.log("\n🔍 Consultas avanzadas:");
    console.log("=".repeat(40));

    // Usuarios activos
    const activeUsers = await userRepository.find({
      where: { isActive: true },
      select: ["id", "firstName", "lastName", "email", "role"],
    });
    console.log(`👥 Usuarios activos: ${activeUsers.length}`);

    // Productos en stock
    const availableProducts = await productRepository.find({
      where: { isAvailable: true },
      order: { price: "ASC" },
    });
    console.log(`📦 Productos disponibles: ${availableProducts.length}`);

    // Productos por categoría
    const electronics = await productRepository.find({
      where: { category: "Electronics" },
    });
    console.log(`🔌 Productos de electrónicos: ${electronics.length}`);

    console.log("\n✅ Ejemplo de entidades básicas completado exitosamente!");
  } catch (error) {
    console.error("❌ Error ejecutando el ejemplo:", error);
  } finally {
    // Cerrar conexión
    try {
      if (dataSource && dataSource.isInitialized) {
        await dataSource.destroy();
      }
    } finally {
      console.log("🔐 Conexión cerrada");
    }
  }
}

// Ejecutar el ejemplo
runEntitiesExample().catch(console.error);
