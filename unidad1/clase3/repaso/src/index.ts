/*
Repaso - Ejercicios básicos (TypeScript + npm + Jest)

Ejercicios disponibles (orden sugerido):
  1) sum                -> src/01-sum/
  2) count-char         -> src/02-count-char/
  3) factorial          -> src/03-factorial/
  4) most-frequent-char -> src/04-most-frequent-char/
  5) reverse-string     -> src/05-reverse-string/ (alumno crea test y script)
  6) class-filter       -> src/06-class-filter/  (alumno crea script)

Cómo correr tests por ejercicio (scripts existentes):
  npm run sum
  npm run count-char
  npm run factorial
  npm run most-frequent-char

Scripts a crear por el alumno:
  npm run reverse-string   # debería ejecutar src/05-reverse-string/exercise.spec.ts
  npm run class-filter     # debería ejecutar src/06-class-filter/exercise.spec.ts

Suite completa:
  npm test

Recursos:
  TS Everyday Types: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
  MDN String:        https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String
  MDN for...of:      https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/for...of
  Jest expect:        https://jestjs.io/docs/expect
*/

function printHeader() {
  console.log("\n🎓 Repaso - Ejercicios básicos (TypeScript + npm + Jest)");
  console.log("=".repeat(72));
}

function listExercises() {
  console.log("\n📚 Ejercicios (orden sugerido):");
  console.log("  1) sum                -> src/01-sum/");
  console.log("  2) count-char         -> src/02-count-char/");
  console.log("  3) factorial          -> src/03-factorial/");
  console.log("  4) most-frequent-char -> src/04-most-frequent-char/");
  console.log(
    "  5) reverse-string     -> src/05-reverse-string/ (crear test y script)"
  );
  console.log(
    "  6) class-filter       -> src/06-class-filter/  (crear script)"
  );
}

function listScripts() {
  console.log("\n🧪 Scripts disponibles:");
  console.log("  npm run sum");
  console.log("  npm run count-char");
  console.log("  npm run factorial");
  console.log("  npm run most-frequent-char");
  console.log("\n🧩 Scripts a crear por el alumno:");
  console.log("  npm run reverse-string   # debe apuntar al spec 05");
  console.log("  npm run class-filter     # debe apuntar al spec 06");
  console.log("\nSuite completa: npm test");
}

function listResources() {
  console.log("\n🔗 Recursos:");
  console.log(
    "  TS Everyday Types: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
  );
  console.log(
    "  MDN String:        https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String"
  );
  console.log(
    "  MDN for...of:      https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/for...of"
  );
  console.log("  Jest expect:        https://jestjs.io/docs/expect");
}

function main() {
  printHeader();
  listExercises();
  listScripts();
  listResources();
  console.log("\n💡 Sugerencia: abrí el README para instrucciones detalladas.");
}

if (require.main === module) {
  main();
}
