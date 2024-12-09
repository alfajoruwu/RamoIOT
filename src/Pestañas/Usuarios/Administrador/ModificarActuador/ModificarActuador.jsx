import React from 'react'
import '../ModificarActuador/ModificarActuador.css'
import Navbar from '../../../../Componentes/Elementos comunes/Navbar/Navbar'

const ModificarActuador = () => {
  return (
    <>
    <Navbar titulo="Modificar Actuador" />
    <div className='ModificarActuador'>
        Añadir Accion

        <button> Añadir Accion</button>

        Acciones del actuador
        
        <button> Accion 1</button>
        <button> Accion 1</button>
        <button> Accion 1</button>

    </div>


    </>
  )
}

export default ModificarActuador