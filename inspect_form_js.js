const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find script containing 'order-form'
const scripts = [...html.matchAll(/<script[\s\S]*?<\/script>/g)];
scripts.forEach((s, idx) => {
  if (s[0].includes('order-form')) {
    console.log(`=== Script ${idx + 1} (Order Form Script) ===`);
    console.log(s[0]);
  }
});
