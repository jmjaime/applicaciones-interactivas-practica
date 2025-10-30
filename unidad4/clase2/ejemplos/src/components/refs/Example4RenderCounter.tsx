import { useRef, useState, useEffect } from 'react'
import './refs-common.css'

/**
 * Ejemplo 2.4: useRef para Valores Persistentes
 * 
 * Demuestra cómo usar useRef para guardar valores que persisten entre renders
 * sin causar re-renders cuando cambian.
 */

export default function Example4RenderCounter() {
    // Estado normal - causa re-renders
    const [count, setCount] = useState(0)
    const [name, setName] = useState('')

    // Ref para contar renders - NO causa re-renders
    const renderCount = useRef(0)

    // Ref para guardar el valor anterior - NO causa re-renders
    const previousCount = useRef<number>()

    // Ref para guardar un timer ID
    const timerRef = useRef<number | null>(null)
    const [isRunning, setIsRunning] = useState(false)
    const [seconds, setSeconds] = useState(0)

    // Incrementar el contador de renders en cada render
    useEffect(() => {
        renderCount.current = renderCount.current + 1
    })

    // Guardar el valor anterior de count
    useEffect(() => {
        previousCount.current = count
    }, [count])

    // Timer con useRef
    useEffect(() => {
        if (isRunning) {
            timerRef.current = window.setInterval(() => {
                setSeconds(prev => prev + 1)
            }, 1000)
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
    }, [isRunning])

    const handleToggleTimer = () => {
        setIsRunning(!isRunning)
    }

    const handleResetTimer = () => {
        setIsRunning(false)
        setSeconds(0)
    }

    return (
        <div className="refs-container">
            <h2 className="refs-title">Ejemplo 2.4: Valores Persistentes con Refs</h2>

            <p className="refs-description">
                useRef también sirve para guardar valores que necesitan persistir entre renders
                pero que NO deben causar re-renders cuando cambian.
            </p>

            {/* Render Counter */}
            <div className="refs-card">
                <h3>📊 Contador de Renders</h3>

                <div className="stats-grid">
                    <div className="stat-card primary">
                        <span className="stat-label">Total Renders</span>
                        <span className="stat-value big">{renderCount.current}</span>
                    </div>

                    <div className="stat-card secondary">
                        <span className="stat-label">Count Actual</span>
                        <span className="stat-value big">{count}</span>
                    </div>

                    <div className="stat-card accent">
                        <span className="stat-label">Count Anterior</span>
                        <span className="stat-value big">
                            {previousCount.current ?? 'N/A'}
                        </span>
                    </div>
                </div>

                <div className="button-group">
                    <button onClick={() => setCount(count + 1)} className="refs-button primary">
                        Incrementar Count
                    </button>
                    <button onClick={() => setCount(0)} className="refs-button secondary">
                        Reset Count
                    </button>
                </div>

                <div className="form-group">
                    <label htmlFor="name">Nombre (también causa re-render):</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Escribe para ver el render counter"
                        className="refs-input"
                    />
                </div>

                <div className="info-badge">
                    💡 Nota: renderCount.current se incrementa en cada render,
                    pero cambiar su valor NO causa un nuevo render.
                </div>
            </div>

            {/* Timer with useRef */}
            <div className="refs-card">
                <h3>⏱️ Timer con useRef</h3>

                <div className="timer-display">
                    {String(Math.floor(seconds / 60)).padStart(2, '0')}:
                    {String(seconds % 60).padStart(2, '0')}
                </div>

                <div className="button-group">
                    <button
                        onClick={handleToggleTimer}
                        className={`refs-button ${isRunning ? 'danger' : 'success'}`}
                    >
                        {isRunning ? '⏸️ Pausar' : '▶️ Iniciar'}
                    </button>
                    <button onClick={handleResetTimer} className="refs-button secondary">
                        🔄 Reset
                    </button>
                </div>

                <div className="info-badge info">
                    💡 El timer ID se guarda en timerRef.current para poder limpiarlo después
                </div>
            </div>

            {/* Code examples */}
            <div className="comparison-box">
                <div className="comparison-col">
                    <h4>❌ useState - Causa Re-render</h4>
                    <pre>{`const [count, setCount] = useState(0)

// Cambiar count causa re-render
setCount(count + 1)

// Cada render tiene su valor
console.log(count)`}</pre>
                </div>

                <div className="comparison-col">
                    <h4>✅ useRef - NO Causa Re-render</h4>
                    <pre>{`const countRef = useRef(0)

// Cambiar NO causa re-render
countRef.current = countRef.current + 1

// Siempre el valor más actual
console.log(countRef.current)`}</pre>
                </div>
            </div>

            <div className="info-box warning">
                <h4>⚠️ Importante:</h4>
                <ul>
                    <li><strong>ref.current</strong> es mutable - puedes cambiar su valor directamente</li>
                    <li>Cambiar <strong>ref.current</strong> NO causa re-render</li>
                    <li>El valor persiste entre renders</li>
                    <li>Útil para: timers, valores anteriores, contadores internos, instancias de librerías</li>
                </ul>
            </div>

            <div className="code-box">
                <h4>Ejemplo completo:</h4>
                <pre>{`const renderCount = useRef(0)
const previousValue = useRef<number>()
const timerRef = useRef<number | null>(null)

useEffect(() => {
  // Incrementar en cada render
  renderCount.current = renderCount.current + 1
})

useEffect(() => {
  // Guardar valor anterior
  previousValue.current = currentValue
}, [currentValue])

useEffect(() => {
  // Timer
  timerRef.current = setInterval(() => {
    // ...
  }, 1000)
  
  return () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }
}, [])`}</pre>
            </div>
        </div>
    )
}

