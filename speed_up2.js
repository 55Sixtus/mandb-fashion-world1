const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
    '<img src="https://i.ibb.co/9HzZCWjP/logo5.png" alt="M&amp;B Fashion World Logo" class="h-12 md:h-16 w-auto object-contain w-full h-auto object-cover" loading="lazy" decoding="async">',
    '<img src="https://i.ibb.co/9HzZCWjP/logo5.png" alt="M&amp;B Fashion World Logo" class="h-12 md:h-16 w-auto object-contain w-full h-auto object-cover" fetchpriority="high" decoding="async">'
);

fs.writeFileSync('index.html', html);
