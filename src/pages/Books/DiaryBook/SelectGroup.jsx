import React, { useEffect, useState } from 'react';
import {Form} from 'react-bootstrap';
import getGroupService from '../../../services/booksService/diaryBookService/getGroupService';

const SelectGroup = ({ onGroupChange }) => {
    const [groupOptions, setGroupOptions] = useState([]);

    const fetchGroups = async () => {
        try {
            const result = await getGroupService();
            setGroupOptions(result[0]);
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    };
    
    useEffect(() => {
        fetchGroups();
    }, []);

    return (
        <Form.Select
            required 
            onChange={(e) => onGroupChange(e.target.value)}
        >
            <option value="">Grupo</option>
            {groupOptions.map(group => (
                <option key={group.id_grupo} value={group.id_grupo}>
                    {group.grupo}
                </option>
            ))}
        </Form.Select>
    );
};

export default SelectGroup;