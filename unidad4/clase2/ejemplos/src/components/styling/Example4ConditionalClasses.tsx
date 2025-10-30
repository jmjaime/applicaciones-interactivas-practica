import { useState } from 'react'
import './Example4ConditionalClasses.css'

/**
 * Ejemplo 1.4: Clases CSS Condicionales
 * 
 * Demuestra diferentes técnicas para aplicar clases CSS de forma condicional
 * basadas en el estado del componente.
 */

type AlertType = 'info' | 'success' | 'warning' | 'error'

export default function Example4ConditionalClasses() {
    const [isActive, setIsActive] = useState(false)
    const [alertType, setAlertType] = useState<AlertType>('info')
    const [isLoading, setIsLoading] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)

    const handleAction = () => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            alert('Acción completada!')
        }, 2000)
    }

    return (
        <div className="conditional-container">
            <h2 className="conditional-title">Ejemplo 1.4: Clases Condicionales</h2>

            <p className="conditional-description">
                Aprende a aplicar clases CSS de forma dinámica basándote en el estado
                de tus componentes usando diferentes técnicas.
            </p>

            {/* Técnica 1: Operador ternario simple */}
            <div className="section">
                <h3>1. Operador Ternario</h3>
                <button
                    className={isActive ? 'toggle-btn active' : 'toggle-btn'}
                    onClick={() => setIsActive(!isActive)}
                >
                    {isActive ? '✅ Activo' : '⭕ Inactivo'}
                </button>
                <pre className="code-snippet">{`className={isActive ? 'toggle-btn active' : 'toggle-btn'}`}</pre>
            </div>

            {/* Técnica 2: Template literals */}
            <div className="section">
                <h3>2. Template Literals (Recomendado)</h3>
                <button
                    className={`action-btn ${isLoading ? 'loading' : ''} ${isDisabled ? 'disabled' : ''}`}
                    onClick={handleAction}
                    disabled={isLoading || isDisabled}
                >
                    {isLoading ? '⏳ Cargando...' : '🚀 Ejecutar Acción'}
                </button>

                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={isDisabled}
                        onChange={(e) => setIsDisabled(e.target.checked)}
                    />
                    Deshabilitar botón
                </label>

                <pre className="code-snippet">{`className={\`action-btn \${isLoading ? 'loading' : ''} \${isDisabled ? 'disabled' : ''}\`}`}</pre>
            </div>

            {/* Técnica 3: Array join */}
            <div className="section">
                <h3>3. Array.filter().join()</h3>
                <div
                    className={[
                        'alert',
                        `alert-${alertType}`,
                        isActive && 'alert-highlighted'
                    ].filter(Boolean).join(' ')}
                >
                    <strong>Alerta {alertType}:</strong> Este es un mensaje de tipo {alertType}.
                </div>

                <div className="button-group">
                    <button onClick={() => setAlertType('info')} className="btn-info">Info</button>
                    <button onClick={() => setAlertType('success')} className="btn-success">Success</button>
                    <button onClick={() => setAlertType('warning')} className="btn-warning">Warning</button>
                    <button onClick={() => setAlertType('error')} className="btn-error">Error</button>
                </div>

                <pre className="code-snippet">{`className={[
  'alert',
  \`alert-\${alertType}\`,
  isActive && 'alert-highlighted'
].filter(Boolean).join(' ')}`}</pre>
            </div>

            {/* Técnica 4: Objeto de clases */}
            <div className="section">
                <h3>4. Función Helper (classnames pattern)</h3>
                <div className={getCardClasses(isActive, isLoading)}>
                    <h4>Card Dinámica</h4>
                    <p>Esta card cambia de estilo según el estado.</p>
                    <p><strong>Activa:</strong> {isActive ? 'Sí' : 'No'}</p>
                    <p><strong>Cargando:</strong> {isLoading ? 'Sí' : 'No'}</p>
                </div>

                <pre className="code-snippet">{`function getCardClasses(active: boolean, loading: boolean) {
  return [
    'dynamic-card',
    active && 'card-active',
    loading && 'card-loading'
  ].filter(Boolean).join(' ')
}`}</pre>
            </div>

            {/* Comparación de técnicas */}
            <div className="comparison-section">
                <h3>📊 Comparación de Técnicas</h3>
                <table className="comparison-table">
                    <thead>
                        <tr>
                            <th>Técnica</th>
                            <th>Legibilidad</th>
                            <th>Flexibilidad</th>
                            <th>Uso Recomendado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Ternario</td>
                            <td>⭐⭐⭐</td>
                            <td>⭐⭐</td>
                            <td>1-2 clases simples</td>
                        </tr>
                        <tr>
                            <td>Template Literal</td>
                            <td>⭐⭐⭐⭐</td>
                            <td>⭐⭐⭐⭐</td>
                            <td>Múltiples clases (más común)</td>
                        </tr>
                        <tr>
                            <td>Array.join()</td>
                            <td>⭐⭐⭐</td>
                            <td>⭐⭐⭐⭐⭐</td>
                            <td>Lógica compleja</td>
                        </tr>
                        <tr>
                            <td>Helper Function</td>
                            <td>⭐⭐⭐⭐⭐</td>
                            <td>⭐⭐⭐⭐⭐</td>
                            <td>Reutilización</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="info-box">
                <h4>💡 Librería Popular: classnames</h4>
                <p>Para proyectos grandes, considera usar la librería <code>classnames</code>:</p>
                <pre className="code-snippet">{`import classNames from 'classnames'

className={classNames('btn', {
  'btn-active': isActive,
  'btn-loading': isLoading,
  'btn-disabled': isDisabled
})}`}</pre>
            </div>
        </div>
    )
}

// Helper function para técnica 4
function getCardClasses(active: boolean, loading: boolean): string {
    return [
        'dynamic-card',
        active && 'card-active',
        loading && 'card-loading'
    ].filter(Boolean).join(' ')
}

