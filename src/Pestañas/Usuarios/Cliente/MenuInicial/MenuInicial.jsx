import React from 'react'
import Navbar from '../../../../Componentes/Elementos comunes/Navbar/Navbar'
import '../MenuInicial/MenuInicial.css'

import { useNavigate } from 'react-router-dom'

const MenuInicial = () => {
  const navigate = useNavigate();
  
  const irEstaciones = () => {
    navigate('/Estaciones');  
  }

  return (
    <>
    <Navbar titulo={"Menu inicial"}/>

    <div className='MenuInicial'>
    
    <button>Resumen</button>
    <button onClick={irEstaciones}>Estaciones</button>
    <button>Actuadores</button>
    <button>Notificaciones</button>

    </div>

    </>
  )
}

export default MenuInicial