import React from 'react'
import Navbar from '../../../../Componentes/Elementos comunes/Navbar/Navbar'
import '../MenuInicial/MenuInicial.css'

import { useNavigate } from 'react-router-dom'

const MenuInicial = () => {
  const navigate = useNavigate();
  
  const irResumen = () => {
    navigate('/GraficoComparar');  
  }

  const irActuadores = () => {
    navigate('/Actuadores');  
  }

  const irNotificaciones = () => {
    navigate('/Notificaciones');  
  }
  const irEstaciones = () => {
    navigate('/Estaciones');  
  }




  return (
    <>
    <Navbar titulo={"Menu inicial"}/>

    <div className='MenuInicial'>
    
    <button onClick={irResumen}>Resumen</button>
    <button onClick={irEstaciones}>Estaciones</button>
    <button onClick={irActuadores}>Actuadores</button>
    <button onClick={irNotificaciones}>Notificaciones</button> 
    
    {/* <button onClick={irSensores} >Sensor E1</button> */}

    </div>

    </>
  )
}

export default MenuInicial