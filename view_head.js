const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const headEnd = html.indexOf('</head>');
console.log('=== HEAD SECTION ===');
console.log(html.substring(0, headEnd + 7));
