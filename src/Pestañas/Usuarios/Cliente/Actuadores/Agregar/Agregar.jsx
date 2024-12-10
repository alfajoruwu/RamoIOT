import React, { useState, useEffect } from 'react';
import Navbar from '../../../../../Componentes/Elementos comunes/Navbar/Navbar';
import './Agregar.css';
import accionesData from './accion.json'; // Importar JSON con acciones

const Agregar = () => {
  const [sensor, setSensor] = useState('');
  const [condiciones, setCondiciones] = useState([]);
  const [nuevaCondicion, setNuevaCondicion] = useState({
    tipo: 'Viento',
    operador: '>',
    valor: '',
  });
  const [accion, setAccion] = useState('');
  const [accionesDisponibles, setAccionesDisponibles] = useState([]);

  // Cargar acciones desde el JSON
  useEffect(() => {
    if (accionesData && accionesData.Acciones) {
      setAccionesDisponibles(accionesData.Acciones);
      setAccion(accionesData.Acciones[0]?.NombreAccion || '');
    }
  }, []);

  // Manejar el cambio en los inputs
  const handleCondicionChange = (field, value) => {
    setNuevaCondicion((prev) => ({ ...prev, [field]: value }));
  };

  // Agregar nueva condición a la lista
  const handleAgregarCondicion = () => {
    if (nuevaCondicion.valor) {
      setCondiciones((prev) => [...prev, nuevaCondicion]);
      setNuevaCondicion({ tipo: 'Viento', operador: '>', valor: '' });
    }
  };

  // Manejar guardar
  const handleGuardar = () => {
    // Buscar la acción seleccionada por su nombre
    const accionSeleccionada = accionesDisponibles.find((a) => a.NombreAccion === accion);

    if (!accionSeleccionada) {
      alert('Por favor, seleccione una acción válida.');
      return;
    }

    // Crear el objeto para enviar a la API
    const payload = {
      id: sensor,
      Variable: nuevaCondicion.tipo,
      tipo: nuevaCondicion.operador === '>' ? 'mayor' : nuevaCondicion.operador === '<' ? 'menor' : 'igual',
      valor: parseFloat(nuevaCondicion.valor),
      accionID: accionSeleccionada.id,
      actuadorID: 1, // Suponiendo que el actuadorID es fijo o viene de otro lugar
    };

    console.log('Datos enviados a la API:', payload);
    alert('Condición guardada con éxito. Revisa la consola para más detalles.');
  };

  return (
    <>
      <Navbar titulo="Añadir sensor" />
      <div className="agregar-container">
        <h2 className="agregar-titulo">Nombre del Sensor</h2>
        <input
          type="text"
          className="agregar-input"
          placeholder="Escribe el nombre del sensor"
          value={sensor}
          onChange={(e) => setSensor(e.target.value)}
        />

        <h2 className="agregar-titulo">Condiciones</h2>
        <div className="condicion-item">
          <select
            className="agregar-dropdown"
            value={nuevaCondicion.tipo}
            onChange={(e) => handleCondicionChange('tipo', e.target.value)}
          >
            {['Viento', 'Temperatura', 'Humedad', 'Lluvia'].map((opcion, index) => (
              <option key={index} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>

          <select
            className="agregar-dropdown"
            value={nuevaCondicion.operador}
            onChange={(e) => handleCondicionChange('operador', e.target.value)}
          >
            {['<', '>', '='].map((op, index) => (
              <option key={index} value={op}>
                {op}
              </option>
            ))}
          </select>

          <input
            type="number"
            className="agregar-input-numero"
            placeholder="Valor"
            value={nuevaCondicion.valor}
            onChange={(e) => handleCondicionChange('valor', e.target.value)}
          />
          <button className="agregar-boton-condicion" onClick={handleAgregarCondicion}>
            Añadir
          </button>
        </div>

        <ul className="condiciones-lista">
          {condiciones.map((cond, index) => (
            <li key={index} className="condicion-lista-item">
              {cond.tipo} {cond.operador} {cond.valor}
            </li>
          ))}
        </ul>

        <h2 className="agregar-titulo">Acción</h2>
        <select
          className="agregar-dropdown"
          value={accion}
          onChange={(e) => setAccion(e.target.value)}
        >
          {accionesDisponibles.map((accion) => (
            <option key={accion.id} value={accion.NombreAccion}>
              {accion.NombreAccion}
            </option>
          ))}
        </select>

        <button className="agregar-boton-guardar" onClick={handleGuardar}>
          Guardar
        </button>
      </div>
    </>
  );
};

export default Agregar;
