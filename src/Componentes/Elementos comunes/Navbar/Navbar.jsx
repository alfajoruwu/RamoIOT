import React from 'react';
import '../Navbar/Navbar.css';

const Navbar = ({ titulo }) => {



  const handleVolver = () => {
    window.history.back(); // Navega a la página anterior
  };

  return (
    <div className="Navbar">
      <h3>{titulo}</h3>

      {titulo !== 'Inicio de sesión' && (
        <button onClick={handleVolver} className="light">Volver</button>
      )}

    </div>
  );
};

export default Navbar;
