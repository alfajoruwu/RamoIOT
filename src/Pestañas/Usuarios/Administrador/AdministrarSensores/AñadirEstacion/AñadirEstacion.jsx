import React from 'react'
import Navbar from '../../../../../Componentes/Elementos comunes/Navbar/Navbar';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


const AñadirEstacion = () => {

  const { UsuarioID,Modificar} = useParams(); 



  useEffect(() => {
    if (Modificar) {
        console.log('Modificar')
    } 

  }, []); 


  return (
   <>    
    <Navbar titulo={"Crear/Modificar Estacion actuador "+UsuarioID}  ></Navbar>

    <div className='ContenedorGenerico'>
        Nombre Estacion
        <input type="text" />

        Api token
        <input type="text" />
    
        Organizacion influx
        <input type="text" />

        IP Influx
        <input type="text" />

        Ubicacion/Edificio
        <input type="text" />

        <button>Guardar</button>

        {Modificar && (
        <div className='ContenedorGenerico'>
          Sensores
          <button>Crear Sensor</button>

          Sensores Disponibles
          <button>Sensor 1</button>
          <button>Sensor 2</button>
          <button>Sensor 3</button>
        </div>
         )}



    </div>
    </>
  )




}

export default AñadirEstacion