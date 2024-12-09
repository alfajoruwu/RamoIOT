import React from 'react'
import Navbar from '../../../../Componentes/Elementos comunes/Navbar/Navbar'
import '../Notificaciones/Notificaciones.css'

import { useNavigate } from 'react-router-dom'

const Notificaciones = () => {
  const navigate = useNavigate();
  
  const irSemiAutomatico = () => {
    navigate('/SemiAutomatico');  
  }

  return (
    <>
    <Navbar titulo={"Notificaciones"}/>

    <div className='MenuInicial'>
    
    <button onClick={irSemiAutomatico}>Cambio semi automático - Solicitud</button>
    <button >Cambio automático - Aviso</button>
    <button >No sé</button>

    </div>

    </>
  )
}

export default Notificaciones