const BalanceService = async(fechaDesde , fechaHasta) => { 
    try {
        const response = await fetch(`/api/creatBalance/${fechaDesde}/${fechaHasta}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        return result;
    }catch (error) {
        console.error(error);
        throw error;
        
    }
    
}

export default BalanceService;