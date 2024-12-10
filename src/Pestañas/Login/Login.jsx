import React, { useState } from 'react';
import Navbar from '../../Componentes/Elementos comunes/Navbar/Navbar';
import '../Login/Login.css';
import api from '../../Utils/Axios/AxiosInstance';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toast } from '@capacitor/toast';

import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
  
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');



    const showToast = () => {
      toast.error("Error al iniciar sesión", {
        position: "bottom-center",
        autoClose: 3000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "mobile-toast" // Clase para personalizar estilos
      });
    };


    const usarNavigate = () => {
        //navigate('/MenuInicialADMIN');
        //navigate('/MenuInicial');
        api.post('/Login', {
            Correo: usuario,
            Contrasena: contrasena
        })
        .then(response => {

            console.log('Datos enviados:', response.data);
            if(response.data.Tipo == "Admin"){
              navigate(`/MenuInicialAdmin/${response.data.Id}`);
            }

            else if(response.data.Tipo == "Usuario"){
              navigate(`/MenuInicial/${response.data.Id}`);
            };

        })
        .catch(error => {
            console.error('Error al enviar datos:', error);
            showToast();
        });
    };

    return (
        <>
         <ToastContainer />
            <div>
                <Navbar titulo="Inicio de sesión" />
            </div>
            
            <div className='Login'>
                <h3>IOT Facilito</h3>
                
                <input 
                    type="text" 
                    placeholder="Usuario" 
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                />
                
                <button onClick={usarNavigate}>Iniciar sesión</button>
                <button className="forgot-password">Olvidé mi contraseña</button>
           
            </div>
        </>
    );
};

export default Login;
