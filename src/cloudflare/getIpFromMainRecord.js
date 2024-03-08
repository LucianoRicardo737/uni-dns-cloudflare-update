import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

// This function retrieves the IP from the main record in Cloudflare
async function getIpFromMainRecord(zoneId, recordId) {

    // Get Cloudflare credentials from environment variables
    const { CLOUDFLARE_EMAIL, CLOUDFLARE_TOKEN } = process.env;

    if (!CLOUDFLARE_EMAIL || !CLOUDFLARE_TOKEN) {
        console.error("Missing Cloudflare credentials in environment variables");
        return;
    }

    // Define the headers for the Cloudflare API request
    const header = {
        'X-Auth-Email': CLOUDFLARE_EMAIL,
        'X-Auth-Key': CLOUDFLARE_TOKEN,
        'Content-Type': 'application/json'
    };

    // Define the URL for the Cloudflare API request
    const url = `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${recordId || ''}`;

    try {
        // Make the API request
        const response = await fetch(url,
            {
                headers: header,
                method: "GET",
            }
        );
        // If the response is successful, parse the JSON and return the result
        if (response.status === 200) {
            const data = await response.json();
            return data.result;
        } else {
            // If the response is not successful, log the status code
            console.error("Error getting IP from main record:", response.status);
            return null;
        }
    } catch (error) {
        // If there is an error in the request, log the error
        console.error("Error:", error);
        return null;
    }
}

// Export the function for use in other modules
export default getIpFromMainRecord;