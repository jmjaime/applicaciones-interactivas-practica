import { useState } from 'react'
import './App.css'

function App() {
  const [ejercicioActual, setEjercicioActual] = useState('home')

  const renderizarEjercicio = () => {
    switch (ejercicioActual) {
      case 'home':
        return (
          <div className="home">
            <h2>🎮 GameStore - Ejercicios de React</h2>
            <p>¡Bienvenido a nuestra tienda de videojuegos! Selecciona un ejercicio para comenzar a construir tu propia tienda online.</p>
            <div className="exercise-list">
              <h3>🎯 Ejercicios disponibles:</h3>
              <ul>
                <li><strong>Ejercicio 1:</strong> 🎮 Componente básico de videojuego</li>
                <li><strong>Ejercicio 2:</strong> 🃏 Tarjeta de juego con props</li>
                <li><strong>Ejercicio 3:</strong> 🛒 Carrito de compras con estado</li>
                <li><strong>Ejercicio 4:</strong> 📚 Catálogo de videojuegos</li>
                <li><strong>Ejercicio 5:</strong> ⭐ Formulario de reseñas</li>
              </ul>
              <div style={{
                marginTop: "1.5rem",
                padding: "1rem",
                backgroundColor: "#f0f8ff",
                borderRadius: "8px",
                border: "2px solid #4a90e2"
              }}>
                <h4 style={{ color: "#2c3e50", marginBottom: "0.5rem" }}>🚀 ¿Por qué videojuegos?</h4>
                <p style={{ color: "#34495e", margin: 0, fontSize: "0.95em" }}>
                  Esta temática hace el aprendizaje más divertido y evita el copy-paste de los ejemplos.
                  ¡Los conceptos de React son los mismos, pero ahora trabajarás con datos más interesantes!
                </p>
              </div>
            </div>
          </div>
        )
      case 'ejercicio1':
        return (
          <div className="exercise">
            <h2>🎮 Ejercicio 1: Componente Básico de Videojuego</h2>
            <p><strong>Instrucciones:</strong> Crea un componente que muestre información básica de un videojuego.</p>
            <div className="exercise-content">
              {/* TODO: Los estudiantes deben implementar el componente ComponenteJuego aquí */}
              <p className="placeholder">Aquí debes implementar el ComponenteJuego</p>
              <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#f8f9ff", borderRadius: "8px", border: "1px solid #4a90e2" }}>
                <h4 style={{ color: "#2c3e50", marginBottom: "0.5rem" }}>💡 Objetivo:</h4>
                <p style={{ color: "#34495e", margin: 0, fontSize: "0.9em" }}>
                  Crear un componente que muestre: título del juego, género, plataforma y precio.
                </p>
              </div>
            </div>
          </div>
        )
      case 'ejercicio2':
        return (
          <div className="exercise">
            <h2>🃏 Ejercicio 2: Tarjeta de Videojuego con Props</h2>
            <p><strong>Instrucciones:</strong> Crea un componente que reciba props de videojuegos y los muestre en tarjetas atractivas.</p>
            <div className="exercise-content">
              {/* TODO: Los estudiantes deben implementar el componente TarjetaJuego aquí */}
              <p className="placeholder">Aquí debes implementar el componente TarjetaJuego</p>
              <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#f0f8ff", borderRadius: "8px", border: "1px solid #4a90e2" }}>
                <h4 style={{ color: "#2c3e50", marginBottom: "0.5rem" }}>💡 Props a implementar:</h4>
                <p style={{ color: "#34495e", margin: 0, fontSize: "0.9em" }}>
                  título, precio, género, plataforma, rating (1-5 estrellas)
                </p>
              </div>
            </div>
          </div>
        )
      case 'ejercicio3':
        return (
          <div className="exercise">
            <h2>🛒 Ejercicio 3: Carrito de Compras con Estado</h2>
            <p><strong>Instrucciones:</strong> Crea un carrito de compras que permita agregar y quitar videojuegos.</p>
            <div className="exercise-content">
              {/* TODO: Los estudiantes deben implementar el componente CarritoCompras aquí */}
              <p className="placeholder">Aquí debes implementar el componente CarritoCompras</p>
              <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#f0fff0", borderRadius: "8px", border: "1px solid #48bb78" }}>
                <h4 style={{ color: "#2d5016", marginBottom: "0.5rem" }}>💡 Funcionalidades:</h4>
                <p style={{ color: "#2d5016", margin: 0, fontSize: "0.9em" }}>
                  Agregar juegos, quitar juegos, mostrar total de items y precio total, vaciar carrito.
                </p>
              </div>
            </div>
          </div>
        )
      case 'ejercicio4':
        return (
          <div className="exercise">
            <h2>📚 Ejercicio 4: Catálogo de Videojuegos</h2>
            <p><strong>Instrucciones:</strong> Crea un catálogo que muestre videojuegos y permita filtrarlos por género y búsqueda.</p>
            <div className="exercise-content">
              {/* TODO: Los estudiantes deben implementar el componente CatalogoJuegos aquí */}
              <p className="placeholder">Aquí debes implementar el componente CatalogoJuegos</p>
              <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#fff5f5", borderRadius: "8px", border: "1px solid #f56565" }}>
                <h4 style={{ color: "#742a2a", marginBottom: "0.5rem" }}>💡 Características:</h4>
                <p style={{ color: "#742a2a", margin: 0, fontSize: "0.9em" }}>
                  Lista de juegos, filtro por género, buscador por nombre, contador de resultados.
                </p>
              </div>
            </div>
          </div>
        )
      case 'ejercicio5':
        return (
          <div className="exercise">
            <h2>⭐ Ejercicio 5: Formulario de Reseñas</h2>
            <p><strong>Instrucciones:</strong> Crea un formulario para escribir reseñas de videojuegos con validación completa.</p>
            <div className="exercise-content">
              {/* TODO: Los estudiantes deben implementar el componente FormularioReseña aquí */}
              <p className="placeholder">Aquí debes implementar el componente FormularioReseña</p>
              <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#fffbf0", borderRadius: "8px", border: "1px solid #ed8936" }}>
                <h4 style={{ color: "#7b341e", marginBottom: "0.5rem" }}>💡 Campos del formulario:</h4>
                <p style={{ color: "#7b341e", margin: 0, fontSize: "0.9em" }}>
                  Videojuego (select), calificación (1-5), título de reseña, comentario, validación y lista de reseñas.
                </p>
              </div>
            </div>
          </div>
        )
      default:
        return (
          <div className="home">
            <h2>🎮 GameStore - Ejercicios de React</h2>
            <p>¡Bienvenido a nuestra tienda de videojuegos! Selecciona un ejercicio para comenzar.</p>
          </div>
        )
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🎮 GameStore - Ejercicios Prácticos de React</h1>
      </header>

      <nav className="navigation">
        <div className="navigation-content">
          <button
            className={ejercicioActual === 'home' ? 'active' : ''}
            onClick={() => setEjercicioActual('home')}
          >
            Inicio
          </button>
          <button
            className={ejercicioActual === 'ejercicio1' ? 'active' : ''}
            onClick={() => setEjercicioActual('ejercicio1')}
          >
            Ejercicio 1
          </button>
          <button
            className={ejercicioActual === 'ejercicio2' ? 'active' : ''}
            onClick={() => setEjercicioActual('ejercicio2')}
          >
            Ejercicio 2
          </button>
          <button
            className={ejercicioActual === 'ejercicio3' ? 'active' : ''}
            onClick={() => setEjercicioActual('ejercicio3')}
          >
            Ejercicio 3
          </button>
          <button
            className={ejercicioActual === 'ejercicio4' ? 'active' : ''}
            onClick={() => setEjercicioActual('ejercicio4')}
          >
            Ejercicio 4
          </button>
          <button
            className={ejercicioActual === 'ejercicio5' ? 'active' : ''}
            onClick={() => setEjercicioActual('ejercicio5')}
          >
            Ejercicio 5
          </button>
        </div>
      </nav>

      <main className="main-content">
        {renderizarEjercicio()}
      </main>
    </div>
  )
}

export default App
