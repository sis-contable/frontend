import { Modal, Button } from 'react-bootstrap';
import deleteUserService from '../../services/deleteUserService';


const DeleteUser = ({ userId, onClose, onDelete}) => {
    const [showSuccess, setShowSuccess] = useState(false); // Estado para manejar el mensaje de eliminado con exito.
    // Función que maneja la eliminación del usuario
    const handleDeleteUser = async () => {

        // Si userId no está definido, muestra un error en la consola y retorna
        if (!userId) {
            console.error('El ID del usuario no está definido.');
            return;
        }

        try {
            const deleteRegister = await deleteUserService(userId); // Llama al servicio para eliminar el usuario y espera la respuesta
            if (deleteRegister) {
                setShowSuccess(true); // Muestra la alerta
                setTimeout(() => {
                    setShowSuccess(false); // Oculta la alerta después de 2 segundos
                    onDelete(); // Llama a onDelete después de la eliminación
                    onClose(); // Cierra el modal
                },700); 
            }
            
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
        }
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {showSuccess && (
                    <Alert variant="success" className="custom-alert">
                        Registro eliminado con éxito.
                    </Alert>
                )}
                <p>
                    ¿Estas seguro de eliminar este Usuario?
                </p>
            </Modal.Body>
            <Modal.Footer>
                {/* Botón para eliminar usuario */}
                <Button variant="danger" onClick={handleDeleteUser}>Eliminar</Button>
                {/* Botón para cerrar el modal sin guardar cambios */}
                <Button variant="secondary" onClick={onClose}>Cancelar</Button>
                
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteUser;