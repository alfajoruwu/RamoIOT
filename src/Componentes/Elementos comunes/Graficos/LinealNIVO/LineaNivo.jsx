import React from 'react';
import { ResponsiveLine } from '@nivo/line';

const LineaNivo = ({ 
  data, 
  yLegend = '', 
  xLegend = '' 
}) => {
  // Asegurar que los datos estén bien estructurados antes de operar sobre ellos
  const getTimeRange = (data) => {
    if (!data || !data[0] || !data[0].data) return { minTime: 0, maxTime: 0 };

    const times = data[0].data.map(d => new Date(d.x)); // Usamos el primer conjunto de datos
    const minTime = Math.min(...times);
    const maxTime = Math.max(...times);
    return { minTime, maxTime };
  };

  const { minTime, maxTime } = getTimeRange(data);
  
  // Calcular la diferencia de tiempo en horas
  const diffInHours = (maxTime - minTime) / (1000 * 60 * 60);

  // Definir el formato y frecuencia de los ticks según el rango
  let tickValues;
  let tickRotation = -45;
  let format = '%H:%M';

  if (diffInHours > 24) {
    // Si el rango abarca más de 24 horas, usamos una frecuencia de 12 horas
    tickValues = 'every 12 hours';
    format = '%d/%m %H:%M'; // Mostrar fecha y hora
  } else {
    // Si solo es un día, usamos una frecuencia de 1 hora
    tickValues = 'every 1 hour';
    format = '%H:%M'; // Solo hora
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 30, right: 10, bottom: 60, left: 25 }}
        xScale={{
          type: 'time',
          format: '%Y-%m-%dT%H:%M:%S',
          useUTC: false,
          precision: 'minute',
        }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: false,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation,
          format,
          tickValues,
          legend: xLegend,
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: yLegend,
          legendOffset: -50,
          legendPosition: 'middle',
        }}
        colors={({ id }) => {
          const serie = data.find(serie => serie.id === id);
          return serie ? serie.color : '#000';
        }}
        pointSize={0}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        enableSlices="x"
        tooltip={({ point }) => (
          <div
            style={{
              background: 'white',
              padding: '9px 12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          >
            <strong>Sensor: {point.serieId}</strong>
            <br />
            Tipo: {point.data.type || 'No definido'}
            <br />
            Hora: {point.data.x.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            <br />
            Valor: {point.data.y}
          </div>
        )}
      />
    </div>
  );
};

export default LineaNivo;
