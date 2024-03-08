# Cloudflare DNS Updater

This repository contains a Node.js script that automatically updates Cloudflare DNS records when the user's public IP address changes. The script compares the current IP address with the IP stored in the DNS record and updates the record if needed. This project is useful for those who want to keep their Cloudflare DNS records up-to-date, especially in environments with dynamic IP addresses.

## Features

- Retrieves the user's current public IP address.
- Compares the current IP with the IP stored in the Cloudflare DNS record.
- Updates the DNS record in Cloudflare if the IP has changed.
- Uses the Cloudflare API to interact with DNS records.
- Runs automatically at configurable time intervals.

## Getting Started

Refer to the [documentation](./DOCUMENTATION.md) for detailed instructions on how to set up and use this project.