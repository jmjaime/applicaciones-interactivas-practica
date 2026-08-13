# Aplicaciones Interactivas — Prácticas y Ejemplos

Prácticas y ejemplos de la materia **Aplicaciones Interactivas** (UADE), organizados por clase: una carpeta por clase en `clases/NN-tema/`, con `ejemplos/` (material de referencia y demos) y `ejercicios/` (enunciados y tests para practicar).

## Índice

| Carpeta | Tema | Contenido publicado |
|---|---|---|
| `clases/01-presentacion/` | Presentación de la materia | Slides (materia, Apps Web, Intro JS/TS/Node) + inspección de página con DevTools + sintaxis JS/TS + setup práctico Node/TS/Jest + ejercicios de repaso con tests |
| `clases/02-js-ts-herramientas/` | JS/TS y herramientas de desarrollo | Slides + servidor Express+TS por bloques (routing, ESLint, validaciones manual/Zod, filtrar/dar forma/modificar, API externa) + ejercicios con casos propios + tarea de autoestudio |

## Cómo ejecutar

- `clases/01-presentacion/`: ver su [README](clases/01-presentacion/README.md) — slides en `slides/`, actividad de DevTools en `ejemplos/01-inspeccionar-pagina/`, ejemplos de sintaxis en `ejemplos/02-sintaxis-js-ts/` (`node <archivo>`), el setup práctico en `ejemplos/03-setup-node-ts/` + `ejemplos/04-cli-ts-intro/` (`npm install`), y los ejercicios de repaso en `ejercicios/` (`npm install` + `npm test`).
- `clases/02-js-ts-herramientas/`: ver su [README](clases/02-js-ts-herramientas/README.md) — slides en `slides/`; ejemplos en `ejemplos/` (`npm install && npm run dev`, servidor único en `http://localhost:3000` con las rutas de `01-express-basico` a `05-api-externa`); ejercicios en `ejercicios/` con los mismos temas más `06-integrador` (`npm install && npm test`); y la lectura de autoestudio en [`tarea-para-el-hogar.md`](clases/02-js-ts-herramientas/tarea-para-el-hogar.md).

## Estructura del repositorio (resumen)

```text
clases/
  01-presentacion/
    slides/                        # Slides de la clase (HTML)
    ejemplos/
      01-inspeccionar-pagina/      # Inspección de página real con DevTools
      02-sintaxis-js-ts/           # Sintaxis básica de JS y TS
      03-setup-node-ts/            # Setup de un proyecto Node+TS desde cero
      04-cli-ts-intro/             # Calculadora + filtro JSON (con TODOs)
    ejercicios/                    # 10 ejercicios cortos de repaso, con tests y README propio (npm test)
  02-js-ts-herramientas/
    slides/                        # Slides de la clase (HTML)
    ejemplos/                      # Servidor Express+TS por bloques (01 a 05)
    ejercicios/                    # Mismos temas con casos propios + integrador (npm test)
    tarea-para-el-hogar.md         # Autoestudio: ==/===, POO prototipal, event loop
```
