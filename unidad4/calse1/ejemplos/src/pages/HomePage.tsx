// Página de Inicio - Índice de todos los ejemplos disponibles
function HomePage() {
    return (
        <div className="page-content">
            <div className="welcome-section">
                <h1>🎯 Bienvenido a los Ejemplos de React</h1>
                <p className="welcome-text">
                    Esta aplicación contiene ejemplos progresivos de React, desde los conceptos más básicos
                    hasta funcionalidades más avanzadas. Cada ejemplo está en su propia página para que
                    puedas concentrarte en un concepto a la vez.
                </p>
            </div>

            <div className="examples-grid">
                <div className="example-card">
                    <h3>1️⃣ Componente Básico</h3>
                    <p>Aprende la estructura más simple de un componente React</p>
                    <ul>
                        <li>Función que retorna JSX</li>
                        <li>Sin props ni estado</li>
                        <li>Sintaxis fundamental</li>
                    </ul>
                </div>

                <div className="example-card">
                    <h3>2️⃣ Componente con Props</h3>
                    <p>Descubre cómo pasar datos entre componentes</p>
                    <ul>
                        <li>Recibir props del componente padre</li>
                        <li>Tipado con TypeScript</li>
                        <li>Reutilización de componentes</li>
                    </ul>
                </div>

                <div className="example-card">
                    <h3>3️⃣ Componente con Estado</h3>
                    <p>Maneja datos que cambian con el hook useState</p>
                    <ul>
                        <li>Hook useState</li>
                        <li>Estado local del componente</li>
                        <li>Re-renderizado automático</li>
                    </ul>
                </div>

                <div className="example-card">
                    <h3>4️⃣ Renderizado de Listas</h3>
                    <p>Aprende a mostrar arrays de datos</p>
                    <ul>
                        <li>Método map() para arrays</li>
                        <li>Prop key única</li>
                        <li>Datos dinámicos</li>
                    </ul>
                </div>

                <div className="example-card">
                    <h3>5️⃣ Manejo de Eventos</h3>
                    <p>Haz tu aplicación interactiva</p>
                    <ul>
                        <li>Eventos sintéticos de React</li>
                        <li>Manejo de formularios</li>
                        <li>Renderizado condicional</li>
                    </ul>
                </div>
            </div>

            <div className="instructions-section">
                <h2>📚 Cómo usar estos ejemplos</h2>
                <ol>
                    <li><strong>Sigue el orden:</strong> Los ejemplos están diseñados para aprenderse en secuencia</li>
                    <li><strong>Experimenta:</strong> Modifica el código y observa los cambios</li>
                    <li><strong>Lee los comentarios:</strong> Cada archivo tiene explicaciones detalladas</li>
                    <li><strong>Practica:</strong> Intenta recrear los ejemplos desde cero</li>
                </ol>
            </div>
        </div>
    )
}

export default HomePage
