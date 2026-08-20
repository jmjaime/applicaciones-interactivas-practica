# Clase 3 — Mecanismos de Persistencia

Continúa desde la Clase 2: acá se deja Express de lado por un momento para entender cómo se persisten los objetos en una base de datos relacional, escribiendo el SQL a mano.

## Slides

- [slides/clase3-slides.html](slides/clase3-slides.html)

## Contenido

1. **Mapeo básico** — clase → tabla, instancia → fila, propiedad → columna (`ejemplos/src/01-mapeo-basico/`).
2. **Relaciones** — 1:1, 1:N/N:1 y N:M entre entidades, con foreign keys (`ejemplos/src/02-mappeo-relaciones/`).
3. **Herencia** — misma jerarquía `Vehicle` mapeada con 3 estrategias: Table Per Hierarchy, Table Per Class y Joined Table (`ejemplos/src/03-mappeo-herencia/`).
4. **Objetos embebidos** (autoestudio) — un Value Object (`Money`) embebido de 3 formas: columnas, CSV y JSON (`ejemplos/src/04-mappeo-embebido/`).

## Cómo ejecutar

```bash
cd ejemplos
npm install
npm run mapeo-basico-sql   # o cualquier otro script, ver README de ejemplos
```

Ver el [README de ejemplos](ejemplos/README.md) para el resto de los scripts.

## Ejercicios

`ejercicios/` — mismos temas (relaciones, herencia) con casos propios, más un ejercicio de diseño abierto (Entidad/Value Object). Ver su [README](ejercicios/README.md).

```bash
cd ejercicios
npm install
npm test
```
