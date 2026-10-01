# Clase 9 — Del servidor al cliente

Hilo de la clase: **¿quién es el cliente y cómo sabe el servidor quién es?**
Arquitectura (dónde vive la API) → evolución del cliente (quién la consume:
una SPA) → sesión vs. JWT (cómo se identifica a quien llama). Los ejemplos
usan el dominio del TPO (`Seller`, `Agency`, `Comment`, `Activity`) con
datos en memoria.

## Slides

- [slides/clase9-slides.html](slides/clase9-slides.html)

## Contenido

1. **Arquitectura de webservices** — cliente-servidor y contrato, monolito vs. distribuido, microservicios (cuándo sí y cuándo no), comunicación síncrona vs. por eventos (`ejemplos/src/1.1-eventos/`).
2. **Evolución del cliente web** — documentos estáticos → server-rendered → AJAX → SPA → híbridos, con un ejemplo de código y un sitio real (Wayback Machine o en vivo) para cada uno; cliente liviano vs. pesado.
3. **Sesión y JWT** — HTTP stateless, sesión en el servidor + cookie (`ejemplos/src/3.1-sesion-cookie/`), JWT (anatomía, claims, sesión vs. JWT, dónde guarda el token la SPA, refresh token), contraseñas con `bcryptjs`, y registro, login, `requireAuth` y chequeo de dueño (`ejemplos/src/3.2-jwt/`).

## Cómo ejecutar

```bash
cd ejemplos
npm install
cp .env.example .env
npm run dev   # http://localhost:3000
```

Las requests están en `ejemplos/requests.http`. Ver el [README de ejemplos](ejemplos/README.md) para el detalle de cada ejemplo y el resto de los scripts.

## Práctica

No hay `ejercicios/`: la práctica es sumar autenticación al **propio proyecto del TPO** — registro con password hasheado, login que devuelve un JWT, `requireAuth` en las rutas de escritura (`401`) y chequeo de dueño (`403`). Los pasos están en la última slide.

```bash
npm i jsonwebtoken bcryptjs
npm i -D @types/jsonwebtoken
```
