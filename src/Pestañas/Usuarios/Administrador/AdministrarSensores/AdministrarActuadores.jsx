import React, { useState, useEffect } from 'react';
import Navbar from '../../../../Componentes/Elementos comunes/Navbar/Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../AdministrarSensores/AdministrarActuadores.css';

const AdministrarActuadores = () => {
  const [actuators, setActuators] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); 
  const navigate = useNavigate();

  const irAcrearactuador = (id) => {
    navigate(`/CrearActuador/${id}`);
  };

  const irAModificarActuador = (id, Actuadorid) => {
    navigate(`/ModificarActuador/${id}/${Actuadorid}`);
  };

  useEffect(() => {
    const fetchActuators = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/ObtenerActuadoresPorCampo/1`);
        // Verificar que la respuesta sea un array
        console.log(response)
        const actuatorsData = Array.isArray(response.data) ? response.data : [];
        setActuators(actuatorsData); // Asignar los resultados de la API
      } catch (error) {
        console.error('Error al obtener los actuadores:', error);
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    };

    fetchActuators();
  }, [id]);



  return (
    <>
      <Navbar titulo={`Administrando Actuadores usuario ${id}`} />
      <div className='ActuadorAdministrados'>
        <button onClick={() => irAcrearactuador(id)}>Añadir Actuador</button>
        <h2>Administrar Actuadores</h2>
        {actuators.length === 0 ? (
          <div>No se encontraron actuadores</div>
        ) : (
          actuators.map((actuator) => (
            <button 
              onClick={() => irAModificarActuador(id, actuator.id)} 
              key={actuator.id}
            >
              {actuator.Nombre}
            </button>
          ))
        )}
      </div>
    </>
  );
};

export default AdministrarActuadores;
