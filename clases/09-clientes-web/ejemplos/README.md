# Ejemplos — Clase 9: Del servidor al cliente

Un solo servidor Express+TS con los ejemplos de los Bloques 1 y 3 de
`../slides/clase9-slides.html`, en el mismo orden que las slides (el
Bloque 2 se ve con DevTools sobre sitios reales, sin código propio). Dominio: el marketplace del TPO, con los mismos
nombres que el template (`Seller`, `Agency`, `Comment`, `Activity`), pero
con datos en memoria en vez de TypeORM.

## Instalación

```bash
npm install
# copiar .env.example a .env (trae JWT_SECRET y JWT_EXPIRES_IN)
npm run dev   # http://localhost:3000, recarga automática
```

Todas las requests están en `requests.http` (extensión REST Client de VS
Code), en el mismo orden que la demo. Vendedores precargados: `ana@demo.com`
y `bruno@demo.com`, password `123456`.

## Estructura de ejemplos

La numeración sigue el bloque de la slide: `1.1` es del Bloque 1, `3.x`
del Bloque 3.

### 1.1 **Actividad síncrona vs. por eventos** (`1.1-eventos/`)

La misma alta de comentario en dos versiones: una llama directo a
`activityService` (si Actividad falla, el cliente recibe 500 aunque el
comentario se guardó) y otra publica `comment.created` en un
`EventEmitter` (el comentario responde 201 y el fallo queda aislado en el
suscriptor). `POST /demo/activity/down` y `/up` simulan la caída.

```bash
# POST /sync/properties/:id/comments
# POST /events/properties/:id/comments
# GET  /comments · GET /activity
```

### 3.1 **Sesión en el servidor + cookie** (`3.1-sesion-cookie/`)

Login stateful: la sesión vive en un `Map` del proceso y la cookie
`HttpOnly` solo lleva el id. Al reiniciar el server (guardar cualquier
archivo) la sesión se pierde: es lo mismo que pasa si la request cae en
otra instancia detrás de un load balancer.

```bash
# POST /session/login · GET /session/me · POST /session/logout
```

### 3.2 **JWT: registro, login, `requireAuth` y dueño** (`3.2-jwt/`)

Registro con `bcryptjs` (Seller + Agency en el mismo paso, `409` si el
email o el nombre de fantasía ya existen), login que devuelve dos tokens
(un **access** JWT de 15 min en el body y un **refresh** de 7 días en una
cookie `HttpOnly`, guardado en el servidor), middleware `requireAuth`
(`401`) y chequeo de dueño en el service (`403`). A diferencia de 3.1, el
access **sobrevive al reinicio** del server: no hay nada guardado, solo se
verifica la firma. El refresh, en cambio, se pierde (está en memoria) y
por eso se puede revocar con el logout.

```bash
# POST /auth/register · POST /auth/login · GET /auth/me
# POST /auth/refresh · POST /auth/logout
# GET /agencies/:id (público) · PUT /agencies/:id (protegido + dueño)
```

Para la demo de token vencido: `JWT_EXPIRES_IN=10s` en `.env`, reiniciar,
loguearse y esperar.

## Otros scripts

```bash
npm run typecheck   # tsc --noEmit
npm run build       # compila a dist/
npm start           # corre dist/server.js
```
