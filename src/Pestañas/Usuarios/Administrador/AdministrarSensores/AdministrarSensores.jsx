import React from 'react'
import Navbar from '../../../../Componentes/Elementos comunes/Navbar/Navbar'
import { useParams } from 'react-router-dom';
import '../AdministrarSensores/AdministrarSensores.css'


const AdministrarSensores = () => {


    const { id} = useParams(); 


    return (

        <>
            <Navbar titulo={"Administrando Estacion usuario " + id }/>

            <div className='SensoresAdministrados'>
                
                <button>Añadir Estacion</button>
                
                Administrar Estaciones



                <button> Estacion 1</button>
                <button> Estacion</button>
                <button> Estacion</button>
                <button> Estacion</button>
                

            </div>
  

        </>
    )
}

export default AdministrarSensores