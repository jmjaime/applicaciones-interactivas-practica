import { useRef, useState } from 'react'
import './refs-common.css'

/**
 * Ejemplo 2.2: Leer Valores con Refs
 * 
 * Demuestra cómo usar refs para leer valores de inputs sin causar re-renders
 * (uncontrolled components).
 */

export default function Example2ReadValues() {
    const nameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const [submittedData, setSubmittedData] = useState<{ name: string, email: string } | null>(null)
    const [renderCount, setRenderCount] = useState(0)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Leer valores sin causar re-render
        const name = nameRef.current?.value || ''
        const email = emailRef.current?.value || ''

        setSubmittedData({ name, email })

        // Limpiar inputs
        if (nameRef.current) nameRef.current.value = ''
        if (emailRef.current) emailRef.current.value = ''
    }

    const handleClear = () => {
        if (nameRef.current) nameRef.current.value = ''
        if (emailRef.current) emailRef.current.value = ''
        setSubmittedData(null)
    }

    // Forzar re-render para demostrar el contador
    const forceRender = () => {
        setRenderCount(prev => prev + 1)
    }

    return (
        <div className="refs-container">
            <h2 className="refs-title">Ejemplo 2.2: Leer Valores sin Re-render</h2>

            <p className="refs-description">
                Con refs podemos leer valores de inputs sin causar re-renders.
                Esto es útil para formularios simples donde no necesitamos validación en tiempo real.
            </p>

            <div className="stats-bar">
                <div className="stat">
                    <span className="stat-label">Re-renders:</span>
                    <span className="stat-value">{renderCount}</span>
                </div>
                <button onClick={forceRender} className="refs-button small">
                    Forzar Re-render
                </button>
            </div>

            <div className="refs-card">
                <h3>Formulario No Controlado (Uncontrolled)</h3>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nombre:</label>
                        <input
                            ref={nameRef}
                            id="name"
                            type="text"
                            placeholder="Tu nombre"
                            className="refs-input"
                        />
                        <small className="hint">
                            💡 Escribe aquí - No causa re-render mientras escribes
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            ref={emailRef}
                            id="email"
                            type="email"
                            placeholder="tu@email.com"
                            className="refs-input"
                        />
                    </div>

                    <div className="button-group">
                        <button type="submit" className="refs-button primary">
                            Enviar
                        </button>
                        <button type="button" onClick={handleClear} className="refs-button secondary">
                            Limpiar
                        </button>
                    </div>
                </form>

                {submittedData && (
                    <div className="result-box">
                        <h4>✅ Datos enviados:</h4>
                        <p><strong>Nombre:</strong> {submittedData.name}</p>
                        <p><strong>Email:</strong> {submittedData.email}</p>
                    </div>
                )}
            </div>

            <div className="comparison-box">
                <div className="comparison-col">
                    <h4>❌ Controlled (useState)</h4>
                    <pre>{`const [value, setValue] = useState('')

<input 
  value={value}
  onChange={e => setValue(e.target.value)}
/>

// ⚠️ Re-render en cada tecla`}</pre>
                </div>

                <div className="comparison-col">
                    <h4>✅ Uncontrolled (useRef)</h4>
                    <pre>{`const inputRef = useRef<HTMLInputElement>(null)

<input ref={inputRef} />

const handleSubmit = () => {
  const value = inputRef.current?.value
}

// ✅ Sin re-renders`}</pre>
                </div>
            </div>

            <div className="info-box info">
                <h4>🤔 ¿Cuándo usar cada uno?</h4>
                <ul>
                    <li><strong>Controlled (useState):</strong> Validación en tiempo real, búsqueda, valores dependientes</li>
                    <li><strong>Uncontrolled (useRef):</strong> Formularios simples, lecturas ocasionales, performance crítica</li>
                </ul>
            </div>
        </div>
    )
}

