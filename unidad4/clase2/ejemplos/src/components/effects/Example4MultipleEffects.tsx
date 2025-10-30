import { useState, useEffect } from 'react'
import './effects-common.css'

/**
 * Ejemplo 3.4: Multiple Effects
 * 
 * Demuestra cómo usar múltiples useEffect para separar concerns.
 */

export default function Example4MultipleEffects() {
    const [searchTerm, setSearchTerm] = useState('')
    const [results, setResults] = useState<string[]>([])
    const [theme, setTheme] = useState<'light' | 'dark'>('light')

    // Effect 1: Document title
    useEffect(() => {
        document.title = searchTerm
            ? `Buscando: ${searchTerm}`
            : 'Búsqueda de Canciones'

        console.log('📝 Title actualizado:', document.title)

        return () => {
            document.title = 'React App' // Cleanup
        }
    }, [searchTerm])

    // Effect 2: Búsqueda con debounce
    useEffect(() => {
        if (!searchTerm) {
            setResults([])
            return
        }

        console.log('🔍 Iniciando búsqueda para:', searchTerm)

        const timeoutId = setTimeout(() => {
            // Simular búsqueda
            const mockResults = [
                `${searchTerm} - Song 1`,
                `${searchTerm} - Song 2`,
                `${searchTerm} - Song 3`,
                `Best of ${searchTerm}`,
                `${searchTerm} Remix`,
            ]
            setResults(mockResults)
            console.log('✅ Resultados encontrados:', mockResults.length)
        }, 500)

        return () => {
            console.log('🧹 Cancelando búsqueda anterior')
            clearTimeout(timeoutId)
        }
    }, [searchTerm])

    // Effect 3: Theme persistence
    useEffect(() => {
        console.log('🎨 Guardando tema:', theme)
        localStorage.setItem('theme', theme)
        document.body.style.backgroundColor = theme === 'dark' ? '#2c3e50' : '#ecf0f1'

        return () => {
            document.body.style.backgroundColor = '' // Cleanup
        }
    }, [theme])

    // Effect 4: Logs al montar/desmontar
    useEffect(() => {
        console.log('🎉 Componente montado')

        return () => {
            console.log('👋 Componente desmontado')
        }
    }, [])

    return (
        <div className="effects-container">
            <h2 className="effects-title">Ejemplo 3.4: Multiple Effects</h2>

            <p className="effects-description">
                Usa múltiples useEffect para separar lógica independiente.
                Cada effect tiene sus propias dependencias y cleanup.
            </p>

            <div className="effects-card">
                <h3>🎵 Búsqueda de Canciones</h3>

                <div style={{ marginBottom: '20px' }}>
                    <button
                        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                        className="effects-button secondary"
                        style={{ marginBottom: '15px' }}
                    >
                        {theme === 'dark' ? '☀️' : '🌙'} Cambiar Tema
                    </button>
                </div>

                <div className="search-box">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar canciones..."
                        className="search-input"
                    />

                    {searchTerm && (
                        <div className="search-status">
                            ⏳ Buscando "{searchTerm}"... (con 500ms de debounce)
                        </div>
                    )}
                </div>

                {results.length > 0 && (
                    <div style={{ marginTop: '20px' }}>
                        <h4>📀 Resultados ({results.length}):</h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {results.map((result, index) => (
                                <li
                                    key={index}
                                    style={{
                                        backgroundColor: '#f8f9fa',
                                        padding: '12px',
                                        borderRadius: '6px',
                                        marginBottom: '8px',
                                        borderLeft: '4px solid #3498db',
                                    }}
                                >
                                    🎵 {result}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="code-box">
                <h4>Código:</h4>
                <pre>{`// Effect 1: Document title
useEffect(() => {
  document.title = \`Buscando: \${searchTerm}\`
  return () => { document.title = 'App' }
}, [searchTerm])

// Effect 2: Búsqueda
useEffect(() => {
  const timeoutId = setTimeout(() => {
    // búsqueda...
  }, 500)
  return () => clearTimeout(timeoutId)
}, [searchTerm])

// Effect 3: Theme
useEffect(() => {
  localStorage.setItem('theme', theme)
}, [theme])

// Effect 4: Mount/Unmount
useEffect(() => {
  console.log('Mounted')
  return () => console.log('Unmounted')
}, [])`}</pre>
            </div>

            <div className="info-box success">
                <h4>✅ Beneficios de Multiple Effects:</h4>
                <ul>
                    <li><strong>Separación de concerns:</strong> Cada effect hace una cosa</li>
                    <li><strong>Dependencias claras:</strong> Solo lo que necesita cada uno</li>
                    <li><strong>Más fácil de debuggear:</strong> Logs independientes</li>
                    <li><strong>Mejor organización:</strong> Código más limpio y mantenible</li>
                </ul>
            </div>
        </div>
    )
}

