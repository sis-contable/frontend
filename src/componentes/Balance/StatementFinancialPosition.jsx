import React from 'react';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import BalanceService from '../../services/balanceService/balanceService';

const StatementFinancialPosition = ({fechaDesde , fechaHasta}) => {
    
    const [activoCorriente , setActivoCorriente] = useState([]);
    const [activoNoCorriente , setActivoNoCorriente] = useState([]);
    const [pasivoCorriente , setPasivoCorriente] = useState([]);
    const [pasivoNoCorriente , setPasivoNoCorriente] = useState([]);
    const [patrimonioNeto , setPatrimonioNeto] = useState([]);
    const [totalActivos , setTotalActivos] = useState();
    const [totalPasivosPN , setPasivosPN] = useState();

    const fetchCurrentAsset = async () => {
        if (fechaDesde && fechaHasta) {
            const result = await BalanceService(fechaDesde , fechaHasta);
            const situacionPatrimonial = JSON.parse(result.situacionPatrimonial).Situacion_patrimonial;
            setActivoCorriente(situacionPatrimonial.activo_corriente);

            return activoCorriente;
        }
    }
    const fetchCurrentLiabilites = async () => {
        if (fechaDesde && fechaHasta) {
            const result = await BalanceService(fechaDesde , fechaHasta);
            const situacionPatrimonial = JSON.parse(result.situacionPatrimonial).Situacion_patrimonial;
            setPasivoCorriente(situacionPatrimonial.pasivo_corriente);

            return pasivoCorriente;
        }
    }

    const fetchNonCurrentAsset = async () => {
        if (fechaDesde && fechaHasta) {
            const result = await BalanceService(fechaDesde , fechaHasta);
            const situacionPatrimonial = JSON.parse(result.situacionPatrimonial).Situacion_patrimonial;
            setActivoNoCorriente(situacionPatrimonial.activo_no_corriente);

            return activoNoCorriente;
        }
    }
    const fetchNonCurrentLiabilites = async () => {
        if (fechaDesde && fechaHasta) {
            const result = await BalanceService(fechaDesde , fechaHasta);
            const situacionPatrimonial = JSON.parse(result.situacionPatrimonial).Situacion_patrimonial;
            setPasivoNoCorriente(situacionPatrimonial.pasivo_no_corriente);

            return pasivoNoCorriente;
        }
    }

    const fetchNetWorth = async () => {
        if (fechaDesde && fechaHasta) {
            const result = await BalanceService(fechaDesde , fechaHasta);
            const situacionPatrimonial = JSON.parse(result.situacionPatrimonial).Situacion_patrimonial;
            setPatrimonioNeto(situacionPatrimonial.patrimonio_neto);

            return patrimonioNeto;
        }
    }

    const fetchTotalAsset = async () => {
        if (fechaDesde && fechaHasta) {
            const result = await BalanceService(fechaDesde , fechaHasta);
            const situacionPatrimonial = JSON.parse(result.situacionPatrimonial).Situacion_patrimonial;
            setTotalActivos(situacionPatrimonial.total_activos);

            return totalActivos;
        }
    }

    const fetchTotalLiabilitesAndNetWorth = async () => {
        if (fechaDesde && fechaHasta) {
            const result = await BalanceService(fechaDesde , fechaHasta);
            const situacionPatrimonial = JSON.parse(result.situacionPatrimonial).Situacion_patrimonial;
            setPasivosPN(situacionPatrimonial.total_pasivos_pn);

            return totalPasivosPN;
        }
    }

    useEffect(() => {
        fetchCurrentAsset();
        fetchCurrentLiabilites();
        fetchNonCurrentAsset();
        fetchNonCurrentLiabilites();
        fetchNetWorth();
        fetchTotalAsset();
        fetchTotalLiabilitesAndNetWorth();
    }, [fechaDesde, fechaHasta]);

    return (
        <div className="container mt-4">
            <h4 className="text-center text-primary mb-4">Estado de Situación Patrimonial</h4>
            <div className="row g-4">
                {/* Activos */}
                <div className="col-md-6">
                    <Card className="shadow-sm border-0">
                        <Card.Header className="bg-primary text-white text-center">Activos</Card.Header>
                        <Card.Body>
                            <Table bordered hover responsive className="table-striped">
                                <thead className="table-light">
                                    <tr>
                                        <th>Rubro</th>
                                        <th>Importe ($)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="fw-bold table-secondary">
                                        <td>Activos Corrientes</td>
                                        <td></td>
                                    </tr>
                                    {activoCorriente.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.rubro}</td>
                                            <td>{item.total}</td>
                                        </tr>
                                    ))}
                                    <tr className="fw-bold table-secondary">
                                        <td>Activos No Corrientes</td>
                                        <td></td>
                                    </tr>
                                    {activoNoCorriente.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.rubro}</td>
                                            <td>{item.total}</td>
                                        </tr>
                                    ))}
                                    <tr className="fw-bold bg-success text-white">
                                        <td>Total del Activo</td>
                                        <td>{totalActivos}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </div>

                {/* Pasivos y Patrimonio Neto */}
                <div className="col-md-6">
                    <Card className="shadow-sm border-0">
                        <Card.Header className="bg-danger text-white text-center">Pasivos y Patrimonio Neto</Card.Header>
                        <Card.Body>
                            <Table bordered hover responsive className="table-striped">
                                <thead className="table-light">
                                    <tr>
                                        <th>Rubro</th>
                                        <th>Importe ($)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="fw-bold table-secondary">
                                        <td>Pasivos Corrientes</td>
                                        <td></td>
                                    </tr>
                                    {pasivoCorriente.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.rubro}</td>
                                            <td>{item.total}</td>
                                        </tr>
                                    ))}
                                    <tr className="fw-bold table-secondary">
                                        <td>Pasivos No Corrientes</td>
                                        <td></td>
                                    </tr>
                                    {pasivoNoCorriente.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.rubro}</td>
                                            <td>{item.total}</td>
                                        </tr>
                                    ))}
                                    <tr className="fw-bold table-secondary">
                                        <td>Patrimonio Neto</td>
                                        <td></td>
                                    </tr>
                                    {patrimonioNeto.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.rubro}</td>
                                            <td>{item.total}</td>
                                        </tr>
                                    ))}
                                    <tr className="fw-bold bg-warning text-white">
                                        <td>Total del Pasivo + Patrimonio Neto</td>
                                        <td>{totalPasivosPN}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default StatementFinancialPosition;