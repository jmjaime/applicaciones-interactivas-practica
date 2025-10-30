import { useState } from 'react'

/**
 * Ejemplo 1.2: Inline Styles
 * 
 * Demuestra el uso de estilos inline dinámicos.
 * Los estilos se definen como objetos JavaScript.
 */

export default function Example2InlineStyles() {
    const [isDarkMode, setIsDarkMode] = useState(false)

    // Estilos dinámicos basados en el estado
    const containerStyle = {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: isDarkMode ? '#2c3e50' : '#ffffff',
        color: isDarkMode ? '#ecf0f1' : '#2c3e50',
        borderRadius: '8px',
        transition: 'all 0.3s ease',
    }

    const buttonStyle = {
        padding: '12px 24px',
        backgroundColor: isDarkMode ? '#3498db' : '#2c3e50',
        color: '#ffffff',
        border: 'none',
        borderRadius: '6px',
        fontSize: '1rem',
        cursor: 'pointer',
        marginTop: '20px',
    }

    const cardStyle = {
        backgroundColor: isDarkMode ? '#34495e' : '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        marginTop: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }

    const titleStyle = {
        color: isDarkMode ? '#3498db' : '#2c3e50',
        marginBottom: '15px',
    }

    const descriptionStyle = {
        lineHeight: '1.6',
        marginBottom: '10px',
    }

    return (
        <div style={containerStyle}>
            <h2 style={titleStyle}>Ejemplo 1.2: Inline Styles</h2>

            <p style={descriptionStyle}>
                Los estilos inline se definen como objetos JavaScript y se pasan
                al atributo style usando doble llaves: <code>{'style={{ ... }}'}</code>
            </p>

            <button
                style={buttonStyle}
                onClick={() => setIsDarkMode(!isDarkMode)}
                onMouseOver={(e) => {
                    e.currentTarget.style.opacity = '0.8'
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.opacity = '1'
                }}
            >
                {isDarkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
            </button>

            <div style={cardStyle}>
                <h3 style={{ marginTop: 0 }}>Características:</h3>
                <ul style={{ paddingLeft: '20px' }}>
                    <li style={{ marginBottom: '8px' }}>✅ Estilos dinámicos fáciles</li>
                    <li style={{ marginBottom: '8px' }}>✅ Sin conflictos de nombres</li>
                    <li style={{ marginBottom: '8px' }}>✅ Props en camelCase (backgroundColor)</li>
                    <li style={{ marginBottom: '8px' }}>❌ No soporta pseudo-clases (:hover)</li>
                    <li style={{ marginBottom: '8px' }}>❌ No soporta media queries</li>
                </ul>
            </div>

            <div style={{
                marginTop: '20px',
                padding: '15px',
                backgroundColor: isDarkMode ? '#1a252f' : '#d1ecf1',
                borderLeft: `4px solid ${isDarkMode ? '#3498db' : '#0c5460'}`,
                borderRadius: '4px',
            }}>
                <h4 style={{
                    color: isDarkMode ? '#3498db' : '#0c5460',
                    marginTop: 0,
                    marginBottom: '10px'
                }}>
                    💡 Nota:
                </h4>
                <p style={{
                    margin: 0,
                    fontSize: '0.9rem',
                    color: isDarkMode ? '#bdc3c7' : '#0c5460'
                }}>
                    Los inline styles son perfectos para estilos dinámicos basados en props o state.
                    Para estilos complejos o reutilizables, considera CSS Modules o styled-components.
                </p>
            </div>
        </div>
    )
}

