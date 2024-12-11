import React, { useEffect, useState } from 'react';
import Navbar from '../../../../Componentes/Elementos comunes/Navbar/Navbar';
import { useParams } from 'react-router-dom';
import '../AdministrarSensores/AdministrarSensores.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdministrarSensores = () => {
  const [Estaciones, setEstaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();  // Asegúrate de que el id esté siendo pasado correctamente en la URL

  const irACreaEstacion = (id) => {
    navigate(`/AñadirEstacion/${id}`);
  }

  const irAModificarEstacion = (id, Actuadorid) => {
    navigate(`/AñadirEstacion/${id}/${Actuadorid}`);
  }

  useEffect(() => {
    if (!id) {
      setError('ID de usuario no disponible');
      setLoading(false);
      return;
    }

    // Llamada a la API usando axios y promesas
    axios.get(`http://localhost:3000/EstacionesPorUsuario/${id}`)
      .then(response => {
        setEstaciones(response.data);
        console.log("Estaciones obtenidas:", response.data); // Muestra la respuesta para verificar
      })
      .catch(err => {
        setError('Error al obtener las estaciones');
        console.error('Error al obtener las estaciones:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);  // Asegúrate de que el id esté en las dependencias para que se recargue cuando cambie


  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Navbar titulo={`Administrando Estaciones usuario ${id}`} />

      <div className='SensoresAdministrados'>
        <button onClick={() => irACreaEstacion(id)}>Añadir Estacion</button>

        <h2>Administrar Estaciones</h2>

        {Estaciones.length > 0 ? (
          Estaciones.map((Estacion) => (
            <button
              onClick={() => irAModificarEstacion(id, Estacion.id)}
              key={Estacion.id}
            >
              {Estacion.Nombre}
            </button>
          ))
        ) : (
          <div>No se encontraron estaciones.</div>
        )}
      </div>
    </>
  );
}

export default AdministrarSensores;
