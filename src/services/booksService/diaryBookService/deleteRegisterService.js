const deleteRegisterService = async (registerID) => {
    try {

        console.log('ID del registro:', registerID); 
        const response = await fetch(`/api/deleteBookDiary/${registerID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log("ID N", registerID)
        if (response.ok) {
            console.log('Registro eliminado con éxito');
            return registerID;
        } else {
            console.error('Error al eliminar registro');
            return null;
        }
    } catch (error) {
        console.error('Error al eliminar registro:', error);
        return null;
    }
};

export default deleteRegisterService;