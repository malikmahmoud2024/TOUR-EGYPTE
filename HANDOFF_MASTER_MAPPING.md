# Master mapping — Tour Egypte pre-launch update

Source spec: `C:\Users\shop\AppData\Local\Temp\claude\C--Users-shop--claude\3a781e21-9c30-47f4-bf54-eaa7d9c2c123\scratchpad\prompt_COMPLETE.md` (SPEC file, 3233 lines)

Verified against actual `<h1>` text read from `en/package-N-*.html` files in the project — do not re-derive this from filenames alone, filenames are not fully reliable.

## Existing 12 tours: old file -> new position -> price -> translation block

| New Pos | Existing FR/EN/DE/ES/IT filename (unchanged, same name all langs) | Current EN h1 | Price | EN block lines | DE block lines | ES block lines | IT block lines |
|---|---|---|---|---|---|---|---|
| 1 | package-2-cairo-weekend.html | Cairo Weekend | 340€ | 244-269 | 785-813 | 1562-1593 | 2327-2358 |
| 2 | package-4-cairo-alexandria.html | Cairo & Alexandria Weekend | 920€ | 270-301 | 815-857 | 1595-1637 | 2360-2402 |
| 5 | package-8-cairo-hurghada.html | Cairo & Red Sea Hurghada | 675€ | 302-339 | 859-904 | 1639-1684 | 2404-2449 |
| 6 | package-9-cairo-luxor-hurghada.html | Cairo, Luxor & Red Sea Hurghada | 950€ | 340-377 | 906-954 | 1686-1734 | 2451-2499 |
| 7 | package-11-nile-cruise-luxor.html | Nile Cruise Luxor / Luxor 7 Nights | 1175€ | 378-415 | 956-998 | 1736-1775 | 2501-2540 |
| 8 | package-12-cairo-fayoum-alexandria.html | Cairo, Fayoum Oasis, Valley of Whales & Alexandria | 860€ | 416-453 | 1000-1044 | 1777-1821 | 2542-2586 |
| 10 | package-3-cairo-nile.html | Cairo & Nile Cruise Luxor / Aswan | 1465€ | 454-494 | 1046-1097 | 1823-1871 | 2588-2636 |
| 11 | package-1-dahabiya.html | Cairo & Dahabiya on the Nile Luxor / Aswan | 2560€ | 495-547 | 1099-1165 | 1873-1936 | 2638-2701 |
| 12 | package-6-hurghada.html | Cairo, Nile Cruise Aswan / Luxor & Red Sea Hurghada | 1760€ | 548-594 | 1167-1215 | 1938-1986 | 2703-2751 |
| 13 | package-5-ultimate.html | Cairo, Nile Cruise, St Catherine Monastery & Red Sea Sharm El Sheikh | 2260€ | 595-650 | 1217-1274 | 1988-2045 | 2753-2810 |
| 14 | package-10-nile-cruise-hurghada.html | Nile Cruise Luxor / Luxor 7 Nights & Red Sea Hurghada 7 Nights | 1775€ | 651-694 | 1276-1348 | 2047-2116 | 2812-2881 |
| 15 | package-7-cairo-lac-nasser-dahabiya-luxor.html | Cairo, Lake Nasser Cruise Aswan / Abu Simbel, Dahabiya on the Nile Aswan / Luxor | 3485€ | 695-753 | 1350-1422 | 2118-2190 | 2883-2955 |

Rule: only replace the visible itinerary text (day-by-day + included/not included). Do NOT touch HTML structure, schema, hreflang, nav, CSS. Do NOT rename these files or change their position in the DOM order requirement is handled separately in Task 4.

**Known in-progress work**: `de/`, `es/`, `it/` versions of `package-7-cairo-lac-nasser-dahabiya-luxor.html` (new pos 15) have UNCOMMITTED partial edits already applying this exact translation from a prior session. Diff and finish/verify rather than blindly overwrite.

## 3 new tours: position -> price -> filenames -> content source

### New position 3 — "Cairo & Nile Cruise" (8 Days / 7 Nights) — 1340€
- FR content (verbatim): SPEC lines 34-93 (Task 1, Tour "13")
- EN content: **NOT in spec** (placeholder only, SPEC lines 754-761). Must be translated from the FR text at lines 34-93 by us — flagged to user, translate carefully, match terminology used in `en/package-3-cairo-nile.html` (same house style: "Sound and Light Show", "Not Included" etc.)
- DE content: SPEC lines 1424-1472
- ES content: SPEC lines 2192-2240
- IT content: SPEC lines 2957-3005
- Filenames: `circuit-caire-croisiere-nil.html` (FR), `cairo-nile-cruise.html` (EN), `kairo-nilkreuzfahrt.html` (DE), `cairo-crucero-nilo.html` (ES), `cairo-crociera-nilo.html` (IT)
- Closest template (structurally): `package-3-cairo-nile.html` (also a Cairo+Nile cruise Aswan/Luxor tour, just 10 days instead of 8 — use it for HTML/CSS/schema shape, replace all content)

### New position 4 — "Cairo, Aswan & Lake Nasser Cruise" (8 Days / 7 Nights) — 1880€
- FR content (verbatim): SPEC lines 97-156
- EN content: **NOT in spec** (placeholder only, SPEC lines 762-768). Translate from FR lines 97-156.
- DE content: SPEC lines 1474-1516
- ES content: SPEC lines 2242-2281
- IT content: SPEC lines 3007-3046
- Filenames: `circuit-caire-assouan-lac-nasser.html` (FR), `cairo-aswan-lake-nasser-cruise.html` (EN), `kairo-assuan-nassersee-kreuzfahrt.html` (DE), `cairo-asuan-crucero-lago-nasser.html` (ES), `cairo-assuan-crociera-lago-nasser.html` (IT)
- Closest template: `package-7-cairo-lac-nasser-dahabiya-luxor.html` (only existing Lake Nasser cruise tour) — replace content, this new tour is shorter (no Dahabiya leg)

### New position 9 — "Hurghada Red Sea Stay" (8 Days / 7 Nights) — 525€
- FR content (verbatim): SPEC lines 160-209
- EN content: **NOT in spec** (placeholder only, SPEC lines 770-777). Translate from FR lines 160-209.
- DE content: SPEC lines 1518-1557
- ES content: SPEC lines 2283-2322
- IT content: SPEC lines 3048-3087
- Filenames: `sejour-mer-rouge-hurghada.html` (FR), `hurghada-red-sea-stay.html` (EN), `hurghada-rotes-meer-aufenthalt.html` (DE), `hurghada-mar-rojo-estancia.html` (ES), `hurghada-mar-rosso-soggiorno.html` (IT)
- Closest template: `package-8-cairo-hurghada.html` (has a Hurghada beach-stay component; this new tour is a PURE beach stay with no Cairo touring days — strip Cairo days per spec content, it's Hurghada Day 1-8 only, optional Luxor/Cairo day trips mentioned as options only)

## Final tour order (Task 4) — for listing/homepage/dropdown, everywhere
1. Weekend Cairo — 4d — 340€ (package-2)
2. Cairo & Alexandria — 6d — 920€ (package-4)
3. Cairo & Nile Cruise — 8d — 1340€ (NEW)
4. Cairo, Aswan & Lake Nasser Cruise — 8d — 1880€ (NEW)
5. Cairo & Hurghada — 8d — 675€ (package-8)
6. Cairo, Luxor & Hurghada — 8d — 950€ (package-9)
7. Nile Cruise Luxor/Luxor — 8d — 1175€ (package-11)
8. Cairo, Alexandria & Fayoum Oasis — 8d — 860€ (package-12)
9. Hurghada Red Sea Stay — 8d — 525€ (NEW)
10. Cairo & Nile Cruise (10 days) — 10d — 1465€ (package-3)
11. Cairo & Dahabiya on the Nile — 12d — 2560€ (package-1)
12. Cairo, Nile Cruise & Hurghada — 12d — 1760€ (package-6)
13. Cairo, Nile Cruise, St Catherine & Sharm — 14d — 2260€ (package-5)
14. Nile Cruise Luxor/Luxor & Hurghada — 15d — 1775€ (package-10)
15. Cairo, Lake Nasser Cruise & Dahabiya — 15d — 3485€ (package-7)

## Price detail-page text (Task 3), template with [PRICE]:
- FR: [PRICE]€ / personne. Valable d'octobre à avril (non valable à Noël, Nouvel An et Pâques). Réduction jusqu'à 25% de mai à septembre. Réduction pour les groupes de plus de 6 personnes. Contactez-nous pour un devis personnalisé.
- EN: [PRICE]€ / person. Valid from October to April (not valid at Christmas, New Year or Easter). Up to 25% reduction from May to September. Discounts for groups of more than 6 people. Contact us for a personalised quote.
- DE: [PRICE]€ / Person. Gültig von Oktober bis April (nicht gültig an Weihnachten, Neujahr oder Ostern). Bis zu 25% Ermäßigung von Mai bis September. Ermäßigungen für Gruppen mit mehr als 6 Personen. Kontaktieren Sie uns für ein individuelles Angebot.
- ES: [PRICE]€ / persona. Válido de octubre a abril (no válido en Navidad, Año Nuevo ni Semana Santa). Hasta un 25% de descuento de mayo a septiembre. Descuentos para grupos de más de 6 personas. Contáctenos para un presupuesto personalizado.
- IT: [PRICE]€ / persona. Valido da ottobre ad aprile (non valido a Natale, Capodanno o Pasqua). Fino al 25% di riduzione da maggio a settembre. Sconti per gruppi di più di 6 persone. Contattateci per un preventivo personalizzato.
- Card badge: `<div class="tour-price">[PRICE]€ <span>/ [personne|person|Person|persona|persona]</span></div>` — verify actual card markup in `packages.html` before inserting, match existing card structure.

## Task 5 — contact form
- 5a: field label -> "Tour" in all 5 languages (currently "Forfait Préféré" per audit-report.md — audit also flagged only 6/12 tours listed in dropdown, out of date)
- 5b: dropdown options = exact h1 of each of the 15 tour pages, in Task 4 order
- 5c: WhatsApp pre-filled message per language (check if already implemented; audit-report.md doesn't flag this as broken, may already exist)

## Task 6 — sitemap/nav/schema/hreflang
- 6a: add 15 new sitemap.xml entries (3 tours x 5 langs), priority 0.9
- 6b: nav dropdown — check if one exists (audit doesn't mention a tours dropdown in nav; may not exist, verify)
- 6c: packages.html JSON-LD ItemList — update to 15 tours, correct order, all 5 languages
- 6d: hreflang on the 15 new files, matching exact pattern from an existing tour page

## User decision — guide language phrasing
Spec text says "private French-speaking guide" (EN) / "guide francophone" etc everywhere. A PRIOR session deliberately changed this site-wide to "private multilingual guide (French, English, Spanish, Italian, German)" (git commit 292fc87). User confirmed: KEEP "multilingual guide" phrasing (and equivalent DE/ES/IT multilingual phrasing already on the site) — do NOT revert to "French-speaking guide" when applying spec content. Apply everything else from the spec verbatim; only this specific phrase is an intentional exception.

## Known pre-existing site issues (from audit-report.md) relevant to this task
- packages.html has a "no prices displayed" notice in FR ("Pas de prix affichés...") — contradicts Task 3. Must update/remove this notice when adding prices, in all 5 languages, or it will contradict the new price badges.
- Contact form dropdown currently only has 6 of 12 tours (stale) — Task 5b fixes this as part of the full rebuild to 15.
- TouristTrip schema has no `offers`/price field on any of the 60 existing pages — out of scope unless Task 3/6c implies it; spec doesn't explicitly ask for schema price offers (rule 3 says never restructure schema, only visible content), so do NOT add schema `offers` blocks — only visible-page price text/badges.
