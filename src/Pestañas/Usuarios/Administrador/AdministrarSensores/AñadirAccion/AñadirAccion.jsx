import React, { useState, useEffect } from 'react';
import Navbar from '../../../../../Componentes/Elementos comunes/Navbar/Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AñadirAccion = () => {
  const { ActuadorID, Modificar } = useParams();
  
  const [nombreAccion, setNombreAccion] = useState('');
  const [mensajeTopico, setMensajeTopico] = useState('');
  const [error, setError] = useState('');

  // useEffect para cargar los datos si estamos en modo "Modificar"
  useEffect(() => {
    if (Modificar) {
      console.log('Modificar');
      // Obtener los datos de la acción para precargar los campos
      const fetchAccionData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/accion/${Modificar}`);
          setNombreAccion(response.data.Nombre);
          setMensajeTopico(response.data.Mensaje);
        } catch (error) {
          console.error('Error al obtener la acción:', error);
        }
      };
      fetchAccionData();
    }
  }, [Modificar]);

  const handleSubmit = async () => {
    if (!nombreAccion || !mensajeTopico) {
      setError('Por favor ingresa todos los campos');
      return;
    }

    const requestData = {
      nombreaccion: nombreAccion,
      mensajetopico: mensajeTopico,
      id_actuador: ActuadorID
    };

    try {
      let response;
      if (Modificar) {
        // Modificar la acción existente
        response = await axios.put(`http://localhost:3000/accion/${Modificar}`, requestData);
      } else {
        // Crear una nueva acción
        response = await axios.post('http://localhost:3000/addAccionToActuador', requestData);
      }

      if (response.status === 200) {
        alert(Modificar ? 'Acción modificada exitosamente' : 'Acción añadida exitosamente');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || 'Ocurrió un error');
      } else {
        setError('Error al realizar la solicitud');
      }
    }
  };

  return (
    <>
      <Navbar titulo={"Crear/Modificar acción actuador " + ActuadorID} />

      <div className='ContenedorGenerico'>
        <div>
          <label>Nombre Acción</label>
          <input 
            type="text" 
            value={nombreAccion} 
            onChange={(e) => setNombreAccion(e.target.value)} 
          />
        </div>

        <div>
          <label>Mensaje por Tópico</label>
          <input 
            type="text" 
            value={mensajeTopico} 
            onChange={(e) => setMensajeTopico(e.target.value)} 
          />
        </div>

        {error && <div style={{ color: 'red' }}>{error}</div>}

        <button onClick={handleSubmit}>Guardar</button>
      </div>
    </>
  );
};

export default AñadirAccion;
