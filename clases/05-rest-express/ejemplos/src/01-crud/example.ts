import { Router } from "express";
import { artists, Artist } from "../data";
import { ArtistSchema } from "./schemas";

export const crudRouter = Router();

let nextId = Math.max(...artists.map((a) => a.id)) + 1;

crudRouter.get("/artists", (req, res) => {
  res.json(artists);
});

crudRouter.get("/artists/:id", (req, res) => {
  const artist = artists.find((a) => a.id === Number(req.params.id));
  if (!artist) {
    return res.status(404).json({ error: "Artista no encontrado" });
  }
  res.json(artist);
});

crudRouter.post("/artists", (req, res) => {
  const resultado = ArtistSchema.safeParse(req.body);
  if (!resultado.success) {
    return res.status(400).json({ error: resultado.error.issues });
  }

  const artist: Artist = { id: nextId++, ...resultado.data };
  artists.push(artist);
  res.status(201).json(artist);
});

// 🔧 Probá vos: agregar GET /artists?genre=trap (mismo patrón que el
// filtro de la teoría) y notar que no hace falta tocar las otras rutas.
