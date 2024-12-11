import React, { useState, useEffect } from 'react';
import Navbar from '../../../../Componentes/Elementos comunes/Navbar/Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CrearSensor = () => {
  const { IDSensor,EstacionID } = useParams(); // Obtiene el ID del sensor desde la URL
  const [formData, setFormData] = useState({
    NombreSensor: '',
    NombreBucket: '',
    NombreVariable: '',
    Escala: '',
    Tipo: '',
    MqttServer: '',
    MqttTopico: '',
    id_estacion: EstacionID 
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (IDSensor) {
      // Si el IDSensor está presente, cargamos los datos del sensor para modificar
      axios.get(`http://localhost:3000/sensorPorID/${IDSensor}`)
        .then(response => {
          setFormData({
            ...formData,
            NombreSensor: response.data.NombreSensor,
            NombreBucket: response.data.NombreBucket,
            NombreVariable: response.data.NombreVariable,
            Escala: response.data.Escala,
            Tipo: response.data.Tipo,
            MqttServer: response.data.MqttServer,
            MqttTopico: response.data.MqttTopico,
            id_estacion: response.data.id_estacion
          });
        })
        .catch(error => {
          console.error('Error al obtener el sensor:', error);
          alert('Error al obtener los datos del sensor');
        });
    }
  }, [IDSensor]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = () => {
    try {
      if (IDSensor) {
        // Si existe IDSensor, actualizamos el sensor
        axios.put(`http://localhost:3000/sensorPorID/${IDSensor}`, formData)
          .then(() => {
            alert('Sensor actualizado correctamente');
            
          })
          .catch(error => {
            console.error('Error al actualizar el sensor:', error);
            alert('Error al actualizar el sensor');
          });
      } else {
        // Si no existe IDSensor, creamos un nuevo sensor
        axios.post('http://localhost:3000/AnadirSensor', formData)
          .then(() => {
            alert('Sensor creado correctamente');
            
          })
          .catch(error => {
            console.error('Error al guardar el sensor:', error);
            alert('Error al guardar el sensor');
          });
      }
    } catch (error) {
      console.error('Error general:', error);
      alert('Hubo un error inesperado');
    }
  };

  return (
    <>
      <Navbar titulo='Añadir Sensor' />

      <div className='ContenedorGenerico'>
        <label>Nombre sensor</label>
        <input
          type="text"
          name="NombreSensor"
          value={formData.NombreSensor}
          onChange={handleInputChange}
        />

        <label>Nombre Bucket</label>
        <input
          type="text"
          name="NombreBucket"
          value={formData.NombreBucket}
          onChange={handleInputChange}
        />

        <label>Nombre variable</label>
        <input
          type="text"
          name="NombreVariable"
          value={formData.NombreVariable}
          onChange={handleInputChange}
        />

        <label>Escala</label>
        <input
          type="text"
          name="Escala"
          value={formData.Escala}
          onChange={handleInputChange}
        />

        <label>Tipo</label>
        <input
          type="text"
          name="Tipo"
          value={formData.Tipo}
          onChange={handleInputChange}
        />

        <label>Mqtt Server</label>
        <input
          type="text"
          name="MqttServer"
          value={formData.MqttServer}
          onChange={handleInputChange}
        />

        <label>Mqtt Topico</label>
        <input
          type="text"
          name="MqttTopico"
          value={formData.MqttTopico}
          onChange={handleInputChange}
        />

        <button onClick={handleSave}>Guardar</button>
      </div>
    </>
  );
};

export default CrearSensor;
