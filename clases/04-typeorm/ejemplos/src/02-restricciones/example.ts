import "reflect-metadata";
import { createDataSource } from "../common/data-source";
import { User, UserRole } from "./entities/User";
import { QueryFailedError } from "typeorm";

// Este ejemplo muestra restricciones que vive la base de datos (SQLite),
// no la aplicación: @Check en columnas, unique: true, y qué pasa cuando se
// las viola. No usa class-validator — eso es 03-validacion.
async function runRestriccionesExample() {
  console.log("Iniciando ejemplo de restricciones de base de datos...\n");

  const dataSource = createDataSource("restricciones-example.sqlite", [User]);
  try {
    await dataSource.initialize();
    console.log("Conexión establecida\n");

    const userRepository = dataSource.getRepository(User);
    await userRepository.clear();

    console.log("Restricciones de la entidad User:");
    console.log("=".repeat(50));

    const user1 = userRepository.create({
      firstName: "Ana",
      lastName: "Martínez",
      username: "ana_martinez",
      email: "ana@example.com",
      age: 25,
      salary: 45000,
      role: UserRole.USER,
    });
    await userRepository.save(user1);
    console.log("Usuario válido guardado");

    // === email duplicado — viola `unique: true` de la columna ===
    console.log("\nProbando email duplicado (unique: true):");
    try {
      const duplicateEmail = userRepository.create({
        firstName: "Pedro",
        lastName: "González",
        username: "pedro123",
        email: "ana@example.com", // mismo email que user1
        age: 28,
        role: UserRole.USER,
      });
      await userRepository.save(duplicateEmail);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        console.log("Error de SQLite (esperado):", error.message);
      }
    }

    // === edad fuera de rango — viola el @Check de la clase ===
    console.log("\nProbando edad fuera de rango (@Check age >= 18 AND age <= 120):");
    try {
      const underage = userRepository.create({
        firstName: "Luis",
        lastName: "Pérez",
        username: "luis_menor",
        email: "luis@example.com",
        age: 15, // viola el CHECK
        role: UserRole.USER,
      });
      await userRepository.save(underage);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        console.log("Error de SQLite (esperado):", error.message);
      }
    }

    // === salario negativo — viola otro @Check ===
    console.log("\nProbando salario negativo (@Check salary >= 0):");
    try {
      const negativeSalary = userRepository.create({
        firstName: "Sofía",
        lastName: "Díaz",
        username: "sofia_diaz",
        email: "sofia@example.com",
        age: 29,
        salary: -1000, // viola el CHECK
        role: UserRole.USER,
      });
      await userRepository.save(negativeSalary);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        console.log("Error de SQLite (esperado):", error.message);
      }
    }

    const total = await userRepository.count();
    console.log(`\nTotal de usuarios guardados con éxito: ${total}`);
    console.log("\nEjemplo de restricciones completado.");
  } catch (error) {
    console.error("Error ejecutando el ejemplo:", error);
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
    console.log("Conexión cerrada");
  }
}

// 🔧 Probá vos: agregar `@Check(`"username" != ''`)` a nivel de clase y ver
// el error de SQLite al intentar guardar un usuario con username vacío.
runRestriccionesExample().catch(console.error);
