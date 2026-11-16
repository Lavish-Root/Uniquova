# UNIQOVA SEO Deployment & Go-Live Checklist

This checklist contains all actionable, step-by-step instructions for launching, verifying, and monitoring the SEO implementation for **UNIQOVA** (`https://uniquova.com`).

---

## Phase 1: Environment Variables & Hosting Configuration

Before deploying to Vercel, Netlify, or custom VPS:

- [ ] **Set Google Analytics 4 Measurement ID:**
  In your production hosting dashboard (e.g., Vercel Project Settings > Environment Variables), add:
  ```env
  NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
  ```
  *(Replace with your actual GA4 stream ID created in Google Analytics)*
- [ ] **Configure Custom Domain & Force HTTPS:**
  - Verify that `https://uniquova.com` is set as the primary domain.
  - Ensure all traffic from `http://`, `http://www.`, and `https://www.` automatically 301 redirects to canonical `https://uniquova.com`.
- [ ] **Verify HTTP Security Headers:**
  Ensure the host returns standard security headers (`Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`).

---

## Phase 2: Google Search Console (GSC) Verification

Google Search Console is essential for index tracking, sitemap crawling, and organic search impressions.

### Step-by-Step Setup:
1. Navigate to [Google Search Console](https://search.google.com/search-console).
2. Choose **Domain** property type and enter `uniquova.com`.
3. Add the provided DNS `TXT` record at your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.).
4. *Alternative Method (HTML Verification Tag):* If DNS access is delayed:
   - Copy the verification code from Google Search Console (e.g. `google-site-verification=abc...`).
   - Add it to `src/app/layout.tsx` under `verification.google`:
     ```ts
     verification: {
       google: "YOUR_GSC_VERIFICATION_STRING",
     }
     ```
5. Click **Verify** in Search Console.

---

## Phase 3: XML Sitemap Submission

Once the site is live and verified in Google Search Console:

1. In Google Search Console, go to **Indexing** > **Sitemaps** in the left sidebar.
2. Enter the sitemap URL path:
   ```
   https://uniquova.com/sitemap.xml
   ```
3. Click **Submit**.
4. Confirm status shows **Success** and all 15 indexable URLs are discovered.
5. In Bing Webmaster Tools ([bing.com/webmasters](https://www.bing.com/webmasters)):
   - Sign in and import your verified domain directly from Google Search Console.
   - Verify that `https://uniquova.com/sitemap.xml` is recognized.

---

## Phase 4: Schema & Rich Results Validation

Verify structured JSON-LD schemas using Google's official testing utilities:

- [ ] **Google Rich Results Test:**
  Visit [search.google.com/test/rich-results](https://search.google.com/test/rich-results) and test:
  1. `https://uniquova.com/` (Should detect `Organization`, `WebSite`)
  2. `https://uniquova.com/services/amazon-account-management` (Should detect `Service`, `BreadcrumbList`, and `FAQPage`)
  3. `https://uniquova.com/contact` (Should detect `ProfessionalService`, `BreadcrumbList`)
- [ ] **Schema.org Validator:**
  Visit [validator.schema.org](https://validator.schema.org) to confirm zero syntax errors or missing required fields.

---

## Phase 5: 301 Redirect Testing

Verify that all legacy and shorthand URLs successfully return `HTTP 301` and redirect to canonical paths:

- [ ] `https://uniquova.com/ecommerce-management` → `/services/ecommerce`
- [ ] `https://uniquova.com/amazon-account-management` → `/services/amazon-account-management`
- [ ] `https://uniquova.com/flipkart-account-management` → `/services/flipkart-account-management`
- [ ] `https://uniquova.com/amazon-ppc-management` → `/services/amazon-ppc-management`
- [ ] `https://uniquova.com/ecommerce-catalog-management` → `/services/ecommerce-catalog-management`
- [ ] `https://uniquova.com/website-development` → `/services/web-development`
- [ ] `https://uniquova.com/graphic-designing` → `/services/graphic-design`
- [ ] `https://uniquova.com/projects` → `/our-work`

You can test these via terminal using `curl -I`:
```bash
curl -I https://uniquova.com/amazon-account-management
```
Expected response: `HTTP/1.1 301 Moved Permanently` with `Location: /services/amazon-account-management`.

---

## Phase 6: Google Business Profile (GBP) Local SEO Setup

To establish legitimate local presence in India:

1. Visit [google.com/business](https://www.google.com/business).
2. Register **UNIQUOVA** under category:
   - Primary: *E-commerce Service* or *Marketing Agency* / *Website Designer*.
3. Add verified business phone number, operating hours (`Mon-Sat: 10:00 AM – 7:00 PM`), and website URL (`https://uniquova.com`).
4. Complete Google's verification process (video or postal verification).
5. Ensure the Business Name, Phone, and Email match the details in `src/lib/schema.ts` and `/contact`.

---

## Phase 7: Conversion Tracking Verification

Once `NEXT_PUBLIC_GA_ID` is active:

1. Open `https://uniquova.com` in a browser with GA4 DebugView or Google Analytics Realtime report open.
2. Submit a test inquiry on the Contact page:
   - Confirm GA4 receives event `generate_lead`.
3. Click the WhatsApp button in the navbar or contact page:
   - Confirm GA4 receives event `contact` with category `whatsapp_click`.
4. In Google Analytics, mark `generate_lead` and `contact` as **Key Events (Conversions)**.

---

## Phase 8: Core Web Vitals Audit

Run a Google Lighthouse audit on production:
- Target:
  - **Performance:** 90+
  - **Accessibility:** 95+
  - **Best Practices:** 100
  - **SEO:** 100
- Check real user metric targets:
  - **LCP (Largest Contentful Paint):** $\le 2.5\text{s}$
  - **INP (Interaction to Next Paint):** $\le 200\text{ms}$
  - **CLS (Cumulative Layout Shift):** $\le 0.1$

---

## Summary of Generated SEO Deliverables in Codebase

All files are created and available for reference:
1. `SEO_AUDIT_REPORT.md` — Baseline audit classifying findings across Critical, High, Medium, and Low.
2. `KEYWORD_RESEARCH.md` — Comprehensive Indian & global keyword mapping across E-commerce, Web, App, Branding, and Graphic Design.
3. `SEO_PAGE_MAPPING.md` — Exact title, meta description, H1, and schema mapping for all 15 routes.
4. `CONTENT_STRATEGY.md` — 20 actionable long-tail blog article outlines with target keywords, URLs, and internal linking strategies.
5. `SEO_IMPLEMENTATION_REPORT.md` — Complete engineering record of code, components, and architectural refactoring.
6. `SEO_DEPLOYMENT_CHECKLIST.md` — This post-deployment activation checklist.
