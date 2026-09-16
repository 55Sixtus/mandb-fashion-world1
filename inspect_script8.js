const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const scripts = [...html.matchAll(/<script[\s\S]*?<\/script>/g)];
console.log('=== Script 8 ===');
console.log(scripts[7][0]);
