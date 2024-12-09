import React from 'react'
import '../CrearNuevoUsuario/CrearNuevoUsuario.css'
import Navbar from '../../../../Componentes/Elementos comunes/Navbar/Navbar'

import { useNavigate } from 'react-router-dom';

const CrearNuevoUsuario = () => {

    const navigate = useNavigate();
    
    
    return (
        <>
            <Navbar titulo={"Crear nuevo usuario"}/>
            
            <div className='CrearUsuario'>
                Nombre
                <input type="text" />
                Contraseña
                <input type="text" />
                Correo
                <input type="text" />

                <button>Crear</button>
            </div>
            


        </>
    )
}

export default CrearNuevoUsuario