import React, { useState, useEffect } from 'react'; // Importamos React y los hooks useState y useEffect.
import Cookies from 'js-cookie'; // Importamos la librería js-cookie para manejar cookies.
import App from '../../App'; // Importamos el componente principal de la aplicación.
import Login from '../../pages/Login/Login'; // Importamos el componente de inicio de sesión.

const ContenedorX = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get('access_token') ? true : false); // Inicializamos según la cookie.

  useEffect(() => {
    const checkCookie = () => {
      const token = Cookies.get('access_token');
      setIsLoggedIn(!!token); // Actualiza el estado si hay un token.
    };
    // Comprobamos la cookie inmediatamente
    checkCookie();
    // Usamos setInterval para comprobar cada 1000 ms (1 segundo)
    const interval = setInterval(checkCookie, 1000);

    // Limpiamos el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  const handleSuccessfulLogin = (token) => {
    // Esta función se llama cuando el inicio de sesión es exitoso.
    setIsLoggedIn(true); // Actualizamos el estado a verdadero.
    Cookies.set('access_token', token); // Guardamos el token en la cookie al hacer login exitoso.
  };

  return (
    <div>
      {isLoggedIn ? (
        // Si el usuario está logueado, renderizamos el componente App.
        <App 
          setIsLoggedIn={setIsLoggedIn} // Pasamos la función setIsLoggedIn a App.
          isLoggedIn={isLoggedIn} // Pasamos el estado isLoggedIn a App.
          handleSuccessfulLogin={handleSuccessfulLogin} // Pasamos la función handleSuccessfulLogin a App.
        />
      ) : (
        // Si el usuario no está logueado, renderizamos el componente Login.
        <Login handleSuccessfulLogin={handleSuccessfulLogin} />
      )}
    </div>
  );
};

export default ContenedorX; // Exportamos el componente para usarlo en otras partes de la aplicación.
