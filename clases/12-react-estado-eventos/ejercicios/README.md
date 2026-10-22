# Ejercicios — Clase 12: Estado y formularios

## Instalación

```bash
npm install
npm run dev          # http://localhost:5173 → índice de ejercicios
```

Temática conductora: el **lado del Vendedor** en el TPO. Incluye las
solicitudes de visita, las consultas recibidas, el formulario para
publicar una propiedad y el integrador **Mis propiedades** de la clase
pasada, que suma alta y edición.

Cada carpeta es un **punto de partida** independiente y se abre con `?ej=N`
en la URL (o desde el índice). Los ejercicios 1, 2 y 3 son pantallas
distintas. La carpeta 4 trae resuelto el 3, y la 5 trae resueltos el 3 y
el integrador de la Clase 11. Si un ejercicio no se terminó, el
siguiente se puede empezar igual desde su carpeta.

Los datos están en `src/datos/`, los tipos en `src/types.ts` y los
estilos (`src/estilos.css`) ya están resueltos. Los enunciados dicen qué
clase usar en cada elemento.

## Estructura de ejercicios

### 1. Estado en profundidad (`src/1-estado/`)

- [1 · Solicitudes de visita](src/1-estado/README.md): confirmar, rechazar, descartar, ordenar y resumen por estado, sin mutar.

```text
?ej=1
```

### 2. Compartir estado (`src/2-compartir/`)

- [2 · Bandeja de consultas](src/2-compartir/README.md): subir la selección al padre, responder desde el panel y reiniciar el borrador con `key`.

```text
?ej=2
```

### 3. Formularios (`src/3-formularios/`)

- [3 · Publicar propiedad](src/3-formularios/README.md): formulario controlado, campos según el tipo y validaciones del TPO.

```text
?ej=3
```

### 4. Refs (`src/4-refs/`)

- [4 · Foco en el error](src/4-refs/README.md): foco en el primer campo inválido y en el título al publicar.

```text
?ej=4
```

### 5. Integrador (`src/5-integrador/`)

- [Mis propiedades: alta y edición](src/5-integrador/README.md) (autoestudio): combina los cuatro temas sobre el integrador de la Clase 11.

```text
?ej=5
```

## Otros scripts

```bash
npm run build        # typecheck (tsc -b) + build de producción en dist/
npm run lint         # ESLint
npm run preview      # sirve dist/
```

## Cómo verificar

No hay tests automáticos: cada requisito del enunciado es algo que se
comprueba mirando la página, DevTools o el editor.

- **La página**: lo que pide cada requisito. Los casos borde se prueban
  editando `src/datos/`, por ejemplo con todas las consultas respondidas o
  sin solicitudes.
- **React DevTools** → Components: dónde vive cada estado (en el 2, la
  lista no tiene que tener hooks) y que lo derivado no aparezca como
  estado.
- **Console**: sin warnings de React (falta de `key`, un input que pasa de
  no controlado a controlado).
- **`npm run build`**: tiene que compilar sin errores de TypeScript.
