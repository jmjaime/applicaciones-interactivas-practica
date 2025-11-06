# 🚀 Ejemplos de React - Clase III

Este proyecto contiene ejemplos progresivos de conceptos avanzados de React: **Context API**, **Custom Hooks** y **React Router**. Todos los ejemplos están integrados en una sola aplicación con navegación por React Router.

> **Nota**: Este es un proyecto único e integrado que demuestra Context API, Custom Hooks y React Router trabajando juntos en una aplicación completa.

## 🎯 Estructura de Ejemplos

Los ejemplos están organizados en páginas individuales con navegación intuitiva:

### 📚 Ejemplos por Tema

#### 1. 🌐 **Context API - Shared State**

- **Ejemplo 1.1**: Context básico - Sistema de temas (light/dark)
- **Ejemplo 1.2**: Context con múltiples valores - Usuario autenticado
- **Ejemplo 1.3**: Context con useReducer - Carrito de compras
- **Ejemplo 1.4**: Múltiples contexts combinados
- **Ejemplo 1.5**: Custom Provider component con lógica encapsulada

#### 2. 🎣 **Custom Hooks**

- **Ejemplo 2.1**: useLocalStorage - Persistir estado en localStorage
- **Ejemplo 2.2**: useFetch - Hook para llamadas HTTP
- **Ejemplo 2.3**: useDebounce - Retrasar ejecución de funciones
- **Ejemplo 2.4**: useToggle - Manejar valores booleanos
- **Ejemplo 2.5**: Composición de hooks - useAuthenticatedFetch

#### 3. 🛣️ **React Router - Navegación**

- **Ejemplo 3.1**: Configuración básica con BrowserRouter
- **Ejemplo 3.2**: Rutas dinámicas con parámetros
- **Ejemplo 3.3**: Rutas anidadas con Layout y Outlet
- **Ejemplo 3.4**: Navegación programática con useNavigate
- **Ejemplo 3.5**: Protected Routes - Rutas privadas
- **Ejemplo 3.6**: Query parameters con useSearchParams

#### 4. 📦 **React Router Avanzado - Loaders**

- **Ejemplo 4.1**: Loader básico con useLoaderData
- **Ejemplo 4.2**: Loader con parámetros dinámicos
- **Ejemplo 4.3**: Error handling con errorElement
- **Ejemplo 4.4**: useRouteLoaderData - Compartir datos entre rutas
- **Ejemplo 4.5**: Organizaci\u00f3n de loaders en archivos separados

## 📋 Descripción Detallada

### 🌐 Tema 1: Context API

#### Ejemplo 1.1 - Sistema de Temas

- Crear Context con `createContext()`
- Provider component con estado
- Consumir con `use()` hook (React 19)
- Toggle entre tema light/dark

#### Ejemplo 1.2 - Autenticación

- Context con objeto complejo (user)
- Métodos login/logout en el contexto
- Información del usuario en toda la app
- Patrón de custom hook (`useAuth`)

#### Ejemplo 1.3 - Carrito con useReducer

- `useReducer` para estado complejo
- Actions: ADD_ITEM, REMOVE_ITEM, CLEAR
- Context + Reducer pattern
- Estado compartido sin prop drilling

#### Ejemplo 1.4 - Múltiples Contexts

- Combinar Theme + Auth contexts
- Providers anidados
- Consumir múltiples contexts en un componente
- Separación de responsabilidades

#### Ejemplo 1.5 - Custom Provider

- Encapsular lógica del contexto
- Provider component reutilizable
- Mejor organización del código
- Patrón recomendado

### 🎣 Tema 2: Custom Hooks

#### Ejemplo 2.1 - useLocalStorage

- Sincronizar estado con localStorage
- Persistencia entre recargas
- API similar a useState
- Manejo de errores

#### Ejemplo 2.2 - useFetch

- Hook para llamadas HTTP
- Estados: loading, error, data
- Cancelación de requests
- Refresh manual

#### Ejemplo 2.3 - useDebounce

- Retrasar ejecución de funciones
- Útil para búsqueda en tiempo real
- Cancelar timers anteriores
- Optimización de performance

#### Ejemplo 2.4 - useToggle

- Simplificar manejo de booleanos
- Métodos: toggle, setTrue, setFalse
- Uso en modales, dropdowns
- API conveniente

#### Ejemplo 2.5 - Composición

- Hooks usando otros hooks
- useAuthenticatedFetch con useAuth
- Reutilización de lógica
- Mejor abstracción

### 🛣️ Tema 3: React Router

#### Ejemplo 3.1 - Configuración Básica

- BrowserRouter setup
- Routes y Route components
- Link para navegación
- Rutas básicas

#### Ejemplo 3.2 - Rutas Dinámicas

- Parámetros en la URL (`:id`)
- useParams hook
- Mostrar detalle de items
- Navegación dinámica

#### Ejemplo 3.3 - Rutas Anidadas

- Layout component con Outlet
- Rutas hijas compartiendo layout
- Navbar/Footer persistentes
- Mejor organización

#### Ejemplo 3.4 - Navegación Programática

- useNavigate hook
- Navegar después de acciones
- Replace vs push
- Navegación condicional

#### Ejemplo 3.5 - Protected Routes

- Componente ProtectedRoute
- Redirect a login si no autenticado
- Combinar con Context de Auth
- Rutas privadas

#### Ejemplo 3.6 - Query Parameters

- useSearchParams hook
- Filtros en la URL
- Actualizar query params
- Estado en la URL

### 📦 Tema 4: React Router Avanzado

#### Ejemplo 4.1 - Loader Básico

- createBrowserRouter setup
- Función loader simple
- useLoaderData hook
- Datos antes del render

#### Ejemplo 4.2 - Loader con Parámetros

- Acceder a params en loader
- Fetch basado en ID de ruta
- Loader dinámico
- Detalle de items

#### Ejemplo 4.3 - Error Handling

- errorElement en rutas
- useRouteError hook
- Manejo de errores 404
- Fallback UI

#### Ejemplo 4.4 - Compartir Datos

- useRouteLoaderData con ID
- Acceder a datos del padre
- Evitar fetch duplicado
- Optimización

#### Ejemplo 4.5 - Organización

- Loaders en archivos separados
- Export loader del componente
- Mejor estructura de proyecto
- Código mantenible

## 🛠️ Tecnologías Utilizadas

- **React 19.1.1** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para JavaScript
- **React Router 7** - Navegación declarativa
- **Vite** - Herramienta de construcción y desarrollo
- **ESLint** - Linter para código JavaScript/TypeScript

## 🚀 Instalación y Ejecución

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn

### Pasos para ejecutar

1. **Instalar dependencias:**

   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo:**

   ```bash
   npm run dev
   ```

3. **Abrir en el navegador:**

   - La aplicación estará disponible en `http://localhost:5173`
   - Vite incluye hot reload automático
   - La navegación usa React Router (sin recargas de página)

4. **Construir para producción:**

   ```bash
   npm run build
   ```

5. **Vista previa de la build:**
   ```bash
   npm run preview
   ```

## 📚 Conceptos de React Explicados

### Context API

El Context API permite compartir estado entre componentes sin prop drilling:

```tsx
// 1. Crear Context
const ThemeContext = createContext({ theme: "light" });

// 2. Proveer valor
<ThemeContext value={{ theme, setTheme }}>
  <App />
</ThemeContext>;

// 3. Consumir (React 19)
const { theme } = use(ThemeContext);
```

### Custom Hooks

Los custom hooks permiten reutilizar lógica con estado:

```tsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
```

### React Router

React Router permite navegación sin recargas:

```tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/users/:id" element={<UserDetail />} />
  </Routes>
</BrowserRouter>
```

### Loaders (React Router v6.4+)

Loaders cargan datos antes de renderizar:

```tsx
const router = createBrowserRouter([
  {
    path: "/users/:id",
    element: <UserDetail />,
    loader: async ({ params }) => {
      const response = await fetch(`/api/users/${params.id}`);
      return response.json();
    },
  },
]);

function UserDetail() {
  const user = useLoaderData();
  return <h1>{user.name}</h1>;
}
```

## 🎯 Objetivos de Aprendizaje

Al completar estos ejemplos, deberías entender:

- ✅ Cómo usar Context API para estado global
- ✅ Cómo crear custom hooks reutilizables
- ✅ Cómo implementar navegación con React Router
- ✅ Cómo usar rutas anidadas y layouts
- ✅ Cómo proteger rutas con autenticación
- ✅ Cómo cargar datos con loaders
- ✅ Buenas prácticas de arquitectura de aplicaciones React

## 🧭 Cómo Navegar los Ejemplos

### Navegación con React Router

Este proyecto usa **React Router con `createBrowserRouter`** para la navegación entre ejemplos:

- ✅ URLs amigables: `/context/theme`, `/hooks/fetch`, `/router/users`, etc.
- ✅ Sin recargas de página (SPA completa)
- ✅ Links activos automáticos
- ✅ Botón "Atrás" del navegador funciona
- ✅ 404 handling para rutas inexistentes
- ✅ **Data loaders** - Carga de datos antes del render
- ✅ **Rutas dinámicas** - `/router/users/:id`
- ✅ **Rutas anidadas** - Layouts con Outlet
- ✅ **Query parameters** - Filtros y búsqueda en URL

### Progresión Recomendada

1. **Context API** (Ejemplos 1.1-1.3) - Aprende a compartir estado
2. **Custom Hooks** (Ejemplos 2.1-2.4) - Reutiliza lógica
3. **React Router** (Ejemplos 3.1-3.3) - Navegación completa con loaders

### En Cada Página Encontrarás:

- 📋 **Demostración** - Ejemplo funcionando
- 💡 **Explicación** - Conceptos teóricos
- 🧩 **Código** - Implementación completa
- 🚀 **Próximo paso** - Guía hacia el siguiente concepto

## 📁 Estructura del Proyecto

```
src/
├── contexts/              # Todo sobre Context API
│   ├── ThemeContext.tsx          # Context provider
│   ├── ThemeExample1.tsx         # Ejemplo/demo que usa ThemeContext
│   ├── AuthContext.tsx           # Context provider
│   ├── AuthExample2.tsx          # Ejemplo/demo que usa AuthContext
│   ├── CartContext.tsx           # Context provider
│   └── CartExample3.tsx          # Ejemplo/demo que usa CartContext
├── hooks/                 # Todo sobre Custom Hooks
│   ├── useLocalStorage.ts        # Hook reutilizable
│   ├── LocalStorageExample1.tsx  # Ejemplo/demo que usa useLocalStorage
│   ├── useFetch.ts               # Hook reutilizable
│   ├── FetchExample2.tsx         # Ejemplo/demo que usa useFetch
│   ├── useDebounce.ts            # Hook reutilizable
│   ├── DebounceExample3.tsx      # Ejemplo/demo que usa useDebounce
│   ├── useToggle.ts              # Hook reutilizable
│   └── ToggleExample4.tsx        # Ejemplo/demo que usa useToggle
├── components/            # Componentes UI reutilizables (vacío)
├── pages/                 # Páginas del router
│   ├── HomePage.tsx
│   ├── NotFoundPage.tsx
│   └── router/           # Ejemplos de React Router
│       ├── UsersPage.tsx
│       ├── UserDetailPage.tsx
│       ├── ProductsLayout.tsx
│       ├── ProductsListPage.tsx
│       ├── PostsPage.tsx
│       └── PostDetailPage.tsx
├── loaders/               # Data loaders
│   └── postLoaders.ts
├── router.tsx             # Configuración de rutas con createBrowserRouter
├── App.tsx                # Layout principal con Outlet
├── App.css                # Estilos de la aplicación
├── main.tsx               # Punto de entrada con RouterProvider
└── index.css              # Estilos globales básicos
```

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run lint` - Ejecuta el linter
- `npm run preview` - Vista previa de la build de producción

## 📖 Recursos Adicionales

- [Documentación oficial de React](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Guía de TypeScript](https://www.typescriptlang.org/docs/)
- [Documentación de Vite](https://vitejs.dev/)

## 🤝 Contribuciones

Este es un proyecto educativo. Si encuentras errores o tienes sugerencias para mejorar los ejemplos, no dudes en contribuir.

## 📄 Licencia

Este proyecto es de uso educativo y está disponible bajo la licencia MIT.

---

**¡Feliz aprendizaje con React! 🎉**
