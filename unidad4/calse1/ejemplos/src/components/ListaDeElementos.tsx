// Lista de Elementos - Demuestra cómo renderizar listas usando map()
// Cada elemento necesita una prop 'key' única para optimizar el rendering

import { useState } from 'react'

interface Tarea {
    id: number
    texto: string
    completada: boolean
}

function ListaDeElementos() {
    const [tareas] = useState<Tarea[]>([
        { id: 1, texto: 'Aprender React', completada: true },
        { id: 2, texto: 'Crear componentes', completada: true },
        { id: 3, texto: 'Manejar estado', completada: false },
        { id: 4, texto: 'Usar props', completada: false },
        { id: 5, texto: 'Construir una app', completada: false }
    ])

    // Array de colores para demostrar variedad
    const colores = ['🔴', '🟠', '🟡', '🟢', '🔵', '🟣']

    return (
        <div className="componente-ejemplo">
            <h3>Lista de Tareas</h3>
            <p>Ejemplo de renderizado de listas con map():</p>

            <ul className="lista-tareas">
                {tareas.map((tarea, index) => (
                    <li
                        key={tarea.id}
                        className={`tarea ${tarea.completada ? 'completada' : 'pendiente'}`}
                    >
                        <span className="icono">{colores[index]}</span>
                        <span className="texto">{tarea.texto}</span>
                        <span className="estado">
                            {tarea.completada ? '✅' : '⏳'}
                        </span>
                    </li>
                ))}
            </ul>

            <p className="nota">
                <strong>Nota:</strong> Cada elemento tiene una 'key' única (tarea.id)
                para optimizar el rendering de React.
            </p>
        </div>
    )
}

export default ListaDeElementos
