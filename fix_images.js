const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The first slide image should be fetchpriority="high"
html = html.replace(
    /<img src="https:\/\/i\.ibb\.co\/9HzZCWjP\/logo5\.png" alt="M&B Fashion World Logo" class="w-full h-full object-contain opacity-30 scale-100 transition-transform duration-\[20000ms\] ease-linear transform-gpu">/,
    '<img src="https://i.ibb.co/9HzZCWjP/logo5.png" alt="M&B Fashion World Logo" class="w-full h-full object-contain opacity-30 scale-100 transition-transform duration-[20000ms] ease-linear transform-gpu" fetchpriority="high" decoding="async">'
);

// Second slide image - add fetchpriority="high" just in case it's the first visible bg
html = html.replace(
    /<img src="https:\/\/i\.ibb\.co\/84SfvCbL\/Whats-App-Image-2026-07-28-at-11-03-31-PM\.jpg" alt="Luxury African Fashion" class="w-full h-full object-cover opacity-80 scale-100 transition-transform duration-\[20000ms\] ease-linear transform-gpu" style="object-position: center top;">/,
    '<img src="https://i.ibb.co/84SfvCbL/Whats-App-Image-2026-07-28-at-11-03-31-PM.jpg" alt="Luxury African Fashion" class="w-full h-full object-cover opacity-80 scale-100 transition-transform duration-[20000ms] ease-linear transform-gpu" style="object-position: center top;" fetchpriority="high" decoding="async">'
);

// Third slide
html = html.replace(
    /<img src="https:\/\/i\.ibb\.co\/Rp4JCZ2d\/IMG-20260728-WA0118\.jpg" alt="Luxury African Fashion" class="w-full h-full object-cover opacity-80 scale-100 transition-transform duration-\[20000ms\] ease-linear transform-gpu" style="object-position: center top;">/,
    '<img src="https://i.ibb.co/Rp4JCZ2d/IMG-20260728-WA0118.jpg" alt="Luxury African Fashion" class="w-full h-full object-cover opacity-80 scale-100 transition-transform duration-[20000ms] ease-linear transform-gpu" style="object-position: center top;" loading="lazy" decoding="async">'
);

// Fourth slide
html = html.replace(
    /<img src="https:\/\/i\.ibb\.co\/zVHQJRL9\/Whats-App-Image-2026-07-28-at-11-04-05-PM\.jpg" alt="Luxury African Fashion" class="w-full h-full object-cover opacity-80 scale-100 transition-transform duration-\[20000ms\] ease-linear transform-gpu" style="object-position: center top;">/,
    '<img src="https://i.ibb.co/zVHQJRL9/Whats-App-Image-2026-07-28-at-11-04-05-PM.jpg" alt="Luxury African Fashion" class="w-full h-full object-cover opacity-80 scale-100 transition-transform duration-[20000ms] ease-linear transform-gpu" style="object-position: center top;" loading="lazy" decoding="async">'
);

fs.writeFileSync('index.html', html);
console.log('Fixed hero images loading tags');
