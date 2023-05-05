require('dotenv').config();

async function updateRecord(zoneId, recordId, nameRecordToUpdate, myIp) {
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

    try {
        // Realizar la solicitud PUT para actualizar el registro DNS
        // Make a PUT request to update the DNS record
        const response = await fetch(
            `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${recordId}`,
            {
                headers: header,
                method: "PUT",
                body: JSON.stringify({
                    type: "A",
                    name: nameRecordToUpdate,
                    content: myIp,
                    ttl: 60,
                    proxied: true,
                }),
            }
        );

        // Verificar si la respuesta es exitosa (status 200)
        // Check if the response is successful (status 200)
        if (response.status === 200) {
            // Procesar la respuesta JSON
            // Process the JSON response
            const data = await response.json();
            console.log(data);
            console.log("Edit record success");
        } else {
            console.log("Error updating IP:", response.status);
        }
    } catch (error) {
        console.log("Error:", error);
    }
}

module.exports = updateRecord;