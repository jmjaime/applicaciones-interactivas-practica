// Ejercicio: Diseño de Entidades y Value Objects — Reservas de hotel
//
// Ver enunciado.md para la consigna completa. A diferencia de los demás
// ejercicios de esta carpeta, este es de diseño abierto: sin
// exercise.spec.ts, porque no hay una única respuesta correcta verificable
// por assertions — se evalúa la justificación escrita ("Decisión de
// mapeo"), no un resultado ejecutable.
//
// Los tipos de abajo arrancan vacíos a propósito (es la plantilla a
// completar) — por eso este archivo desactiva la regla que se queja de
// tipos `{}` vacíos; una vez completados los campos, la regla vuelve a
// aplicar normalmente.
/* eslint-disable @typescript-eslint/no-empty-object-type */

// ── Value Objects ────────────────────────────────────────────────────────

// TODO: completar Money (precio de una Reservation) — monto + moneda
// Decisión de mapeo:
//   - ¿Entidad o Value Object? ¿Por qué?
//   - ¿Cómo se persiste? (aplanado en columnas, JSON, ...)
export type Money = {
  // TODO
};

// TODO: completar StayPeriod (check-in / check-out de una Reservation)
// Decisión de mapeo:
export type StayPeriod = {
  // TODO
};

// ── Entidades ────────────────────────────────────────────────────────────

// TODO: completar Guest (huésped)
// Decisión de mapeo:
//   - ¿Qué identifica a un Guest? ¿Qué campos tiene?
export type Guest = {
  // TODO
};

// TODO: completar Room (habitación)
// Decisión de mapeo:
export type Room = {
  // TODO
};

// TODO: completar Reservation — relaciona Guest y Room, embebe Money y StayPeriod
// Decisión de mapeo:
//   - ¿Qué tipo de relación es Reservation → Guest? ¿Y Reservation → Room?
//   - ¿Cómo se resuelve en tablas? (pensar en las estrategias vistas en Relaciones)
export type Reservation = {
  // TODO
};
