import { useEffect, useState } from "react";
import BadgeEstado from "../comun/BadgeEstado";
import { AGENCIA_ID, API_URL } from "../comun/api";
import { ESTADOS, type MiPropiedad } from "../types";

export default function Reportes() {
  const [propiedades, setPropiedades] = useState<MiPropiedad[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [soloActivas, setSoloActivas] = useState(false);
  const [aviso, setAviso] = useState("");

  useEffect(() => {
    async function cargar() {
      try {
        const res = await fetch(`${API_URL}/agencies/${AGENCIA_ID}/properties`);
        if (!res.ok) throw new Error(`Error ${res.status}`);
        setPropiedades(await res.json());
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error desconocido");
      } finally {
        setCargando(false);
      }
    }
    cargar();
  }, []);

  const estados = soloActivas ? ESTADOS.filter((e) => e === "Publicada" || e === "Reservada") : ESTADOS;
  const filas = estados.map((estado) => ({ estado, cantidad: propiedades.filter((p) => p.estado === estado).length }));
  const maximo = Math.max(0, ...filas.map((f) => f.cantidad));

  if (cargando) return <p className="cargando">Cargando reportes…</p>;
  if (error) return <p className="mensaje error">No se pudieron cargar los reportes: {error}</p>;

  return (
    <>
      <div className="titulo-con-accion">
        <h1>Reportes</h1>
        <button className="boton" onClick={() => setAviso(`Reporte exportado con ${filas.length} estados`)}>
          Exportar
        </button>
      </div>
      {aviso && <p className="aviso">{aviso}</p>}
      <label>
        <input type="checkbox" checked={soloActivas} onChange={(e) => setSoloActivas(e.target.checked)} /> Solo activas
      </label>
      <h2>Propiedades por estado</h2>
      {filas.map(({ estado, cantidad }) => (
        <div key={estado} className="reporte">
          <BadgeEstado estado={estado} />
          <div className="barra" style={{ width: `${maximo === 0 ? 0 : (cantidad / maximo) * 100}%` }} />
          <span>{cantidad}</span>
        </div>
      ))}
    </>
  );
}
