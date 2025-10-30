import { useState } from 'react'
import './forms-common.css'

/**
 * Ejemplo 4.5: useActionState (React 19)
 * Hook para manejar estado de form actions con validación
 * 
 * NOTA: useActionState está en React 19 canary. Este ejemplo simula su comportamiento.
 */

interface ActionState {
    success: boolean
    error: string | null
    data: any
}

export default function Example5UseActionState() {
    const [state, setState] = useState<ActionState>({
        success: false,
        error: null,
        data: null,
    })
    const [isPending, setIsPending] = useState(false)

    // Simula useActionState
    const submitAction = async (formData: FormData) => {
        setIsPending(true)
        setState({ success: false, error: null, data: null })

        try {
            const email = formData.get('email') as string
            const password = formData.get('password') as string

            // Validación
            if (!email || !email.includes('@')) {
                throw new Error('Email inválido')
            }

            if (!password || password.length < 6) {
                throw new Error('Contraseña debe tener al menos 6 caracteres')
            }

            // Simular API call
            await new Promise(resolve => setTimeout(resolve, 1500))

            setState({
                success: true,
                error: null,
                data: { email, passwordLength: password.length },
            })

            console.log('✅ Login exitoso')
        } catch (error) {
            setState({
                success: false,
                error: error instanceof Error ? error.message : 'Error desconocido',
                data: null,
            })
            console.error('❌ Error:', error)
        } finally {
            setIsPending(false)
        }
    }

    return (
        <div className="forms-container">
            <h2 className="forms-title">Ejemplo 4.5: useActionState (React 19)</h2>

            <p className="forms-description">
                <code>useActionState</code> combina form actions con manejo de estado.
                Perfecto para validación, loading states y mensajes de error.
            </p>

            <div className="forms-card">
                <h3>🔐 Login con Validación</h3>

                <form action={submitAction}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="form-input"
                            placeholder="usuario@ejemplo.com"
                            disabled={isPending}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="form-input"
                            placeholder="Mínimo 6 caracteres"
                            disabled={isPending}
                        />
                    </div>

                    {state.error && (
                        <div style={{
                            backgroundColor: '#f8d7da',
                            color: '#721c24',
                            padding: '12px',
                            borderRadius: '6px',
                            marginBottom: '15px',
                            borderLeft: '4px solid #e74c3c',
                        }}>
                            ❌ {state.error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="form-button primary"
                        disabled={isPending}
                    >
                        {isPending ? 'Verificando...' : 'Iniciar Sesión'}
                    </button>
                </form>

                {state.success && (
                    <div className="form-success">
                        <h4>✅ Login exitoso!</h4>
                        <pre>{JSON.stringify(state.data, null, 2)}</pre>
                    </div>
                )}
            </div>

            <div className="code-box">
                <h4>Código (React 19 real):</h4>
                <pre>{`import { useActionState } from 'react'

const loginAction = async (prevState, formData) => {
  const email = formData.get('email')
  
  if (!email.includes('@')) {
    return { error: 'Email inválido' }
  }
  
  // API call...
  return { success: true, user: data }
}

const [state, action, isPending] = useActionState(
  loginAction,
  { error: null, success: false }
)

<form action={action}>
  <input name="email" />
  <button disabled={isPending}>
    {isPending ? 'Loading...' : 'Submit'}
  </button>
  {state.error && <p>{state.error}</p>}
</form>`}</pre>
            </div>

            <div className="info-box success">
                <h4>✅ Características de useActionState:</h4>
                <ul>
                    <li>Estado + acción + pending en un solo hook</li>
                    <li>Validación server-side automática</li>
                    <li>Optimistic updates integrados</li>
                    <li>Perfecto para Next.js Server Actions</li>
                </ul>
            </div>

            <div className="info-box warning">
                <h4>⚠️ Nota importante:</h4>
                <p><code>useActionState</code> está disponible en React 19 canary.</p>
                <p>Este ejemplo simula su comportamiento para fines educativos.</p>
                <p>En producción, verifica que estés usando React 19+.</p>
            </div>
        </div>
    )
}

