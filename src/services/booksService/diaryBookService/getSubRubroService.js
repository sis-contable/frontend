// Servicio para obtener rubros basado en grupo y tipo
const getSubRubroService = async (idRubro) => {
    try {
        const response = await fetch(`http://localhost:3000/getSubRubro/${idRubro}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error al obtener los Subrubros', error);
        throw error;
    }
};

export default getSubRubroService;