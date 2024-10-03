import React, { useState , useEffect } from "react";
import { Table, Pagination } from "react-bootstrap";
import listLedgerService from "../../../services/booksService/ledgerBookService/listLedgerService";
import FilterByDataAndWord from "./FilterByDataAndWord";
import ReactHtmlTableExcel from 'react-html-table-to-excel';
import { useParams } from 'react-router-dom';

const Ledger = ({ updateCount }) => {

  const { id_cuenta } = useParams();//Obtenemos el codigo de cuenta desde la url
  const [registros, setRegistros] = useState([]);  // Estado para almacenar los registros
  const [registrosByDate, setRegistrosByDate] = useState([]);  // Estado para almacenar los registros por fechas
  const [registrosByWord, setRegistrosByWord] = useState([]);  // Estado para almacenar los registros por palabra
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5; // Define el número de registros por página
  const [nombreCuenta , setNombreCuenta ] = useState();

  // Función asincrónica para obtener los datos de la API
  const fetchData = async () => {
    try {
        // Llamamos a la función del servicio para obtener la lista de registros del libro mayor de esa cuenta
        const result = await listLedgerService(id_cuenta);
        // Actualizamos el estado 'registers' con los datos obtenidos
        setNombreCuenta(result[0].sub_rubro);
        setRegistros(result[0]); // Establecer solo el primer elemento que contiene los registros
    } catch (error) {
        console.error('Error fetching users:', error);// Si ocurre un error, lo mostramos en la consola
    }
  };

  // useEffect se ejecuta después del primer renderizado y cuando el componente se actualiza
  useEffect(() => {
    fetchData();// Ejecutamos la función para obtener los datos
  }, [[updateCount]]);

  const applyFilters = () => {
    let filteredRecords = registros;

    // Aplicar el filtro por palabra clave, si existe
    if (registrosByWord && registrosByWord.length > 0) {
      filteredRecords = registrosByWord;
    }

    // Aplicar el filtro por fechas, si existe
    if (registrosByDate && registrosByDate.length > 0) {
      filteredRecords = registrosByDate;
    }
    return filteredRecords;
  }

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

  // Función para filtrar por palabra clave
  const handleKeywordFilter = (filteredData) => {
    if (filteredData && filteredData.length > 0) { 
      // Si hay datos filtrados, los asigna al estado
      setRegistrosByWord(filteredData);
    }
    setCurrentPage(1); // Reiniciar la paginación
  };

  // Función para filtrar por fecha
  const handleDateFilter = (filteredData) => {
    setRegistrosByDate(filteredData);
    setCurrentPage(1); // Reiniciar la paginación
  };

  return (
    
    <div className="container-fluid mt-5 px-4">
      <h4 className='mb-3 mx-4'>Libro Mayor</h4>
      <div className="mt-4 mb-4">
        <FilterByDataAndWord 
          onSearchDates={handleDateFilter}
          onSearchKeyword={handleKeywordFilter}  
        />
      </div>
      <h5 className='mb-3 mx-4'>Cuenta: { nombreCuenta }</h5>
      <div className="table-responsive text-center">
        <Table striped bordered hover className="table-sm">
        <thead>
          <tr>
            <th>Asiento N°</th>
            <th>Fecha</th>
            <th>Codigo</th>
            <th>Detalle</th>
            <th>Debe</th>
            <th>Haber</th>
            <th>S.Deudor</th>
            <th>S.Acredor</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((registro, index) => (
            <tr key={index} className={registro.id_libro_diario}>
              <td>{formatDate(registro.fecha_registro)}</td>
              <td>{registro.asiento}</td>
              <td>{registro.fecha}</td>
              <td>{registro.codigo_cuenta}</td>
              <td>{registro.detalle}</td>
              <td>{registro.debe}</td>
              <td>{registro.haber}</td>
              <td>{registro.s_deudor}</td>
              <td>{registro.s_acredor}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>

       {/* Tabla invisible para exportar */}
       <div className="d-none">
        <Table id="tablaCompletaLibroMayor">
          <thead>
            <tr>
                <th>Asiento N°</th>
                <th>Fecha</th>
                <th>Codigo</th>
                <th>Detalle</th>
                <th>Debe</th>
                <th>Haber</th>
                <th>S.Deudor</th>
                <th>S.Acredor</th>
            </tr>
          </thead>
          <tbody>
            {registrosToShow.map((registro, index) => (
              <tr key={index} className={registro.id_libro_diario}>
                <td>{formatDate(registro.fecha_registro)}</td>
                <td>{registro.asiento}</td>
                <td>{registro.fecha}</td>
                <td>{registro.codigo_cuenta2}</td>
                <td>{registro.detalle}</td>
                <td>{registro.debe}</td>
                <td>{registro.haber}</td>
                <td>{registro.s_deudor}</td>
                <td>{registro.s_acredor}</td>
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
        <div className="d-flex justify-content-between mb-2">
          <ReactHtmlTableExcel
            id="ExportarExcel"
            className ="btn btn-success btn-sm"
            table="tablaCompletaLibroMayor" //Lo linkeamos a la table
            filename="sisContable_Libros"
            sheet="libro_mayor"
            buttonText= "Exportar Excel"
          />
        </div>
      </div>
    </div>
    
  );
};

export default Ledger;