#### Ejercicio 3.1: Validar un comentario (manual)

**Objetivo**: practicar validación manual con `if` (visto en el Bloque 3,
demo en `ejemplos/src/03-validaciones/manual.ts` — mismo concepto, otro
caso: ahí se valida `titulo`, acá `autor` + `contenido`).

**Requisitos**:

- [ ] `POST /comentarios-manual` exige `autor` (string no vacío) y
      `contenido` (string no vacío, máximo 280 caracteres).
- [ ] Si falta o está mal alguno de los dos, `400` con
      `{ "error": "<mensaje>" }`.
- [ ] Si está todo bien, `201` con `{ autor, contenido }`.

#### Ejercicio 3.2: Validar un comentario (Zod)

**Objetivo**: mismo caso que 3.1, resuelto con un schema de Zod — comparar
cuánto código cambió entre las dos versiones.

**Requisitos**:

- [ ] Completar `comentarioSchema` en `zod.ts` con las mismas reglas de
      3.1.
- [ ] `POST /comentarios-zod` responde igual que la versión manual ante
      los mismos casos.

En clase, 20-25 min entre los dos.
