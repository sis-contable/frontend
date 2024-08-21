const createUserService = async (newUser) => {
    try {
        const response = await fetch(`http://localhost:3000/createUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });
        const data = await response.json(); // Obtener el contenido JSON de la respuesta
        if (response.ok) {
            return data; // Devuelve los datos del usuario creado
        } else {
            return { error: data.message || "Error al crear el usuario" }; // Devuelve el mensaje de error del backend
        }
    } catch (error) {
        return { error: error.message }; // Retorna el mensaje de error si ocurre un fallo en la solicitud
    }
};

export default createUserService;