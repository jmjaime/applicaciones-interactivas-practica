// La API del panel: Express en memoria, con las rutas del TPO (un reinicio vuelve a los datos
// originales). Las demoras son artificiales, para que se vean los estados de carga.
// Sin JWT, para concentrarse en el front: en el TPO, estas rutas piden token (Clase 9).
import cors from "cors";
import express from "express";
import { consultas, propiedades, solicitudes } from "./datos";

const PUERTO = 3002;
const DEMORA_MS = 500;
const ID_LENTA = 1; // la propiedad 1 tarda más que el resto: sirve para probar la race condition
const DEMORA_LENTA_MS = 3000;
const DEMORA_VISITAS_MS = 1000;
const ID_VISITAS_ROTAS = 4;
const AGENCIA_ID = 1;

const esperar = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const tituloDe = (propiedadId: number) => propiedades.find((p) => p.id === propiedadId)?.titulo ?? "";
const conTitulo = <T extends { propiedadId: number }>(item: T) => ({ ...item, propiedadTitulo: tituloDe(item.propiedadId) });

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, _res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Todo lo que cuelga de /agencies/:id: otra inmobiliaria da 404, para poder probar el error.
app.use("/agencies/:id", async (req, res, next) => {
  await esperar(DEMORA_MS);
  if (Number(req.params.id) !== AGENCIA_ID) {
    res.status(404).json({ error: `No existe la inmobiliaria ${req.params.id}` });
    return;
  }
  next();
});

// GET /agencies/:id/properties?estado=Publicada&q=texto
app.get("/agencies/:id/properties", (req, res) => {
  const estado = String(req.query.estado ?? "");
  const q = String(req.query.q ?? "").toLowerCase();
  res.json(propiedades.filter((p) => (!estado || p.estado === estado) && p.titulo.toLowerCase().includes(q)));
});

// GET /agencies/:id/visit-requests
app.get("/agencies/:id/visit-requests", (_req, res) => {
  res.json(solicitudes.map(conTitulo));
});

// GET /agencies/:id/comments?sinResponder=true
app.get("/agencies/:id/comments", (req, res) => {
  const lista = req.query.sinResponder === "true" ? consultas.filter((c) => c.respuesta === null) : consultas;
  res.json(lista.map(conTitulo));
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

// GET /properties/:id/visit-requests: tarda más que la propiedad, y con la 4 falla a propósito.
app.get("/properties/:id/visit-requests", async (req, res) => {
  const id = Number(req.params.id);
  await esperar(id === ID_LENTA ? DEMORA_LENTA_MS : DEMORA_VISITAS_MS);
  if (id === ID_VISITAS_ROTAS) {
    res.status(500).json({ error: "No se pudieron leer las visitas" });
    return;
  }
  if (!propiedades.some((p) => p.id === id)) {
    res.status(404).json({ error: `No existe la propiedad ${req.params.id}` });
    return;
  }
  res.json(solicitudes.filter((s) => s.propiedadId === id).map(conTitulo));
});

type Cuerpo = {
  titulo?: string;
  tipo?: string;
  operacion?: string;
  precio?: number;
  moneda?: string;
  ambientes?: number | null;
  superficieCubierta?: number | null;
  superficieTotal?: number;
};

function validar({ titulo, tipo, precio, ambientes, superficieCubierta, superficieTotal }: Cuerpo) {
  const errores: Record<string, string> = {};
  if (!titulo?.trim()) errores.titulo = "El título es obligatorio";
  if (!(Number(precio) > 0)) errores.precio = "El precio tiene que ser mayor a 0";
  if (!(Number(superficieTotal) > 0)) errores.superficieTotal = "La superficie total tiene que ser mayor a 0";
  if (tipo !== "Terreno") {
    if (!(Number(superficieCubierta) > 0)) errores.superficieCubierta = "La superficie cubierta tiene que ser mayor a 0";
    else if (Number(superficieCubierta) > Number(superficieTotal))
      errores.superficieCubierta = "La superficie cubierta no puede superar la total";
    if (ambientes != null && !(Number.isInteger(ambientes) && ambientes >= 1))
      errores.ambientes = "Los ambientes tienen que ser un entero mayor o igual a 1";
  }
  return errores;
}

// Un terreno no tiene ambientes ni superficie cubierta, aunque el form los mande.
function normalizar(cuerpo: Cuerpo) {
  const esTerreno = cuerpo.tipo === "Terreno";
  return {
    ...cuerpo,
    titulo: cuerpo.titulo!.trim(),
    ambientes: esTerreno ? null : (cuerpo.ambientes ?? null),
    superficieCubierta: esTerreno ? null : (cuerpo.superficieCubierta ?? null),
  } as Omit<(typeof propiedades)[number], "id" | "estado" | "foto">;
}

// POST /properties: la propiedad nueva arranca como Borrador.
app.post("/properties", async (req, res) => {
  await esperar(1000);
  const errores = validar(req.body);
  if (Object.keys(errores).length > 0) {
    res.status(400).json({ errores });
    return;
  }
  const id = Math.max(...propiedades.map((p) => p.id)) + 1;
  const nueva = { ...normalizar(req.body), id, estado: "Borrador" as const, foto: `https://picsum.photos/seed/nueva${id}/400/260` };
  propiedades.push(nueva);
  res.status(201).json(nueva);
});

// PUT /properties/:id
app.put("/properties/:id", async (req, res) => {
  await esperar(1000);
  const i = propiedades.findIndex((p) => p.id === Number(req.params.id));
  if (i === -1) {
    res.status(404).json({ error: `No existe la propiedad ${req.params.id}` });
    return;
  }
  const errores = validar(req.body);
  if (Object.keys(errores).length > 0) {
    res.status(400).json({ errores });
    return;
  }
  propiedades[i] = { ...propiedades[i], ...normalizar(req.body) };
  res.json(propiedades[i]);
});

// PATCH /visit-requests/:id { estado: "Confirmada" | "Rechazada" }
app.patch("/visit-requests/:id", async (req, res) => {
  await esperar(DEMORA_MS);
  const solicitud = solicitudes.find((s) => s.id === Number(req.params.id));
  if (!solicitud) {
    res.status(404).json({ error: `No existe la solicitud ${req.params.id}` });
    return;
  }
  const { estado } = req.body;
  if (estado !== "Confirmada" && estado !== "Rechazada") {
    res.status(400).json({ error: "El estado tiene que ser Confirmada o Rechazada" });
    return;
  }
  if (solicitud.estado !== "Pendiente") {
    res.status(409).json({ error: "La solicitud ya fue respondida" });
    return;
  }
  solicitud.estado = estado;
  res.json(conTitulo(solicitud));
});

// Cada 20 s llega una consulta nueva (hasta 5), para que el polling del integrador tenga qué mostrar.
let consultasNuevas = 0;
setInterval(() => {
  if (consultasNuevas === 5) return;
  consultasNuevas++;
  consultas.push({
    id: Math.max(...consultas.map((c) => c.id)) + 1,
    propiedadId: 1,
    autor: "Interesado/a",
    fecha: new Date().toISOString().slice(0, 16),
    texto: `Consulta nueva n.º ${consultasNuevas}: ¿sigue disponible?`,
    respuesta: null,
  });
}, 20000);

app.listen(PUERTO, () => {
  console.log(`API en http://localhost:${PUERTO}`);
});
