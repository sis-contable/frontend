import ClosingSeat from "../../componentes/Balance/ClosingSeat";
import ResultState from "../../componentes/Balance/resultState";
import StatementFinancialPosition from "../../componentes/Balance/StatementFinancialPosition";

const home = ()=>{
    return(
        <>
        <ResultState/>
        <ClosingSeat/>
        <StatementFinancialPosition/>
        </>
    );
}

export default home;
//Buscar despues react router que sirve para manejar las rutas/componentes