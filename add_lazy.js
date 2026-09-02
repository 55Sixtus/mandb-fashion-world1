const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// replace <img with <img loading="lazy" where it doesn't have loading="lazy" already
// We should exclude hero images if possible, but let's just add it to all images first
html = html.replace(/<img(?![^>]*loading=)/g, '<img loading="lazy"');

// Wait, the hero images are inside <div class="hero-slide">
// Let's remove lazy loading from hero images to ensure they load fast
html = html.replace(/<div class="hero-slide([^>]*)>([\s\S]*?)<img loading="lazy"/g, '<div class="hero-slide$1>$2<img loading="eager"');

fs.writeFileSync('index.html', html);
console.log("Added lazy loading to images");
