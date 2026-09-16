/**
 * M&B Fashion World - Meta Pixel & Ads Event Tracking Utility
 * -------------------------------------------------------------
 * Production-ready event tracking integration for Meta Pixel (Meta Dataset).
 * Handles PageView, ViewContent, Contact, and Lead tracking cleanly.
 */

(function () {
  'use strict';

  // 1. Get or Default Meta Pixel ID
  var pixelId = window.META_PIXEL_ID || '1090968366739169';

  // 2. Safe Event Dispatcher
  function safeFbq(action, eventName, params) {
    if (typeof window.fbq === 'function') {
      try {
        if (params) {
          window.fbq(action, eventName, params);
        } else {
          window.fbq(action, eventName);
        }
      } catch (err) {
        // Silently catch tracking errors if adblockers interfere
      }
    }
  }

  // 3. Global Tracker API
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

    // Contact (WhatsApp, Phone, Email, Direct Contact CTAs)
    trackContact: function (contactMethod, contactLabel) {
      safeFbq('track', 'Contact', {
        content_name: contactLabel || 'Customer Inquiry',
        content_category: contactMethod || 'Direct Communication'
      });
    },

    // Lead (Successful Bespoke Order Form Submissions)
    trackLead: function (leadType, leadSource) {
      safeFbq('track', 'Lead', {
        content_name: leadType || 'Bespoke Order Inquiry',
        content_category: leadSource || 'Order Form',
        value: 0.00,
        currency: 'USD'
      });
    }
  };

  // Expose to window object
  window.MBTracker = MBTracker;

  // 4. Automatic Event Binding on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function () {
    // A. Track Contact Events on WhatsApp, Email & Phone Links
    document.addEventListener('click', function (e) {
      var target = e.target.closest('a, button');
      if (!target) return;

      var href = (target.getAttribute('href') || '').toLowerCase();
      var id = (target.getAttribute('id') || '').toLowerCase();
      var text = (target.textContent || '').trim();

      // WhatsApp Clicks
      if (href.indexOf('wa.me') !== -1 || href.indexOf('whatsapp.com') !== -1 || id === 'wa-widget-send' || id === 'wa-widget-toggle') {
        MBTracker.trackContact('WhatsApp', text || 'WhatsApp Contact');
      }
      // Phone Call Clicks
      else if (href.indexOf('tel:') === 0) {
        MBTracker.trackContact('Phone', text || 'Direct Phone Call');
      }
      // Email Clicks
      else if (href.indexOf('mailto:') === 0) {
        MBTracker.trackContact('Email', text || 'Direct Email Contact');
      }
      // Collection View Clicks
      else if (href === '#collections' || text.indexOf('Discover The Collection') !== -1 || text.indexOf('Our Collections') !== -1 || text.indexOf('Tailor This Look') !== -1 || text.indexOf('Catalog') !== -1) {
        MBTracker.trackViewContent(text || 'Collection Navigation', 'Bespoke Apparel');
      }
    }, true);

    // B. Intersection Observer for ViewContent on Major Page Sections
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

    // C. Single Page Navigation / Hash Change PageView Tracker
    window.addEventListener('hashchange', function () {
      if (window.location.hash) {
        MBTracker.trackPageView({ content_name: 'Section: ' + window.location.hash.substring(1) });
      }
    });
  });

})();
