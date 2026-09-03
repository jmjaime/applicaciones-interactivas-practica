# 1. CRUD básico de `Artist`

`GET /artists`, `GET /artists/:id` (con `404`), `POST /artists` (con
`400`/`201`) sobre un array en memoria. Corresponde al demo-box "Ejemplo —
CRUD básico de `Artist`" de `../../../rest-express-slides.md`.

```bash
npm run dev
# GET  http://localhost:3000/artists
# GET  http://localhost:3000/artists/42
# GET  http://localhost:3000/artists/999   (404)
# POST http://localhost:3000/artists       { "name": "...", "genre": "..." }
```
