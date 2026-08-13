# 4. Filtrar, dar forma y modificar datos

`example.ts`: un array de `tareas` en memoria, expuesto con tres rutas —
filtrar con query params, dar forma a la respuesta con destructuring
(subconjunto de propiedades), y modificar con spread. Manejo de errores
genérico (`if (!encontrado) res.status(404)...`), sin clases de error ni
middleware. Corresponde al Bloque 4 de `../../../slides/clase2-slides.html`.

```bash
npm run dev
# GET   http://localhost:3000/tareas
# GET   http://localhost:3000/tareas?estado=pendiente
# GET   http://localhost:3000/tareas/1/resumen
# PATCH http://localhost:3000/tareas/1   { "estado": "hecha" }
```
