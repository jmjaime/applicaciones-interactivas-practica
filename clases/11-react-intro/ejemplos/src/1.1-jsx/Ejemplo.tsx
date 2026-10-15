// 1.1 · JSX: una card escrita con expresiones de JS entre llaves.
// Todavía en un solo componente: partirla en piezas es el ejemplo 2.1.

const propiedad = {
  titulo: "Casa con jardín y pileta",
  operacion: "Venta",
  precio: 285000,
  moneda: "USD",
  barrio: "Villa Devoto",
  ambientes: 5,
  superficieCubierta: 210,
  foto: "https://picsum.photos/seed/prop2/400/260",
  publicada: new Date("2026-09-20"),
};

const destacada = true;

// JSX escapa los valores: esto se ve literal, con los signos < y >, no en negrita.
const resena = { autor: "ana", texto: "<b>Excelente</b> atención" };

export default function Ejemplo() {
  const dias = Math.floor((Date.now() - propiedad.publicada.getTime()) / 86_400_000);

  // Un JSX es un valor: se puede guardar en una variable y usar más abajo.
  const precio = (
    <strong>
      {propiedad.moneda} {propiedad.precio.toLocaleString("es-AR")}
    </strong>
  );

  return (
    <main className="contenido">
      <article className={destacada ? "card destacada" : "card"} style={{ maxWidth: 320 }}>
        <img src={propiedad.foto} alt={propiedad.titulo} />
        <div className="card-body">
          <div className="card-precio">
            {precio}
            <span className={propiedad.operacion === "Venta" ? "badge venta" : "badge"}>
              {propiedad.operacion}
            </span>
          </div>
          <h2>{propiedad.titulo.toUpperCase()}</h2>
          <p>
            {propiedad.barrio} · {propiedad.ambientes} amb. · {propiedad.superficieCubierta} m²
          </p>
          <p style={{ fontSize: "0.8rem", fontStyle: "italic" }}>Publicada hace {dias} días</p>
        </div>
      </article>

      <p>
        @{resena.autor}: {resena.texto}
      </p>
    </main>
  );
}

// 🔧 Probar:
//   1. Cambiar un className por class: la página anda, pero la Console avisa (Invalid DOM property).
//   2. Reemplazar el ternario del badge por un if adentro de las llaves: no compila (las llaves aceptan expresiones, no sentencias).
//   3. Poner destacada en false: se va el borde naranja.
//   4. DevTools → Network → Ejemplo.tsx → Response: lo que llega al navegador ya no tiene JSX, son llamadas a jsxDEV(…)
//      (jsx(…) en el build de producción).
