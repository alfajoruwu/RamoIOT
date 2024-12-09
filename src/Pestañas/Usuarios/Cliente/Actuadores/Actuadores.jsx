import React, { useState, useEffect } from 'react';
import Navbar from '../../../../Componentes/Elementos comunes/Navbar/Navbar';
import MostrarActuador from "./MostrarActuador/MostrarActuador";
import './Actuadores.css';
import actuadoresData from './actuadores.json'; // Importación directa del JSON

const Actuadores = () => {
  const [actuadores, setActuadores] = useState([]);
  const [actuadorSeleccionado, setActuadorSeleccionado] = useState(null);

  useEffect(() => {
    setActuadores(actuadoresData); // Carga los datos del JSON
  }, []);

  if (actuadorSeleccionado) {
    return <MostrarActuador actuador={actuadorSeleccionado} />;
  }

  return (
    <>
      <Navbar titulo="Actuadores" />
      <div className="ActuadoresContainer">
        {actuadores.map((actuador) => (
          <div key={actuador.id} className="ActuadorCard">
            <span>{actuador.nombre}</span>
            <button onClick={() => setActuadorSeleccionado(actuador)}>
              Configurar
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Actuadores;
