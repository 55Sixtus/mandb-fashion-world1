const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace Phone from validation array
html = html.replace(/'input\[type="tel"\], input\[name="whatsapp"\], input\[name="phone"\]'/g, `'input[type="tel"], input[name="whatsapp"]'`);
html = html.replace(/"tel"!==e.type&&"whatsapp"!==e.name&&"phone"!==e.name/g, `"tel"!==e.type&&"whatsapp"!==e.name`);
html = html.replace(/"tel"===e.type\|\|"whatsapp"===e.name\|\|"phone"===e.name/g, `"tel"===e.type||"whatsapp"===e.name`);

// Replace receipt rows
html = html.replace(/<div class="row"><div class="label">Phone:<\/div><div class="value">\$\{e\.phone\|\|"N\/A"\}<\/div><\/div>\\n\s*/g, '');
html = html.replace(/<div class="row"><div class="label">City:<\/div><div class="value">\$\{e\.city\|\|"N\/A"\}<\/div><\/div>\\n\s*/g, '');
html = html.replace(/<div class="row"><div class="label">Gender:<\/div><div class="value">\$\{e\.gender\|\|"N\/A"\}<\/div><\/div>\\n\s*/g, '');

// Replace Whatsapp message logic
html = html.replace(/,e\.phone&&\(\w\+=`📱 \*Phone:\* \$\{e\.phone\}\\n`\)/g, ''); // not sure if minifier did this exact syntax.

fs.writeFileSync('index.html', html);
console.log("Replaced scripts");
