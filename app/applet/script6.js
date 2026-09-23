document.addEventListener("DOMContentLoaded", () => {
  // Bind product card interaction observers
  const productIds = [1, 2, 3, 4, 5, 6];
  productIds.forEach(id => {
    const card = document.getElementById('prod-' + id);
    if (card) {
      ['click', 'mouseenter', 'touchstart'].forEach(evt => {
        card.addEventListener(evt, () => window.setActiveVariant(id), { passive: true });
      });
    }
    const sizeSelect = document.getElementById('prod-' + id + '-size');
    if (sizeSelect) {
      sizeSelect.addEventListener('change', () => window.setActiveVariant(id));
    }
  });

  // 0. Ensure #wa-widget-toggle opens WhatsApp directly in a new window
  const waToggleBtn = document.getElementById("wa-widget-toggle");
  if (waToggleBtn) {
    waToggleBtn.style.pointerEvents = "auto";
    waToggleBtn.addEventListener("click", (e) => {
      window.toggleWaPopup(e);
    });
  }

  // 1. Mobile Menu Links
  const mobileLinks = document.querySelectorAll(".mobile-link");
  const mobileMenuBackdrop = document.getElementById("mobileMenuBackdrop");
  if (mobileMenuBackdrop) {
    mobileMenuBackdrop.addEventListener("click", () => window.closeMobileMenu());
  }
  mobileLinks.forEach(link => {
    link.addEventListener("click", () => window.closeMobileMenu());
  });

  // 2. Initial Theme Setup
  const savedTheme = localStorage.getItem("theme");
  const isDarkMode = savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
  if (isDarkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  // 3. Scroll Header Effect
  const mainHeader = document.getElementById("main-header");
  if (mainHeader) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        mainHeader.classList.add("shadow-lg");
      } else {
        mainHeader.classList.remove("shadow-lg");
      }
    });
  }

  // 4. Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId !== "#") {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // 5. Scroll Animations & Counters
  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        animObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
  document.querySelectorAll(".animate-on-scroll").forEach(el => animObserver.observe(el));

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetNum = parseInt(el.getAttribute("data-target"));
        if (targetNum > 0 && !el.classList.contains("counted")) {
          el.classList.add("counted");
          let count = 0;
          const step = targetNum / 100;
          const suffix = el.innerText.includes("+") ? "+" : el.innerText.includes("★") ? "★" : "";
          const updateCount = () => {
            count += step;
            if (count < targetNum) {
              el.innerText = Math.ceil(count) + suffix;
              requestAnimationFrame(updateCount);
            } else {
              el.innerText = targetNum + suffix;
            }
          };
          updateCount();
        }
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll(".stat-counter").forEach(el => counterObserver.observe(el));

  // 6. Floating WhatsApp Widget Time & Interactivity
  const waSendBtn = document.getElementById("wa-widget-send");
  const waInput = document.getElementById("wa-widget-input");
  const waTime = document.getElementById("wa-time");
  const waClose = document.getElementById("wa-widget-close");
  const waTeaser = document.getElementById("wa-widget-teaser");
  const waTeaserClose = document.getElementById("wa-teaser-close");
  const now = new Date();
  let hours = now.getHours();
  let mins = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  mins = mins < 10 ? "0" + mins : mins;
  if (waTime) waTime.innerText = hours + ":" + mins + " " + ampm;

  function sendWaMessage() {
    const text = waInput && waInput.value.trim() ? waInput.value.trim() : "Hello M&B Fashion World, I want to order a custom outfit.";
    const url = "https://wa.me/2348160761870?text=" + encodeURIComponent(text);
    window.open(url, "_blank");
    if (waInput) waInput.value = "";
  }

  if (waTeaser) {
    waTeaser.addEventListener("click", (e) => {
      if (e.target !== waTeaserClose && !waTeaserClose.contains(e.target)) {
        sendWaMessage();
      }
    });
  }

  if (waTeaserClose) {
    waTeaserClose.addEventListener("click", (e) => {
      e.stopPropagation();
      if (waTeaser) waTeaser.style.display = "none";
    });
  }

  if (waClose) {
    waClose.addEventListener("click", (e) => {
      const waPopup = document.getElementById("wa-widget-popup");
      if (waPopup) {
        waPopup.classList.add("scale-0", "opacity-0", "pointer-events-none");
        waPopup.classList.remove("scale-100", "opacity-100", "pointer-events-auto");
        setTimeout(() => waPopup.classList.add("hidden"), 300);
      }
    });
  }

  if (waSendBtn) waSendBtn.addEventListener("click", sendWaMessage);
  if (waInput) {
    waInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendWaMessage();
    });
  }

  // 7. Order Form Submission & Receipt Handler
  const orderForm = document.getElementById("order-form");
  const successOverlay = document.getElementById("formSuccessOverlay");
  const printOrderBtn = document.getElementById("printOrderBtn");
  const closeSuccessBtn = document.getElementById("closeSuccessBtn");
  const whatsappFallbackBtn = document.getElementById("whatsappFallbackBtn");

  if (orderForm) {
    orderForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById("submitBtn");
      const originalText = submitBtn ? submitBtn.innerText : "Submit Order";
      if (submitBtn) {
        submitBtn.innerText = "Submitting...";
        submitBtn.disabled = true;
      }
      const formData = new FormData(orderForm);
      window.currentOrderData = Object.fromEntries(formData.entries());
      fetch("/", { method: "POST", body: formData })
        .then(() => {
          if (window.MBTracker && typeof MBTracker.trackLead === "function") {
            MBTracker.trackLead("Bespoke Order Submission", "Email Form");
          } else if (typeof fbq !== "undefined") {
            fbq("track", "Lead");
          }
          if (typeof gtag !== "undefined") {
            gtag("event", "generate_lead");
          }
          if (successOverlay) {
            successOverlay.classList.remove("opacity-0", "pointer-events-none");
            successOverlay.classList.add("opacity-100", "pointer-events-auto");
          }
        })
        .catch(err => {
          console.error("Order submission error:", err);
          alert("Order registered! Connecting you to WhatsApp for immediate confirmation...");
          if (whatsappFallbackBtn) whatsappFallbackBtn.click();
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
          }
        });
    });
  }

  if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener("click", () => {
      if (successOverlay) {
        successOverlay.classList.add("opacity-0", "pointer-events-none");
        successOverlay.classList.remove("opacity-100", "pointer-events-auto");
      }
      if (orderForm) orderForm.reset();
    });
  }

  if (printOrderBtn) {
    printOrderBtn.addEventListener("click", () => {
      if (!window.currentOrderData) return;
      const data = window.currentOrderData;
      const htmlContent = '<html><head><title>Receipt - M&B Fashion World</title><style>body{font-family:sans-serif;padding:30px;color:#333;}.header{border-bottom:2px solid #C9A227;padding-bottom:10px;margin-bottom:20px;}h1{color:#C9A227;margin:0;font-size:20px;}.row{margin-bottom:8px;}.label{font-weight:bold;width:140px;display:inline-block;}.footer{margin-top:30px;font-size:12px;color:#888;border-top:1px solid #eee;padding-top:10px;}</style></head><body><div class="header"><h1>M&B Fashion World - Order Receipt</h1></div></body></html>';
      const printWin = window.open("", "_blank");
      if (printWin) {
        printWin.document.write(htmlContent);
        printWin.document.close();
        printWin.focus();
        setTimeout(() => printWin.print(), 250);
      }
    });
  }

  if (whatsappFallbackBtn) {
    whatsappFallbackBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (!orderForm) return;
      const formData = new FormData(orderForm);
      const data = Object.fromEntries(formData.entries());
      const lines = [
        '*NEW BESPOKE ORDER INQUIRY* 🌟',
        '━━━━━━━━━━━━━━━━━━━━━━',
        '👤 *Name:* ' + (data.name || 'Not provided'),
        '📞 *WhatsApp:* ' + (data.whatsapp || 'Not provided'),
        '👔 *Outfit:* ' + (data.outfit_type || 'Not specified'),
        '⏳ *Target Date:* ' + (data.deadline || 'Flexible')
      ];
      if (data.notes) lines.push('📝 *Notes:* ' + data.notes);
      lines.push('━━━━━━━━━━━━━━━━━━━━━━');
      lines.push('Looking forward to your consultation! ✨');
      const msg = lines.join(String.fromCharCode(10));
      window.open("https://wa.me/2348160761870?text=" + encodeURIComponent(msg), "_blank");
    });
  }

  // 8. Pre-warm offscreen images 400px before scrolling into view
  if ("IntersectionObserver" in window) {
    const imgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
          }
          img.classList.add("loaded");
          observer.unobserve(img);
        }
      });
    }, { rootMargin: "400px 0px" });
    document.querySelectorAll("img[loading='lazy']").forEach(img => {
      img.classList.add("img-fade-in");
      if (img.complete) {
        img.classList.add("loaded");
      } else {
        img.addEventListener("load", () => img.classList.add("loaded"));
        img.addEventListener("error", () => {
          img.classList.add("loaded");
          img.src = "https://i.ibb.co/9HzZCWjP/logo5.png";
        });
      }
      imgObserver.observe(img);
    });
  }
});
