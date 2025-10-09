// Componente con Eventos - Demuestra el manejo de diferentes eventos del usuario
// Los eventos en React son SyntheticEvents que funcionan igual en todos los navegadores

import { useState } from 'react'

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

    // Manejo de evento de mouse enter/leave
    const manejarMouseEnter = () => {
        console.log('Mouse entró al área')
    }

    const manejarMouseLeave = () => {
        console.log('Mouse salió del área')
    }

    return (
        <div className="componente-ejemplo">
            <h3>Manejo de Eventos</h3>

            <div className="controles">
                <div className="control">
                    <label htmlFor="nombre">Escribe tu nombre:</label>
                    <input
                        id="nombre"
                        type="text"
                        value={nombre}
                        onChange={manejarCambioNombre}
                        placeholder="Tu nombre aquí..."
                    />
                </div>

                <div className="control">
                    <label htmlFor="color">Elige un color:</label>
                    <select id="color" value={color} onChange={manejarCambioColor}>
                        <option value="#3498db">Azul</option>
                        <option value="#e74c3c">Rojo</option>
                        <option value="#2ecc71">Verde</option>
                        <option value="#f39c12">Naranja</option>
                        <option value="#9b59b6">Morado</option>
                    </select>
                </div>

                <button onClick={manejarClick}>
                    {mostrarMensaje ? 'Ocultar' : 'Mostrar'} Mensaje
                </button>
            </div>

            {/* Renderizado condicional */}
            {mostrarMensaje && (
                <div
                    className="mensaje-personalizado"
                    style={{ backgroundColor: color }}
                    onMouseEnter={manejarMouseEnter}
                    onMouseLeave={manejarMouseLeave}
                >
                    <p>
                        {nombre ? `¡Hola ${nombre}!` : '¡Hola!'}
                        Este mensaje cambia de color.
                    </p>
                    <p><small>Abre la consola y pasa el mouse por aquí</small></p>
                </div>
            )}
        </div>
    )
}

export default ComponenteConEventos
