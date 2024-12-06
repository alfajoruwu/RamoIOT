import React from 'react'
import Navbar from '../../../../Componentes/Elementos comunes/Navbar/Navbar'
import '../MenuInicial/MenuInicial.css'

import { useNavigate } from 'react-router-dom'

const MenuInicial = () => {
  const navigate = useNavigate();
  
  const irResumen = () => {
    navigate('/Estaciones');  
  }

  const irActuadores = () => {
    navigate('/Actuadores');  
  }

  return (
    <>
    <Navbar titulo={"Menu inicial"}/>

    <div className='MenuInicial'>
    
    <button onClick={irResumen}>Resumen</button>
    <button >Estaciones</button>
    <button onClick={irActuadores}>Actuadores</button>
    <button>Notificaciones</button>

    </div>

    </>
  )
}

export default MenuInicial