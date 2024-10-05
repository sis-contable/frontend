// Servicio para obtener rubros basado en grupo y tipo
const getListRegisterByDateService = async (fecha_desde , fecha_hasta) => {
    try {
        const response = await fetch(`http://localhost:3000/lookForBookDiaryDate/${fecha_desde}/${fecha_hasta}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log(fecha_desde , fecha_hasta);
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

export default getListRegisterByDateService;