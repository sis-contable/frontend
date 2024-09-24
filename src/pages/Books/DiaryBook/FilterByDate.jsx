import React, { useState } from "react";
import getListRegisterByDateService from "../../../services/booksService/diaryBookService/getListRegisterByDate";

const SearchByDate = ({ onSearchDates }) => {
  const [jsonDates, setJsonDate] = useState({
    fecha_desde : '',
    fecha_hasta : ''
  });
  const [loading, setLoading] = useState(false); // Para manejar el estado de carga

  const handleSearch = async () => {
    setLoading(true); // Iniciar el estado de carga
    const result = await getListRegisterByDateService(jsonDates); // Llamar al servicio

    if (result.error) {
      alert('Error al filtrar los registros');
    } else if (onSearchDates) {
      onSearchDates(result); // Enviar los datos filtrados al componente padre
    }
    setLoading(false); // Terminar el estado de carga
  };

  // Función para actualizar las fechas
  const handleDateChange = (e) => {
    setJsonDate({
      ...jsonDates,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container-fluid">
      <div className="row g-3 justify-content-between">
        {/* Campo para la fecha de inicio */}
        <div className="col-12 col-md-4">
          <label className="form-label">
            Desde
          </label>
          <input
            required
            name="fecha_desde"
            type="date"
            className="form-control"
            value={jsonDates.fecha_desde}
            onChange={handleDateChange}
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
            name="fecha_hasta"
            type="date"
            className="form-control"
            value={jsonDates.fecha_hasta}
            onChange={handleDateChange}
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