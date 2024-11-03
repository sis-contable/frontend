import React from 'react';
import Table from 'react-bootstrap/Table';

const ClosingSeat = () => {
    return (
        <div className="container mt-4">
            <h3>Asiento de Cierre</h3>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Asiento de cierre</th>
                        <th>Debe</th>
                        <th>Haber</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ fontWeight: 'bold' }}>Resultados positivos</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td style={{ paddingLeft: '20px' }}>Ventas de bienes</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td style={{ paddingLeft: '20px' }}>Ventas de Servicios</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td style={{ fontWeight: 'bold' }}>Resultados negativos</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td style={{ paddingLeft: '20px' }}>Costo de ventas</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td style={{ paddingLeft: '20px' }}>Gastos administrativos</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr style={{ backgroundColor: '#a8f0a0', fontWeight: 'bold' }}>
                        <td>Resultado del ejercicio</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default ClosingSeat;