import React from 'react';
import Table from 'react-bootstrap/Table';

const StatementFinancialPosition = () => {
    return (
        <div className="container mt-4">
            <h3>Estado de Situación Patrimonial</h3>
            <div className="d-flex justify-content-center">
                {/* Tabla de Activos */}
                <Table bordered hover style={{ width: '48%' }}>
                    <thead>
                        <tr>
                            <th>Activos</th>
                            <th>$</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ fontWeight: 'bold' }}>Activos Corrientes</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td style={{ paddingLeft: '20px' }}>Caja y Bancos</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td style={{ paddingLeft: '20px' }}>Inversiones</td>
                            <td></td>
                        </tr>
                        <tr style={{ fontWeight: 'bold' }}>
                            <td>Total de Activos Corrientes</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 'bold' }}>Activos No Corrientes</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td style={{ paddingLeft: '20px' }}>Créditos por ventas</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td style={{ paddingLeft: '20px' }}>Otros Créditos</td>
                            <td></td>
                        </tr>
                        <tr style={{ fontWeight: 'bold' }}>
                            <td>Total de Activos No Corrientes</td>
                            <td></td>
                        </tr>
                        <tr style={{ backgroundColor: '#a8f0a0', fontWeight: 'bold' }}>
                            <td>TOTAL DEL ACTIVO</td>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>

                {/* Tabla de Pasivos y Patrimonio Neto */}
                <Table bordered hover style={{ width: '48%' }}>
                    <thead>
                        <tr>
                            <th>Pasivos</th>
                            <th>$</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ fontWeight: 'bold' }}>Pasivos Corrientes</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td style={{ paddingLeft: '20px' }}>Préstamos a corto plazo</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td style={{ paddingLeft: '20px' }}>Cuentas por pagar</td>
                            <td></td>
                        </tr>
                        <tr style={{ fontWeight: 'bold' }}>
                            <td>Total de Pasivos Corrientes</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 'bold' }}>Pasivos No Corrientes</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td style={{ paddingLeft: '20px' }}>Préstamos a largo plazo</td>
                            <td></td>
                        </tr>
                        <tr style={{ fontWeight: 'bold' }}>
                            <td>Total de Pasivos No Corrientes</td>
                            <td></td>
                        </tr>
                        <tr style={{ fontWeight: 'bold' }}>
                            <td>Patrimonio Neto</td>
                            <td></td>
                        </tr>
                        <tr style={{ paddingLeft: '20px' }}>
                            <td>Total de Patrimonio Neto</td>
                            <td></td>
                        </tr>
                        <tr style={{ backgroundColor: '#a8f0a0', fontWeight: 'bold' }}>
                            <td>TOTAL DEL PASIVO + PATRIMONIO NETO</td>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default StatementFinancialPosition;