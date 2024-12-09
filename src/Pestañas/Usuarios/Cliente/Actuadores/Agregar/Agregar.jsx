import React, { useState } from 'react';
import Navbar from '../../../../../Componentes/Elementos comunes/Navbar/Navbar';
import './Agregar.css';

const Agregar = () => {
  const [sensor, setSensor] = useState('');
  const [condiciones, setCondiciones] = useState([]);
  const [nuevaCondicion, setNuevaCondicion] = useState({
    tipo: 'Viento',
    operador: '>',
    valor: '',
  });
  const [accion, setAccion] = useState('Abrir techo');

  const opcionesCondicion = ['Viento', 'Temperatura', 'Humedad', 'Lluvia'];
  const operadores = ['<', '>', '='];
  const accionesDisponibles = ['Abrir techo', 'Cerrar techo', 'Reiniciar'];

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
    console.log({
      sensor,
      condiciones,
      accion,
    });
    alert('Sensor guardado con éxito.');
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
            {opcionesCondicion.map((opcion, index) => (
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
            {operadores.map((op, index) => (
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
          {accionesDisponibles.map((accion, index) => (
            <option key={index} value={accion}>
              {accion}
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
