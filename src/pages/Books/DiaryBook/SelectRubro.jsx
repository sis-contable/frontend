import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import getRubroService from '../../../services/booksService/diaryBookService/getRubroService';

const SelectRubro = ({ idGrupo, idTipo , onRubroChange }) => {
    const [rubroOptions, setRubroOptions] = useState([]);

    const fetchRubros = async () => {
        try {
            const result = await getRubroService(idGrupo, idTipo);
            setRubroOptions(result[0]);
        } catch (error) {
            console.error('Error fetching rubros:', error);
        }
    };

    useEffect(() => {
        if (idGrupo && idTipo) {
            fetchRubros();
        }
    }, [idGrupo, idTipo]);

    const handleRubroChange = (e) => {
        const selectedRubro = e.target.value;
        onRubroChange(selectedRubro); // Llama a la función de callback con el rubro seleccionado
    };

    return (
        <Form.Select
            required 
            onChange={handleRubroChange}
        >
            <option value="">Rubro</option>
            {rubroOptions.map(rubro => (
                <option key={rubro.id_rubro} value={rubro.id_rubro}>
                    {rubro.rubro}
                </option>
            ))}
        </Form.Select>
    );
};

export default SelectRubro;