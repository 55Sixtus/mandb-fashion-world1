const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const heroRegex = /<!-- 1\. Hero Section -->[\s\S]*?<!-- 2\. About Us -->/;

const newHero = `<!-- 1. Hero Section -->
    <section class="relative h-screen min-h-[600px] flex items-center justify-center bg-charcoal overflow-hidden pt-20">
      <!-- Animated Slider Background -->
      <div class="absolute inset-0 z-0" id="hero-slider">
        <div class="hero-slide absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-100 z-10 bg-[#FAF6F0]">
          <img src="https://i.ibb.co/9HzZCWjP/logo5.png" alt="M&B Fashion World Logo" class="w-full h-full object-contain opacity-10 scale-100 transition-transform duration-[8000ms] ease-linear transform-gpu">
        </div>
        <div class="hero-slide absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-0 z-0 bg-charcoal">
          <img src="https://i.ibb.co/84SfvCbL/Whats-App-Image-2026-07-28-at-11-03-31-PM.jpg" alt="Luxury African Fashion" class="w-full h-full object-cover opacity-60 scale-100 transition-transform duration-[8000ms] ease-linear transform-gpu" style="object-position: center top;">
        </div>
        <div class="hero-slide absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-0 z-0 bg-charcoal">
          <img src="https://i.ibb.co/Rp4JCZ2d/IMG-20260728-WA0118.jpg" alt="Luxury African Fashion" class="w-full h-full object-cover opacity-60 scale-100 transition-transform duration-[8000ms] ease-linear transform-gpu" style="object-position: center top;">
        </div>
        <div class="hero-slide absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-0 z-0 bg-charcoal">
          <img src="https://i.ibb.co/zVHQJRL9/Whats-App-Image-2026-07-28-at-11-04-05-PM.jpg" alt="Luxury African Fashion" class="w-full h-full object-cover opacity-60 scale-100 transition-transform duration-[8000ms] ease-linear transform-gpu" style="object-position: center top;">
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent z-20 pointer-events-none"></div>
      </div>

      <div class="relative z-30 text-center px-6 w-full max-w-5xl mx-auto flex flex-col items-center justify-center h-full fade-up in-view delay-200">
        
        <!-- Sliding Header Text Container -->
        <div class="overflow-hidden h-[150px] md:h-[220px] lg:h-[260px] w-full relative mb-12">
            <div id="hero-text-slider" class="absolute inset-x-0 transition-transform duration-700 ease-in-out transform translate-y-0 flex flex-col items-center justify-center h-full">
                <!-- Slide 1 -->
                <div class="text-slide w-full absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 opacity-100 translate-y-0">
                    <p class="text-gold uppercase tracking-[0.2em] text-xs md:text-sm font-bold mb-4 md:mb-6 drop-shadow-md bg-charcoal/60 inline-block px-4 py-2 rounded-full backdrop-blur-sm">
                      M&B Fashion World
                    </p>
                    <h1 class="font-playfair text-5xl md:text-7xl lg:text-8xl text-ivory leading-tight drop-shadow-lg">
                      Timeless <span class="italic font-light text-gold">Elegance</span>
                    </h1>
                </div>
                <!-- Slide 2 -->
                <div class="text-slide w-full absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 opacity-0 translate-y-8 pointer-events-none">
                    <p class="text-gold uppercase tracking-[0.2em] text-xs md:text-sm font-bold mb-4 md:mb-6 drop-shadow-md bg-charcoal/60 inline-block px-4 py-2 rounded-full backdrop-blur-sm">
                      Custom Tailoring
                    </p>
                    <h1 class="font-playfair text-5xl md:text-7xl lg:text-8xl text-ivory leading-tight drop-shadow-lg">
                      Perfect <span class="italic font-light text-gold">Fit</span>
                    </h1>
                </div>
                <!-- Slide 3 -->
                <div class="text-slide w-full absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 opacity-0 translate-y-8 pointer-events-none">
                    <p class="text-gold uppercase tracking-[0.2em] text-xs md:text-sm font-bold mb-4 md:mb-6 drop-shadow-md bg-charcoal/60 inline-block px-4 py-2 rounded-full backdrop-blur-sm">
                      Global Delivery
                    </p>
                    <h1 class="font-playfair text-5xl md:text-7xl lg:text-8xl text-ivory leading-tight drop-shadow-lg">
                      Worldwide <span class="italic font-light text-gold">Style</span>
                    </h1>
                </div>
            </div>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-6 mt-4 z-40">
          <a href="#collections" class="btn-primary w-full sm:w-auto text-center focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 btn-luxury px-8 py-4 min-h-[48px] flex items-center justify-center shadow-luxury">Discover The Collection</a>
          <a href="#order" class="w-full sm:w-auto text-center focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 btn-luxury text-charcoal px-8 py-4 bg-white/90 backdrop-blur-sm border border-gold min-h-[48px] flex items-center justify-center shadow-luxury">Begin Your Bespoke Journey</a>
        </div>
      </div>
    </section>

    <!-- 2. About Us -->`;

if (html.match(heroRegex)) {
    html = html.replace(heroRegex, newHero);
    console.log('Hero replaced.');
} else {
    console.log('Hero regex NOT matched!');
}

fs.writeFileSync('index.html', html);
