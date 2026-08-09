const fs = require('fs');
const { minify } = require('html-minifier-terser');

(async () => {
    try {
        let html = fs.readFileSync('index.html', 'utf8');
        const minified = await minify(html, {
            collapseWhitespace: true,
            removeComments: true,
            minifyJS: true,
            minifyCSS: true
        });
        fs.writeFileSync('index.html', minified);
        console.log('Minified HTML. Old size:', html.length, 'New size:', minified.length);
    } catch(e) {
        console.error(e);
    }
})();
