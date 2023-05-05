async function getMyPublicIp() {
    let myIp;

    try {
        // Realizar una solicitud para obtener la dirección IP pública
        // Make a request to get the public IP address
        const response = await fetch("https://api.ipify.org?format=json");

        // Verificar si la respuesta es exitosa (status 200)
        // Check if the response is successful (status 200)
        if (response.status === 200) {
            // Obtener la dirección IP de la respuesta JSON
            // Get the IP address from the JSON response
            const data = await response.json();
            myIp = data.ip;
            console.log(`my ip is ${myIp}`);
        } else {
            console.log("Error fetching IP:", response.status);
        }
    } catch (error) {
        console.log("Error:", error);
    }

    // Verificar si se obtuvo una dirección IP
    // Check if an IP address was obtained
    if (!myIp) {
        console.error("Error getting IP");
        return;
    }

    // Retornar la dirección IP pública
    // Return the public IP address
    return myIp;
}

module.exports = getMyPublicIp;