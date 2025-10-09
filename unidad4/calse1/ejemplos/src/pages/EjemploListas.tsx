// Página del Ejemplo Listas - Renderizado de arrays con map()
import ListaDeElementos from '../components/ListaDeElementos'

function EjemploListas() {
    return (
        <div className="page-content">
            <div className="page-header">
                <h1>4️⃣ Renderizado de Listas</h1>
                <p className="page-description">
                    Aprende a mostrar arrays de datos usando el método map() y la prop key.
                </p>
            </div>

            <div className="demo-section">
                <h2>📋 Demostración</h2>
                <ListaDeElementos />
            </div>

            <div className="explanation-section">
                <h2>💡 Explicación</h2>
                <p>
                    Para mostrar listas de datos en React, usamos el método <strong>map()</strong>
                    de JavaScript. Cada elemento de la lista debe tener una prop <strong>key</strong>
                    única para que React pueda optimizar el renderizado.
                </p>

                <h3>Conceptos clave:</h3>
                <ul>
                    <li><strong>map():</strong> Transforma cada elemento del array en JSX</li>
                    <li><strong>key prop:</strong> Identificador único para cada elemento</li>
                    <li><strong>Optimización:</strong> React usa las keys para re-renderizar eficientemente</li>
                    <li><strong>Datos dinámicos:</strong> Las listas pueden cambiar dinámicamente</li>
                </ul>

                <h3>Código del ejemplo:</h3>
                <pre className="code-block">
                    {`import { useState } from 'react'

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

  const colores = ['🔴', '🟠', '🟡', '🟢', '🔵', '🟣']

  return (
    <div className="componente-ejemplo">
      <h3>Lista de Tareas</h3>
      <ul className="lista-tareas">
        {tareas.map((tarea, index) => (
          <li 
            key={tarea.id} // ¡Key única es OBLIGATORIA!
            className={\`tarea \${tarea.completada ? 'completada' : 'pendiente'}\`}
          >
            <span className="icono">{colores[index]}</span>
            <span className="texto">{tarea.texto}</span>
            <span className="estado">
              {tarea.completada ? '✅' : '⏳'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}`}
                </pre>

                <div className="important-note">
                    <h4>⚠️ Importante sobre las Keys</h4>
                    <p>
                        La prop <code>key</code> debe ser única y estable. Nunca uses el índice
                        del array como key si la lista puede cambiar de orden, ya que puede
                        causar problemas de renderizado.
                    </p>
                </div>
            </div>

            <div className="next-steps">
                <h2>🚀 Próximo paso</h2>
                <p>
                    Ahora que sabes mostrar listas, aprende cómo hacer tu aplicación
                    interactiva manejando <strong>eventos</strong> del usuario.
                </p>
            </div>
        </div>
    )
}

export default EjemploListas
