import { printEmployeeList, sampleEmployees } from "./common/sample-data";

// ============================================================================
// MAPEO DE HERENCIA - DEMOSTRACIÓN PRINCIPAL
// ============================================================================

function showWelcome() {
  console.log("=".repeat(80));
  console.log("🏗️  MAPEO DE HERENCIA EN BASES DE DATOS");
  console.log("=".repeat(80));
  console.log(
    "Este proyecto demuestra las 3 estrategias principales para mapear"
  );
  console.log("herencia en bases de datos relacionales:");
  console.log("");
  console.log("1. 📊 TABLE PER HIERARCHY (TPH)");
  console.log("   • Una sola tabla con discriminador");
  console.log("   • Campos específicos pueden ser NULL");
  console.log("   • Consultas polimórficas simples");
  console.log("");
  console.log("2. 🏢 TABLE PER CLASS (TPC)");
  console.log("   • Tabla base + tablas específicas con FK");
  console.log("   • Sin campos NULL innecesarios");
  console.log("   • Requiere JOINs para datos completos");
  console.log("");
  console.log("3. 🗂️  TABLE PER CONCRETE CLASS (TPCC)");
  console.log("   • Tabla independiente por clase concreta");
  console.log("   • Todos los campos duplicados");
  console.log("   • Máximo rendimiento para consultas específicas");
  console.log("");
  console.log("=".repeat(80));
}

function showAvailableCommands() {
  console.log("\n📋 COMANDOS DISPONIBLES:");
  console.log("=".repeat(50));
  console.log("");
  console.log("🔧 SQL PURO:");
  console.log("   npm run table-per-hierarchy-sql");
  console.log("   npm run table-per-class-sql");
  console.log("   npm run table-per-concrete-sql");
  console.log("   npm run all-sql");
  console.log("");
  console.log("🛠️  TYPEORM:");
  console.log("   npm run table-per-hierarchy-orm");
  console.log("   npm run table-per-class-orm");
  console.log("   npm run table-per-concrete-orm");
  console.log("   npm run all-orm");
  console.log("");
  console.log("📊 COMPARACIÓN:");
  console.log("   npm run dev  (este comando)");
  console.log("");
}

function showComparisonTable() {
  console.log("📊 COMPARACIÓN DE ESTRATEGIAS:");
  console.log("=".repeat(80));
  console.log(
    "| Aspecto                  | TPH        | TPC        | TPCC       |"
  );
  console.log(
    "|--------------------------|------------|------------|------------|"
  );
  console.log(
    "| Número de tablas         | 1          | n+1        | n          |"
  );
  console.log(
    "| Campos NULL              | Muchos     | Ninguno    | Ninguno    |"
  );
  console.log(
    "| JOINs requeridos         | Ninguno    | Sí         | Ninguno    |"
  );
  console.log(
    "| Consultas polimórficas   | Simples    | UNIONs     | UNIONs++   |"
  );
  console.log(
    "| Consultas específicas    | Filtros    | JOINs      | Directas   |"
  );
  console.log(
    "| Integridad referencial   | Limitada   | Completa   | Por tabla  |"
  );
  console.log(
    "| Rendimiento              | Bueno      | Medio      | Excelente* |"
  );
  console.log(
    "| Mantenimiento            | Fácil      | Medio      | Complejo   |"
  );
  console.log(
    "| Duplicación de esquema   | Ninguna    | Poca       | Total      |"
  );
  console.log(
    "| Escalabilidad            | Limitada   | Buena      | Excelente  |"
  );
  console.log("=".repeat(80));
  console.log(
    "* Excelente para consultas específicas, complejo para polimórficas"
  );
}

function showUseCases() {
  console.log("\n🎯 CUÁNDO USAR CADA ESTRATEGIA:");
  console.log("=".repeat(50));
  console.log("");
  console.log("✅ USE TABLE PER HIERARCHY (TPH) CUANDO:");
  console.log("   • La jerarquía es simple y estable");
  console.log("   • Necesita consultas polimórficas frecuentes");
  console.log("   • No le importan los campos NULL");
  console.log("   • Prioriza simplicidad y rapidez de desarrollo");
  console.log("   • La mayoría de campos son compartidos");
  console.log("");
  console.log("✅ USE TABLE PER CLASS (TPC) CUANDO:");
  console.log("   • Quiere evitar campos NULL");
  console.log("   • Necesita integridad referencial específica");
  console.log("   • La jerarquía es moderadamente compleja");
  console.log("   • Busca balance entre normalización y rendimiento");
  console.log("   • Los tipos tienen campos específicos importantes");
  console.log("");
  console.log("✅ USE TABLE PER CONCRETE CLASS (TPCC) CUANDO:");
  console.log("   • Prioriza el rendimiento de consultas específicas");
  console.log("   • Las clases tienen pocos campos en común");
  console.log("   • Raramente necesita consultas polimórficas");
  console.log("   • Puede manejar la duplicación de esquema");
  console.log("   • Cada tipo puede evolucionar independientemente");
}

function showImplementationExamples() {
  console.log("\n💡 EJEMPLOS DE IMPLEMENTACIÓN:");
  console.log("=".repeat(50));
  console.log("");
  console.log("📁 ESTRUCTURA DEL PROYECTO:");
  console.log("   src/");
  console.log("   ├── common/                    # Entidades TypeScript base");
  console.log("   ├── table-per-hierarchy/       # Estrategia TPH");
  console.log("   │   ├── sql/example.ts        # SQL puro");
  console.log("   │   └── orm/                  # TypeORM");
  console.log("   ├── table-per-class/          # Estrategia TPC");
  console.log("   │   ├── sql/example.ts        # SQL puro");
  console.log("   │   └── orm/                  # TypeORM");
  console.log("   └── table-per-concrete/       # Estrategia TPCC");
  console.log("       ├── sql/example.ts        # SQL puro");
  console.log("       └── orm/                  # TypeORM");
  console.log("");
  console.log("🏗️ CADA EJEMPLO INCLUYE:");
  console.log("   • Creación de esquema de base de datos");
  console.log("   • Inserción de datos de ejemplo");
  console.log("   • Consultas polimórficas y específicas");
  console.log("   • Análisis de rendimiento y estructura");
  console.log("   • Ventajas y desventajas de cada estrategia");
}

async function main() {
  showWelcome();

  // Mostrar datos de ejemplo que usamos
  printEmployeeList(sampleEmployees, "DATOS DE EJEMPLO UTILIZADOS");

  showComparisonTable();
  showUseCases();
  showImplementationExamples();
  showAvailableCommands();

  console.log("\n🚀 ¡Ejecute los comandos para ver cada estrategia en acción!");
  console.log("=".repeat(80));
}

if (require.main === module) {
  main().catch(console.error);
}

export { main };
