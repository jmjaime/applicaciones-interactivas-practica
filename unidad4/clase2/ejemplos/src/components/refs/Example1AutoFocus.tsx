import { useRef, useEffect } from 'react'
import './refs-common.css'

/**
 * Ejemplo 2.1: Auto-focus con useRef
 * 
 * Demuestra cómo usar useRef para enfocar automáticamente un input
 * cuando el componente se monta.
 */

export default function Example1AutoFocus() {
    const inputRef = useRef<HTMLInputElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    // Auto-focus en el input al montar el componente
    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    const handleFocusInput = () => {
        inputRef.current?.focus()
    }

    const handleFocusTextarea = () => {
        textareaRef.current?.focus()
    }

    return (
        <div className="refs-container">
            <h2 className="refs-title">Ejemplo 2.1: Auto-focus</h2>

            <p className="refs-description">
                useRef nos permite acceder directamente a elementos DOM.
                Útil para enfocar inputs, medir tamaños, integrar librerías, etc.
            </p>

            <div className="refs-card">
                <h3>Formulario de Búsqueda</h3>
                <p className="note">👆 El input de arriba se enfoca automáticamente al cargar</p>

                <div className="form-group">
                    <label htmlFor="search">Buscar:</label>
                    <input
                        ref={inputRef}
                        id="search"
                        type="text"
                        placeholder="Escribe aquí..."
                        className="refs-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="message">Mensaje:</label>
                    <textarea
                        ref={textareaRef}
                        id="message"
                        placeholder="Escribe un mensaje..."
                        className="refs-textarea"
                        rows={4}
                    />
                </div>

                <div className="button-group">
                    <button onClick={handleFocusInput} className="refs-button primary">
                        Enfocar Input
                    </button>
                    <button onClick={handleFocusTextarea} className="refs-button secondary">
                        Enfocar Textarea
                    </button>
                </div>
            </div>

            <div className="code-box">
                <h4>Código:</h4>
                <pre>{`const inputRef = useRef<HTMLInputElement>(null)

useEffect(() => {
  // Auto-focus al montar
  inputRef.current?.focus()
}, [])

const handleFocus = () => {
  // Focus programático
  inputRef.current?.focus()
}

<input ref={inputRef} type="text" />`}</pre>
            </div>

            <div className="info-box success">
                <h4>✅ Cuándo usar Refs:</h4>
                <ul>
                    <li>Enfocar inputs o elementos</li>
                    <li>Medir tamaño/posición de elementos</li>
                    <li>Integrar librerías de terceros (mapas, videos, etc.)</li>
                    <li>Scroll programático</li>
                    <li>Acceso directo al DOM cuando sea necesario</li>
                </ul>
            </div>

            <div className="info-box warning">
                <h4>⚠️ Evita usar Refs para:</h4>
                <ul>
                    <li>Manipular el DOM que React ya maneja</li>
                    <li>Reemplazar useState para valores que afectan el render</li>
                    <li>Pasar datos entre componentes (usa props o context)</li>
                </ul>
            </div>
        </div>
    )
}

