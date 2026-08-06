const fs = require('fs');
const cheerio = require('cheerio');
let html = fs.readFileSync('index_backup.html', 'utf-8');
const $ = cheerio.load(html, { decodeEntities: false });

// REMOVE OLD ATTEMPTS
$('div:has(> span:contains("✈️ Worldwide Shipping"))').remove();
$('a[href*="wa.me/2348169318277"]:has(svg)').remove();
$('section:has(h2:contains("Shipping & Payment"))').remove();
$('section:has(h2:contains("Loved by Clients Worldwide"))').remove();
$('div.mt-8.text-center.bg-gray-50:has(a:contains("Download Size Guide PDF"))').remove();
$('p:contains("Trusted by 500+ clients")').remove();
$('div.mt-12.pt-8.border-t.border-gray-800:has(a:contains("Privacy Policy"))').remove();
$('#privacy-policy, #refund-policy, #terms-of-service').remove();
$('section:has(h2:contains("Privacy Policy"))').remove();
$('section:has(h2:contains("Refund & Returns Policy"))').remove();
$('section:has(h2:contains("Terms of Service"))').remove();
$('a.wa-success-btn').remove();

// 1. All images: loading="lazy", decoding="async", w-full h-auto object-cover
$('img').attr('loading', 'lazy').attr('decoding', 'async');
$('img').addClass('w-full h-auto object-cover');

// Fix contact image
$('img[src*="IMG-20260728-WA0118.jpg"], img[src*="IMG-20260728-WA0119.jpg"]').css({
    'object-position': 'center top',
    'max-height': '80vh'
});

// 2. Instagram Link
$('a[href*="instagram.com"]').attr('href', 'https://www.instagram.com/mandbfashionworld?utm_source=qr&igsh=MWY4Nmpzc3Y4aW52Yw==');

// 3. Top bar
$('body').prepend(`
<div class="trust-bar-usa bg-brand-primary text-white text-xs sm:text-sm py-2 px-4 text-center sticky top-0 z-50 shadow-md flex justify-center flex-wrap gap-2 md:gap-4 items-center w-full font-sans font-medium">
  <span>✈️ Worldwide Shipping to US, UK, Canada</span>
  <span class="hidden md:inline text-white/50">|</span>
  <span>💳 Pay with Bank Transfer, PayPal, Card</span>
  <span class="hidden md:inline text-white/50">|</span>
  <span>📦 Delivery 10-14 Days via DHL/FedEx</span>
</div>
`);

// 4. Floating WhatsApp
$('body').append(`
<a href="https://wa.me/2348169318277?text=Hi%20M%26B%20I%20saw%20your%20website%20and%20I%20want%20to%20order" 
   class="floating-wa-usa fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all z-50 flex items-center justify-center transform hover:scale-110 min-h-[48px]"
   target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
   <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
     <path d="M12.031 0C5.385 0 0 5.388 0 12.037c0 2.128.555 4.195 1.611 6.012L.15 23.475l5.576-1.46c1.761.968 3.743 1.481 5.795 1.481h.01c6.645 0 12.035-5.387 12.035-12.036C23.565 5.388 18.18 0 12.031 0zm.01 21.498h-.008c-1.802 0-3.568-.485-5.112-1.401l-.367-.218-3.8.995.998-3.705-.239-.379a9.972 9.972 0 0 1-1.528-5.387c0-5.503 4.476-9.982 9.98-9.982 5.505 0 9.982 4.479 9.982 9.982 0 5.503-4.477 9.981-9.982 9.981zM17.5 14.156c-.302-.152-1.789-.884-2.066-.985-.276-.102-.477-.152-.678.152-.202.304-.779.985-.955 1.188-.176.202-.353.228-.654.076-1.54-.777-2.614-1.391-3.619-2.646-.263-.328.026-.307.319-.893.101-.202.05-.38-.025-.532-.075-.152-.678-1.636-.931-2.244-.246-.593-.497-.512-.678-.521-.176-.008-.378-.008-.579-.008s-.528.076-.805.38c-.277.304-1.055 1.03-1.055 2.511s1.08 2.912 1.231 3.115c.151.202 2.124 3.242 5.143 4.545.719.31 1.28.495 1.718.634.721.229 1.378.196 1.895.119.58-.087 1.789-.731 2.041-1.439.252-.708.252-1.314.176-1.439-.075-.125-.277-.201-.579-.353z"/>
   </svg>
</a>
`);

// 5 & 6. Social Proof & Payment/Shipping
const faqSection = $('section:has(h2:contains("Frequently Asked Questions"))');
const sectionsHtml = `
<section id="shipping-payment-intl" class="py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-5xl font-bold font-serif text-brand-secondary mb-4">Shipping & Payment for International Clients</h2>
      <div class="w-24 h-1 bg-brand-primary mx-auto mb-8"></div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div class="bg-gray-50 p-8 rounded-xl border border-gray-100">
        <div class="text-4xl mb-4">✈️</div>
        <h3 class="text-2xl font-bold text-brand-secondary mb-4">Fast Worldwide Shipping</h3>
        <ul class="space-y-4 text-gray-700">
          <li class="flex items-start"><span class="mr-2 font-bold text-brand-primary">✓</span> DHL/FedEx Worldwide. 10-14 Days. Tracking provided.</li>
          <li class="flex items-start"><span class="mr-2 font-bold text-brand-primary">✓</span> Full tracking number provided immediately upon dispatch.</li>
          <li class="flex items-start"><span class="mr-2 font-bold text-brand-primary">✓</span> Customs: We declare as 'Custom Clothing'. Duties paid by customer.</li>
        </ul>
      </div>
      <div class="bg-gray-50 p-8 rounded-xl border border-gray-100">
        <div class="text-4xl mb-4">💳</div>
        <h3 class="text-2xl font-bold text-brand-secondary mb-4">Secure Payment Options</h3>
        <ul class="space-y-4 text-gray-700">
          <li class="flex items-start"><span class="mr-2 font-bold text-brand-primary">✓</span> Payments: Bank Transfer, PayPal, Card. Invoice sent via Email.</li>
          <li class="flex items-start"><span class="mr-2 font-bold text-brand-primary">✓</span> Local and International accounts available.</li>
          <li class="flex items-start"><span class="mr-2 font-bold text-brand-primary">✓</span> PayPal protection for buyer peace of mind.</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section id="loved-by-clients" class="py-20 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-5xl font-bold font-serif text-brand-secondary mb-4">Loved by Clients Worldwide</h2>
      <div class="w-24 h-1 bg-brand-primary mx-auto"></div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="bg-white p-8 rounded-xl shadow-lg text-center transform transition duration-500 hover:-translate-y-2">
        <div class="flex justify-center mb-4 text-yellow-400">★★★★★</div>
        <p class="text-gray-700 italic mb-6">"The fit was perfect! Ordered from the UK and it arrived exactly on time."</p>
        <p class="font-bold text-brand-secondary">- Aisha K., London, UK 🇬🇧</p>
      </div>
      <div class="bg-white p-8 rounded-xl shadow-lg text-center transform transition duration-500 hover:-translate-y-2">
        <div class="flex justify-center mb-4 text-yellow-400">★★★★★</div>
        <p class="text-gray-700 italic mb-6">"Best custom gown I’ve ever owned. The attention to detail is unmatched."</p>
        <p class="font-bold text-brand-secondary">- Chioma O., Toronto, CA 🇨🇦</p>
      </div>
      <div class="bg-white p-8 rounded-xl shadow-lg text-center transform transition duration-500 hover:-translate-y-2">
        <div class="flex justify-center mb-4 text-yellow-400">★★★★★</div>
        <p class="text-gray-700 italic mb-6">"Delivered to New York in 12 days. The fabric and tailoring were exquisite."</p>
        <p class="font-bold text-brand-secondary">- Tolu A., USA 🇺🇸</p>
      </div>
    </div>
  </div>
</section>
`;
if(faqSection.length) {
    faqSection.before(sectionsHtml);
} else {
    $('main').append(sectionsHtml);
}

// 7. Size Guide Download
const sizeGuideBtn = `
<div class="size-guide-btn-usa mt-8 text-center bg-gray-50 p-6 rounded-lg border border-gray-200">
  <p class="text-lg text-brand-secondary mb-4 font-medium">Not sure? Send us 3 photos and we’ll guide you.</p>
  <a href="#PASTE_PDF_LINK_HERE" class="inline-flex min-h-[48px] items-center justify-center bg-brand-primary text-white font-semibold py-3 px-8 rounded hover:bg-opacity-90 transition shadow-md">
    Download Size Guide PDF
  </a>
</div>
`;
const measureSection = $('section:has(h2:contains("How To Measure"))');
if(measureSection.length) {
    measureSection.find('.grid').after(sizeGuideBtn);
}

// 8. Text Replacements
$('*').contents().each(function() {
    if(this.type === 'text') {
        let text = $(this).text();
        let changed = false;
        
        if (text.includes('DM us')) {
            text = text.replace(/DM us/g, 'Email or WhatsApp us');
            changed = true;
        }
        
        if (text.includes('NGN')) {
            text = text.replace(/NGN/g, 'USD/GBP/EUR');
            changed = true;
        }
        if (text.includes('Naira')) {
            text = text.replace(/Naira/g, 'USD/GBP/EUR');
            changed = true;
        }

        if (changed) {
            $(this).replaceWith(text);
        }
    }
});

// 9. Hero subtext
const heroTextDiv = $('section#home div.max-w-3xl');
if(heroTextDiv.length) {
    heroTextDiv.find('p.text-xl, p.text-lg').first().after('<p class="hero-trusted-usa text-lg md:text-xl font-medium text-brand-primary mt-4 bg-white/10 inline-block px-4 py-2 rounded-full backdrop-blur-sm border border-white/20 shadow-sm animate-fade-in-up" style="animation-delay: 0.3s;">Trusted by 500+ clients in 15+ countries 🌎</p>');
}

// 10. Form upgrades
$('form').attr('data-netlify', 'true').attr('data-netlify-recaptcha', 'true');
$('form').each((i, el) => {
    $(el).prepend('<input type="hidden" name="form-name" value="order">');
});

// Form success message should have "Chat on WhatsApp Now" button
if ($('#formSuccessOverlay').length) {
    $('#formSuccessOverlay .text-center').append(`
        <a href="https://wa.me/2348169318277?text=Hi%20M%26B%20I%20just%20submitted%20an%20order%20form%20on%20your%20website" class="wa-success-btn mt-4 inline-flex min-h-[48px] items-center justify-center bg-green-500 text-white font-semibold py-3 px-8 rounded hover:bg-green-600 transition shadow-md w-full">
            Chat on WhatsApp Now
        </a>
    `);
}

// 11. Footer legal
const footerLegal = `
<div class="footer-legal-links mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-400 space-y-4">
  <div class="flex flex-wrap justify-center gap-4 md:space-x-6">
    <a href="#privacy-policy" class="hover:text-brand-primary transition min-h-[48px] inline-flex items-center">Privacy Policy</a>
    <a href="#terms-of-service" class="hover:text-brand-primary transition min-h-[48px] inline-flex items-center">Terms of Service</a>
    <a href="#refund-policy" class="hover:text-brand-primary transition min-h-[48px] inline-flex items-center">Refund & Returns Policy</a>
  </div>
</div>
`;
$('footer .max-w-7xl').append(footerLegal);

const legalModals = `
<section id="privacy-policy" class="py-20 bg-gray-50 border-t border-gray-200">
  <div class="max-w-4xl mx-auto px-4">
    <h2 class="text-3xl font-bold text-brand-secondary mb-6 font-serif">Privacy Policy</h2>
    <p class="text-gray-700 leading-relaxed">M&B Fashion World respects your privacy. We collect name, email, phone, measurements, and photos only to create your custom garment. We do not share your data with third parties. Payment info is processed by PayPal/Bank and not stored by us. Contact: <a href="mailto:beckydominic133@gmail.com" class="text-brand-primary underline">beckydominic133@gmail.com</a> to request data deletion.</p>
  </div>
</section>

<section id="refund-policy" class="py-20 bg-white border-t border-gray-200">
  <div class="max-w-4xl mx-auto px-4">
    <h2 class="text-3xl font-bold text-brand-secondary mb-6 font-serif">Refund & Returns Policy</h2>
    <p class="text-gray-700 leading-relaxed">All garments are custom made to your measurements. Due to this, we do not offer refunds. We offer 1 free remake if the fit is incorrect due to our error within 7 days of receiving the item. Please contact us immediately if you experience any issues.</p>
  </div>
</section>

<section id="terms-of-service" class="py-20 bg-gray-50 border-t border-gray-200">
  <div class="max-w-4xl mx-auto px-4">
    <h2 class="text-3xl font-bold text-brand-secondary mb-6 font-serif">Terms of Service</h2>
    <p class="text-gray-700 leading-relaxed">By placing an order with M&B Fashion World, you agree to our processing and shipping timelines. Custom orders require a 50% deposit upfront, with the balance due before shipping. We are not responsible for delays caused by customs clearance in your country.</p>
  </div>
</section>
`;
$('footer').after(legalModals);

// 12. Fix meta tags
$('title').text('M&B Fashion World | Custom Tailored Dresses Worldwide');
if ($('meta[name="description"]').length) {
    $('meta[name="description"]').attr('content', 'Luxury custom tailored dresses shipped worldwide to US, UK, Canada. Perfect fit guaranteed.');
} else {
    $('head').append('<meta name="description" content="Luxury custom tailored dresses shipped worldwide to US, UK, Canada. Perfect fit guaranteed.">');
}

if ($('meta[property="og:title"]').length) {
    $('meta[property="og:title"]').attr('content', 'M&B Fashion World | Custom Tailored Dresses Worldwide');
} else {
    $('head').append('<meta property="og:title" content="M&B Fashion World | Custom Tailored Dresses Worldwide" />');
}

if ($('meta[property="og:description"]').length) {
    $('meta[property="og:description"]').attr('content', 'Luxury custom tailored dresses shipped worldwide to US, UK, Canada. Perfect fit guaranteed.');
} else {
    $('head').append('<meta property="og:description" content="Luxury custom tailored dresses shipped worldwide to US, UK, Canada. Perfect fit guaranteed." />');
}

// 13. Mobile responsiveness
// Fix hero section
$('section#home').removeClass('h-screen').addClass('min-h-screen py-24 pb-8 flex items-center justify-center');
$('section#home h1').removeClass('text-5xl md:text-7xl').addClass('text-3xl sm:text-4xl md:text-5xl lg:text-6xl');
$('section#home p').removeClass('text-xl md:text-2xl').addClass('text-lg sm:text-xl md:text-2xl');

// Add min-height to all buttons and links for tappability
$('a, button').addClass('min-h-[48px]');

// Clean up any remaining <!-- Optimized... --> from previous runs, we'll replace it
let outHtml = $.html();
outHtml = outHtml.replace(/<!-- Optimized for US\/UK\/CA Ads\. Deploy to Netlify\. Enable Email Notifications in Netlify Forms\. -->\n?/g, '');
outHtml = '<!-- Optimized for US/UK/CA Ads. Deploy to Netlify. Enable Email Notifications in Netlify Forms. -->\n' + outHtml;

fs.writeFileSync('index.html', outHtml);
console.log('Cleaned and re-applied properly.');
