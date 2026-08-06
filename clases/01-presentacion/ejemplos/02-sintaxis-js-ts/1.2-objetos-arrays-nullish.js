// Objetos, arrays y el operador nullish coalescing (??).
// Correr con: node 1.2-objetos-arrays-nullish.js

const persona = { nombre: "Ada", edad: 30 }; // objeto (como un dict/struct)
const numeros = [1, 2, 3]; // array

console.log(persona.nombre); // acceso a propiedad
console.log(numeros[0]); // acceso por índice

const apodo = persona.apodo ?? "sin apodo";
// ?? = "si es null/undefined, se usa este valor por defecto"
console.log(apodo);

const apodoVacio = "" ?? "sin apodo";
console.log(apodoVacio); // "" no es null/undefined, así que ?? no aplica acá
