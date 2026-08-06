const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Preconnect to i.ibb.co
if (!html.includes('<link rel="preconnect" href="https://i.ibb.co">')) {
    html = html.replace(
        '<!-- SEO Meta Tags -->',
        '<link rel="preconnect" href="https://i.ibb.co">\n    <link rel="dns-prefetch" href="https://i.ibb.co">\n    <!-- SEO Meta Tags -->'
    );
}

// Fix couples_bg.jpg
html = html.replace('./couples_bg.jpg', 'https://i.ibb.co/1tnYzBZs/IMG-20260728-WA0116.jpg');

// Find the hero image (logo5.png in section 1)
// Looking for: <img src="https://i.ibb.co/9HzZCWjP/logo5.png" alt="Luxury African Fashion" class="w-full h-full object-cover opacity-60 h-auto" loading="lazy" decoding="async">
// We want to make it eager and high priority
html = html.replace(
    '<img src="https://i.ibb.co/9HzZCWjP/logo5.png" alt="Luxury African Fashion" class="w-full h-full object-cover opacity-60 h-auto" loading="lazy" decoding="async">',
    '<img src="https://i.ibb.co/9HzZCWjP/logo5.png" alt="Luxury African Fashion" class="w-full h-full object-cover opacity-60 h-auto" fetchpriority="high" decoding="async">'
);

fs.writeFileSync('index.html', html);
console.log('Optimized index.html for speed');
