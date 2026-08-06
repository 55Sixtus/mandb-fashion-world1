const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
  /headers: { "Content-Type": "application\/x-www-form-urlencoded" },\\s*body: new URLSearchParams\\(formData\\).toString\\(\\),/g,
  'body: formData,'
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Script fixed');
