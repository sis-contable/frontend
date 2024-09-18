import React, { useState } from "react";
import { Container } from "react-bootstrap";

const FilterByDate = ({ onFilter }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFilter = () => {
    if (onFilter) {
      onFilter(startDate, endDate); // Enviamos las fechas seleccionadas al componente padre
    }
  };

  return (
    <div className="container-fluid">
      <div className="row g-2 justify-content-between">
        <div className="d-flex col-12 col-md-4">
          <input 
            required
            type="date" 
            className="form-control" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
            placeholder="Desde" 
          />
        </div>
        <div className="d-flex col-12 col-md-4">
          <input 
            required
            type="date" 
            className="form-control" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
            placeholder="Hasta" 
          />
        </div>
        <div className="col-12 col-md-4">
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={handleFilter}
          >
            Filtrar
          </button>
        </div>
      </div>
    </div>
  );
};


export default FilterByDate;