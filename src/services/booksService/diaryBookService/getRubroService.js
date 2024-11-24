// Servicio para obtener rubros basado en grupo y tipo
const getRubroService = async (idGrupo, idTipo) => {
    try {
        const response = await fetch(`/api/rubro/${idGrupo}/${idTipo}`, {
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
        console.error('Error al obtener los rubros', error);
        throw error;
    }
};

export default getRubroService;