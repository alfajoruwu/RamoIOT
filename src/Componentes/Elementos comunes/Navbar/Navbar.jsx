import React from 'react'
import '../Navbar/Navbar.css'

const Navbar = ({titulo}) => {
  return (
    <>
    

    <div className='Navbar'>
    
        <h3>
         {titulo}
        </h3>
    
    
    </div>
    </>
  )
}

export default Navbar