import React from 'react'
import { useParams } from 'react-router-dom'
import '../AdministrarUsuario/AdministrarUsuario.css'
import Navbar from '../../../../Componentes/Elementos comunes/Navbar/Navbar'


import { useNavigate } from 'react-router-dom';


const AdminsitrarUsuario = () => {


  const navigate = useNavigate();
  const { id } = useParams();


  const irAadministrarSensor = (id) => {
    navigate(`/AdministrarSensores/${id}`);
  };

  const irAadministrarActuador = (id) => {
    navigate(`/AdministrarActuadores/${id}`);
  };


  return (
    <>
        <Navbar titulo={"Administrando a usuario " + id}/>


        <div className='AdministrarUsuarios'>
            <button onClick={() => irAadministrarSensor(id)} >Estaciones</button>
            <button onClick={() => irAadministrarActuador(id)} >Actuadores</button>
        </div>
  
    </>

    )
}

export default AdminsitrarUsuario