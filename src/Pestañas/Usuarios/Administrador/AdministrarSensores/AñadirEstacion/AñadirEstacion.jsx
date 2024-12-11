import React from 'react'
import Navbar from '../../../../../Componentes/Elementos comunes/Navbar/Navbar';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


const AñadirEstacion = () => {
  const [sensors, setSensors] = useState([
    { id: 1, nombre: 'Sensor 1' },
    { id: 2, nombre: 'Sensor 2' },
    { id: 3, nombre: 'Sensor 3' },
  ]);

  const { UsuarioID,Modificar} = useParams(); 


  const navigate = useNavigate();


  const irAModificarSensor = (idEstacion) => {
    navigate(`/CrearModificarSensor/${idEstacion}`);
  }


  const irAModificarSensorExistente = (idEstacion,IDSensor) => {
    navigate(`/CrearModificarSensor/${idEstacion}/${IDSensor}`);
  }


  useEffect(() => {
    if (Modificar) {
        console.log('Modificar')
    } 

  }, []); 


  return (
   <>    
    <Navbar titulo={"Crear/Modificar Estacion"+UsuarioID}  ></Navbar>

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
          <button onClick={() => irAModificarSensor(Modificar)} >Crear Sensor</button>

            
          Sensores Disponibles
               {sensors.map((sensor) => (
                  <button onClick={() => irAModificarSensorExistente(Modificar,sensor.id)}   key={sensor.id}>{sensor.nombre}</button>
                ))}


        </div>
         )}



    </div>
    </>
  )




}

export default AñadirEstacion