# 🚀 Quick Start - Ejercicios React

## Instalación Rápida

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Abrir en navegador
# http://localhost:5173
```

## 🎯 Temática: MusicStream App

Vas a construir una aplicación de streaming de música con:

- 🎵 Gestión de playlists
- 🎨 Temas personalizables
- 🎧 Reproductor de audio
- ⭐ Sistema de favoritos
- 🔍 Búsqueda avanzada

## 📚 Estructura de Ejercicios

### Por Tema

1. **Styling** - 4 ejercicios
2. **Refs** - 4 ejercicios
3. **Side Effects** - 5 ejercicios
4. **Forms** - 5 ejercicios
5. **Integrador** - 1 ejercicio

## 🎓 Flujo de Trabajo

### Para cada ejercicio:

1. **Lee el README.md** - Encuentra tu ejercicio
2. **Revisa los ejemplos** - Ve cómo se hace en `../ejemplos/`
3. **Crea el componente** - En `src/components/`
4. **Importa en App.tsx** - Activa tu ejercicio
5. **Prueba en el navegador** - Verifica que funcione
6. **Commit** - Guarda tu progreso

### Ejemplo rápido:

```typescript
// 1. Crear src/components/MiComponente.tsx
export default function MiComponente() {
  return <div>Hola Mundo</div>;
}

// 2. Importar en src/App.tsx
import MiComponente from './components/MiComponente';

// 3. Usar en el switch
case 'ejercicio1':
  return <MiComponente />;
```

### Debugging

```typescript
// 1. console.log es tu amigo
console.log("Estado actual:", state);

// 2. React DevTools
// Instala la extensión de navegador

// 3. TypeScript errors
// Léelos con calma, te dicen exactamente qué falta

// 4. Network tab
// Para ver requests en ejercicios de fetch
```

### Código Limpio

```typescript
// ✅ BIEN
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const data = formData.get("name");
  if (!data) return;
  // ...
};

// ❌ MAL
const hs = (e: any) => {
  e.preventDefault();
  const d = formData.get("name");
  if (!d) return;
};
```

## 📦 Estructura del Proyecto

```
ejercicios/
├── src/
│   ├── components/           # ⬅️ Aquí creas TUS ejercicios
│   │   └── README.md         # Guía de componentes
│   ├── exerciseInstructions.ts  # Instrucciones de ejercicios
│   ├── App.tsx               # Navegación principal
│   ├── App.css               # Estilos globales
│   ├── main.tsx              # Entry point
│   └── index.css             # Reset CSS
├── public/                   # Assets estáticos (imágenes, etc)
├── README.md                 # Detalle completo de ejercicios
├── QUICKSTART.md             # Este archivo
└── APIS.md                   # Lista de APIs disponibles
```

## 🔧 Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Linter
npm run lint

# Type check
npm run type-check
```

## ❓ FAQ

**P: ¿Puedo usar librerías externas?**  
R: Para el integrador sí, pero los ejercicios básicos deben usar solo React.

**P: ¿Qué versión de React?**  
R: React 19.1.1 - incluye Form Actions

**P: ¿Tengo que usar TypeScript?**  
R: Sí, pero los tipos básicos están provistos

**P: ¿Puedo copiar de los ejemplos?**  
R: Sí, pero entiende lo que copias

## 🆘 Ayuda

Si te atascas:

1. **Revisa los ejemplos** en `../ejemplos/`
2. **Lee el README.md** completo
3. **Consulta las slides** de la clase
4. **React Docs** - https://react.dev
5. **Pregunta al profesor** en clase/Discord

## 🎉 Checklist de Inicio

- [ ] `npm install` ejecutado
- [ ] Servidor corriendo (`npm run dev`)
- [ ] Navegador abierto en localhost:5173
- [ ] DevTools de React instalados
- [ ] README.md leído
- [ ] Ejemplos explorados
- [ ] Git iniciado (`git init`)
