const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldCheckboxHtml = `<label class="flex items-start gap-4 cursor-pointer group">
                  <div class="relative flex items-center justify-center mt-1">
                    <input type="checkbox" required="" class="w-5 h-5 border-2 border-charcoal/30 rounded-sm appearance-none checked:bg-gold checked:border-gold transition-colors peer luxury-input" aria-required="true" aria-label="Form Field">
                    <svg class="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span class="text-sm text-charcoal/80 font-light leading-relaxed group-hover:text-charcoal transition-colors">I understand that custom-made garments require a 70% deposit and precise measurements.</span>
                </label>`;

const newCheckboxHtml = `<label class="flex items-start gap-4 cursor-pointer group">
                  <div class="relative flex items-center justify-center mt-1">
                    <input type="checkbox" required="" class="w-5 h-5 border-2 border-charcoal/30 rounded-sm appearance-none checked:bg-gold checked:border-gold transition-colors peer luxury-input" aria-required="true" aria-label="Form Field">
                    <svg class="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span class="text-sm text-charcoal/80 font-light leading-relaxed group-hover:text-charcoal transition-colors">I understand that custom-made garments require a 70% deposit and precise measurements.</span>
                </label>
                <p class="error-message text-red-500 text-xs mt-1 hidden ml-9">You must agree to the terms to proceed.</p>`;

html = html.replace(oldCheckboxHtml, newCheckboxHtml);

fs.writeFileSync('index.html', html);
console.log('Fixed checkbox');
