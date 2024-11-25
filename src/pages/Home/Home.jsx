import React, { useState , useEffect } from "react";
import { Card, Row, Col, Container, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import apiMoneyServis from '../../services/Home/apiMoney';

const Home = () => {
    const [money, setMoney] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect se ejecuta después del primer renderizado y cuando el componente se actualiza
    useEffect(() => {
         // Función para cargar datos, ya sea desde localStorage o la API
         const loadData = async () => {
            // Intentamos obtener los datos desde localStorage
            const savedMoney = localStorage.getItem("money");

            // Si no hay datos en localStorage (es null), vamos directamente a la API
            if (!savedMoney) {
                try {
                    // Llamamos a la API si no hay datos en localStorage
                    const result = await apiMoneyServis();
                    setMoney(result.rates); // Actualizamos el estado con los datos obtenidos
                    localStorage.setItem("money", JSON.stringify(result.rates)); // Guardamos los datos en localStorage
                    setLoading(false); // Terminamos la carga
                } catch (error) {
                    console.error("Error fetching currency rates:", error);
                    setLoading(false); // Terminamos la carga en caso de error en la API
                }
            } else {
                // Si hay datos en localStorage, los usamos directamente
                setMoney(JSON.parse(savedMoney));
                setLoading(false); // Terminamos la carga
            }
        };

        loadData(); // Ejecutamos la función cuando el componente se monta
    }, []); // Este useEffect solo se ejecutará una vez al montar el componente

    if (loading) {
        return (
            <div className="text-center mt-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Cargando tasas de cambio...</p>
            </div>
        );
    }
    return (
        <Container className="mt-4">
            <Row xs={1} md={3} className="g-4 my-4 justify-content-center">
                <Col className="d-flex justify-content-center">
                    <iframe 
                        style={{
                            maxWidth: "320px",
                            width: "100%",
                            height: "260px",
                            borderRadius: "10px",
                            boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",
                            border: "1px solid #bcbcbc"
                        }}
                        src="https://dolarhoy.com/i/cotizaciones/dolar-blue" 
                        frameBorder="0"
                    ></iframe>
                </Col>
                <Col className="d-flex justify-content-center">
                    <iframe 
                        style={{
                            maxWidth: "320px",
                            width: "100%",
                            height: "260px",
                            borderRadius: "10px",
                            boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",
                            border: "1px solid #bcbcbc"
                        }}
                        src="https://dolarhoy.com/i/cotizaciones/dolar-bancos-y-casas-de-cambio" 
                        frameBorder="0"
                    ></iframe>
                </Col>
                <Col className="d-flex justify-content-center">
                    <iframe 
                        style={{
                            maxWidth: "320px",
                            width: "100%",
                            height: "260px",
                            borderRadius: "10px",
                            boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",
                            border: "1px solid #bcbcbc"
                        }}
                        src="https://dolarhoy.com/i/cotizaciones/dolar-mep" 
                        frameBorder="0"
                    ></iframe>
                </Col>
            </Row>
                <h3 className="text-center mb-4">Tasas de Cambio en base a USD</h3>
                <Row xs={1} md={3} className="g-4 mb-4">
                {Object.entries(money).map(([index, money]) => (
                    <Col key={index}>
                        <Card className="shadow-sm h-100">
                            <Card.Body>
                            <Card.Header className="bg-success text-white text-center">Base: {index}</Card.Header>
                            <Card.Text className="text-center display-6">
                                {index === 'ARS' ? (money + 104).toFixed(2) : money.toFixed(2)}
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
        );
}

export default Home;