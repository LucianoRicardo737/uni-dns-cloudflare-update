import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

// Function to update a DNS record on Cloudflare
async function updateRecord(zoneId, recordId, nameRecordToUpdate, myIp) {

    // Get Cloudflare credentials from environment variables
    const { CLOUDFLARE_EMAIL, CLOUDFLARE_TOKEN } = process.env;

    // Check if environment variables are set
    if (!CLOUDFLARE_EMAIL || !CLOUDFLARE_TOKEN) {
        console.error("Missing Cloudflare credentials in environment variables");
        return false;
    }

    // Define headers for the Cloudflare API request
    const headers = {
        'X-Auth-Email': CLOUDFLARE_EMAIL,
        'X-Auth-Key': CLOUDFLARE_TOKEN,
        'Content-Type': 'application/json'
    };

    try {
        // Send a PUT request to the Cloudflare API to update the DNS record
        const response = await fetch(
            `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${recordId}`,
            {
                headers,
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
            console.info("Edit record success");
            return true;
        } else {
            // If the status is not 200, there was an error
            console.error("Error updating IP:", response.status);
            return false;
        }
    } catch (error) {
        // Log any errors that occur during the request
        console.error("Error:", error);
        return false;
    }
}

// Export the updateRecord function as the default export of this module
export default updateRecord;