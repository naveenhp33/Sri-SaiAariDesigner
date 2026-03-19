const https = require('https');
const http = require('http');

/**
 * Render Keep-Alive Bot
 * 
 * This is an external script to ping your Render project every 14 minutes.
 * Render shuts down its free tier after 15 minutes of inactivity.
 * 
 * How to use:
 * 1. Update the URL variable with your site's Render URL.
 * 2. Run with: `node bot.js`
 */

const URL = process.env.RENDER_EXTERNAL_URL || 'https://srisaifashion.shop';
const pingInterval = 8 * 60 * 1000; // Increased frequency to 8 minutes

function ping() {
    console.log(`[${new Date().toISOString()}] Sending Keep-Alive ping to ${URL}...`);
    
    const protocol = URL.startsWith('https') ? https : http;
    
    protocol.get(`${URL}/api/ping`, (res) => {
        // Consume response data to free up memory
        res.on('data', () => {});
        console.log(`[Keep-Alive] Success - Status: ${res.statusCode}`);
    }).on('error', (err) => {
        console.error(`[Keep-Alive] Error: ${err.message}`);
    });
}

// Initial ping
ping();

// Schedule repeated pings
setInterval(ping, pingInterval);

console.log('--- Render Keep-Alive Bot Started ---');
console.log(`Bot will ping ${URL} every 14 minutes.`);
console.log('Keep this script running to prevent your site from sleeping.');
console.log('------------------------------------');
