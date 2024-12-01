
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Pestañas/Login/Login'
import MenuInicialAdmin from './Pestañas/Usuarios/Administrador/MenuInicial/MenuInicialAdmin'
import MenuInicial from './Pestañas/Usuarios/Cliente/MenuInicial/MenuInicial'
import Estaciones from './Pestañas/Usuarios/Cliente/Estaciones/Estaciones'
import Actuadores from './Pestañas/Usuarios/Cliente/Actuadores/Actuadores'
import MostrarActuador from './Pestañas/Usuarios/Cliente/Actuadores/MostrarActuador/MostrarActuador'
import Configuracion from './Pestañas/Usuarios/Cliente/Actuadores/Configuracion/Configuracion'
import Agregar from './Pestañas/Usuarios/Cliente/Actuadores/Agregar/Agregar'
function App() {

  return (
    <>
      <Router>

      <Routes>
        
        <Route exact path='/' element={<Login />} /> 
        
        
        
        <Route path='/MenuInicialAdmin' element={<MenuInicialAdmin />} />
        <Route path='/MenuInicial' element={<MenuInicial/>} />
        <Route path='/Estaciones' element={<Estaciones/>} />
        <Route path='/Actuadores' element={<Actuadores/>} />
        <Route path='/MostrarActuador' element={<MostrarActuador/>} />
        <Route path='/Configuracion' element={<Configuracion/>} />
        <Route path='/Agregar' element={<Agregar/>} />


      </Routes>

      </Router>
    </>
  )
}

export default App
