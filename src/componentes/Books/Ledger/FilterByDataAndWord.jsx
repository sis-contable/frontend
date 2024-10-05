import React, { useState , useEffect } from "react";
import getListLedgerByDateService from "../../../services/booksService/ledgerBookService/getListLedgerByDateService";
import getListLedgerByWordService from "../../../services/booksService/ledgerBookService/getListLedgerByWordService";
import getListLegerByDateService from "../../../services/booksService/ledgerBookService/listLedgerService";


const FilterByDataAndWord = ({ onSearchDates, onSearchKeyword, id_cuenta }) => {

  const [fechaDesde , setFechaDesde] = useState('');
  const [fechaHasta , setFechaHasta] = useState('');
  const [loadingToDate, setLoadingToDate] = useState(false); // Para manejar el estado de carga

  const handleSearchByDate = async () => {
    setLoadingToDate(true); // Iniciar el estado de carga
    const result = await getListLedgerByDateService(fechaDesde , fechaHasta); // Llamar al servicio

    if (result.error) {
      alert('Error al filtrar los registros');
    } else if (onSearchDates) {
      onSearchDates(result[0]); // Enviar los datos filtrados al componente padre
    }
    setLoadingToDate(false); // Terminar el estado de carga
  };


  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (keyword === '') {
      // Si el campo de palabra clave está vacío, reinicia la lista a los datos originales
      handleClearFilter(); // Función que limpia el filtro y muestra todos los registros
    } else {
      handleSearchByKeyword(keyword); // Ejecuta la búsqueda solo si hay un valor
    }
  }, [keyword]);

  const handleSearchByKeyword = async () => {
    const result = await getListLedgerByWordService(keyword); // Llamar al servicio
    if (result.error) {
      alert('Error al filtrar los registros');
    } else if (onSearchKeyword) {
      onSearchKeyword(result[0]); // Enviar los datos filtrados al componente padre
    }
  };

  // Función para restablecer el filtro (mostrar todos los registros)
  const handleClearFilter = async () => {
    const result = await getListLegerByDateService(id_cuenta); // Llama al servicio original para obtener todos los registros
    if (result.error) {
      alert('Error al cargar los registros');
    } else if (onSearchDates) {
      onSearchDates(result[0]); // Enviar los datos sin filtrar al componente padre
    }
  };

  return (
    <div className="container">
      <div className="row g-2 text-center">
        {/* Bloque de Filtro por Palabra Clave */}
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
          <div className="row g-3 d-flex justify-content-center">
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <label className="form-label">Detalle</label>
                    <input 
                      required
                      type="text" 
                      className="form-control" 
                      value={keyword} 
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder="Buscar" 
                    />
                </div>
          </div>
        </div>

        {/* Separador visual */}
        <div className="col-12 d-md-none">
          <hr/>
        </div>

        {/* Bloque de Filtro por Fecha */}
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
              <div className="row g-2">
                  <div className="col-xl-5 col-lg-4 col-md-6 col-sm-6 col-6">
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
                  <div className="col-xl-5 col-lg-4 col-md-6 col-sm-6 col-6">
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
                  <div className="col-xl-2 col-lg-4 col-md-12 col-sm-12 d-flex align-items-end justify-content-center">
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
      </div>
    </div>
  );
};

export default FilterByDataAndWord;
