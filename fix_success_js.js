const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldScriptSection = `            const formData = new FormData(form);
            fetch("/", {
              method: "POST",
              body: formData,
            })
              .then(() => {
                successOverlay.classList.remove("opacity-0", "pointer-events-none");
                successOverlay.classList.add("opacity-100", "pointer-events-auto");
                form.reset();
              })
              .catch((error) => {`;

const newScriptSection = `            const formData = new FormData(form);
            window.currentOrderData = Object.fromEntries(formData.entries());
            fetch("/", {
              method: "POST",
              body: formData,
            })
              .then(() => {
                successOverlay.classList.remove("opacity-0", "pointer-events-none");
                successOverlay.classList.add("opacity-100", "pointer-events-auto");
              })
              .catch((error) => {`;

html = html.replace(oldScriptSection, newScriptSection);

// Now add the event listeners for print and close.
const closePrintLogic = `
        const printOrderBtn = document.getElementById("printOrderBtn");
        const closeSuccessBtn = document.getElementById("closeSuccessBtn");
        
        if (closeSuccessBtn) {
            closeSuccessBtn.addEventListener("click", () => {
                successOverlay.classList.add("opacity-0", "pointer-events-none");
                successOverlay.classList.remove("opacity-100", "pointer-events-auto");
                if (form) form.reset();
            });
        }
        
        if (printOrderBtn) {
            printOrderBtn.addEventListener("click", () => {
                if (!window.currentOrderData) return;
                const d = window.currentOrderData;
                const dateString = new Date().toLocaleDateString();
                
                const printContent = \`
                <html>
                <head>
                    <title>Order Receipt - M&B Fashion World</title>
                    <style>
                        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #333; line-height: 1.6; }
                        .header { text-align: center; border-bottom: 2px solid #C9A227; padding-bottom: 20px; margin-bottom: 30px; }
                        h1 { color: #C9A227; font-size: 24px; margin: 0 0 10px 0; }
                        .receipt-date { color: #666; font-size: 14px; }
                        .section { margin-bottom: 30px; }
                        .section h2 { font-size: 18px; border-bottom: 1px solid #eee; padding-bottom: 8px; margin-bottom: 15px; color: #111; }
                        .row { display: flex; margin-bottom: 10px; }
                        .label { font-weight: bold; width: 150px; flex-shrink: 0; color: #555; }
                        .value { flex-grow: 1; }
                        .notes { background: #f9f9f9; padding: 15px; border-left: 4px solid #C9A227; margin-top: 20px; white-space: pre-wrap; }
                        .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 20px; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>M&B Fashion World - Bespoke Order</h1>
                        <div class="receipt-date">Date: \${dateString}</div>
                    </div>
                    
                    <div class="section">
                        <h2>Personal Information</h2>
                        <div class="row"><div class="label">Name:</div><div class="value">\${d.name || 'N/A'}</div></div>
                        <div class="row"><div class="label">Email:</div><div class="value">\${d.email || 'N/A'}</div></div>
                        <div class="row"><div class="label">WhatsApp:</div><div class="value">\${d.whatsapp || 'N/A'}</div></div>
                        <div class="row"><div class="label">Country:</div><div class="value">\${d.country || 'N/A'}</div></div>
                        <div class="row"><div class="label">City:</div><div class="value">\${d.city || 'N/A'}</div></div>
                        <div class="row"><div class="label">Gender:</div><div class="value">\${d.gender || 'N/A'}</div></div>
                    </div>
                    
                    <div class="section">
                        <h2>Order Specifications</h2>
                        <div class="row"><div class="label">Outfit Type:</div><div class="value">\${d.outfit_type || 'N/A'}</div></div>
                        <div class="row"><div class="label">Occasion:</div><div class="value">\${d.occasion || 'N/A'}</div></div>
                        <div class="row"><div class="label">Deadline:</div><div class="value">\${d.deadline || 'N/A'}</div></div>
                    </div>
                    
                    <div class="section">
                        <h2>Measurements</h2>
                        <div class="notes">\${d.measurements || 'Not provided in text'}</div>
                    </div>
                    
                    <div class="section">
                        <h2>Additional Notes</h2>
                        <div class="notes">\${d.notes || 'None'}</div>
                    </div>
                    
                    <div class="footer">
                        <p>Thank you for choosing M&B Fashion World.</p>
                        <p>This is a preliminary order summary. Our team will contact you shortly to confirm details.</p>
                    </div>
                </body>
                </html>
                \`;
                
                const printWindow = window.open('', '_blank');
                if (printWindow) {
                    printWindow.document.write(printContent);
                    printWindow.document.close();
                    printWindow.focus();
                    setTimeout(() => {
                        printWindow.print();
                    }, 250);
                } else {
                    alert('Please allow popups to print your receipt.');
                }
            });
        }
`;

html = html.replace('if (whatsappFallbackBtn) {', closePrintLogic + '\n        if (whatsappFallbackBtn) {');
fs.writeFileSync('index.html', html);
console.log('Script logic for print button added');
