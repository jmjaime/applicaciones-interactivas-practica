# 🎮 React - Ejercicios Prácticos: Tienda de Videojuegos

Este proyecto contiene ejercicios prácticos para aprender los fundamentos de React con TypeScript, usando la temática de una **tienda de videojuegos** para hacer el aprendizaje más divertido e interesante.

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+ instalado
- npm o yarn

### Instalación

```bash
npm install
```

### Ejecutar el proyecto

```bash
npm run dev
```

El proyecto se abrirá en `http://localhost:5173`

## 🎯 Temática: GameStore

Todos los ejercicios están basados en el desarrollo de una **tienda de videojuegos online**. Esta temática te permitirá:

- 🎮 Trabajar con datos realistas y atractivos
- 🛒 Entender conceptos de e-commerce
- 💡 Practicar React de forma divertida
- 🎨 Crear interfaces visuales interesantes

## 📚 Ejercicios

### Ejercicio 1: Componente Básico de Videojuego

**Objetivo**: Crear tu primer componente React funcional para mostrar información de un videojuego.

**Instrucciones**:

1. Crea un archivo `src/components/ComponenteJuego.tsx`
2. Implementa un componente que muestre información básica de un videojuego
3. Importa y usa el componente en el Ejercicio 1

**Código base**:

```tsx
// src/components/ComponenteJuego.tsx
import React from "react";

function ComponenteJuego() {
  return (
    <div
      style={{
        border: "2px solid #4a90e2",
        borderRadius: "12px",
        padding: "1.5rem",
        backgroundColor: "#f8f9ff",
        maxWidth: "300px",
        margin: "1rem auto",
      }}
    >
      <h3 style={{ color: "#2c3e50", marginBottom: "0.5rem" }}>
        🎮 The Legend of Zelda: Breath of the Wild
      </h3>
      <p style={{ color: "#7f8c8d", margin: "0.5rem 0" }}>
        <strong>Género:</strong> Aventura/Acción
      </p>
      <p style={{ color: "#7f8c8d", margin: "0.5rem 0" }}>
        <strong>Plataforma:</strong> Nintendo Switch
      </p>
      <p style={{ color: "#27ae60", fontWeight: "bold", fontSize: "1.2em" }}>
        $59.99
      </p>
    </div>
  );
}

export default ComponenteJuego;
```

**Uso en App.tsx**:

```tsx
// Importar en la parte superior
import ComponenteJuego from "./components/ComponenteJuego";

// Reemplazar el placeholder en el caso 'ejercicio1'
<ComponenteJuego />;
```

---

### Ejercicio 2: Tarjeta de Videojuego con Props

**Objetivo**: Aprender a pasar y usar props para mostrar diferentes videojuegos.

**Instrucciones**:

1. Crea un archivo `src/components/TarjetaJuego.tsx`
2. Define una interfaz para las props del videojuego
3. Crea un componente que reciba título, precio, género, plataforma y rating
4. Muestra la información en una tarjeta atractiva

**Código base**:

```tsx
// src/components/TarjetaJuego.tsx
import React from "react";

interface TarjetaJuegoProps {
  titulo: string;
  precio: number;
  genero: string;
  plataforma: string;
  rating: number; // De 1 a 5 estrellas
}

function TarjetaJuego({
  titulo,
  precio,
  genero,
  plataforma,
  rating,
}: TarjetaJuegoProps) {
  const renderizarEstrellas = (rating: number) => {
    return "⭐".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  };

  return (
    <div
      style={{
        border: "1px solid #e1e8ed",
        borderRadius: "12px",
        padding: "1.5rem",
        margin: "1rem",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        maxWidth: "280px",
        transition: "transform 0.2s",
      }}
    >
      <h3
        style={{
          color: "#1a202c",
          marginBottom: "1rem",
          fontSize: "1.1em",
          lineHeight: "1.3",
        }}
      >
        🎮 {titulo}
      </h3>

      <div style={{ marginBottom: "0.75rem" }}>
        <span
          style={{
            backgroundColor: "#e2e8f0",
            padding: "0.25rem 0.5rem",
            borderRadius: "6px",
            fontSize: "0.85em",
            color: "#4a5568",
          }}
        >
          {genero}
        </span>
      </div>

      <p style={{ color: "#718096", margin: "0.5rem 0", fontSize: "0.9em" }}>
        <strong>Plataforma:</strong> {plataforma}
      </p>

      <p style={{ margin: "0.5rem 0", fontSize: "0.9em" }}>
        <strong>Rating:</strong> {renderizarEstrellas(rating)} ({rating}/5)
      </p>

      <p
        style={{
          color: "#38a169",
          fontWeight: "bold",
          fontSize: "1.3em",
          marginTop: "1rem",
          textAlign: "center",
        }}
      >
        ${precio.toFixed(2)}
      </p>
    </div>
  );
}

export default TarjetaJuego;
```

**Uso en App.tsx**:

```tsx
// Importar en la parte superior
import TarjetaJuego from "./components/TarjetaJuego";

// Reemplazar el placeholder en el caso 'ejercicio2'
<div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
  <TarjetaJuego
    titulo="Cyberpunk 2077"
    precio={39.99}
    genero="RPG/Acción"
    plataforma="PC, PS5, Xbox"
    rating={4}
  />
  <TarjetaJuego
    titulo="Animal Crossing"
    precio={54.99}
    genero="Simulación"
    plataforma="Nintendo Switch"
    rating={5}
  />
  <TarjetaJuego
    titulo="Call of Duty: MW3"
    precio={69.99}
    genero="FPS"
    plataforma="Multi-plataforma"
    rating={3}
  />
</div>;
```

---

### Ejercicio 3: Carrito de Compras con Estado

**Objetivo**: Usar el hook `useState` para manejar un carrito de compras.

**Instrucciones**:

1. Crea un archivo `src/components/CarritoCompras.tsx`
2. Implementa un carrito que permita agregar y quitar juegos
3. Muestra el total de items y el precio total
4. Incluye botones para vaciar el carrito

**Código base**:

```tsx
// src/components/CarritoCompras.tsx
import React, { useState } from "react";

interface Juego {
  id: number;
  nombre: string;
  precio: number;
}

function CarritoCompras() {
  const [carrito, setCarrito] = useState<Juego[]>([]);

  // Juegos disponibles para agregar
  const juegosDisponibles: Juego[] = [
    { id: 1, nombre: "The Witcher 3", precio: 29.99 },
    { id: 2, nombre: "Minecraft", precio: 26.95 },
    { id: 3, nombre: "Grand Theft Auto V", precio: 29.99 },
    { id: 4, nombre: "Red Dead Redemption 2", precio: 59.99 },
  ];

  const agregarJuego = (juego: Juego) => {
    setCarrito([...carrito, juego]);
  };

  const quitarJuego = (juegoId: number) => {
    const index = carrito.findIndex((juego) => juego.id === juegoId);
    if (index > -1) {
      const nuevoCarrito = [...carrito];
      nuevoCarrito.splice(index, 1);
      setCarrito(nuevoCarrito);
    }
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const calcularTotal = () => {
    return carrito.reduce((total, juego) => total + juego.precio, 0).toFixed(2);
  };

  const contarJuegos = (juegoId: number) => {
    return carrito.filter((juego) => juego.id === juegoId).length;
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h3 style={{ color: "#2d3748", marginBottom: "1.5rem" }}>
        🛒 Carrito de Compras
      </h3>

      {/* Juegos disponibles */}
      <div style={{ marginBottom: "2rem" }}>
        <h4 style={{ color: "#4a5568", marginBottom: "1rem" }}>
          Juegos Disponibles:
        </h4>
        <div style={{ display: "grid", gap: "0.5rem" }}>
          {juegosDisponibles.map((juego) => (
            <div
              key={juego.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.75rem",
                backgroundColor: "#f7fafc",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
              }}
            >
              <span>
                <strong>{juego.nombre}</strong> - ${juego.precio}
              </span>
              <div>
                <span
                  style={{
                    marginRight: "0.5rem",
                    backgroundColor: "#4299e1",
                    color: "white",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "4px",
                    fontSize: "0.8em",
                  }}
                >
                  En carrito: {contarJuegos(juego.id)}
                </span>
                <button
                  onClick={() => agregarJuego(juego)}
                  style={{
                    backgroundColor: "#48bb78",
                    color: "white",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginRight: "0.25rem",
                  }}
                >
                  + Agregar
                </button>
                <button
                  onClick={() => quitarJuego(juego.id)}
                  style={{
                    backgroundColor: "#f56565",
                    color: "white",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  disabled={contarJuegos(juego.id) === 0}
                >
                  - Quitar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resumen del carrito */}
      <div
        style={{
          backgroundColor: "#edf2f7",
          padding: "1.5rem",
          borderRadius: "8px",
          border: "2px solid #cbd5e0",
        }}
      >
        <h4 style={{ color: "#2d3748", marginBottom: "1rem" }}>
          Resumen del Carrito:
        </h4>
        <p style={{ fontSize: "1.1em", marginBottom: "0.5rem" }}>
          <strong>Total de juegos:</strong> {carrito.length}
        </p>
        <p
          style={{
            fontSize: "1.3em",
            color: "#38a169",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          <strong>Total a pagar: ${calcularTotal()}</strong>
        </p>

        {carrito.length > 0 && (
          <button
            onClick={vaciarCarrito}
            style={{
              backgroundColor: "#e53e3e",
              color: "white",
              border: "none",
              padding: "0.75rem 1.5rem",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "1em",
            }}
          >
            🗑️ Vaciar Carrito
          </button>
        )}

        {carrito.length === 0 && (
          <p style={{ color: "#718096", fontStyle: "italic" }}>
            El carrito está vacío. ¡Agrega algunos juegos!
          </p>
        )}
      </div>
    </div>
  );
}

export default CarritoCompras;
```

---

### Ejercicio 4: Catálogo de Videojuegos

**Objetivo**: Renderizar listas y manejar arrays en el estado con filtros.

**Instrucciones**:

1. Crea un archivo `src/components/CatalogoJuegos.tsx`
2. Implementa un catálogo que muestre una lista de videojuegos
3. Agrega funcionalidad para filtrar por género
4. Incluye un buscador por nombre

**Código base**:

```tsx
// src/components/CatalogoJuegos.tsx
import React, { useState } from "react";

interface Videojuego {
  id: number;
  nombre: string;
  genero: string;
  precio: number;
  descripcion: string;
  año: number;
}

function CatalogoJuegos() {
  const [filtroGenero, setFiltroGenero] = useState<string>("todos");
  const [busqueda, setBusqueda] = useState<string>("");

  const juegos: Videojuego[] = [
    {
      id: 1,
      nombre: "The Last of Us Part II",
      genero: "Aventura",
      precio: 39.99,
      descripcion: "Una historia emocional de supervivencia",
      año: 2020,
    },
    {
      id: 2,
      nombre: "FIFA 24",
      genero: "Deportes",
      precio: 69.99,
      descripcion: "El simulador de fútbol más realista",
      año: 2023,
    },
    {
      id: 3,
      nombre: "Counter-Strike 2",
      genero: "FPS",
      precio: 0,
      descripcion: "El juego de disparos competitivo por excelencia",
      año: 2023,
    },
    {
      id: 4,
      nombre: "Stardew Valley",
      genero: "Simulación",
      precio: 14.99,
      descripcion: "Administra tu propia granja en este relajante juego",
      año: 2016,
    },
    {
      id: 5,
      nombre: "Doom Eternal",
      genero: "FPS",
      precio: 29.99,
      descripcion: "Acción frenética contra demonios del infierno",
      año: 2020,
    },
    {
      id: 6,
      nombre: "Animal Crossing: New Horizons",
      genero: "Simulación",
      precio: 54.99,
      descripcion: "Crea tu isla paradisíaca perfecta",
      año: 2020,
    },
  ];

  const generos = [
    "todos",
    ...Array.from(new Set(juegos.map((juego) => juego.genero))),
  ];

  const juegosFiltrados = juegos.filter((juego) => {
    const cumpleFiltroGenero =
      filtroGenero === "todos" || juego.genero === filtroGenero;
    const cumpleBusqueda = juego.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    return cumpleFiltroGenero && cumpleBusqueda;
  });

  return (
    <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
      <h3
        style={{
          color: "#2d3748",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        🎮 Catálogo de Videojuegos
      </h3>

      {/* Controles de filtro */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            Buscar por nombre:
          </label>
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Escribe el nombre del juego..."
            style={{
              padding: "0.5rem",
              borderRadius: "6px",
              border: "2px solid #e2e8f0",
              fontSize: "1em",
              minWidth: "200px",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            Filtrar por género:
          </label>
          <select
            value={filtroGenero}
            onChange={(e) => setFiltroGenero(e.target.value)}
            style={{
              padding: "0.5rem",
              borderRadius: "6px",
              border: "2px solid #e2e8f0",
              fontSize: "1em",
              minWidth: "150px",
            }}
          >
            {generos.map((genero) => (
              <option key={genero} value={genero}>
                {genero === "todos" ? "Todos los géneros" : genero}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Contador de resultados */}
      <p
        style={{
          textAlign: "center",
          color: "#718096",
          marginBottom: "1.5rem",
          fontSize: "1.1em",
        }}
      >
        Mostrando {juegosFiltrados.length} de {juegos.length} juegos
      </p>

      {/* Lista de juegos */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {juegosFiltrados.map((juego) => (
          <div
            key={juego.id}
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "1.5rem",
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            <div style={{ marginBottom: "1rem" }}>
              <h4
                style={{
                  color: "#2d3748",
                  marginBottom: "0.5rem",
                  fontSize: "1.2em",
                }}
              >
                {juego.nombre}
              </h4>
              <span
                style={{
                  backgroundColor: "#4299e1",
                  color: "white",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "12px",
                  fontSize: "0.8em",
                  fontWeight: "bold",
                }}
              >
                {juego.genero}
              </span>
            </div>

            <p
              style={{
                color: "#4a5568",
                marginBottom: "1rem",
                lineHeight: "1.5",
              }}
            >
              {juego.descripcion}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              <span style={{ color: "#718096", fontSize: "0.9em" }}>
                Año: {juego.año}
              </span>
              <span
                style={{
                  color: juego.precio === 0 ? "#38a169" : "#2d3748",
                  fontWeight: "bold",
                  fontSize: "1.3em",
                }}
              >
                {juego.precio === 0 ? "GRATIS" : `$${juego.precio}`}
              </span>
            </div>
          </div>
        ))}
      </div>

      {juegosFiltrados.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            color: "#718096",
          }}
        >
          <p style={{ fontSize: "1.2em", marginBottom: "0.5rem" }}>
            🔍 No se encontraron juegos
          </p>
          <p>
            Intenta con otros términos de búsqueda o cambia el filtro de género.
          </p>
        </div>
      )}
    </div>
  );
}

export default CatalogoJuegos;
```

---

### Ejercicio 5: Formulario de Reseña de Juegos

**Objetivo**: Crear un formulario con validación para escribir reseñas de videojuegos.

**Instrucciones**:

1. Crea un archivo `src/components/FormularioReseña.tsx`
2. Implementa un formulario con campos: juego, calificación, título de reseña y comentario
3. Agrega validación personalizada para cada campo
4. Muestra las reseñas enviadas en una lista

**Código base**:

```tsx
// src/components/FormularioReseña.tsx
import React, { useState } from "react";

interface Reseña {
  id: number;
  juego: string;
  calificacion: number;
  titulo: string;
  comentario: string;
  fecha: string;
}

function FormularioReseña() {
  const [reseñas, setReseñas] = useState<Reseña[]>([]);
  const [formulario, setFormulario] = useState({
    juego: "",
    calificacion: 5,
    titulo: "",
    comentario: "",
  });
  const [errores, setErrores] = useState<string[]>([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(true);

  const juegosPopulares = [
    "The Legend of Zelda: Breath of the Wild",
    "God of War",
    "The Witcher 3: Wild Hunt",
    "Red Dead Redemption 2",
    "Cyberpunk 2077",
    "Minecraft",
    "Grand Theft Auto V",
    "The Last of Us Part II",
  ];

  const manejarCambio = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({
      ...prev,
      [name]: name === "calificacion" ? parseInt(value) : value,
    }));
  };

  const validarFormulario = (): boolean => {
    const nuevosErrores: string[] = [];

    if (!formulario.juego) {
      nuevosErrores.push("Debe seleccionar un videojuego");
    }

    if (formulario.titulo.trim().length < 5) {
      nuevosErrores.push("El título debe tener al menos 5 caracteres");
    }

    if (formulario.comentario.trim().length < 20) {
      nuevosErrores.push("El comentario debe tener al menos 20 caracteres");
    }

    if (formulario.calificacion < 1 || formulario.calificacion > 5) {
      nuevosErrores.push("La calificación debe estar entre 1 y 5 estrellas");
    }

    setErrores(nuevosErrores);
    return nuevosErrores.length === 0;
  };

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();

    if (validarFormulario()) {
      const nuevaReseña: Reseña = {
        id: Date.now(),
        ...formulario,
        fecha: new Date().toLocaleDateString(),
      };

      setReseñas((prev) => [nuevaReseña, ...prev]);
      setFormulario({
        juego: "",
        calificacion: 5,
        titulo: "",
        comentario: "",
      });
      setErrores([]);
      setMostrarFormulario(false);
    }
  };

  const renderizarEstrellas = (calificacion: number) => {
    return "⭐".repeat(calificacion) + "☆".repeat(5 - calificacion);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h3
        style={{
          color: "#2d3748",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        ⭐ Reseñas de Videojuegos
      </h3>

      <div style={{ marginBottom: "2rem", textAlign: "center" }}>
        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          style={{
            backgroundColor: "#4299e1",
            color: "white",
            border: "none",
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1em",
            fontWeight: "bold",
          }}
        >
          {mostrarFormulario
            ? "📝 Ocultar Formulario"
            : "✍️ Escribir Nueva Reseña"}
        </button>
      </div>

      {mostrarFormulario && (
        <div
          style={{
            backgroundColor: "#f7fafc",
            padding: "2rem",
            borderRadius: "12px",
            border: "2px solid #e2e8f0",
            marginBottom: "2rem",
          }}
        >
          <h4 style={{ color: "#4a5568", marginBottom: "1.5rem" }}>
            Escribir Nueva Reseña
          </h4>

          {errores.length > 0 && (
            <div
              style={{
                backgroundColor: "#fed7d7",
                color: "#c53030",
                padding: "1rem",
                borderRadius: "8px",
                marginBottom: "1.5rem",
                border: "1px solid #feb2b2",
              }}
            >
              <h5>⚠️ Errores en el formulario:</h5>
              <ul style={{ margin: "0.5rem 0", paddingLeft: "1.5rem" }}>
                {errores.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={manejarEnvio}>
            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "bold",
                }}
              >
                Videojuego:
              </label>
              <select
                name="juego"
                value={formulario.juego}
                onChange={manejarCambio}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "6px",
                  border: "2px solid #e2e8f0",
                  fontSize: "1em",
                }}
              >
                <option value="">Selecciona un videojuego...</option>
                {juegosPopulares.map((juego) => (
                  <option key={juego} value={juego}>
                    {juego}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "bold",
                }}
              >
                Calificación: {renderizarEstrellas(formulario.calificacion)} (
                {formulario.calificacion}/5)
              </label>
              <input
                type="range"
                name="calificacion"
                min="1"
                max="5"
                value={formulario.calificacion}
                onChange={manejarCambio}
                style={{
                  width: "100%",
                  height: "8px",
                  borderRadius: "5px",
                  background: "#e2e8f0",
                  outline: "none",
                }}
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "bold",
                }}
              >
                Título de la reseña:
              </label>
              <input
                type="text"
                name="titulo"
                value={formulario.titulo}
                onChange={manejarCambio}
                placeholder="Ej: Un juego increíble que no puedes perderte"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "6px",
                  border: "2px solid #e2e8f0",
                  fontSize: "1em",
                }}
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "bold",
                }}
              >
                Comentario ({formulario.comentario.length} caracteres):
              </label>
              <textarea
                name="comentario"
                value={formulario.comentario}
                onChange={manejarCambio}
                placeholder="Comparte tu experiencia con este videojuego..."
                rows={5}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "6px",
                  border: "2px solid #e2e8f0",
                  fontSize: "1em",
                  resize: "vertical",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: "#48bb78",
                color: "white",
                border: "none",
                padding: "1rem 2rem",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "1.1em",
                fontWeight: "bold",
                width: "100%",
              }}
            >
              🚀 Publicar Reseña
            </button>
          </form>
        </div>
      )}

      {/* Lista de reseñas */}
      <div>
        <h4 style={{ color: "#4a5568", marginBottom: "1.5rem" }}>
          📚 Reseñas Publicadas ({reseñas.length})
        </h4>

        {reseñas.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "3rem",
              backgroundColor: "#f7fafc",
              borderRadius: "12px",
              color: "#718096",
            }}
          >
            <p style={{ fontSize: "1.2em", marginBottom: "0.5rem" }}>
              📝 No hay reseñas aún
            </p>
            <p>¡Sé el primero en escribir una reseña!</p>
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {reseñas.map((reseña) => (
              <div
                key={reseña.id}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div style={{ marginBottom: "1rem" }}>
                  <h5
                    style={{
                      color: "#2d3748",
                      marginBottom: "0.5rem",
                      fontSize: "1.1em",
                    }}
                  >
                    🎮 {reseña.juego}
                  </h5>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <span style={{ fontSize: "1.1em" }}>
                      {renderizarEstrellas(reseña.calificacion)}
                    </span>
                    <span style={{ color: "#718096", fontSize: "0.9em" }}>
                      {reseña.fecha}
                    </span>
                  </div>
                </div>

                <h6
                  style={{
                    color: "#4a5568",
                    marginBottom: "0.75rem",
                    fontSize: "1em",
                    fontWeight: "bold",
                  }}
                >
                  "{reseña.titulo}"
                </h6>

                <p
                  style={{
                    color: "#2d3748",
                    lineHeight: "1.6",
                    margin: 0,
                  }}
                >
                  {reseña.comentario}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FormularioReseña;
```

## 🎯 Objetivos de Aprendizaje

Al completar estos ejercicios con la temática de videojuegos, habrás aprendido:

1. **Componentes funcionales**: Crear componentes atractivos para mostrar información de videojuegos
2. **Props**: Pasar datos de juegos entre componentes de manera dinámica
3. **Estado local**: Manejar carritos de compras y formularios interactivos
4. **Renderizado de listas**: Mostrar catálogos de juegos con filtros y búsqueda
5. **Manejo de eventos**: Crear formularios de reseñas con validación completa
6. **TypeScript**: Tipado específico para el dominio de videojuegos

## 🎮 Ventajas de esta Temática

- **Más Engaging**: Los videojuegos son más interesantes que ejemplos genéricos
- **Evita Copy-Paste**: Temática completamente diferente a los ejemplos
- **Casos Reales**: Simula situaciones de e-commerce reales
- **Visualmente Atractivo**: Interfaces más coloridas y dinámicas
- **Conceptos Transferibles**: Los patrones aprendidos se aplican a cualquier dominio

## 📝 Notas Importantes

- Cada ejercicio debe completarse en orden progresivo
- Crea la carpeta `src/components/` si no existe
- Asegúrate de importar correctamente los componentes en `App.tsx`
- Usa TypeScript para el tipado de props e interfaces
- Los estilos están incluidos inline para facilitar el aprendizaje
- La temática es consistente pero los conceptos de React son universales

## 🔧 Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Linting
npm run lint

# Preview del build
npm run preview
```

## 📖 Recursos Adicionales

- [Documentación oficial de React](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)

¡Diviértete aprendiendo React mientras construyes tu tienda de videojuegos! 🎮🚀
