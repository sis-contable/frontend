// Importamos useState desde React para manejar el estado local en el componente
import React, { useState } from 'react';
// Importamos componentes de React Bootstrap para estructurar y estilizar el formulario
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// Importamos los estilos de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// Importamos la función de login desde el archivo loginService.js
import loginService from '../../services/session/loginService.js';
// Importamos la librería js-cookie para manejar cookies.
import Cookies from 'js-cookie'; 


// Definimos un componente funcional llamado Login utilizando una arrow function
const Login = ({ handleSuccessfulLogin } ) => {
  // Declaramos estados locales para manejar los inputs del formulario y el estado de la sesión
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  
  // Función que se ejecuta cuando se envía el formulario
  const handleLogin = async (e) => {
    e.preventDefault();
    // Realiza la solicitud de inicio de sesión
    try {
      const response = await loginService({ usuario, clave });
      console.log(response);
      if (response.success) {
        const token = Cookies.get('access_token'); // Asegúrate de que esto se llame después del inicio de sesión
        handleSuccessfulLogin(token); // Pasa el token al manejador
      } else {
        console.error('Login failed:', response.message);
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage(response.message);
    }
  };

  // Retornamos el JSX para renderizar el componente
  return (
        <Container className="mt-5">
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={5}>
              <div className="p-4 rounded shadow">
                <h2 className="text-center mb-4">Iniciar Sesión</h2>
                {/* Si hay un mensaje de error, lo mostramos */}
                {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
                <Form onSubmit={handleLogin}>
                  <Form.Group controlId="formBasicEmail" className="mb-3">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control
                      onChange={(event) => setUsuario(event.target.value)}
                      type="text"
                      placeholder="Usuario"
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword" className="mb-3">
                    <Form.Label>Clave</Form.Label>
                    <Form.Control
                      onChange={(event) => setClave(event.target.value)}
                      type="password"
                      placeholder="Clave"
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="mb-3 mx-auto d-block">
                    Iniciar Sesión
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
  );
};

// Exportamos el componente Login para que pueda ser utilizado en otros archivos
export default Login;
