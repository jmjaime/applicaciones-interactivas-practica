# Ejercicios — Clase 11: Introducción a React

## Instalación

```bash
npm install
npm run dev          # http://localhost:5173 → índice de ejercicios
```

Temática conductora: el **detalle de una propiedad** (pantalla del
Interesado en el TPO): fotos, características, inmobiliaria y consultas. El
integrador es otra pantalla del TPO: **Mis propiedades**, del Vendedor.

Cada carpeta es un **punto de partida** independiente que se abre con
`?ej=N` en la URL (o desde el índice): la carpeta 2 trae resuelto el 1.1,
la 3 trae resuelto el 2.1, y así. Si un ejercicio no se terminó,
el siguiente se puede empezar igual desde su carpeta. Los datos están en
`src/datos/` y los estilos (`src/estilos.css`) ya están resueltos: los
enunciados dicen qué clase usar en cada elemento.

## Estructura de ejercicios

### 1. React y JSX (`src/1-jsx/`)

- [1.1 · El detalle en JSX](src/1-jsx/README.md)

```text
?ej=1
```

### 2. Componentes y props (`src/2-componentes/`)

- [2.1 · Componentes y props](src/2-componentes/README.md)

```text
?ej=2
```

### 3. Listas y condicional (`src/3-listas/`)

- [3.1 · Galería y tags](src/3-listas/README.md)
- [3.2 · Consultas](src/3-listas/README.md)

```text
?ej=3
```

### 4. Eventos y estado (`src/4-estado/`)

- [4.1 · Galería interactiva](src/4-estado/README.md)
- [4.2 · Me interesa y respuestas desplegables](src/4-estado/README.md) — autoestudio

```text
?ej=4
```

### 5. Integrador (`src/5-integrador/`)

- [Mis propiedades](src/5-integrador/README.md) — autoestudio: combina los cuatro temas en una pantalla nueva, desde cero

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

- **La página**: lo que pide cada requisito, y los casos borde editando
  `src/datos/` (vaciar `tags`, `consultas`, etc.).
- **Console**: sin warnings de React (falta de `key`, atributos mal
  escritos).
- **Elements**: que no queden nodos vacíos donde se pide no dibujar nada.
- **React DevTools** → Components: el árbol de componentes, sus props y su
  estado.
- **`npm run build`**: tiene que compilar sin errores de TypeScript.
