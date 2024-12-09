import React from 'react'
import Navbar from '../../../../../Componentes/Elementos comunes/Navbar/Navbar';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';



const AñadirAccion = () => {


  const { ActuadorID,Modificar} = useParams(); 

  useEffect(() => {
    if (Modificar) {
        console.log('Modificar')
    } 

  }, []); 

  return (
    
    <>    
    <Navbar titulo={"Crear/Modificar accion actuador "+ActuadorID}  ></Navbar>

    <div className='ContenedorGenerico'>
        Nombre Accion
        <input type="text" />

        Mensaje por topico
        <input type="text" />
    
        Topico *Fix
        <input type="text" />

        <button>Guardar</button>
    
    </div>
    </>
  )
}

export default AñadirAccion