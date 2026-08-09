const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const validationLogic = `
        function validateFormAndShowErrors(formObj) {
            let isValid = true;
            // Clear previous errors
            formObj.querySelectorAll('.error-message').forEach(el => el.classList.add('hidden'));
            formObj.querySelectorAll('.luxury-input').forEach(el => el.classList.remove('border-red-500'));

            const inputs = formObj.querySelectorAll('input[required], select[required], textarea[required]');
            inputs.forEach(input => {
                if (!input.checkValidity()) {
                    isValid = false;
                    input.classList.add('border-red-500');
                    // Find the next sibling or parent's next sibling error message
                    let errorEl = input.nextElementSibling;
                    if (!errorEl || !errorEl.classList.contains('error-message')) {
                        // For checkbox, it might be outside the label
                        if (input.type === 'checkbox') {
                             errorEl = input.closest('label').nextElementSibling;
                        } else {
                             // Sometimes we need to go up if nested
                             let parent = input.parentElement;
                             errorEl = parent.querySelector('.error-message');
                        }
                    }
                    if (errorEl && errorEl.classList.contains('error-message')) {
                        errorEl.classList.remove('hidden');
                    }
                } else {
                    input.classList.remove('border-red-500');
                }
            });
            return isValid;
        }

        // Add real-time validation clearing
        if (form) {
             form.querySelectorAll('input, select, textarea').forEach(input => {
                 input.addEventListener('input', () => {
                      if (input.checkValidity()) {
                          input.classList.remove('border-red-500');
                          let errorEl = input.nextElementSibling;
                          if (input.type === 'checkbox') {
                              errorEl = input.closest('label').nextElementSibling;
                          } else {
                              let parent = input.parentElement;
                              errorEl = parent.querySelector('.error-message');
                          }
                          if (errorEl && errorEl.classList.contains('error-message')) {
                              errorEl.classList.add('hidden');
                          }
                      }
                 });
             });
        }
`;

// Insert the validation logic into the DOMContentLoaded listener.
html = html.replace('if (form) {\n          form.addEventListener("submit", (e) => {', validationLogic + '\n        if (form) {\n          form.addEventListener("submit", (e) => {');

// Update the submit event listener to use the custom validation.
// Wait, normal form submit will natively show browser tooltips if we don't preventDefault early, but we DO e.preventDefault() immediately!
// Then it fetches. BUT wait, if we call checkValidity it might not show them.
// Let's modify the normal submit to also use validateFormAndShowErrors.
const oldSubmit = `if (form) {
          form.addEventListener("submit", (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById("submitBtn");`;
const newSubmit = `if (form) {
          form.addEventListener("submit", (e) => {
            e.preventDefault();
            if (!validateFormAndShowErrors(form)) {
                return;
            }
            const submitBtn = document.getElementById("submitBtn");`;
html = html.replace(oldSubmit, newSubmit);

// Update WhatsApp fallback logic
const oldFallback = `if (whatsappFallbackBtn) {
          whatsappFallbackBtn.addEventListener("click", () => {
            if(!form) return;
            if(!form.checkValidity()) {
                form.reportValidity();
                return;
            }`;
const newFallback = `if (whatsappFallbackBtn) {
          whatsappFallbackBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if(!form) return;
            if(!validateFormAndShowErrors(form)) {
                // Optionally form.reportValidity() but we have custom errors now
                return;
            }`;
html = html.replace(oldFallback, newFallback);

fs.writeFileSync('index.html', html);
console.log('Fixed validation logic');
