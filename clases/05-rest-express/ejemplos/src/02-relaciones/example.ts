import { Router } from "express";
import { artists, tracks } from "../data";
import { HttpError } from "../errors";

export const relacionesRouter = Router();

// Subrecurso: jerarquía fija, siempre en el contexto de un artista.
relacionesRouter.get("/artists/:id/tracks", (req, res, next) => {
  const artistId = Number(req.params.id);
  const artist = artists.find((a) => a.id === artistId);
  if (!artist) {
    return next(new HttpError(404, "Artista no encontrado"));
  }

  res.json(tracks.filter((t) => t.artistId === artistId));
});

// Mismo dato, filtro por query param: no asume jerarquía, es opcional.
relacionesRouter.get("/tracks", (req, res) => {
  const { artistId } = req.query;
  const resultado = artistId
    ? tracks.filter((t) => t.artistId === Number(artistId))
    : tracks;
  res.json(resultado);
});

// 🔧 Probá vos: comparar GET /artists/42/tracks con GET /tracks?artistId=42
// (mismo resultado, dos caminos) y después GET /artists/999/tracks — el 404
// sale del `next(err)` de acá, pero lo procesa el middleware de errores del
// tema 02.
