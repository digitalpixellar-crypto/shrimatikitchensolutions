# Shrimati Kitchen Solutions - Premium D2C Ecommerce Website

**Brand:** Shrimati Kitchen Solutions  
**Tagline:** Bringing Tradition to Every Kitchen.  
**Primary Product:** Premium Wooden Roti Press Maker (10", 12", 15")  
**Primary Market:** Bengaluru, Karnataka & Pan-India  
**WhatsApp / Direct Sales Desk:** +91 9742470099  
**Workshop & Registered Address:** Opp. Kalgudi Hospital, Main Road, Kampli – 583132, Karnataka, India  

---

## 🌟 Executive Summary & Key Upgrades

This codebase is a high-converting, mobile-first, production-ready D2C ecommerce website for **Shrimati Kitchen Solutions**, specifically engineered to capture and convert Meta Ads (Facebook & Instagram) and organic traffic in Bengaluru.

### 🚫 Strict No-Price Rule Compliance
- **Zero product prices, MRPs, discount percentages, or fake discounts** are displayed anywhere across the website.
- All conversion paths direct customers to **WhatsApp (+91 9742470099)** to receive:
  1. Latest batch availability & live pricing
  2. Personalized size recommendations (10", 12", or 15")
  3. Bengaluru doorstep delivery timelines & dispatch updates
  4. Step-by-step dough guidance & video demonstrations

---

## 📱 WhatsApp Funnel & Dynamic Messaging

The centralized script engine dynamically generates pre-filled WhatsApp URLs depending on the user's action:

1. **General Hero / Header / Floating WhatsApp Clicks:**
   > *"Hi Shrimati Kitchen Solutions,\n\nI'm interested in your Premium Wooden Roti Press Maker.\n\nPlease share the latest product details, available sizes, and delivery information for Bengaluru."*

2. **Specific Product Size & Quantity Selection (10", 12", 15"):**
   > *"Hi Shrimati Kitchen Solutions,\n\nI would like to get details/order the Premium Wooden Roti Press (12 Inch - Most Popular).\nQuantity: 1\n\nPlease share the latest price, availability, and delivery details for Bengaluru."*

3. **Lead Capture Form Submission (`/roti-press-offer.html` & Contact Form):**
   > *"Hi Shrimati Kitchen Solutions,\n\nI just submitted an enquiry for the Premium Wooden Roti Press:\n• Name: Anitha Rao\n• Phone: 9876543210\n• Size: 12 Inch - Most Popular\n• Quantity: 1\n• Area: Jayanagar\n• PIN Code: 560041\n• Notes: Need delivery by Saturday\n\nPlease share the latest pricing, availability and delivery details."*

---

## 🚀 Website Architecture & Pages

| Page | URL | Purpose | Key Features |
| :--- | :--- | :--- | :--- |
| **Home** | `index.html` | Brand Flagship & Overview | Hero value prop, 10"/12"/15" size cards, "One Press Endless Possibilities" food grid, 4-step guide, video request box, Bengaluru trust proof, FAQ. |
| **Product** | `product.html` | In-Depth Conversion Page | Interactive image switcher, interactive size chip selector, quantity stepper (+/-), full technical specifications table, dough care & usage tips. |
| **Meta Offer** | `roti-press-offer.html` | High-ROI Paid Ads Funnel | Distraction-free layout, comparison table (*Belan vs Roti Press*), high-converting quick lead form with immediate WhatsApp handoff. |
| **Shop** | `shop.html` | Catalog & Size Showcase | Clear breakdown of 10", 12", and 15" models + teaser cards for future kitchen innovations (Cast iron, Masala dani, Brass filter coffee). |
| **How It Works**| `how-it-works.html` | Visual Customer Education | 4 detailed steps, dough preparation pro tips for chapatis, jowar rotis & holige, video demo request module. |
| **Reviews** | `reviews.html` | Social Proof & Trust | Transparent customer feedback with Bengaluru locality badges, verified buyer tags, video testimonial requests. |
| **FAQ** | `faq.html` | Objection Handling | Comprehensive accordion addressing sizes, solid wood material, non-sticking dough technique, cleaning and Bengaluru delivery. |
| **Contact** | `contact.html` | Direct Maker Contact | Phone, Kampli address, direct WhatsApp trigger, quick enquiry form. |

---

## 📊 Analytics & Multi-Platform Tracking

The site contains a modular tracking dispatcher in `script.js` that automatically sends standard and custom events to:
- **Meta Pixel** (`fbq`)
- **Google Analytics 4** (`gtag`)
- **Google Tag Manager** (`dataLayer`)
- **Google Ads**

### Events Tracked Automatically:
- `PageView` — Triggered on every page load.
- `ViewContent` — Triggered on viewing product details.
- `ProductSizeSelected` — Triggered when a user switches sizes (10", 12", 15").
- `WhatsAppClick` — Triggered on all WhatsApp CTA clicks with source & size parameters.
- `PhoneClick` — Triggered when users tap telephone links.
- `Lead` & `OrderFormSubmitted` — Triggered when lead capture or contact forms are submitted.

### Configuring Tracking IDs:
In `roti-press-offer.html` or your global layout header, replace the placeholder IDs:
```javascript
window.META_PIXEL_ID = 'YOUR_META_PIXEL_ID';
window.GA4_ID = 'G-XXXXXXXXXX';
```

---

## 🗄️ Supabase Integration Blueprint (Future-Ready)

Lead submissions are designed to gracefully transition to Supabase. Even without Supabase initialized, forms currently:
1. Save leads locally in browser `localStorage` under `shrimati_leads` as a safety net.
2. Automatically redirect the user to WhatsApp with the formatted lead information.

### Recommended Supabase Table Schema:
```sql
CREATE TABLE public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    interested_size TEXT,
    quantity INTEGER DEFAULT 1,
    bengaluru_area TEXT,
    pin_code TEXT,
    notes TEXT,
    status TEXT DEFAULT 'new'
);
```

---

## 🌐 SEO & Structured Data

- **Primary Keywords Targeted:** *Wooden Roti Press Bengaluru, Wooden Chapati Maker Bengaluru, Roti Press Bengaluru, Chapati Press, Jowar Roti Press, Holige Press, Obbattu Press, Kitchen Products Bengaluru, Roti Maker Near Me*.
- **Structured Data Included:**
  - `schema.org/Organization` (Brand identity, Kampli address, telephone)
  - `schema.org/Product` (Shrimati Wooden Roti Press Maker without prices, pointing to WhatsApp ordering)
  - `schema.org/FAQPage` (Common questions and answers)
- **Search Engine Discovery:** Includes `sitemap.xml` and `robots.txt`.

---

## 🚢 Deployment Guide

### GitHub:
1. Push all files and the `assets/` directory to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: production-ready Shrimati website with WhatsApp funnel and zero prices"
   git branch -M main
   git remote add origin https://github.com/your-username/shrimati-kitchen-solutions.git
   git push -u origin main
   ```

### Vercel Deployment:
1. Log in to [vercel.com](https://vercel.com).
2. Click **"Add New Project"** and select your GitHub repository.
3. Framework Preset: **Other** (Static HTML).
4. Root Directory: `./`
5. Click **Deploy**. `vercel.json` will automatically configure clean URLs (`cleanUrls: true`) and asset caching headers.

---

## 🛠️ Verification & QA Checklist

- [x] **Zero Prices:** Verified across all 8 pages, headers, footers, and scripts.
- [x] **WhatsApp Routing:** Tested on all CTAs pointing to `wa.me/919742470099`.
- [x] **Mobile Responsiveness:** Tested for 360px, 375px, 390px, 414px, 768px, 1024px, and Desktop.
- [x] **Mobile Drawer:** Opens smoothly and automatically closes upon link selection.
- [x] **Interactive Gallery & Stepper:** Gallery thumbnail switcher and quantity controls tested.
- [x] **Meta Landing Page:** `/roti-press-offer.html` optimized for paid ad traffic.
- [x] **SEO & Schemas:** Validated JSON-LD schemas, sitemap, and robots.txt.
