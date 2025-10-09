// Página del Ejemplo Eventos - Interactividad con el usuario
import ComponenteConEventos from '../components/ComponenteConEventos'

function EjemploEventos() {
    return (
        <div className="page-content">
            <div className="page-header">
                <h1>5️⃣ Manejo de Eventos</h1>
                <p className="page-description">
                    Los eventos permiten que tu aplicación reaccione a las acciones del usuario.
                </p>
            </div>

            <div className="demo-section">
                <h2>📋 Demostración</h2>
                <p className="demo-instruction">
                    Interactúa con los controles y observa cómo React maneja los eventos:
                </p>
                <ComponenteConEventos />
            </div>

            <div className="explanation-section">
                <h2>💡 Explicación</h2>
                <p>
                    React maneja eventos a través de <strong>SyntheticEvents</strong>, que son
                    una abstracción que funciona consistentemente en todos los navegadores.
                    Los eventos se pasan como props a los elementos JSX.
                </p>

                <h3>Tipos de eventos comunes:</h3>
                <ul>
                    <li><strong>onClick:</strong> Clic del mouse</li>
                    <li><strong>onChange:</strong> Cambio en inputs y selects</li>
                    <li><strong>onMouseEnter/Leave:</strong> Mouse entra/sale del elemento</li>
                    <li><strong>onSubmit:</strong> Envío de formularios</li>
                    <li><strong>onFocus/Blur:</strong> Elemento recibe/pierde foco</li>
                </ul>

                <h3>Código del ejemplo:</h3>
                <pre className="code-block">
                    {`import { useState } from 'react'

function ComponenteConEventos() {
  const [nombre, setNombre] = useState('')
  const [color, setColor] = useState('#3498db')
  const [mostrarMensaje, setMostrarMensaje] = useState(false)

  // Manejo de evento de input
  const manejarCambioNombre = (evento: React.ChangeEvent<HTMLInputElement>) => {
    setNombre(evento.target.value)
  }

  // Manejo de evento de select
  const manejarCambioColor = (evento: React.ChangeEvent<HTMLSelectElement>) => {
    setColor(evento.target.value)
  }

  // Manejo de evento de click
  const manejarClick = () => {
    setMostrarMensaje(!mostrarMensaje)
  }

  return (
    <div className="componente-ejemplo">
      <h3>Manejo de Eventos</h3>
      
      <div className="controles">
        <input
          type="text"
          value={nombre}
          onChange={manejarCambioNombre}
          placeholder="Tu nombre aquí..."
        />
        
        <select value={color} onChange={manejarCambioColor}>
          <option value="#3498db">Azul</option>
          <option value="#e74c3c">Rojo</option>
          <option value="#2ecc71">Verde</option>
        </select>

        <button onClick={manejarClick}>
          {mostrarMensaje ? 'Ocultar' : 'Mostrar'} Mensaje
        </button>
      </div>

      {/* Renderizado condicional */}
      {mostrarMensaje && (
        <div style={{ backgroundColor: color }}>
          <p>{nombre ? \`¡Hola \${nombre}!\` : '¡Hola!'}</p>
        </div>
      )}
    </div>
  )
}`}
                </pre>

                <div className="important-note">
                    <h4>🎯 Renderizado Condicional</h4>
                    <p>
                        En este ejemplo también vemos <strong>renderizado condicional</strong>
                        usando el operador <code>&&</code>. El mensaje solo se muestra cuando
                        <code>mostrarMensaje</code> es <code>true</code>.
                    </p>
                </div>
            </div>

            <div className="next-steps">
                <h2>🎉 ¡Felicitaciones!</h2>
                <p>
                    Has completado todos los ejemplos básicos de React. Ahora tienes las
                    herramientas fundamentales para crear aplicaciones interactivas.
                    ¡Practica combinando estos conceptos para crear tus propios componentes!
                </p>

                <div className="final-tips">
                    <h4>💡 Próximos pasos sugeridos:</h4>
                    <ul>
                        <li>Practica creando tus propios componentes</li>
                        <li>Combina props, estado y eventos en un solo componente</li>
                        <li>Experimenta con formularios más complejos</li>
                        <li>Aprende sobre useEffect para efectos secundarios</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default EjemploEventos
