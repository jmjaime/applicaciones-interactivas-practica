import { useState, useEffect } from 'react'
import './effects-common.css'

/**
 * Ejemplo 3.3: Cleanup Function
 * 
 * Demuestra cómo limpiar efectos (timers, subscripciones, etc.)
 * para prevenir memory leaks.
 */

export default function Example3Cleanup() {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [mounted, setMounted] = useState(true)

  useEffect(() => {
    console.log('⏱️  Timer effect ejecutado, isRunning:', isRunning)
    
    let intervalId: number | null = null

    if (isRunning) {
      intervalId = window.setInterval(() => {
        setSeconds(prev => prev + 1)
        console.log('⏰ Tick')
      }, 1000)
    }

    // Cleanup function
    return () => {
      if (intervalId) {
        console.log('🧹 Limpiando interval:', intervalId)
        clearInterval(intervalId)
      }
    }
  }, [isRunning]) // Se ejecuta cuando isRunning cambia

  const handleToggle = () => {
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    setSeconds(0)
  }

  const handleUnmount = () => {
    setMounted(false)
  }

  if (!mounted) {
    return (
      <div className="effects-container">
        <h2 className="effects-title">Componente Desmontado</h2>
        <p>El componente se desmontó y el cleanup se ejecutó.</p>
        <button onClick={() => setMounted(true)} className="effects-button primary">
          Volver a Montar
        </button>
      </div>
    )
  }

  return (
    <div className="effects-container">
      <h2 className="effects-title">Ejemplo 3.3: Cleanup Function</h2>
      
      <p className="effects-description">
        La función de cleanup (return) en useEffect se ejecuta antes de cada
        re-ejecución del effect y al desmontar el componente. Úsala para limpiar
        timers, cancelar requests, remover event listeners, etc.
      </p>

      <div className="effects-card">
        <h3>⏱️ Cronómetro con Cleanup</h3>
        
        <div className="timer-display">
          {String(Math.floor(seconds / 60)).padStart(2, '0')}:
          {String(seconds % 60).padStart(2, '0')}
        </div>

        <div className="button-group">
          <button
            onClick={handleToggle}
            className={`effects-button ${isRunning ? 'danger' : 'success'}`}
          >
            {isRunning ? '⏸️ Pausar' : '▶️ Iniciar'}
          </button>
          <button onClick={handleReset} className="effects-button secondary">
            🔄 Reset
          </button>
          <button onClick={handleUnmount} className="effects-button danger">
            ❌ Desmontar
          </button>
        </div>

        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
          <h4 style={{ marginTop: 0 }}>Estado actual:</h4>
          <p>⏱️ Segundos: <strong>{seconds}</strong></p>
          <p>▶️ Corriendo: <strong>{isRunning ? 'Sí' : 'No'}</strong></p>
          <p style={{ fontSize: '0.85rem', color: '#7f8c8d', marginBottom: 0 }}>
            💡 Abre la consola para ver los logs del cleanup
          </p>
        </div>
      </div>

      <div className="code-box">
        <h4>Código:</h4>
        <pre>{`useEffect(() => {
  let intervalId: number | null = null
  
  if (isRunning) {
    intervalId = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)
  }

  // ⚠️ CLEANUP: Se ejecuta antes de re-ejecutar
  // y al desmontar el componente
  return () => {
    if (intervalId) {
      clearInterval(intervalId) // ¡Importante!
    }
  }
}, [isRunning])

// Sin cleanup → Memory leak
// Con cleanup → ✅ Limpio y seguro`}</pre>
      </div>

      <div className="info-box danger">
        <h4>⚠️ ¿Cuándo se ejecuta el cleanup?</h4>
        <ul>
          <li><strong>Antes de re-ejecutar el effect</strong> (cuando cambian dependencias)</li>
          <li><strong>Al desmontar el componente</strong> (cuando se remueve del DOM)</li>
          <li>Previene memory leaks de timers, subscripciones, listeners</li>
        </ul>
      </div>

      <div className="info-box warning">
        <h4>💡 Casos comunes de cleanup:</h4>
        <ul>
          <li><code>clearInterval()</code> / <code>clearTimeout()</code> - Timers</li>
          <li><code>abortController.abort()</code> - Fetch requests</li>
          <li><code>element.removeEventListener()</code> - Event listeners</li>
          <li><code>subscription.unsubscribe()</code> - Observables</li>
        </ul>
      </div>
    </div>
  )
}

