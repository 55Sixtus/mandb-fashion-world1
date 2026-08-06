const fs = require('fs');
const cheerio = require('cheerio');
let html = fs.readFileSync('index.html', 'utf-8');
const $ = cheerio.load(html, { decodeEntities: false });
$('h2:contains("Loved by Clients Worldwide")').each(function(i, el) {
    console.log("Found at index", i);
    console.log($(el).parent().html().substring(0, 50));
});
