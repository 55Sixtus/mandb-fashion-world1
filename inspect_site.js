const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find all <a> tags
const aTags = [...html.matchAll(/<a\s+[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi)];
console.log('=== A TAGS (' + aTags.length + ') ===');
aTags.forEach((a, i) => {
  const href = a[1];
  const text = a[2].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  console.log(`${i+1}. href: ${href} | text: ${text}`);
});

// Find all <button> tags
const buttonTags = [...html.matchAll(/<button\s*([^>]*)>([\s\S]*?)<\/button>/gi)];
console.log('\n=== BUTTON TAGS (' + buttonTags.length + ') ===');
buttonTags.forEach((b, i) => {
  const attrs = b[1];
  const text = b[2].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  console.log(`${i+1}. attrs: ${attrs} | text: ${text}`);
});

// Find all forms
const forms = [...html.matchAll(/<form\s*([^>]*)>/gi)];
console.log('\n=== FORMS (' + forms.length + ') ===');
forms.forEach((f, i) => {
  console.log(`${i+1}. attrs: ${f[1]}`);
});
