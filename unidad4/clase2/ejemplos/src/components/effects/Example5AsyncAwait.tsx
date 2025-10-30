import { useState, useEffect } from 'react'
import './effects-common.css'

/**
 * Ejemplo 3.5: useEffect con Async/Await
 * 
 * Demuestra el patrón correcto para usar async/await en useEffect.
 */

interface Todo {
    id: number
    title: string
    completed: boolean
    userId: number
}

export default function Example5AsyncAwait() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all')

    useEffect(() => {
        // ❌ NO PUEDES hacer esto:
        // useEffect(async () => { ... })

        // ✅ CORRECTO: Define función async interna
        const fetchTodos = async () => {
            setLoading(true)
            setError(null)

            try {
                console.log('🔄 Fetching todos...')

                const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const data = await response.json()

                console.log('✅ Todos recibidos:', data.length)
                setTodos(data)
            } catch (err) {
                console.error('❌ Error:', err)
                setError(err instanceof Error ? err.message : 'Error desconocido')
            } finally {
                setLoading(false)
            }
        }

        fetchTodos() // Llamar la función
    }, []) // Solo al montar

    const filteredTodos = todos.filter(todo => {
        if (filter === 'completed') return todo.completed
        if (filter === 'pending') return !todo.completed
        return true
    })

    return (
        <div className="effects-container">
            <h2 className="effects-title">Ejemplo 3.5: Async/Await</h2>

            <p className="effects-description">
                No puedes hacer <code>useEffect(async () =&gt; ...)</code>.
                En su lugar, define una función async interna y llámala.
            </p>

            <div className="effects-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3>✅ Lista de Tareas</h3>
                    <div className="button-group">
                        <button
                            onClick={() => setFilter('all')}
                            className={`effects-button ${filter === 'all' ? 'primary' : 'secondary'}`}
                        >
                            Todas ({todos.length})
                        </button>
                        <button
                            onClick={() => setFilter('completed')}
                            className={`effects-button ${filter === 'completed' ? 'success' : 'secondary'}`}
                        >
                            Completadas ({todos.filter(t => t.completed).length})
                        </button>
                        <button
                            onClick={() => setFilter('pending')}
                            className={`effects-button ${filter === 'pending' ? 'danger' : 'secondary'}`}
                        >
                            Pendientes ({todos.filter(t => !t.completed).length})
                        </button>
                    </div>
                </div>

                {loading && <div className="loading">⏳ Cargando tareas...</div>}

                {error && (
                    <div className="error-message">
                        <strong>Error:</strong> {error}
                    </div>
                )}

                {!loading && !error && (
                    <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                        {filteredTodos.map(todo => (
                            <div
                                key={todo.id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '12px',
                                    marginBottom: '8px',
                                    backgroundColor: todo.completed ? '#d1f2eb' : '#fff3cd',
                                    borderRadius: '6px',
                                    borderLeft: `4px solid ${todo.completed ? '#2ecc71' : '#f39c12'}`,
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    readOnly
                                    style={{ marginRight: '12px', width: '18px', height: '18px' }}
                                />
                                <span style={{
                                    flex: 1,
                                    textDecoration: todo.completed ? 'line-through' : 'none',
                                    color: todo.completed ? '#7f8c8d' : '#2c3e50',
                                }}>
                                    {todo.title}
                                </span>
                                <span style={{
                                    fontSize: '0.85rem',
                                    color: '#95a5a6',
                                    marginLeft: '10px',
                                }}>
                                    #{todo.id}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="code-box">
                <h4>❌ INCORRECTO:</h4>
                <pre style={{ backgroundColor: '#f8d7da', color: '#721c24' }}>{`// ❌ NO FUNCIONA
useEffect(async () => {
  const data = await fetch('/api')
  // ...
}, [])`}</pre>
            </div>

            <div className="code-box">
                <h4>✅ CORRECTO:</h4>
                <pre>{`useEffect(() => {
  // Definir función async interna
  const fetchData = async () => {
    try {
      const response = await fetch('/api')
      const data = await response.json()
      setData(data)
    } catch (err) {
      setError(err.message)
    }
  }
  
  // Llamar la función
  fetchData()
}, [])`}</pre>
            </div>

            <div className="info-box warning">
                <h4>⚠️ ¿Por qué no async directo?</h4>
                <p>useEffect espera una función que retorne <code>void</code> o una <strong>función de cleanup</strong>.</p>
                <p>Las funciones <code>async</code> siempre retornan una <code>Promise</code>, no una función de cleanup.</p>
            </div>

            <div className="info-box success">
                <h4>✅ Patrón con AbortController (avanzado):</h4>
                <pre style={{ fontSize: '0.8rem' }}>{`useEffect(() => {
  const controller = new AbortController()
  
  const fetchData = async () => {
    try {
      const response = await fetch('/api', {
        signal: controller.signal
      })
      const data = await response.json()
      setData(data)
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message)
      }
    }
  }
  
  fetchData()
  
  // Cleanup: cancelar fetch si se desmonta
  return () => controller.abort()
}, [])`}</pre>
            </div>
        </div>
    )
}

