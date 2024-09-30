import { Modal, Button } from 'react-bootstrap';
import deleteRegisterService from '../../../services/booksService/diaryBookService/deleteRegisterService';


const DeleteRegister = ({ registerID, onClose, onDelete}) => {
    
    // Función que maneja la eliminación del registro
    const handleDeleteRegister = async () => {
        const [showSuccess, setShowSuccess] = useState(false); // Estado para manejar el mensaje de cambios guardados
        // Si registerID no está definido, muestra un error en la consola y retorna
        if (!registerID) {
            console.error('El ID del registro no está definido.');
            return;
        }

        try {
            const id_registro = registerID.id_libro_diario;
            const deleteUser = await deleteRegisterService(id_registro); // Llama al servicio para eliminar el registro y espera la respuesta
            if (deleteUser) {
                setShowSuccess(true); // Muestra la alerta
                setTimeout(() => {
                    setShowSuccess(false); // Oculta la alerta después de 2 segundos
                    onDelete(deleteUser); // Llama a onDelete después de la eliminación
                    onClose(); // Cierra el modal
                },700); 
            }
            
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
                {/* Mostrar la alerta si showSuccess es true */}
                {showSuccess && (
                    <Alert variant="success" className="custom-alert">
                       Registro eliminado con exito.
                    </Alert>
                )}
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