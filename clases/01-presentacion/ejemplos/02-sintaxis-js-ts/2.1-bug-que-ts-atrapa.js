// Un bug típico de tipos: sumar un string y un number sin darse cuenta.
// JS corre igual, sin quejarse — el bug queda silencioso.
// Correr con: node 2.1-bug-que-ts-atrapa.js

function proximoCumple(edad) {
  return edad + 1;
}

const edadInput = "25"; // un <input> SIEMPRE entrega string
console.log(proximoCumple(edadInput)); // "251" — concatenó, no sumó
