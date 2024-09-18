import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import SelectGroup from './SelectGroup';
import SelectType from './SelectType';
import SelectRubro from './SelectRubro';
import SelectSubRubro from './SelectSubrubro';
import SelectPaymentMethods from './SelectPaymentMethods';
import SelectAccounts from './SelectAccounts';

function CreateRegister() {
  const [formData, setFormData] = useState({
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
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Limpiar el formulario después de agregar el registro
    resetForm();
  };
  
  const resetForm = () => {
    console.log('resetForm');

    setFormData({
      fecha_registro: '',
      id_grupo: '',
      grupo: '',    
      id_tipo: '',
      tipo: '',     
      id_rubro: '',
      rubro: '',
      id_sub_rubro: '',    
      sub_rubro: '',
      id_forma_pago: '',
      forma_pago: '',
      id_cuenta: '',
      cuenta: '',
      descripcion: '',
      debe: '',
      haber: '',
      gestion: ''
    });

    console.log('..')
  };

  return (
    <Form onSubmit={handleSubmit} className="p-3 border rounded">
      <h5 className='mb-2'>Cargar Registro</h5>
      <Row className="align-items-center flex-nowrap overflow-auto pb-2 pt-2">
        <Col xs="auto">
          <Form.Control
            required
            type="date"
            name="fecha_registro"
            value={formData.fecha_registro}
            onChange={handleChange}
            placeholder="Fecha"
          />
        </Col>
        <Col xs="auto">
          <SelectGroup idGrupo={formData.id_grupo} onGroupChange={(value) => setFormData({ ...formData, id_grupo: value })} />
        </Col>
        <Col xs="auto">
          <SelectType idTipo={formData.id_tipo} onTypeChange={(value) => setFormData({ ...formData, id_tipo: value })} />
        </Col>
        <Col xs="auto">
          <SelectRubro idGrupo={formData.id_grupo} idTipo={formData.id_tipo} onRubroChange={(value) => setFormData({ ...formData, id_rubro: value })} />
        </Col>
        <Col xs="auto">
          <SelectSubRubro idRubro={formData.id_rubro} idSubRubro={formData.id_sub_rubro} onSubRubroChange={(value) => setFormData({ ...formData, id_sub_rubro: value })} />
        </Col>
        <Col xs="auto">
          <SelectPaymentMethods idFormaPago={formData.id_forma_pago} onPaymentChange={(value) => setFormData({ ...formData, id_forma_pago: value })} />
        </Col>
        <Col xs="auto">
          <SelectAccounts idCuenta={formData.id_cuenta} onAccountChange={(value) => setFormData({ ...formData, id_cuenta: value })} />
        </Col>
        <Col xs="auto">
          <Form.Control
            required
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
          />
        </Col>
        <Col xs="auto">
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
        <Col xs="auto">
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
        <Col xs="auto">
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
  );
}

export default CreateRegister;