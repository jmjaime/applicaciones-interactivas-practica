import "reflect-metadata";

console.log("=".repeat(80));
console.log("EJEMPLOS DE MAPEO DE HERENCIA CON TYPEORM");
console.log("=".repeat(80));
console.log();

console.log(
  "Este módulo incluye las tres estrategias principales de mapeo de herencia:"
);
console.log();

console.log("1. TABLE PER HIERARCHY (TPH)");
console.log("   - Una tabla para toda la jerarquía");
console.log("   - Uso de columna discriminadora");
console.log("   - Eficiente para consultas polimórficas");
console.log();

console.log("2. TABLE PER CLASS (TPC)");
console.log("   - Una tabla por cada clase concreta");
console.log("   - Duplicación de columnas comunes");
console.log("   - Útil cuando las clases son muy diferentes");
console.log();

// Nota: Joined Table (JT) no está soportado por TypeORM en esta versión
console.log();

console.log("=".repeat(80));
console.log("SCRIPTS DISPONIBLES:");
console.log("=".repeat(80));
console.log();

console.log("Para ejecutar todos los ejemplos de herencia:");
console.log("  npm run inheritance");
console.log();

console.log("Para ejecutar ejemplos específicos:");
console.log(
  "  npm run table-per-hierarchy    # TPH - Una tabla para toda la jerarquía"
);
console.log(
  "  npm run table-per-class        # TPC - Una tabla por clase concreta"
);
// JT removido
console.log();

console.log("=".repeat(80));
console.log("CONCEPTOS DEMOSTRADOS:");
console.log("=".repeat(80));
console.log();

console.log("✅ Decoradores TypeORM:");
console.log("   - @Entity() - Clase base");
console.log("   - @TableInheritance() - Configuración de herencia");
console.log("   - @ChildEntity() - Clases derivadas");
console.log("   - @Column() - Mapeo de propiedades");
console.log();

console.log("✅ Estrategias de herencia:");
console.log("   - Discriminador automático");
console.log("   - Polimorfismo transparente");
console.log("   - Consultas específicas por tipo");
console.log();

console.log("✅ Ventajas y desventajas:");
console.log("   - Rendimiento de consultas");
console.log("   - Normalización vs desnormalización");
console.log("   - Complejidad de esquema");
console.log();

console.log("=".repeat(80));
console.log("Para comenzar, ejecuta: npm run inheritance");
console.log("=".repeat(80));
