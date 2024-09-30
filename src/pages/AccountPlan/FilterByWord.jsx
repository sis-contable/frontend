import React, { useState } from "react";
import getListAccountPlanByWordService from "../../services/accountPlan/getListAccountPlanByWordService";

const FilterByWord = ({ onSearchKeyword }) => {

  const [keyword, setKeyword] = useState('');
  const [loadingToKeyword, setLoadingToKeyword] = useState(false); // Para manejar el estado de carga

  const handleLookForByKeyword = async () => {
    if (!keyword.trim()) {
      alert("Por favor, ingresa una palabra para buscar."); // Validar que el campo no esté vacío
      return;
    }
    setLoadingToKeyword(true); // Iniciar el estado de carga
  
    const result = await getListAccountPlanByWordService(keyword); // Llamar al servicio

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
        {/* Bloque de Filtro por Palabra Clave */}
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center">
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
                      onClick={handleLookForByKeyword}
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

export default FilterByWord;
