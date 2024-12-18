import React, { useState } from 'react';
import axios from 'axios';
import '../AñadirCrear/ActuadorNuevo.css';
import Navbar from '../../../../Componentes/Elementos comunes/Navbar/Navbar';

const ActuadorNuevo = () => {
  // Estado para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [ipMqtt, setIpMqtt] = useState('');
  const [topico, setTopico] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Enviar los datos al servidor
    try {
      const response = await axios.post('http://localhost:3000/crear-actuador', {
        nombre,
        ipMqtt,
        topico
      });

      alert('Actuador creado exitosamente');
      // Limpiar los campos después de guardar
      setNombre('');
      setIpMqtt('');
      setTopico('');
    } catch (error) {
      console.error('Error al crear el actuador:', error);
      alert('Hubo un error al crear el actuador');
    }
  };

  return (
    <>
      <Navbar titulo={"Crear nuevo Actuador"} />

      <div className='aaa'>
        <form className='ContenedorGenerico' onSubmit={handleSubmit}>
          <label>
            Nombre
            <input 
              type="text" 
              value={nombre}
              onChange={(e) => setNombre(e.target.value)} 
            />
          </label>

          <label>
            Server MQTT
            <input 
              type="text" 
              value={ipMqtt}
              onChange={(e) => setIpMqtt(e.target.value)} 
            />
          </label>

          <label>
            Tópico
            <input 
              type="text" 
              value={topico}
              onChange={(e) => setTopico(e.target.value)} 
            />
          </label>

          <button type="submit">Guardar</button>
        </form>
      </div>
    </>
  );
}

export default ActuadorNuevo;
