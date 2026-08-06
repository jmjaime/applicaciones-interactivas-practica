// Declaración de variables (const/let) y dos formas de escribir funciones.
// Correr con: node 1.1-variables-y-funciones.js

const nombre = "Ada"; // no se reasigna
let edad = 30; // se puede reasignar

function saludar(nombre) {
  // función clásica
  return `Hola, ${nombre}`; // template literal: variables adentro de ``
}

const saludar2 = (nombre) => `Hola, ${nombre}`; // arrow function, misma idea

console.log(saludar(nombre));
console.log(saludar2(nombre));

edad = edad + 1;
console.log(`Edad actualizada: ${edad}`);
