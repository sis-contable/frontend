import React from 'react';
import { useState } from 'react';
import SearchByDate from '../../componentes/Balance/searchByDates';
import ResultState from '../../componentes/Balance/resultState';
import ClosingSeat from '../../componentes/Balance/ClosingSeat';
import StatementFinancialPosition from '../../componentes/Balance/StatementFinancialPosition';

const Balance = () => {
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');

    const handleGenerateBalance = (desde, hasta) => {
        setFechaDesde(desde);
        setFechaHasta(hasta);
    };

    return (
        <div className="container mt-4">
            <SearchByDate onGenerateBalance={handleGenerateBalance} />
            {fechaDesde && fechaHasta && (
                <div>
                    <div className="d-flex flex-column flex-md-row justify-content-evenly mt-4">
                        <div className="flex-fill mb-3">
                            <ResultState fechaDesde={fechaDesde} fechaHasta={fechaHasta} />
                        </div>
                        <div className="flex-fill mb-3">
                            <ClosingSeat fechaDesde={fechaDesde} fechaHasta={fechaHasta} />
                        </div>
                    </div>
                    <div className="mt-3">
                        <StatementFinancialPosition fechaDesde={fechaDesde} fechaHasta={fechaHasta} />
                    </div>
                </div>
            )}
        </div>
        
    );
};

export default Balance;