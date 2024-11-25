const apiMoneyServis = async () => {
    try {
        const response = await fetch(`/money/exchangerates_data/latest?symbols=ARS%2CEUR%2CBRL&base=USD`, {
            method: 'GET',
            headers: {
                apikey: "qdgSHgCDd1nLG1nelUaynxfRn2dWRXFy",
                'Content-Type': 'application/json',
            },
        });
        // Verifica el contenido de la respuesta
        const data = await response.json();
        console.log('Response Status:', response.status);
        console.log('Response Body:', data);
        if (response.ok) {
            return data; // Devuelve los datos del registro creado
        } else {
            return { error: data.message || "Error al crear el registro" }; // Devuelve el mensaje de error del backend
        }
    } catch (error) {
        return { error: error.message }; // Retorna el mensaje de error si ocurre un fallo en la solicitud
    }
};

export default apiMoneyServis;