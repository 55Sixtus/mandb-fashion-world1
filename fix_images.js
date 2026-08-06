const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf-8');

// 1. Add preconnect to head
if (!html.includes('<link rel="preconnect" href="https://i.ibb.co">')) {
    html = html.replace('</head>', '    <link rel="preconnect" href="https://i.ibb.co">\n    <link rel="dns-prefetch" href="https://i.ibb.co">\n</head>');
}

// 2. Fix Hero Image (first logo5.png used as background)
// Current: <img src="https://i.ibb.co/9HzZCWjP/logo5.png" alt="Luxury African Fashion" class="w-full h-full object-cover opacity-60 h-auto" loading="lazy" decoding="async">
html = html.replace(
    '<img src="https://i.ibb.co/9HzZCWjP/logo5.png" alt="Luxury African Fashion" class="w-full h-full object-cover opacity-60 h-auto" loading="lazy" decoding="async">',
    '<img src="https://i.ibb.co/9HzZCWjP/logo5.png" alt="Luxury African Fashion" class="w-full h-full object-cover opacity-60 h-auto" fetchpriority="high" loading="eager" decoding="sync">'
);

// 3. Fallback couples_bg to a remote image if the file is corrupted
// We can use another collection image since we don't have the original couples_bg
html = html.replace(
    '<img src="./couples_bg.jpg" alt="Couples Collection 2" class="w-full h-full object-cover absolute inset-0 animate-fade-2 h-auto" loading="lazy" decoding="async">',
    '<img src="https://i.ibb.co/LhHwdchf/Whats-App-Image-2026-07-28-at-11-06-32-PM.jpg" alt="Couples Collection 2" class="w-full h-full object-cover absolute inset-0 animate-fade-2 h-auto" loading="lazy" decoding="async">'
);

fs.writeFileSync('index.html', html);
console.log('Images optimized for speed.');
