# 🚀 QuickStart - Ejemplos Clase III

## Instalación y Ejecución Rápida

```bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar en modo desarrollo
npm run dev

# 3. Abrir en el navegador
# http://localhost:5173
```

## Ejemplos Disponibles

### 🌐 Context API

- **1.1 Sistema de Temas** - Toggle entre light/dark mode
- **1.2 Autenticación** - Login/logout con contexto de usuario
- **1.3 Carrito** - Carrito de compras con useReducer

### 🎣 Custom Hooks

- **2.1 useLocalStorage** - Persistencia automática en localStorage
- **2.2 useFetch** - Hook para llamadas HTTP con loading/error
- **2.3 useDebounce** - Retrasar ejecución (búsquedas en tiempo real)
- **2.4 useToggle** - Manejar valores booleanos fácilmente

### 🛣️ React Router

- **3.1 Usuarios** - Rutas dinámicas con useParams y useNavigate
- **3.2 Productos** - Rutas anidadas con Outlet y Query Parameters
- **3.3 Posts** - Data loaders con useLoaderData

## Estructura del Proyecto

```
src/
├── contexts/              # Todo sobre Context API
│   ├── ThemeContext.tsx          # Provider
│   ├── ThemeExample1.tsx         # Demo
│   ├── AuthContext.tsx           # Provider
│   ├── AuthExample2.tsx          # Demo
│   ├── CartContext.tsx           # Provider
│   └── CartExample3.tsx          # Demo
├── hooks/                 # Todo sobre Custom Hooks
│   ├── useLocalStorage.ts        # Hook
│   ├── LocalStorageExample1.tsx  # Demo
│   ├── useFetch.ts               # Hook
│   ├── FetchExample2.tsx         # Demo
│   ├── useDebounce.ts            # Hook
│   ├── DebounceExample3.tsx      # Demo
│   ├── useToggle.ts              # Hook
│   └── ToggleExample4.tsx        # Demo
├── pages/                 # Páginas del router
│   ├── HomePage.tsx
│   ├── NotFoundPage.tsx
│   └── router/           # Ejemplos de React Router
├── loaders/              # Data loaders
├── router.tsx            # Configuración de rutas
├── App.tsx               # Layout con Outlet
└── main.tsx              # RouterProvider + Providers
```

## Conceptos Clave

### Context API

Compartir estado sin prop drilling:

```tsx
// 1. Crear Context
const ThemeContext = createContext(defaultValue);

// 2. Proveer valor
<ThemeContext value={...}>
  <App />
</ThemeContext>

// 3. Consumir con use() (React 19)
const theme = use(ThemeContext);
```

### Custom Hooks

Reutilizar lógica con estado:

```tsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(/* ... */);
  // Lógica de persistencia
  return [value, setValue];
}

// Uso
const [name, setName] = useLocalStorage("name", "");
```

## Tips

- 🔄 **Hot Reload**: Los cambios se reflejan automáticamente
- 🛣️ **React Router**: Navegación sin recargas, URLs amigables
- 🧪 **Experimenta**: Modifica los valores y observa los resultados
- 📖 **Lee el código**: Inspecciona los componentes para entender la implementación
- 🎯 **Sigue el orden**: Los ejemplos están ordenados de básico a avanzado
- ↩️ **Navegador**: El botón "Atrás" funciona correctamente

## Comandos Disponibles

```bash
npm run dev      # Modo desarrollo
npm run build    # Build para producción
npm run preview  # Preview de la build
npm run lint     # Ejecutar linter
```

## Problemas Comunes

### Error: Module not found

```bash
rm -rf node_modules package-lock.json
npm install
```

### Puerto 5173 en uso

```bash
# Vite usará automáticamente el siguiente puerto disponible
# O especifica uno diferente:
npm run dev -- --port 3000
```

## Próximos Pasos

1. ✅ Completa todos los ejemplos de Context API
2. ✅ Prueba todos los Custom Hooks
3. ✅ Explora los ejemplos de React Router integrados
4. 📦 Pasa a los ejercicios prácticos (GamerHub)

## Recursos

- [README.md](./README.md) - Documentación completa
- [React Docs](https://react.dev/) - Documentación oficial
- [React Router](https://reactrouter.com/) - Para ejemplos de routing
