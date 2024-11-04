import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    return (
        <Container className="mt-4">
        <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
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
            </div>
            <div className="col-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
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
            </div>
            <div className="col-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
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
            </div>
        </div>

    </Container>  
    );
}

export default Home;