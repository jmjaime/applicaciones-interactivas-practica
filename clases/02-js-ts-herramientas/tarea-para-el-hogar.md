# Autoestudio — Comparaciones, modelo de objetos y event loop en JavaScript

Lectura para el hogar, con fuentes oficiales de MDN.

## Comparaciones: `==` vs `===`

**Referencia**: [MDN — Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)

`==` compara con coerción de tipos (convierte los operandos antes de
comparar); `===` compara sin conversión, tipo y valor tienen que
coincidir.

```javascript
0 == false; // true  — coerción: false se convierte a 0
"" == false; // true  — coerción: "" y false se convierten a 0
null == undefined; // true  — caso especial: se consideran iguales entre sí

0 === false; // false — distinto tipo (number vs boolean)
"" === false; // false — distinto tipo (string vs boolean)
null === undefined; // false — distinto tipo
```

En la práctica, `===` es la opción por defecto: evita sorpresas de
coerción implícita. `==` solo tiene un uso difundido: `variable ==
null` para chequear `null` y `undefined` a la vez en un solo paso.

## Modelo de objetos: el paradigma prototipal

JavaScript no está basado en clases — está basado en **prototipos**. La
sintaxis de `class` (ES6) es syntactic sugar sobre el mismo mecanismo:
cada objeto tiene una referencia a otro objeto (su prototipo) del que
hereda propiedades y métodos.

```javascript
// Herencia prototipal (por debajo, siempre fue así)
function Persona(nombre) {
  this.nombre = nombre;
}
Persona.prototype.saludar = function () {
  return "Hola, soy " + this.nombre;
};

// Sintaxis de clases (ES6+) — mismo mecanismo, otra cara
class Persona {
  constructor(nombre) {
    this.nombre = nombre;
  }
  saludar() {
    return `Hola, soy ${this.nombre}`;
  }
}
```

**Referencia**: [MDN — Object prototypes](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/JavaScript/Object_prototypes)

## Event loop: por qué JavaScript no se bloquea

JavaScript corre en un solo hilo, pero es asíncrono por diseño: mientras
espera una operación de I/O (red, archivos, timers), el **event loop**
sigue procesando otras cosas y solo vuelve al callback cuando el
resultado está listo. Así no se bloquea la interfaz ni el resto del
programa.

```
   ┌─────────────────────────────┐
┌─>│         Event Loop          │
│  └─────────────────────────────┘
│  ┌─────────────────────────────┐
│  │      Call Stack             │<─── Código síncrono
│  └─────────────────────────────┘
│  ┌─────────────────────────────┐
└──│      Callback Queue         │<─── setTimeout, APIs
   └─────────────────────────────┘
```

La forma de escribir código asíncrono fue cambiando con el tiempo, pero
el event loop de abajo es siempre el mismo:

```javascript
// Callbacks
setTimeout(function () {
  console.log("Listo");
}, 1000);

// Promises (ES6)
fetch("/api").then((response) => response.json());

// Async/await (ES8) — mismo mecanismo, sintaxis más lineal
async function getData() {
  const response = await fetch("/api");
  return await response.json();
}
```

**Referencia**: [MDN — Event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop)
