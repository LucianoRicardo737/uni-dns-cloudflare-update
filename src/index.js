import getIpFromMainRecord from "./cloudflare/getIpFromMainRecord.js"; // Import function to get IP from main record
import updateRecord from "./cloudflare/updateRecord.js"; // Import function to update record
import getMyPublicIp from "./global/getMyPublicIp.js"; // Import function to get public IP

import dotenv from "dotenv"; // Import dotenv to use environment variables
dotenv.config(); // Configure dotenv

// Destructure environment variables
const {
    DOMAIN_ID,
    DIRECTION_ID,
    TIME_TO_REFRESH_IN_MINUTES
} = process.env;

let ipFromRecord = []; // Initialize array to store IP from record

// Main function
async function main() {
    console.time("start"); // Start timer

    try {
        const myIp = await getMyPublicIp(); // Get public IP

        const ids_to_update = DIRECTION_ID.split(","); // Split DIRECTION_ID into array

        // If ipFromRecord is empty, fetch IP from Cloudflare
        if (ipFromRecord.length <= 0) {
            console.info("fetched ip from cloudflare");

            // Loop through ids_to_update
            for (let ip of ids_to_update) {
                const remoteIp = await getIpFromMainRecord(DOMAIN_ID, ip); // Get IP from main record
                // Push remoteIp to ipFromRecord
                ipFromRecord.push({
                    id: remoteIp.id.toString(),
                    name: remoteIp.name.toString(),
                    content: remoteIp.content.toString()
                });
            }
        } else {
            console.info("fetched ip from cache"); // If ipFromRecord is not empty, fetch IP from cache
        }

        // Loop through ipFromRecord
        for (let record of ipFromRecord) {
            // If record content is the same as myIp, log "IPs are the same"
            if (record.content === myIp.toString()) {
                console.info("IPs are the same");
            } else {
                // If record content is not the same as myIp, update record
                await updateRecord(DOMAIN_ID, record.id, record.name, myIp);
            }
        }
    } catch (error) {
        console.error("Error:", error); // Log error
    }

    console.timeEnd("start"); // End timer
}

main(); // Call main function

// Set interval to call main function every TIME_TO_REFRESH_IN_MINUTES minutes
setInterval(main, TIME_TO_REFRESH_IN_MINUTES * 60 * 1000);
