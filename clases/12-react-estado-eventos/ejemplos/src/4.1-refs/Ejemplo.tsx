// 4.1 · Refs: el foco no se puede expresar en JSX (no hay focused={true}); hace falta el nodo del DOM.
// useRef da una caja { current } que sobrevive entre renders y que React llena con el elemento.
import Contadores from "./Contadores";
import PedirVisita from "./PedirVisita";

export default function Ejemplo() {
  return (
    <main className="contenido detalle-con-form">
      <section>
        <h1>Ref vs. estado</h1>
        <p>Tres clicks en "ref" y después uno en "estado".</p>
        <Contadores />
      </section>
      <PedirVisita onEnviar={(v) => alert(`Visita pedida por ${v.nombre} para el ${v.fecha}`)} />
    </main>
  );
}

// 🔧 Probar:
//   1. Enviar el form vacío: el foco va a "Nombre". Completar el nombre y reenviar: va a "Teléfono".
//   2. En PedirVisita, sacar el ?. de nombreRef.current?.focus(): TypeScript avisa que puede ser null.
//   3. Al enviar con éxito, volver el foco al nombre (nombreRef.current?.focus()) para cargar otra.
//   4. Checkpoint en vivo: "ref" queda en 0 durante los clicks; con el click en "estado" salta a 3.
//   5. Un console.log(enRef.current) dentro del onClick de "ref": el valor sí cambia, solo que no se dibuja.
