# 🚀 Ejemplos de React Avanzado - Clase II

Este proyecto contiene ejemplos progresivos de conceptos avanzados de React: **Styling**, **Refs**, **Side Effects** y **Forms**. Cada ejemplo está en su propia página para facilitar el aprendizaje sin distracciones.

## 🎯 Estructura de Ejemplos

Los ejemplos están organizados en páginas individuales con navegación intuitiva:

### 📚 Ejemplos por Tema

#### 1. 🎨 **Styling en React**

- **Ejemplo 1.1**: CSS Global y className
- **Ejemplo 1.2**: Inline Styles y estilos dinámicos
- **Ejemplo 1.3**: CSS Modules
- **Ejemplo 1.4**: Clases condicionales

#### 2. 🔗 **Refs y Acceso al DOM**

- **Ejemplo 2.1**: useRef básico - Auto-focus en input
- **Ejemplo 2.2**: Leer valores de inputs con refs
- **Ejemplo 2.3**: Refs para scroll programático
- **Ejemplo 2.4**: Refs vs State - Contador de renders

#### 3. ⚡ **Side Effects con useEffect**

- **Ejemplo 3.1**: useEffect básico - Fetch de datos
- **Ejemplo 3.2**: useEffect con dependencias
- **Ejemplo 3.3**: Cleanup function - Timer
- **Ejemplo 3.4**: Multiple effects
- **Ejemplo 3.5**: useEffect con async/await

#### 4. 📝 **Forms y Form Actions**

- **Ejemplo 4.1**: Controlled components (useState)
- **Ejemplo 4.2**: Uncontrolled components (useRef)
- **Ejemplo 4.3**: FormData API
- **Ejemplo 4.4**: Form Actions (React 19)
- **Ejemplo 4.5**: useActionState para validación

## 📋 Descripción Detallada

### 🎨 Tema 1: Styling

#### Ejemplo 1.1 - CSS Global

- Importar CSS tradicional
- Uso de className
- Problema del scope global

#### Ejemplo 1.2 - Inline Styles

- Objetos JavaScript para estilos
- Estilos dinámicos basados en props/state
- camelCase para propiedades CSS

#### Ejemplo 1.3 - CSS Modules

- Archivos `.module.css`
- Nombres de clase únicos automáticos
- Evitar colisiones de estilos

#### Ejemplo 1.4 - Clases Condicionales

- Construcción dinámica de className
- Múltiples clases condicionales
- Patrón con filter y join

### 🔗 Tema 2: Refs

#### Ejemplo 2.1 - Auto-focus

- Crear ref con useRef()
- Conectar ref al elemento
- Llamar .focus() en useEffect

#### Ejemplo 2.2 - Leer Valores

- Refs para inputs no controlados
- Acceder a .current.value
- Cuándo usar refs vs state

#### Ejemplo 2.3 - Scroll Programático

- useRef para elemento contenedor
- scrollIntoView() y scrollTo()
- Navegación suave

#### Ejemplo 2.4 - Contador de Renders

- useRef para valores persistentes
- No causa re-renders
- Comparación con useState

### ⚡ Tema 3: Side Effects

#### Ejemplo 3.1 - Fetch Básico

- Llamar API al montar componente
- Array de dependencias vacío
- Loading states

#### Ejemplo 3.2 - Dependencias

- Re-fetch cuando cambia parámetro
- Incluir todas las dependencias
- Evitar loops infinitos

#### Ejemplo 3.3 - Cleanup

- setInterval con cleanup
- Prevenir memory leaks
- Cuándo se ejecuta cleanup

#### Ejemplo 3.4 - Multiple Effects

- Separar lógica independiente
- Diferentes dependencies por effect
- Organización de código

#### Ejemplo 3.5 - Async/Await

- Wrapper function interna
- Manejo de errores con try/catch
- Cancelación de requests

### 📝 Tema 4: Forms

#### Ejemplo 4.1 - Controlled

- useState para cada input
- Two-way binding
- Validación en tiempo real

#### Ejemplo 4.2 - Uncontrolled

- useRef para inputs
- Leer valores al submit
- Menos re-renders

#### Ejemplo 4.3 - FormData

- API nativa del navegador
- Extraer múltiples valores
- No necesita refs ni state

#### Ejemplo 4.4 - Form Actions

- Nueva API de React 19
- prop `action` en lugar de `onSubmit`
- FormData automático

#### Ejemplo 4.5 - useActionState

- Estado derivado de form actions
- Validación y feedback
- Pending states

## 🛠️ Tecnologías

- **React 19.1.1** - Última versión con Form Actions
- **TypeScript** - Tipado estático
- **Vite** - Build tool ultra-rápido
- **CSS Modules** - Estilos con scope

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js 18+
- npm o yarn

### Instalación

```bash
npm install
```

### Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará en `http://localhost:5173`

### Build para producción

```bash
npm run build
```

### Preview de la build

```bash
npm run preview
```

## 📦 Estructura del Proyecto

```
ejemplos/
├── src/
│   ├── components/
│   │   ├── styling/          # Ejemplos 1.1-1.4
│   │   ├── refs/             # Ejemplos 2.1-2.4
│   │   ├── effects/          # Ejemplos 3.1-3.5
│   │   ├── forms/            # Ejemplos 4.1-4.5
│   │   └── README.md         # Guía detallada
│   ├── App.tsx               # Navegación principal
│   ├── App.css               # Estilos de navegación
│   ├── main.tsx              # Entry point
│   └── index.css             # Reset CSS
├── public/                   # Assets estáticos
├── README.md                 # Este archivo
└── QUICKSTART.md             # Guía rápida
```

**Ver estructura detallada**: `src/components/README.md`

---

## 📚 Conceptos Clave

### Styling

- **CSS Global**: Simple pero puede tener conflictos
- **Inline Styles**: Dinámicos pero limitados
- **CSS Modules**: Mejor para proyectos grandes
- **className**: No `class` en JSX

### Refs

- **useRef**: Hook para referencias
- **ref prop**: Conectar al elemento
- **.current**: Acceder al valor
- **No causa re-renders**: A diferencia de useState

### useEffect

- **Side effects**: Operaciones fuera del render
- **Dependencies**: Controlan cuándo ejecutar
- **Cleanup**: Función de retorno opcional
- **[] vacío**: Solo ejecuta una vez

### Forms

- **Controlled**: React maneja el estado
- **Uncontrolled**: DOM maneja el estado
- **Form Actions**: Simplifica con React 19
- **useActionState**: Estado + validación

## 🔗 Recursos Adicionales

- [React Docs - Styling](https://react.dev/learn/styling)
- [React Docs - useRef](https://react.dev/reference/react/useRef)
- [React Docs - useEffect](https://react.dev/reference/react/useEffect)
- [React Docs - Form Actions](https://react.dev/reference/react-dom/components/form)
- [Book React Key Concepts](https://github.com/mschwarzmueller/book-react-key-concepts-e2)

## 🐛 Troubleshooting

### Error: "Cannot find module"

```bash
npm install
```

### Puerto 5173 ocupado

Vite usará el siguiente puerto disponible automáticamente

### Hot reload no funciona

Reinicia el servidor de desarrollo:

```bash
# Ctrl+C para detener
npm run dev
```

### Errores de TypeScript

Verifica que todas las dependencias estén instaladas
