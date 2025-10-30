import { useState } from 'react'
import './forms-common.css'

/**
 * Ejemplo 4.4: Form Actions (React 19)
 * Nueva API que simplifica el manejo de formularios
 */

export default function Example4FormActions() {
    const [result, setResult] = useState<any>(null)
    const [isPending, setIsPending] = useState(false)

    // Form action - recibe FormData automáticamente
    const handleAction = async (formData: FormData) => {
        setIsPending(true)

        const data = {
            title: formData.get('title'),
            category: formData.get('category'),
            tags: formData.get('tags'),
        }

        console.log('📝 Form action called:', data)

        // Simular API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        setResult(data)
        setIsPending(false)
    }

    return (
        <div className="forms-container">
            <h2 className="forms-title">Ejemplo 4.4: Form Actions (React 19)</h2>

            <p className="forms-description">
                React 19 introduce <code>action</code> prop en formularios.
                Reemplaza <code>onSubmit</code> con una API más simple.
            </p>

            <div className="forms-card">
                <h3>📄 Crear Artículo</h3>

                <form action={handleAction}>
                    <div className="form-group">
                        <label htmlFor="title">Título:</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            className="form-input"
                            placeholder="Mi artículo..."
                            required
                            disabled={isPending}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Categoría:</label>
                        <select
                            id="category"
                            name="category"
                            className="form-select"
                            disabled={isPending}
                        >
                            <option value="tech">Tecnología</option>
                            <option value="music">Música</option>
                            <option value="art">Arte</option>
                            <option value="sports">Deportes</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="tags">Tags (separados por coma):</label>
                        <input
                            id="tags"
                            name="tags"
                            type="text"
                            className="form-input"
                            placeholder="react, javascript, web"
                            disabled={isPending}
                        />
                    </div>

                    <button
                        type="submit"
                        className="form-button primary"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <>
                                <span className="pending-spinner"></span> Guardando...
                            </>
                        ) : (
                            'Crear Artículo'
                        )}
                    </button>
                </form>

                {result && !isPending && (
                    <div className="form-success">
                        <h4>✅ Artículo creado:</h4>
                        <pre>{JSON.stringify(result, null, 2)}</pre>
                    </div>
                )}
            </div>

            <div className="comparison-grid">
                <div className="comparison-card">
                    <h4>❌ Forma antigua (onSubmit)</h4>
                    <pre style={{ fontSize: '0.75rem', backgroundColor: '#2c3e50', color: '#ecf0f1', padding: '10px', borderRadius: '4px' }}>{`<form onSubmit={(e) => {
  e.preventDefault()
  const formData = new FormData(e.currentTarget)
  // ...
}}>`}</pre>
                </div>
                <div className="comparison-card">
                    <h4>✅ React 19 (action)</h4>
                    <pre style={{ fontSize: '0.75rem', backgroundColor: '#2c3e50', color: '#ecf0f1', padding: '10px', borderRadius: '4px' }}>{`const action = (formData: FormData) => {
  // FormData automático
}

<form action={action}>`}</pre>
                </div>
            </div>

            <div className="info-box success">
                <h4>✅ Ventajas de Form Actions:</h4>
                <ul>
                    <li>No necesitas <code>e.preventDefault()</code></li>
                    <li>FormData se pasa automáticamente</li>
                    <li>Integración nativa con React</li>
                    <li>Mejor para Server Actions (Next.js 14+)</li>
                </ul>
            </div>
        </div>
    )
}

