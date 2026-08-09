const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const mapPlaceholderRegex = /<div class="rounded-3xl overflow-hidden shadow-sm border border-champagne h-96 bg-gray-100 flex items-center justify-center relative group cursor-pointer animate-on-scroll">[\s\S]*?<\/div>\s*<\/div>/;

const newMapHtml = `<div class="rounded-3xl overflow-hidden shadow-luxury border border-champagne h-96 bg-gray-100 relative group animate-on-scroll">
          <iframe 
            src="https://maps.google.com/maps?q=10%20St%20Saviour%20Street,%20Off%20Upper%20Sakponba%20Road,%20Benin%20City,%20Edo%20State,%20Nigeria&t=&z=14&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade"
            class="absolute inset-0 w-full h-full grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700">
          </iframe>
          <!-- Overlay to prevent accidental scrolling -->
          <div class="absolute inset-0 pointer-events-none bg-black/5 group-hover:bg-transparent transition-colors duration-700"></div>
        </div>`;

html = html.replace(mapPlaceholderRegex, newMapHtml);

fs.writeFileSync('index.html', html);
console.log('Fixed map placeholder');
