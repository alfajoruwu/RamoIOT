import React from 'react'
import Navbar from '../../../../../Componentes/Elementos comunes/Navbar/Navbar'
import '../Estacion1/Estacion1.css'

import { useNavigate } from 'react-router-dom'

const Estacion1 = () => {
  const navigate = useNavigate();
  
  const irSensores = () => {
    navigate('/Sensores');  
  }
  const irGrafico = () => {
    navigate('/GraficoComparar');  
  }

  const irMapaEstacion = () => {
    navigate('/MapaEstacion');  
  }

  return (
    <>
    <Navbar titulo={"Estación 1"}/>

    <div className='MenuInicial'>
    
      <button onClick={irSensores}>Sensores</button>

    
    </div>

    </>
  )
}

export default Estacion1