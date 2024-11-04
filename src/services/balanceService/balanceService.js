const BalanceService = async(fechaDesde , fechaHasta) => { 
    try {
        const response = await fetch(`http://localhost:3000/creatBalance/${fechaDesde}/${fechaHasta}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    }catch (error) {
        console.error(error);
        throw error;
        
    }
    
}

export default BalanceService;