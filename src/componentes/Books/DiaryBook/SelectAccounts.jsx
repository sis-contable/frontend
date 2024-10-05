import React, { useEffect, useState } from 'react';
import {Form} from 'react-bootstrap';
import getAccountsService from '../../../services/booksService/diaryBookService/getAccountsService';

const SelectAccounts = ({ onAccountChange }) => {
    const [accountsOptions, setAccountsOptions] = useState([]);

    const fetchAccounts = async () => {
        try {
            const result = await getAccountsService();
            setAccountsOptions(result[0]);
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    };
    
    useEffect(() => {
        fetchAccounts();
    }, []);

    return (
        <Form.Select
            required
            onChange={(e) => onAccountChange(e.target.value)}
        >
            <option value="">Cuenta</option>
            {accountsOptions.map(account => (
                <option key={account.id_cuenta} value={account.id_cuenta}>
                    {account.cuenta}
                </option>
            ))}
        </Form.Select>
    );
};

export default SelectAccounts;