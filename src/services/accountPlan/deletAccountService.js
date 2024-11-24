// Servicio para obtener Planes de cuenta por palabra clave
const deletAccountService = async (codigo) => {
    try {
        const response = await fetch(`/api/deletAccount/${codigo}`, {
            method: 'POST',
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error al eliminar la cuenta', error);
        throw error;
    }
};

export default deletAccountService;