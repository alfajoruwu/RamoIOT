import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { useLocation } from 'react-router-dom';
import Navbar from '../../../../Componentes/Elementos comunes/Navbar/Navbar';


// Conectar con mqtt


const sensor = [
  { id: 'Temperatura - B612', value: 50 },
  { id: 'Humedad - 213', value: 70 },
  { id: 'lluvia - Plumetro', value: 30 },
];

const Sensor = ({ sensor }) => {


  const { id, value } = sensor;
  const clampedValue = Math.max(0, Math.min(value, 100));
  const remainingValue = 100 - clampedValue;

  const data = [
    { id: 'progress', label: 'Progress', value: clampedValue, color: 'green' },
    { id: 'remaining', label: 'Remaining', value: remainingValue, color: 'gray' },
  ];

  return (
    <div style={{ margin: '10px', height: '300px' }}>
      <h1 style={{ fontSize: '1.5rem', textAlign: 'center' }}>{id}</h1>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        startAngle={-90}
        endAngle={90}
        innerRadius={0.7}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={({ data }) => data.color}
        enableArcLabels={false}
        enableArcLinkLabels={false}
        legends={[]}
        layers={[
          'arcs', // La capa estándar para el gráfico
          ({ centerX, centerY }) => (
            // Agregar el texto en el centro del gráfico
            <text
              x={centerX}
              y={centerY-70}
              textAnchor="middle"
              dominantBaseline="central"
              style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                fill: '#333', // Color del texto
              }}
            >
              {clampedValue}
            </text>
          ),
        ]}
      />
    </div>
  );
};

const SensoresEstacion1 = () => {
  const location = useLocation();
  const sensoresData = location.state?.sensoresData || []; 

  return (
    <>
      <Navbar titulo={"Sensores Estacion 1"} />
      <div style={{ justifyContent: 'center', gap: '6rem', display: 'flex', flexDirection: 'column' }}>
        {sensor.length > 0 ? (
          sensor.map((sensor) => <Sensor key={sensor.id} sensor={sensor} style={{ margin: '1rem' }} />)
        ) : (
          <p>No se enviaron datos de sensores.</p>
        )}
      </div>

    </>
  );
};

export default SensoresEstacion1;
