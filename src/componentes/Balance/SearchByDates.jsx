import { useState } from "react";
import {Form , Button} from "react-bootstrap"

const SearchByDate = ({onGenerateBalance}) => {
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');

    const handleSubmit = (e) => {

        e.preventDefault();
        // Verifica que ambas fechas sean ingresadas
        if (fechaDesde && fechaHasta) {
            // Envía las fechas al componente padre a través de la prop onGenerateBalance
            onGenerateBalance(fechaDesde, fechaHasta);
        } else {
            alert("Por favor, ingrese ambas fechas.");
        }
    };

    return(
        <div className="container mt-4">
            <h3 className="text-center">Generar Balance</h3>
            <Form onSubmit={handleSubmit} className="mt-3 d-flex flex-column flex-md-row d-flex justify-content-evenly">
                <Form.Group controlId="fechaDesde">
                    <Form.Label>Desde</Form.Label>
                    <Form.Control 
                        type="date" 
                        value={fechaDesde} 
                        onChange={(e) => setFechaDesde(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Form.Group controlId="fechaHasta">
                    <Form.Label>Hasta</Form.Label>
                    <Form.Control 
                        type="date" 
                        value={fechaHasta} 
                        onChange={(e) => setFechaHasta(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Button className='mt-4 mb-4 p-2 ' variant="primary" type="submit">
                    Generar Balance
                </Button>
            </Form>
        </div>
    );
};

export default SearchByDate;