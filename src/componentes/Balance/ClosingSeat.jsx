import React from 'react';
import { useState , useEffect } from 'react';
import Table from 'react-bootstrap/Table';
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
            <h4>Asiento de Cierre</h4>
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
                        <th>Resultado Positivo</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {resultadoPositivo.map((resultadoPositivo, index) => (
                        <tr key={index} className={resultadoPositivo}>
                            <td>{resultadoPositivo.rubro}</td>
                            <td>{resultadoPositivo.debe}</td>
                        <td></td>
                        </tr>))}

                        <tr>
                        <th>Resultado Negativo</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {resultadoNegativo.map((resultadoNegativo, index) => (
                        <tr key={index} className={resultadoNegativo}>
                            <td>{resultadoNegativo.rubro}</td>
                            <td></td>
                            <td>{resultadoNegativo.haber}</td>
                        </tr>))}
                   
                    <tr className='bg-primary fw-bold'>
                        <td>RESULTADO DEL EJERCICIO</td>
                        <td></td>
                        <td>{resultadoEjercicio}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default ClosingSeat;