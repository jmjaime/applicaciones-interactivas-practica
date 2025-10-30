import { useState } from 'react'
import './forms-common.css'

/**
 * Ejemplo 4.1: Controlled Components
 * React controla el estado del formulario
 */

export default function Example1Controlled() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    const [submitted, setSubmitted] = useState<any>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted({ name, email, age })
        console.log('📝 Form submitted:', { name, email, age })
    }

    return (
        <div className="forms-container">
            <h2 className="forms-title">Ejemplo 4.1: Controlled Components</h2>

            <p className="forms-description">
                React controla el valor de cada input mediante <code>useState</code>.
                Validación en tiempo real y sincronización perfecta.
            </p>

            <div className="forms-card">
                <h3>📝 Formulario Controlado</h3>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nombre:</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-input"
                            placeholder="Tu nombre"
                        />
                        <small style={{ color: '#7f8c8d' }}>
                            Caracteres: {name.length}
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                            placeholder="tu@email.com"
                        />
                        {email && !email.includes('@') && (
                            <p className="form-error">Email debe contener @</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="age">Edad:</label>
                        <input
                            id="age"
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="form-input"
                            placeholder="18"
                        />
                    </div>

                    <button type="submit" className="form-button primary">
                        Enviar
                    </button>
                    <button
                        type="button"
                        onClick={() => { setName(''); setEmail(''); setAge(''); setSubmitted(null) }}
                        className="form-button secondary"
                    >
                        Limpiar
                    </button>
                </form>

                {submitted && (
                    <div className="form-success">
                        <h4>✅ Formulario enviado:</h4>
                        <pre>{JSON.stringify(submitted, null, 2)}</pre>
                    </div>
                )}
            </div>

            <div className="code-box">
                <h4>Código:</h4>
                <pre>{`const [name, setName] = useState('')

<input
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

// React controla el valor
// onChange sincroniza el estado
// Re-render en cada tecla`}</pre>
            </div>

            <div className="info-box success">
                <h4>✅ Ventajas:</h4>
                <ul>
                    <li>Validación en tiempo real</li>
                    <li>Valores siempre sincronizados con React</li>
                    <li>Fácil resetear formulario</li>
                    <li>Source of truth es el estado de React</li>
                </ul>
            </div>
        </div>
    )
}

