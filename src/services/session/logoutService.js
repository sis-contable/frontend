// loginService.js

// Definimos una función asincrónica que toma los datos del formulario como argumento
const logoutService = async () => {
    try {
      // Enviamos una solicitud POST al servidor con los datos del login
      const response = await fetch('http://localhost:3000/logout', {
        method: 'POST', // Método HTTP
        credentials: 'include', // Esto es importante para enviar cookies
        headers: {
          'Content-Type': 'application/json', // Especificamos el tipo de contenido como JSON
        },
      });
  
      // Convertimos la respuesta del servidor a un objeto JavaScript
      const result = await response.json();
      console.log("cerrar sesion?", result)
      // Devolvemos el resultado para que pueda ser manejado en el componente de login
      return result;
    } catch (error) {
      // Si ocurre un error, lo imprimimos en la consola y lanzamos una excepción
      console.error('Error during login:', error);
      throw error;
    }
  };
  
  // Exportamos la función para que pueda ser utilizada en otros archivos
  export default logoutService;