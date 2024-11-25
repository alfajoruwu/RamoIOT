import React from 'react';
import '../VisualizaValor/VisualizaGauje.css';


const VisualizaGauje = ({ Nombre, data, options, valor,unidad }) => {
  return (
    <div className="ContenidoGauje">
      <div>{Nombre}</div>
      <div className="GraficoWrapper">
        
        <div className="CentroGauge">{valor}{unidad}</div>
      </div>
    </div>
  );
};

export default VisualizaGauje;
