# Ejemplos prácticos · Clase III · APIs REST

Esta carpeta reúne ejemplos simples basados en `rest_apis.md` para practicar cada tema, usando una API Express (persistencia en memoria) con estructura en 3 capas (routes → controllers → services → repositories).

Base: http://localhost:3000

---

## 0) Correr la API

```bash
cd unidad2/clases/III/ejemplos
npm install
npm run dev    # desarrollo
# o
npm run build && npm start
```

---

## 1) Métodos HTTP (CRUD de products)

```bash
# Listar productos (GET)
curl -sS http://localhost:3000/api/products

# Crear producto (POST)
curl -sS -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Teclado","price":19999,"currency":"ARS"}'

# Reemplazar completamente (PUT)
curl -sS -X PUT http://localhost:3000/api/products/prod_demo \
  -H "Content-Type: application/json" \
  -d '{"name":"Teclado Pro","price":24999,"currency":"ARS"}'

# Actualizar parcialmente (PATCH)
curl -sS -X PATCH http://localhost:3000/api/products/prod_demo \
  -H "Content-Type: application/json" \
  -d '{"price":21999}'

# Eliminar (DELETE)
curl -sS -X DELETE http://localhost:3000/api/products/prod_demo -i | sed -n '1,15p'
```

---

## 2) Parámetros (path, query, headers, body)

```bash
# Path + Query + Headers (lectura)
curl -sS "http://localhost:3000/api/products/prod_demo?include=reviews&page=2" \
  -H "Accept: application/json"

# Body + Headers (creación)
curl -sS -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Teclado","price":19999,"currency":"ARS"}'
```

---

## 3) Códigos de estado (comunes)

- 200/201/204/304
- 400/401/403/404/409/422/429
- 500/502/503/504

---

## 4) Naming e IDs

Bien

```http
GET /api/purchase-orders
GET /api/purchase-orders/123/items
POST /api/orders/123/cancel
```

Mal

```http
POST /api/createPurchaseOrder
GET  /api/orders?id=123
```

IDs: opacos (UUID/ULID), sin PII, URL-safe.

---

## 5) Relaciones entre resources

1→N y N→1

```http
GET /api/categories/{id}/products
GET /api/products/{id}/category
```

N↔N (link/unlink)

```http
GET    /api/products/{id}/tags
POST   /api/products/{id}/tags      # { "tagId": "tag_gaming" }
DELETE /api/products/{id}/tags/{tagId}
```

1→1 (singleton)

```http
GET  /api/status
```

---

## 6) Paginación y orden

```http
GET /api/products?page=2&limit=10&sort=price,-createdAt
```

---

## 7) Filtrado (básico)

```http
GET /api/products?status=active&categoryId=cat_peripherals
GET /api/products?minPrice=10000&maxPrice=20000
GET /api/products?tags=gaming,wireless
```

---

## 8) Idempotencia

```http
POST /api/payments
Idempotency-Key: 8d2f2a9e-1b4f-4b8b-9c8b-2f1c7d3e5a90
Content-Type: application/json

{ "amount": 19999, "currency": "ARS", "orderId": "ord_01HZ..." }
```

---

## 9) Seguridad (básico)

```http
GET /api/status
Accept: application/json
```

---

## 10) OpenAPI (OAS) mínimo

- Archivo fuente: `openapi-min.yaml` (en esta carpeta)
- UI integrada (Swagger UI): `http://localhost:3000/docs`
- Referencia: https://swagger.io/specification/

Para editar, modifica `openapi-min.yaml` y recarga `http://localhost:3000/docs`.

---

## 11) Categorías y Tags

```http
# Categorías
GET /api/categories
GET /api/categories/{id}
GET /api/categories/{id}/products

# Tags
GET /api/tags
GET /api/tags/{id}

# Tags de un producto
GET    /api/products/{id}/tags
POST   /api/products/{id}/tags      # { "tagId": "tag_gaming" }
DELETE /api/products/{id}/tags/{tagId}
```

---

## 12) Errores (formato sugerido)

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "name is required",
    "details": [{ "field": "name", "issue": "required" }]
  }
}
```
