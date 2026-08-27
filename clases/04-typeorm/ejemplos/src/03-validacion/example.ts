import "reflect-metadata";
import { createDataSource } from "../common/data-source";
import { User, UserRole } from "./entities/User";
import { validate } from "class-validator";

// Misma entidad que el tema anterior (restricciones), ahora con
// class-validator encima. La diferencia clave a mostrar: esto NUNCA llega
// a tocar la base de datos — `validate()` corre en memoria, antes de
// cualquier `save()`, y devuelve un array de errores en vez de tirar una
// excepción de SQLite.
async function runValidacionExample() {
  console.log("Iniciando ejemplo de validación de aplicación...\n");

  const dataSource = createDataSource("validacion-example.sqlite", [User]);
  try {
    await dataSource.initialize();
    console.log("Conexión establecida\n");

    const userRepository = dataSource.getRepository(User);
    await userRepository.clear();

    console.log("Usuario válido:");
    console.log("=".repeat(50));
    const validUser = userRepository.create({
      firstName: "Ana",
      lastName: "Martínez",
      username: "ana_martinez",
      email: "ana@example.com",
      age: 25,
      salary: 45000,
      role: UserRole.USER,
    });
    const validErrors = await validate(validUser);
    if (validErrors.length === 0) {
      await userRepository.save(validUser);
      console.log("Sin errores de validación — usuario guardado");
    }

    console.log("\nUsuario con datos inválidos:");
    console.log("=".repeat(50));
    const invalidUser = userRepository.create({
      firstName: "A", // muy corto
      lastName: "", // vacío
      username: "ab", // muy corto
      email: "email-invalido", // no es un email
      age: 15, // menor a 18
      salary: -1000, // negativo
      role: "invalid_role" as UserRole, // no es un valor del enum
    });

    const validationErrors = await validate(invalidUser);
    console.log(`Errores encontrados: ${validationErrors.length}`);
    console.log("(nada de esto tocó la base de datos — el objeto ni se intentó guardar)");
    validationErrors.forEach((error) => {
      console.log(`  • ${error.property}: ${Object.values(error.constraints || {}).join(", ")}`);
    });

    console.log("\nEjemplo de validación completado.");
  } catch (error) {
    console.error("Error ejecutando el ejemplo:", error);
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
    console.log("Conexión cerrada");
  }
}

// 🔧 Probá vos: cambiar `age: 15` por `age: 200` y ver qué mensaje de
// @Max(120) aparece en el array de errores.
runValidacionExample().catch(console.error);
