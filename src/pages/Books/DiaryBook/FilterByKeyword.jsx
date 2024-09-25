import React, { useState } from "react";
import getListRegisterByWordService from "../../../services/booksService/diaryBookService/getListRegisterByWordService";

const SearchByKeyword = ({ onSearchKeyword }) => {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false); // Para manejar el estado de carga

  const handleSearch = async () => {
    if (!keyword.trim()) {
      alert("Por favor, ingresa una palabra clave para buscar."); // Validar que el campo no esté vacío
      return;
    }
    setLoading(true); // Iniciar el estado de carga
  
    const result = await getListRegisterByWordService(keyword); // Llamar al servicio

    if (result.error) {
      alert('Error al filtrar los registros');
    } else if (onSearchKeyword) {
      onSearchKeyword(result[0]); // Enviar los datos filtrados al componente padre
    }
    setLoading(false); // Terminar el estado de carga
  };


  return (
    <div className="container-fluid">
      <div className="row g-2 justify-content-between ">
        <div className="col-12 col-md-6">
          <label className="form-label">Buscar por palabra</label>
          <input 
            required
            type="text" 
            className="form-control" 
            value={keyword} 
            onChange={(e) => setKeyword(e.target.value)} 
            placeholder="Buscar" 
            disabled={loading} // Deshabilitar el campo mientras está cargando
          />
        </div>
        <div className="col-12 col-md-6 mt-4 d-flex align-items-end">
          <button
            type="button" 
            className="btn btn-primary"
            onClick={handleSearch}
            disabled={loading} // Deshabilitar el botón mientras está cargando
          >{loading ? "Buscando..." : "Buscar"} {/* Mostrar estado de búsqueda */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchByKeyword;