
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Pestañas/Login/Login'

import MenuInicial from './Pestañas/Usuarios/Cliente/MenuInicial/MenuInicial'
import Estaciones from './Pestañas/Usuarios/Cliente/Estaciones/Estaciones'
import { Mapa } from './Componentes/Mapas/Mapa'
import Actuadores from './Pestañas/Usuarios/Cliente/Actuadores/Actuadores'
import MostrarActuador from './Pestañas/Usuarios/Cliente/Actuadores/MostrarActuador/MostrarActuador'
import Configuracion from './Pestañas/Usuarios/Cliente/Actuadores/Configuracion/Configuracion'
import Agregar from './Pestañas/Usuarios/Cliente/Actuadores/Agregar/Agregar'
import MenuInicialAdmin from './Pestañas/Usuarios/Administrador/MenuInicial/PruebaGraficos/MenuInicialAdmin'
import MenuInicialADMIN from './Pestañas/Usuarios/Administrador/MenuInicial/MenuInicial/MenuInicialADMIN'
import CrearNuevoUsuario from './Pestañas/Usuarios/Administrador/CrearNuevoUsuario/CrearNuevoUsuario'
import AdminsitrarUsuario from './Pestañas/Usuarios/Administrador/AdministrarUsuario/AdminsitrarUsuario'
import AdministrarSensores from './Pestañas/Usuarios/Administrador/AdministrarSensores/AdministrarSensores'
import AdministrarActuadores from './Pestañas/Usuarios/Administrador/AdministrarSensores/AdministrarActuadores'
import ActuadorNuevo from './Pestañas/Usuarios/Administrador/AñadirCrear/ActuadorNuevo'
import ModificarActuador from './Pestañas/Usuarios/Administrador/ModificarActuador/ModificarActuador'



import Notificaciones from './Pestañas/Usuarios/Cliente/Notificaciones/Notificaciones'
import SemiAutomatico from './Pestañas/Usuarios/Cliente/Notificaciones/SemiAutomatico/SemiAutomatico'
import Estacion1 from './Pestañas/Usuarios/Cliente/Estaciones/Estacion1/Estacion1'
import GraficoComparar from './Pestañas/Usuarios/Cliente/Estaciones/GraficoComparar/GraficoComparar'  



import Sensor from './Pestañas/Usuarios/Cliente/Sensores/Sensor'
import AñadirAccion from './Pestañas/Usuarios/Administrador/AdministrarSensores/AñadirAccion/AñadirAccion'
import AñadirEstacion from './Pestañas/Usuarios/Administrador/AdministrarSensores/AñadirEstacion/AñadirEstacion'
import CrearSensor from './Pestañas/Usuarios/Administrador/AñadirSensores/CrearSensor'
function App() {

  return (
    <>
      <Router>
      
      <Routes>
        
        <Route exact path='/' element={<Login />} /> 
        
        {/* USUARIO */}
        <Route path='/MenuInicial/:id' element={<MenuInicial/>} />
        <Route path='/Estaciones/:id' element={<Estaciones/>} />
        <Route path='/MapaEstacion/:id' element={<Mapa/>} />
        <Route path='/Actuadores' element={<Actuadores/>} />
        <Route path='/MostrarActuador' element={<MostrarActuador/>} />
        <Route path='/Configuracion' element={<Configuracion/>} />
        <Route path='/Agregar' element={<Agregar/>} />
        <Route path='/Notificaciones' element={<Notificaciones/>} />
        <Route path='/SemiAutomatico' element={<SemiAutomatico/>} />
        <Route path='/Estacion1' element={<Estacion1/>} />
        <Route path='/GraficoComparar' element={<GraficoComparar/>} />

        {/* ADMIN */}
        <Route path='/MenuInicialADMIN/:id' element={<MenuInicialADMIN/>}/> 
        <Route path='/MenuInicialAdmin' element={<MenuInicialAdmin></MenuInicialAdmin>} />
        <Route path='/CrearUsuario' element={<CrearNuevoUsuario/>}/>
        <Route path='/AdministrarUsuario/:id' element={<AdminsitrarUsuario/>}/>
        <Route path='/AdministrarSensores/:id' element={<AdministrarSensores/>}/>
        {/* OK  */}

        <Route path='/AñadirEstacion/:UsuarioID' element={<AñadirEstacion/>} />
        <Route path='/AñadirEstacion/:UsuarioID/:Modificar' element={<AñadirEstacion/>} />

        <Route path='/CrearActuador/:id' element={<ActuadorNuevo/>}/>
        <Route path='/AdministrarActuadores/:id' element={<AdministrarActuadores/>}/>


        <Route path='/ModificarActuador/:id/:ActuadorID' element={<ModificarActuador/>}/>
        <Route path='/AñadirAccion/:ActuadorID' element={ <AñadirAccion/> }/>

        <Route path='/AñadirAccion/:ActuadorID/:Modificar' element={ <AñadirAccion/> }/>


        <Route path='/Sensores' element={<Sensor/>} />



        <Route path='/CrearModificarSensor/:EstacionID' element={<CrearSensor/>}/>
        <Route path='/CrearModificarSensor/:EstacionID/:IDSensor' element={<CrearSensor/>}/>



      </Routes>

      </Router>
    </>
  )
}

export default App
