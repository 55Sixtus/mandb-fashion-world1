const fs = require('fs');
const cheerio = require('cheerio');
let html = fs.readFileSync('index.html', 'utf-8');
const $ = cheerio.load(html, { decodeEntities: false });
console.log($('h2:contains("Loved by Clients Worldwide")').length);
