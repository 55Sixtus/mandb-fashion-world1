const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Image zoom duration from 8000ms to 20000ms
html = html.replace(/duration-\[8000ms\]/g, 'duration-[20000ms]');

// 2. Image fade transition from 1000 to 2000ms
html = html.replace(/duration-1000/g, 'duration-[2000ms]');

// 3. Text transition from 700 to 1000ms
html = html.replace(/duration-700/g, 'duration-1000');

// 4. Slider interval from 5000 to 10000
html = html.replace(/}, 5000\);/g, '}, 10000);');

fs.writeFileSync('index.html', html);
console.log('Fixed slow animations');
