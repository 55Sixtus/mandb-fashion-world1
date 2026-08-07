const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The regex will look for `50% deposit` and `50% upfront` or other 50% related to payments
html = html.replace(/only a 50% deposit to start your order./g, 'only a 70% deposit to start your order.');
html = html.replace(/production schedule, and 50% deposit./g, 'production schedule, and 70% deposit.');
html = html.replace(/>50%<\/p>/g, '>70%</p>');
html = html.replace(/require a 50%/g, 'require a 70%');
html = html.replace(/Secure your order with a 50% deposit./g, 'Secure your order with a 70% deposit.');
html = html.replace(/A 50% deposit confirms your order./g, 'A 70% deposit confirms your order.');
html = html.replace(/require a 50% deposit upfront/g, 'require a 70% deposit upfront');
html = html.replace(/balance due before shipping/g, 'balance 30% before shipping');

fs.writeFileSync('index.html', html);
console.log('Fixed 50 to 70');
