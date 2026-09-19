/**
 * M&B Fashion World - Meta Pixel & Ads Event Tracking Utility
 * -------------------------------------------------------------
 * Production-ready event tracking integration for Meta Pixel (Meta Dataset).
 * Loads Meta Pixel globally, reads Pixel ID safely from env/window, and provides
 * reusable tracking functions for ViewContent, Lead, CompleteRegistration,
 * InitiateCheckout, Purchase, and Contact events.
 */

(function () {
  'use strict';

  // 1. Resolve Meta Pixel ID from window or environment, defaulting to target ID if available
  var rawPixelId = window.META_PIXEL_ID || (typeof process !== 'undefined' && process.env && process.env.META_PIXEL_ID) || '1090968366739169';
  var pixelId = (rawPixelId && rawPixelId !== 'YOUR_META_PIXEL_ID' && rawPixelId.trim().length > 0) ? rawPixelId.trim() : '';

  // Expose resolved Pixel ID globally
  window.META_PIXEL_ID = pixelId;

  // 2. Single Global Meta Pixel Initializer (Failsafe & Non-blocking)
  if (pixelId) {
    if (!window.fbq) {
      !function(f,b,e,v,n,t,s) {
        if(f.fbq) return;
        n = f.fbq = function() {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if(!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        if (s && s.parentNode) {
          s.parentNode.insertBefore(t, s);
        } else if (b.head) {
          b.head.appendChild(t);
        }
      }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

      try {
        window.fbq('init', pixelId);
        window.fbq('track', 'PageView');
      } catch (e) {
        // Suppress init errors if adblockers intercept
      }
    }
  } else {
    // If Pixel ID is missing, create a silent stub so calls never crash the app
    if (typeof window.fbq !== 'function') {
      window.fbq = function () {
        if (window.console && console.debug) {
          console.debug('[MetaPixel Stub] Call skipped (No Pixel ID configured):', arguments);
        }
      };
    }
  }

  // 3. Safe Event Dispatcher
  function safeFbq(action, eventName, params) {
    if (typeof window.fbq === 'function') {
      try {
        if (params && typeof params === 'object') {
          window.fbq(action, eventName, params);
        } else {
          window.fbq(action, eventName);
        }
      } catch (err) {
        // Silently catch tracking errors if adblockers or network filters interfere
      }
    }
  }

  // 4. Reusable Tracking API
  var MBTracker = {
    pixelId: pixelId,

    // PageView
    trackPageView: function (pageData) {
      safeFbq('track', 'PageView', pageData || null);
    },

    // ViewContent (Products / Collections / Gallery)
    trackViewContent: function (contentName, contentCategory, extraParams) {
      var params = {
        content_name: contentName || 'Bespoke Collection',
        content_category: contentCategory || 'Luxury Fashion'
      };
      if (extraParams && typeof extraParams === 'object') {
        for (var key in extraParams) {
          if (extraParams.hasOwnProperty(key)) {
            params[key] = extraParams[key];
          }
        }
      }
      safeFbq('track', 'ViewContent', params);
    },

    // Lead (Inquiries & Form Submissions)
    trackLead: function (leadType, leadSource, extraParams) {
      var params = {
        content_name: leadType || 'Bespoke Order Inquiry',
        content_category: leadSource || 'Order Form',
        value: 0.00,
        currency: 'USD'
      };
      if (extraParams && typeof extraParams === 'object') {
        for (var k in extraParams) {
          if (extraParams.hasOwnProperty(k)) params[k] = extraParams[k];
        }
      }
      safeFbq('track', 'Lead', params);
    },

    // CompleteRegistration (Client Registration / Currency Selection / Form Opt-in)
    trackCompleteRegistration: function (registrationMethod, extraParams) {
      var params = {
        content_name: 'Client Registration',
        status: true,
        registration_method: registrationMethod || 'Website Form'
      };
      if (extraParams && typeof extraParams === 'object') {
        for (var k in extraParams) {
          if (extraParams.hasOwnProperty(k)) params[k] = extraParams[k];
        }
      }
      safeFbq('track', 'CompleteRegistration', params);
    },

    // InitiateCheckout (CTA clicks to order section or custom order flow)
    trackInitiateCheckout: function (numItems, currency, value, extraParams) {
      var params = {
        content_name: 'Bespoke Order Customization',
        content_category: 'Tailoring Service',
        num_items: numItems || 1,
        currency: currency || 'USD',
        value: typeof value === 'number' ? value : 0.00
      };
      if (extraParams && typeof extraParams === 'object') {
        for (var k in extraParams) {
          if (extraParams.hasOwnProperty(k)) params[k] = extraParams[k];
        }
      }
      safeFbq('track', 'InitiateCheckout', params);
    },

    // Purchase (Confirmed Orders / Deposit Payment Intent)
    trackPurchase: function (value, currency, contentName, extraParams) {
      var params = {
        content_name: contentName || 'Bespoke Order Booking',
        content_type: 'product',
        value: typeof value === 'number' ? value : 0.00,
        currency: currency || 'USD'
      };
      if (extraParams && typeof extraParams === 'object') {
        for (var k in extraParams) {
          if (extraParams.hasOwnProperty(k)) params[k] = extraParams[k];
        }
      }
      safeFbq('track', 'Purchase', params);
    },

    // Contact (WhatsApp, Phone, Email, Direct Contact CTAs)
    trackContact: function (contactMethod, contactLabel, extraParams) {
      var params = {
        content_name: contactLabel || 'Customer Inquiry',
        content_category: contactMethod || 'Direct Communication'
      };
      if (extraParams && typeof extraParams === 'object') {
        for (var k in extraParams) {
          if (extraParams.hasOwnProperty(k)) params[k] = extraParams[k];
        }
      }
      safeFbq('track', 'Contact', params);
    },

    // Custom Event
    trackCustom: function (eventName, params) {
      if (eventName) {
        safeFbq('trackCustom', eventName, params || null);
      }
    }
  };

  // Expose globally under MBTracker and MetaPixelTracker alias
  window.MBTracker = MBTracker;
  window.MetaPixelTracker = MBTracker;

  // 5. Automatic Event Binding on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function () {
    // A. Intercept CTA Clicks throughout the page
    document.addEventListener('click', function (e) {
      var target = e.target.closest('a, button');
      if (!target) return;

      var href = (target.getAttribute('href') || '').toLowerCase();
      var id = (target.getAttribute('id') || '').toLowerCase();
      var text = (target.textContent || '').trim();

      // WhatsApp Contact / Order Clicks
      if (href.indexOf('wa.me') !== -1 || href.indexOf('whatsapp.com') !== -1 || id === 'wa-widget-send' || id === 'wa-widget-toggle') {
        MBTracker.trackContact('WhatsApp', text || 'WhatsApp Contact');
        MBTracker.trackLead('WhatsApp Order Inquiry', 'WhatsApp CTA', { content_name: text || 'WhatsApp CTA' });
      }
      // Phone Call Clicks
      else if (href.indexOf('tel:') === 0) {
        MBTracker.trackContact('Phone', text || 'Direct Phone Call');
      }
      // Email Clicks
      else if (href.indexOf('mailto:') === 0) {
        MBTracker.trackContact('Email', text || 'Direct Email Contact');
      }
      // Order Journey CTAs (Begin Journey, Place Custom Order, Tailor This Look)
      else if (
        href === '#order' ||
        text.indexOf('Begin Your Bespoke Journey') !== -1 ||
        text.indexOf('Place Custom Order') !== -1 ||
        text.indexOf('Place My Custom Order') !== -1 ||
        text.indexOf('Tailor This Look') !== -1 ||
        text.indexOf('Begin Your Journey') !== -1
      ) {
        MBTracker.trackInitiateCheckout(1, 'USD', 0, { content_name: text || 'Bespoke CTA Click' });
      }
      // Collection View CTAs
      else if (
        href === '#collections' ||
        text.indexOf('Discover The Collection') !== -1 ||
        text.indexOf('Our Collections') !== -1 ||
        text.indexOf('Catalog') !== -1
      ) {
        MBTracker.trackViewContent(text || 'Collection Navigation', 'Bespoke Apparel');
      }
    }, true);

    // B. Track Currency Selection as CompleteRegistration
    var desktopCurr = document.getElementById('desktopCurrencySelect');
    var mobileCurr = document.getElementById('mobileCurrencySelect');

    function onCurrencyChange(e) {
      if (e && e.target) {
        MBTracker.trackCompleteRegistration('Currency Selection: ' + e.target.value);
      }
    }
    if (desktopCurr) desktopCurr.addEventListener('change', onCurrencyChange);
    if (mobileCurr) mobileCurr.addEventListener('change', onCurrencyChange);

    // C. Intersection Observer for Section Views
    if ('IntersectionObserver' in window) {
      var trackedSections = {};
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var sectionId = entry.target.id;
            if (sectionId && !trackedSections[sectionId]) {
              trackedSections[sectionId] = true;
              var titleMap = {
                'collections': 'Bespoke Fashion Collections',
                'gallery': 'Fashion World Gallery',
                'about': 'About M&B Fashion House',
                'order': 'Bespoke Order Booking Section'
              };
              MBTracker.trackViewContent(titleMap[sectionId] || sectionId, 'Section View');

              if (sectionId === 'order') {
                MBTracker.trackInitiateCheckout(1, 'USD', 0, { content_name: 'Scroll to Bespoke Order Form' });
              }
            }
          }
        });
      }, { threshold: 0.3 });

      var sectionIds = ['collections', 'gallery', 'about', 'order'];
      sectionIds.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }

    // D. Single Page Navigation / Hash Change PageView Tracker
    window.addEventListener('hashchange', function () {
      if (window.location.hash) {
        MBTracker.trackPageView({ content_name: 'Section: ' + window.location.hash.substring(1) });
      }
    });
  });

})();
