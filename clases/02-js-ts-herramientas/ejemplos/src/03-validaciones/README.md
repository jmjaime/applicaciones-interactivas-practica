# 3. Validaciones: manual y con Zod

Mismo caso (`POST /tareas`, campo `titulo` requerido) resuelto dos veces
para comparar: `manual.ts` con `if`/`return`, `zod.ts` con un schema.
Corresponde al Bloque 3 de `../../../slides/clase2-slides.html`.

```bash
npm run dev
# POST http://localhost:3000/tareas-manual   { "titulo": "" }   → 400
# POST http://localhost:3000/tareas-zod       { "titulo": "" }   → 400
```
