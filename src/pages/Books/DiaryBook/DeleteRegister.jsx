import { Modal, Button } from 'react-bootstrap';
import deleteRegisterService from '../../../services/booksService/diaryBookService/deleteRegisterService';


const DeleteRegister = ({ registerID, onClose, onDelete}) => {
    
    // Función que maneja la eliminación del registro
    const handleDeleteRegister = async () => {

        // Si registerID no está definido, muestra un error en la consola y retorna
        if (!registerID) {
            console.error('El ID del registro no está definido.');
            return;
        }

        try {
            const deleteUser = await deleteRegisterService(registerID); // Llama al servicio para eliminar el registro y espera la respuesta
            onDelete(); // Llama a onDelete después de la eliminación
            onClose(); // Cierra el modal
        } catch (error) {
            console.error('Error al eliminar registro:', error);
        }
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar Registro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    ¿Estas seguro de eliminar este Registro?
                </p>
                 
            </Modal.Body>
            <Modal.Footer>
                {/* Botón para eliminar registro */}
                <Button variant="danger" onClick={handleDeleteRegister}>Eliminar</Button>
                {/* Botón para cerrar el modal sin guardar cambios */}
                <Button variant="secondary" onClick={onClose}>Cancelar</Button>
                
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteRegister;