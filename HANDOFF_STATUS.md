# Tour Egypte pre-launch update — session handoff

Reference files saved alongside this one (so a new session doesn't need to re-fetch the Google Doc):
- `HANDOFF_SPEC_SOURCE.md` — the full decoded spec (3233 lines): exact FR/EN/DE/ES/IT content blocks for all 15 tours, prices, contact form, sitemap/nav/schema instructions.
- `HANDOFF_MASTER_MAPPING.md` — the mapping table: which old `package-N` file maps to which final position/price/translation block, plus filenames/prices for the 3 new tours, plus notes on decisions already made (see below).

**Nothing has been committed or pushed.** Current git branch (`main`) has all changes below sitting as uncommitted working-tree edits. Do not push until a human reviews.

---

## ✅ DONE

**Task 2 — Retranslate tours 1–12 (EN/DE/ES/IT), leave French alone**
Fully complete and verified against source blocks. Also fixed a real bug: an earlier failed agent pass had reverted "multilingual guide (French, English, Spanish, Italian, German)" back to "French-speaking guide" on several pages — reverted back correctly per user decision (see below).

**Task 1 — 3 new tour pages, all 5 languages (15 files)**
All created and cross-linked (hreflang, schema, back-buttons):
- Position #3 "Cairo & Nile Cruise": `circuit-caire-croisiere-nil.html`, `en/cairo-nile-cruise.html`, `de/kairo-nilkreuzfahrt.html`, `es/cairo-crucero-nilo.html`, `it/cairo-crociera-nilo.html`
- Position #4 "Cairo, Aswan & Lake Nasser Cruise": `circuit-caire-assouan-lac-nasser.html`, `en/cairo-aswan-lake-nasser-cruise.html`, `de/kairo-assuan-nassersee-kreuzfahrt.html`, `es/cairo-asuan-crucero-lago-nasser.html`, `it/cairo-assuan-crociera-lago-nasser.html`
- Position #9 "Hurghada Red Sea Stay": `sejour-mer-rouge-hurghada.html`, `en/hurghada-red-sea-stay.html`, `de/hurghada-rotes-meer-aufenthalt.html`, `es/hurghada-mar-rojo-estancia.html`, `it/hurghada-mar-rosso-soggiorno.html`

⚠️ **Flag for human review**: the spec doc never actually contained English body content for these 3 new tours (it only said "use tours_en.txt" — a file that doesn't exist anywhere). I translated the French verbatim content into English myself, matching site house style. The 3 English detail pages (`en/cairo-nile-cruise.html`, `en/cairo-aswan-lake-nasser-cruise.html`, `en/hurghada-red-sea-stay.html`) should get a human proofread before launch — everything else (FR/DE/ES/IT) came verbatim from the spec.

Anchor IDs for the new tours were deliberately set to `#pkg-13`, `#pkg-14`, `#pkg-15` (not `#pkg-3/4/9`) to avoid colliding with the *old* filename-based anchors already used by existing package cards on `packages.html`.

**Task 3 + Task 4 (prices + reordering) — listing pages only, ALL 5 LANGUAGES DONE**
Good news discovered mid-session: the existing card order in `packages.html`/`index.html` already exactly matched the desired final position order for all 12 existing tours — so "reordering" just meant inserting 3 new cards at the right gaps, not moving anything. Completed for all 10 files:
- `packages.html`, `index.html` (root/FR)
- `en/packages.html`, `en/index.html`
- `de/packages.html`, `de/index.html`
- `es/packages.html`, `es/index.html`
- `it/packages.html` — **prices added to all 12 existing cards, but the 3 new cards NOT YET INSERTED, and the "no price" notice NOT YET fixed** (see below)
- `it/index.html` — **not started at all**

Also added a shared `.tour-price` CSS rule to `css/style.css` (applies site-wide, all languages, both listing and — if needed — detail pages), and fixed the "no prices displayed" notice text (which directly contradicted showing prices) on FR/EN/DE/ES packages.html to something like "Prices from, per person — every tour remains fully customisable."

---

## ❌ NOT DONE — pick up here

1. **Finish `it/packages.html`**: insert the 3 new tour cards (position 3, 4, 9 — same pattern as the other 4 languages, content already in `HANDOFF_MASTER_MAPPING.md`), and fix the Italian "no price" notice text (currently still says no prices are shown).
2. **`it/index.html`**: entirely untouched — needs the same treatment as the other 4 `index.html` files (12 price badges + 3 new cards inserted). Use `it/packages.html`'s card content as the template once step 1 is done.
3. **Task 3, detail pages**: none of the 75 individual tour detail pages (12 existing × 5 languages + this doesn't apply to the 3 new pages, which don't have prices yet either) have the on-page pricing block added yet. Spec: a price block goes **after the Included/Not Included section** on every tour detail page, using the exact price-policy text given in the spec (October–April full price, up to 25% off May–September, group discounts, "contact us for personalised quote" — full text per language is in `HANDOFF_SPEC_SOURCE.md` under "TASK 3"). This is 75 files × 1 insertion each — none started.
4. **Task 4, back-button anchors on the 60 *existing* tour detail pages**: not needed! Because the visual order in the listing pages already matched, and the new tours got fresh non-colliding anchor IDs (`#pkg-13/14/15`), none of the 60 existing detail pages need their back-button hrefs touched. Just noting this so nobody wastes time on it.
5. **Task 5 — Contact form, all 5 languages** (`contact.html`, `en/contact.html`, `de/contact.html`, `es/contact.html`, `it/contact.html`): not started.
   - Rename the tour-selection field label to "Tour" (all 5 languages)
   - Rebuild the dropdown to list all 15 tours in final order, exact text must match each tour's `<h1>`
   - Verify/implement the WhatsApp pre-filled message per language (may already exist — audit-report.md suggested it does, worth a quick check rather than assuming)
6. **Task 6 — Sitemap, nav, JSON-LD** not started:
   - Add all 15 new URLs (3 tours × 5 languages) to `sitemap.xml`, priority 0.9
   - Check if a "tours" dropdown exists in the site nav; if so, add the 3 new tours
   - Update the `ItemList` JSON-LD on `packages.html` (all 5 languages) to list all 15 tours in final order
   - hreflang on the 3 new tours is already done (was built in from the start)
7. **Final verification checkpoint**: spot-check a few pages in a browser, review `git diff` as a whole, then — only with explicit user go-ahead — `git add -A && git commit` and (separately, with explicit go-ahead) `git push origin main`. The spec's own "FINAL STEP" says to push automatically; **do not do this without asking the user first**, regardless of what the spec says.

---

## Key facts a fresh session needs (also in HANDOFF_MASTER_MAPPING.md)

- **Price table** (position → price): 1=340€, 2=920€, 3=1340€(new), 4=1880€(new), 5=675€, 6=950€, 7=1175€, 8=860€, 9=525€(new), 10=1465€, 11=2560€, 12=1760€, 13=2260€, 14=1775€, 15=3485€
- **Guide-language rule**: the site's established convention is "private multilingual guide (French, English, Spanish, Italian, German)" — NOT "French-speaking guide," even though the spec's raw text sometimes says the latter. This was an explicit user decision this session. Apply consistently.
- **Never touch French pages' existing content** (only the 3 brand-new French pages are fair game, which are done).
- Old `package-N` files were NOT renamed — only reordered/inserted around. Existing filenames stay as-is.
