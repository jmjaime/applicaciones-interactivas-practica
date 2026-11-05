import { useEffect, useState } from "react";
import BadgeEstado from "../comun/BadgeEstado";
import { AGENCIA_ID, API_URL } from "../comun/api";
import { ESTADOS, type EstadoPropiedad, type MiPropiedad } from "../types";

type Fila = { estado: EstadoPropiedad; cantidad: number };

// TODO (3): esta pantalla funciona, pero tiene effects que sobran. Dejar solo los necesarios.
export default function Reportes() {
  const [propiedades, setPropiedades] = useState<MiPropiedad[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [soloActivas, setSoloActivas] = useState(false);
  const [filas, setFilas] = useState<Fila[]>([]);
  const [maximo, setMaximo] = useState(0);
  const [exportar, setExportar] = useState(false);
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

  useEffect(() => {
    const estados = soloActivas ? ESTADOS.filter((e) => e === "Publicada" || e === "Reservada") : ESTADOS;
    setFilas(estados.map((estado) => ({ estado, cantidad: propiedades.filter((p) => p.estado === estado).length })));
  }, [propiedades, soloActivas]);

  useEffect(() => {
    setMaximo(Math.max(0, ...filas.map((f) => f.cantidad)));
  }, [filas]);

  useEffect(() => {
    if (exportar) {
      setAviso(`Reporte exportado con ${filas.length} estados`);
      setExportar(false);
    }
  }, [exportar, filas]);

  if (cargando) return <p className="cargando">Cargando reportes…</p>;
  if (error) return <p className="mensaje error">No se pudieron cargar los reportes: {error}</p>;

  return (
    <>
      <div className="titulo-con-accion">
        <h1>Reportes</h1>
        <button className="boton" onClick={() => setExportar(true)}>
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
