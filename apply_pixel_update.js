const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Update <head> Meta Pixel script
const oldPixelPattern = /<script>!function\(e,t,n,c,o,a,f\)[\s\S]*?fbq\("track","PageView"\)<\/script>\s*<noscript><img[^>]*><\/noscript>/;

const newPixelSnippet = `<script>
window.META_PIXEL_ID = window.META_PIXEL_ID || 'YOUR_META_PIXEL_ID';
if (!window.fbq) {
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', window.META_PIXEL_ID);
  fbq('track', 'PageView');
}
</script>
<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=YOUR_META_PIXEL_ID&ev=PageView&noscript=1"></noscript>
<script src="assets/tracking.js"></script>`;

if (oldPixelPattern.test(html)) {
  html = html.replace(oldPixelPattern, newPixelSnippet);
  console.log('Successfully updated Meta Pixel base snippet in <head>.');
} else {
  console.log('Old Pixel pattern not matched directly, checking alternative replacement.');
  // If not matched, replace existing fbq block before </head>
  if (html.includes('fbq("track","PageView")')) {
    html = html.replace(/<script>!function[\s\S]*?<\/head>/, newPixelSnippet + '\n</head>');
    console.log('Replaced via alternative pattern.');
  }
}

// 2. Replace Script 8 (the previous inline event handler) with clean MBTracker bindings
const oldScript8Pattern = /<script>document\.addEventListener\("DOMContentLoaded",\(\)=>\{function e\(e,t,n\)[\s\S]*?fbq\("track","ViewContent"\)\}\)<\/script>/;

const newScript8Snippet = `<script>
document.addEventListener("DOMContentLoaded", () => {
  if (window.MBTracker) {
    // Initial page load tracked via base snippet
    // ViewContent tracked via IntersectionObserver in assets/tracking.js
  }
});
</script>`;

if (oldScript8Pattern.test(html)) {
  html = html.replace(oldScript8Pattern, newScript8Snippet);
  console.log('Successfully replaced Script 8 with clean tracker initialization.');
} else {
  console.log('Script 8 pattern not found, checking exact text.');
}

// 3. Make sure form handler uses MBTracker for Lead tracking
// In fetch success:
html = html.replace(
  '"undefined"!=typeof fbq&&fbq("track","Lead")',
  'if(window.MBTracker){MBTracker.trackLead("Bespoke Order Submission","Email Form")}else if(typeof fbq!=="undefined"){fbq("track","Lead")}'
);

// In WhatsApp fallback button click:
html = html.replace(
  '"undefined"!=typeof fbq&&fbq("track","Lead")',
  'if(window.MBTracker){MBTracker.trackLead("Bespoke Order Submission (WhatsApp)","WhatsApp Form")}else if(typeof fbq!=="undefined"){fbq("track","Lead")}'
);

fs.writeFileSync('index.html', html);
console.log('Completed pixel integration updates on index.html.');
