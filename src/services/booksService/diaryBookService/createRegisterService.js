const createRegisterService = async (newRegister) => {
    try {
        const response = await fetch(`/api/createRegisterBookDiary`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRegister),
        });
        const data = await response.json(); // Obtener el contenido JSON de la respuesta
        if (response.ok) {
            return data; // Devuelve los datos del registro creado
        } else {
            return { error: data.message || "Error al crear el registro" }; // Devuelve el mensaje de error del backend
        }
    } catch (error) {
        return { error: error.message }; // Retorna el mensaje de error si ocurre un fallo en la solicitud
    }
};

export default createRegisterService;