import React, { useState , useEffect } from 'react';
import { Form, Button, Row, Col , Alert} from 'react-bootstrap';
import SelectGroup from './SelectGroup';
import SelectType from './SelectType';
import SelectRubro from './SelectRubro';
import SelectSubRubro from './SelectSubrubro';
import SelectPaymentMethods from './SelectPaymentMethods';
import SelectAccounts from './SelectAccounts';
import createRegisterService from '../../../services/booksService/diaryBookService/createRegisterService';

function CreateRegister({ onAddRegister }) {

  const storedIdUsuario = localStorage.getItem('id_usuario');
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    id_usuario : storedIdUsuario || '', 
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
  });

  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      id_usuario: storedIdUsuario
    }));
  }, [storedIdUsuario]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const debe = parseFloat(formData.debe);
    const haber = parseFloat(formData.haber);

    if ((debe === 0 && haber === 0) || (debe > 0 && haber > 0)) {
      setShowAlert(true);
    } else {
      const createdRegister = await createRegisterService(formData);
      if (createdRegister.error) {
        // Mostrar la alerta de error si hubo un problema
      } else {
        setShowAlertSuccess(true);
        onAddRegister();
      }
    }
    resetForm();
  };
  
  const resetForm = () => {

    setFormData({
      id_usuario : storedIdUsuario || '',
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
    });

  };

  return (
    <>
    {showAlertSuccess && (
      <Alert variant="success" onClose={() => setShowAlertSuccess(false)} dismissible>
        ¡El registro se ha creado con éxito!
      </Alert>
    )}
    {showAlert && (
      <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
        "Debe" o "Haber" debe ser 0 , tampoco pueden ser los 2 valores 0.
      </Alert>
    )}
    <Form onSubmit={handleSubmit} className="p-3 border rounded m-4">
      <h5 className='mb-4'>Cargar Registro</h5>
      <Row className="align-items-center g-3 pb-2">
        <Col xs="12" md="6">
          <Form.Control
            required
            type="date"
            name="fecha_registro"
            value={formData.fecha_registro}
            onChange={handleChange}
            placeholder="Fecha"
          />
        </Col>
        <Col xs="12" md="6">
          <Form.Control
             className='d-none'
             type="text"
             name="id_usuario"
             value={storedIdUsuario}
             readOnly
          />
        </Col>
        <Col xs="12" md="6">
          <SelectGroup idGrupo={formData.id_grupo} onGroupChange={(value) => setFormData({ ...formData, id_grupo: value })} />
        </Col>
        <Col xs="12" md="6">
          <SelectType idTipo={formData.id_tipo} onTypeChange={(value) => setFormData({ ...formData, id_tipo: value })} />
        </Col>
        <Col xs="12" md="6">
          <SelectRubro idGrupo={formData.id_grupo} idTipo={formData.id_tipo} onRubroChange={(value) => setFormData({ ...formData, id_rubro: value })} />
        </Col>
        <Col xs="12" md="6">
          <SelectSubRubro idRubro={formData.id_rubro} idSubRubro={formData.id_sub_rubro} onSubRubroChange={(value) => setFormData({ ...formData, id_sub_rubro: value })} />
        </Col>
        <Col xs="12" md="6">
          <SelectPaymentMethods idFormaPago={formData.id_forma_pago} onPaymentChange={(value) => setFormData({ ...formData, id_forma_pago: value })} />
        </Col>
        <Col xs="12" md="6">
          <SelectAccounts idCuenta={formData.id_cuenta} onAccountChange={(value) => setFormData({ ...formData, id_cuenta: value })} />
        </Col>
        <Col xs="12" md="6">
          <Form.Control
            required
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
          />
        </Col>
        <Col xs="12" md="6">
          <Form.Control
            required
            type="number"
            name="debe"
            value={formData.debe}
            onChange={handleChange}
            placeholder="Debe"
            min={0}
          />
        </Col>
        <Col xs="12" md="6">
          <Form.Control
            required
            type="number"
            name="haber"
            value={formData.haber}
            onChange={handleChange}
            placeholder="Haber"
            min={0}
          />
        </Col>
        <Col xs="12" md="6">
          <Form.Select name="gestion" value={formData.gestion} onChange={handleChange} required>
            <option value="" >Gestion</option>
            <option value="1">Sí</option>
            <option value="0">No</option>
          </Form.Select>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="d-flex justify-content-end">
          <Button className="me-2" variant="primary" type="submit">Cargar Registro</Button>
          <Button variant="secondary" type="reset" onClick={resetForm}>
            Cancelar
          </Button>
        </Col>
      </Row>
    </Form>
    </>
  );
}

export default CreateRegister;