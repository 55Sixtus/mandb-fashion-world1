const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The regex will look for ` h-auto"` and replace with `"` only if it comes after some other classes
html = html.replace(/ h-auto"/g, '"');

fs.writeFileSync('index.html', html);
console.log('Fixed spurious h-auto class');
