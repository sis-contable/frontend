const deleteRegisterService = async (registrerID) => {
    try {

        console.log('ID del registro:', registrerID); 
        const response = await fetch(`http://localhost:3000/deleteRegister/${registrerID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.ok) {
            console.log('Registro eliminado con éxito');
            return registrerID;
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