/**
 * SHRIMATI KITCHEN SOLUTIONS - CLIENT-SIDE SCRIPT & TRACKING ENGINE
 * Primary Contact: +91 9742470099
 * WhatsApp Handoff & Conversion Flow Optimization
 */

(function () {
  'use strict';

  // --- Configuration ---
  const CONFIG = {
    phone: '919742470099',
    brandName: 'Shrimati Kitchen Solutions',
    primaryProduct: 'Premium Wooden Roti Press Maker',
    metaPixelId: window.META_PIXEL_ID || '', // Configurable via window.META_PIXEL_ID
    ga4MeasurementId: window.GA4_ID || '',   // Configurable via window.GA4_ID
  };

  // --- Multi-Platform Tracking Dispatcher ---
  function trackEvent(eventName, params = {}) {
    try {
      // 1. Meta Pixel
      if (typeof window.fbq === 'function') {
        const standardEvents = ['PageView', 'ViewContent', 'Lead', 'Contact', 'InitiateCheckout', 'AddToCart'];
        if (standardEvents.includes(eventName)) {
          window.fbq('track', eventName, params);
        } else {
          window.fbq('trackCustom', eventName, params);
        }
      }

      // 2. Google Analytics 4 (gtag)
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, params);
      }

      // 3. Google Tag Manager (dataLayer)
      if (window.dataLayer && Array.isArray(window.dataLayer)) {
        window.dataLayer.push({
          event: eventName,
          ...params,
          timestamp: new Date().toISOString()
        });
      }

      // 4. Debugging log for development
      console.log(`[Shrimati Track] ${eventName}:`, params);
    } catch (err) {
      console.warn('Tracking dispatch error:', err);
    }
  }

  // --- WhatsApp Dynamic URL Generator ---
  function getWhatsAppUrl(customMessage) {
    const defaultMsg = `Hi ${CONFIG.brandName},\n\nI'm interested in your ${CONFIG.primaryProduct}.\n\nPlease share the latest product details, available sizes, and delivery information for Bengaluru.`;
    const messageText = customMessage || defaultMsg;
    return `https://wa.me/${CONFIG.phone}?text=${encodeURIComponent(messageText)}`;
  }

  function openWhatsApp(message, source = 'general_cta', extraParams = {}) {
    trackEvent('WhatsAppClick', {
      source: source,
      product: CONFIG.primaryProduct,
      ...extraParams
    });
    trackEvent('Contact', {
      contact_method: 'WhatsApp',
      source: source
    });
    const url = getWhatsAppUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  // --- DOM Ready Initialization ---
  document.addEventListener('DOMContentLoaded', () => {
    // Initial PageView event
    trackEvent('PageView', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname
    });

    // 1. Mobile Navigation Handling
    const menuBtn = document.querySelector('.menu-btn');
    const drawer = document.querySelector('.mobile-nav-drawer');
    const overlay = document.querySelector('.mobile-nav-overlay');
    const closeBtn = document.querySelector('.mobile-nav-close');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    function openMobileMenu() {
      if (drawer && overlay) {
        drawer.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeMobileMenu() {
      if (drawer && overlay) {
        drawer.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    }

    if (menuBtn) menuBtn.addEventListener('click', openMobileMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);
    if (overlay) overlay.addEventListener('click', closeMobileMenu);

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // 2. Sticky Navbar Scroll Elevation
    const navBar = document.querySelector('.nav');
    if (navBar) {
      window.addEventListener('scroll', () => {
        navBar.classList.toggle('scrolled', window.scrollY > 15);
      }, { passive: true });
    }

    // 3. Dynamic WhatsApp CTA Buttons Handler
    document.querySelectorAll('[data-wa]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();

        // Check if button is inside a specific product card or has size data
        const card = el.closest('.product-card') || el.closest('.product-detail-grid');
        const customSize = el.getAttribute('data-wa-size') || (card ? card.querySelector('[name="size"]')?.value || card.querySelector('.size-chip.active strong')?.textContent || card.querySelector('h3')?.textContent : '');
        const customQty = card ? card.querySelector('[name="quantity"]')?.value || card.querySelector('.qty-input')?.value || '1' : '1';
        const source = el.getAttribute('data-wa-source') || 'website_cta';

        let msg = '';
        if (customSize && customSize !== 'Premium Wooden Roti Press Maker' && !customSize.includes('Shrimati')) {
          msg = `Hi ${CONFIG.brandName},\n\nI would like to get details/order the ${CONFIG.primaryProduct} (${customSize.trim()}).\nQuantity: ${customQty}\n\nPlease share the latest price, availability, and delivery details for Bengaluru.`;
        } else {
          msg = `Hi ${CONFIG.brandName},\n\nI'm interested in your ${CONFIG.primaryProduct}.\n\nPlease share the latest product details, available sizes, and delivery information for Bengaluru.`;
        }

        openWhatsApp(msg, source, { size: customSize, quantity: customQty });
      });
    });

    // Track Phone link clicks
    document.querySelectorAll('a[href^="tel:"]').forEach(telLink => {
      telLink.addEventListener('click', () => {
        trackEvent('PhoneClick', {
          phone_number: '+91 9742470099',
          page_location: window.location.pathname
        });
      });
    });

    // 4. Interactive Product Page Gallery Switcher
    const mainImg = document.querySelector('#gallery-main-img');
    const thumbs = document.querySelectorAll('.gallery-thumb');
    if (mainImg && thumbs.length > 0) {
      thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
          thumbs.forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
          const targetSrc = thumb.getAttribute('data-img');
          if (targetSrc) {
            mainImg.style.opacity = '0.4';
            setTimeout(() => {
              mainImg.src = targetSrc;
              mainImg.style.opacity = '1';
            }, 150);
          }
        });
      });
    }

    // 5. Interactive Size Chip Selector
    const sizeChips = document.querySelectorAll('.size-chip');
    const hiddenSizeInput = document.querySelector('#selected-size-input');
    sizeChips.forEach(chip => {
      chip.addEventListener('click', () => {
        sizeChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const selectedSize = chip.getAttribute('data-size');
        if (hiddenSizeInput) hiddenSizeInput.value = selectedSize;

        trackEvent('ProductSizeSelected', {
          product: CONFIG.primaryProduct,
          selected_size: selectedSize
        });
      });
    });

    // 6. Interactive Quantity Stepper (+ / -)
    const qtyMinus = document.querySelector('#qty-minus');
    const qtyPlus = document.querySelector('#qty-plus');
    const qtyInput = document.querySelector('#qty-input');

    if (qtyMinus && qtyPlus && qtyInput) {
      qtyMinus.addEventListener('click', () => {
        let current = parseInt(qtyInput.value, 10) || 1;
        if (current > 1) {
          qtyInput.value = current - 1;
        }
      });

      qtyPlus.addEventListener('click', () => {
        let current = parseInt(qtyInput.value, 10) || 1;
        if (current < 10) {
          qtyInput.value = current + 1;
        }
      });
    }

    // 7. FAQ Accordion Handler
    const faqQuestions = document.querySelectorAll('.faq-q');
    faqQuestions.forEach(qBtn => {
      qBtn.addEventListener('click', () => {
        const item = qBtn.parentElement;
        const isOpen = item.classList.contains('open');

        // Optional: close other open items for cleaner accordion
        // document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('open'));

        item.classList.toggle('open', !isOpen);
      });
    });

    // 8. Lead & Quick Order Form Handler (WhatsApp Directed Lead Flow)
    const leadForms = document.querySelectorAll('#quick-order, #contact-form, .lead-capture-form');
    leadForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const name = (formData.get('name') || form.querySelector('[name="name"]')?.value || '').trim();
        const phone = (formData.get('phone') || form.querySelector('[name="phone"]')?.value || '').trim();
        const size = (formData.get('size') || form.querySelector('[name="size"]')?.value || form.querySelector('.size-chip.active')?.getAttribute('data-size') || '12 Inch').trim();
        const quantity = (formData.get('quantity') || form.querySelector('[name="quantity"]')?.value || form.querySelector('#qty-input')?.value || '1').trim();
        const area = (formData.get('area') || form.querySelector('[name="area"]')?.value || '').trim();
        const pincode = (formData.get('pincode') || form.querySelector('[name="pincode"]')?.value || '').trim();
        const notes = (formData.get('notes') || formData.get('message') || form.querySelector('[name="notes"]')?.value || '').trim();

        if (!name || !phone) {
          alert('Please enter your Name and Phone Number to receive delivery details.');
          return;
        }

        // Fire High-Priority Conversion Tracking Events
        trackEvent('Lead', {
          name: name,
          phone: phone,
          size: size,
          quantity: quantity,
          area: area,
          pincode: pincode
        });

        trackEvent('OrderFormSubmitted', {
          product: CONFIG.primaryProduct,
          size: size,
          quantity: quantity,
          area: area,
          pincode: pincode
        });

        // Backup save to localStorage for client-side CRM resilience
        try {
          const storedLeads = JSON.parse(localStorage.getItem('shrimati_leads') || '[]');
          storedLeads.push({
            name, phone, size, quantity, area, pincode, notes,
            submittedAt: new Date().toISOString()
          });
          localStorage.setItem('shrimati_leads', JSON.stringify(storedLeads));
        } catch (storageErr) {
          console.warn('Local lead storage note:', storageErr);
        }

        // Show inline success message if present
        const successBox = form.querySelector('.form-success-box') || document.querySelector('.form-success-box');
        if (successBox) {
          successBox.style.display = 'block';
          successBox.innerHTML = `<strong>Thank you, ${name}!</strong><br>Opening WhatsApp now to confirm your ${size} Roti Press and Bengaluru delivery details...`;
        }

        // Format message and redirect to WhatsApp
        const waLeadMsg = `Hi ${CONFIG.brandName},\n\nI just submitted an enquiry for the ${CONFIG.primaryProduct}:\n• Name: ${name}\n• Phone: ${phone}\n• Size: ${size}\n• Quantity: ${quantity}${area ? `\n• Area: ${area}` : ''}${pincode ? `\n• PIN Code: ${pincode}` : ''}${notes ? `\n• Notes: ${notes}` : ''}\n\nPlease share the latest pricing, availability and delivery details.`;

        setTimeout(() => {
          openWhatsApp(waLeadMsg, 'lead_form_submit', { size, quantity, area });
        }, 600);
      });
    });

    // 9. Video Demo Play Trigger Placeholder
    const videoPlayBtn = document.querySelector('#video-play-trigger');
    if (videoPlayBtn) {
      videoPlayBtn.addEventListener('click', () => {
        openWhatsApp(
          `Hi ${CONFIG.brandName},\n\nCould you please share a video demonstration of how the Premium Wooden Roti Press works?`,
          'video_demo_request'
        );
      });
    }

    // 10. Smooth Scroll-Reveal Animation Engine with Staggered Cascades
    const gridContainers = document.querySelectorAll('.grid-3, .features, .food-grid, .steps, .reviews, .mini-grid');
    gridContainers.forEach(container => {
      const children = container.children;
      Array.from(children).forEach((child, index) => {
        const delay = (index % 4) + 1;
        child.classList.add(`reveal-delay-${delay}`);
      });
    });

    const revealTargets = document.querySelectorAll(
      '.section-head, .product-card, .feature-card, .food-card, .step, .offer, .review-card, .order-card, .faq-item, .page-hero .container, .comparison-wrap, .video-demo-box'
    );

    revealTargets.forEach(el => el.classList.add('reveal'));

    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      revealTargets.forEach(el => revealObserver.observe(el));
    } else {
      // Fallback for older browsers
      revealTargets.forEach(el => el.classList.add('is-visible'));
    }
  });

  // Global helper exposure for console/tracking debugging
  window.ShrimatiApp = {
    CONFIG,
    trackEvent,
    openWhatsApp,
    getWhatsAppUrl
  };
})();
