# 🚀 Ejemplos de React - Componentes Básicos

Este proyecto contiene ejemplos progresivos de React, desde los conceptos más básicos hasta funcionalidades más avanzadas. **Cada ejemplo está en su propia página** para que puedas concentrarte en un concepto a la vez sin distracciones.

## 🎯 **Nueva Estructura: Ejemplos Separados**

Los ejemplos ahora están organizados en páginas individuales con navegación intuitiva:

### 🏠 **Página de Inicio**

- Bienvenida y descripción general
- Vista previa de todos los ejemplos
- Instrucciones de uso

### 📚 **Ejemplos Individuales**

1. **🔵 Componente Básico** - Estructura fundamental
2. **🟢 Componente con Props** - Pasar datos entre componentes
3. **🟡 Componente con Estado** - Manejo de estado con useState
4. **🟠 Renderizado de Listas** - Arrays y método map()
5. **🔴 Manejo de Eventos** - Interactividad del usuario

## 📋 Contenido

### 1. **Componente Básico** (`EjemploBasico.tsx`)

- Demuestra la estructura más simple de un componente React
- Solo retorna JSX sin props ni estado
- Ideal para entender la sintaxis básica

### 2. **Componente con Props** (`EjemploProps.tsx`)

- Muestra cómo recibir y usar props (propiedades)
- Incluye tipado con TypeScript
- Demuestra el paso de datos desde componentes padre

### 3. **Componente con Estado** (`EjemploEstado.tsx`)

- Introduce el hook `useState`
- Manejo de estado local del componente
- Ejemplo práctico con un contador interactivo

### 4. **Lista de Elementos** (`EjemploListas.tsx`)

- Renderizado de listas usando `map()`
- Uso correcto de la prop `key`
- Ejemplo con una lista de tareas

### 5. **Componente con Eventos** (`EjemploEventos.tsx`)

- Manejo de eventos del usuario (click, change, mouse events)
- Eventos sintéticos de React
- Renderizado condicional

## 🛠️ Tecnologías Utilizadas

- **React 19.1.1** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para JavaScript
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

4. **Construir para producción:**

   ```bash
   npm run build
   ```

5. **Vista previa de la build:**
   ```bash
   npm run preview
   ```

## 📚 Conceptos de React Explicados

### ¿Qué es un Componente?

Un componente en React es una función que retorna JSX (JavaScript XML). Los componentes son los bloques de construcción de las aplicaciones React.

```tsx
function MiComponente() {
  return <h1>¡Hola mundo!</h1>;
}
```

### Props (Propiedades)

Las props son datos que se pasan de un componente padre a un componente hijo. Son inmutables (solo lectura).

```tsx
interface Props {
  nombre: string;
}

function Saludo({ nombre }: Props) {
  return <h1>¡Hola {nombre}!</h1>;
}

// Uso:
<Saludo nombre="Juan" />;
```

### Estado (State)

El estado permite que los componentes "recuerden" información entre renders. Se maneja con el hook `useState`.

```tsx
import { useState } from "react";

function Contador() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>Clicks: {count}</button>;
}
```

### Eventos

React maneja eventos a través de SyntheticEvents, que funcionan consistentemente en todos los navegadores.

```tsx
function MiBoton() {
  const manejarClick = () => {
    alert("¡Botón clickeado!");
  };

  return <button onClick={manejarClick}>Clickeame</button>;
}
```

### Renderizado de Listas

Para renderizar listas, usamos el método `map()` y cada elemento debe tener una prop `key` única.

```tsx
function ListaNumeros() {
  const numeros = [1, 2, 3, 4, 5];

  return (
    <ul>
      {numeros.map((numero) => (
        <li key={numero}>{numero}</li>
      ))}
    </ul>
  );
}
```

## 🎯 Objetivos de Aprendizaje

Al completar estos ejemplos, deberías entender:

- ✅ Cómo crear componentes funcionales básicos
- ✅ Cómo pasar datos usando props
- ✅ Cómo manejar estado local con useState
- ✅ Cómo manejar eventos del usuario
- ✅ Cómo renderizar listas de elementos
- ✅ Buenas prácticas de tipado con TypeScript
- ✅ Estructura básica de una aplicación React

## 🧭 **Cómo Navegar los Ejemplos**

### **Navegación Intuitiva**

- Usa los botones de navegación en la parte superior
- Cada botón te lleva a un ejemplo específico
- El botón activo se resalta para mostrar dónde estás

### **Progresión Recomendada**

1. **🏠 Inicio** - Lee la introducción general
2. **1️⃣ Básico** - Comprende la estructura fundamental
3. **2️⃣ Props** - Aprende a pasar datos
4. **3️⃣ Estado** - Maneja información dinámica
5. **4️⃣ Listas** - Renderiza arrays de datos
6. **5️⃣ Eventos** - Agrega interactividad

### **En Cada Página Encontrarás:**

- 📋 **Demostración** - Ejemplo funcionando
- 💡 **Explicación** - Conceptos teóricos
- 🧩 **Código** - Implementación completa
- 🚀 **Próximo paso** - Guía hacia el siguiente concepto

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── Header.tsx       # Encabezado de la aplicación
│   ├── Navigation.tsx   # Sistema de navegación
│   ├── ComponenteBasico.tsx
│   ├── ComponenteConProps.tsx
│   ├── ComponenteConEstado.tsx
│   ├── ListaDeElementos.tsx
│   └── ComponenteConEventos.tsx
├── pages/               # Páginas individuales
│   ├── HomePage.tsx     # Página de inicio
│   ├── EjemploBasico.tsx
│   ├── EjemploProps.tsx
│   ├── EjemploEstado.tsx
│   ├── EjemploListas.tsx
│   └── EjemploEventos.tsx
├── App.tsx              # Componente principal con routing
├── App.css              # Estilos de la aplicación
├── main.tsx             # Punto de entrada
└── index.css            # Estilos globales básicos
```

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run lint` - Ejecuta el linter
- `npm run preview` - Vista previa de la build de producción

## 📖 Recursos Adicionales

- [Documentación oficial de React](https://react.dev/)
- [Guía de TypeScript](https://www.typescriptlang.org/docs/)
- [Documentación de Vite](https://vitejs.dev/)

## 🤝 Contribuciones

Este es un proyecto educativo. Si encuentras errores o tienes sugerencias para mejorar los ejemplos, no dudes en contribuir.

## 📄 Licencia

Este proyecto es de uso educativo y está disponible bajo la licencia MIT.

---

**¡Feliz aprendizaje con React! 🎉**
