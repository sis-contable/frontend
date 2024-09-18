import React, { useState } from "react";

const FilterByKeyword = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");

  const handleFilter = () => {
    if (onSearch) {
      onSearch(keyword); // Enviamos la palabra clave al componente padre
    }
  };

  return (
    <div className="container-fluid">
      <div className="row g-2 justify-content-between">
        <div className="col-12 col-md-6">
          <input 
            type="text" 
            className="form-control" 
            value={keyword} 
            onChange={(e) => setKeyword(e.target.value)} 
            placeholder="Buscar" 
          />
        </div>
        <div className="col-12 col-md-6">
          <button
            type="button" 
            className="btn btn-primary"
            onClick={handleFilter}
          >Buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterByKeyword;