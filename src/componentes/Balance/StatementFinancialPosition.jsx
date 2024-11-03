import React from 'react';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
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
            <h4>Estado de Situación Patrimonial</h4>
            <div className="d-flex justify-content-evenly">
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
                            <td className='fw-bold'>Activos Corrientes</td>
                            <td></td>
                        </tr>
                        {activoCorriente.map((activoCorriente, index) => (
                        <tr key={index} className={activoCorriente}>
                            <td>{activoCorriente.rubro}</td>
                            <td>{activoCorriente.total}</td>
                        </tr>))}
                        <tr>
                            <td className='fw-bold'>Activos No Corrientes</td>
                            <td></td>
                        </tr>
                        {activoNoCorriente.map((activoNoCorriente, index) => (
                        <tr key={index} className={activoNoCorriente}>
                            <td>{activoNoCorriente.rubro}</td>
                            <td>{activoNoCorriente.total}</td>
                        </tr>))}
                        
                        <tr className='fw-bold'>
                            <td>TOTAL DEL ACTIVO</td>
                            <td>{totalActivos}</td>
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
                        {pasivoCorriente.map((pasivoCorriente, index) => (
                        <tr key={index} className={pasivoCorriente}>
                            <td>{pasivoCorriente.rubro}</td>
                            <td>{pasivoCorriente.total}</td>
                        </tr>))}
                        <tr>
                            <td style={{ fontWeight: 'bold' }}>Pasivos No Corrientes</td>
                            <td></td>
                        </tr>
                        {pasivoNoCorriente.map((pasivoNoCorriente, index) => (
                        <tr key={index} className={pasivoCorriente}>
                            <td>{pasivoNoCorriente.rubro}</td>
                            <td>{pasivoNoCorriente.total}</td>
                        </tr>))}
                        
                        <tr style={{ fontWeight: 'bold' }}>
                            <td>Patrimonio Neto</td>
                            <td></td>
                        </tr>
                        {patrimonioNeto.map((patrimonioNeto, index) => (
                        <tr key={index} className={patrimonioNeto}>
                            <td>{patrimonioNeto.rubro}</td>
                            <td>{patrimonioNeto.total}</td>
                        </tr>))}
                        <tr style={{ backgroundColor: '#a8f0a0', fontWeight: 'bold' }}>
                            <td>TOTAL DEL PASIVO + PATRIMONIO NETO</td>
                            <td>{totalPasivosPN}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default StatementFinancialPosition;