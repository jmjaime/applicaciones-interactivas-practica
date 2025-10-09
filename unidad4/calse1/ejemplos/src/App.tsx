import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import EjemploBasico from './pages/EjemploBasico'
import EjemploProps from './pages/EjemploProps'
import EjemploEstado from './pages/EjemploEstado'
import EjemploListas from './pages/EjemploListas'
import EjemploEventos from './pages/EjemploEventos'

function App() {
  const [paginaActual, setPaginaActual] = useState('home')

  const renderizarPagina = () => {
    switch (paginaActual) {
      case 'home':
        return <HomePage />
      case 'basico':
        return <EjemploBasico />
      case 'props':
        return <EjemploProps />
      case 'estado':
        return <EjemploEstado />
      case 'listas':
        return <EjemploListas />
      case 'eventos':
        return <EjemploEventos />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="app">
      <Header />
      <Navigation
        paginaActual={paginaActual}
        cambiarPagina={setPaginaActual}
      />
      <main className="main-content">
        {renderizarPagina()}
      </main>
    </div>
  )
}

export default App
