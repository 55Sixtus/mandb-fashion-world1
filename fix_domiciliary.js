const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
    /Bank Transfer, Wise, PayPal and Zelle accepted\./g,
    'Bank Transfer, Domiciliary Account, Wise, PayPal and Zelle accepted.'
);

html = html.replace(
    /Bank Transfer, Wise, PayPal, or Zelle/g,
    'Bank Transfer, Domiciliary Account, Wise, PayPal, or Zelle'
);

html = html.replace(
    /<li>Wise<\/li>\s*<li>PayPal<\/li>/g, // this is not quite matching the li tags, let's just do a generic replace
    ''
);

html = html.replace(
    /<li class="flex items-center gap-2">\s*<span class="text-gold">•<\/span> Wise\s*<\/li>/g,
    '<li class="flex items-center gap-2">\n                  <span class="text-gold">•</span> Domiciliary Account\n                </li>\n                <li class="flex items-center gap-2">\n                  <span class="text-gold">•</span> Wise\n                </li>'
);

html = html.replace(
    /Payments: Bank Transfer, PayPal, Card\./g,
    'Payments: Bank Transfer, Domiciliary Account, PayPal, Card.'
);

html = html.replace(
    /Bank Transfer, Wise, PayPal and\s+Zelle\./g,
    'Bank Transfer, Domiciliary Account, Wise, PayPal and Zelle.'
);

html = html.replace(
    /Bank Transfer, PayPal, Card/g,
    'Bank Transfer, Domiciliary Account, PayPal, Card'
);

fs.writeFileSync('index.html', html);
console.log('Fixed Domiciliary account');
