import React from 'react'
import Navbar from '../../../../Componentes/Elementos comunes/Navbar/Navbar'

import ElementosUsuario from './ElementosUsuario/ElementosUsuario'

import GraficoComparar from './GraficoComparar/GraficoComparar'

const Estaciones = () => {
  return (
    
    <>
    <Navbar titulo={"Estaciones"}/>

    <div className='ContenidoEstaciones'>

        <div className='GraficoMostrar'>
            <GraficoComparar/>
        </div>

        {/* <div>
           <ElementosUsuario/>
        </div> */}
    </div>

    </>
  )
}

export default Estaciones