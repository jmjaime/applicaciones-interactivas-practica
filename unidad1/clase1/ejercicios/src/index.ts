/**
 * Ejercicios Clase 1: Mapeo con SQL Plano
 *
 * Este archivo permite ejecutar todos los ejercicios de la clase 1:
 * - Ejercicio 1: Herencia con SQL (TPH, TPT, TPC)
 * - Ejercicio 2: Relaciones con SQL (1:1, 1:N, N:M)
 */

import { question } from "readline-sync";

// Función para mostrar menú principal
function showMainMenu(): void {
  console.log("\n=== EJERCICIOS CLASE 1: MAPEO CON SQL PLANO ===");
  console.log("1. Ejercicios de Herencia (TPH, TPT, TPC)");
  console.log("2. Ejercicios de Relaciones (1:1, 1:N, N:M)");
  console.log("3. Ejecutar todos los ejercicios");
  console.log("4. Salir");
}

// Función para mostrar menú de herencia
function showHerenciaMenu(): void {
  console.log("\n=== EJERCICIOS DE HERENCIA ===");
  console.log("1. Table-Per-Hierarchy (TPH)");
  console.log("2. Table-Per-Type (TPT)");
  console.log("3. Table-Per-Class (TPC)");
  console.log("4. Ejecutar todos los ejercicios de herencia");
  console.log("5. Volver al menú principal");
}

// Función para mostrar menú de relaciones
function showRelacionesMenu(): void {
  console.log("\n=== EJERCICIOS DE RELACIONES ===");
  console.log("1. One-to-One (1:1)");
  console.log("2. One-to-Many (1:N)");
  console.log("3. Many-to-Many (N:M)");
  console.log("4. Ejecutar todos los ejercicios de relaciones");
  console.log("5. Volver al menú principal");
}

// Función para ejecutar ejercicio TPH
async function runTPHExercise(): Promise<void> {
  console.log("\n🔧 Ejecutando ejercicio Table-Per-Hierarchy (TPH)...");
  console.log("═".repeat(60));

  try {
    const { TablePerHierarchySQL } = await import(
      "./01-herencia/table-per-hierarchy/sql/example"
    );
    const example = new TablePerHierarchySQL();
    await example.run();
  } catch (error) {
    console.error("❌ Error ejecutando TPH:", error);
  }
}

// Función para ejecutar ejercicio TPT
async function runTPTExercise(): Promise<void> {
  console.log("\n🔧 Ejecutando ejercicio Table-Per-Type (TPT)...");
  console.log("═".repeat(60));

  try {
    const { TablePerTypeSQL } = await import(
      "./01-herencia/table-per-type/sql/example"
    );
    const example = new TablePerTypeSQL();
    await example.run();
  } catch (error) {
    console.error("❌ Error ejecutando TPT:", error);
  }
}

// Función para ejecutar ejercicio TPC
async function runTPCExercise(): Promise<void> {
  console.log("\n🔧 Ejecutando ejercicio Table-Per-Class (TPC)...");
  console.log("═".repeat(60));

  try {
    const { TablePerClassSQL } = await import(
      "./01-herencia/table-per-class/sql/example"
    );
    const example = new TablePerClassSQL();
    await example.run();
  } catch (error) {
    console.error("❌ Error ejecutando TPC:", error);
  }
}

// Función para ejecutar ejercicio One-to-One
async function runOneToOneExercise(): Promise<void> {
  console.log("\n🔧 Ejecutando ejercicio One-to-One (1:1)...");
  console.log("═".repeat(60));

  try {
    const { OneToOneSQL } = await import(
      "./02-relaciones/one-to-one/sql/example"
    );
    const example = new OneToOneSQL();
    await example.run();
  } catch (error) {
    console.error("❌ Error ejecutando 1:1:", error);
  }
}

// Función para ejecutar ejercicio One-to-Many
async function runOneToManyExercise(): Promise<void> {
  console.log("\n🔧 Ejecutando ejercicio One-to-Many (1:N)...");
  console.log("═".repeat(60));

  try {
    const { OneToManySQL } = await import(
      "./02-relaciones/one-to-many/sql/example"
    );
    const example = new OneToManySQL();
    await example.run();
  } catch (error) {
    console.error("❌ Error ejecutando 1:N:", error);
  }
}

// Función para ejecutar ejercicio Many-to-Many
async function runManyToManyExercise(): Promise<void> {
  console.log("\n🔧 Ejecutando ejercicio Many-to-Many (N:M)...");
  console.log("═".repeat(60));

  try {
    const { ManyToManySQL } = await import(
      "./02-relaciones/many-to-many/sql/example"
    );
    const example = new ManyToManySQL();
    await example.run();
  } catch (error) {
    console.error("❌ Error ejecutando N:M:", error);
  }
}

// Función para ejecutar todos los ejercicios de herencia
async function runAllHerenciaExercises(): Promise<void> {
  console.log("\n🚀 Ejecutando todos los ejercicios de herencia...");
  await runTPHExercise();
  await runTPTExercise();
  await runTPCExercise();
}

// Función para ejecutar todos los ejercicios de relaciones
async function runAllRelacionesExercises(): Promise<void> {
  console.log("\n🚀 Ejecutando todos los ejercicios de relaciones...");
  await runOneToOneExercise();
  await runOneToManyExercise();
  await runManyToManyExercise();
}

// Función para manejar menú de herencia
async function handleHerenciaMenu(): Promise<void> {
  let continuar = true;

  while (continuar) {
    showHerenciaMenu();
    const opcion = question("\nSeleccione una opción (1-5): ");

    switch (opcion) {
      case "1":
        await runTPHExercise();
        break;
      case "2":
        await runTPTExercise();
        break;
      case "3":
        await runTPCExercise();
        break;
      case "4":
        await runAllHerenciaExercises();
        break;
      case "5":
        continuar = false;
        break;
      default:
        console.log(
          "\n❌ Opción no válida. Por favor, seleccione una opción del 1 al 5."
        );
    }

    if (continuar) {
      console.log("\n" + "=".repeat(50));
      question("Presione Enter para continuar...");
    }
  }
}

// Función para manejar menú de relaciones
async function handleRelacionesMenu(): Promise<void> {
  let continuar = true;

  while (continuar) {
    showRelacionesMenu();
    const opcion = question("\nSeleccione una opción (1-5): ");

    switch (opcion) {
      case "1":
        await runOneToOneExercise();
        break;
      case "2":
        await runOneToManyExercise();
        break;
      case "3":
        await runManyToManyExercise();
        break;
      case "4":
        await runAllRelacionesExercises();
        break;
      case "5":
        continuar = false;
        break;
      default:
        console.log(
          "\n❌ Opción no válida. Por favor, seleccione una opción del 1 al 5."
        );
    }

    if (continuar) {
      console.log("\n" + "=".repeat(50));
      question("Presione Enter para continuar...");
    }
  }
}

// Función principal
async function main(): Promise<void> {
  console.log("🚀 Iniciando ejercicios de Clase 1 - Mapeo con SQL Plano...");

  let continuar = true;

  while (continuar) {
    showMainMenu();

    const opcion = question("\nSeleccione una opción (1-4): ");

    switch (opcion) {
      case "1":
        await handleHerenciaMenu();
        break;

      case "2":
        await handleRelacionesMenu();
        break;

      case "3":
        console.log("\n🚀 Ejecutando todos los ejercicios...");
        await runAllHerenciaExercises();
        await runAllRelacionesExercises();
        break;

      case "4":
        console.log("\n👋 ¡Hasta la vista!");
        continuar = false;
        break;

      default:
        console.log(
          "\n❌ Opción no válida. Por favor, seleccione una opción del 1 al 4."
        );
    }

    if (continuar) {
      console.log("\n" + "=".repeat(50));
      question("Presione Enter para continuar...");
    }
  }
}

// Ejecutar si es el archivo principal
if (require.main === module) {
  main().catch(console.error);
}

export default main;
