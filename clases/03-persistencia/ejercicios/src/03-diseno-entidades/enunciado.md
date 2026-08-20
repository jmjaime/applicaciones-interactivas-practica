# Ejercicio: Diseño de Entidades y Value Objects — Reservas de hotel

## Objetivo

Aplicar el criterio Entidad/Value Object visto en la clase a un dominio
nuevo (sin relación con el TPO ni con los ejemplos ya vistos): diseñar los
types de un sistema de reservas de hotel y decidir cómo se persistiría cada
uno.

## Contexto

Un hotel necesita registrar:

- **Huéspedes** que se alojan.
- **Habitaciones** disponibles.
- **Reservas**: un huésped reserva una habitación por un período, a un
  precio determinado.

## Requisitos

Completar en `plantilla.ts`:

- [ ] `Guest` (huésped)
- [ ] `Room` (habitación)
- [ ] `Reservation`, relacionando `Guest` y `Room`
- [ ] `Money` (precio de la reserva: monto + moneda) como Value Object
      embebido en `Reservation`
- [ ] `StayPeriod` (check-in / check-out) como Value Object embebido en
      `Reservation`
- [ ] En cada type, completar el comentario **"Decisión de mapeo"**:
      ¿es Entidad o Value Object? ¿por qué? ¿qué estrategia de persistencia
      usarían (tabla propia + FK, embebido en columnas, JSON)?

## Evaluación

Sin tests automatizados — es un ejercicio de diseño abierto, no hay una
única respuesta correcta verificable por assertions. Se corrige por la
justificación escrita en "Decisión de mapeo", no por un resultado
ejecutable.
