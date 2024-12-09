import React from 'react'
import Navbar from '../../../../Componentes/Elementos comunes/Navbar/Navbar'

import { useNavigate } from 'react-router-dom'

const Estaciones = () => {

  const navigate = useNavigate();
  
  const irEstacion1 = () => {
    navigate('/Estacion1');  
  }

  return (
    
    <>
    <Navbar titulo={"Estaciones"}/>

    <div className='MenuInicial'>

      <button onClick={irEstacion1}>Estación 1</button>

    </div>

    </>
  )
}

export default Estaciones