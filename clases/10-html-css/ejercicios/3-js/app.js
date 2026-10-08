// Ejercicios 3.1, 3.2 y 3.3: reseñas de la inmobiliaria con estado + render.
// Servir la carpeta ejercicios/ por HTTP (npx serve) y abrir 3-js/perfil.html.

const URL_RESENAS = "../datos/resenas.json";

// Única fuente de verdad. La pantalla se deriva de acá, nunca al revés.
const estado = {
  resenas: [],
  filtros: { minimo: 1, orden: "recientes" }, // para el 3.3
};

const lista = document.querySelector("#lista-resenas");
const resumen = document.querySelector("#resumen");
const form = document.querySelector("#form-resena");
const filtroMinimo = document.querySelector("#filtro-minimo");
const orden = document.querySelector("#orden");

// ── Helpers (ya resueltos) ────────────────────────────────────────
function estrellas(n) {
  return "★".repeat(n) + "☆".repeat(5 - n); // estrellas(3) → "★★★☆☆"
}

function formatearFecha(iso) {
  const [anio, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${anio}`; // "2026-09-12" → "12/09/2026"
}

// ── 3.1 · Render desde datos ──────────────────────────────────────

/**
 * Convierte una reseña ({ nombre, contenido, calificacion, fecha }) en un <li>
 * con la misma estructura que tenía la reseña escrita a mano en el bloque 2.
 */
function crearResena(resena) {
  // TODO: armar el <li> con nombre, estrellas, fecha (legible y en datetime) y contenido.
  // TODO: los datos tienen que mostrarse como texto, nunca interpretarse como HTML.
  throw new Error("TODO: crearResena");
}

/** Dibuja toda la sección de reseñas a partir de `estado`. */
function render() {
  // TODO: mostrar en #resumen el promedio (1 decimal) y la cantidad total de reseñas,
  //       o "Todavía no hay reseñas" si no hay ninguna.
  // TODO: reemplazar el contenido de #lista-resenas por una reseña por elemento.
  // TODO (3.3): mostrar solo las que cumplen el filtro, en el orden elegido;
  //       si no queda ninguna, un mensaje que lo diga.
}

async function init() {
  // TODO: traer las reseñas de URL_RESENAS, guardarlas en el estado y renderizar.
  // TODO: si el request falla, mostrar un mensaje de error en #resumen.
}

// ── 3.2 · Alta de reseña ──────────────────────────────────────────

form.addEventListener("submit", (event) => {
  // TODO: evitar que el navegador recargue la página.
  // TODO: agregar la reseña nueva al estado (con la fecha de hoy) y volver a renderizar.
  // TODO: dejar el formulario vacío para cargar otra.
});

// ── 3.3 · Filtro y orden ──────────────────────────────────────────

filtroMinimo.addEventListener("change", (event) => {
  // TODO: actualizar el estado y volver a renderizar.
});

orden.addEventListener("change", (event) => {
  // TODO: actualizar el estado y volver a renderizar.
});

init();
