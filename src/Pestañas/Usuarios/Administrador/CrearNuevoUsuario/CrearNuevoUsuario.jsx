import React, { useState } from 'react';
import '../CrearNuevoUsuario/CrearNuevoUsuario.css';
import Navbar from '../../../../Componentes/Elementos comunes/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CrearNuevoUsuario = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleCrearUsuario = () => {
    // Validar datos
    if (!nombre || !contraseña || !correo) {
      setMensaje("Por favor, completa todos los campos.");
      return;
    }

    // Enviar solicitud POST
    axios.post('http://localhost:3000/crearNuevoUsuario', {
      Nombre: nombre,
      Contraseña: contraseña,
      Correo: correo,
    })
      .then(response => {
        setMensaje("Usuario creado exitosamente.");
        
      })
      .catch(error => {
        console.error('Error al crear usuario:', error);
        setMensaje("Hubo un error al crear el usuario. Intenta nuevamente.");
      });
  };

  return (
    <>
      <Navbar titulo={"Crear nuevo usuario"} />

      <div className='CrearUsuario'>
        <label>Nombre</label>
        <input 
          type="text" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
          placeholder="Ingresa el nombre"
        />

        <label>Contraseña</label>
        <input 
          type="password" 
          value={contraseña} 
          onChange={(e) => setContraseña(e.target.value)} 
          placeholder="Ingresa la contraseña"
        />

        <label>Correo</label>
        <input 
          type="email" 
          value={correo} 
          onChange={(e) => setCorreo(e.target.value)} 
          placeholder="Ingresa el correo"
        />

        <button onClick={handleCrearUsuario}>Crear</button>

        {mensaje && <p>{mensaje}</p>}
      </div>
    </>
  );
};

export default CrearNuevoUsuario;