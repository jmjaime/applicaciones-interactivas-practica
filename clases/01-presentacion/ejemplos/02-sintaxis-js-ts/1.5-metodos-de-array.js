// Métodos de array: map, filter y find, comparados con un for manual.
// Correr con: node 1.5-metodos-de-array.js

const numeros = [1, 2, 3, 4, 5];

const dobles = numeros.map((n) => n * 2); // transforma cada elemento
console.log(dobles);

const pares = numeros.filter((n) => n % 2 === 0); // se queda con los que cumplen
console.log(pares);

const primerPar = numeros.find((n) => n % 2 === 0); // el primero que cumple
console.log(primerPar);

// equivalente con un for manual, para comparar:
const doblesConFor = [];
for (const n of numeros) {
  doblesConFor.push(n * 2);
}
console.log(doblesConFor);
