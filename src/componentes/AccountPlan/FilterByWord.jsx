import React, { useState , useEffect } from "react";
import getListAccountPlanByWordService from "../../services/accountPlan/getListAccountPlanByWordService";

const FilterByWord = ({ onSearchKeyword }) => {

  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (keyword === '') {
      // Si el campo de palabra clave está vacío, reinicia la lista a los datos originales
      handleClearFilter(); // Función que limpia el filtro y muestra todos los registros
    } else {
      handleLookForByKeyword(keyword); // Ejecuta la búsqueda solo si hay un valor
    }
  }, [keyword]);

  const handleLookForByKeyword = async () => {
    const result = await getListAccountPlanByWordService(keyword); // Llamar al servicio
    if (result.error) {
      alert('Error al filtrar los registros');
    } else if (onSearchKeyword) {
      onSearchKeyword(result[0]); // Enviar los datos filtrados al componente padre
    }
  };

  // Función para restablecer el filtro (mostrar todos los registros)
  const handleClearFilter = async () => {
    const result = await getListAccountPlanByWordService(); // Llama al servicio original para obtener todos los registros
    if (result.error) {
      alert('Error al cargar los registros');
    } else if (onSearchKeyword) {
      onSearchKeyword(result[0]); // Enviar los datos sin filtrar al componente padre
    }
  };

  return (
    <div className="container">
      <div className="row text-center">
        {/* Bloque de Filtro por Palabra Clave */}
        <div className="col-12 d-flex justify-content-center">
          <div className="row">
                <div className="col-12">
                  <label className="form-label">Buscar por palabra</label>
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
      </div>
    </div>
  );
};

export default FilterByWord;
