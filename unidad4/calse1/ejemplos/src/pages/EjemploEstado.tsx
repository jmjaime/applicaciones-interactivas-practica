// Página del Ejemplo Estado - Manejo de estado con useState
import ComponenteConEstado from '../components/ComponenteConEstado'

function EjemploEstado() {
    return (
        <div className="page-content">
            <div className="page-header">
                <h1>3️⃣ Componente con Estado</h1>
                <p className="page-description">
                    El estado permite que los componentes "recuerden" información entre renders.
                </p>
            </div>

            <div className="demo-section">
                <h2>📋 Demostración</h2>
                <p className="demo-instruction">
                    ¡Interactúa con el contador! Los botones modifican el estado del componente:
                </p>
                <ComponenteConEstado />
            </div>

            <div className="explanation-section">
                <h2>💡 Explicación</h2>
                <p>
                    El <strong>estado</strong> es la forma que tienen los componentes de React
                    de "recordar" información entre renders. Cuando el estado cambia, React
                    automáticamente vuelve a renderizar el componente.
                </p>

                <h3>Hook useState:</h3>
                <ul>
                    <li><strong>Declaración:</strong> <code>const [valor, setValor] = useState(inicial)</code></li>
                    <li><strong>Valor:</strong> El valor actual del estado</li>
                    <li><strong>Setter:</strong> Función para actualizar el estado</li>
                    <li><strong>Re-render:</strong> React re-renderiza cuando el estado cambia</li>
                </ul>

                <h3>Código del ejemplo:</h3>
                <pre className="code-block">
                    {`import { useState } from 'react'

function ComponenteConEstado() {
  // useState retorna [valor, función para actualizar]
  const [contador, setContador] = useState(0)
  const [mensaje, setMensaje] = useState('¡Haz clic en los botones!')

  const incrementar = () => {
    setContador(contador + 1)
    setMensaje(\`¡Has hecho clic \${contador + 1} veces!\`)
  }

  const decrementar = () => {
    setContador(contador - 1) 
    setMensaje(\`¡Has hecho clic \${contador - 1} veces!\`)
  }

  const reiniciar = () => {
    setContador(0)
    setMensaje('¡Contador reiniciado!')
  }

  return (
    <div className="componente-ejemplo">
      <h3>Contador con Estado</h3>
      <p className="mensaje">{mensaje}</p>
      <div className="contador">
        <span className="numero">{contador}</span>
      </div>
      <div className="botones">
        <button onClick={decrementar}>➖ Decrementar</button>
        <button onClick={reiniciar}>🔄 Reiniciar</button>
        <button onClick={incrementar}>➕ Incrementar</button>
      </div>
    </div>
  )
}`}
                </pre>
            </div>

            <div className="next-steps">
                <h2>🚀 Próximo paso</h2>
                <p>
                    Ahora que manejas el estado, aprende cómo mostrar listas de datos
                    usando <strong>arrays y el método map()</strong>.
                </p>
            </div>
        </div>
    )
}

export default EjemploEstado
