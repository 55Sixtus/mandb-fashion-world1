const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The fallback button should validate the form before sending to whatsapp
html = html.replace(
    /if\(!form\) return;\n\s*const fd = new FormData\(form\);/g,
    `if(!form) return;
            if(!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            const fd = new FormData(form);`
);

fs.writeFileSync('index.html', html);
console.log('Fixed wa.me form validation');
