import React, { useState, useEffect } from 'react';
import Navbar from '../../../../Componentes/Elementos comunes/Navbar/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Estaciones = () => {
  const navigate = useNavigate();
  const { id } = useParams();  // Obtener el ID del usuario de la URL

  const [estaciones, setEstaciones] = useState([]); // Para almacenar las estaciones
  const [error, setError] = useState(null);  // Para manejar errores
  const [loading, setLoading] = useState(true);  // Para manejar el estado de carga

  useEffect(() => {
    if (!id) {
      setError('ID de usuario no disponible');
      setLoading(false);
      return;
    }

    // Llamada a la API usando axios y promesas
    axios.get(`http://localhost:3000/EstacionesPorUsuario/${id}`)
      .then(response => {
        setEstaciones(response.data);  // Suponemos que el JSON tiene el formato correcto
        console.log("Estaciones obtenidas:", response.data); // Muestra la respuesta para verificar
      })
      .catch(err => {
        setError('Error al obtener las estaciones');
        console.error('Error al obtener las estaciones:', err);
      })
      .finally(() => {
        setLoading(false);  // Independientemente del resultado, se desactiva el loading
      });
  }, [id]);  // Dependencia del id para recargar si cambia

  const irEstacion = (estacionId) => {
    navigate(`/Estacion/${estacionId}`);  // Redirige a la estación con el ID
  }

  const irMapaEstacion = () => {
    navigate(`/MapaEstacion/${id}`);  // Redirige al mapa
  }

  return (
    <>
      <Navbar titulo={"Estaciones"} />

      <div className='MenuInicial'>
        <button onClick={irMapaEstacion}>Mostrar Mapa estaciones</button>
        
        {/* Aquí mapeamos las estaciones desde el JSON */}
        {estaciones.map(estacion => (
          <button key={estacion.id} onClick={() => irEstacion(estacion.id)}>
            {estacion.Nombre}
          </button>
        ))}
      </div>
    </>
  );
}

export default Estaciones;
