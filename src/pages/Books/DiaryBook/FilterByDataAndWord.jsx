import React, { useState } from "react";
import getListRegisterByDateService from "../../../services/booksService/diaryBookService/getListRegisterByDateService";
import getListRegisterByWordService from "../../../services/booksService/diaryBookService/getListRegisterByWordService";

const FilterByDataAndWord = ({ onSearchDates, onSearchKeyword }) => {
  // Estados para manejar las fechas de búsqueda y la palabra clave
  const [fechaDesde, setFechaDesde] = useState('');  // Estado para la fecha "Desde"
  const [fechaHasta, setFechaHasta] = useState('');  // Estado para la fecha "Hasta"
  const [keyword, setKeyword] = useState('');        // Estado para la palabra clave
  const [loadingDates, setLoadingDates] = useState(false); // Estado de carga para la búsqueda por fechas
  const [loadingKeyword, setLoadingKeyword] = useState(false); // Estado de carga para la búsqueda por palabra clave

  // Función que maneja la búsqueda por fechas
  const handleLookForByDate = async () => {
    setLoadingDates(true);  // Activar el estado de carga
    const result = await getListRegisterByDateService(fechaDesde, fechaHasta);  // Llamada al servicio de filtrado por fechas
    if (result.error) {
      alert('Error al filtrar por fechas');  // Manejo de errores
    } else if (onSearchDates) {
      onSearchDates(result[0]);  // Enviar los resultados al componente padre si no hay errores
    }
    setLoadingDates(false);  // Desactivar el estado de carga
  };

  // Función que maneja la búsqueda por palabra clave
  const handleLookForyKeyword = async () => {
    if (!keyword.trim()) {  // Validar que la palabra clave no esté vacía o llena de espacios
      alert("Por favor, ingresa una palabra clave para buscar.");
      return;
    }
    setLoadingKeyword(true);  // Activar el estado de carga
    const result = await getListRegisterByWordService(keyword);  // Llamada al servicio de filtrado por palabra clave
    if (result.error) {
      alert('Error al filtrar por palabra clave');  // Manejo de errores
    } else if (onSearchKeyword) {
      onSearchKeyword(result[0]);  // Enviar los resultados al componente padre si no hay errores
    }
    setLoadingKeyword(false);  // Desactivar el estado de carga
  };

  return (
    <div className="container">
      <div className="row g-3 text-center">
        
        {/* Bloque de Filtro por Fecha */}
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 d-flex justify-content-center">
          <div className="row g-3">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
              <label className="form-label">Desde</label>
              <input
                required
                name="fechaDesde"
                type="date"
                className="form-control"
                value={fechaDesde}
                onChange={(e) => setFechaDesde(e.target.value)}  // Actualiza el estado de "fechaDesde"
                placeholder="Desde"
              />
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
              <label className="form-label">Hasta</label>
              <input
                required
                name="fechaHasta"
                type="date"
                className="form-control"
                value={fechaHasta}
                onChange={(e) => setFechaHasta(e.target.value)}  // Actualiza el estado de "fechaHasta"
                placeholder="Hasta"
              />
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 d-flex align-items-end justify-content-center">
              <button
                type="button"
                className="btn btn-primary btn-md-sm"
                onClick={handleLookForByDate}  // Llama a la función de búsqueda por fecha al hacer clic
                disabled={loadingDates}  // Desactiva el botón si está en estado de carga
              >
                {loadingDates ? "Filtrando..." : "Filtrar por Fecha"}  {/* Texto que cambia según el estado de carga */}
              </button>
            </div>
          </div>
        </div>

        {/* Separador visual */}
        <div className="col-12 d-md-none">
          <hr />
        </div>

        {/* Bloque de Filtro por Palabra Clave */}
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 d-flex justify-content-center">
          <div className="row g-3">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-8 col-8">
              <label className="form-label">Buscar por palabra</label>
              <input
                required
                type="text"
                className="form-control"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}  // Actualiza el estado de "keyword"
                placeholder="Buscar"
                disabled={loadingKeyword}  // Desactiva el campo si está en estado de carga
              />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-4 col-4 d-flex align-items-end">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleLookForyKeyword}  // Llama a la función de búsqueda por palabra clave al hacer clic
                disabled={loadingKeyword}  // Desactiva el botón si está en estado de carga
              >
                {loadingKeyword ? "Buscando..." : "Buscar"}  {/* Texto que cambia según el estado de carga */}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FilterByDataAndWord;
