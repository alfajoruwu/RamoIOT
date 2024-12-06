import React from 'react'
import Navbar from '../../../../../Componentes/Elementos comunes/Navbar/Navbar'
import '../PruebaGraficos/MenuInicialAdmin.css'
import Cartagrafico from '../../Componentes/CartaGrafico/Cartagrafico'
import VisualizaGauje from '../../Componentes/VisualizaValor/VisualizaGauje'

const MenuInicialAdmin = () => {
  
  //obtener informacion graficos

  const data1 = [
    {
      id: 'Temperatura',
      color: 'hsl(217, 70%, 50%)',
      data: [
        { x: '00:00', y: 11 },
        { x: '01:00', y: 14 },
        { x: '02:00', y: 17 },
        { x: '03:00', y: 13 },
        { x: '04:00', y: 9 },
      ],
    },
  ];

  
  return (
    <>

      <Navbar titulo={"Prueba de graficos"}/>
      
      <div className='contenidoGraficos'>
        
        <Cartagrafico Nombre={'Temperatura - Sensor 1'} data={data1}  Filtro={'Hora'} />
        <Cartagrafico Nombre={'Temperatura - Sensor 2'} data={data1}  Filtro={'Hora'} />
        <Cartagrafico Nombre={'Temperatura - Sensor 3'} data={data1}  Filtro={'Hora'} />

{/* 

        <VisualizaGauje Nombre={'Temperatura actual'} data={datarueda} options={optionsrueda} valor={70} unidad={' °C'}/>
        <VisualizaGauje Nombre={'Humedad actual'} data={datarueda2} options={optionsrueda2} valor={30} unidad={' %'}/> 

         */}
      </div>
        
    </>
  )
}

export default MenuInicialAdmin