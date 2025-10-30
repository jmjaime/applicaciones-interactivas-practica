import { useState } from 'react'
import './forms-common.css'

/**
 * Ejemplo 4.3: FormData API
 * API nativa del navegador para extraer datos de formularios
 */

export default function Example3FormData() {
    const [submitted, setSubmitted] = useState<any>(null)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // FormData extrae todos los valores por el atributo "name"
        const formData = new FormData(e.currentTarget)

        const data = {
            username: formData.get('username'),
            password: formData.get('password'),
            rememberMe: formData.get('rememberMe') === 'on',
            role: formData.get('role'),
        }

        setSubmitted(data)
        console.log('📝 FormData:', data)

        // Reset
        e.currentTarget.reset()
    }

    return (
        <div className="forms-container">
            <h2 className="forms-title">Ejemplo 4.3: FormData API</h2>

            <p className="forms-description">
                La API <code>FormData</code> extrae todos los valores del formulario
                usando el atributo <code>name</code>. No necesitas refs ni state.
            </p>

            <div className="forms-card">
                <h3>🔐 Login con FormData</h3>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Usuario:</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            className="form-input"
                            placeholder="usuario123"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="form-input"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div className="checkbox-group">
                        <input
                            id="rememberMe"
                            name="rememberMe"
                            type="checkbox"
                        />
                        <label htmlFor="rememberMe">Recordarme</label>
                    </div>

                    <div className="form-group">
                        <label>Rol:</label>
                        <div className="radio-group">
                            <div className="radio-option">
                                <input
                                    id="user"
                                    name="role"
                                    type="radio"
                                    value="user"
                                    defaultChecked
                                />
                                <label htmlFor="user">Usuario</label>
                            </div>
                            <div className="radio-option">
                                <input
                                    id="admin"
                                    name="role"
                                    type="radio"
                                    value="admin"
                                />
                                <label htmlFor="admin">Administrador</label>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="form-button primary">
                        Iniciar Sesión
                    </button>
                </form>

                {submitted && (
                    <div className="form-success">
                        <h4>✅ Login data:</h4>
                        <pre>{JSON.stringify(submitted, null, 2)}</pre>
                    </div>
                )}
            </div>

            <div className="code-box">
                <h4>Código:</h4>
                <pre>{`const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  
  const formData = new FormData(e.currentTarget)
  
  const data = {
    username: formData.get('username'),
    password: formData.get('password'),
    rememberMe: formData.get('rememberMe') === 'on',
  }
  
  // Usar data...
}

// En el HTML, usa atributo "name"
<input name="username" />
<input name="password" type="password" />`}</pre>
            </div>

            <div className="info-box success">
                <h4>✅ Ventajas de FormData:</h4>
                <ul>
                    <li>No necesitas refs ni state</li>
                    <li>Código más limpio y simple</li>
                    <li>Perfecto para formularios con muchos campos</li>
                    <li>Soporta archivos automáticamente</li>
                </ul>
            </div>
        </div>
    )
}

