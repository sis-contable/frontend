import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import getSubRubroService from '../../../services/booksService/diaryBookService/getSubRubroService';

const SelectSubRubro = ({ idRubro , onSubRubroChange }) => {
    const [subrubroOptions, setSubRubroOptions] = useState([]);

    const fetchSubRubros = async () => {
        try {
            const result = await getSubRubroService(idRubro);
            setSubRubroOptions(result[0]);
            
        } catch (error) {
            console.error('Error fetching Subrubros:', error);
        }
    };

    useEffect(() => {
        if (idRubro) {
            fetchSubRubros();
        }
    }, [idRubro]);

    const handleSubRubroChange = (e) => {
        const selectedSubRubro = e.target.value;
        onSubRubroChange(selectedSubRubro); // Llama a la función de callback con el rubro seleccionado
    };

    return (
        <Form.Select
            required 
            onChange={handleSubRubroChange}
        >
            <option value="">SubRubro</option>
            {subrubroOptions.map(subrubro => (
                <option key={subrubro.id_sub_rubro} value={subrubro.id_sub_rubro}>
                    {subrubro.sub_rubro}
                </option>
            ))}
        </Form.Select>
    );
};

export default SelectSubRubro;