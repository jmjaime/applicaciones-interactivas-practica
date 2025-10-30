import { useState, useEffect } from 'react'
import './effects-common.css'

/**
 * Ejemplo 3.2: useEffect con Dependencias
 * 
 * Demuestra cómo useEffect se re-ejecuta cuando cambian las dependencias.
 */

interface Post {
  id: number
  title: string
  body: string
}

export default function Example2WithDependencies() {
  const [userId, setUserId] = useState(1)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)

  // useEffect se ejecuta cuando cambia userId
  useEffect(() => {
    console.log(`🔄 Fetching posts for user ${userId}...`)
    setLoading(true)
    
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(response => response.json())
      .then(data => {
        setPosts(data)
        setLoading(false)
        console.log(`✅ Loaded ${data.length} posts for user ${userId}`)
      })
  }, [userId]) // Se ejecuta cuando userId cambia

  return (
    <div className="effects-container">
      <h2 className="effects-title">Ejemplo 3.2: Con Dependencias</h2>
      
      <p className="effects-description">
        useEffect se re-ejecuta automáticamente cuando cambia alguna de sus dependencias.
        Útil para cargar datos basados en parámetros dinámicos.
      </p>

      <div className="effects-card">
        <h3>📝 Posts del Usuario</h3>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ marginRight: '10px', fontWeight: 'bold' }}>
            Selecciona usuario:
          </label>
          <div className="button-group">
            {[1, 2, 3, 4, 5].map(id => (
              <button
                key={id}
                onClick={() => setUserId(id)}
                className={`effects-button ${userId === id ? 'primary' : 'secondary'}`}
              >
                Usuario {id}
              </button>
            ))}
          </div>
        </div>

        {loading && <div className="loading">⏳ Cargando posts...</div>}

        {!loading && (
          <div>
            <p style={{ marginBottom: '15px', color: '#7f8c8d' }}>
              Mostrando {posts.length} posts del usuario {userId}
            </p>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {posts.slice(0, 5).map(post => (
                <div
                  key={post.id}
                  style={{
                    backgroundColor: '#f8f9fa',
                    padding: '15px',
                    borderRadius: '8px',
                    marginBottom: '10px',
                    borderLeft: '4px solid #3498db',
                  }}
                >
                  <h4 style={{ marginTop: 0, color: '#2c3e50' }}>
                    {post.title}
                  </h4>
                  <p style={{ margin: 0, color: '#7f8c8d', fontSize: '0.9rem' }}>
                    {post.body.substring(0, 100)}...
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="code-box">
        <h4>Código:</h4>
        <pre>{`const [userId, setUserId] = useState(1)

useEffect(() => {
  // Se ejecuta cuando userId cambia
  fetch(\`/api/posts?userId=\${userId}\`)
    .then(res => res.json())
    .then(data => setPosts(data))
}, [userId]) // Dependencia: userId

// Flujo:
// 1. userId cambia (ej: de 1 a 2)
// 2. React detecta el cambio
// 3. useEffect se ejecuta de nuevo
// 4. Fetch con nuevo userId
// 5. Estado actualizado
// 6. Re-render con nuevos datos`}</pre>
      </div>

      <div className="info-box success">
        <h4>✅ Reglas de Dependencias:</h4>
        <ul>
          <li>Incluye TODAS las variables que uses dentro del effect</li>
          <li>Si usas <code>userId</code> → inclúyelo en <code>[userId]</code></li>
          <li>Si no incluyes dependencias necesarias → bugs sutiles</li>
          <li>ESLint te ayudará a detectar dependencias faltantes</li>
        </ul>
      </div>
    </div>
  )
}

