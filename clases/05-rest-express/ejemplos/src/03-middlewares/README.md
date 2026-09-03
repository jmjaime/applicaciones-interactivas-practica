# 2. Middlewares y manejo de errores

Logging global (`../middlewares/logging.ts`) y manejo de errores centralizado
(`../middlewares/errorHandler.ts`, middleware de 4 parámetros) aplicados a
toda la app — se ven en cualquier request, no solo en `/demo/error`.
Corresponde al demo-box "Ejemplo — middleware de logging y manejo de
errores" de `../../../rest-express-slides.md`.

```bash
npm run dev
# GET http://localhost:3000/demo/error       (400 a propósito)
# GET http://localhost:3000/artists/999/tracks (404 del tema 1, mismo middleware)
```
