# Landing page redesign — "A family day, brought together" (Oct 2026)

Supersedes the palette/typography in `../MASTER.md` (black + gold, Inter, glass), which never matched the shipped site.

## Audit of the previous page (rendered at 390 / 1440, EN + AR)

Observed:
1. Most of the page (features, how-it-works, final CTA) rendered as large blank areas in a full-page capture: every section started at `opacity: 0` and only appeared through scroll-triggered framer-motion. Any missed trigger leaves content invisible.
2. Every section was the same rounded card on a blue-white wash (`#f0f4ff`), with identical icon + title + text cards for features and steps. Nothing distinguished planning from chat from memories.
3. Screenshots were small and partly cropped (feature cards showed a phone bleeding out of the card corner), so the real app was hard to read.
4. The 5200×5200 `logo.png` (2.26 MB) was loaded raw by the navbar on every page; `favicon.ico` was the same 2.26 MB file.
5. `/og-image.png` and `/apple-touch-icon.png` were referenced in metadata but missing (broken social previews/icons). The Twitter description read "plan founders".

Hypothesis (not measured): the cool blue-on-blue palette and generic SaaS layout undersold the "family" story for an Arabic-first audience.

## Reference ledger

All 13 reference sites were **blocked by this environment's network egress policy** (`EGRESS_BLOCKED`). Web search returned nothing specific for most of them. Only Google Fonts and the npm registry were reachable. No reference was visually inspected, and nothing was copied.

| Resource | Entry URL tried | Access | Principle used | Nawah application | Asset / licence |
|---|---|---|---|---|---|
| ObsidianUI | obsidianui.dev/docs/split-showcase, /r/split-showcase.json | Unavailable (blocked) | Split showcase: copy beside one dominant product image (from the brief's description only) | Hero and feature rows: text column + one large real screen | Registry not run; source unseen |
| Bencho | bencho.dev | Unavailable | Small tactile checklist (brief's description) | `TasksShowcase` checklist demo, original code | None used |
| GetLayers | getlayers.ai/docs | Unavailable | Coherent system over a collage of effects | Single token set, 3 radii, one board motif | None used |
| Landdding | landdding.com | Unavailable | — | Hierarchy based on the brief: CTA above the fold, repeated at the end | None used |
| Motionin "Assembly" | motionin.design/gallery/assembly | Unavailable | Separate items gathering into one composition (brief's description) | Story board: 5 tools gather around the logo, once, on scroll | None used |
| Pageflows | pageflows.com | Unavailable | — | Steps follow Nawah's verified flow: create → invite (link/QR) → organise | None used |
| CollectUI | collectui.com | Unavailable | — | Segmented control and selected states designed in-house | None used |
| Reelfolio Rise/Rolodex | reelfolio.io | Unavailable | Deliberate staging of screenshots (brief's description) | Short cross-fade when switching between Tasks and Shopping list screens; no video | None used |
| Inspora Scenic Footer | inspora.design | Unavailable | A considered ending (brief's description) | Final download board in the app icon's own gradient, with pinned screens | None used |
| Backgrounds.supply | backgrounds.supply | Unavailable | One quiet texture | Original CSS dot grid ("noticeboard") on boards only | None needed |
| Fontshare | fontshare.com, api.fontshare.com | Unavailable | Latin faces (Satoshi, General Sans…) have no Arabic glyphs | Google Fonts instead: **Bricolage Grotesque** (EN headings), **Inter** (EN body), **Readex Pro** (Arabic + Latin) | OFL via Google Fonts |
| Hugeicons | hugeicons.com (blocked); npm registry (reachable) | npm package + README via search | One consistent rounded-stroke family | `@hugeicons/react` + `@hugeicons/core-free-icons` for the landing page, nav and toggles | MIT (free set) |
| remove.bg | remove.bg | Unavailable / not needed | — | Screens are full-bleed rectangles, so no cut-outs needed | — |

Primary guides: split showcase (hero + rows), assembly (story board), tactile checklist (tasks demo), considered ending (download board).

## Directions considered

- **A. Family noticeboard (chosen).** Warm paper canvas, real screens pinned onto dotted boards, small labelled example notes, brand blue + lavender from the icon, plus one warm sand. Warm, readable, works in RTL. Originality comes from composition, not effects.
- **B. Blue album.** Deep navy/blue full-bleed sections. Closer to the old dark CTA, but colder and heavier on mobile, and it fights the blue app screenshots.

## System

- **Colour:** paper `#F7F4EE`, paper-2 `#EFEAE1`, surface `#FFFDF9`, ink `#13152A` (brand navy), muted `#4F566B`, brand `#2789D3` (fills), brand-ink/button `#1A67A8` (text and buttons, ≥ 4.5:1). Supporting: lavender `#DFBCF4` (from the icon), sand `#F0DEC4`. Dark-mode equivalents are in `src/app/globals.css`.
- **Type:** EN display Bricolage Grotesque 700 at 1.02 line-height with negative tracking. AR uses Readex Pro throughout, line-height 1.32 for display and 1.95 for body, with tracking always 0.
- **Radii:** 0.75rem (controls) · 1.25rem (cards/notes) · 2rem (boards) · 2.5rem (device frame).
- **Screens:** real 1170×2532 screenshots in a slim 6px navy frame, never cropped except the deliberate bottom crop in the AI card and final board.
- **Motion:** 160–320ms feedback (checkbox pop, progress bar, screen cross-fade, button press). There is one 700ms "gather" on the story board. All of it is removed under `prefers-reduced-motion`. No content starts hidden.

## Copy changes (flag for review)

Hero, problem, feature names/descriptions, steps and CTA copy are unchanged. Added:
- Feature headlines plus two detail lines each. Every detail was checked against a real screenshot: Hijri + Gregorian calendar, events/appointments tabs, per-member task filters, shopping list progress (1/3), chat poll ("وش تبون عشاء") and voice message, vault folders (سفريات, وصفات طبخ) and counters (photos/videos, PDFs, notes), AI answering "ما المهام المعلقة؟", and the "رتّب أسبوعنا" suggestion.
- Example fragments and the interactive demo use invented sample data (e.g. "Friday lunch at grandma's", Sara/Khalid/Noura). They are always labelled "Example" / "مثال توضيحي".
- "Free to download on iOS and Android" appears under the hero buttons. It reuses the existing CTA claim.
- Fixed the Twitter description typo ("plan founders" → "plan events").

## Checks (5 Oct 2026, local dev + production build)

- Renders at 320 / 390 / 768 / 1440 in EN and AR, light and dark. There is no horizontal overflow at any width and no clipped Arabic.
- Keyboard: logical tab order, visible focus on every control. The screen switcher (`aria-pressed`) and checklist (native checkboxes, `role=status` live text) work by keyboard and touch. The mobile menu closes on link tap and Escape.
- Reduced motion: transitions are 0s and the story board renders already gathered.
- Links: App Store, Google Play, /privacy, /terms, /support, /about, the anchors, and EN/AR switching (`lang`/`dir` update) all return 200.
- Contrast (WCAG): body/muted text 6.1–7.2:1, brand text 5.0–5.4:1, button text 5.9:1, download board 4.97:1 (≈4.2:1 only at the corner glint behind the logo).
- `tsc` is clean and `next build` succeeds. ESLint reports 9 issues, all pre-existing (same lines before the redesign).
- Not done: Lighthouse/field performance and screen-reader runs with VoiceOver/TalkBack.

![EN desktop](before-after-en-desktop.png)
![AR mobile](before-after-ar-mobile.png)
