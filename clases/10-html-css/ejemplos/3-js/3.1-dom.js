// 3.1 · El DOM es un árbol de objetos que JS puede leer y modificar.
// Conviene correr estas mismas líneas, de a una, en la Console de DevTools.

// 1. Seleccionar: querySelector usa los MISMOS selectores que CSS
const titulo = document.querySelector("#titulo-listado");
const card = document.querySelector(".card");
const precios = document.querySelectorAll(".precio"); // NodeList (todas)

console.log(titulo.textContent); // "Propiedades"
console.log(card.dataset.id); // "1"  ← atributo data-id
console.log(precios.length); // 1

// 2. Modificar contenido, atributos y clases
titulo.textContent = "Propiedades en Palermo";
card.querySelector(".badge").classList.add("venta"); // cambia el color vía CSS
card.querySelector("img").alt = "Living con ventanal";

// 3. Crear un nodo nuevo y agregarlo al árbol
const nueva = document.createElement("article");
nueva.className = "card";
nueva.dataset.id = "2";

const body = document.createElement("div");
body.className = "card-body";

const h2 = document.createElement("h2");
h2.textContent = "Casa con jardín y pileta"; // textContent: nunca interpreta HTML

body.append(h2);
nueva.append(body);
document.querySelector("#listado").append(nueva);

// 🔧 Probar en la Console:
//   document.querySelector(".card h2").style.color = "crimson"
//   document.querySelector("#listado").innerHTML = ""          ← vacía el listado
//   document.querySelector(".card").remove()
// Cada cambio se ve al instante, pero se pierde al recargar: el HTML no cambió.
