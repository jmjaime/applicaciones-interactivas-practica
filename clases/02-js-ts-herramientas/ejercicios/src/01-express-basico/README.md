#### Ejercicio 1.1: Ruta eco

**Objetivo**: practicar routing y lectura de `req.body` en Express (visto
en el Bloque 1 de la clase, demo en `ejemplos/src/01-express-basico/`).

**Requisitos**:

- [ ] `POST /eco` recibe `{ "texto": "..." }` en el body.
- [ ] Responde `200` con `{ "recibido": "<texto recibido>" }`.
- [ ] Si `texto` no vino o no es un string, responde `400` con
      `{ "error": "texto es requerido" }` (sin usar Zod todavía — eso es
      el Bloque 3).

En clase, 15-20 min.
