// Definimos una función asincrónica que toma los datos del formulario como argumento
const getTypeService = async () => {
    try {
      // Enviamos una solicitud GET al servidor para obtener la lista de tipos
      const responseRegister = await fetch('/api/type', {
        method: 'GET', // Método HTTP
        headers: {
          'Content-Type': 'application/json', // Especificamos el tipo de contenido como JSON
        },
      });
      // Convertimos la respuesta del servidor a un objeto js
      const result = await responseRegister.json();
      // Devolvemos el resultado para que pueda ser manejado en la lista
      return result;
    } catch (error) {
      // Si ocurre un error, lo imprimimos en la consola y lanzamos una excepción
      console.error('Error al recorrer los tipos', error);
      throw error;
    }
  };
  
  // Exportamos la función para que pueda ser utilizada en otros archivos
  export default getTypeService;