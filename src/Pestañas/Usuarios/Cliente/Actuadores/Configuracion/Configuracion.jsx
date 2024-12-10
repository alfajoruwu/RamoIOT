import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../../../../../Componentes/Elementos comunes/Navbar/Navbar';
import condicionesData from './condiciones.json'; // Importar JSON con condiciones

const Configuracion = () => {
  const location = useLocation();
  const actuador = location.state?.actuador;
  const navigate = useNavigate();
  const [condiciones, setCondiciones] = useState([]);

  // Cargar condiciones desde el JSON
  useEffect(() => {
    setCondiciones(condicionesData);
  }, []);

  // Manejar navegación al presionar "Añadir"
  const handleAddCondition = () => {
    navigate('/Agregar', { state: { actuador } }); // Pasar actuador como estado
  };

  return (
    <>
      <Navbar titulo={`${actuador?.nombre || 'Actuador'} - Configuración`} />
      <div className="configuracion-container">
        <h2 className="configuracion-titulo">Condiciones Actuales</h2>
        {condiciones.length > 0 ? (
          <ul className="configuracion-lista">
            {condiciones.map((condicion) => (
              <li key={condicion.id} className="configuracion-item">
                <p><strong>Sensor:</strong> {condicion.sensor}</p>
                <p><strong>Condición:</strong> {condicion.condicion}</p>
                <p><strong>Acción:</strong> {condicion.accion}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay condiciones configuradas actualmente.</p>
        )}
        <button className="configuracion-boton" onClick={handleAddCondition}>
          Añadir
        </button>
      </div>
    </>
  );
};

export default Configuracion;
