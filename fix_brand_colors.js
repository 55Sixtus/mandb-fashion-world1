const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf-8');

html = html.replace(/brand-primary/g, 'gold');
html = html.replace(/brand-secondary/g, 'charcoal');

fs.writeFileSync('index.html', html);
console.log('Brand colors fixed.');
