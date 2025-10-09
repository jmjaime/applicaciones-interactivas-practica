// Página del Ejemplo Props - Pasar datos entre componentes
import ComponenteConProps from '../components/ComponenteConProps'

function EjemploProps() {
    return (
        <div className="page-content">
            <div className="page-header">
                <h1>2️⃣ Componente con Props</h1>
                <p className="page-description">
                    Las props permiten pasar datos desde un componente padre a un componente hijo.
                </p>
            </div>

            <div className="demo-section">
                <h2>📋 Demostración</h2>
                <div className="props-examples">
                    <ComponenteConProps
                        nombre="Juan"
                        edad={25}
                        activo={true}
                    />
                    <ComponenteConProps
                        nombre="María"
                        edad={30}
                        activo={false}
                    />
                    <ComponenteConProps
                        nombre="Carlos"
                        edad={22}
                        activo={true}
                    />
                </div>
            </div>

            <div className="explanation-section">
                <h2>💡 Explicación</h2>
                <p>
                    Las <strong>props</strong> (propiedades) son la forma de pasar datos desde un
                    componente padre a un componente hijo. Son inmutables (solo lectura) desde
                    la perspectiva del componente hijo.
                </p>

                <h3>Características clave:</h3>
                <ul>
                    <li><strong>Inmutables:</strong> No se pueden modificar desde el componente hijo</li>
                    <li><strong>Tipadas:</strong> Con TypeScript podemos definir el tipo exacto</li>
                    <li><strong>Reutilización:</strong> Permiten reutilizar componentes con datos diferentes</li>
                    <li><strong>Unidireccionales:</strong> Los datos fluyen de padre a hijo</li>
                </ul>

                <h3>Código del ejemplo:</h3>
                <pre className="code-block">
                    {`// Definir el tipo de las props
interface Props {
  nombre: string
  edad: number
  activo: boolean
}

function ComponenteConProps({ nombre, edad, activo }: Props) {
  return (
    <div className="componente-ejemplo">
      <h3>Información del Usuario</h3>
      <p><strong>Nombre:</strong> {nombre}</p>
      <p><strong>Edad:</strong> {edad} años</p>
      <p><strong>Estado:</strong> 
        <span className={activo ? 'activo' : 'inactivo'}>
          {activo ? '✅ Activo' : '❌ Inactivo'}
        </span>
      </p>
    </div>
  )
}

// Uso del componente:
<ComponenteConProps 
  nombre="Juan" 
  edad={25} 
  activo={true} 
/>`}
                </pre>
            </div>

            <div className="next-steps">
                <h2>🚀 Próximo paso</h2>
                <p>
                    Ahora que sabes cómo pasar datos con props, aprende cómo los componentes
                    pueden "recordar" información usando <strong>estado</strong>.
                </p>
            </div>
        </div>
    )
}

export default EjemploProps
