import "reflect-metadata";
import { createDataSource } from "./common/data-source";
import { User } from "./01-entities/entities/User";
import { Product } from "./01-entities/entities/Product";
import { UserWithRestrictions } from "./02-restrictions/entities/UserWithRestrictions";
import { CategoryEntity } from "./02-restrictions/entities/CategoryEntity";
import { Author } from "./03-relations/entities/Author";
import { Book } from "./03-relations/entities/Book";
import { Profile } from "./03-relations/entities/Profile";
import { Student } from "./03-relations/entities/Student";
import { Course } from "./03-relations/entities/Course";

async function setupDatabase() {
  console.log("🏗️  Configurando base de datos...");

  try {
    // Crear DataSource con todas las entidades
    const dataSource = createDataSource("typeorm-examples.sqlite", [
      User,
      Product,
      UserWithRestrictions,
      CategoryEntity,
      Author,
      Book,
      Profile,
      Student,
      Course,
    ]);

    // Inicializar DataSource
    await dataSource.initialize();
    console.log("✅ Base de datos inicializada");

    console.log("📋 Tablas creadas:");
    console.log("  - users");
    console.log("  - products");
    console.log("  - users_with_restrictions");
    console.log("  - categories");
    console.log("  - authors");
    console.log("  - books");
    console.log("  - profiles");
    console.log("  - students");
    console.log("  - courses");
    console.log("  - student_courses (tabla intermedia)");

    // Cerrar conexión
    await dataSource.destroy();
    console.log("✅ Configuración completada");
  } catch (error) {
    console.error("❌ Error configurando la base de datos:", error);
    process.exit(1);
  }
}

setupDatabase();
