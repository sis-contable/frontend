import React, { useState } from "react";
import getListRegisterByDateService from "../../../services/booksService/diaryBookService/getListRegisterByDateService";

const SearchByDate = ({ onSearchDates }) => {
  const [fechaDesde , setFechaDesde] = useState('');
  const [fechaHasta , setFechaHasta] = useState('');
  const [loading, setLoading] = useState(false); // Para manejar el estado de carga

  const handleSearch = async () => {
    setLoading(true); // Iniciar el estado de carga
    const result = await getListRegisterByDateService(fechaDesde , fechaHasta); // Llamar al servicio
    console.log(fechaDesde , fechaHasta);
    if (result.error) {
      alert('Error al filtrar los registros');
    } else if (onSearchDates) {
      onSearchDates(result); // Enviar los datos filtrados al componente padre
    }
    setLoading(false); // Terminar el estado de carga
  };


  return (
    <div className="container-fluid ">
      <div className="row g-3 justify-content-between">
        {/* Campo para la fecha de inicio */}
        <div className="col-12 col-md-4">
          <label className="form-label">
            Desde
          </label>
          <input
            required
            name="fechaDesde"
            type="date"
            className="form-control"
            value={fechaDesde}
            onChange={(e) => setFechaDesde(e.target.value)} 
            placeholder="Desde"
          />
        </div>

        {/* Campo para la fecha de fin */}
        <div className="col-12 col-md-4">
          <label className="form-label">
            Hasta
          </label>
          <input
            required
            name="fechahasta"
            type="date"
            className="form-control"
            value={fechaHasta}
            onChange={(e) => setFechaHasta(e.target.value)} 
            placeholder="Hasta"
          />
        </div>

        {/* Botón de filtrar */}
        <div className="col-12 col-md-4 d-flex align-items-end">
          <button
            type="button"
            className="btn btn-primary "
            onClick={handleSearch}
            disabled={loading} // Deshabilitar el botón mientras se carga
          >
            {loading ? "Filtrando..." : "Filtrar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchByDate;