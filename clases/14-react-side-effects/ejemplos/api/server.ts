// La API de la clase: Express en memoria, con las rutas del TPO (un reinicio vuelve a los datos
// originales). Las demoras son artificiales, para que se vean los estados de carga.
import cors from "cors";
import express from "express";
import propiedades from "./datos/propiedades.json";

const PUERTO = 3001;
const DEMORA_MS = 500;
const ID_LENTA = 1; // la propiedad 1 tarda más que el resto: es la race condition del ejemplo 2.1
const DEMORA_LENTA_MS = 3000;

type SolicitudVisita = { id: number; propiedadId: number; nombre: string; telefono: string; fecha: string };
const solicitudes: SolicitudVisita[] = [];

const esperar = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, _res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// GET /properties?q=texto
app.get("/properties", async (req, res) => {
  await esperar(DEMORA_MS);
  const q = String(req.query.q ?? "").toLowerCase();
  res.json(propiedades.filter((p) => `${p.titulo} ${p.barrio}`.toLowerCase().includes(q)));
});

// GET /properties/:id
app.get("/properties/:id", async (req, res) => {
  const id = Number(req.params.id);
  await esperar(id === ID_LENTA ? DEMORA_LENTA_MS : DEMORA_MS);
  const propiedad = propiedades.find((p) => p.id === id);
  if (!propiedad) {
    res.status(404).json({ error: `No existe la propiedad ${req.params.id}` });
    return;
  }
  res.json(propiedad);
});

// POST /properties/:id/visit-requests
app.post("/properties/:id/visit-requests", async (req, res) => {
  await esperar(1000);
  const propiedadId = Number(req.params.id);
  if (!propiedades.some((p) => p.id === propiedadId)) {
    res.status(404).json({ error: `No existe la propiedad ${req.params.id}` });
    return;
  }

  const { nombre = "", telefono = "", fecha = "" } = req.body;
  const errores: Record<string, string> = {};
  if (!nombre.trim()) errores.nombre = "El nombre es obligatorio";
  if (!/^[\d\s-]{8,}$/.test(telefono)) errores.telefono = "Teléfono inválido (al menos 8 dígitos)";
  if (!fecha || fecha <= new Date().toLocaleDateString("en-CA")) errores.fecha = "La fecha tiene que ser futura";
  if (Object.keys(errores).length > 0) {
    res.status(400).json({ errores });
    return;
  }

  const solicitud = { id: solicitudes.length + 1, propiedadId, nombre: nombre.trim(), telefono, fecha };
  solicitudes.push(solicitud);
  res.status(201).json(solicitud);
});

app.listen(PUERTO, () => {
  console.log(`API en http://localhost:${PUERTO}`);
});
