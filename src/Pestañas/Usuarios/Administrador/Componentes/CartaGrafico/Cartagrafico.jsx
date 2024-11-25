
import '../CartaGrafico/Cartagrafico.css'
import React, { useState } from 'react';
import LineaNivo from '../../../../../Componentes/Elementos comunes/Graficos/LinealNIVO/LineaNivo';

const Cartagrafico = ({Nombre,data,Filtro}) => {

  return (
    
    <div className='CartaGrafico'>
    
        <div>{Nombre}</div>
          <div>
            Filtros fecha
          </div>


          <div className="filtros">
          </div>
          
        <div className='verGrafico'>
         <LineaNivo data={data} />
        </div>

        <button>Mas informacion</button>

    </div>
  )
}

export default Cartagrafico