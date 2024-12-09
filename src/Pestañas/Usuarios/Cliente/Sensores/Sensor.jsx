import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { useLocation } from 'react-router-dom';
import Navbar from '../../../../Componentes/Elementos comunes/Navbar/Navbar';

const sensor = [
  { id: 1, value: 50 },
  { id: 2, value: 70 },
  { id: 3, value: 30 },
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
    <div style={{ margin: '20px', height: '300px' }}>
      <h1 style={{ fontSize: '1.5rem', textAlign: 'center' }}>Sensor {id}</h1>
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
      <div style={{  justifyContent: 'center' }}>
        {sensor.length > 0 ? (
          sensor.map((sensor) => <Sensor key={sensor.id} sensor={sensor} />)
        ) : (
          <p>No se enviaron datos de sensores.</p>
        )}
      </div>
    </>
  );
};

export default SensoresEstacion1;
