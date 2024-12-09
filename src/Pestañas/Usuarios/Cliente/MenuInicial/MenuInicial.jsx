import React from 'react'
import Navbar from '../../../../Componentes/Elementos comunes/Navbar/Navbar'
import '../MenuInicial/MenuInicial.css'

import { useNavigate } from 'react-router-dom'

const MenuInicial = () => {
  const navigate = useNavigate();
  
  const irEstaciones = () => {
    navigate('/Estaciones');  
  }

  const irSensores = () => {
    // simulando datos de sensores

    navigate('/Sensor');
  };



  const irActuadores = () => {
    navigate('/Actuadores');  
  }


  return (
    <>
    <Navbar titulo={"Menu inicial"}/>

    <div className='MenuInicial'>
    
    <button>Resumen</button>
    <button onClick={irEstaciones}>Estaciones</button>
    <button onClick={irActuadores}>Actuadores</button>
    <button>Notificaciones</button>
    <button onClick={irSensores} >Sensor E1</button>

    </div>

    </>
  )
}

export default MenuInicial