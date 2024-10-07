import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el CSS de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Importa el JS de Bootstrap, incluido el comportamiento de los componentes
import { Nav } from 'react-bootstrap'; // Importa el componente Nav de react-bootstrap
import { Link , useNavigate } from 'react-router-dom'; // Importa el componente Link de react-router-dom
import React, { useState } from 'react';

const Header = ({setLoginSuccessful}) => {

  const navigate = useNavigate();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token del localStorage
    setLoginSuccessful(false); // Actualiza el estado de loginSuccessful a false
    navigate('/'); // Redirige al usuario a la página de inicio
    window.location.reload();
  };

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <Nav className="navbar navbar-expand-lg navbar-dark bg-dark"> {/* Navbar con clases de Bootstrap para estilo y comportamiento */}
      <div className="container-fluid text-center"> 
        {/* Enlace al inicio con el logo */}
        <Link className="navbar-brand" to="/"> 
          <img src="..\src\assets\img\logo.png" alt="" width="100" height="40px" className="img-fluid mx-2" /> {/* Logo dentro del enlace */}
        </Link>
        
        {/* Botón para el menú desplegable en movile */}
        <button className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}>
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Contenedor para los enlaces de la navbar, colapsa en movile */}
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse justify-content-end`} id="navbarNav">
          <div className="navbar-nav"> 
            {/* Enlaces de navegación */}
            <Link className="nav-link active" to="/inicio" onClick={handleNavCollapse}>Inicio</Link>
            <Link className="nav-link" to="/libro_diario" onClick={handleNavCollapse}>Libros</Link> 
            <Link className="nav-link" to="/plan_cuenta" onClick={handleNavCollapse}>Cuentas</Link>
            <Link className="nav-link" to="/usuarios" onClick={handleNavCollapse}>Usuarios</Link>
          </div>
          
          <div className='d-flex justify-content-center'> {/* Contenedor para el enlace de Logout */}
            <button onClick={handleLogout} className="nav-link">Cerrar sesion</button>
          </div>
        </div>
      </div>
    </Nav>
  );
}

export default Header;