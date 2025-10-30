import { useState, useEffect } from 'react'
import './effects-common.css'

/**
 * Ejemplo 3.1: useEffect Básico - Fetch de Datos
 * 
 * Demuestra cómo hacer un fetch de datos al montar el componente.
 */

interface User {
  id: number
  name: string
  email: string
  username: string
}

export default function Example1FetchBasic() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // useEffect con array vacío = solo se ejecuta al montar
  useEffect(() => {
    console.log('🔄 Componente montado - Fetching users...')
    
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data)
        setLoading(false)
        console.log('✅ Users cargados:', data.length)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
        console.error('❌ Error:', err)
      })
  }, []) // Array vacío = solo al montar

  const handleRefresh = () => {
    setLoading(true)
    setError(null)
    
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }

  return (
    <div className="effects-container">
      <h2 className="effects-title">Ejemplo 3.1: Fetch Básico</h2>
      
      <p className="effects-description">
        useEffect con array de dependencias vacío <code>[]</code> se ejecuta
        solo una vez cuando el componente se monta. Perfecto para cargar datos iniciales.
      </p>

      <div className="effects-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3>👥 Lista de Usuarios</h3>
          <button onClick={handleRefresh} className="effects-button primary" disabled={loading}>
            🔄 Recargar
          </button>
        </div>

        {loading && <div className="loading">⏳ Cargando usuarios...</div>}

        {error && (
          <div className="error-message">
            <strong>Error:</strong> {error}
          </div>
        )}

        {!loading && !error && (
          <div className="user-grid">
            {users.map(user => (
              <div key={user.id} className="user-card">
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>👤</div>
                <h4>{user.name}</h4>
                <p>@{user.username}</p>
                <p style={{ fontSize: '0.85rem', color: '#95a5a6' }}>{user.email}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="code-box">
        <h4>Código:</h4>
        <pre>{`useEffect(() => {
  // Este código se ejecuta AL MONTAR el componente
  fetch('https://api.example.com/users')
    .then(response => response.json())
    .then(data => setUsers(data))
    .catch(err => setError(err.message))
}, []) // Array vacío = solo al montar

// Ciclo de vida:
// 1. Componente se monta
// 2. useEffect se ejecuta
// 3. Fetch inicia
// 4. Estado se actualiza cuando llega respuesta
// 5. Componente re-renderiza con datos`}</pre>
      </div>

      <div className="info-box warning">
        <h4>⚠️ Importante:</h4>
        <ul>
          <li>El array de dependencias <code>[]</code> hace que se ejecute solo al montar</li>
          <li>Sin el array, se ejecutaría en cada render (¡loop infinito!)</li>
          <li>Usa estados de loading y error para mejor UX</li>
          <li>Abre la consola del navegador para ver los logs</li>
        </ul>
      </div>
    </div>
  )
}

