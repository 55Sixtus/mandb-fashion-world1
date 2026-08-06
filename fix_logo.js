const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
    'class="h-12 md:h-16 w-auto object-contain w-full h-auto object-cover"',
    'class="h-12 md:h-16 w-auto object-contain max-w-[200px]"'
);

html = html.replace(
    'class="h-16 w-auto mb-6 bg-ivory p-2 rounded w-full h-auto object-cover"',
    'class="h-16 w-auto mb-6 bg-ivory p-2 rounded object-contain max-w-[200px]"'
);

fs.writeFileSync('index.html', html);
console.log('Fixed logo classes');
