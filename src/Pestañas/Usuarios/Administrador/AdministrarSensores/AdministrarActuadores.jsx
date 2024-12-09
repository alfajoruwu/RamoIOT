import React from 'react'
import Navbar from '../../../../Componentes/Elementos comunes/Navbar/Navbar'
import { useParams } from 'react-router-dom';
import '../AdministrarSensores/AdministrarActuadores.css'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useState } from 'react';
const AdministrarActuadores = () => {


  const [actuators, setActuators] = useState([]);
  const [loading, setLoading] = useState(true);

    
  const { id} = useParams(); 

  const navigate = useNavigate();

  const irAcrearactuador = (id) => {
    navigate(`/CrearActuador/${id}`);
  }


  const irAModificarActuador = (id,Actuadorid) => {
    navigate(`/ModificarActuador/${id}/${Actuadorid}`);
  }



  const placeholderActuators = [
    { id: 1, name: 'Actuador 1' },
    { id: 2, name: 'Actuador 2' },
    { id: 3, name: 'Actuador 3' },
    { id: 4, name: 'Actuador 4' },
  ];

  


  useEffect(() => {

      setActuators(placeholderActuators);
    
    }, []);




  return (



    <>
    <Navbar titulo={"Administrando Actuadores usuario " + id }/>

    <div className='ActuadorAdministrados'>
                
                <button  onClick={() => irAcrearactuador(id)}  >Añadir Actuador</button>
                
                Administrar Actuador

                {actuators.map((actuator) => (
                    <button 
                        onClick={() => irAModificarActuador(id,actuator.id)} 
                        key={actuator.id}
                    >
                        {actuator.name}
                    </button>
                ))}
                        

            </div>
</>

    
  )
}

export default AdministrarActuadores