import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import getTypeService from '../../../services/booksService/diaryBookService/getTypeService';

const SelectType = ({ onTypeChange }) => {
    const [typeOptions, setTypeOptions] = useState([]);

    const fetchTypes = async () => {
        try {
            const result = await getTypeService();
            setTypeOptions(result[0]);
        } catch (error) {
            console.error('Error fetching types:', error);
        }
    };

    useEffect(() => {
        fetchTypes();
    }, []);

    return (
        <Form.Select
            required 
            onChange={(e) => onTypeChange(e.target.value)}
        >
            <option value="" >Tipo</option>
            {typeOptions.map(type => (
                <option key={type.id_tipo} value={type.id_tipo}>
                    {type.tipo}
                </option>
            ))}
        </Form.Select>
    );
};

export default SelectType;