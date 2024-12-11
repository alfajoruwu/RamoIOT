import React, { useState, useEffect } from 'react';
import Navbar from '../../../../../Componentes/Elementos comunes/Navbar/Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AñadirEstacion = () => {
  const [sensors, setSensors] = useState([]);
  const [formData, setFormData] = useState({
    NombreEstacion: '',
    API_Token: '',
    InfluxOrganizacion: '',
    IPinflux: '',
    Ubicacion: '',
  });

  const { UsuarioID, Modificar } = useParams();
  const navigate = useNavigate();

  // Función para manejar el cambio en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Función para guardar o crear la estación
  const handleSave = async () => {
    try {
      if (Modificar) {
        // Si estamos en modo modificación, hacer una solicitud PUT
        const response = await axios.put(`http://localhost:3000/EstacionporIDEstacion/${Modificar}`, formData);
        console.log('Estación modificada:', response.data);
        alert('Estación modificada correctamente');
      } else {
        // Si estamos creando una nueva estación, hacer una solicitud POST
        const response = await axios.post('http://localhost:3000/CrearEstacion', formData);
        console.log('Estación creada:', response.data);
        alert('Estación creada correctamente');
      }
    } catch (error) {
      console.error('Error al guardar la estación:', error.response?.data || error.message);
      alert('Error al guardar la estación');
    }
  };

  // Función para navegar a la página de modificación de sensores
  const irAModificarSensor = (idEstacion) => {
    navigate(`/CrearModificarSensor/${idEstacion}`);
  };

  // Función para modificar un sensor existente
  const irAModificarSensorExistente = (idEstacion, IDSensor) => {
    navigate(`/CrearModificarSensor/${idEstacion}/${IDSensor}`);
  };

  // useEffect para cargar los datos de la estación y los sensores si estamos en modo modificación
  useEffect(() => {
    if (Modificar) {
      // Hacer una solicitud GET a la API para obtener los datos de la estación a modificar
      axios.get(`http://localhost:3000/EstacionporIDEstacion/${Modificar}`)
        .then(response => {
          setFormData({
            NombreEstacion: response.data.NombreEstacion,
            API_Token: response.data.API_Token,
            InfluxOrganizacion: response.data.InfluxOrganizacion,
            IPinflux: response.data.IPinflux,
            Ubicacion: response.data.Ubicacion,
          });

          // También hacer una solicitud GET para obtener los sensores de esta estación
          axios.get(`http://localhost:3000/SensoresPorEstacion/${Modificar}`)
            .then(sensorResponse => {
              setSensors(sensorResponse.data); // Almacenar los sensores en el estado
            })
            .catch(error => {
              console.error('Error al obtener los sensores:', error.response?.data || error.message);
            });
        })
        .catch(error => {
          console.error('Error al obtener la estación:', error.response?.data || error.message);
        });
    }
  }, [Modificar]);  // Solo se ejecuta cuando `Modificar` cambia

  return (
    <>
      <Navbar titulo={`Crear/Modificar Estación ${UsuarioID}`} />

      <div className='ContenedorGenerico'>
        <label>Nombre Estación</label>
        <input
          type="text"
          name="NombreEstacion"
          value={formData.NombreEstacion}
          onChange={handleInputChange}
        />

        <label>API Token</label>
        <input
          type="text"
          name="API_Token"
          value={formData.API_Token}
          onChange={handleInputChange}
        />

        <label>Organización Influx</label>
        <input
          type="text"
          name="InfluxOrganizacion"
          value={formData.InfluxOrganizacion}
          onChange={handleInputChange}
        />

        <label>IP Influx</label>
        <input
          type="text"
          name="IPinflux"
          value={formData.IPinflux}
          onChange={handleInputChange}
        />

        <label>Ubicación/Edificio</label>
        <input
          type="text"
          name="Ubicacion"
          value={formData.Ubicacion}
          onChange={handleInputChange}
        />

        <button onClick={handleSave}>Guardar</button>

        {Modificar && (
          <div className='ContenedorGenerico'>
            <h3>Sensores</h3>
            <button onClick={() => irAModificarSensor(Modificar)}>Crear Sensor</button>

            <h3>Sensores Disponibles</h3>
            {sensors.length > 0 ? (
              sensors.map((sensor) => (
                <button
                  onClick={() => irAModificarSensorExistente(Modificar, sensor.id)}
                  key={sensor.id}
                >
                  {sensor.Nombre}
                </button>
              ))
            ) : (
              <p>No hay sensores disponibles.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default AñadirEstacion;
