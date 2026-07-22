# Tour Egypte — Full Site Audit

**Site audited:** `C:\Users\shop\Downloads\TOUR-EGYPTE-extracted\TOUR-EGYPTE-main` (touregypte.fr)
**Scope:** Root (French, default) + `en/`, `de/`, `es/`, `it/` — 12 tour packages + index, packages, about, contact, faq, reviews, references (travel tips), 404 — 96 real pages total. `* - Copy.html` files and `css/*.html` backups excluded (correctly `Disallow`'d in `robots.txt`, not live pages).
**Method:** Direct file reads, grep/diff across all language variants, and visual inspection of image files. Every finding below cites the exact file (and line, where useful).

---

## CATEGORY 1 — UI (User Interface)

### Score: 78 / 100

### Strengths
- **Disciplined button system.** Only three button classes exist site-wide (`btn-primary`, `btn-outline`, `btn-outline-white` — `css/style.css:176-245`) and every `<a class="btn...">` on the site uses one of them; no rogue inline-styled buttons were found anywhere.
- **Sticky trip-detail sidebar.** `.pkg-sidebar` (`position: sticky; top: 100px`, e.g. `en/package-1-dahabiya.html:199-233`) keeps Duration / Tour Type / Boat Type / Languages / Starts / Ends visible while the visitor scrolls a long itinerary — a genuinely good pattern for a content-heavy page.
- **Floating-button stacking on mobile is well-tuned.** WhatsApp button, Book-Now button, and the bottom icon nav bar are spaced at `bottom: 0 / 72px / 144px` (`css/style.css:1770-1772`) so none of the three overlap on small screens — this looks like a deliberate, successful fix (matches an earlier commit "fix: back button overlapping logo on mobile viewport").
- **Consistent card system.** `.package-card` is reused identically between the homepage teaser grid and `packages.html`'s full listing — same image/badge/duration/title/description/footer structure throughout.
- **Format-optimized imagery — where it's used.** 8 of the 12 tour hero/thumbnail images use `<picture>` or CSS `image-set()` to serve WebP with a JPEG fallback (e.g. `package-2-cairo-weekend.html:506`, `package-7-...html:272`, `package-12-...html:515`).
- **100% single-`<h1>` compliance** across all 96 pages (see SEO section — this is as much a UI/typography-hierarchy win as an SEO one).

### Mistakes / Weaknesses (with citations)
1. **Wrong destination photo on a live package page.** `package-4-cairo-alexandria.html:266` and its `packages.html:453` card thumbnail both use `images/pkg-alexandria.jpg` as the hero/thumbnail for "Week-end Le Caire & Alexandrie." I opened the file directly — **it is a photo of Islamic Cairo (a mosque/minaret skyline), not Alexandria.** Genuine Alexandria photography already exists in the repo and is unused for this purpose: `images/tours/alexandria-library.jpg` (Bibliotheca Alexandrina, verified) and `images/tours/qaitbay-citadel.jpg`.
2. **Inconsistent image-format optimization, exactly 4 of 12 tours affected.** `package-1-dahabiya.html:516`, `package-4-cairo-alexandria.html:266`, `package-5-ultimate.html`, and `package-6-hurghada.html:270` all hardcode a single `.jpg` background with no WebP variant, while the other 8 packages use `image-set()`/`<picture>`. Same 4 images are also missing WebP siblings on disk (confirmed: no `pkg-alexandria.webp` exists in `images/`).
3. **All 12 package detail pages serve every in-page gallery/itinerary image as plain `.jpg`** — zero `<picture>`/WebP usage inside any `package-N-*.html`, unlike `index.html` and `packages.html` which do use `<picture>`. This is the highest-traffic, highest-intent page type on the site running on the heavier format.
4. **Same photo, two contradictory captions.** `images/pkg-nile-cruise.jpg` is used twice on `index.html`: line 485 says `alt="Luxor Temple columns at dusk"`, line 688 says `alt="Karnak Temple columns at sunset"` — one photo can't be both named monuments; whichever is wrong misdescribes the image to users and search engines.
5. **Inconsistent `width`/`height` attributes.** Only 3 of the 12 `<img>` tags in `packages.html`'s card grid declare explicit dimensions; the other 9 risk layout shift (CLS) on slow connections.
6. **~330 lines of near-identical inline `<style>` duplicated in all 60 tour pages** (12 packages × 5 languages) instead of living in the shared stylesheet. I confirmed this firsthand earlier in this project: a single font-size change required editing the same rule in 60 separate files. The SEO agent independently flagged the page-weight cost (~9.4 KB inline CSS per package page).
7. **~160 lines of fully dead CSS.** `.navbar__toggle`, `.navbar__mobile`, `.navbar__mobile-header/-close/-nav/-lang-grid` (`css/style.css:531-693`) have **zero matching markup anywhere on the site** — verified with a sitewide grep returning 0 hits for both class names across every page type. This is leftover from a mobile-nav redesign that was never cleaned up.
8. **Hero images can't be prioritized for LCP.** Every page's hero is a CSS `background-image` on a `<div>`, never an `<img>`/`<picture>`, so there's no `fetchpriority="high"` or `rel="preload"` possible for what is the Largest Contentful Paint element on nearly every page (confirmed: zero `fetchpriority`/`preload` hits sitewide).

### Priority Fixes (ranked by impact)
1. Replace `images/pkg-alexandria.jpg` as the hero/thumbnail for package-4 with the existing `images/tours/alexandria-library.jpg` or `qaitbay-citadel.jpg` — 5-minute fix, direct credibility impact on a page literally named after the missing destination.
2. Generate WebP versions for the 4 missing tour images and convert all 12 package pages' in-page images to `<picture>`/WebP — closes the biggest, most systemic image-performance gap.
3. Extract the duplicated ~330-line per-tour `<style>` block into a shared stylesheet (or shared classes in `css/style.css`) — cuts page weight ×12 and makes future style changes a one-file edit instead of sixty.
4. Delete the dead `.navbar__toggle`/`.navbar__mobile*` CSS (and its matching dead JS in `main.js`, see UX section) — free cleanup, smaller stylesheet.
5. Fix the `pkg-nile-cruise.jpg` alt-text contradiction and audit the remaining ~1 image lacking `width`/`height`.

---

## CATEGORY 2 — UX (User Experience)

### Score: 70 / 100

### Strengths
- **Mobile navigation without a hamburger.** The bottom icon bar (`navbar__icons`, visible ≤768px) mirrors the desktop nav's 7 destinations — a clean alternative to a hidden hamburger menu, and it doesn't collide with the floating WhatsApp/Book-Now buttons (see UI section).
- **Honest, consistent pricing policy.** `packages.html`'s "No price notice" (*"Pas de prix affichés. Chaque tour est sur-mesure..."*) sets expectations clearly and consistently across the listing — no page contradicts this policy with a random visible price.
- **Accessible, well-built contact form.** Proper `<label for>` bindings, `required`/`aria-required` on mandatory fields, `autocomplete` hints, inline `role="alert"` error messaging, and a post-submit WhatsApp fallback CTA (`contact.html:714-726`) if the visitor wants a faster channel.
- **404 page is fully functional** — real navbar, real footer, GA4 tracking, correctly `noindex,nofollow`'d, and two clear recovery CTAs (Home / See our tours).
- **Sticky sidebar (see UI)** doubles as a UX win: trip facts stay visible without needing to scroll back up.

### Mistakes / Weaknesses (with citations)
1. **The language switcher is broken on 4 of 5 languages (i.e. on ~77 of the site's 96 pages).** `js/translations.js` (own code comment, ~line 2980) confirms only root/French pages carry `[data-i18n]` elements; `en/`, `de/`, `es/`, `it/` pages are static and have none. But `main.js:65-70` wires the language-dropdown click handler unconditionally on every page. Result: a visitor on any English/German/Spanish/Italian page who clicks a different language in the dropdown sees the flag, `EN`/`DE`/`FR` label, and `<html lang>` attribute all change — **while every word of visible body text stays in the original language.** This is a core, highly visible interactive control silently failing for the majority of the site's pages.
2. **Even on the French root pages, the language switcher never navigates.** Clicking "English" on `package-1-dahabiya.html` live-swaps text via JS/`localStorage` but the URL stays on the French page — the visitor never actually lands on the dedicated, hreflang-linked `en/package-1-dahabiya.html`. Two different "English experiences" of the same content now exist on the site (the JS-patched French URL vs. the real English page), and only one of them is the one Google/hreflang actually points international searchers to.
3. **The booking funnel loses the visitor's context.** Every "Réserver"/"Book Now" link across all 12 package pages and every package card points to a plain `contact.html` with no query parameter or pre-selection (confirmed: every instance is a bare `href="contact.html"`). Compounding this, the form's own "Forfait Préféré" `<select>` (`contact.html:665-673`) **only lists 6 of the 12 tours** (package-1 through package-6) — a visitor interested in package-7 through package-12 has no way to select their tour and must fall back to "Custom" and retype it.
4. **No related-tour cross-linking.** Confirmed on `package-1-dahabiya.html` and `package-6-hurghada.html`: internal links go only to hub pages (Home, Tours listing, About, Reviews, Contact, Tips, FAQ) — never to another specific package. A visitor comparing the Dahabiya cruise (package-1) against the similar Lake Nasser + Dahabiya itinerary (package-7) has to return to the full 12-tour listing and re-scan it themselves.
5. **The contact form's spam honeypot doesn't do anything.** `contact.html:712` declares a hidden `_gotcha` field, but it is never read anywhere in the submit handler (`contact.html:867-931`, confirmed via full-file grep — the string `gotcha` appears exactly once, in the HTML declaration). There is also no CAPTCHA. The form has zero functioning bot defense beyond whatever EmailJS itself provides.
6. **Dead mobile-menu code confirms an incomplete migration** (see UI #7) — not directly visitor-facing, but it means `main.js:23-47` and `:73-81` (toggle/close/mobile-lang-switcher listeners) run on every page for elements that never exist.

### Priority Fixes (ranked by impact)
1. Fix the language switcher: either build real translation coverage for `en/de/es/it` pages, or (simpler) make the dropdown **navigate** to the equivalent page in the chosen language on every page type, instead of attempting a client-side swap that only works on French pages.
2. Add packages 7-12 to the contact form's package dropdown, and have every "Book Now"/"Réserver" link pass the specific tour along (e.g. `contact.html?package=package-7-...` read by JS to pre-select the dropdown) so no booking intent is lost.
3. Add a "Related Tours" module to each package page (2-3 similar itineraries), closing both the UX discovery gap and the SEO internal-linking gap.
4. Either wire up the honeypot check in the submit handler or remove it — a non-functional spam trap is worse than none, since it creates false confidence.
5. Remove the dead mobile-menu JS/CSS once removed from the stylesheet (see UI #4).

---

## CATEGORY 3 — SEO (Search Engine Optimization)

### Score: 87 / 100

### Strengths
- **Canonical + hreflang implementation is near-flawless.** Verified programmatically across all 96 pages: 0 missing canonicals (except the intentionally `noindex`'d 404), 0 duplicate canonical URLs, and every page carries a full `fr/en/de/es/it/x-default` hreflang set pointing to the *correct* per-language URL (not just the homepage). This is genuinely better than most multi-language sites of this size.
- **100% single-`<h1>` compliance**, sensible H2→H3→H4 progression on sampled pages, no skipped heading levels.
- **Clean URL structure** — descriptive slugs (`package-7-cairo-lac-nasser-dahabiya-luxor.html`), zero query strings in internal links, no trailing-slash inconsistency.
- **`sitemap.xml` and `robots.txt` are complete and consistent** — 95 URLs in the sitemap match exactly the 95 real indexable pages (96 minus the noindexed 404); explicit `Disallow` rules correctly exclude backup/copy files.
- **Alt-text coverage is strong**: 58 of 59 sampled content images have specific, descriptive alt text (the one "miss" is a dynamically-populated lightbox placeholder, not a real content image).
- **Schema coverage is broad and mostly complete**: `TravelAgency`/`LocalBusiness`, `Person`, `BreadcrumbList`, `FAQPage`, `ItemList`, `Article`, and `TouristTrip` all appear on the appropriate page types. `FAQPage` schema has exact 1:1 coverage of all 28 visible questions; `AggregateRating`/`Review[]` counts match the visible 13 reviews exactly.

### Mistakes / Weaknesses (with citations)
1. **Two literal copy-paste bugs in German `<title>` tags:**
   - `de/package-3-cairo-nile.html:13` → *"Kairo & Nilkreuzfahrt Luxor / Assuan **Luxor / Assuan** | touregypte.fr"* (destination repeated twice)
   - `de/package-4-cairo-alexandria.html:13` → *"Kairo & Alexandria **Wochenende Wochenende** | touregypte.fr"* (word repeated twice)
   Both pages' `<h1>` is correct — only the `<title>` is broken.
2. **Three competing title-suffix conventions on the French root pages**, while every translated version consistently uses "Page Name | touregypte.fr":
   - No suffix at all: `index.html:17`, `about.html:15`
   - Em-dash + brand name: `contact.html:15`, `packages.html:15`
   - Pipe + brand name (not domain): `faq.html:15`, `references.html:15`
   - `reviews.html:15` reads awkwardly: *"Avis Clients — Tour Egypte **Égypte**"* (redundant country name)
3. **Title/description length outliers**: `de/package-6-hurghada.html:13` is 73 characters (will truncate in SERPs); `en/package-2-cairo-weekend.html:13` is only 29 characters ("Cairo Weekend | touregypte.fr" — thin, no destination/duration detail); `de/packages.html:14` meta description runs 175 characters (over the ~160 practical limit).
4. **`TouristTrip` schema on all 60 package pages has no `offers`/price or structured `duration` field**, even though duration is stated in plain text on every page (e.g. "12 Jours / 11 Nuits"). This blocks any price/duration rich-result eligibility for the site's core commercial pages.
5. **All 12 package detail pages serve in-page images as JPEG-only** (no `<picture>`/WebP), unlike the homepage and `packages.html` — a real, measurable page-weight cost specifically on the pages closest to a booking decision.
6. **No package-to-package internal links** anywhere on the 60 package pages (see UX #4) — a missed opportunity to distribute internal link equity across the catalog instead of funneling everything through the hub pages only.

### Priority Fixes (ranked by impact)
1. Fix the two duplicated-word `<title>` bugs on `de/package-3-cairo-nile.html` and `de/package-4-cairo-alexandria.html` — one-line fixes, immediate correctness win.
2. Standardize the French root pages onto the same "Page Name | touregypte.fr" title convention already used consistently in en/de/es/it.
3. Add `offers` (even as a price-range placeholder reflecting the "custom quote" model) and `duration` to the `TouristTrip` schema on all 60 package pages.
4. Convert package-page in-page images to `<picture>`/WebP to match the homepage's already-good pattern.
5. Trim the one long title and one long meta description flagged above; expand the one too-thin title.

---

## CATEGORY 4 — GEO (Generative Engine Optimization / AI Visibility)

### Score: 72 / 100

### Strengths
- **`llms.txt` exists and is genuinely well-built** — founding facts, license number, address, phone, email, and a full linked directory of every tour and page in all 5 languages.
- **`robots.txt` explicitly welcomes AI crawlers** by name: `GPTBot`, `ClaudeBot`, `PerplexityBot`, `anthropic-ai`, `Google-Extended`, alongside `Googlebot`/`Bingbot` — an unusually AI-forward configuration for a small tourism site.
- **Core trust facts are remarkably consistent**: phone (`+20 122 379 7757`), email (`Reservation@touregypte.fr`), license number ("N° 1200"), founding year (2000), and address all matched exactly across dozens of instances checked in JSON-LD, visible footers, and page copy, in every language.
- **A named, humanized founder** (Mahmoud El Sayed, founded 2000, personal backstory in `about.html`) — a real trust signal AI models weigh when assessing "is this a legitimate operator."
- **Reviews read as authentic, not templated** — one names a 20-year personal relationship with the founder since 2005 and a "15th trip to Egypt"; others name specific guides, hotels, and itineraries. This is materially harder to fake than generic praise and is a strong GEO signal.
- **FAQ (28 questions) is specific and fact-dense** — named sites (Karnak, Abu Simbel, Dendera), named insurers (AXA, Allianz), a real visa portal URL, boat capacities — exactly the kind of citable, checkable content an AI assistant favors over marketing fluff.

### Mistakes / Weaknesses (with citations)
1. **`llms.txt` is undiscoverable.** It is not referenced from `robots.txt`, `sitemap.xml`, or any `<link>` tag on any page — an AI crawler has no signal that it exists at all beyond guessing the URL. There is also only one root file mixing all 5 languages, with no `en/llms.txt`, `de/llms.txt`, etc.
2. **The visa price is inconsistent in four different ways across the live site right now:**
   - `faq.html` (and its FAQPage JSON-LD): **"25 USD"**
   - `references.html` (Travel Tips, root + all 4 languages): **"30 USD"**
   - `package-1-dahabiya.html:826`: **"25 Euro"**
   - `package-2-cairo-weekend.html:670`: **"25 US$"**
   - `package-4-cairo-alexandria.html:475`: **"25 Euro"**
   An AI assistant (or a careful human reader) cross-referencing two pages of this site would get a contradictory answer to a simple, checkable question — directly undermining confidence in every other fact the site states.
3. **Stale copyright year sitewide.** Every page footer (sourced from the single `footer.copy` string in `js/translations.js`, propagated to 100+ instances across every page/language) reads **"© 2025"** despite the site otherwise being current (references.html and other content were updated this year). A small but visible "has anyone maintained this site recently" signal.
4. **Structured-data/visible-content mismatch in a review.** `reviews.html`'s JSON-LD lists the "superbe" review's author as `"lescretois"`, while the rendered card correctly shows **"Maher C."** — I confirmed both entries describe the same review (identical date, matching body text). The structured data is simply wrong, which matters specifically because AI/search systems trust the machine-readable version over the visual page.
5. **The two `LocalBusiness` JSON-LD blocks on `reviews.html`** (one carrying `AggregateRating`, one carrying the `review[]` array) aren't linked via a shared `@id`, so a strict schema consumer may not recognize them as the same business entity.
6. **Dead third-party review links.** `reviews.html`'s "Leave a review on Google" / "...on TripAdvisor" buttons both point to `href="#"` — no real profile is linked. Petit Futé is currently the *only* actual third-party validator on the entire site.
7. **No trip insurance/cancellation policy detail beyond a single FAQ line and one references.html bullet** — thin coverage of a trust dimension AI assistants often surface when comparing operators.
8. **No founder photo** — the bio in `about.html` sits next to a generic stock pyramids image rather than a real headshot, a missed, low-effort trust-signal opportunity.
9. **The single biggest AI-answerability gap: there is no pricing information anywhere on the site.** Confirmed by grepping every package page, `packages.html`, `faq.html`, and `llms.txt` for currency figures — the only numbers found are the (inconsistent) visa-fee mentions above. An AI assistant asked "roughly what should I expect to pay for a 7-day Nile cruise with this operator" cannot answer from this site's content at all; it can only relay that pricing is custom-quote-only.

### Priority Fixes (ranked by impact)
1. Pick one visa-price figure and currency, and make it identical on `faq.html`, `references.html`, and every package page that mentions it — the fastest, highest-credibility fix on this list.
2. Reference `llms.txt` from `robots.txt` (a `Sitemap:`-style pointer or comment) so it's discoverable without guessing the URL.
3. Fix the `reviews.html` JSON-LD author mismatch ("lescretois" → "Maher C.") and link its two `LocalBusiness` blocks with a shared `@id`.
4. Add at least an indicative "from €X per person" price anchor somewhere on the site (even one representative figure) — closes the largest AI-answerability gap without abandoning the custom-quote business model.
5. Update the stale "© 2025" string in `js/translations.js` and either wire up or remove the dead Google/TripAdvisor review buttons.

---

## OVERALL TOP 10 — Ranked by Impact on Bookings & Visibility

| # | Fix | Category | Why it's high-impact |
|---|-----|----------|----------------------|
| 1 | Fix the language switcher (broken on ~77 of 96 pages — updates flag/label but not content) | UX | Core interactive feature is silently broken for the majority of international visitors; directly damages trust and usability for 4 of 5 languages |
| 2 | Resolve the visa-price inconsistency (25 USD / 30 USD / 25 Euro / 25 US$ across 5 different pages) | GEO/SEO | A checkable factual contradiction visible to any attentive reader or AI model; cheapest possible credibility fix |
| 3 | Complete the contact form's package dropdown (only 6 of 12 tours listed) and link "Book Now" buttons to pre-select the specific tour | UX | Direct funnel/conversion leak on every single package page |
| 4 | Replace the Cairo photo used for the "Cairo & Alexandria" package hero/thumbnail with real Alexandria imagery already in the repo | UI/Trust | Visibly wrong destination photo on a page named after the missing city |
| 5 | Add `offers`/price and `duration` structured data to the `TouristTrip` schema on all 60 package pages | SEO/GEO | Unlocks price/duration rich results and gives AI assistants a citable, structured signal |
| 6 | Fix the two duplicated-word German `<title>` bugs and standardize the French root pages' title-suffix convention | SEO | Cheap, mechanical, immediate SERP click-through benefit |
| 7 | Add WebP versions for the 4 tours missing them and convert all 12 package pages' in-page images to `<picture>`/WebP | UI/SEO | Real Core Web Vitals and mobile data-usage improvement on the highest-intent pages |
| 8 | Make `llms.txt` discoverable, fix the review author schema mismatch, and link the two `reviews.html` JSON-LD blocks | GEO | Strengthens how much AI systems can trust and reuse this site's structured data |
| 9 | Add "Related Tours" cross-linking to all 12 package pages | UX/SEO | Improves on-site discovery depth and distributes internal link equity beyond hub-and-spoke |
| 10 | Update the stale "© 2025" footer year sitewide and remove/fix the dead Google/TripAdvisor review-link buttons | GEO/Trust | Small effort; removes an obvious "unmaintained site" signal for both humans and AI evaluators |

**Not in the top 10 but worth a cleanup pass:** delete the ~160 lines of dead `.navbar__mobile`/`.navbar__toggle` CSS+JS; extract the ~330-line duplicated inline `<style>` block out of all 60 tour pages into a shared stylesheet; fix or remove the non-functional contact-form honeypot; fix the `pkg-nile-cruise.jpg` alt-text contradiction on `index.html`.
