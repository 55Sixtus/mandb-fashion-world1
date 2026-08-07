const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace the text-slide inner contents to have a transform class that we toggle
html = html.replace(/<div class="text-slide w-full absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700 opacity-100">/g, '<div class="text-slide w-full absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 opacity-100 translate-y-0">');

html = html.replace(/<div class="text-slide w-full absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700 opacity-0 pointer-events-none">/g, '<div class="text-slide w-full absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 opacity-0 translate-y-8 pointer-events-none">');

// Update JS
html = html.replace(/textSlides\[currentSlide\]\.classList\.remove\('opacity-100'\);/g, "textSlides[currentSlide].classList.remove('opacity-100', 'translate-y-0');");
html = html.replace(/textSlides\[currentSlide\]\.classList\.add\('opacity-0', 'pointer-events-none'\);/g, "textSlides[currentSlide].classList.add('opacity-0', 'pointer-events-none', 'translate-y-[-2rem]');"); // slide up and out

html = html.replace(/textSlides\[currentSlide\]\.classList\.remove\('opacity-0', 'pointer-events-none'\);/g, "textSlides[currentSlide].classList.remove('opacity-0', 'pointer-events-none', 'translate-y-8', 'translate-y-[-2rem]');"); // remove both translate possibilities
html = html.replace(/textSlides\[currentSlide\]\.classList\.add\('opacity-100'\);/g, "textSlides[currentSlide].classList.add('opacity-100', 'translate-y-0');");

fs.writeFileSync('index.html', html);
console.log('Fixed slide animations');
