// This function is used to get the public IP of the current machine
async function getMyPublicIp() {
    // Variable to store the IP
    let myIp;

    try {
        // Fetch the IP from the ipify API
        const response = await fetch("https://api.ipify.org?format=json");

        // If the response is successful, store the IP
        if (response.status === 200) {
            const data = await response.json();
            myIp = data.ip;
            // Log the IP for debugging purposes
            console.info(`my ip is ${myIp}`);
        } else {
            // Log an error if the response is not successful
            console.error("Error fetching IP:", response.status);
        }
    } catch (error) {
        // Log any errors that occur during the fetch
        console.error("Error:", error);
    }

    // If no IP was obtained, log an error and return
    if (!myIp) {
        console.error("Error getting IP");
        return;
    }

    // Return the obtained IP
    return myIp;
}

// Export the function for use in other modules
export default getMyPublicIp;