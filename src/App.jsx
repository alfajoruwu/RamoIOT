
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Pestañas/Login/Login'
import MenuInicialAdmin from './Pestañas/Usuarios/Administrador/MenuInicial/MenuInicialAdmin'
import MenuInicial from './Pestañas/Usuarios/Cliente/MenuInicial/MenuInicial'
import Estaciones from './Pestañas/Usuarios/Cliente/Estaciones/Estaciones'
function App() {

  return (
    <>
      <Router>

      <Routes>
        
        <Route exact path='/' element={<Login />} /> 
        
        
        
        <Route path='/MenuInicialAdmin' element={<MenuInicialAdmin />} />
        <Route path='/MenuInicial' element={<MenuInicial/>} />
        <Route path='/Estaciones' element={<Estaciones/>} />

      </Routes>

      </Router>
    </>
  )
}

export default App
