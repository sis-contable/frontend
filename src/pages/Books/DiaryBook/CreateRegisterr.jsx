import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import SelectGroup from './SelectGroup';
import SelectType from './SelectType';

const CreateRegisterr = () => {
  const groupOptions = SelectGroup();
  const typeOptions = SelectType();
  
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Selected Group ID:', selectedGroup);
    console.log('Selected Type ID:', selectedType);
    // Perform actions with the selected IDs
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formGroupSelect">
        <Form.Label>Group</Form.Label>
        <Form.Control
          as="select"
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
        >
          <option value="" disabled hidden>Select a group</option>
          {groupOptions.map(group => (
            <option key={group.id_grupo} value={group.id_grupo}>
              {group.grupo}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formTypeSelect">
        <Form.Label>Type</Form.Label>
        <Form.Control
          as="select"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="" disabled hidden>Select a Type</option>
          {typeOptions.map(Type => (
            <option key={Type.id_tipo} value={Type.id_tipo}>
              {Type.tipo}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Button className="me-2" variant="primary" type="submit">Cargar Registro</Button>
      <Button variant="secondary" type="reset">
        Cancelar
      </Button>
    </Form>
  );
};

export default CreateRegisterr;