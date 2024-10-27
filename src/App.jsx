import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Importamos componentes para manejar el enrutamiento en React.
import Header from './componentes/Header/Header'; // Importamos el componente Header.
import Home from './pages/Home/Home'; // Importamos la página de inicio.
import ListUsers from './pages/Users/ListUsers'; // Importamos la página que lista usuarios.
import ListRegister from './pages/Books/DiaryBook/ListRegister'; // Importamos la página que lista registros del libro diario.
import AccountPlan from './pages/AccountPlan/ListAccountPlan'; // Importamos la página que muestra el plan de cuentas.
import Login from './pages/Login/Login'; // Importamos la página de inicio de sesión.
import Ledger from './pages/Books/Ledger/Ledger'; // Importamos la página que muestra el libro mayor.
import React from 'react'; // Importamos React.

const App = ({ setIsLoggedIn, isLoggedIn, handleSuccessfulLogin }) => {
  return (
    <div className="App">
      <Router> {/* Iniciamos el enrutador de la aplicación. */}
        {isLoggedIn && <Header setLoginSuccessful={handleSuccessfulLogin} setIsLoggedIn={setIsLoggedIn} />} {/* Si el usuario está logueado, mostramos el encabezado. */}
        
        <Routes> {/* Definimos las rutas de la aplicación. */}
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} /> {/* Si el usuario está logueado, va a Home, de lo contrario se redirige a Login. */}
          <Route path="/login" element={!isLoggedIn ? <Login handleSuccessfulLogin={handleSuccessfulLogin} /> : <Navigate to="/" />} /> {/* Si no está logueado, se muestra Login, de lo contrario redirige a Home. */}
          <Route path="/inicio" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} /> {/* Similar a la ruta anterior, redirige a Login si no está logueado. */}
          <Route path="/libro_diario" element={isLoggedIn ? <ListRegister /> : <Navigate to="/login" />} /> {/* Si está logueado, muestra ListRegister, si no, redirige a Login. */}
          <Route path="/plan_cuenta" element={isLoggedIn ? <AccountPlan /> : <Navigate to="/login" />} /> {/* Similar a la anterior, muestra AccountPlan o redirige. */}
          <Route path="/usuarios" element={isLoggedIn ? <ListUsers /> : <Navigate to="/login" />} /> {/* Muestra ListUsers si está logueado, de lo contrario redirige. */}
          <Route path="/libro_mayor/:id_cuenta" element={isLoggedIn ? <Ledger /> : <Navigate to="/login" />} /> {/* Muestra Ledger si está logueado, redirige a Login si no. */}
        </Routes>
      </Router>
    </div>
  );
};

export default App; // Exportamos el componente para usarlo en otras partes de la aplicación.
