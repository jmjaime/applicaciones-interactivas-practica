# 01 — Saludar

**Tema:** funciones y parámetros con valor por defecto.

## Consigna

Completar `saludar.ts`: la función recibe un `nombre` y un `saludo` opcional (si no se
pasa, vale `"Hola"`), y debe devolver el string `${saludo}, ${nombre}!`.

```ts
saludar("Ada");            // "Hola, Ada!"
saludar("Ada", "Buenas");  // "Buenas, Ada!"
```

## Cómo validar

```bash
npm test -- 01-saludar
```

## Documentación relacionada

- [MDN — Parámetros por defecto](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Functions/Default_parameters)
- [MDN — Template literals](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Template_literals)
