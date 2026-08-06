// async/await sobre una Promise (una espera simulada, sin red).
// Correr con: node 1.7-async-await.mjs
// (extensión .mjs para poder usar "await" al nivel más alto del archivo)

function esperar(ms, valor) {
  return new Promise((resolve) => setTimeout(() => resolve(valor), ms));
}

async function traerDatos() {
  const datos = await esperar(500, { mensaje: "listo" });
  return datos;
}

console.log("1. arranca el pedido"); // se imprime primero
const promesa = traerDatos(); // no espera acá: sigue ejecutando lo que sigue
console.log("2. esto se imprime ANTES de que termine el pedido"); // segundo

const datos = await promesa; // recién acá se espera el resultado
console.log("3. datos recibidos:", datos); // se imprime último, ~500ms después
