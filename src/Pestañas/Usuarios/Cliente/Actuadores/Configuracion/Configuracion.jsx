import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import Navbar from '../../../../../Componentes/Elementos comunes/Navbar/Navbar';
import condicionesData from './condiciones.json'; // Importar JSON con condiciones

const Configuracion = () => {
  const location = useLocation();
  const actuador = location.state?.actuador; 
  const navigate = useNavigate(); 

  // Manejar navegación al presionar "Añadir"
  const handleAddCondition = () => {
    navigate('/Agregar', { state: { actuador } }); // Pasar actuador como estado
  };

  return (
    <>
      <Navbar titulo={`${actuador?.nombre || 'Actuador'} - Configuración`} />
      <div className="configuracion-container">
        <h2 className="configuracion-titulo">Condiciones Actuales</h2>
        <ul className="configuracion-lista">
          {condicionesData.map((condicion) => (
            <li key={condicion.id} className="configuracion-item">
              <p><strong>Sensor:</strong> {condicion.sensor}</p>
              <p><strong>Condición:</strong> {condicion.condicion}</p>
              <p><strong>Acción:</strong> {condicion.accion}</p>
            </li>
          ))}
        </ul>
        <button className="configuracion-boton" onClick={handleAddCondition}>
          Añadir
        </button>
      </div>
    </>
  );
};

export default Configuracion;
