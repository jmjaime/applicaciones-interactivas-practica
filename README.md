# Aplicaciones Interactivas — Prácticas y Ejemplos

Prácticas y ejemplos de la materia **Aplicaciones Interactivas** (UADE), organizados por clase: una carpeta por clase en `clases/NN-tema/`, con `ejemplos/` (material de referencia y demos) y `ejercicios/` (enunciados y tests para practicar).

## Índice

| Carpeta | Tema | Contenido publicado |
|---|---|---|
| `clases/01-presentacion/` | Presentación de la materia | Slides (materia, Apps Web, Intro JS/TS/Node) + inspección de página con DevTools + sintaxis JS/TS + setup práctico Node/TS/Jest + ejercicios de repaso con tests |
| `clases/02-js-ts-herramientas/` | JS/TS y herramientas de desarrollo | Slides + servidor Express+TS por bloques (routing, ESLint, validaciones manual/Zod, filtrar/dar forma/modificar, API externa) + ejercicios con casos propios + tarea de autoestudio |
| `clases/03-persistencia/` | Mecanismos de Persistencia | Slides + demos de mapeo objeto-relacional (básico, relaciones, herencia, objetos embebidos) + ejercicios con casos propios + ejercicio de diseño Entidad/Value Object |
| `clases/04-typeorm/` | Framework de Persistencia: TypeORM | Slides + demos con TypeORM (entidades, restricciones/validación, relaciones, carga, embebidos, herencia, query builder, optimización, migraciones, transacciones) + ejercicios con dominio propio |
| `clases/05-rest-express/` | Semántica REST y bases de Express | Slides + demo de servidor Express+TS (CRUD, relaciones entre recursos, middlewares/manejo de errores, OpenAPI generado desde Zod) + ejercicios con dominio propio |
| `clases/06-apis-rest/` | APIs REST | Ejercicio único: ABM de `Propiedad` (TPO) con TypeORM — migraciones, seed, repository/service/controller en capas, validación, manejo de errores y paginación |
| `clases/07-repaso-tpo/` | Repaso + TPO | Slides + guía (sin ejemplos/ejercicios) para repasar Repository, rutas/params/paginado, validación y documentación de la API, y sumar JWT, aplicándolos directamente sobre el proyecto propio del TPO |
| `clases/09-clientes-web/` | Del servidor al cliente | Slides (arquitectura de webservices, evolución del cliente web, sesión y JWT) + servidor Express+TS con eventos, sesión con cookie y JWT (registro, login, `requireAuth`, dueño); la práctica se hace sobre el TPO propio |
| `clases/10-html-css/` | Fundamentos de la web | Slides (HTML, CSS y JS sobre el DOM) + demos estáticas sobre el listado de propiedades (HTML semántico, cascada, Flexbox/Grid, eventos, `fetch`, estado + render) + ejercicios por bloque con integrador + páginas de referencia |

## Cómo ejecutar

- `clases/01-presentacion/`: ver su [README](clases/01-presentacion/README.md) — slides en `slides/`, actividad de DevTools en `ejemplos/01-inspeccionar-pagina/`, ejemplos de sintaxis en `ejemplos/02-sintaxis-js-ts/` (`node <archivo>`), el setup práctico en `ejemplos/03-setup-node-ts/` + `ejemplos/04-cli-ts-intro/` (`npm install`), y los ejercicios de repaso en `ejercicios/` (`npm install` + `npm test`).
- `clases/02-js-ts-herramientas/`: ver su [README](clases/02-js-ts-herramientas/README.md) — slides en `slides/`; ejemplos en `ejemplos/` (`npm install && npm run dev`, servidor único en `http://localhost:3000` con las rutas de `01-express-basico` a `05-api-externa`); ejercicios en `ejercicios/` con los mismos temas más `06-integrador` (`npm install && npm test`); y la lectura de autoestudio en [`tarea-para-el-hogar.md`](clases/02-js-ts-herramientas/tarea-para-el-hogar.md).
- `clases/03-persistencia/`: ver su [README](clases/03-persistencia/README.md) — slides en `slides/`; ejemplos en `ejemplos/` (`npm install`, mapeo básico, relaciones, herencia y objetos embebidos como autoestudio); ejercicios en `ejercicios/` con los mismos temas más un ejercicio de diseño abierto (`npm install && npm test`).
- `clases/04-typeorm/`: ver su [README](clases/04-typeorm/README.md) — slides en `slides/`; ejemplos en `ejemplos/` (`npm install`, un tema por carpeta, `npm run <script>`); ejercicios en `ejercicios/` con los mismos temas más un ejercicio integrador de relaciones N:M (`npm install && npm test`).
- `clases/05-rest-express/`: ver su [README](clases/05-rest-express/README.md) — slides en `slides/`; ejemplos en `ejemplos/` (`npm install && npm run dev`, servidor único en `http://localhost:3000` con las rutas de `01-crud` a `04-openapi`); ejercicios en `ejercicios/` con los mismos temas sobre otro dominio más una práctica integradora (`npm install && npm test`).
- `clases/06-apis-rest/`: ver su [README](clases/06-apis-rest/README.md) — sin slides publicadas; un solo ejercicio en `ejercicios/` (`npm install && npm test`), servidor en `http://localhost:3001` (`npm run dev`).
- `clases/07-repaso-tpo/`: ver su [README](clases/07-repaso-tpo/README.md) — slides en `slides/clase7-slides.html`; sin proyecto npm, guía de repaso para aplicar directamente sobre el proyecto propio del TPO, no hay nada que instalar ni correr acá.
- `clases/09-clientes-web/`: ver su [README](clases/09-clientes-web/README.md) — slides en `slides/clase9-slides.html`; ejemplos en `ejemplos/` (`npm install`, copiar `.env.example` a `.env`, `npm run dev`, servidor en `http://localhost:3000` con `1.1-eventos`, `3.1-sesion-cookie` y `3.2-jwt`, requests en `requests.http`); sin `ejercicios/`, la práctica de autenticación se hace sobre el proyecto propio del TPO.
- `clases/10-html-css/`: ver su [README](clases/10-html-css/README.md) — slides en `slides/clase10-slides.html`; sin `npm install`: ejemplos en `ejemplos/` y ejercicios en `ejercicios/` (HTML/CSS se abren con doble click; los de JS se sirven con `npx serve` dentro de la carpeta); páginas de consulta en `referencia/`.

## Bibliografía

Ver [`bibliografia.md`](bibliografia.md) — libros y documentación oficial de la materia.

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
  03-persistencia/
    slides/                        # Slides de la clase (HTML)
    ejemplos/                      # Mapeo básico, relaciones, herencia, embebido (01 a 04)
    ejercicios/                    # Mismos temas con casos propios + diseño abierto (npm test)
  04-typeorm/
    slides/                        # Slides de la clase (HTML)
    ejemplos/                      # Entidades a transacciones con TypeORM (01 a 11)
    ejercicios/                    # Mismos temas con dominio propio + integrador N:M (npm test)
  05-rest-express/
    slides/                        # Slides de la clase (HTML)
    ejemplos/                      # Servidor Express+TS por tema (01 a 04)
    ejercicios/                    # Mismos temas con dominio propio + práctica integradora (npm test)
  06-apis-rest/
    ejercicios/                    # ABM de Propiedad con TypeORM, capas + migraciones + seed (npm test)
  07-repaso-tpo/
    slides/                        # Slides de la clase (HTML)
    README.md                      # Repaso: Repository, rutas/params/paginado, validación, documentación y JWT, aplicado al TPO propio
  09-clientes-web/
    slides/                        # Slides de la clase (HTML)
    ejemplos/                      # Servidor Express+TS: eventos (1.1), sesión con cookie (3.1), JWT (3.2)
  10-html-css/
    slides/                        # Slides de la clase (HTML)
    ejemplos/                      # Demos estáticas: HTML (1.x), CSS (2.x), JS sobre el DOM (3.x)
    ejercicios/                    # Perfil de inmobiliaria por bloque + integrador (sin npm)
    referencia/                    # Páginas interactivas de consulta de HTML y CSS
```
