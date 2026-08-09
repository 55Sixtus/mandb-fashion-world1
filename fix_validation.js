const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Helper to add error span after a tag.
const addErrorSpan = (str, regex, errorMsg = 'This field is required') => {
  return str.replace(regex, `$&\n                    <p class="error-message text-red-500 text-xs mt-1 hidden">${errorMsg}</p>`);
};

// 1. Name
html = addErrorSpan(html, /<input type="text" name="name" required=""[^>]*>/);
// 2. Email
html = addErrorSpan(html, /<input type="email" name="email" required=""[^>]*>/, "Please enter a valid email address");
// 3. WhatsApp
html = addErrorSpan(html, /<input type="tel" name="whatsapp" required=""[^>]*>/, "Please enter your WhatsApp number");
// 4. Country
html = addErrorSpan(html, /<input type="text" name="country" required=""[^>]*>/);
// 5. Gender
html = addErrorSpan(html, /<select name="gender" required=""[^>]*>[\s\S]*?<\/select>/);
// 6. City
html = addErrorSpan(html, /<input type="text" name="city" required=""[^>]*>/);
// 7. Outfit type
html = addErrorSpan(html, /<select name="outfit_type" required=""[^>]*>[\s\S]*?<\/select>/);
// 8. Deadline
html = addErrorSpan(html, /<input type="date" name="deadline" required=""[^>]*>/);

// 9. Checkbox (Terms) - this one is nested a bit differently, let's look at its HTML.
fs.writeFileSync('index.html', html);
console.log('Added error spans to regular inputs');
