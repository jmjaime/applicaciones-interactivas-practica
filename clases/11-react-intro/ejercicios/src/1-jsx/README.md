# Ejercicio 1.1: El detalle en JSX

Se trabaja en `Detalle.tsx`. Se ve en `http://localhost:5173/?ej=1`.

**Objetivo**: escribir JSX con expresiones a partir de un objeto de datos:
llaves, atributos en camelCase y clases condicionales.

**Requisitos**:

- [ ] Todo sale del objeto `propiedad` (`src/datos/propiedad.ts`): cambiar un dato ahí y guardar cambia la pantalla. No queda ningún texto de la propiedad escrito a mano en el JSX.
- [ ] El encabezado muestra un badge con la operación, el título como `h1` y el precio con la clase `precio`, en formato `ARS 650.000` (moneda + número con separador de miles).
- [ ] El badge tiene la clase `badge venta` o `badge alquiler` según la operación (cambiar `operacion` a `"Venta"` en los datos cambia el color).
- [ ] Características: una línea con la clase `atributos` del estilo `Palermo · 3 ambientes · 68 m² cubiertos · 75 m² totales`, y debajo la descripción.
- [ ] Extra (el 2.1 lo trae resuelto): inmobiliaria con nombre en negrita, la calificación con la clase `calificacion` en formato `★ 4.5 (12 reseñas)`, y el teléfono y el email como links que abren el discador (`tel:`) y el cliente de correo (`mailto:`).
- [ ] La Console no muestra warnings de React.
