import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import getPaymentMethodsService from '../../../services/booksService/diaryBookService/getPaymentMethodsService';


const SelectPaymentMethods = ({onPaymentChange}) => {
    const [paymentMethodsOptions, setPaymentMethodsOptions] = useState([]);

    const fetchPaymentMethods = async () => {
        try {
            const result = await getPaymentMethodsService();
            setPaymentMethodsOptions(result[0]);
        } catch (error) {
            console.error('Error fetching paymentMethods:', error);
        }
    };
    
    useEffect(() => {
        fetchPaymentMethods();
    }, []);

    return (
        <Form.Select
            required 
            onChange={(e) => onPaymentChange(e.target.value)}
        >
            <option value="">Forma de pago</option>
            {paymentMethodsOptions.map(paymentMethod => (
                <option key={paymentMethod.id_forma_pago} value={paymentMethod.id_forma_pago}>
                    {paymentMethod.forma_pago}
                </option>
            ))}
        </Form.Select>
    );
};

export default SelectPaymentMethods;