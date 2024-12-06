
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Pestañas/Login/Login'

import MenuInicial from './Pestañas/Usuarios/Cliente/MenuInicial/MenuInicial'
import Estaciones from './Pestañas/Usuarios/Cliente/Estaciones/Estaciones'
import Actuadores from './Pestañas/Usuarios/Cliente/Actuadores/Actuadores'
import MostrarActuador from './Pestañas/Usuarios/Cliente/Actuadores/MostrarActuador/MostrarActuador'
import Configuracion from './Pestañas/Usuarios/Cliente/Actuadores/Configuracion/Configuracion'
import Agregar from './Pestañas/Usuarios/Cliente/Actuadores/Agregar/Agregar'
import MenuInicialAdmin from './Pestañas/Usuarios/Administrador/MenuInicial/PruebaGraficos/MenuInicialAdmin'
import MenuInicialADMIN from './Pestañas/Usuarios/Administrador/MenuInicial/MenuInicial/MenuInicialADMIN'
import CrearNuevoUsuario from './Pestañas/Usuarios/Administrador/CrearNuevoUsuario/CrearNuevoUsuario'
function App() {

  return (
    <>
      <Router>

      <Routes>
        
        <Route exact path='/' element={<Login />} /> 
        
        {/* USUARIO */}
        <Route path='/MenuInicial' element={<MenuInicial/>} />
        <Route path='/Estaciones' element={<Estaciones/>} />
        <Route path='/Actuadores' element={<Actuadores/>} />
        <Route path='/MostrarActuador' element={<MostrarActuador/>} />
        <Route path='/Configuracion' element={<Configuracion/>} />
        <Route path='/Agregar' element={<Agregar/>} />
        
        
        {/* ADMIN */}
        <Route path='/MenuInicialADMIN' element={<MenuInicialADMIN/>}/>
        <Route path='/MenuInicialAdmin' element={<MenuInicialAdmin></MenuInicialAdmin>} />
        <Route path='/CrearUsuario' element={<CrearNuevoUsuario/>}/>

      </Routes>

      </Router>
    </>
  )
}

export default App
