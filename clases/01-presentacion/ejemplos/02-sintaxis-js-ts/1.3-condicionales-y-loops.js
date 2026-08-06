// Condicionales (if/else, ternario) y un loop for...of sobre un array.
// Correr con: node 1.3-condicionales-y-loops.js

const edad = 30;
const numeros = [1, 2, 3];

if (edad >= 18) {
  console.log("mayor de edad");
} else {
  console.log("menor de edad");
}

const categoria = edad >= 18 ? "adulto" : "menor"; // ternario
console.log(categoria);

for (const numero of numeros) {
  console.log(numero); // recorre cada elemento del array
}
