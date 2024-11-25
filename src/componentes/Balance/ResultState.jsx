import React from 'react';
import { useState, useEffect } from 'react';
import BalanceService from '../../services/balanceService/balanceService';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';


const ResultState = ({fechaDesde , fechaHasta}) => {
    const [resultadoPositivo , setResultadoPositivo] = useState([]);
    const [resultadoNegativo , setResultadoNegativo] = useState([]);
    const [resultadoEjercicio , setResultadoEjercicio] = useState();

    const fetchPositive = async () => {
        if (fechaDesde && fechaHasta) {
            const result = await BalanceService(fechaDesde , fechaHasta);
            const estadoResultado = JSON.parse(result.estadoResultado).Estado_resultado;
            setResultadoPositivo(estadoResultado.cuentas_resultado_positivo);
            return resultadoPositivo ;
        }
    }
    const fetchNegative = async () => {
        if (fechaDesde && fechaHasta) {
            const result = await BalanceService(fechaDesde , fechaHasta);
            const estadoResultado = JSON.parse(result.estadoResultado).Estado_resultado;
            setResultadoNegativo(estadoResultado.cuentas_resultado_negativo);
            return resultadoNegativo;
        }
    }

    const fetchResult = async () => {
        if (fechaDesde && fechaHasta) {
            const result = await BalanceService(fechaDesde , fechaHasta);
            const estadoResultado = JSON.parse(result.estadoResultado).Estado_resultado;
            setResultadoEjercicio(estadoResultado.ganancia_del_ejercicio);
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
                    Estado de Resultado
                </Card.Header>
                <Card.Body>
                    <Table bordered hover responsive className="table-striped">
                        <thead className="bg-secondary text-white">
                            <tr>
                                <th>Resultado</th>
                                <th className="text-center">$</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="fw-bold bg-light">
                                <td>Resultado Positivo</td>
                                <td></td>
                            </tr>
                            {resultadoPositivo.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.rubro}</td>
                                    <td className="text-center">{item.total}</td>
                                </tr>
                            ))}
                            <tr className="fw-bold bg-light">
                                <td>Resultado Negativo</td>
                                <td></td>
                            </tr>
                            {resultadoNegativo.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.rubro}</td>
                                    <td className="text-center">{item.total}</td>
                                </tr>
                            ))}
                            <tr className="bg-primary text-white fw-bold">
                                <td>GANANCIA (PÉRDIDA) DEL EJERCICIO</td>
                                <td className="text-center">{resultadoEjercicio}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ResultState;