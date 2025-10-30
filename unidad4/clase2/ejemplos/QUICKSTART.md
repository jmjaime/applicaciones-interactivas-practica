# 🚀 Quick Start - Ejemplos React

## Instalación Rápida

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Abrir en navegador
# http://localhost:5173
```

## 📚 Cómo usar los ejemplos

### Navegación

La aplicación tiene un menú lateral con todos los ejemplos organizados por tema:

1. **🎨 Styling** - 4 ejemplos
2. **🔗 Refs** - 4 ejemplos
3. **⚡ Side Effects** - 5 ejemplos
4. **📝 Forms** - 5 ejemplos

### Orden sugerido

Sigue el orden numérico - cada ejemplo construye sobre el anterior:

```
Styling
  ├── 1.1 CSS Global
  ├── 1.2 Inline Styles
  ├── 1.3 CSS Modules
  └── 1.4 Clases Condicionales

Refs
  ├── 2.1 Auto-focus
  ├── 2.2 Leer valores
  ├── 2.3 Scroll programático
  └── 2.4 Contador de renders

Side Effects
  ├── 3.1 Fetch básico
  ├── 3.2 Con dependencias
  ├── 3.3 Cleanup function
  ├── 3.4 Multiple effects
  └── 3.5 Async/await

Forms
  ├── 4.1 Controlled components
  ├── 4.2 Uncontrolled components
  ├── 4.3 FormData API
  ├── 4.4 Form Actions (React 19)
  └── 4.5 useActionState (React 19)
```

## 💡 Tips

1. **Abre DevTools**: Ve el estado y props en tiempo real
2. **Lee el código**: Cada ejemplo tiene comentarios explicativos
3. **Modifica**: Cambia valores para experimentar
4. **Compara**: Ve las diferencias entre enfoques

## 🔧 Comandos útiles

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Preview build
npm run preview

# Linter
npm run lint
```

## 📖 Próximos pasos

1. Ver los ejemplos en orden
2. Leer el código fuente en `src/`
3. Ir a `../ejercicios/` para practicar
4. Volver a las slides cuando necesites teoría

## ❓ Problemas

- **Puerto ocupado**: Vite usa el siguiente disponible automáticamente
- **Error de módulos**: Ejecuta `npm install` de nuevo
- **Hot reload no funciona**: Reinicia con `npm run dev`

