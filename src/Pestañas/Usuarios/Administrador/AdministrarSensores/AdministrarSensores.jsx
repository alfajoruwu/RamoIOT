import React from 'react'
import Navbar from '../../../../Componentes/Elementos comunes/Navbar/Navbar'
import { useParams } from 'react-router-dom';
import '../AdministrarSensores/AdministrarSensores.css'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useState } from 'react';

const AdministrarSensores = () => {

    const [actuators, setActuators] = useState([]);
    const [loading, setLoading] = useState(true);
  

    const navigate = useNavigate();
    const { id} = useParams(); 


    const irACreaEstacion = (id) => {
        navigate(`/AñadirEstacion/${id}`);
      }
    
    
    const irAModificarEstacion = (id,Actuadorid) => {
        navigate(`/AñadirEstacion/${id}/${Actuadorid}`);
      }




    const placeholderActuators = [
        { id: 1, name: 'Estacion 1' },
        { id: 2, name: 'Estacion 2' },
        { id: 3, name: 'Estacion 3' },
        { id: 4, name: 'Estacion 4' },
    ];

    
    useEffect(() => {

        setActuators(placeholderActuators);
        
        }, []);

    

    return (

        <>
            <Navbar titulo={"Administrando Estacion usuario " + id }/>

            <div className='SensoresAdministrados'>
                
                <button  onClick={() => irACreaEstacion(id)}  >Añadir Estacion</button>
                
                Administrar Estaciones

                {actuators.map((actuator) => (
                    <button 
                        onClick={() => irAModificarEstacion(id,actuator.id)} 
                        key={actuator.id}
                    >
                        {actuator.name}
                    </button>
                ))}
                

            </div>
  

        </>
    )
}

export default AdministrarSensores