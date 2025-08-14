console.log("=".repeat(80));
console.log("EJEMPLOS DE MAPEO DE DATOS CON SQL PURO");
console.log("=".repeat(80));
console.log();

console.log(
  "Este proyecto incluye ejemplos de mapeo usando SQL puro (de simple a avanzado):"
);
console.log();

console.log("1. MAPEO BÁSICO (01-mapeo-basico/) - SQL PURO");
console.log("   - Clase simple → Tabla con columnas básicas");
console.log();

console.log("2. MAPPEO EMBEBIDO (02-mappeo-embebido/) - SQL PURO");
console.log("   - Mapeo de múltiples columnas a un objeto");
console.log("   - Mapeo de valores separados por coma");
console.log("   - Mapeo de datos JSON");
console.log();

console.log("3. MAPPEO DE HERENCIA (03-mappeo-herencia/) - SQL PURO");
console.log("   - Table Per Hierarchy (TPH) - SQL");
console.log("   - Table Per Class (TPC) - SQL");
console.log("   - Joined Table (JT) - SQL");
console.log("   📝 Nota: Los ejemplos ORM están en Clase II");
console.log();

console.log("4. MAPPEO DE RELACIONES (04-mappeo-relaciones/) - SQL PURO");
console.log("   - Relaciones 1:1, 1:N, N:1, N:M con SQL");
console.log("   - Gestión de libros, autores y reseñas (SQL puro)");
console.log();

console.log("=".repeat(80));
console.log("SCRIPTS DISPONIBLES:");
console.log("=".repeat(80));
console.log();

console.log("Para ejecutar el ejemplo básico:");
console.log("  npm run mapeo-basico-sql");
console.log();

console.log("Para ejecutar todos los ejemplos de mappeo embebido:");
console.log("  npm run mappeo-embebido");
console.log();

console.log("Para ejecutar todos los ejemplos de mappeo de herencia:");
console.log("  npm run mappeo-herencia");
console.log();

console.log("Para ejecutar todos los ejemplos de mappeo de relaciones:");
console.log("  npm run mappeo-relaciones");
console.log();

console.log("Para ejecutar TODOS los ejemplos:");
console.log("  npm run all-sql");
console.log();

console.log("=".repeat(80));
console.log("EJEMPLOS ESPECÍFICOS:");
console.log("=".repeat(80));
console.log();

console.log("Mappeo Embebido (SQL puro):");
console.log("  npm run multiple-columns-sql  # Mapeo de múltiples columnas");
console.log(
  "  npm run comma-separated-sql   # Mapeo de valores separados por coma"
);
console.log("  npm run json-mapping-sql      # Mapeo de datos JSON");
console.log();

console.log("Mappeo de Herencia (SQL puro):");
console.log("  npm run table-per-hierarchy-sql   # Table Per Hierarchy (SQL)");
console.log("  npm run table-per-class-sql       # Table Per Class (SQL)");
console.log("  npm run joined-table-sql          # Joined Table (SQL)");
console.log("  📝 Para ejemplos ORM, ve a Clase II");
console.log();

console.log("Mappeo de Relaciones (SQL puro):");
console.log("  npm run one-to-one-sql   # Relación 1:1 (usuario ↔ perfil)");
console.log("  npm run one-to-many-sql  # Relación 1:N (autor → libros)");
console.log("  npm run many-to-one-sql  # Relación N:1 (libro → autor)");
console.log("  npm run many-to-many-sql # Relación N:M (curso ↔ estudiante)");
console.log();

console.log("=".repeat(80));
console.log("Para comenzar, ejecuta: npm run mapeo-basico-sql");
console.log("Todos los ejemplos usan SQL puro para aprender los fundamentos");
console.log("=".repeat(80));
