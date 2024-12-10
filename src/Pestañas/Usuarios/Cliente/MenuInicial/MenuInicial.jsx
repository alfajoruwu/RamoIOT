import React from 'react'
import Navbar from '../../../../Componentes/Elementos comunes/Navbar/Navbar'
import '../MenuInicial/MenuInicial.css'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const MenuInicial = () => {
  const navigate = useNavigate();

  const {id} = useParams(); 
  
  const irResumen = () => {
    navigate('/GraficoComparar');  
  }

  const irActuadores = () => {
    navigate('/Actuadores');  
  }

  const irNotificaciones = () => {
    navigate('/Notificaciones');  
  }
  const irEstaciones = (id) => {
    navigate(`/Estaciones/${id}`);  
  }




  return (
    <>
    <Navbar titulo={"Menu inicial"}/>

    <div className='MenuInicial'>
    
    <button onClick={irResumen}>Resumen</button>
    <button  onClick={() => irEstaciones(id)}>Estaciones</button>
    <button onClick={irActuadores}>Actuadores</button>
    <button onClick={irNotificaciones}>Notificaciones</button> 
    
    {/* <button onClick={irSensores} >Sensor E1</button> */}

    </div>

    </>
  )
}

export default MenuInicial