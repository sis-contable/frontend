// Servicio para obtener Planes de cuenta por palabra clave
const getListAccountPlanByWordService = async (keyword) => {
    try {
        const response = await fetch(`/api/listAccountsPlanByKeyword/${keyword}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error al obtener los registros', error);
        throw error;
    }
};

export default getListAccountPlanByWordService;