import React, { useState } from 'react';
import { Form, Button, Row, Col , Modal} from 'react-bootstrap';
import SelectGroup from './SelectGroup';
import SelectType from './SelectType';
import SelectRubro from './SelectRubro';
import SelectSubRubro from './SelectSubrubro';
import SelectPaymentMethods from './SelectPaymentMethods';
import SelectAccounts from './SelectAccounts';
import createRegisterService from '../../../services/booksService/diaryBookService/createRegisterService';
import { jwtDecode } from 'jwt-decode'; //importamos libreria para decodificar el token
import Cookies from 'js-cookie'; // Importamos la librería js-cookie para manejar cookies.

function CreateRegister({ show, onClose, onCreate }) {

  // Decodificamos el token para obtener el id_usuario
  const token = Cookies.get('access_token');
  const decodedToken = jwtDecode(token);
  const id_user = decodedToken.id_usuario; // Extraemos el id_usuario del token
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  // El estado inicial con un array de registros
  const [formData, setFormData] = useState([{
    id_usuario: id_user, 
    fecha_registro: '',
    id_grupo: '', 
    id_tipo: '',    
    id_rubro: '',
    id_sub_rubro: '',    
    id_forma_pago: '',
    id_cuenta: '',
    descripcion: '',
    debe: '',
    haber: '',
    gestion: ''
  }]);


  //Actualiza dinámicamente el valor del campo en un array de objetos `formData`.
  const handleChange = (e, index) => {
     // Extrae el nombre y el valor del campo que disparó el evento
    const { name, value } = e.target;
    // Crea una copia del array de datos del formulario para evitar modificar el estado directamente
    const updatedData = [...formData];
    // Actualiza el objeto correspondiente en el array, solo modificando el campo que ha cambiado
    updatedData[index] = {
      ...updatedData[index],  // Copia el contenido existente del objeto en ese índice
      [name]: value           // Actualiza el campo que corresponde al "name" del input con el nuevo valor
    };
    // Establece el nuevo estado de formData con el array actualizado
    setFormData(updatedData);
  };

  // Función para duplicar el formulario
  const handleAddForm = () => {
    if (formData.length < 6) {
      setFormData([...formData, {
        id_usuario: id_user,
        fecha_registro: formData[0].fecha_registro,
        id_grupo: '', 
        id_tipo: '',    
        id_rubro: '',
        id_sub_rubro: '',    
        id_forma_pago: '',
        id_cuenta: '',
        descripcion: '',
        debe: '',
        haber: '',
        gestion: ''
      }]);
    }
  };

  const handleRemoveRegister = () => {
    // Solo permite eliminar registros si hay más de uno
    if (formData.length > 1) {
      const updatedData = formData.slice(0, -1); // Elimina el último registro
      setFormData(updatedData);
    }
  };  

   // Función para guardar los cambios y llamar a la función 'onCreate' pasada como prop
   const handleCreateAsiento = async () => {

    let valid = true;
    let sumaDebe = 0;
    let sumaHaber = 0;
    // Verificamos que cada registro tenga valores válidos
    formData.forEach(data => {
      const debe = parseFloat(data.debe);
      const haber = parseFloat(data.haber);
      sumaDebe += debe;
      sumaHaber += haber;
      // Si "Debe" y "Haber" no son válidos en alguno de los registros, no procedemos
      if ((debe === 0 && haber === 0) || (debe > 0 && haber > 0)) {
        valid = false;
      } 
    });
  
    if (!valid || sumaDebe !== sumaHaber) {
      setShowModal(true);
    } else {
      // Si todo es válido, enviamos el array completo
      const createdRegister = await createRegisterService(formData);
      if (createdRegister.error) {
        // Mostrar la Modala de error si hubo un problema
        setShowModal(true);
      } else {
        setShowModalSuccess(true); // Muestra la Modala de éxito
        setTimeout(() => {
          setShowModalSuccess(false); // Oculta la Modala después de 2 segundos
          onCreate(createdRegister); // Llama a onCreate con el nuevo registro creado
          onClose(); // Cierra el modal
        }, 2000);
      }
    }
  };

    //Establecemos una forma inicial para que cuando cerremos el Pop Up, se reinicie a 0
    const initialFormData = [{
      id_usuario: id_user, 
      fecha_registro: '',
      id_grupo: '', 
      id_tipo: '',    
      id_rubro: '',
      id_sub_rubro: '',    
      id_forma_pago: '',
      id_cuenta: '',
      descripcion: '',
      debe: '',
      haber: '',
      gestion: ''
    }];
  
    //Agregamos un funcion para que vuelva todo a 0
    const handleClose = () => {
      setFormData(initialFormData); // Reinicia el formData
      onClose(); // Llama a la función onClose para cerrar el modal
    };
  

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
          <Modal.Title>Nuevo Asiento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          {/* Mostrar la Modala si showSuccess es true */}
          {showModalSuccess && (
            <Modal className='p-5' show={showModalSuccess} onHide={() => setShowModalSuccess(false)} >
                <Modal.Header className="bg-success text-white">
                </Modal.Header>
                <Modal.Body className="bg-success text-white ">
                  Registros cargado con exito.
                </Modal.Body>
                <Modal.Footer className="bg-success text-white">
                </Modal.Footer>
            </Modal>
          )}
          {showModal && (
            <Modal className='p-5' show={showModal} onHide={() => setShowModal(false)} >
                <Modal.Header className="bg-danger text-white">
                </Modal.Header>
                <Modal.Body className="bg-danger text-white ">
                  1 - Uno de los importes, "Debe" o "Haber", debe ser cero.
                  <br />
                  2 - No pueden ser ambos importes cero simultáneamente.
                  <br />
                  3 - La suma total de los importes en "Debe" debe ser igual a 
                  <br />la suma total de los importes en "Haber".
                </Modal.Body>
                <Modal.Footer className="bg-danger text-white">
                </Modal.Footer>
            </Modal>
          )}
      {/* Renderizamos múltiples formularios */}
      {formData.map((data, index) => (
          <Form key={index}>
            <h6>Asiento: {index + 1}</h6> {/* Muestra el número del formulario */}
            <Row className="align-items-center g-3 pb-2">
              <Col xs="12" md="6">
                <Form.Control
                  required
                  type="date"
                  name="fecha_registro"
                  value={data.fecha_registro}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Fecha"
                />
              </Col>
              <Col xs="12" md="6">
                <Form.Control
                  className='d-none'
                  type="text"
                  name="id_usuario"
                  value={data.id_usuario}
                  readOnly
                />
              </Col>
              <Col xs="12" md="6">
                <SelectGroup idGrupo={data.id_grupo} onGroupChange={(value) => handleChange({ target: { name: 'id_grupo', value } }, index)} />
              </Col>
              <Col xs="12" md="6">
                <SelectType idTipo={data.id_tipo} onTypeChange={(value) => handleChange({ target: { name: 'id_tipo', value } }, index)} />
              </Col>
              <Col xs="12" md="6">
                <SelectRubro idGrupo={data.id_grupo} idTipo={data.id_tipo} onRubroChange={(value) => handleChange({ target: { name: 'id_rubro', value } }, index)} />
              </Col>
              <Col xs="12" md="6">
                <SelectSubRubro idRubro={data.id_rubro} idSubRubro={data.id_sub_rubro} onSubRubroChange={(value) => handleChange({ target: { name: 'id_sub_rubro', value } }, index)} />
              </Col>
              <Col xs="12" md="6">
                <SelectAccounts idCuenta={data.id_cuenta} onAccountChange={(value) => handleChange({ target: { name: 'id_cuenta', value } }, index)} />
              </Col>
              <Col xs="12" md="6">
                <SelectPaymentMethods idFormaPago={data.id_forma_pago} onPaymentChange={(value) => handleChange({ target: { name: 'id_forma_pago', value } }, index)} />
              </Col>
              <Col xs="12" md="6">
                <Form.Control
                  required
                  type="text"
                  name="descripcion"
                  value={data.descripcion}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Descripción"
                />
              </Col>
              <Col xs="12" md="6">
                <Form.Control
                  required
                  type="number"
                  name="debe"
                  value={data.debe}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Debe"
                  min={0}
                />
              </Col>
              <Col xs="12" md="6">
                <Form.Control
                  required
                  type="number"
                  name="haber"
                  value={data.haber}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Haber"
                  min={0}
                />
              </Col>
              <Col xs="12" md="6">
                <Form.Select name="gestion" value={data.gestion} onChange={(e) => handleChange(e, index)} required>
                  <option value="">Gestion</option>
                  <option value="1">Sí</option>
                  <option value="0">No</option>
                </Form.Select>
              </Col>
            </Row>
            <hr/>
          </Form>
        ))}
    </Modal.Body>
          <Modal.Footer>
            <Row className="mt-3">
              <Col className="btn btn-sm me-5">
                <Button className="me-2" variant="danger" type="button" onClick={handleRemoveRegister}>
                  -
                </Button>
                <Button variant="success" onClick={handleAddForm}>
                  +
                </Button>
              </Col>
              <Col className="d-flex justify-content-end">
              {/* Botón para guardar cambios y cerrar el modal */}
                <Button className="me-2 btn-sm" variant="primary" onClick={handleCreateAsiento}>Guardar</Button>
                {/* Mostrar la Modala si showSuccess es true */}
                {/* Botón para cerrar el modal sin guardar cambios */}
                <Button className="btn-sm" variant="secondary" onClick={handleClose}>Cancelar</Button>
              </Col>
            </Row>
          </Modal.Footer>
  </Modal>
  );
}

export default CreateRegister;