const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace the slider logic
html = html.replace(
    /slides\[currentSlide\]\.querySelector\('img'\)\.classList\.remove\('scale-110'\);/g,
    `
    const oldSlideImg = slides[currentSlide].querySelector('img');
    setTimeout(() => {
        oldSlideImg.classList.remove('scale-110');
    }, 2000); // Wait for fade out to finish before resetting scale
    `
);

fs.writeFileSync('index.html', html);
console.log('Fixed slider JS');
