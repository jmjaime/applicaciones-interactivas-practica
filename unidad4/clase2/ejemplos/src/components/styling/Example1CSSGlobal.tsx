import './Example1CSSGlobal.css'

/**
 * Ejemplo 1.1: CSS Global
 * 
 * Demuestra el uso de CSS tradicional con archivos .css separados.
 * Los estilos son globales y pueden afectar otros componentes.
 */

export default function Example1CSSGlobal() {
    return (
        <div className="example-container">
            <h2>Ejemplo 1.1: CSS Global</h2>
            <p className="description">
                Este ejemplo usa CSS tradicional con un archivo .css separado.
                Las clases son globales y se aplican con className.
            </p>

            <div className="todo-list">
                <h3 className="todo-title">Mi Lista de Tareas</h3>

                <div className="todo-item">
                    <input type="checkbox" id="todo1" />
                    <label htmlFor="todo1">Aprender React</label>
                </div>

                <div className="todo-item">
                    <input type="checkbox" id="todo2" defaultChecked />
                    <label htmlFor="todo2">Estudiar CSS</label>
                </div>

                <div className="todo-item">
                    <input type="checkbox" id="todo3" />
                    <label htmlFor="todo3">Crear un proyecto</label>
                </div>

                <button className="add-button">+ Agregar Tarea</button>
            </div>

            <div className="code-note">
                <h4>⚠️ Problema:</h4>
                <p>Las clases como "todo-item" y "add-button" son globales.</p>
                <p>Si otro componente usa las mismas clases, habrá conflictos.</p>
            </div>
        </div>
    )
}

