const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Change opacity-60 to opacity-80 on the hero slides
html = html.replace(/opacity-60 scale-100/g, 'opacity-85 scale-100'); // Actually, let's use opacity-80 or opacity-90. Let's do opacity-80
html = html.replace(/opacity-85 scale-100/g, 'opacity-80 scale-100'); // if it replaced it.
html = html.replace(/opacity-60/g, 'opacity-80'); // this might affect other things. Better be specific.

// Reset file
html = fs.readFileSync('index.html', 'utf8');

// Specific replacements:
html = html.replace(/opacity-10 scale-100 transition-transform/g, 'opacity-30 scale-100 transition-transform');
html = html.replace(/opacity-60 scale-100 transition-transform/g, 'opacity-80 scale-100 transition-transform');

fs.writeFileSync('index.html', html);
console.log('Fixed opacity');
