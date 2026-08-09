const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const target = '<link rel="preconnect" href="https://fonts.googleapis.com">';
const replace = '<link rel="preconnect" href="https://i.ibb.co">\n    <link rel="dns-prefetch" href="https://i.ibb.co">\n    <link rel="preconnect" href="https://fonts.googleapis.com">';

html = html.replace(target, replace);
fs.writeFileSync('index.html', html);
console.log('Added preconnect for i.ibb.co');
