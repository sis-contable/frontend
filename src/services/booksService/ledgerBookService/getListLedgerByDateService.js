// Servicio para obtener rubros basado en grupo y tipo
const getListLedgerByDateService = async (fecha_desde , fecha_hasta , id_cuenta) => {
    try {
        const response = await fetch(`api/LookForLedgerDate/${fecha_desde}/${fecha_hasta}/${id_cuenta}`, {
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

export default getListLedgerByDateService;