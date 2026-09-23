const fs = require('fs');
let html = fs.readFileSync('/app/applet/index.html', 'utf8');

// 1. Replace state functions in index.html
const oldFunctionsBlock = /window\.selectedColors\s*=\s*\{[\s\S]*?\};[\s\S]*?window\.orderOnWhatsApp\s*=\s*function\(prodId, productName\)[\s\S]*?\};/;

const newFunctionsBlock = `window.selectedColors = {
  1: 'Royal Blue',
  2: 'Emerald Green',
  3: 'Pure Gold',
  4: 'Regal Burgundy',
  5: 'Midnight Onyx',
  6: 'Coral Rose'
};

window.selectedPhotos = {
  1: 'https://i.ibb.co/1GXGWCw4/Whats-App-Image-2026-07-28-at-11-08-08-PM.jpg',
  2: 'https://i.ibb.co/ZpVrszgn/Whats-App-Image-2026-07-28-at-11-07-50-PM.jpg',
  3: 'https://i.ibb.co/s9x1P9y4/Whats-App-Image-2026-07-28-at-11-08-01-PM.jpg',
  4: 'https://i.ibb.co/xS2kKmtP/Whats-App-Image-2026-07-28-at-11-07-42-PM.jpg',
  5: 'https://i.ibb.co/Y4xPqY53/Whats-App-Image-2026-07-28-at-11-08-08-PM.jpg',
  6: 'https://i.ibb.co/MyB1kRjX/Whats-App-Image-2026-07-28-at-11-07-50-PM.jpg'
};

window.activeProductVariant = null;

window.selectProductColor = function(prodId, colorName, photoUrl) {
  window.selectedColors[prodId] = colorName;
  if (photoUrl) {
    window.selectedPhotos[prodId] = photoUrl;
  }
  
  const imgEl = document.getElementById('prod-' + prodId + '-img');
  const labelEl = document.getElementById('prod-' + prodId + '-color-label');
  
  if (imgEl && photoUrl) {
    imgEl.src = photoUrl;
  }
  if (labelEl) {
    labelEl.innerText = 'Color: ' + colorName;
  }

  window.setActiveVariant(prodId);
};

window.setActiveVariant = function(prodId) {
  const prodContainer = document.getElementById('prod-' + prodId);
  const titleEl = prodContainer ? prodContainer.querySelector('h3') : null;
  const productName = titleEl ? titleEl.innerText : ('Outfit #' + prodId);
  const colorName = window.selectedColors[prodId] || 'Selected Variant';
  const sizeSelect = document.getElementById('prod-' + prodId + '-size');
  const sizeName = sizeSelect ? sizeSelect.value : 'US Standard Size';
  const imgEl = document.getElementById('prod-' + prodId + '-img');
  const photoUrl = window.selectedPhotos[prodId] || (imgEl ? imgEl.src : '');

  window.activeProductVariant = {
    prodId: prodId,
    productName: productName,
    colorName: colorName,
    sizeName: sizeName,
    photoUrl: photoUrl,
    productLink: 'https://mandbfashionworld.com#prod-' + prodId,
    timestamp: Date.now()
  };

  console.log('[Variant Selected]', window.activeProductVariant);
};

window.orderOnWhatsApp = function(prodId, productName) {
  window.setActiveVariant(prodId);
  const v = window.activeProductVariant;
  let msg = 'Hi M&B Fashion World, I want to order this exact outfit: ' + v.productName + '\n';
  msg += '• Color: ' + v.colorName + '\n';
  msg += '• Size: ' + v.sizeName + '\n';
  if (v.photoUrl) {
    msg += '• Photo Link: ' + v.photoUrl + '\n';
  }
  msg += '• Link: ' + v.productLink + '\n';
  msg += 'Please confirm availability, price in USD ($), and 50% deposit payment link for 3-5 day USA express delivery.';
  
  if (window.MBTracker && typeof MBTracker.trackLead === 'function') {
    MBTracker.trackLead('WhatsApp Order', v.productName);
  }
  
  const url = 'https://wa.me/2348160761870?text=' + encodeURIComponent(msg);
  window.open(url, '_blank');
};`;

if (oldFunctionsBlock.test(html)) {
  html = html.replace(oldFunctionsBlock, newFunctionsBlock);
  console.log('Successfully replaced functions block!');
} else {
  console.log('oldFunctionsBlock regex did not match.');
}

// 2. Replace window.toggleWaPopup
const oldToggleWaFunc = /window\.toggleWaPopup\s*=\s*function\(e\)[\s\S]*?\};/;
const newToggleWaFunc = `window.toggleWaPopup = function(e) {
  if (e) { try { e.preventDefault(); e.stopPropagation(); } catch(err){} }
  console.log('[Analytics] Floating WhatsApp Toggle clicked');

  if (window.MBTracker && typeof MBTracker.trackLead === 'function') {
    MBTracker.trackLead('WhatsApp Click', 'Floating Widget');
  } else if (typeof fbq !== 'undefined') {
    fbq('track', 'Contact', { content_name: 'Floating WhatsApp Toggle' });
  }
  if (typeof gtag !== 'undefined') {
    gtag('event', 'whatsapp_click', { event_category: 'Engagement', event_label: 'Floating Widget' });
  }

  let text = '';
  if (window.activeProductVariant && window.activeProductVariant.productName) {
    const v = window.activeProductVariant;
    text = "Hi M&B Fashion World, I am ordering from USA.\n";
    text += "I am interested in this specific outfit variant:\n";
    text += "• Outfit: " + v.productName + "\n";
    text += "• Color Variant: " + v.colorName + "\n";
    text += "• US Size: " + v.sizeName + "\n";
    if (v.photoUrl) {
      text += "• Photo Link: " + v.photoUrl + "\n";
    }
    text += "• Link: " + v.productLink + "\n";
    text += "Please confirm availability, price in USD ($), and 50% deposit payment link for 3-5 day USA express delivery.";
  } else {
    text = "Hello M&B Fashion World, I am ordering from USA. I want to check custom outfit styles, colors, US sizing, and 3-5 day express shipping.";
  }

  window.open("https://wa.me/2348160761870?text=" + encodeURIComponent(text), "_blank");
};`;

if (oldToggleWaFunc.test(html)) {
  html = html.replace(oldToggleWaFunc, newToggleWaFunc);
  console.log('Successfully replaced window.toggleWaPopup!');
} else {
  console.log('oldToggleWaFunc regex did not match.');
}

// 3. Update DOMContentLoaded waToggleBtn handler to use window.toggleWaPopup
const oldDomHandlerRegex = /waToggleBtn\.addEventListener\("click", \(e\) => \{[\s\S]*?\}\);/;
const newDomHandler = `waToggleBtn.addEventListener("click", (e) => {
      window.toggleWaPopup(e);
    });`;

if (oldDomHandlerRegex.test(html)) {
  html = html.replace(oldDomHandlerRegex, newDomHandler);
  console.log('Successfully updated DOMContentLoaded waToggleBtn listener!');
} else {
  console.log('oldDomHandlerRegex did not match.');
}

// 4. Add product listeners in DOMContentLoaded
const domLoadedTarget = 'document.addEventListener("DOMContentLoaded", () => {';
const productListenersCode = `document.addEventListener("DOMContentLoaded", () => {
  // Bind product card interaction observers
  [1, 2, 3, 4, 5, 6].forEach(id => {
    const card = document.getElementById('prod-' + id);
    if (card) {
      ['click', 'mouseenter', 'touchstart'].forEach(evt => {
        card.addEventListener(evt, () => window.setActiveVariant(id), { passive: true });
      });
    }
    const sizeSelect = document.getElementById('prod-' + id + '-size');
    if (sizeSelect) {
      sizeSelect.addEventListener('change', () => window.setActiveVariant(id));
    }
  });`;

if (!html.includes('Bind product card interaction observers')) {
  html = html.replace(domLoadedTarget, productListenersCode);
  console.log('Successfully bound product card interaction observers!');
}

fs.writeFileSync('/app/applet/index.html', html);
