import React from 'react'
import '../AñadirCrear/ActuadorNuevo.css'
import Navbar from '../../../../Componentes/Elementos comunes/Navbar/Navbar'


const ActuadorNuevo = () => {


  return (
    
    <>
    <Navbar titulo={"Crear nuevo Actuador"}/>
            
    <div className='ContenidoActuador'>
        Nombre
        <input type="text" />

        Server MQTT
        <input type="text" />

        Topico
        <input type="text" />

        <button>Guardar</button>

    </div>
  

    </>    

  )
}

export default ActuadorNuevo