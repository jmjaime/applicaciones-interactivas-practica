// Componente con Props - Demuestra cómo recibir y usar props
// Props son datos que se pasan desde el componente padre

// Definimos el tipo de las props que esperamos recibir
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

export default ComponenteConProps
