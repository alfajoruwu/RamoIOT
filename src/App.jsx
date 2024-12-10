
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
function App() {

  return (
    <>
      <Router>
      
      <Routes>
        
        <Route exact path='/' element={<Login />} /> 
        
        {/* USUARIO */}
        <Route path='/MenuInicial' element={<MenuInicial/>} />
        <Route path='/Estaciones' element={<Estaciones/>} />
        <Route path='/Mapa' element={<Mapa/>} />
        <Route path='/Actuadores' element={<Actuadores/>} />
        <Route path='/MostrarActuador' element={<MostrarActuador/>} />
        <Route path='/Configuracion' element={<Configuracion/>} />
        <Route path='/Agregar' element={<Agregar/>} />
        <Route path='/Notificaciones' element={<Notificaciones/>} />
        <Route path='/SemiAutomatico' element={<SemiAutomatico/>} />
        <Route path='/Estacion1' element={<Estacion1/>} />
        <Route path='/GraficoComparar' element={<GraficoComparar/>} />

        {/* ADMIN */}
        <Route path='/MenuInicialADMIN' element={<MenuInicialADMIN/>}/>
        <Route path='/MenuInicialAdmin' element={<MenuInicialAdmin></MenuInicialAdmin>} />
        <Route path='/CrearUsuario' element={<CrearNuevoUsuario/>}/>
        
        
        <Route path='/AdministrarUsuario/:id' element={<AdminsitrarUsuario/>}/>
        <Route path='/AdministrarSensores/:id' element={<AdministrarSensores/>}/>
        <Route path='/AdministrarActuadores/:id' element={<AdministrarActuadores/>}/>

        <Route path='/CrearActuador/:id' element={<ActuadorNuevo/>}/>

        <Route path='/ModificarActuador/:id/:ActuadorID' element={<ModificarActuador/>}/>
        



        <Route path='/Sensor' element={<Sensor/>} />
      </Routes>

      </Router>
    </>
  )
}

export default App
