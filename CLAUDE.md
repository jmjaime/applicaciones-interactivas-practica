# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repo Is

Published practice materials (ejemplos + ejercicios) for the **Aplicaciones Interactivas** course at UADE — the student-facing counterpart to the `aplicaciones-interactivas` teaching repo (sibling directory, separate git history). There is no single runnable application at the root — each `ejemplos/` and `ejercicios/` folder is an independent Node.js/TypeScript or Vite project. `README.md` is the index of what's published, with links and per-class "Cómo ejecutar" instructions.

**This branch (`main`) intentionally mixes two numbering schemes right now**: the bulk of the repo still uses the old `unidadN/claseN` layout, but `clases/01-presentacion/` uses the new `clases/NN-tema/` numbering that matches `aplicaciones-interactivas`. A full renumbering of everything (all `unidadN/claseN` → `clases/NN-tema/`, plus a new Clase 3 folder) has already been done and is sitting on the `clases-2026-wip` branch — each remaining class gets merged from there into `main` and pushed only once that class is actually taught, so students don't see future material early. Don't "fix" the mixed numbering here without checking that branch first.

## Repo Layout

```
clases/01-presentacion/  New-scheme Clase 1: ejemplo de inspección de página con DevTools (no ejercicios)
presentacion/            Standalone HTML tareas (no build step)
unidad1/                 clase1, clase2, clase3 — TypeORM (mapping, relations, inheritance, migrations)
unidad2/                 clase1, clase2 — Express + TypeScript REST APIs (layered, OpenAPI specs)
unidad3/                 clase1 — HTML/CSS (static, no npm project)
unidad4/                 calse1 [sic], clase2, clase3 — React + Vite
```

## Commands Per Sub-Project

Always `cd` into the specific `ejemplos/` or `ejercicios/` folder first — no workspace tooling ties them together.

### TypeORM / persistence (unidad1)

```bash
npm install
npm run dev          # ts-node src/index.ts
npm run dev:watch     # nodemon --exec ts-node
npm run build         # tsc -> dist/
npm test              # jest (some run --runInBand due to shared SQLite file)
npm run clean          # rm -rf dist *.sqlite *.db
```
Exercises are split into per-topic npm scripts, e.g. `npm run herencia` (runs TPH/TPT/TPC in sequence) or a single variant like `npm run tph-sql`; `unidad1/clase3/repaso` exposes one script per exercise (`npm run sum`, `npm run factorial`, ...) that runs `jest --runInBand` against a single spec file.

### Express APIs (unidad2)

```bash
npm install
npm run dev    # ts-node-dev --respawn --transpile-only src/index.ts
npm run build  # tsc -p .
npm start      # node dist/index.js
npm test       # jest --runInBand
```
`ejemplos/` and `ejercicios/` under `unidad2/clase2` ship an `openapi.yaml`/`openapi-min.yaml` and a `requests.http` file for manual request testing.

### React + Vite (unidad4)

```bash
npm install
npm run dev      # Vite dev server
npm run build    # tsc -b && vite build
npm run lint     # ESLint
npm run preview  # preview production build
```

### Static HTML/CSS (unidad3)

No npm project — open the `.html` files (slides, `ejercicios/index.html`) directly in a browser.

## Key Conventions

- Same stack as the sibling teaching repo: Express 5, TypeORM (SQLite for dev), React 19 + Vite, Jest/ts-jest, supertest for API tests.
- `README.md` at the repo root is the canonical index of published content with direct links — update it when adding a new class folder.
- No root `package.json`; dependencies are installed independently per sub-project.
- **Do not push new class content to `origin/main` before that class is actually taught** — bring it in from `clases-2026-wip` when it's time, not before.
