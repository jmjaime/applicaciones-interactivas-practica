# 1. Relaciones entre recursos

Mismos datos, dos formas de pedirlos: subrecurso anidado (`/artists/:id/tracks`)
vs. filtro por query param (`/tracks?artistId=`). Corresponde al demo-box
"Ejemplo — mismos datos, dos formas" de `../../../rest-express-slides.md`.

```bash
npm run dev
# GET http://localhost:3000/artists/42/tracks
# GET http://localhost:3000/tracks?artistId=42
```
