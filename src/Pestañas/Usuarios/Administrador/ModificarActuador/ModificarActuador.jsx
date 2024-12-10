import React from 'react'
import '../ModificarActuador/ModificarActuador.css'
import Navbar from '../../../../Componentes/Elementos comunes/Navbar/Navbar'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';


const ModificarActuador = () => {
  const [datos, setDatos] = useState(null);

  const cargarDatos = async () => {
    try {
      const respuesta = await fetch('/ruta/a/tu/archivo.json'); // O una API
      const datosJson = await respuesta.json();
      setDatos(datosJson); // Asignar los datos al estado
    } catch (error) {
      console.error('Error cargando los datos:', error);
    }
  };


  const { ActuadorID} = useParams(); 

  const navigate = useNavigate();

  const irACrearAccion = (id) => {
    navigate(`/AñadirAccion/${id}`);
  };

  const irAModificarAccion = (id,Actuador) => {
    navigate(`/AñadirAccion/${id}/${Actuador}`);
  };

  useEffect(() => {
    cargarDatos(); // Llamar a la función cuando se carga la página
  }, []); // El array vacío asegura que se ejecute solo una vez al montar


  const acciones = [
    { id: 1, Nombre: 'Accion 1' },
    { id: 2, Nombre: 'Accion 2' },
    { id: 3, Nombre: 'Accion 3' },
  ];


  return (
    <>
    <Navbar titulo="Modificar Actuador" />
    <div className='ModificarActuador'>
        Añadir Accion
        <button onClick={() => irACrearAccion(ActuadorID)} > Añadir Accion</button>

        Acciones del actuador
        {acciones.map((accion) => (
          <button onClick={() => irAModificarAccion(ActuadorID,accion.id)} key={accion.id}>{accion.Nombre}</button>
        ))}

    </div>


    </>
  )
}

export default ModificarActuador