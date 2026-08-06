// Destructuring de objetos y arrays, y el operador spread (...).
// Correr con: node 1.4-destructuring-y-spread.js

const persona = { nombre: "Ada", edad: 30 };
const numeros = [1, 2, 3];

const { nombre, edad } = persona; // desestructura propiedades de un objeto
console.log(nombre, edad);

const [primero, ...resto] = numeros; // desestructura array + junta el resto
console.log(primero, resto);

const personaMayor = { ...persona, edad: 31 }; // spread: copia y pisa un campo
console.log(personaMayor);

const masNumeros = [...numeros, 4, 5]; // spread para armar un array nuevo
console.log(masNumeros);
