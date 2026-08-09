const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const cssToAdd = `
      .animate-on-scroll.scale-up-anim {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .animate-on-scroll.scale-up-anim.is-visible {
        opacity: 1;
        transform: translateY(0) scale(1);
      }`;

html = html.replace('/* Section Animations */', '/* Section Animations */' + cssToAdd);

// In the signature gallery (lines ~850 to 1050), we replace animate-on-scroll with animate-on-scroll scale-up-anim
// To do this safely, we can find the section 6 and replace inside it.
const galleryStart = html.indexOf('<!-- 6. Signature Gallery -->');
const nextSection = html.indexOf('<!-- 7. Our Process -->'); // Or similar

if (galleryStart > -1 && nextSection > -1) {
  const before = html.substring(0, galleryStart);
  let galleryHTML = html.substring(galleryStart, nextSection);
  const after = html.substring(nextSection);
  
  galleryHTML = galleryHTML.replace(/animate-on-scroll/g, 'animate-on-scroll scale-up-anim');
  html = before + galleryHTML + after;
}

fs.writeFileSync('index.html', html);
console.log('Fixed animation');
