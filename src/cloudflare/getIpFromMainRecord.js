require('dotenv').config();

async function getIpFromMainRecord(zoneId, recordId) {
    // Configurar las variables de entorno de Cloudflare
    // Set up Cloudflare environment variables
    const CLOUDFLARE_EMAIL = process.env.CLOUDFLARE_EMAIL;
    const CLOUDFLARE_TOKEN = process.env.CLOUDFLARE_TOKEN;

    // Configurar las cabeceras para la solicitud a la API de Cloudflare
    // Set up headers for the request to the Cloudflare API
    const header = {
        'X-Auth-Email': CLOUDFLARE_EMAIL,
        'X-Auth-Key': CLOUDFLARE_TOKEN,
        'Content-Type': 'application/json'
    };

    // Construir la URL para la solicitud a la API de Cloudflare
    // Build the URL for the request to the Cloudflare API
    const url = recordId ? `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${recordId}` : `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`;

    try {
        // Realizar la solicitud a la API de Cloudflare
        // Make the request to the Cloudflare API
        const response = await fetch(url,
            {
                headers: header,
                method: "GET",
            }
        );

        // Verificar si la respuesta es exitosa (status 200)
        // Check if the response is successful (status 200)
        if (response.status === 200) {
            // Obtener la dirección IP del registro en la respuesta JSON
            // Get the IP address of the record from the JSON response
            const data = await response.json();
            return data.result;
        } else {
            console.log("Error getting IP from main record:", response.status);
        }
    } catch (error) {
        console.log("Error:", error);
    }
}

module.exports = getIpFromMainRecord;