# 4. OpenAPI generado desde Zod

`01-crud/schemas.ts` declara `ArtistSchema` una sola vez y ya lo usa para
validar el body de `POST /artists`. Acá, `document.ts` registra ese mismo
schema con `zod-to-openapi` para generar el documento que sirve Swagger UI
en `/docs` — no repite la ruta, solo la documenta. Code-first: nadie
escribió el YAML/JSON a mano. Corresponde al demo-box "Ejemplo — spec
generado desde los schemas de `Artist`" de `../../../rest-express-slides.md`.

```bash
npm run dev
# POST http://localhost:3000/artists   { "name": "...", "genre": "..." }  (01-crud/)
# http://localhost:3000/docs           (Swagger UI, en el navegador)
```
