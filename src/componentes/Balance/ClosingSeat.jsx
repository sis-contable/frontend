import React from 'react';
import { useState , useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import BalanceService from '../../services/balanceService/balanceService';

const ClosingSeat = ({fechaDesde , fechaHasta}) => {

    const [resultadoPositivo , setResultadoPositivo] = useState([]);
    const [resultadoNegativo , setResultadoNegativo] = useState([]);
    const [resultadoEjercicio , setResultadoEjercicio] = useState();

    const fetchPositive = async () => {
        if (fechaDesde && fechaHasta) {
            const result = await BalanceService(fechaDesde , fechaHasta);
            const estadoAsiento = JSON.parse(result.asientoCierre).Asiento_cierre;
            setResultadoPositivo(estadoAsiento.cuentas_resultado_positivo);
            return resultadoPositivo;
        }
    }
    const fetchNegative = async () => {
        if (fechaDesde && fechaHasta) {
            const result = await BalanceService(fechaDesde , fechaHasta);
            const estadoAsiento = JSON.parse(result.asientoCierre).Asiento_cierre;
            setResultadoNegativo(estadoAsiento.cuentas_resultado_negativo);

            return resultadoNegativo;
        }
    }

    const fetchResult = async () => {
        if (fechaDesde && fechaHasta) {
            const result = await BalanceService(fechaDesde , fechaHasta);
            const estadoAsiento = JSON.parse(result.asientoCierre).Asiento_cierre;
            setResultadoEjercicio(estadoAsiento.resultado_ejercico);

            return resultadoEjercicio;
        }
    }

    useEffect(() => {
        fetchPositive();
        fetchNegative();
        fetchResult();
    }, [fechaDesde, fechaHasta]);

    return (
        <div className="container mt-4">
            <Card className="shadow-sm border-0 mb-4">
                <Card.Header className="bg-secondary text-white text-center fw-bold">
                    Asiento de Cierre
                </Card.Header>
                <Card.Body>
                    <Table bordered hover responsive className="table-striped">
                        <thead className="bg-secondary text-white">
                            <tr>
                                <th>Asiento de Cierre</th>
                                <th className="text-center">Debe</th>
                                <th className="text-center">Haber</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="fw-bold bg-light">
                                <td>Resultado Positivo</td>
                                <td></td>
                                <td></td>
                            </tr>
                            {resultadoNegativo.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.rubro}</td>
                                    <td className="text-center">{item.haber}</td>
                                    <td></td>
                                </tr>
                            ))}
                            <tr className="fw-bold bg-light">
                                <td>Resultado Negativo</td>
                                <td></td>
                                <td></td>
                            </tr>
                            {resultadoPositivo.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.rubro}</td>
                                    <td></td>
                                    <td className="text-center">{item.debe}</td>
                                </tr>
                            ))}
                            <tr className="bg-primary text-white fw-bold">
                                <td>RESULTADO DEL EJERCICIO</td>
                                <td></td>
                                <td className="text-center">{resultadoEjercicio}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ClosingSeat;