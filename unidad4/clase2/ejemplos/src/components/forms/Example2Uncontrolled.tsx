import { useRef, useState } from 'react'
import './forms-common.css'

/**
 * Ejemplo 4.2: Uncontrolled Components  
 * El DOM controla el estado, React lo lee cuando necesita
 */

export default function Example2Uncontrolled() {
    const nameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const messageRef = useRef<HTMLTextareaElement>(null)
    const [submitted, setSubmitted] = useState<any>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const data = {
            name: nameRef.current?.value,
            email: emailRef.current?.value,
            message: messageRef.current?.value,
        }

        setSubmitted(data)
        console.log('📝 Form submitted:', data)

        // Limpiar
        if (nameRef.current) nameRef.current.value = ''
        if (emailRef.current) emailRef.current.value = ''
        if (messageRef.current) messageRef.current.value = ''
    }

    return (
        <div className="forms-container">
            <h2 className="forms-title">Ejemplo 4.2: Uncontrolled Components</h2>

            <p className="forms-description">
                El DOM maneja el estado. React solo lee los valores cuando los necesita.
                Menos re-renders, mejor para formularios simples.
            </p>

            <div className="forms-card">
                <h3>📝 Formulario No Controlado</h3>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nombre:</label>
                        <input
                            ref={nameRef}
                            id="name"
                            type="text"
                            className="form-input"
                            placeholder="Tu nombre"
                            defaultValue=""
                        />
                        <small style={{ color: '#7f8c8d' }}>
                            💡 Sin re-renders mientras escribes
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            ref={emailRef}
                            id="email"
                            type="email"
                            className="form-input"
                            placeholder="tu@email.com"
                            defaultValue=""
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Mensaje:</label>
                        <textarea
                            ref={messageRef}
                            id="message"
                            className="form-textarea"
                            placeholder="Tu mensaje..."
                            defaultValue=""
                        />
                    </div>

                    <button type="submit" className="form-button primary">
                        Enviar
                    </button>
                </form>

                {submitted && (
                    <div className="form-success">
                        <h4>✅ Formulario enviado:</h4>
                        <pre>{JSON.stringify(submitted, null, 2)}</pre>
                    </div>
                )}
            </div>

            <div className="comparison-grid">
                <div className="comparison-card">
                    <h4>Controlled</h4>
                    <ul>
                        <li>✅ Validación en tiempo real</li>
                        <li>✅ Valores sincronizados</li>
                        <li>❌ Re-render en cada tecla</li>
                    </ul>
                </div>
                <div className="comparison-card">
                    <h4>Uncontrolled</h4>
                    <ul>
                        <li>✅ Mejor performance</li>
                        <li>✅ Código más simple</li>
                        <li>❌ Sin validación en tiempo real</li>
                    </ul>
                </div>
            </div>

            <div className="code-box">
                <h4>Código:</h4>
                <pre>{`const inputRef = useRef<HTMLInputElement>(null)

<input ref={inputRef} />

const handleSubmit = (e) => {
  e.preventDefault()
  const value = inputRef.current?.value
  // Usar el valor...
}`}</pre>
            </div>
        </div>
    )
}

