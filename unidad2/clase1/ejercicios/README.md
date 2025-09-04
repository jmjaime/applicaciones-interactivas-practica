# Unidad 2 · Clase I · Ejercicios – Express + TypeScript

Objetivo: practicar ruteo, parámetros, middlewares y manejo de errores implementando un mini CRUD de productos.

## Enunciado

Se provee un proyecto Express + TS con una base mínima y un servicio con datos precargados de productos.

Debés implementar los endpoints de `products` en el controlador, dejando el código limpio y tipado.

- Servicio provisto: `src/services/products.service.ts`
  - Datos iniciales en memoria
  - Funciones: `listAllProducts`, `findProduct`, `saveProduct`, `deleteProduct`
- Rutas: `src/routes/products.routes.ts`
- Controlador a completar: `src/controllers/products.controller.ts` (contiene TODOs)
- App: `src/app.ts` ya monta `/products`

## Requisitos funcionales

Implementar los siguientes endpoints:

- `GET /products`
  - Devuelve lista de productos
  - Soporta filtros opcionales por querystring:
    - `name` (substring, case‑insensitive)
    - `category` (igualdad, case‑insensitive)
    - `minPrice` (>=)
    - `maxPrice` (<=)
- `GET /products/:id`
  - Devuelve un producto por `id` o `404` si no existe
- `POST /products`
  - Crea un producto con body JSON `{ name: string, price: number, category: string }`
  - Valida campos requeridos (usar `requireFields` o validación propia) → `400` si falta algo
  - Responde `201` con el producto creado
- `DELETE /products/:id`
  - Elimina el producto por `id`
  - Responde `204` si elimina, `404` si no existe


## Cómo correr

```bash
# instalar deps
npm install

# ejecutar en desarrollo
npm run dev

# tests (si están configurados con Jest)
npm test
```

## cURL de referencia

```bash
# listar
curl -s http://localhost:3000/products | jq

# filtrar
curl -s 'http://localhost:3000/products?name=mouse&minPrice=10&maxPrice=100' | jq

# crear
curl -s -X POST http://localhost:3000/products \
  -H 'Content-Type: application/json' \
  -d '{"name":"Mouse Gamer","price":29.99,"category":"electronics"}' | jq

# eliminar
curl -i -X DELETE http://localhost:3000/products/1
```

## Pistas

- Podés reutilizar `requireFields(["name","price","category"])` del validador provisto.
- Recordá que `req.query` son strings; casteá a `number` los precios.
- Para búsquedas case‑insensitive, normalizá con `.toLowerCase()`.

## Extra (opcional)

- Agregar paginado simple con `page` y `limit` a `GET /products`.
- Ordenamiento por `price` asc/desc con `sort=price:asc|desc`.
- Endpoint `PUT /products/:id` para actualización completa.
