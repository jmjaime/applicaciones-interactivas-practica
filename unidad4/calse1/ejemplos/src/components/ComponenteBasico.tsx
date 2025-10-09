// Componente Básico - El ejemplo más simple de un componente React
// Solo retorna JSX, sin props ni estado

function ComponenteBasico() {
    return (
        <div className="componente-ejemplo">
            <h3>¡Hola desde un componente básico!</h3>
            <p>Este es el tipo de componente más simple en React.</p>
            <p>Solo retorna JSX y no recibe props ni maneja estado.</p>
        </div>
    )
}

export default ComponenteBasico
