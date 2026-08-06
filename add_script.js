const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const customScript = `    <script>
      document.addEventListener("DOMContentLoaded", () => {
        const form = document.getElementById("order-form");
        const successOverlay = document.getElementById("formSuccessOverlay");
        const whatsappFallbackBtn = document.getElementById("whatsappFallbackBtn");

        if (form) {
          form.addEventListener("submit", (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById("submitBtn");
            const originalText = submitBtn.innerText;
            submitBtn.innerText = "Submitting...";
            submitBtn.disabled = true;

            const formData = new FormData(form);
            fetch("/", {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams(formData).toString(),
            })
              .then(() => {
                successOverlay.classList.remove("opacity-0", "pointer-events-none");
                successOverlay.classList.add("opacity-100", "pointer-events-auto");
                form.reset();
              })
              .catch((error) => {
                alert("There was an error submitting the form. Please use the WhatsApp button instead.");
                console.error(error);
              })
              .finally(() => {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
              });
          });
        }

        if (whatsappFallbackBtn) {
          whatsappFallbackBtn.addEventListener("click", () => {
            if(!form) return;
            const fd = new FormData(form);
            const data = Object.fromEntries(fd.entries());
            let message = \`Hi M&B Fashion World, I would like to place an order:\\n\\n\`;
            if (data.name) message += \`*Name:* \${data.name}\\n\`;
            if (data.email) message += \`*Email:* \${data.email}\\n\`;
            if (data.whatsapp) message += \`*WhatsApp:* \${data.whatsapp}\\n\`;
            if (data.country) message += \`*Country:* \${data.country}\\n\`;
            if (data.city) message += \`*City:* \${data.city}\\n\`;
            if (data.gender) message += \`*Gender:* \${data.gender}\\n\`;
            if (data.outfit_type) message += \`*Outfit Type:* \${data.outfit_type}\\n\`;
            if (data.occasion) message += \`*Occasion:* \${data.occasion}\\n\`;
            if (data.deadline) message += \`*Deadline:* \${data.deadline}\\n\\n\`;
            if (data.measurements) message += \`*Measurements:*\\n\${data.measurements}\\n\\n\`;
            if (data.notes) message += \`*Notes:*\\n\${data.notes}\\n\`;
            
            message += \`\\n(I will send my inspiration and measurement photos in this chat)\`;
            
            const encodedMessage = encodeURIComponent(message);
            window.open(\`https://wa.me/2348169318277?text=\${encodedMessage}\`, '_blank');
          });
        }
      });
    </script>
</body>`;

html = html.replace('</body>', customScript);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Script added');
