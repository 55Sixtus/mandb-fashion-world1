const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const galleryStart = html.indexOf('<!-- 6. Signature Gallery -->');
const nextSection = html.indexOf('<!-- 7. Why Choose M&B FASHION WORLD -->');

if (galleryStart > -1 && nextSection > -1) {
  const before = html.substring(0, galleryStart);
  let galleryHTML = html.substring(galleryStart, nextSection);
  const after = html.substring(nextSection);
  
  // First, remove all scale-up-anim from this section
  galleryHTML = galleryHTML.replace(/ scale-up-anim/g, '');
  
  // Then, only add it to lines containing "image-zoom"
  const lines = galleryHTML.split('\n');
  const newLines = lines.map(line => {
      if (line.includes('image-zoom') && line.includes('animate-on-scroll')) {
          return line.replace('animate-on-scroll', 'animate-on-scroll scale-up-anim');
      }
      return line;
  });
  
  html = before + newLines.join('\n') + after;
}

fs.writeFileSync('index.html', html);
console.log('Fixed animation HTML carefully');
