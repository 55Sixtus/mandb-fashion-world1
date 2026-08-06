const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Update form tag
html = html.replace(
  /<form[\s\S]*?id="netlifyOrderForm"\s*>/,
  `<!-- Netlify Email Notification: Please enable form notifications in Netlify settings to send submissions to beckydominic133@gmail.com -->
            <form
              name="order"
              method="POST"
              data-netlify="true"
              data-netlify-recaptcha="true"
              enctype="multipart/form-data"
              class="bg-white p-8 md:p-12 rounded-3xl shadow-luxury border border-champagne card-luxury relative"
              id="order-form"
            >`
);

// 2. Add Gender field after Country
const countryField = `                  <div>
                    <label
                      class="block text-xs uppercase tracking-widest text-charcoal/60 mb-2"
                      >Country *</label
                    >
                    <input
                      type="text"
                      name="country"
                      required=""
                      class="luxury-input w-full"
                      placeholder="e.g. USA, UK, Canada"
                      aria-required="true"
                      aria-label="e.g. USA, UK, Canada"
                    />
                  </div>`;
const genderField = `
                  <div>
                    <label
                      class="block text-xs uppercase tracking-widest text-charcoal/60 mb-2"
                      >Gender *</label
                    >
                    <select
                      name="gender"
                      required=""
                      class="luxury-input luxury-select w-full text-charcoal"
                      aria-required="true"
                      aria-label="Gender"
                    >
                      <option value="" disabled="" selected="">Select Gender</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                    </select>
                  </div>`;
html = html.replace(countryField, countryField + genderField);

// 3. Add Upload Measurement Photos
const inspirationUpload = `              <div class="mb-12">
                <h4
                  class="font-playfair text-xl text-charcoal mb-6 border-b border-champagne pb-4"
                >
                  Upload Inspiration
                </h4>
                <div>
                  <label
                    class="block text-xs uppercase tracking-widest text-charcoal/60 mb-4"
                    >Upload Inspiration Images</label
                  >
                  <div
                    class="border-2 border-dashed border-champagne rounded-xl p-8 text-center hover:bg-[#FAF6F0] transition-colors relative card-luxury"
                  >
                    <input
                      type="file"
                      name="inspiration"
                      id="inspiration"
                      multiple=""
                      accept=".jpg,.jpeg,.png,.webp"
                      class="absolute inset-0 w-full h-full opacity-0 cursor-pointer luxury-input"
                      aria-label="inspiration"
                    />
                    <div class="flex flex-col items-center pointer-events-none">
                      <svg
                        class="w-10 h-10 text-gold mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        ></path>
                      </svg>
                      <span class="text-charcoal font-medium mb-1"
                        >Click to upload images</span
                      >
                      <span class="text-charcoal/50 text-xs"
                        >Accepted: JPG, JPEG, PNG, WEBP</span
                      >
                    </div>
                  </div>
                </div>
              </div>`;

const measurementPhotos = `
              <div class="mb-12 mt-8">
                <h4
                  class="font-playfair text-xl text-charcoal mb-6 border-b border-champagne pb-4"
                >
                  Upload Measurement Photos
                </h4>
                <div>
                  <label
                    class="block text-xs uppercase tracking-widest text-charcoal/60 mb-4"
                    >Upload photos of yourself for accurate measurements</label
                  >
                  <div
                    class="border-2 border-dashed border-champagne rounded-xl p-8 text-center hover:bg-[#FAF6F0] transition-colors relative card-luxury"
                  >
                    <input
                      type="file"
                      name="measurement_photos"
                      id="measurement_photos"
                      multiple=""
                      accept=".jpg,.jpeg,.png,.webp"
                      class="absolute inset-0 w-full h-full opacity-0 cursor-pointer luxury-input"
                      aria-label="measurement photos"
                    />
                    <div class="flex flex-col items-center pointer-events-none">
                      <svg
                        class="w-10 h-10 text-gold mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        ></path>
                      </svg>
                      <span class="text-charcoal font-medium mb-1"
                        >Click to upload images</span
                      >
                      <span class="text-charcoal/50 text-xs"
                        >Accepted: JPG, JPEG, PNG, WEBP</span
                      >
                    </div>
                  </div>
                </div>
              </div>`;

html = html.replace(inspirationUpload, inspirationUpload + measurementPhotos);

// 4. Update the submit buttons and success message overlay
const submitSection = `              <div class="pt-4">
                <button
                  type="submit"
                  id="submitBtn"
                  class="w-full font-medium py-4 px-8 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 text-lg focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 btn-luxury"
                >
                  Request Private Consultation
                </button>
              </div>`;

const newSubmitSection = `              <div data-netlify-recaptcha="true" class="mb-6"></div>
              
              <div class="pt-4 flex flex-col gap-4">
                <button
                  type="submit"
                  id="submitBtn"
                  class="w-full font-medium py-4 px-8 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 text-lg focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 btn-luxury"
                >
                  Submit Order via Email
                </button>
                <button
                  type="button"
                  id="whatsappFallbackBtn"
                  class="w-full font-medium py-4 px-8 rounded-xl border border-charcoal/20 hover:bg-[#FAF6F0] transition-all text-lg flex items-center justify-center gap-2"
                >
                  <svg class="w-6 h-6 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  Submit via WhatsApp Instead
                </button>
              </div>

              <!-- Success Overlay -->
              <div id="formSuccessOverlay" class="absolute inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-center p-8 rounded-3xl opacity-0 pointer-events-none transition-opacity duration-300">
                <div class="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                  <svg class="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 class="font-playfair text-2xl md:text-3xl text-charcoal mb-4">Thank you!</h3>
                <p class="text-charcoal/70 mb-8 max-w-md">We received your order. We will contact you on WhatsApp + Email within 24 hours.</p>
                <a href="https://wa.me/2348169318277?text=Hi%20M%26B%20I%20just%20submitted%20an%20order" target="_blank" rel="noopener noreferrer" class="btn-luxury py-4 px-8 w-full md:w-auto flex items-center justify-center gap-3 rounded-xl">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  Chat Us on WhatsApp Now
                </a>
              </div>`;

html = html.replace(submitSection, newSubmitSection);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Form updated');
