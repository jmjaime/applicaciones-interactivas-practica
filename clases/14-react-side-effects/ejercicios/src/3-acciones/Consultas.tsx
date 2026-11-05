import { useEffect, useState } from "react";
import { Link } from "react-router";
import { AGENCIA_ID, API_URL } from "../comun/api";
import { formatearFecha } from "../formato";
import type { ConsultaRecibida } from "../types";

export default function Consultas() {
  const [consultas, setConsultas] = useState<ConsultaRecibida[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargar() {
      try {
        const res = await fetch(`${API_URL}/agencies/${AGENCIA_ID}/comments`);
        if (!res.ok) throw new Error(`Error ${res.status}`);
        setConsultas(await res.json());
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error desconocido");
      } finally {
        setCargando(false);
      }
    }
    cargar();
  }, []);

  if (cargando) return <p className="cargando">Cargando consultas…</p>;
  if (error) return <p className="mensaje error">No se pudieron cargar las consultas: {error}</p>;

  return (
    <>
      <h1>Consultas recibidas</h1>
      {consultas.length === 0 && <p className="mensaje">Todavía no hay consultas.</p>}
      {consultas.map((c) => (
        <div key={c.id} className={c.respuesta ? "item respondida" : "item"}>
          <p>
            <strong>{c.autor}</strong>: {c.texto}
          </p>
          <p>{c.respuesta ? `↳ ${c.respuesta}` : <span className="alerta">Sin responder</span>}</p>
          <small>
            {formatearFecha(c.fecha)} · <Link to={`/propiedades/${c.propiedadId}`}>{c.propiedadTitulo}</Link>
          </small>
        </div>
      ))}
    </>
  );
}
