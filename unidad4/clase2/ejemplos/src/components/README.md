# 🎓 Ejemplos Implementados - React

Todos los ejemplos están **ya implementados** para que los estudies y modifiques.

## 🎨 Styling

### 1.1 - CSS Global (`styling/Example1CSSGlobal.tsx`)

- Muestra: Lista de tareas con CSS tradicional
- Concepto: Importar archivos `.css` y usar `className`
- Problema: Scope global de clases

### 1.2 - Inline Styles (`styling/Example2InlineStyles.tsx`)

- Muestra: Toggle de tema claro/oscuro
- Concepto: Objetos JavaScript para estilos dinámicos
- Características: camelCase, sin pseudo-clases

### 1.3 - CSS Modules (`styling/Example3CSSModules.tsx`)

- Muestra: Cards de productos con selección
- Concepto: Archivos `.module.css` con scope automático
- Ventaja: Sin conflictos de nombres

### 1.4 - Clases Condicionales (`styling/Example4ConditionalClasses.tsx`)

- Muestra: 4 técnicas de aplicar clases dinámicas
- Incluye: Tabla comparativa de técnicas
- Patrones: Ternario, template literals, array.join, helpers

---

## 🔗 Refs

### 2.1 - Auto-focus (`refs/Example1AutoFocus.tsx`)

- Muestra: Inputs que se enfocan automáticamente
- Concepto: `useRef + useEffect` para acceso al DOM
- Uso: `.current?.focus()`

### 2.2 - Leer Valores (`refs/Example2ReadValues.tsx`)

- Muestra: Formulario uncontrolled vs controlled
- Concepto: Refs para leer valores sin re-renders
- Comparación: Contador de renders visible

### 2.3 - Scroll Programático (`refs/Example3Scroll.tsx`)

- Muestra: Chat con scroll automático
- Concepto: `.scrollIntoView()` y `.scrollTo()`
- Características: Scroll suave, auto-scroll a nuevos mensajes

### 2.4 - Render Counter (`refs/Example4RenderCounter.tsx`)

- Muestra: Contador de renders + timer
- Concepto: `useRef` para valores persistentes sin re-render
- Diferencia: ref.current vs useState

---

## ⚡ Side Effects

### 3.1 - Fetch Básico (`effects/Example1FetchBasic.tsx`)

- Muestra: Lista de usuarios desde API
- Concepto: `useEffect(() => {}, [])` ejecuta al montar
- API: jsonplaceholder.typicode.com

### 3.2 - Con Dependencias (`effects/Example2WithDependencies.tsx`)

- Muestra: Posts filtrados por usuario
- Concepto: useEffect se re-ejecuta cuando cambia userId
- Patrón: `useEffect(() => {}, [userId])`

### 3.3 - Cleanup Function (`effects/Example3Cleanup.tsx`)

- Muestra: Cronómetro con play/pause
- Concepto: Función de retorno para cleanup
- Importante: Previene memory leaks

### 3.4 - Multiple Effects (`effects/Example4MultipleEffects.tsx`)

- Muestra: Búsqueda + theme + document.title
- Concepto: Varios useEffect independientes
- Ventaja: Separación de concerns

### 3.5 - Async/Await (`effects/Example5AsyncAwait.tsx`)

- Muestra: Lista de tareas con filtros
- Concepto: Patrón correcto para async en useEffect
- Importante: No puedes hacer `useEffect(async () => ...)`

---

## 📝 Forms

### 4.1 - Controlled (`forms/Example1Controlled.tsx`)

- Muestra: Formulario con validación en tiempo real
- Concepto: `value + onChange` con useState
- Ventaja: React controla el estado

### 4.2 - Uncontrolled (`forms/Example2Uncontrolled.tsx`)

- Muestra: Formulario con refs
- Concepto: DOM maneja el estado
- Ventaja: Menos re-renders

### 4.3 - FormData API (`forms/Example3FormData.tsx`)

- Muestra: Login con múltiples campos
- Concepto: API nativa FormData
- Ventaja: Sin refs ni state necesarios

### 4.4 - Form Actions (`forms/Example4FormActions.tsx`)

- Muestra: Crear artículo con React 19
- Concepto: Prop `action` en lugar de `onSubmit`
- Nuevo: FormData automático

### 4.5 - useActionState (`forms/Example5UseActionState.tsx`)

- Muestra: Login con validación
- Concepto: Estado + acción + pending en uno
- Nota: Simulado para React 19

---

## 🎯 Cómo usar estos ejemplos

### Para estudiar:

1. Abre el ejemplo en el navegador (navega desde el menú)
2. Lee el código fuente del componente
3. Modifica valores para experimentar
4. Observa cómo cambia el comportamiento

### Para debuggear:

1. Abre DevTools (F12)
2. Ve la consola para logs útiles
3. Usa React DevTools para ver estado/props
4. Modifica el código y guarda (hot reload automático)

### Para practicar:

1. Copia el patrón que necesites
2. Modifícalo para tu caso de uso
3. Experimenta con diferentes valores
4. Intenta combinarlo con otros patrones

---

## 📂 Estructura de carpetas

```
components/
├── styling/
│   ├── Example1CSSGlobal.tsx + .css
│   ├── Example2InlineStyles.tsx
│   ├── Example3CSSModules.tsx + .module.css
│   └── Example4ConditionalClasses.tsx + .css
├── refs/
│   ├── Example1AutoFocus.tsx
│   ├── Example2ReadValues.tsx
│   ├── Example3Scroll.tsx
│   ├── Example4RenderCounter.tsx
│   └── refs-common.css
├── effects/
│   ├── Example1FetchBasic.tsx
│   ├── Example2WithDependencies.tsx
│   ├── Example3Cleanup.tsx
│   ├── Example4MultipleEffects.tsx
│   ├── Example5AsyncAwait.tsx
│   └── effects-common.css
└── forms/
    ├── Example1Controlled.tsx
    ├── Example2Uncontrolled.tsx
    ├── Example3FormData.tsx
    ├── Example4FormActions.tsx
    ├── Example5UseActionState.tsx
    └── forms-common.css
```

---

## 💡 Patrones clave que encontrarás

### Styling:

```typescript
// CSS Modules
import styles from './Mi.module.css'
<div className={styles.miClase} />

// Inline dinámico
<div style={{ backgroundColor: isDark ? '#000' : '#fff' }} />

// Clases condicionales
<div className={`base ${activo ? 'activo' : ''}`} />
```

### Refs:

```typescript
const ref = useRef<HTMLInputElement>(null)

useEffect(() => {
  ref.current?.focus()
}, [])

<input ref={ref} />
```

### Effects:

```typescript
useEffect(() => {
  // Tu código aquí

  return () => {
    // Cleanup aquí
  };
}, [dependencias]);
```

### Forms:

```typescript
// Controlled
const [value, setValue] = useState('')
<input value={value} onChange={e => setValue(e.target.value)} />

// Uncontrolled
const ref = useRef<HTMLInputElement>(null)
<input ref={ref} />

// FormData
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  const data = new FormData(e.currentTarget)
  const value = data.get('nombre')
}
```

---

## 🔧 Modificar ejemplos

Estos ejemplos son tuyos para experimentar:

1. **Cambia estilos**: Modifica colores, tamaños, animaciones
2. **Agrega features**: Más botones, más opciones, más datos
3. **Combina conceptos**: Mezcla refs con effects, styling con forms
4. **Rompe y arregla**: Quita dependencias, cambia lógica, observa qué pasa

No tengas miedo de romper algo - siempre puedes volver con git o recargar la página.

---

## 📚 Documentación adicional

- **React Docs**: https://react.dev
- **TypeScript**: https://www.typescriptlang.org/docs/
- **CSS Modules**: https://github.com/css-modules/css-modules
- **React DevTools**: Extensión para Chrome/Firefox
