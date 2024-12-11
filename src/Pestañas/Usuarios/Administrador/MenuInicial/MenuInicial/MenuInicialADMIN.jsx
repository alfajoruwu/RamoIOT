import React, { useState, useEffect } from 'react';
import Navbar from '../../../../../Componentes/Elementos comunes/Navbar/Navbar';
import '../MenuInicial/MenuInicialADMIN.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MenuInicialADMIN = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const irAcrearusuario = () => {
    navigate('/CrearUsuario');
  };

  const irAadministrarUsuario = (id) => {
    navigate(`/AdministrarUsuario/${id}`);
  };

  useEffect(() => {
    // Llamada a la API para obtener los usuarios
    axios.get('http://localhost:3000/ObtenerUsuariosNormales')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los usuarios:', error);
      });
  }, []);

  // Filtrar usuarios por el término de búsqueda
  const filteredUsers = users.filter(user => 
    user.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar titulo={"Menu inicial"} />

      <div className='FiltrosAdmin'>
        <label>Buscador</label>
        <div>
          <input 
            type="text" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            placeholder="Buscar usuarios"
          />
        </div>

        <button onClick={irAcrearusuario}>Crear nuevo usuario</button>
      </div>

      <div className='MenuInicialADMIN'>
        <h2>Usuarios registrados</h2>

        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <button 
              onClick={() => irAadministrarUsuario(user.id)} 
              key={user.id}
            >
              {user.Nombre}
            </button>
          ))
        ) : (
          <p>No se encontraron usuarios.</p>
        )}
      </div>
    </>
  );
};

export default MenuInicialADMIN;