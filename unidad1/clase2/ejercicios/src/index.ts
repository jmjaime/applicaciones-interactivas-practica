import "reflect-metadata";

const exercises = [
  {
    id: 1,
    title: "Entidades Básicas",
    description: "Definición de entidades con decoradores básicos",
    context: "Sistema de gestión de biblioteca",
    test: "npm run test:ej01",
  },
  {
    id: 2,
    title: "Restricciones y Validaciones",
    description: "Restricciones de BD y validaciones con class-validator",
    context: "Sistema de gestión de hospital",
    test: "npm run test:ej02",
  },
  {
    id: 3,
    title: "Relaciones",
    description: "Relaciones One-to-One, One-to-Many, Many-to-Many",
    context: "Sistema de gestión de restaurante",
    test: "npm run test:ej03",
  },
  {
    id: 4,
    title: "Lazy vs Eager Loading",
    description: "Estrategias de carga de relaciones",
    context: "Sistema de gestión de eventos",
    test: "npm run test:ej04",
  },
  {
    id: 5,
    title: "Transacciones",
    description: "Manejo de transacciones para operaciones complejas",
    context: "Sistema de gestión de inventario y ventas",
    test: "npm run test:ej05",
  },
  {
    id: 6,
    title: "Objetos Embebidos",
    description: "Uso de objetos embebidos para estructuras complejas",
    context: "Sistema de gestión de propiedades inmobiliarias",
    test: "npm run test:ej06",
  },
  {
    id: 7,
    title: "Query Builder",
    description: "Consultas avanzadas con QueryBuilder",
    context: "Sistema de gestión de cursos online",
    test: "npm run test:ej07",
  },
  {
    id: 8,
    title: "Herencia",
    description: "Estrategias de herencia en TypeORM",
    context: "Sistema de gestión de vehículos",
    test: "npm run test:ej08",
  },
  {
    id: 9,
    title: "Optimización de Performance",
    description: "Técnicas de optimización y mejores prácticas",
    context: "Sistema de e-commerce",
    test: "npm run test:ej09",
  },
];

function displayMenu() {
  console.log("\n🎯 EJERCICIOS TYPEORM - CLASE II");
  console.log("=".repeat(80));
  console.log("Selecciona el ejercicio que quieres ejecutar:\n");

  exercises.forEach((exercise) => {
    console.log(`${exercise.id}. ${exercise.title}`);
    console.log(`   📝 ${exercise.description}`);
    console.log(`   🏢 Contexto: ${exercise.context}`);
    console.log("");
  });

  console.log("0. Salir");
  console.log("=".repeat(80));
}

function displayInstructions() {
  console.log("\n📋 INSTRUCCIONES:");
  console.log("=".repeat(50));
  console.log("Para correr los tests de un ejercicio específico, usa:");
  console.log("  npm run test:ej01    # Tests del ejercicio 1");
  console.log("  npm run test:ej02    # Tests del ejercicio 2");
  console.log("  ... y así sucesivamente");
  console.log("=".repeat(50));
}

function displayRequirements() {
  console.log("\n📦 REQUISITOS:");
  console.log("=".repeat(50));
  console.log("1. Instalar dependencias: npm install");
  console.log("2. Compilar TypeScript: npm run build");
  console.log("3. Ejecutar tests: npm run test:ej0X");
  console.log("=".repeat(50));
}

function displayExerciseDetails(exerciseId: number) {
  const exercise = exercises.find((ex) => ex.id === exerciseId);
  if (!exercise) {
    console.log("❌ Ejercicio no encontrado");
    return;
  }

  console.log(`\n📚 EJERCICIO ${exercise.id}: ${exercise.title}`);
  console.log("=".repeat(60));
  console.log(`📝 Descripción: ${exercise.description}`);
  console.log(`🏢 Contexto: ${exercise.context}`);
  // Nota: los example.ts fueron removidos. Usar tests por ejercicio.
  console.log(`🧪 Tests: ${exercise.test}`);
  console.log("");

  // Información específica por ejercicio
  switch (exerciseId) {
    case 1:
      console.log("🎯 Conceptos clave:");
      console.log("  • Decoradores @Entity, @Column, @PrimaryGeneratedColumn");
      console.log("  • Tipos de datos específicos (decimal, datetime, enum)");
      console.log("  • Restricciones de longitud y valores por defecto");
      console.log("  • Campos opcionales y timestamps automáticos");
      console.log("\n📊 Entidades: Library, BookGenre");
      break;
    case 2:
      console.log("🎯 Conceptos clave:");
      console.log("  • Restricciones UNIQUE y CHECK");
      console.log("  • Índices simples y compuestos");
      console.log("  • Validaciones con class-validator");
      console.log("  • Enums y restricciones de rango");
      console.log("\n📊 Entidades: Doctor, Patient");
      break;
    case 3:
      console.log("🎯 Conceptos clave:");
      console.log("  • Relaciones One-to-One, One-to-Many, Many-to-Many");
      console.log("  • Decoradores @JoinColumn y @JoinTable");
      console.log("  • Relaciones bidireccionales");
      console.log("  • Operaciones cascade");
      console.log("\n📊 Entidades: Chef, Restaurant, Menu, Dish, Ingredient");
      break;
    case 4:
      console.log("🎯 Conceptos clave:");
      console.log("  • Lazy loading vs Eager loading");
      console.log("  • Configuración de carga automática");
      console.log("  • Impacto en performance");
      console.log("  • Prevención de problema N+1");
      console.log(
        "\n📊 Entidades: Event, Venue, Attendee, Ticket (+ versiones Eager)"
      );
      break;
    case 5:
      console.log("🎯 Conceptos clave:");
      console.log("  • QueryRunner y transacciones");
      console.log("  • Operaciones atómicas");
      console.log("  • Rollback y commit");
      console.log("  • Manejo de errores transaccionales");
      console.log(
        "\n📊 Entidades: Customer, Inventory, Sale, SaleItem, PaymentLog"
      );
      break;
    case 6:
      console.log("🎯 Conceptos clave:");
      console.log("  • Objetos embebidos con @Column(()");
      console.log("  • Agrupación de campos relacionados");
      console.log("  • Prefijos de columnas");
      console.log("  • Reutilización de estructuras");
      console.log(
        "\n📊 Entidades: Property, PropertyAgent + objetos embebidos"
      );
      break;
    case 7:
      console.log("🎯 Conceptos clave:");
      console.log("  • QueryBuilder para consultas complejas");
      console.log("  • JOINs, GROUP BY, HAVING");
      console.log("  • Subqueries y paginación");
      console.log("  • Parámetros y ordenamiento");
      console.log(
        "\n📊 Entidades: Instructor, Course, Student, Enrollment, Review"
      );
      break;
    case 8:
      console.log("🎯 Conceptos clave:");
      console.log("  • Table per Hierarchy (Single Table)");
      console.log("  • Table per Class (Concrete Table)");
      console.log("  • Table per Type (Joined Table)");
      console.log("  • Pros y contras de cada estrategia");
      console.log("\n📊 Entidades: Vehicle, Car, Motorcycle, Truck");
      break;
    case 9:
      console.log("🎯 Conceptos clave:");
      console.log("  • Problema N+1 y su solución");
      console.log("  • Selección de campos específicos");
      console.log("  • Paginación eficiente");
      console.log("  • Operaciones bulk y índices");
      console.log(
        "\n📊 Entidades: Supplier, ProductCategory, Product, CustomerOrder, OrderLine"
      );
      break;
  }

  console.log("\n🚀 Para ejecutar este ejercicio:");
  console.log(`  npm run start:ejercicio${exerciseId}`);
  console.log("=".repeat(60));
}

async function main() {
  console.log("🎓 Ejercicios de TypeORM - Clase II");
  console.log("Universidad Argentina de la Empresa (UADE)");
  console.log("Aplicaciones Interactivas");

  displayInstructions();
  displayRequirements();
  displayMenu();

  // Mostrar detalles de todos los ejercicios
  console.log("\n📋 DETALLES DE EJERCICIOS:");
  console.log("=".repeat(80));

  exercises.forEach((exercise) => {
    displayExerciseDetails(exercise.id);
  });

  console.log("\n🎯 RECOMENDACIONES:");
  console.log("=".repeat(50));
  console.log("1. Comenzar con el ejercicio 1 para entender las bases");
  console.log("2. Seguir el orden secuencial para mejor comprensión");
  console.log(
    "3. Leer los comentarios en el código para entender cada concepto"
  );
  console.log("4. Experimentar modificando las entidades y consultas");
  console.log(
    "5. Revisar la documentación oficial de TypeORM para más detalles"
  );
  console.log("=".repeat(50));

  console.log("\n💡 RECURSOS ADICIONALES:");
  console.log("=".repeat(50));
  console.log("• Documentación oficial: https://typeorm.io/");
  console.log("• Guía de decoradores: https://typeorm.io/decorator-reference");
  console.log(
    "• Ejemplos adicionales: https://github.com/typeorm/typeorm/tree/master/sample"
  );
  console.log("=".repeat(50));

  console.log("\n✨ ¡Buena suerte con los ejercicios!");
  console.log(
    "Para ejecutar un ejercicio específico, usa los comandos npm mostrados arriba."
  );
}

// Ejecutar el programa principal
main().catch(console.error);
