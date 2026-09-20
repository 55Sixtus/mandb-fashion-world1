/**
 * M&B Fashion World - Meta Pixel & Ads Event Tracking Utility
 * -------------------------------------------------------------
 * Clean, compliant event tracking integration for Meta Pixel (Dataset ID: 1090968366739169).
 * Strictly enforces event triggers: PageView on load, ViewContent on collection view,
 * Contact on WhatsApp/Phone/Email click, and Lead strictly on successful form submission.
 */

(function () {
  'use strict';

  var rawPixelId = window.META_PIXEL_ID || (typeof process !== 'undefined' && process.env && process.env.META_PIXEL_ID) || '1090968366739169';
  var pixelId = (rawPixelId && rawPixelId !== 'YOUR_META_PIXEL_ID' && rawPixelId.trim().length > 0) ? rawPixelId.trim() : '1090968366739169';

  window.META_PIXEL_ID = pixelId;

  // 1. Single Global Meta Pixel Initializer
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
    if (typeof window.fbq !== 'function') {
      window.fbq = function () {
        if (window.console && console.debug) {
          console.debug('[MetaPixel Stub] Call skipped:', arguments);
        }
      };
    }
  }

  // 2. Safe Event Dispatcher
  function safeFbq(action, eventName, params) {
    if (typeof window.fbq === 'function') {
      try {
        if (params && typeof params === 'object') {
          window.fbq(action, eventName, params);
        } else {
          window.fbq(action, eventName);
        }
      } catch (err) {
        // Silently catch tracking errors
      }
    }
  }

  // 3. Centralized Tracking API
  var MBTracker = {
    pixelId: pixelId,

    // PageView (Fired once on actual page view)
    trackPageView: function (pageData) {
      safeFbq('track', 'PageView', pageData || null);
    },

    // ViewContent (Fired ONLY when visitor meaningfully views a collection/product/content section)
    trackViewContent: function (contentName, contentCategory, extraParams) {
      var params = {
        content_name: contentName || 'Bespoke African Collection',
        content_category: contentCategory || 'African Fashion',
        content_type: 'product'
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

    // Contact (Fired ONLY when visitor intentionally clicks WhatsApp, Phone, or Email)
    trackContact: function (contactMethod, contactLabel, extraParams) {
      var method = (contactMethod || 'whatsapp').toLowerCase();
      var params = {
        content_name: contactLabel || 'Customer Inquiry',
        contact_method: method,
        contact_destination: method
      };
      if (extraParams && typeof extraParams === 'object') {
        for (var k in extraParams) {
          if (extraParams.hasOwnProperty(k)) params[k] = extraParams[k];
        }
      }
      safeFbq('track', 'Contact', params);
    },

    // Lead (Fired ONLY after a visitor successfully submits a genuine inquiry form)
    trackLead: function (leadType, leadSource, extraParams) {
      var params = {
        content_name: leadType || 'Custom Order Inquiry',
        content_category: leadSource || 'Bespoke Order Form',
        lead_type: 'fashion_consultation',
        currency: 'USD',
        value: 0.00
      };
      if (extraParams && typeof extraParams === 'object') {
        for (var k in extraParams) {
          if (extraParams.hasOwnProperty(k)) params[k] = extraParams[k];
        }
      }
      safeFbq('track', 'Lead', params);
    }
  };

  window.MBTracker = MBTracker;
  window.MetaPixelTracker = MBTracker;

  // 4. Automatic Event Binding on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function () {
    // A. Intercept Genuine Contact Clicks (WhatsApp, Phone, Email)
    document.addEventListener('click', function (e) {
      var target = e.target.closest('a, button');
      if (!target) return;

      var href = (target.getAttribute('href') || '').toLowerCase();
      var id = (target.getAttribute('id') || '').toLowerCase();
      var text = (target.textContent || '').trim().replace(/\s+/g, ' ');

      // WhatsApp Clicks -> Fire Contact ONLY
      if (href.indexOf('wa.me') !== -1 || href.indexOf('whatsapp.com') !== -1 || id === 'wa-widget-send' || id === 'wa-widget-toggle') {
        MBTracker.trackContact('whatsapp', text || 'WhatsApp Contact');
      }
      // Phone Call Clicks -> Fire Contact ONLY
      else if (href.indexOf('tel:') === 0) {
        MBTracker.trackContact('phone', text || 'Direct Phone Call');
      }
      // Email Clicks -> Fire Contact ONLY
      else if (href.indexOf('mailto:') === 0) {
        MBTracker.trackContact('email', text || 'Direct Email Contact');
      }
    }, true);

    // B. ViewContent via IntersectionObserver (Fires ONLY when Collections or Gallery enter viewport)
    if ('IntersectionObserver' in window) {
      var trackedSections = {};
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var sectionId = entry.target.id;
            if (sectionId && !trackedSections[sectionId]) {
              trackedSections[sectionId] = true;
              if (sectionId === 'collections') {
                MBTracker.trackViewContent('Signature African Collections', 'African Fashion');
              } else if (sectionId === 'gallery') {
                MBTracker.trackViewContent('Fashion Gallery & Lookbook', 'African Fashion');
              }
            }
          }
        });
      }, { threshold: 0.3 });

      ['collections', 'gallery'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }
  });

})();

