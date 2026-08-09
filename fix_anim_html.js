const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const galleryStart = html.indexOf('<!-- 6. Signature Gallery -->');
const nextSection = html.indexOf('<!-- 7. Why Choose M&B FASHION WORLD -->');

if (galleryStart > -1 && nextSection > -1) {
  const before = html.substring(0, galleryStart);
  let galleryHTML = html.substring(galleryStart, nextSection);
  const after = html.substring(nextSection);
  
  galleryHTML = galleryHTML.replace(/animate-on-scroll/g, 'animate-on-scroll scale-up-anim');
  html = before + galleryHTML + after;
} else {
  console.log("Could not find sections");
}

fs.writeFileSync('index.html', html);
console.log('Fixed animation HTML');
