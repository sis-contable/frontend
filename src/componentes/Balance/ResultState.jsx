import React from 'react';
import { useState, useEffect } from 'react';
import BalanceService from '../../services/balanceService/balanceService';
import Table from 'react-bootstrap/Table';


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
            <h4>Estado de resultado</h4>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Resultado</th>
                        <th>$</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Resultado Positivo</th>
                        <th></th>
                    </tr>
                    {resultadoNegativo.map((resultadoNegativo, index) => (
                        <tr key={index} className={resultadoNegativo}>
                        <td>{resultadoNegativo.rubro}</td>
                        <td>{resultadoNegativo.total}</td>
                        </tr>))}

                        <tr>
                        <th>Resultado Negativo</th>
                        <th></th>
                    </tr>
                    {resultadoPositivo.map((resultadoPositivo, index) => (
                        <tr key={index} className={resultadoPositivo}>
                        <td>{resultadoPositivo.rubro}</td>
                        <td>{resultadoPositivo.total}</td>
                        </tr>))}
                   
                    <tr className='bg-primary fw-bold'>
                        <td>GANANCIA(PERDIDA) DEL EJERCICIO</td>
                        <td>{resultadoEjercicio}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default ResultState;