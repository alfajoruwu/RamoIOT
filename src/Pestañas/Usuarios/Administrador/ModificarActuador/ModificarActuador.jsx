import React from 'react'
import '../ModificarActuador/ModificarActuador.css'
import Navbar from '../../../../Componentes/Elementos comunes/Navbar/Navbar'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios'; // Importa axios

const ModificarActuador = () => {
  const [acciones, setAcciones] = useState([]); // Estado para almacenar las acciones
  const [error, setError] = useState(null); // Estado para manejar posibles errores

  const { ActuadorID } = useParams(); 
  const navigate = useNavigate();

  // Función para obtener las acciones desde la API
  const cargarAcciones = async () => {
    try {
      const respuesta = await axios.get(`http://localhost:3000/getAccionesByActuador/${ActuadorID}`);
      setAcciones(respuesta.data); // Guardamos las acciones en el estado
      console.log(respuesta.data)
    } catch (error) {
      console.error('Error al cargar las acciones:', error);
      setError('No se pudieron cargar las acciones'); // Manejo de error
    }
  };

  // Funciones para navegación
  const irACrearAccion = (id) => {
    navigate(`/AñadirAccion/${id}`);
  };

  const irAModificarAccion = (id, Actuador) => {
    navigate(`/AñadirAccion/${id}/${Actuador}`);
  };

  // Llamamos a la función cuando el componente se monta
  useEffect(() => {
    cargarAcciones(); // Llamar a la función para cargar las acciones
  }, [ActuadorID]); // El array de dependencias incluye ActuadorID para volver a cargar si cambia

  return (
    <>
      <Navbar titulo="Modificar Actuador" />
      <div className='ModificarActuador'>
        <h2>Añadir Acción</h2>
        <button onClick={() => irACrearAccion(ActuadorID)}>Añadir Acción</button>

        <h3>Acciones del actuador</h3>
        {error && <p>{error}</p>} {/* Mostrar error si ocurre */}
        {acciones.length === 0 ? (
          <p>No se encontraron acciones para este actuador.</p>
        ) : (
          acciones.map((accion) => (
            <button 
              onClick={() => irAModificarAccion(ActuadorID, accion.id_accion)} 
              key={accion.id_accion}
            >
              {accion.Nombre}
            </button>
          ))
        )}
      </div>
    </>
  );
}

export default ModificarActuador;
