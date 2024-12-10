import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../../Utils/Axios/AxiosInstance';
import Navbar from '../../../../Componentes/Elementos comunes/Navbar/Navbar';
import { ResponsivePie } from '@nivo/pie';

// Componente para cada sensor
const Sensor = ({ sensor }) => {
  const { id, value } = sensor;
  const clampedValue = Math.max(0, Math.min(value, 100));
  const remainingValue = 100 - clampedValue;

  const data = [
    { id: 'progress', label: 'Progreso', value: clampedValue, color: 'green' },
    { id: 'remaining', label: 'Restante', value: remainingValue, color: 'gray' },
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
          'arcs',
          ({ centerX, centerY }) => (
            <text
              x={centerX}
              y={centerY - 70}
              textAnchor="middle"
              dominantBaseline="central"
              style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                fill: '#333',
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
  const { id } = useParams(); // El id con el useParams
  const [sensoresData, setSensoresData] = useState([]); // Para guardar el Json con los sensores de cada estacion
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/SensoresPorEstacion/${id}`); 
        setSensoresData(response.data);
      } catch (err) {
        console.error('Error al obtener datos:', err);
        setSensoresData([
          {
              id:'Temperatura - B123',
              value: 30,
              MqttServer: '192.168.1.123',
              MqttTopico: 'Temperatura',
          },
          {
              id:'Humedad - e123',
              value: 12,
              MqttServer: '192.168.1.123',
              MqttTopico: 'Humedad',
          }
          ]);
        setError('No se pudieron cargar los datos.'); 
      
      
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <Navbar titulo={`Sensores Estación ${id}`} />
      <div style={{ justifyContent: 'center', gap: '6rem', display: 'flex', flexDirection: 'column' }}>
        {loading ? (
          <p>Cargando datos...</p>
        ) : error ? (
          <p>{error}</p>
        ) : sensoresData.length > 0 ? (
          sensoresData.map((sensor) => <Sensor key={sensor.id} sensor={sensor} />)
        ) : (
          <p>No se encontraron datos para esta estación.</p>
        )}
      </div>
    </>
  );
};

export default SensoresEstacion1;
