const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Remove CDN
html = html.replace('<script src="https://cdn.tailwindcss.com"></script>', '<link rel="stylesheet" href="styles.css">');

// Remove Tailwind Config Script
const configStart = html.indexOf('<script>\n      tailwind.config = {');
const configEnd = html.indexOf('</script>', configStart) + 9;

if (configStart !== -1) {
    html = html.substring(0, configStart) + html.substring(configEnd);
}

// Extract Styles
const styleStart = html.indexOf('<style>');
const styleEnd = html.indexOf('</style>', styleStart) + 8;

if (styleStart !== -1) {
    const inlineCss = html.substring(styleStart + 7, styleEnd - 8);
    html = html.substring(0, styleStart) + html.substring(styleEnd);
    
    let srcCss = fs.readFileSync('src.css', 'utf8');
    srcCss += '\n' + inlineCss;
    fs.writeFileSync('src.css', srcCss);
}

fs.writeFileSync('index.html', html);
console.log('Extracted CSS and Config');
