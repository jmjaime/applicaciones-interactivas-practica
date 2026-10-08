// 3.3 · Del JSON a la pantalla: fetch + una función que arma el HTML desde los datos.
// Requiere servir la carpeta por HTTP (npx serve): fetch no funciona con file://

const URL_PROPIEDADES = "../datos/propiedades.json"; // en el TPO: "http://localhost:3000/properties"

const listado = document.querySelector("#listado");

const formatoPrecio = (precio, moneda) =>
  `${moneda} ${precio.toLocaleString("es-AR")}`;

// Una propiedad (objeto JS) → un <article> (nodo del DOM).
// Es la misma idea que un componente de React, pero escrita a mano.
function crearCard(propiedad) {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.id = propiedad.id;

  // innerHTML con template string: cómodo para el esqueleto fijo...
  card.innerHTML = `
    <img alt="" />
    <div class="card-body">
      <div class="card-precio">
        <strong></strong>
        <span class="badge"></span>
      </div>
      <h2></h2>
      <p></p>
    </div>
  `;

  // ...pero los DATOS van con textContent / propiedades: nunca dentro del
  // template. Un título como "<img src=x onerror=alert(1)>" se ejecutaría (XSS).
  card.querySelector("img").src = propiedad.foto;
  card.querySelector("img").alt = propiedad.titulo;
  card.querySelector("strong").textContent = formatoPrecio(propiedad.precio, propiedad.moneda);
  card.querySelector(".badge").textContent = propiedad.operacion;
  card.querySelector(".badge").classList.toggle("venta", propiedad.operacion === "Venta");
  card.querySelector("h2").textContent = propiedad.titulo;
  card.querySelector("p").textContent = [
    propiedad.barrio,
    propiedad.ambientes && `${propiedad.ambientes} amb.`,
    propiedad.superficieCubierta && `${propiedad.superficieCubierta} m²`,
  ]
    .filter(Boolean)
    .join(" · ");

  return card;
}

async function cargarPropiedades() {
  try {
    const respuesta = await fetch(URL_PROPIEDADES);
    if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);

    const propiedades = await respuesta.json();
    listado.replaceChildren(...propiedades.map(crearCard));
  } catch (error) {
    listado.innerHTML = `<p class="mensaje error">No se pudieron cargar las propiedades (${error.message}).</p>`;
  }
}

cargarPropiedades();

// 🔧 Probar:
//   1. Cambiar la URL por una que no existe → se ve el estado de error.
//   2. DevTools → Network → throttling "Slow 3G" y recargar → se ve "Cargando…".
//   3. Abrir el .html con doble click (file://) → falla el fetch: ver el error en la Console.
//   4. Con la API del TPO levantada (y CORS habilitado), apuntar URL_PROPIEDADES a ella.
