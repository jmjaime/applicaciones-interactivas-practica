# Clase 5 — Semántica REST y bases de Express

Continúa desde la Clase 2: mismo servidor Express+TS de esa clase (rutas, `req.body`/`req.query`, Zod), ahora con la semántica REST más formal y sobre el dominio de streaming de música de la Clase 4 (`Artist`/`Track`).

## Slides

- [slides/clase5-slides.html](slides/clase5-slides.html)

## Contenido

1. **¿Qué es una API REST?** — protocolo vs. contrato, recursos y URLs, verbos HTTP como CRUD, idempotencia.
2. **CRUD básico con Express** — recap de Clase 2 y demo sobre `Artist` (`ejemplos/src/01-crud/`).
3. **Códigos de estado HTTP** — familias 2xx/3xx/4xx/5xx.
4. **Tipos de parámetros** — path, query, body (recap) y headers (nuevo).
5. **Relaciones entre recursos** — subrecursos (URLs anidadas) y recurso único (*singleton*) (`ejemplos/src/02-relaciones/`).
6. **Niveles de madurez de Richardson** — y mención de HATEOAS.
7. **Middlewares y manejo de errores centralizado** (`ejemplos/src/03-middlewares/`).
8. **OpenAPI con Zod** — el mismo schema que valida el body genera el contrato, sin YAML a mano (`ejemplos/src/04-openapi/`).

## Cómo ejecutar

```bash
cd ejemplos
npm install
npm run dev   # http://localhost:3000
```

Ver el [README de ejemplos](ejemplos/README.md) para el resto de los scripts.

## Ejercicios

`ejercicios/` — tema conductor de una librería online (`Author`/`Book`/`Collection`), con los mismos temas más una práctica integradora. Ver su [README](ejercicios/README.md).

```bash
cd ejercicios
npm install
npm test
```
