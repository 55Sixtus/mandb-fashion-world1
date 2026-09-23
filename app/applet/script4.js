// Global State & Functions for CRO USA WhatsApp Ordering
window.selectedColors = {
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
  const lines = [
    'Hi M&B Fashion World, I want to order this exact outfit: ' + v.productName,
    '• Color: ' + v.colorName,
    '• Size: ' + v.sizeName
  ];
  if (v.photoUrl) {
    lines.push('• Photo Link: ' + v.photoUrl);
  }
  lines.push('• Link: ' + v.productLink);
  lines.push('Please confirm availability, price in USD ($), and 50% deposit payment link for 3-5 day USA express delivery.');
  
  const msg = lines.join('\n');
  if (window.MBTracker && typeof MBTracker.trackLead === 'function') {
    MBTracker.trackLead('WhatsApp Order', v.productName);
  }
  
  const url = 'https://wa.me/2348160761870?text=' + encodeURIComponent(msg);
  window.open(url, '_blank');
};

window.openSizeChartModal = function() {
  const modal = document.getElementById('sizeChartModal');
  if (modal) {
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100', 'pointer-events-auto');
  }
};

window.closeSizeChartModal = function() {
  const modal = document.getElementById('sizeChartModal');
  if (modal) {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.classList.remove('opacity-100', 'pointer-events-auto');
  }
};

window.toggleTheme = function() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

window.toggleMobileMenu = function() {
  const menu = document.getElementById('mobileMenu');
  const backdrop = document.getElementById('mobileMenuBackdrop');
  if (menu) menu.classList.toggle('translate-x-full');
  if (backdrop) backdrop.classList.toggle('hidden');
};

window.closeMobileMenu = function() {
  const menu = document.getElementById('mobileMenu');
  const backdrop = document.getElementById('mobileMenuBackdrop');
  if (menu) menu.classList.add('translate-x-full');
  if (backdrop) backdrop.classList.add('hidden');
};

window.toggleWaPopup = function(e) {
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
    const lines = [
      'Hi M&B Fashion World, I am ordering from USA.',
      'I am interested in this specific outfit variant:',
      '• Outfit: ' + v.productName,
      '• Color Variant: ' + v.colorName,
      '• US Size: ' + v.sizeName
    ];
    if (v.photoUrl) {
      lines.push('• Photo Link: ' + v.photoUrl);
    }
    lines.push('• Link: ' + v.productLink);
    lines.push('Please confirm availability, price in USD ($), and 50% deposit payment link for 3-5 day USA express delivery.');
    text = lines.join('\n');
  } else {
    text = 'Hello M&B Fashion World, I am ordering from USA. I want to check custom outfit styles, colors, US sizing, and 3-5 day express shipping.';
  }

  window.open('https://wa.me/2348160761870?text=' + encodeURIComponent(text), '_blank');
};
