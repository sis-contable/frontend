import React, { useState , useEffect } from "react";
import { Table, Pagination , Button, Alert, Modal } from "react-bootstrap";
import listAccountPlanServis from "../../services/accountPlan/listAccountPlanService"
import FilterByWord from "../../componentes/AccountPlan/FilterByWord";
import deletAccountService from "../../services/accountPlan/deletAccountService";
import { useNavigate } from 'react-router-dom'; // Importa el hook

const AccountPlan = ({updateCount}) => {

    const [listAccount , setListAccount] = useState([]);  // Estado para almacenar los planes de cuenta
    const [accountPlanByWord , setAccountPlanByWord] = useState([]);
    const [selectedRowData, setSelectedRowData] = useState(null); // Estado para los datos de la fila seleccionada
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 8; // Define el número de registros por página

    const [showModal, setShowModal] = useState(false); // Controla la visibilidad del modal
    const [showSuccess, setShowSuccess] = useState(false); // Controla la alerta de éxito
    const [showError, setShowError] = useState(false); // Controla la alerta de error
    const [message, setMessage] = useState(""); // Almacena el mensaje del backend

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

  // Manejar la selección de una fila y guardar sus datos
  const handleRowClick = (id_cuenta) => {
    setSelectedRowData(id_cuenta); // Guarda los datos de la fila seleccionada
  };

  const navigate = useNavigate(); // Hook para manejar la navegación
  
  // Función para manejar el clic en el botón Ver Libro diario
  const handleLibroClick = () => {
    if (selectedRowData) {
      // Construir la URL y navegar a la ruta del libro mayor
      const url = `/libro_mayor/${selectedRowData}`;
      navigate(url); // Usa navigate para redirigir dentro de la aplicación sin recargar
    }
  };

  //Funcion para eliminar una cuenta
  const handleAccountDelet = async () => {
    if (selectedRowData) {
      try {
        const codigo = selectedRowData;
        // Llamamos a la función del servicio para eliminar la cuenta
        const account = await deletAccountService(codigo);
        if (account.status === 200) { // Si la respuesta es exitosa
          setMessage(account.message);
          setShowSuccess(true);
          setTimeout(() => {
              setShowSuccess(false);
          }, 5000);
        } else if (account.status === 400) {
            setMessage(account.message);
            setShowError(true); // Mostrar mensaje de error
            setTimeout(() => {
              setShowError(false);
          }, 5000);
        } else {
          setMessage(account.message);
          setShowError(true); // Mostrar mensaje de error
          setTimeout(() => {
            setShowError(false);
        }, 5000);
        }
      } catch (error) {
          console.error("Error al comunicarse con el servidor:", error);
          setMessage(error);
          setShowError(true); // Mostrar mensaje de error
          setTimeout(() => {
            setShowError(false);
        }, 900);
      }
    }
  };

  //Funcion para abrir y cerrar el modal
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="container-fluid mt-4 px-4">
      <h4 className="mt-5 mx-4">Plan de Cuentas</h4>
      <div className="d-flex justify-content-center mt-3 mb-4 align-items-center">
        <FilterByWord 
            onSearchKeyword={handleKeywordFilter}
        />
      </div>
      {/* Alertas */}
      {showSuccess && (
        <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
          {message}
        </Alert>
      )}
      {showError && (
        <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
          {message}
        </Alert>
      )}
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
            onClick={() => handleRowClick(listAccount.codigo_cuenta)}
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
        <div className="d-flex justify-content-between mb-2">
          <Button className="btn btn-sm"
            variant="secondary" 
            onClick={() => handleLibroClick()} 
            disabled={!selectedRowData}
          >
            Ver Libro Mayor
          </Button>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <Button className="btn btn-sm"
            variant="danger" 
            onClick={() => handleOpenModal()} 
            disabled={!selectedRowData}
          >
            Eliminar Cuenta
          </Button>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Está seguro de que desea eliminar esta cuenta?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => {
            handleCloseModal();
            handleAccountDelet();
          }}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );

};

export default AccountPlan;