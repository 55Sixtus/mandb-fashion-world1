const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Facebook Pixel Base Code
const fbPixel = `
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_META_PIXEL_ID');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=YOUR_META_PIXEL_ID&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->
`;

const googlePixel = `
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GOOGLE_ADS_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'YOUR_GOOGLE_ADS_ID');
</script>
`;

const seoExtras = `
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
`;

// Clean up duplicate og:title and og:description if they exist (simple replace for exact duplicates)
const ogTitle = '<meta property="og:title" content="M&amp;B Fashion World | Custom Tailored Dresses Worldwide">';
const ogDesc = '<meta property="og:description" content="Luxury custom tailored dresses shipped worldwide to US, UK, Canada. Perfect fit guaranteed.">';

let firstIndexTitle = html.indexOf(ogTitle);
if (firstIndexTitle !== -1) {
    let secondIndexTitle = html.indexOf(ogTitle, firstIndexTitle + 1);
    while (secondIndexTitle !== -1) {
        html = html.substring(0, secondIndexTitle) + html.substring(secondIndexTitle + ogTitle.length);
        secondIndexTitle = html.indexOf(ogTitle, firstIndexTitle + 1);
    }
}

let firstIndexDesc = html.indexOf(ogDesc);
if (firstIndexDesc !== -1) {
    let secondIndexDesc = html.indexOf(ogDesc, firstIndexDesc + 1);
    while (secondIndexDesc !== -1) {
        html = html.substring(0, secondIndexDesc) + html.substring(secondIndexDesc + ogDesc.length);
        secondIndexDesc = html.indexOf(ogDesc, firstIndexDesc + 1);
    }
}

// Insert into head
html = html.replace('</head>', '\n' + seoExtras + '\n' + fbPixel + '\n' + googlePixel + '\n</head>');

fs.writeFileSync('index.html', html);
console.log("Added tracking pixels and SEO extras");
