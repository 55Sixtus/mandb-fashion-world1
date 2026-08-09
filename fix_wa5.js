const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Update phone strings
html = html.replace(/\+234 816 931 8277/g, "+234 816 076 1870");
html = html.replace(/\+2348169318277/g, "+2348160761870");

// Replace all wa.me old number with new number
html = html.replace(/wa\.me\/2348169318277/g, "wa.me/2348160761870");

// Also replace the auto reply text on the floating button as requested: "Hello M&B Fashion World, I want to order"
// It's currently "?text=Hello%20M%26B%20Fashion%20World!%20%F0%9F%8C%9F%20I%20was%20browsing%20your%20collection%20online%20and%20I'm%20interested%20in%20starting%20a%20custom%20bespoke%20order.%20Can%20we%20discuss%20the%20details%3F"
// and also we had "?text=Hello%20M%26B%20Fashion%20World!%20%F0%9F%8C%9F%20I'm%20reaching%20out%20from%20your%20website%20and%20would%20love%20to%20make%20a%20bespoke%20inquiry."
// I will just replace any text=... on the floating button with the new requested text.
html = html.replace(/text=Hello%20M%26B%20Fashion%20World!%20%F0%9F%8C%9F%20I%20was%20browsing%20your%20collection%20online%20and%20I'm%20interested%20in%20starting%20a%20custom%20bespoke%20order.%20Can%20we%20discuss%20the%20details%3F/g, "text=Hello%20M%26B%20Fashion%20World%2C%20I%20want%20to%20order");

// And replace the other one just in case they want it everywhere or keep the bespoke inquiry. The user said:
// Provide HTML/CSS code for a floating WhatsApp button using the new link and prefilled message: "Hello M&B Fashion World, I want to order"
// So maybe I just leave the other ones as bespoke inquiry or update them all. I will update all `text=` params to be "Hello M&B Fashion World, I want to order" to be safe.
html = html.replace(/text=Hello%20M%26B%20Fashion%20World!%20%F0%9F%8C%9F%20I'm%20reaching%20out%20from%20your%20website%20and%20would%20love%20to%20make%20a%20bespoke%20inquiry\./g, "text=Hello%20M%26B%20Fashion%20World%2C%20I%20want%20to%20order");

// Let's also add the Catalog link in the footer right after the WhatsApp link
html = html.replace(
    /<a href="https:\/\/wa\.me\/2348160761870\?text=.*?">WhatsApp<\/a>/g,
    `$&
                <a href="https://wa.me/p/27655624440803102/2348160761870" target="_blank" rel="noopener noreferrer" class="hover:text-gold transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 btn-luxury px-8 py-4 flex items-center gap-2 min-h-[48px]">Catalog</a>`
);

fs.writeFileSync('index.html', html);
console.log('Fixed numbers and links');
