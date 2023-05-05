const getIpFromMainRecord = require("./cloudflare/getIpFromMainRecord");
const updateRecord = require("./cloudflare/updateRecord");
const getMyPublicIp = require("./global/getMyPublicIp");
require('dotenv').config()

// Configuración de variables de entorno
const DOMAIN_ID = process.env.DOMAIN_ID;
const DIRECTION_ID = process.env.DIRECTION_ID;
const DIRECTION_NAME = process.env.DIRECTION_NAME;

let ipFromRecord;

async function main() {
    console.log("start");
    console.time("start");

    // Obtener la dirección IP pública actual
    // Get current public IP address
    const myIp = await getMyPublicIp();

    // Verificar si ipFromRecord no está establecido
    // Check if ipFromRecord is not set
    if (!ipFromRecord) {
        console.log("fetched ip from cloudflare");

        // Obtener la dirección IP del registro en Cloudflare
        // Get IP address from record in Cloudflare
        const remoteIp = await getIpFromMainRecord(DOMAIN_ID, DIRECTION_ID);
        ipFromRecord = remoteIp.content.toString();
    } else {
        console.log("fetched ip from cache");
    }

    // Comparar las direcciones IP local y remota
    // Compare local and remote IP addresses
    if (ipFromRecord === myIp.toString()) {
        console.log("IPs are the same");
    } else {
        // Si las direcciones IP no son iguales, actualizar el registro en Cloudflare
        // If IP addresses are not the same, update record in Cloudflare
        await updateRecord(DOMAIN_ID, DIRECTION_ID, DIRECTION_NAME, myIp);
    }

    console.timeEnd("start");
}

// Ejecutar la función principal una vez
// Run the main function once
main();

// Ejecutar la función principal cada 15 minutos
// Run the main function every 15 minutes
setInterval(main, 15 * 60 * 1000);
