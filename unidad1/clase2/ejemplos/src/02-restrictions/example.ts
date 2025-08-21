import "reflect-metadata";
import { createDataSource } from "../common/data-source";
import {
  UserWithRestrictions,
  UserRole,
} from "./entities/UserWithRestrictions";
import { CategoryEntity } from "./entities/CategoryEntity";
import { validate } from "class-validator";
import { QueryFailedError } from "typeorm";

async function runRestrictionsExample() {
  console.log("🔒 Iniciando ejemplo de Restricciones y Validaciones...\n");

  try {
    // Inicializar DataSource específico para este ejemplo
    const dataSource = createDataSource("restrictions-example.sqlite", [
      UserWithRestrictions,
      CategoryEntity,
    ]);
    await dataSource.initialize();
    console.log("✅ Conexión a la base de datos establecida\n");

    // Obtener repositorios
    const userRepository = dataSource.getRepository(UserWithRestrictions);
    const categoryRepository = dataSource.getRepository(CategoryEntity);

    // === EJEMPLOS DE USUARIOS CON RESTRICCIONES ===
    console.log("👤 Restricciones de Usuarios:");
    console.log("=".repeat(50));

    // Crear usuarios válidos
    const validUser1 = userRepository.create({
      firstName: "Ana",
      lastName: "Martínez",
      username: "ana_martinez",
      email: "ana@example.com",
      age: 25,
      salary: 45000,
      role: UserRole.USER,
      phone: "11-1234-5678",
      biography:
        "Desarrolladora backend con experiencia en Node.js y TypeScript",
    });

    const validUser2 = userRepository.create({
      firstName: "Carlos",
      lastName: "Rodríguez",
      username: "carlos_admin",
      email: "carlos@example.com",
      age: 35,
      salary: 75000,
      role: UserRole.ADMIN,
      phone: "11-9876-5432",
    });

    // Validar antes de guardar
    console.log("🔍 Validando usuarios antes de guardar...");
    const errors1 = await validate(validUser1);
    const errors2 = await validate(validUser2);

    if (errors1.length === 0 && errors2.length === 0) {
      await userRepository.save([validUser1, validUser2]);
      console.log("✅ Usuarios válidos guardados exitosamente");
    } else {
      console.log("❌ Errores de validación encontrados");
    }

    // === PROBAR RESTRICCIONES DE BASE DE DATOS ===
    console.log("\n🚫 Probando restricciones de base de datos:");
    console.log("=".repeat(50));

    // Intentar crear usuario con email duplicado
    try {
      const duplicateEmailUser = userRepository.create({
        firstName: "Pedro",
        lastName: "González",
        username: "pedro123",
        email: "ana@example.com", // Email duplicado
        age: 28,
        role: UserRole.USER,
      });

      await userRepository.save(duplicateEmailUser);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        console.log("❌ Error esperado - Email duplicado:", (error as Error).message);
      }
    }

    // Intentar crear usuario con username duplicado
    try {
      const duplicateUsernameUser = userRepository.create({
        firstName: "Luis",
        lastName: "Pérez",
        username: "ana_martinez", // Username duplicado
        email: "luis@example.com",
        age: 30,
        role: UserRole.USER,
      });

      await userRepository.save(duplicateUsernameUser);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        console.log("❌ Error esperado - Username duplicado:", (error as Error).message);
      }
    }

    // === PROBAR VALIDACIONES DE CLASS-VALIDATOR ===
    console.log("\n✅ Probando validaciones de class-validator:");
    console.log("=".repeat(50));

    // Usuario con datos inválidos
    const invalidUser = userRepository.create({
      firstName: "A", // Muy corto
      lastName: "", // Vacío
      username: "ab", // Muy corto
      email: "email-invalido", // Email inválido
      age: 15, // Menor a 18
      salary: -1000, // Negativo
      role: "invalid_role" as UserRole, // Rol inválido
      phone: "123", // Muy corto
      biography: "a".repeat(600), // Muy largo
    });

    const validationErrors = await validate(invalidUser);
    if (validationErrors.length > 0) {
      console.log("❌ Errores de validación encontrados:");
      validationErrors.forEach((error) => {
        console.log(
          `  • ${error.property}: ${Object.values(error.constraints || {}).join(
            ", "
          )}`
        );
      });
    }

    // === EJEMPLOS DE CATEGORÍAS CON RESTRICCIONES ===
    console.log("\n📂 Restricciones de Categorías:");
    console.log("=".repeat(50));

    // Crear categorías válidas
    const category1 = categoryRepository.create({
      name: "Electrónicos",
      description: "Dispositivos y gadgets electrónicos",
      color: "#FF5733",
      imageUrl: "https://example.com/electronics.jpg",
      priority: 9,
      discountPercentage: 15.5,
      isFeatured: true,
      metadata: {
        seoTitle: "Electrónicos - Los mejores dispositivos",
        seoDescription: "Encuentra los mejores dispositivos electrónicos",
        keywords: ["electrónicos", "gadgets", "dispositivos"],
        customAttributes: {
          showInHomepage: true,
          hasSpecialOffers: true,
        },
      },
    });

    const category2 = categoryRepository.create({
      name: "Ropa & Accesorios",
      description: "Vestimenta y accesorios de moda",
      color: "#33FF57",
      priority: 7,
      discountPercentage: 10,
      metadata: {
        seoTitle: "Ropa y Accesorios de Moda",
        keywords: ["ropa", "moda", "accesorios"],
      },
    });

    // Validar y guardar categorías
    const categoryErrors1 = await validate(category1);
    const categoryErrors2 = await validate(category2);

    if (categoryErrors1.length === 0 && categoryErrors2.length === 0) {
      await categoryRepository.save([category1, category2]);
      console.log("✅ Categorías válidas guardadas exitosamente");

      // Mostrar información de categorías
      console.log("\n📋 Información de categorías:");
      console.log(`  • ${category1.getDisplayName()} (${category1.slug})`);
      console.log(`    Prioridad: ${category1.getPriorityLevel()}`);
      console.log(
        `    Descuento: ${
          category1.hasDiscount() ? `${category1.discountPercentage}%` : "No"
        }`
      );
      console.log(`    URL: ${category1.getUrl()}`);

      console.log(`  • ${category2.getDisplayName()} (${category2.slug})`);
      console.log(`    Prioridad: ${category2.getPriorityLevel()}`);
      console.log(
        `    Descuento: ${
          category2.hasDiscount() ? `${category2.discountPercentage}%` : "No"
        }`
      );
      console.log(`    URL: ${category2.getUrl()}`);
    }

    // === PROBAR HOOKS Y VALIDACIONES PERSONALIZADAS ===
    console.log("\n🔧 Probando hooks y validaciones personalizadas:");
    console.log("=".repeat(50));

    // Categoría con prioridad inválida
    try {
      const invalidPriorityCategory = categoryRepository.create({
        name: "Categoría Inválida",
        priority: 15, // Fuera del rango 1-10
      });

      await categoryRepository.save(invalidPriorityCategory);
    } catch (error) {
      console.log("❌ Error esperado - Prioridad inválida:", (error as Error).message);
    }

    // Categoría con descuento inválido
    try {
      const invalidDiscountCategory = categoryRepository.create({
        name: "Categoría con Descuento Inválido",
        discountPercentage: 150, // Fuera del rango 0-100
      });

      await categoryRepository.save(invalidDiscountCategory);
    } catch (error) {
      console.log("❌ Error esperado - Descuento inválido:", (error as Error).message);
    }

    // === CONSULTAS CON RESTRICCIONES ===
    console.log("\n🔍 Consultas con restricciones aplicadas:");
    console.log("=".repeat(50));

    // Usuarios adultos (aplicando restricción de edad)
    const adultUsers = await userRepository.find({
      where: { age: 18 }, // Solo usuarios de 18 años o más
      select: ["id", "firstName", "lastName", "age", "role"],
    });
    console.log(`👥 Usuarios adultos encontrados: ${adultUsers.length}`);

    // Categorías activas ordenadas por prioridad
    const activeCategories = await categoryRepository.find({
      where: { isActive: true },
      order: { priority: "DESC" },
    });
    console.log(`📂 Categorías activas: ${activeCategories.length}`);

    // Usuarios con salario especificado
    const usersWithSalary = await userRepository.find({
      where: { salary: 0 }, // Usuarios con salario >= 0
      select: ["id", "firstName", "lastName", "salary"],
    });
    console.log(
      `💰 Usuarios con salario especificado: ${usersWithSalary.length}`
    );

    // === ESTADÍSTICAS ===
    console.log("\n📊 Estadísticas:");
    console.log("=".repeat(50));

    const totalUsers = await userRepository.count();
    const activeUsers = await userRepository.count({
      where: { isActive: true },
    });
    const adminUsers = await userRepository.count({
      where: { role: UserRole.ADMIN },
    });
    const totalCategories = await categoryRepository.count();
    const featuredCategories = await categoryRepository.count({
      where: { isFeatured: true },
    });

    console.log(`📈 Total de usuarios: ${totalUsers}`);
    console.log(`✅ Usuarios activos: ${activeUsers}`);
    console.log(`🛡️  Usuarios administradores: ${adminUsers}`);
    console.log(`📂 Total de categorías: ${totalCategories}`);
    console.log(`⭐ Categorías destacadas: ${featuredCategories}`);

    console.log(
      "\n✅ Ejemplo de restricciones y validaciones completado exitosamente!"
    );
  } catch (error) {
    console.error("❌ Error ejecutando el ejemplo:", error);
  } finally {
    // Cerrar conexión
    try {
      const dsToClose = createDataSource("restrictions-example.sqlite", [
        UserWithRestrictions,
        CategoryEntity,
      ]);
      if (dsToClose.isInitialized) {
        await dsToClose.destroy();
      }
    } catch {}
    console.log("🔐 Conexión cerrada");
  }
}

// Ejecutar el ejemplo
runRestrictionsExample().catch(console.error);
