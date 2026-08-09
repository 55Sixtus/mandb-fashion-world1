const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldSuccessOverlay = `<div id="formSuccessOverlay" class="absolute inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-center p-8 rounded-3xl opacity-0 pointer-events-none transition-opacity duration-300">
                <div class="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                  <svg class="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 class="font-playfair text-2xl md:text-3xl text-charcoal mb-4">Thank you!</h3>
                <p class="text-charcoal/70 mb-8 max-w-md">We received your order. We will contact you on WhatsApp + Email within 24 hours.</p>
                
              </div>`;

const newSuccessOverlay = `<div id="formSuccessOverlay" class="absolute inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-center p-8 rounded-3xl opacity-0 pointer-events-none transition-opacity duration-300">
                <div class="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                  <svg class="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 class="font-playfair text-2xl md:text-3xl text-charcoal mb-4">Thank you!</h3>
                <p class="text-charcoal/70 mb-6 max-w-md">We received your order. We will contact you on WhatsApp + Email within 24 hours.</p>
                <div class="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <button type="button" id="printOrderBtn" class="font-medium py-3 px-6 rounded-xl border border-charcoal/20 hover:bg-[#FAF6F0] transition-all flex items-center justify-center gap-2">
                        <svg class="w-5 h-5 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                        Print Details
                    </button>
                    <button type="button" id="closeSuccessBtn" class="font-medium py-3 px-6 rounded-xl bg-charcoal text-white hover:bg-black transition-all">
                        Close
                    </button>
                </div>
              </div>`;

html = html.replace(oldSuccessOverlay, newSuccessOverlay);
fs.writeFileSync('index.html', html);
console.log('Success overlay updated');
