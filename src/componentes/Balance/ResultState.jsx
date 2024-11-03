import React from 'react';
import Table from 'react-bootstrap/Table';

const ResultState = () => {
    return (
        <div className="container mt-4">
            <h3>Estado de resultado</h3>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Sub rubro</th>
                        <th>$</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Ventas de bienes(o servicios)</td><td></td></tr>
                    <tr><td>Costos de bienes vendidos</td><td></td></tr>
                    <tr>
                        <td style={{ fontWeight: 'bold' }}>Ganancia (Pérdida) bruta</td>
                        <td></td>
                    </tr>
                    <tr><td>Gastos de comercialización</td><td></td></tr>
                    <tr><td>Gastos de administración</td><td></td></tr>
                    <tr><td>Otros gastos</td><td></td></tr>
                    <tr><td>Resultados Financieros y por tenencia:</td><td></td></tr>
                    <tr>
                        <td style={{ paddingLeft: '20px' }}>Generados por Activos</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td style={{ paddingLeft: '20px' }}>Generados por Pasivos</td>
                        <td></td>
                    </tr>
                    <tr><td>Otros ingresos y egresos</td><td></td></tr>
                    <tr>
                        <td style={{ fontWeight: 'bold' }}>Ganancia (Pérdida) antes del impuesto a las ganancias</td>
                        <td></td>
                    </tr>
                    <tr><td>Impuesto a las ganancias</td><td></td></tr>
                    <tr><td>Ganancia (Pérdida) a las operaciones ordinarias</td><td></td></tr>
                    <tr><td>Resultado de operaciones extraordinarias</td><td></td></tr>
                    <tr style={{ backgroundColor: '#a8f0a0', fontWeight: 'bold' }}>
                        <td>GANANCIA(PERDIDA) DEL EJERCICIO</td>
                        <td></td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default ResultState;