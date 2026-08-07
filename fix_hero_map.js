const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Update Map Links
html = html.replace(
    /10 St Saviour Street<br>Off Upper Sakponba Road<br>Benin City,/g,
    '<a href="https://www.google.com/search?q=10%20St%20Saviour%20Rd%2C%20Avbiama%2C%20Benin%20City%20300105%2C%20Edo&shem=epsd1%2Crimspwouoe&shndl=40&source=sh%2Fx%2Floc%2Fgeo%2Fm1%2F4&kgs=987c6fec50c19cab" target="_blank" rel="noopener noreferrer" class="hover:text-gold transition-colors block">10 St Saviour Street<br>Off Upper Sakponba Road<br>Benin City,</a>'
);
html = html.replace(
    /10 St Saviour Street<br>Benin City, Nigeria/g,
    '<a href="https://www.google.com/search?q=10%20St%20Saviour%20Rd%2C%20Avbiama%2C%20Benin%20City%20300105%2C%20Edo&shem=epsd1%2Crimspwouoe&shndl=40&source=sh%2Fx%2Floc%2Fgeo%2Fm1%2F4&kgs=987c6fec50c19cab" target="_blank" rel="noopener noreferrer" class="hover:text-gold transition-colors block">10 St Saviour Street<br>Benin City, Nigeria</a>'
);

// 2. Hero Section Update
// We will replace the entire Hero section (from <!-- 1. Hero Section --> to <!-- 2. About Section -->)
const heroRegex = /<!-- 1\. Hero Section -->[\s\S]*?<!-- 2\. About Section -->/;

const newHero = `<!-- 1. Hero Section -->
    <section class="relative h-screen min-h-[600px] flex items-center justify-center bg-charcoal overflow-hidden pt-20">
      <!-- Animated Slider Background -->
      <div class="absolute inset-0 z-0" id="hero-slider">
        <div class="hero-slide absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-100 z-10 bg-ivory">
          <img src="https://i.ibb.co/9HzZCWjP/logo5.png" alt="M&B Fashion World Logo" class="w-full h-full object-contain opacity-15 scale-100 transition-transform duration-[8000ms] ease-linear transform-gpu">
        </div>
        <div class="hero-slide absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-0 z-0">
          <img src="https://i.ibb.co/84SfvCbL/Whats-App-Image-2026-07-28-at-11-03-31-PM.jpg" alt="Luxury African Fashion" class="w-full h-full object-cover opacity-50 scale-100 transition-transform duration-[8000ms] ease-linear transform-gpu" style="object-position: center top;">
        </div>
        <div class="hero-slide absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-0 z-0">
          <img src="https://i.ibb.co/Rp4JCZ2d/IMG-20260728-WA0118.jpg" alt="Luxury African Fashion" class="w-full h-full object-cover opacity-50 scale-100 transition-transform duration-[8000ms] ease-linear transform-gpu" style="object-position: center top;">
        </div>
        <div class="hero-slide absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-0 z-0">
          <img src="https://i.ibb.co/zVHQJRL9/Whats-App-Image-2026-07-28-at-11-04-05-PM.jpg" alt="Luxury African Fashion" class="w-full h-full object-cover opacity-50 scale-100 transition-transform duration-[8000ms] ease-linear transform-gpu" style="object-position: center top;">
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent z-20 pointer-events-none"></div>
      </div>

      <div class="relative z-30 text-center px-6 w-full max-w-5xl mx-auto flex flex-col items-center justify-center h-full">
        
        <!-- Sliding Header Text Container -->
        <div class="overflow-hidden h-[120px] md:h-[160px] lg:h-[200px] w-full relative mb-8">
            <div id="hero-text-slider" class="absolute inset-x-0 transition-transform duration-700 ease-in-out transform translate-y-0 flex flex-col items-center justify-center h-full">
                <!-- Slide 1 -->
                <div class="text-slide w-full absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700 opacity-100">
                    <p class="text-gold uppercase tracking-[0.2em] text-xs md:text-sm font-bold mb-4 drop-shadow-md bg-charcoal/60 inline-block px-4 py-2 rounded-full backdrop-blur-sm">
                      M&B Fashion World
                    </p>
                    <h1 class="font-playfair text-5xl md:text-7xl lg:text-8xl text-ivory leading-tight">
                      Timeless <span class="italic font-light text-gold">Elegance</span>
                    </h1>
                </div>
                <!-- Slide 2 -->
                <div class="text-slide w-full absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700 opacity-0 pointer-events-none">
                    <p class="text-gold uppercase tracking-[0.2em] text-xs md:text-sm font-bold mb-4 drop-shadow-md bg-charcoal/60 inline-block px-4 py-2 rounded-full backdrop-blur-sm">
                      Custom Tailoring
                    </p>
                    <h1 class="font-playfair text-5xl md:text-7xl lg:text-8xl text-ivory leading-tight">
                      Perfect <span class="italic font-light text-gold">Fit</span>
                    </h1>
                </div>
                <!-- Slide 3 -->
                <div class="text-slide w-full absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700 opacity-0 pointer-events-none">
                    <p class="text-gold uppercase tracking-[0.2em] text-xs md:text-sm font-bold mb-4 drop-shadow-md bg-charcoal/60 inline-block px-4 py-2 rounded-full backdrop-blur-sm">
                      Global Delivery
                    </p>
                    <h1 class="font-playfair text-5xl md:text-7xl lg:text-8xl text-ivory leading-tight">
                      Worldwide <span class="italic font-light text-gold">Style</span>
                    </h1>
                </div>
            </div>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-6 mt-4 z-40 animate-fade-in-up">
          <a href="#collections" class="btn-primary w-full sm:w-auto text-center focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 btn-luxury px-8 py-4 min-h-[48px] flex items-center justify-center">Discover The Collection</a>
          <a href="#order" class="w-full sm:w-auto text-center focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 btn-luxury text-charcoal px-8 py-4 bg-white border border-gold min-h-[48px] flex items-center justify-center">Begin Your Bespoke Journey</a>
        </div>
      </div>
    </section>

    <!-- 2. About Section -->`;

html = html.replace(heroRegex, newHero);

// Add slider javascript
const sliderScript = `
    <!-- Slider Script -->
    <script>
      document.addEventListener('DOMContentLoaded', () => {
        // Hero Image Slider
        const slides = document.querySelectorAll('#hero-slider .hero-slide');
        let currentSlide = 0;
        
        // Text Slider
        const textSlides = document.querySelectorAll('#hero-text-slider .text-slide');

        if(slides.length > 0 && textSlides.length > 0) {
            // Initial state zoom
            slides[0].querySelector('img').classList.add('scale-110');

            setInterval(() => {
                // Hide current slide
                slides[currentSlide].classList.remove('opacity-100', 'z-10');
                slides[currentSlide].classList.add('opacity-0', 'z-0');
                slides[currentSlide].querySelector('img').classList.remove('scale-110');

                textSlides[currentSlide].classList.remove('opacity-100');
                textSlides[currentSlide].classList.add('opacity-0', 'pointer-events-none');
                
                // Move to next slide
                currentSlide = (currentSlide + 1) % slides.length;
                
                // Show next slide
                slides[currentSlide].classList.remove('opacity-0', 'z-0');
                slides[currentSlide].classList.add('opacity-100', 'z-10');
                // Trigger zoom animation
                setTimeout(() => {
                    slides[currentSlide].querySelector('img').classList.add('scale-110');
                }, 50);

                textSlides[currentSlide].classList.remove('opacity-0', 'pointer-events-none');
                textSlides[currentSlide].classList.add('opacity-100');
            }, 5000);
        }
      });
    </script>
`;

if (!html.includes('<!-- Slider Script -->')) {
    html = html.replace('</body>', sliderScript + '\n  </body>');
}

fs.writeFileSync('index.html', html);
console.log('Fixed hero section and map link');
