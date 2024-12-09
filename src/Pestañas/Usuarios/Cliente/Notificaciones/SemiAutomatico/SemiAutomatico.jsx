import React from 'react'
import Navbar from '../../../../../Componentes/Elementos comunes/Navbar/Navbar'
import '../SemiAutomatico/SemiAutomatico.css'

import { useNavigate } from 'react-router-dom'

const SemiAutomatico = () => {
  const navigate = useNavigate();
  
  const irResumen = () => {
    navigate('/Estaciones');  
  }

  return (
    <>
    <Navbar titulo={"Notificaciones"}/>

    <div className="TituloAbajoNavbar">
        <h1>Se alcanzó el umbral para cerrar el techo</h1>
      </div>

    <div className='MenuInicial2'>

        <button onClick={irResumen}>Cerrar</button>
        <button>Abrir</button>

    </div>


    </>
  )
}

export default SemiAutomatico