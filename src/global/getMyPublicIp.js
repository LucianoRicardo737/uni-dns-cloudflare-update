// This function is used to get the public IP of the current machine
async function getMyPublicIp() {
    try {
        // Fetch the IP from the ipify API
        const response = await fetch("https://api.ipify.org?format=json");

        // If the response is successful, return the IP
        if (response.status === 200) {
            const data = await response.json();
            console.info(`my ip is ${data.ip}`);
            return data.ip;
        } else {
            // Throw an error if the response is not successful
            throw new Error(`Error fetching IP: ${response.status}`);
        }
    } catch (error) {
        // Throw any errors that occur during the fetch
        throw new Error(`Error: ${error}`);
    }
}

// Export the function for use in other modules
export default getMyPublicIp;