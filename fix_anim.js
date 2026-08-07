const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace animate-fade-in-up with fade-up in-view so it immediately shows
html = html.replace('animate-fade-in-up', 'fade-up in-view delay-500');

// Inject the keyframes into <style> for other animations if needed, but fade-up in-view should just work because the class defines:
// .fade-up { opacity: 0; transform: translateY(40px); ... }
// .fade-up.in-view { opacity: 1; transform: translateY(0); }

fs.writeFileSync('index.html', html);
console.log('Fixed animation');
