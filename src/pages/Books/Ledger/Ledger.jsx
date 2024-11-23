import React, { useState , useEffect } from "react";
import { Table, Pagination } from "react-bootstrap";
import listLedgerService from "../../../services/booksService/ledgerBookService/listLedgerService";
import FilterByDataAndWord from "../../../componentes/Books/Ledger/FilterByDataAndWord";
import ReactHtmlTableExcel from 'react-html-table-to-excel';
import { useParams } from 'react-router-dom';

const Ledger = () => {

  const { id_cuenta } = useParams(); // Obtenemos el código de cuenta desde la URL
  const [registros, setRegistros] = useState([]); // Estado para los registros originales
  const [filteredRecords, setFilteredRecords] = useState([]); // Estado para registros filtrados
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const recordsPerPage = 5; // Cantidad de registros por página
  const [nombreCuenta, setNombreCuenta] = useState(""); // Nombre de la cuenta
  const [total, setTotal] = useState(0); // Total acumulado de la cuenta

  // Función para obtener los datos del servicio
  const fetchData = async () => {
    try {
      const result = await listLedgerService(id_cuenta); // Llama al servicio para obtener datos del libro mayor
      setRegistros(result[0]); // Guardar los registros originales
      setFilteredRecords(result[0]); // Inicialmente, mostrar todos los registros como filtrados
      setNombreCuenta(result[0][0]?.sub_rubro || ""); // Establece el nombre de la cuenta
      setTotal(result[0][0]?.saldo_acumulado || 0); // Establece el saldo total
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  // Cargar datos cuando se monta el componente o cambia la cuenta
  useEffect(() => {
    fetchData();
  }, [id_cuenta]);

  // Función para manejar el filtro por palabra clave
  const handleKeywordFilter = (filteredData) => {
    if (filteredData && filteredData.length > 0) {
      setFilteredRecords(filteredData); // Actualizar registros filtrados
    } else {
      setFilteredRecords(registros); // Si no hay filtro, mostrar los originales
    }
    setCurrentPage(1); // Reiniciar la paginación
  };

  // Función para manejar el filtro por fechas
  const handleDateFilter = (filteredData) => {
    if (filteredData && filteredData.length > 0) {
      setFilteredRecords(filteredData); // Actualizar registros filtrados
    } else {
      setFilteredRecords(registros); // Si no hay filtro, mostrar los originales
    }
    setCurrentPage(1); // Reiniciar la paginación
  };

  // Calcular los índices de la paginación
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord); // Obtener registros de la página actual

  // Total de páginas
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  // Función para cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Formatear fechas para mostrar en la tabla
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    
    <div className="container-fluid mt-5 px-4">
      <h4 className='mb-3 mx-4'>Libro Mayor</h4>
      <div className="mt-4 mb-4">
        <FilterByDataAndWord 
          id_cuenta={id_cuenta}
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
              <td>{registro.asiento}</td>
              <td>{formatDate(registro.fecha_registro)}</td>
              <td>{id_cuenta}</td>
              <td>{registro.cuenta}</td>
              <td>{registro.debe}</td>
              <td>{registro.haber}</td>
              <td>{registro.saldo_deudor}</td>
              <td>{registro.saldo_acreedor}</td>
            </tr>
          ))}
          {currentPage === totalPages && (
            <tr>
              <td colSpan="6"></td>
              <td className="text-center fw-bold">Total:</td>
              <td >  { total } </td>
            </tr>
            )}
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
            {filteredRecords.map((registro, index) => (
              <tr key={index} className={registro.id_libro_diario}>
                <td>{registro.asiento}</td>
                <td>{formatDate(registro.fecha_registro)}</td>
                <td>{registro.fecha}</td>
                <td>{registro.codigo_cuenta2}</td>
                <td>{registro.detalle}</td>
                <td>{registro.debe}</td>
                <td>{registro.haber}</td>
                <td>{registro.saldo_deudor}</td>
                <td>{registro.saldo_acreedor}</td>
              </tr>
            ))}
            {/* Fila de totales que solo se muestra en la última página */}
            {currentPage === totalPages && (
            <tr>
              <td colSpan="7" className="text-center fw-bold">Total:</td>
              <td className="text-star fw-bold">  { total } </td>
            </tr>
            )}
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