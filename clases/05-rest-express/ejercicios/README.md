# Ejercicios — Clase 5: Semántica REST y bases de Express

Tema conductor: una librería online (`Author`/`Book`/`Collection`).

El test de cada tema vive **en la misma carpeta** que su `exercise.ts`
(`exercise.spec.ts` al lado).

## Instalación

```bash
npm install
npm run dev     # http://localhost:3001
npm test        # corre todo con los TODO sin resolver: debe fallar
```

## Ejercicios

Numeración y nombre de carpeta espejo de `../ejemplos/`: el mismo número
es el mismo tema del deck en los dos proyectos. Acá hay `05` porque el
integrador es práctica pura del alumno, sin demo correspondiente en
`ejemplos/`.

| Carpeta | Tema |
|---|---|
| `01-crud/` | CRUD de `Author` + códigos de estado + filtro por query param |
| `02-relaciones/` | Subrecurso `Collection`/`Book` (URLs anidadas) vs. mismo dato por query param + agregar/sacar books |
| `04-openapi/` | Schema de Zod para `Collection`: valida el body y genera la documentación OpenAPI |
| `05-integrador/` | `PATCH`/`DELETE` de `Author`, middlewares, manejo de errores centralizado, y el `Author` sumado al mismo documento OpenAPI de 04 (en parejas) |

No hace falta resolverlos en orden estricto dentro de un mismo bloque,
pero sí requieren el tema de la clase correspondiente ya visto — en
particular, `05-integrador/` da por sentado que `01-crud/` ya
está resuelto (el `Author` que extiende es el mismo).

## Cómo validar el propio trabajo

```bash
npm test                        # corre todos los tests
npm test -- 01-crud      # corre solo los tests de esa carpeta
npm run typecheck                # tsc --noEmit
```
