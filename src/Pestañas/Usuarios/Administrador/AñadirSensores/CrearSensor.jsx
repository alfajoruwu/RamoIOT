import React from 'react'
import Navbar from '../../../../Componentes/Elementos comunes/Navbar/Navbar'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


const CrearSensor = () => {
  
  const { IDSensor} = useParams(); 

  useEffect(() => {
    if (IDSensor) {
        console.log('Modificar')
    } 

  }, []); 




  return (
    <>
    <Navbar titulo= 'Añadir Sensor' />


    <div className='ContenedorGenerico'>
        Nombre sensor
        <input type="text" />

        Nombre Bucket
        <input type="text" />

        Nombre variable
        <input type="text" />

        Escala
        <input type="text" />

        Tipo
        <input type="text" />

        Mqtt Server
        <input type="text" />

        Mqtt Topico
        <input type="text" />


        <button>Guardar</button>    
    
    
    
    </div>
    </>

)
}

export default CrearSensor