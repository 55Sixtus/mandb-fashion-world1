const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newWaLogic = `            let message = \`*NEW BESPOKE ORDER INQUIRY* 🌟\\n\`;
            message += \`━━━━━━━━━━━━━━━━━━━━━━\\n\`;
            message += \`Hello M&B Fashion World,\\n\`;
            message += \`I would like to initiate a custom tailoring process. Below are my details:\\n\\n\`;
            
            message += \`*CLIENT INFORMATION*\\n\`;
            message += \`👤 *Name:* \${data.name || 'Not provided'}\\n\`;
            if (data.email) message += \`📧 *Email:* \${data.email}\\n\`;
            message += \`📞 *WhatsApp:* \${data.whatsapp || 'Not provided'}\\n\`;
            message += \`🌍 *Location:* \${data.city ? data.city + ', ' : ''}\${data.country || 'Not provided'}\\n\\n\`;
            
            message += \`*ORDER SPECIFICATIONS*\\n\`;
            message += \`👔 *Outfit Type:* \${data.outfit_type || 'Not specified'}\\n\`;
            if (data.gender) message += \`👥 *Gender:* \${data.gender}\\n\`;
            if (data.occasion) message += \`🎉 *Occasion:* \${data.occasion}\\n\`;
            if (data.deadline) message += \`⏳ *Target Deadline:* \${data.deadline}\\n\\n\`;
            
            if (data.measurements) {
              message += \`*MEASUREMENTS / SIZING*\\n\`;
              message += \`\${data.measurements}\\n\\n\`;
            }
            
            if (data.notes) {
              message += \`*DESIGN NOTES & PREFERENCES*\\n\`;
              message += \`\${data.notes}\\n\\n\`;
            }
            
            message += \`━━━━━━━━━━━━━━━━━━━━━━\\n\`;
            message += \`_I understand that I need to provide inspiration and measurement photos. I will share them in this chat shortly._\\n\`;
            message += \`\\nLooking forward to your consultation! ✨\`;`;

const oldWaLogicRegex = /let message = `Hi M&B Fashion World, I would like to place an order:\\n\\n`;[\s\S]*?message \+= `\\n\(I will send my inspiration and measurement photos in this chat\)`;/;

html = html.replace(oldWaLogicRegex, newWaLogic);

fs.writeFileSync('index.html', html);
console.log('Fixed professional wa logic');
