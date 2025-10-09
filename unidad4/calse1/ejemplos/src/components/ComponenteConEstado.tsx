// Componente con Estado - Demuestra el uso del hook useState
// El estado permite que el componente "recuerde" información entre renders

import { useState } from 'react'

function ComponenteConEstado() {
    // useState retorna un array con [valor, función para actualizar]
    const [contador, setContador] = useState(0)
    const [mensaje, setMensaje] = useState('¡Haz clic en los botones!')

    const incrementar = () => {
        setContador(contador + 1)
        setMensaje(`¡Has hecho clic ${contador + 1} veces!`)
    }

    const decrementar = () => {
        setContador(contador - 1)
        setMensaje(`¡Has hecho clic ${contador - 1} veces!`)
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
}

export default ComponenteConEstado
