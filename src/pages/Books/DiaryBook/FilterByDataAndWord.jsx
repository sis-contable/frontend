import React, { useState } from "react";
import getListRegisterByDateService from "../../../services/booksService/diaryBookService/getListRegisterByDateService";
import getListRegisterByWordService from "../../../services/booksService/diaryBookService/getListRegisterByWordService";

const FilterByDataAndWord = ({ onSearchDates, onSearchKeyword }) => {
  const [fechaDesde , setFechaDesde] = useState('');
  const [fechaHasta , setFechaHasta] = useState('');
  const [loadingToDate, setLoadingToDate] = useState(false); // Para manejar el estado de carga

  const handleSearchByDate = async () => {
    setLoadingToDate(true); // Iniciar el estado de carga
    const result = await getListRegisterByDateService(fechaDesde , fechaHasta); // Llamar al servicio
    console.log(fechaDesde , fechaHasta);
    if (result.error) {
      alert('Error al filtrar los registros');
    } else if (onSearchDates) {
      onSearchDates(result[0]); // Enviar los datos filtrados al componente padre
    }
    setLoadingToDate(false); // Terminar el estado de carga
  };


  const [keyword, setKeyword] = useState('');
  const [loadingToKeyword, setLoadingToKeyword] = useState(false); // Para manejar el estado de carga

  const handleSearchByKeyword = async () => {
    if (!keyword.trim()) {
      alert("Por favor, ingresa una palabra clave para buscar."); // Validar que el campo no esté vacío
      return;
    }
    setLoadingToKeyword(true); // Iniciar el estado de carga
  
    const result = await getListRegisterByWordService(keyword); // Llamar al servicio

    if (result.error) {
      alert('Error al filtrar los registros');
    } else if (onSearchKeyword) {
      onSearchKeyword(result[0]); // Enviar los datos filtrados al componente padre
    }
    setLoadingToKeyword(false); // Terminar el estado de carga
  };

  return (
    <div className="container">
      <div className="row g-3 text-center">
        
        {/* Bloque de Filtro por Fecha */}
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 d-flex justify-content-center">
              <div className="row g-3">
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
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
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
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
                  <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 d-flex align-items-end justify-content-center">
                      <button
                      type="button"
                      className="btn btn-primary "
                      onClick={handleSearchByDate}
                      disabled={loadingToDate} // Deshabilitar el botón mientras se carga
                    >
                      {loadingToDate ? "Filtrando..." : "Filtrar"}
                    </button> 
                  </div>
              </div>
        </div>

        {/* Separador visual */}
        <div className="col-12 d-md-none">
          <hr/>
        </div>

        {/* Bloque de Filtro por Palabra Clave */}
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 d-flex justify-content-center">
          <div className="row g-3">
                <div className="col-xl-8 col-lg-6 col-md-6 col-sm-8 col-8">
                    <label className="form-label">Buscar por palabra</label>
                    <input 
                      required
                      type="text" 
                      className="form-control" 
                      value={keyword} 
                      onChange={(e) => setKeyword(e.target.value)} 
                      placeholder="Buscar" 
                      disabled={loadingToKeyword} // Deshabilitar el campo mientras está cargando
                    />
                </div>
                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-4 col-4 d-flex align-items-end">
                    <button
                      type="button" 
                      className="btn btn-primary"
                      onClick={handleSearchByKeyword}
                      disabled={loadingToKeyword} // Deshabilitar el botón mientras está cargando
                    >{loadingToKeyword ? "Buscando..." : "Buscar"} {/* Mostrar estado de búsqueda */}
                    </button>
                </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FilterByDataAndWord;
