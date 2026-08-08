const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace standard inquiries
html = html.replace(/text=Hi%20M%26B%20Fashion%20World%2C%20I%20would%20like%20to%20make%20an%20inquiry\./g, "text=Hello%20M%26B%20Fashion%20World!%20%F0%9F%8C%9F%20I'm%20reaching%20out%20from%20your%20website%20and%20would%20love%20to%20make%20a%20bespoke%20inquiry.");

// Replace floating order link
html = html.replace(/text=Hi%20M%26B%20Fashion%20World%2C%20I%20saw%20your%20website%20and%20I%20would%20like%20to%20place%20an%20order\./g, "text=Hello%20M%26B%20Fashion%20World!%20%F0%9F%8C%9F%20I%20was%20browsing%20your%20collection%20online%20and%20I'm%20interested%20in%20starting%20a%20custom%20bespoke%20order.%20Can%20we%20discuss%20the%20details%3F");

fs.writeFileSync('index.html', html);
console.log('Fixed professional wa logic 2');
