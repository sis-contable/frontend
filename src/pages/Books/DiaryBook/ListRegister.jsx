import React, { useState , useEffect } from "react";
import { Table, Pagination, Button } from "react-bootstrap";
import { BsCheckLg } from "react-icons/bs"; // Ícono de tilde grande
import CreateRegister from "./CreateRegister";
import listRegisterService from "../../../services/booksService/diaryBookService/listRegisterService";
import DeleteRegister from "./DeleteRegister";
import FilterByDate from "./FilterByDate";
import FilterByKeyword from "./FilterByKeyword";

const ListRegister = () => {

  const [registros, setRegistros] = useState([]);  // Estado para almacenar los registros
  const [selectedRegisterID, setSelectedRegisterID] = useState(null); // Estado para almacenar el ID del registro seleccionado para eliminar
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para controlar la visibilidad del modal de eliminacion
  const [selectedRowData, setSelectedRowData] = useState(null); // Estado para los datos de la fila seleccionada
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5; // Define el número de registros por página
  const [startDate, setStartDate] = useState(""); // Fecha de inicio para filtro
  const [endDate, setEndDate] = useState(""); // Fecha de fin para filtro
  const [keyword, setKeyword] = useState(""); // Palabra clave para búsqueda

  // Función asincrónica para obtener los datos de la API
  const fetchData = async () => {
    try {
        // Llamamos a la función del servicio para obtener la lista de registros
        const result = await listRegisterService();
        // Actualizamos el estado 'registers' con los datos obtenidos
        setRegistros(result[0]); // Establecer solo el primer elemento que contiene los registros
    } catch (error) {
        console.error('Error fetching users:', error);// Si ocurre un error, lo mostramos en la consola
    }
  };

  // useEffect se ejecuta después del primer renderizado y cuando el componente se actualiza
  useEffect(() => {
    fetchData();// Ejecutamos la función para obtener los datos
  }, []);

  const handleFilterByDate = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    fetchData(start, end, keyword); // Filtrar por fecha
  };

  const handleFilterByKeyword = (searchTerm) => {
    setKeyword(searchTerm);
    fetchData(startDate, endDate, searchTerm); // Buscar por palabra clave
  };

  // Calcula los índices de los registros a mostrar en la página actual
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = registros.slice(indexOfFirstRecord, indexOfLastRecord);

  // Calcula el número total de páginas
  const totalPages = Math.ceil(registros.length / recordsPerPage);

  // Función para cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //funcion para mostrar el formato de la fecha para el registro
  const formatDate = (isoString) => {
    const date = new Date(isoString); // Crea un objeto Date a partir del string ISO
    return date.toLocaleDateString('es-ES', { // Formatea la fecha
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
    });
  };

  // Manejar la selección de una fila y guardar sus datos
  const handleRowClick = (registro) => {
    setSelectedRowData(registro); // Guarda los datos de la fila seleccionada
    console.log("Datos de la fila seleccionada:", registro); // Muestra los datos en la consola
  };
  
  // Función para manejar el clic en el botón de eliminar
  const handleDeleteClick = () => {
    if (selectedRowData) {
      setSelectedRegisterID(selectedRowData); // Usa el ID del registro seleccionado
      setShowDeleteModal(true); // Muestra el modal de confirmación
    }
  };

  // Función para manejar la eliminacion del registro 
  const handleDelete = () => {
    fetchData(); // Actualiza la lista de registros
    setShowDeleteModal(false); // Cierra el modal
    setSelectedRegisterID(null); // Limpia el ID del registro seleccionado
};

// Función para cerrar el modal de eliminacion
const handleCloseDelete = () => {
  setShowDeleteModal(false); // Cierra el modal
  setSelectedRegisterID(null); // Limpia el ID del registro seleccionado
};

  return (
    
    <div className="container-fluid ">
      <h4 className='mb-3'>Registros</h4>
      <div className="d-flex justify-content-evenly  mb-2">
        <FilterByDate onFilter={handleFilterByDate} />
        <FilterByKeyword onSearch={handleFilterByKeyword} />
      </div>
      <div className="table-responsive text-center">
        <Table striped bordered hover className="table-sm">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Grupo</th>
            <th>Tipo</th>
            <th>Rubro</th>
            <th>Subrubro</th>
            <th className="mw-150 text-truncate">Forma de pago</th>
            <th>Cuenta</th>
            <th>Descripción</th>
            <th>Debe</th>
            <th>Haber</th>
            <th>Gestión</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((registro, index) => (
            <tr key={index}
            onClick={() => handleRowClick(registro)} // Guarda los datos de la fila al hacer clic
            style={{ cursor: 'pointer' }}
            className={selectedRowData === registro ? "table-primary" : ""}
            >
              <td>{formatDate(registro.fecha_registro)}</td>
              <td>{registro.grupo}</td>
              <td>{registro.tipo}</td>
              <td>{registro.rubro}</td>
              <td>{registro.sub_rubro}</td>
              <td>{registro.forma_pago}</td>
              <td>{registro.cuenta}</td>
              <td>{registro.descripcion}</td>
              <td>{registro.debe}</td>
              <td>{registro.haber}</td>
              <td className="ta-center">
                {registro.gestion === 1 ? <BsCheckLg size={24} /> : null}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '10px' }}>
        <Pagination className="">
          <Pagination.Prev 
            onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)} 
            disabled={currentPage === 1} 
          />
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
            <Pagination.Item 
              key={number} 
              active={number === currentPage} 
              onClick={() => handlePageChange(number)}>
              {number}
            </Pagination.Item>
          ))}
          <Pagination.Next 
            onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)} 
            disabled={currentPage === totalPages} 
          />
        </Pagination>
        <div style={{ display: 'flex', justifyContent: 'space-between' , marginBottom: '20px' }}>
          <Button
            variant="secondary" 
            onClick={() => handleDeleteClick()} 
            disabled={!selectedRowData}
          >
            Eliminar
          </Button>
        </div>
      </div>
      
      {selectedRegisterID !== null && (   // Si hay un ID de registro seleccionado (no es null), muestra el componente DeleteRegister
          <DeleteRegister
              registerID={selectedRegisterID} // Pasa el ID del registro seleccionado como prop
              onDelete={handleDelete} // Pasa la función handleDelete como prop para manejar la eliminación
              onClose={handleCloseDelete} // Pasa la función handleCloseDelete como prop para cerrar el modal de eliminación
          />
      )}
      <CreateRegister/>
 
    </div>


  );
};

export default ListRegister;