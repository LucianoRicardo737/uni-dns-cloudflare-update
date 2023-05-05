# Cloudflare DNS Updater Documentation

This documentation provides detailed instructions on how to set up and use the Cloudflare DNS Updater script. The script helps keep your Cloudflare DNS records up-to-date by automatically updating the records when your public IP address changes.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Usage](#usage)
5. [Example Response](#example-response)

## Prerequisites

- Node.js (version 18 or higher)
- A Cloudflare account with the necessary DNS records
- API credentials (email and API key) for your Cloudflare account

## Installation

1. Clone the repository or download the source code.

   ```
   git clone https://github.com/yourusername/cloudflare-dns-updater.git
   ```

2. Navigate to the project folder.

   ```
   cd cloudflare-dns-updater
   ```

3. Install the required dependencies.

   ```
   npm install
   ```

## Configuration

1. Create a `.env` file in the project folder and provide your Cloudflare API credentials (email and API key) and other environment variables as follows:

   ```
   CLOUDFLARE_EMAIL=your_email@example.com
   CLOUDFLARE_TOKEN=your_api_key
   DOMAIN_ID=your_domain_id
   DIRECTION_ID=your_direction_id
   DIRECTION_NAME=your_direction_name
   ```

2. Replace the placeholders with your actual Cloudflare account details.

## Usage

1. Run the script using the following command:

   ```
   node index.js
   ```

2. The script will automatically compare your current public IP address with the IP stored in the Cloudflare DNS record. If the IP addresses do not match, the script will update the DNS record in Cloudflare.

3. By default, the script will run every 15 minutes. You can change the interval by modifying the following line in the `index.js` file:

   ```
   setInterval(main, 15 * 60 * 1000);
   ```

   Replace `15 * 60 * 1000` with your desired interval in milliseconds.

## Example Response

Here is an example of a successful DNS record update response:

```
{
  result: {
    id: 'a1b23c456d7890e1f2g3h4i5j6k7l8m9',
    zone_id: 'z1o2n3e4i5d6x7y8w9v0u1t2s3r4q5p6',
    zone_name: 'example.com',
    name: 'subdomain.example.com',
    type: 'A',
    content: '192.0.2.157',
    proxiable: true,
    proxied: true,
    ttl: 1,
    locked: false,
    meta: {
      auto_added: false,
      managed_by_apps: false,
      managed_by_argo_tunnel: false,
      source: 'primary'
    },
    comment: null,
    tags: [],
    created_on: '2023-05-05T15:48:37.47361Z',
    modified_on: '2023-05-05T16:49:00.587649Z'
  },
  success: true,
  errors: [],
  messages: []
}
```

Please note that this example response is for illustration purposes only. Actual responses may vary depending on your Cloudflare account and DNS records.