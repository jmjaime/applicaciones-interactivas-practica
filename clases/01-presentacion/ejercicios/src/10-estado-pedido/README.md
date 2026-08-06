# 10 — Estado de pedido (enum)

**Tema:** TypeScript — `enum`.

## Consigna

Completar `estado-pedido.ts` en dos pasos:

1. Definir el enum `EstadoPedido` (hoy está vacío) con tres valores de tipo string:
   - `Pendiente = "PENDIENTE"`
   - `Enviado = "ENVIADO"`
   - `Entregado = "ENTREGADO"`
2. Implementar `siguienteEstado(estado)`: devuelve el siguiente estado en el flujo
   `Pendiente -> Enviado -> Entregado`. Si ya está en `Entregado`, lo devuelve sin
   cambios (es el estado final). Usar un `switch (estado)` con un `case` por cada valor
   del enum.

```ts
siguienteEstado(EstadoPedido.Pendiente);  // EstadoPedido.Enviado
siguienteEstado(EstadoPedido.Entregado);  // EstadoPedido.Entregado (no cambia)
```

**Importante:** hasta que no completes el enum, `npm test -- 10-estado-pedido` ni
siquiera va a llegar a correr los tests — va a fallar con errores de compilación tipo
`Property 'Pendiente' does not exist on type 'typeof EstadoPedido'`. Eso es esperado: a
diferencia de los demás ejercicios (que compilan y fallan en rojo), acá TypeScript te
avisa *antes* de correr nada que el enum todavía no tiene esos valores definidos.

## Cómo validar

```bash
npm test -- 10-estado-pedido
```

## Documentación relacionada

- [TypeScript Handbook — Enums](https://www.typescriptlang.org/docs/handbook/enums.html)
- [MDN — switch](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/switch)
