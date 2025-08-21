import "reflect-metadata";

console.log("🚀 TypeORM Examples - Clase 2");
console.log("====================================");
console.log("");
console.log("Para ejecutar ejemplos específicos, usa:");
console.log("  npm run entities     - Entidades básicas");
console.log("  npm run restrictions - Restricciones y validaciones");
console.log("  npm run relations    - Relaciones entre entidades");
console.log("  npm run lazy-eager   - Lazy vs Eager loading");
console.log("  npm run transactions - Manejo de transacciones");
console.log("  npm run query-builder - Query Builder avanzado");
console.log("  npm run embedded     - Objetos embebidos");
console.log("  npm run inheritance  - Herencia");
console.log("  npm run optimization - Optimizaciones");
console.log("");
console.log("O ejecuta todos los ejemplos:");
console.log("  npm run dev");
console.log("");
console.log("📚 Revisa el README.md para más información");
console.log("");

// Opcional: ejecutar todos los ejemplos en secuencia
const runAllExamples = process.argv.includes("--all");

if (runAllExamples) {
  console.log("🔄 Ejecutando todos los ejemplos...");

  const examples = [
    "entities",
    "restrictions",
    "relations",
    "lazy-eager",
    "transactions",
    "query-builder",
    "embedded",
    "inheritance",
    "optimization",
  ];

  async function runExamples() {
    for (const example of examples) {
      try {
        console.log(`\n🔹 Ejecutando ejemplo: ${example}`);
        const { spawn } = require("child_process");

        await new Promise<void>((resolve, reject) => {
          const child = spawn("npm", ["run", example], { stdio: "inherit" });
          child.on("close", (code: number | null) => {
            if (code === 0) {
              resolve();
            } else {
              reject(new Error(`Example ${example} failed with code ${code}`));
            }
          });
        });

        console.log(`✅ Ejemplo ${example} completado`);
      } catch (error) {
        console.error(
          `❌ Error en ejemplo ${example}:`,
          (error as Error).message
        );
      }
    }

    console.log("\n🎉 Todos los ejemplos completados!");
  }

  runExamples().catch(console.error);
}
