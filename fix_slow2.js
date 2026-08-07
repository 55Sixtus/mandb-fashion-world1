const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Text transition from duration-1000 to duration-[2000ms]
html = html.replace(/duration-1000/g, 'duration-[2000ms]');

// Slide interval from 10000 to 12000 to be even slower
html = html.replace(/10000\);/g, '12000);');

fs.writeFileSync('index.html', html);
console.log('Fixed slow animations even more');
