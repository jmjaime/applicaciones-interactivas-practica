// Página del Ejemplo Básico - Componente más simple
import ComponenteBasico from '../components/ComponenteBasico'

function EjemploBasico() {
    return (
        <div className="page-content">
            <div className="page-header">
                <h1>1️⃣ Componente Básico</h1>
                <p className="page-description">
                    El ejemplo más simple de un componente React. Solo es una función que retorna JSX.
                </p>
            </div>

            <div className="demo-section">
                <h2>📋 Demostración</h2>
                <ComponenteBasico />
            </div>

            <div className="explanation-section">
                <h2>💡 Explicación</h2>
                <p>
                    Un componente básico en React es simplemente una función que retorna JSX.
                    No recibe props ni maneja estado, pero es la base de todo en React.
                </p>

                <h3>Características clave:</h3>
                <ul>
                    <li><strong>Función:</strong> Es una función de JavaScript</li>
                    <li><strong>Retorna JSX:</strong> Debe retornar elementos JSX</li>
                    <li><strong>Nombre:</strong> Debe empezar con mayúscula (PascalCase)</li>
                    <li><strong>Export:</strong> Se exporta para poder usarlo en otros archivos</li>
                </ul>

                <h3>Código del ejemplo:</h3>
                <pre className="code-block">
                    {`function ComponenteBasico() {
  return (
    <div className="componente-ejemplo">
      <h3>¡Hola desde un componente básico!</h3>
      <p>Este es el tipo de componente más simple en React.</p>
      <p>Solo retorna JSX y no recibe props ni maneja estado.</p>
    </div>
  )
}

export default ComponenteBasico`}
                </pre>
            </div>

            <div className="next-steps">
                <h2>🚀 Próximo paso</h2>
                <p>
                    Ahora que entiendes los componentes básicos, el siguiente paso es aprender
                    cómo pasar datos a los componentes usando <strong>props</strong>.
                </p>
            </div>
        </div>
    )
}

export default EjemploBasico
