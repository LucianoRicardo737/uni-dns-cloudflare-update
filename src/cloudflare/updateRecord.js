import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

// Function to update a DNS record on Cloudflare
async function updateRecord(zoneId, recordId, nameRecordToUpdate, myIp) {

    // Get Cloudflare credentials from environment variables
    const CLOUDFLARE_EMAIL = process.env.CLOUDFLARE_EMAIL;
    const CLOUDFLARE_TOKEN = process.env.CLOUDFLARE_TOKEN;

    // Define headers for the Cloudflare API request
    const header = {
        'X-Auth-Email': CLOUDFLARE_EMAIL,
        'X-Auth-Key': CLOUDFLARE_TOKEN,
        'Content-Type': 'application/json'
    };

    try {
        // Send a PUT request to the Cloudflare API to update the DNS record
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

        // Check the response status
        if (response.status === 200) {
            // If the status is 200, the update was successful
            await response.json();
            console.info("Edit record success");
        } else {
            // If the status is not 200, there was an error
            console.error("Error updating IP:", response.status);
        }
    } catch (error) {
        // Log any errors that occur during the request
        console.error("Error:", error);
    }
}

// Export the updateRecord function as the default export of this module
export default updateRecord;