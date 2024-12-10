import React from 'react'
import Navbar from '../../../../Componentes/Elementos comunes/Navbar/Navbar'

import { useNavigate } from 'react-router-dom'

import { useParams } from 'react-router-dom'


const Estaciones = () => {

  const navigate = useNavigate();
  const {id} = useParams(); 


  const irEstacion1 = () => {
    navigate('/Estacion1');  
  }

  const irMapaEstacion = (id) => {
    navigate(`/MapaEstacion/${id}`);  
  }

  return (
    
    <>
    <Navbar titulo={"Estaciones"}/>

    <div className='MenuInicial'>

      <button  onClick={() => irMapaEstacion(id)}> Mostrar Mapa estaciones</button>
      <button onClick={irEstacion1}>Estación 1</button>

    </div>

    </>
  )
}

export default Estaciones