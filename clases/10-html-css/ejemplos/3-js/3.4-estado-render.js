// 3.4 · El salto conceptual: el estado vive en JS, y la pantalla se DERIVA de él.
//   UI = render(estado)
// Cada evento modifica el estado y llama a render(). Nadie toca el DOM "de costado".
// Es exactamente el modelo de React: la Clase 11 rehace esta misma pantalla con componentes.

const URL_PROPIEDADES = "../datos/propiedades.json";

// ── Estado: la única fuente de verdad ─────────────────────────────
const estado = {
  propiedades: [],
  favoritos: new Set(), // ids
  filtros: { texto: "", operacion: "", soloFavoritos: false },
};

// ── Referencias al DOM ────────────────────────────────────────────
const listado = document.querySelector("#listado");
const contador = document.querySelector("#contador-favoritos");
const resultados = document.querySelector("#resultados");
const inputTexto = document.querySelector("#filtro-texto");
const selectOperacion = document.querySelector("#filtro-operacion");
const checkFavoritos = document.querySelector("#filtro-favoritos");

// ── Lógica pura: estado → lo que hay que mostrar (sin tocar el DOM) ──
function propiedadesVisibles({ propiedades, favoritos, filtros }) {
  const texto = filtros.texto.toLowerCase();
  return propiedades.filter(
    (p) =>
      (p.titulo + " " + p.barrio).toLowerCase().includes(texto) &&
      (!filtros.operacion || p.operacion === filtros.operacion) &&
      (!filtros.soloFavoritos || favoritos.has(p.id)),
  );
}

// ── Render: dibuja TODO desde el estado, siempre igual ────────────
function render() {
  const visibles = propiedadesVisibles(estado);

  contador.textContent = estado.favoritos.size;
  resultados.textContent = `${visibles.length} de ${estado.propiedades.length}`;

  if (visibles.length === 0) {
    listado.innerHTML = `<p class="mensaje">No hay propiedades con esos filtros.</p>`;
    return;
  }
  // Se tira el listado entero y se vuelve a armar. Simple y siempre correcto…
  // …pero recrea TODOS los nodos en cada tecla. React resuelve justo esto:
  // compara el resultado nuevo con el anterior y toca solo lo que cambió.
  listado.replaceChildren(
    ...visibles.map((p) => crearCard(p, estado.favoritos.has(p.id))),
  );
}

function crearCard(propiedad, esFavorita) {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <img alt="" />
    <div class="card-body">
      <div class="card-precio">
        <strong></strong>
        <button class="fav" type="button" aria-label="Favorito">❤️</button>
      </div>
      <h2></h2>
      <p></p>
    </div>
  `;
  card.querySelector("img").src = propiedad.foto;
  card.querySelector("img").alt = propiedad.titulo;
  card.querySelector("strong").textContent =
    `${propiedad.moneda} ${propiedad.precio.toLocaleString("es-AR")}`;
  card.querySelector("h2").textContent = propiedad.titulo;
  card.querySelector("p").textContent = `${propiedad.barrio} · ${propiedad.operacion}`;

  const fav = card.querySelector(".fav");
  fav.classList.toggle("activo", esFavorita);
  fav.addEventListener("click", () => toggleFavorito(propiedad.id));

  return card;
}

// ── Acciones: cambian el estado y piden un render ─────────────────
function toggleFavorito(id) {
  if (estado.favoritos.has(id)) estado.favoritos.delete(id);
  else estado.favoritos.add(id);
  render();
}

inputTexto.addEventListener("input", (e) => {
  estado.filtros.texto = e.target.value;
  render();
});

selectOperacion.addEventListener("change", (e) => {
  estado.filtros.operacion = e.target.value;
  render();
});

checkFavoritos.addEventListener("change", (e) => {
  estado.filtros.soloFavoritos = e.target.checked;
  render();
});

// ── Arranque ──────────────────────────────────────────────────────
async function init() {
  try {
    const respuesta = await fetch(URL_PROPIEDADES);
    if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
    estado.propiedades = await respuesta.json();
    render();
  } catch (error) {
    listado.innerHTML = `<p class="mensaje error">No se pudieron cargar las propiedades (${error.message}).</p>`;
  }
}

init();

// 🔧 Probar:
//   1. Marcar favoritos y filtrar: el contador y "Solo favoritos" ya no se desincronizan (comparar con 3.2).
//   2. En la Console: estado.favoritos.add(7); render()  → la pantalla obedece al estado.
//   3. Sumar un filtro por tipo (Casa / Departamento…): estado + <select> + una condición. Nada más.
//   4. DevTools → Elements, escribir en el buscador y mirar cómo parpadea TODO el <section>:
//      cada tecla recrea todas las cards. Ese es el costo que React optimiza.
