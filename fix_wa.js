const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const defaultText = '?text=Hi%20M%26B%20Fashion%20World%2C%20I%20would%20like%20to%20make%20an%20inquiry.';

// Replace exact matches of href="https://wa.me/2348169318277"
html = html.replace(/href="https:\/\/wa\.me\/2348169318277"/g, 'href="https://wa.me/2348169318277' + defaultText + '"');

// Replace floating wa.me text with a better one
html = html.replace(/text=Hi%20M%26B%20I%20saw%20your%20website%20and%20I%20want%20to%20order/g, 'text=Hi%20M%26B%20Fashion%20World%2C%20I%20saw%20your%20website%20and%20I%20would%20like%20to%20place%20an%20order.');

fs.writeFileSync('index.html', html);
console.log('Fixed wa.me links');
