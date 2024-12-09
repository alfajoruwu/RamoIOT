import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar el hook useNavigate
import Navbar from '../../../../../Componentes/Elementos comunes/Navbar/Navbar';
import './MostrarActuador.css';
import accionesData from './acciones.json'; // Importación directa del JSON

const MostrarActuador = ({ actuador }) => {
  const [acciones, setAcciones] = useState([]);
  const [accionSeleccionada, setAccionSeleccionada] = useState('');
  const [modoSeleccionado, setModoSeleccionado] = useState('');
  const opcionesModo = ["Manual", "Semiautomatico", "Automatico"]; // Opciones de modo fijas
  const navigate = useNavigate(); // Hook para navegar

  useEffect(() => {
    const actuadorData = accionesData.find(
      (item) => item.id === actuador.id || item.nombre === actuador.nombre
    );

    if (actuadorData) {
      setAcciones(["Abrir techo", "Cerrar techo", "Reiniciar"]); // Opciones de acciones
      setAccionSeleccionada(actuadorData.accionSeleccionada); // Valor inicial de acción seleccionada
      setModoSeleccionado(actuadorData.modoSeleccionado); // Valor inicial de modo seleccionado
    } else {
      console.warn(`No se encontraron datos para el actuador:`, actuador);
    }
  }, [actuador]);

  if (!acciones.length) {
    return <p>Cargando datos del actuador...</p>; // Muestra un mensaje mientras se cargan los datos
  }

  // Manejar la navegación al presionar el botón
  const handleNavigate = () => {
    navigate('/Configuracion', { state: { actuador } }); // Navega a la ruta "configuracion" y pasa el actuador como estado
  };

  return (
    <>
      <Navbar titulo={actuador.nombre || 'Actuador'} />
      <div className="MostrarActuadorContainer">
        <h2>Acciones</h2>
        <select
          value={accionSeleccionada}
          onChange={(e) => setAccionSeleccionada(e.target.value)}
          className="Dropdown"
        >
          {acciones.map((accion, index) => (
            <option key={index} value={accion}>
              {accion}
            </option>
          ))}
        </select>

        <h2>Modo actual</h2>
        <select
          value={modoSeleccionado}
          onChange={(e) => setModoSeleccionado(e.target.value)}
          className="Dropdown"
        >
          {opcionesModo.map((modo, index) => (
            <option key={index} value={modo}>
              {modo}
            </option>
          ))}
        </select>

        <button className="ConfigurarButton" onClick={handleNavigate}>
          Configurar Automático
        </button>
      </div>
    </>
  );
};

export default MostrarActuador;
