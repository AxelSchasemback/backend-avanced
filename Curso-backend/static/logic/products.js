// Define una función asincrónica que realizará la llamada fetch y manejará el resultado
async function fetchDataAndRender() {
    try {
        // Realiza la llamada fetch y espera la respuesta
        const response = await fetch('/api/products', {
            method: 'GET',
            headers: {
                'Accept': 'text/html',
            },
        });

        // Verifica si la respuesta es exitosa
        if (response.ok) {
            // Extrae el HTML de la respuesta
            const htmlData = await response.text();

            // Agrega el HTML al contenedor deseado en tu DOM
            document.body.innerHTML = htmlData;

            // A partir de aquí, puedes continuar con el resto de la lógica que depende de este contenido
        } else {
            console.error('Error en la llamada fetch:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Llama a la función asincrónica
fetchDataAndRender();

// Resto de tu código aquí (que no depende del resultado del fetch y se ejecutará de inmediato)
