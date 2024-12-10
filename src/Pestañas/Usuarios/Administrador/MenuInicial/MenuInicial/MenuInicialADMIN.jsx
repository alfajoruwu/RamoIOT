import React from 'react'
import { useState,useEffect } from 'react'
import Navbar from '../../../../../Componentes/Elementos comunes/Navbar/Navbar'
import '../MenuInicial/MenuInicialADMIN.css'


import { useNavigate } from 'react-router-dom';


const MenuInicialADMIN = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);

    const placeholderData = [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
        { id: 3, name: 'Sam Wilson', email: 'sam.wilson@example.com' },
      ];
    

    const irAcrearusuario = () => {
        navigate('/CrearUsuario');
    }

    const irAadministrarUsuario = (id) => {
        navigate(`/AdministrarUsuario/${id}`);
      };
    
    
    useEffect(() => {
        setUsers(placeholderData);
    }, []);

    return (
      <>
        <Navbar titulo={"Menu inicial"}/>

        <div className='FiltrosAdmin'>
            Buscador
            <div>
                <input type="text"/>
            </div>

            <button onClick={irAcrearusuario}>Crear nuevo usuario</button>

        </div>

        <div className='MenuInicialADMIN'>
            Usuarios registrados

            {users.map((user) => (
                <button onClick={() => irAadministrarUsuario(user.id)} key={user.id}>{user.name}</button>
            ))}
            
    
        </div>
    </>
  )
}

export default MenuInicialADMIN