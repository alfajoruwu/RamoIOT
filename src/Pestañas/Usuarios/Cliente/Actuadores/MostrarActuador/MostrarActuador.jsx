import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../../../Componentes/Elementos comunes/Navbar/Navbar';
import './MostrarActuador.css';
import accionesData from './acciones.json'; // Importación directa del JSON

const MostrarActuador = ({ actuador }) => {
  const [acciones, setAcciones] = useState([]);
  const [accionSeleccionada, setAccionSeleccionada] = useState('');
  const [modoSeleccionado, setModoSeleccionado] = useState('');
  const [notificacion, setNotificacion] = useState('Hay que responder notificación.');
  const opcionesModo = ["Manual", "Semiautomatico", "Automatico"];
  const navigate = useNavigate();

  const fetchActuadorData = () => {
    // Buscar los datos del actuador en el JSON
    const actuadorData = accionesData.find(
      (item) => item.id === actuador.id || item.nombre === actuador.nombre
    );

    if (actuadorData) {
      setAcciones(actuadorData.Acciones); // Establecer las acciones del actuador
      setAccionSeleccionada(actuadorData.Acciones[0]?.NombreAccion || ''); // Seleccionar la primera acción por defecto
      setModoSeleccionado(actuadorData.ModoActual); // Establecer el modo actual
    } else {
      console.warn(`No se encontraron datos para el actuador:`, actuador);
    }
  };

  useEffect(() => {
    fetchActuadorData(); // Cargar los datos del actuador al inicio
  }, [actuador]);

  if (!acciones.length) {
    return <p>Cargando datos del actuador...</p>;
  }

  const handleNavigate = () => {
    navigate('/Configuracion', { state: { actuador } });
  };

  return (
    <>
      <Navbar titulo={actuador.nombre || 'Actuador'} />
      <div className="MostrarActuadorContainer">
        <h2>Acciones</h2>
        <div className="BotonesAcciones">
          {acciones.map((accion, index) => (
            <button
              key={index}
              className={`AccionButton ${accionSeleccionada === accion.NombreAccion ? 'Seleccionada' : ''}`}
              onClick={() => setAccionSeleccionada(accion.NombreAccion)}
            >
              {accion.NombreAccion}
            </button>
          ))}
        </div>

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

        <p className="Notificacion">{notificacion}</p>

        <button className="ConfigurarButton" onClick={handleNavigate}>
          Configurar Automático
        </button>

        <button className="ActualizarButton" onClick={fetchActuadorData}>
          Actualizar Datos
        </button>
      </div>
    </>
  );
};

export default MostrarActuador;
