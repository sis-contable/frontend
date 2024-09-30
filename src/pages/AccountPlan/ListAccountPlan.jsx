import React, { useState , useEffect } from "react";
import { Table, Pagination } from "react-bootstrap";
import listAccountPlanServis from "../../services/accountPlan/listAccountPlanService"
import FilterByWord from "./FilterByWord";


const AccountPlan = ({updateCount}) => {

    const [listAccount , setListAccount] = useState([]);  // Estado para almacenar los planes de cuenta
    const [accountPlanByWord , setAccountPlanByWord] = useState([]);
    const [selectedRowData, setSelectedRowData] = useState(null); // Estado para los datos de la fila seleccionada
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5; // Define el número de registros por página

    // Función asincrónica para obtener los datos de la API
  const fetchData = async () => {
    try {
        // Llamamos a la función del servicio para obtener la lista de los planes de cuenta
        const result = await listAccountPlanServis();
        // Actualizamos el estado 'listAccount' con los datos obtenidos
        setListAccount(result[0]); // Establecer solo el primer elemento que contiene los registros
    } catch (error) {
        console.error('Error fetching users:', error);// Si ocurre un error, lo mostramos en la consola
    }
  };

   // useEffect se ejecuta después del primer renderizado y cuando el componente se actualiza
   useEffect(() => {
    fetchData();// Ejecutamos la función para obtener los datos
  }, [[updateCount]]);

  const applyFilters = () => {
    let filteredRecords = listAccount;

    // Aplicar el filtro por palabra clave, si existe
    if (accountPlanByWord && accountPlanByWord.length > 0) {
      filteredRecords = accountPlanByWord;
    }

    return filteredRecords;
  }

  // Función para filtrar por palabra clave
  const handleKeywordFilter = (filteredData) => {
    if (filteredData && filteredData.length > 0) { 
      // Si hay datos filtrados, los asigna al estado
      setAccountPlanByWord(filteredData);
    }
    setCurrentPage(1); // Reiniciar la paginación
  };

  
  //Obtenemos el tipo de registros que vamos a mostrar
  const registrosToShow = applyFilters();

  // Calcula los índices de los registros a mostrar en la página actual
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = registrosToShow.slice(indexOfFirstRecord, indexOfLastRecord);

  // Calcula el número total de páginas
  const totalPages = Math.ceil(registrosToShow.length / recordsPerPage);

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

  return (
    <div className="container-fluid mt-4 px-4">
      <h4 className="mt-5 mx-4">Plan de Cuentas</h4>
      <div className="d-flex justify-content-center mt-3 mb-4 align-items-center">
        <FilterByWord 
            onSearchKeyword={handleKeywordFilter}
        />
      </div>
      <div className="table-responsive text-center">
        <Table striped bordered hover className="table-sm">
        <thead>
          <tr>
            <th>Codigo</th>
            <th>SubRubro</th>
            <th>Cuenta</th>
            <th>Saldo Inicial</th>
            <th>Saldo Actual</th>
            <th>Saldo Acumulado</th>
            <th>Fecha de creacion</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((listAccount, index) => (
            <tr key={index}
            style={{ cursor: 'pointer' }}
            className={selectedRowData === listAccount.codigo_cuenta ? "table-primary" : ""}
            >
              <td>{listAccount.codigo_cuenta}</td>
              <td>{listAccount.sub_rubro}</td>
              <td>{listAccount.cuenta}</td>
              <td>{listAccount.saldo_inicial}</td>
              <td>{listAccount.saldo_actual}</td>
              <td>{listAccount.saldo_acumulado}</td>
              <td>{formatDate(listAccount.fecha_creacion)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
      <div className="d-flex justify-content-evenly mt-4">
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
      </div>
    </div>
  );

};

export default AccountPlan;