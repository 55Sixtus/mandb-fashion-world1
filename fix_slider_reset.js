const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The JS block for text slides is:
/*
                textSlides[currentSlide].classList.remove('opacity-100', 'translate-y-0');
                textSlides[currentSlide].classList.add('opacity-0', 'pointer-events-none', '-translate-y-8');
*/
html = html.replace(
    /textSlides\[currentSlide\]\.classList\.add\('opacity-0', 'pointer-events-none', '-translate-y-8'\);/g,
    `textSlides[currentSlide].classList.add('opacity-0', 'pointer-events-none', '-translate-y-8');
    
                const oldTextSlide = textSlides[currentSlide];
                setTimeout(() => {
                    oldTextSlide.classList.remove('-translate-y-8');
                    oldTextSlide.classList.add('translate-y-8');
                }, 2000); // Reset position after fade out
`
);

fs.writeFileSync('index.html', html);
console.log('Fixed slider text reset');
