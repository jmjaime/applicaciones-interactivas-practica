// 3.2 · Eventos: el navegador avisa "pasó algo" y JS reacciona.

const listado = document.querySelector("#listado");
const contador = document.querySelector("#contador-favoritos");
const form = document.querySelector("#form-busqueda");

// Delegación de eventos: UN listener en el contenedor, en vez de uno por botón.
// El click "burbujea" desde el botón hasta el <section>, y ahí se atrapa.
listado.addEventListener("click", (event) => {
  const boton = event.target.closest(".fav");
  if (!boton) return; // el click fue en otra parte de la card

  boton.classList.toggle("activo");

  // Foco de la demo: el "estado" (qué es favorito) vive EN EL DOM, en una
  // clase CSS. Para saber cuántos hay, hay que volver a preguntarle al DOM,
  // y acordarse de actualizar a mano TODO lo que depende de ese dato.
  const cantidad = listado.querySelectorAll(".fav.activo").length;
  contador.textContent = cantidad;
});

form.addEventListener("submit", (event) => {
  event.preventDefault(); // sin esto, el navegador recarga la página (comportamiento de 1.3)

  const texto = new FormData(form).get("texto").toLowerCase();

  for (const card of listado.querySelectorAll(".card")) {
    const titulo = card.querySelector("h2").textContent.toLowerCase();
    card.hidden = !titulo.includes(texto);
  }
});

// 🔧 Probar:
//   1. Comentar el event.preventDefault() y buscar algo. ¿Qué pasa con los favoritos marcados?
//   2. Marcar 2 favoritos y buscar "casa": el contador sigue diciendo 2, pero se ve 1.
//      ¿Es un bug? ¿Qué debería mostrar? ¿Dónde habría que tocar para arreglarlo?
//   3. console.log(event) dentro del listener: target, type, clientX…
