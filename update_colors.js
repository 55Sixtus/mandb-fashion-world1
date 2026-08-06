const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf-8');

// Update Tailwind config
html = html.replace(/gold:\s*"#[A-Fa-f0-9]+"/g, 'gold: "#D4AF37"');
html = html.replace(/burgundy:\s*"#[A-Fa-f0-9]+"/g, 'magenta: "#A0204F"');

// Fix 'Timeless Style. Unmatched Confidence.' visibility
// Let's add a subtle text shadow, or change the color, or add a dark badge background
html = html.replace('<p class="text-gold uppercase tracking-[0.2em] text-sm md:text-base font-medium mb-6">', '<p class="text-gold uppercase tracking-[0.2em] text-sm md:text-base font-bold mb-6 drop-shadow-md bg-charcoal/40 inline-block px-4 py-2 rounded-full">');

// We also need to change text-burgundy, bg-burgundy, etc. to text-magenta, bg-magenta, etc.
html = html.replace(/text-burgundy/g, 'text-magenta');
html = html.replace(/bg-burgundy/g, 'bg-magenta');
html = html.replace(/border-burgundy/g, 'border-magenta');
html = html.replace(/hover:text-burgundy/g, 'hover:text-magenta');
html = html.replace(/hover:bg-burgundy/g, 'hover:bg-magenta');

// And update the trust bar colors or anything else using brand-primary or brand-secondary
// The user previously requested Gold and Magenta. Let's make sure the site uses them attractively.
// "trust-bar-usa bg-brand-primary" -> bg-brand-primary was added in our CRO update.
// In the CRO update, we used bg-brand-primary but didn't define it in tailwind config inside the script tag!
// The trust bar has "bg-brand-primary", "text-brand-secondary", etc.
// Let's add these to the tailwind config just in case they were removed or we need to ensure they exist.

fs.writeFileSync('index.html', html);
console.log('Colors updated.');
