---
name: Architectural Blueprint design system
description: Cream draft paper light + Prussian blueprint dark, 24px grid bg, Recursive Mono font, wireframe cards, ruler progress, title-block header, FAQ as §-numbered technical notes
type: design
---
Active design system: **Architectural Blueprint** (replaced Cypherpunk Atelier).

## Tokens (src/index.css)
- Light: paper `#F5F1E8` cream, ink `#3A2E1F` sepia, signal `#F7931A`
- Dark: paper `#0E2A47` Prussian blue, ink `#F4F4F0` cyan-tinted white, signal `#FFB347`
- Body has fixed 24px×24px grid bg (minor) + 120px (major) via 4-layer linear-gradient
- Font: **Recursive** variable font (CSS `font-variation-settings: 'MONO' 1` for mono mode), Noto Serif SC for FAQ

## Primitives
- `.bp-frame` + `.bp-corner-bl/br` — outlined block with `+` crosshair corners
- `.bp-module-label` — top-left module annotation
- `.bp-terminal` — `◉` connector terminals at arrow line ends
- `.bp-title-block` — Header title block (SHEET 01/01 · SCALE 1:1 · REV. A)
- `.bp-ruler` — progress bar replacement (ticks, ▼ cursor, ◉ OPTIMAL flag at 120/130/150)

## Components transformed
- Header: `bp-header` class; legacy progress-bar hidden, ruler shown instead
- `.column` (3-column layout): bordered + crosshairs + module label
- `.option-item.selected`: inverted block (ink bg, paper text) with orange `+` corners
- `.signer-slot`: dashed/solid wireframe, no rounded corners
- `.transfer-tag`: outline-only with method-specific colors (qr=blue, sd=green, usb=orange, bt=darkblue, nfc=purple)
- `.feature-box .feature-item`: `[+]/[-]/[!]` prefix instead of emoji
- FAQ: `§01/§02` numbered headings via CSS counter, serif body
- Mobile: same wireframe treatment, drawer handles say `─── DRAWER ───`

## How to apply
- Use `hsl(var(--ink))`, `hsl(var(--signal))`, `hsl(var(--background))` — never hardcode
- New cards: add `border: 1px solid hsl(var(--border))` + `border-radius: 0`
- New labels: `font-family: 'Recursive', monospace; font-variation-settings: 'MONO' 1; text-transform: uppercase; letter-spacing: 0.1em+`
- All English drafting annotations (MODULE / SHEET / SCALE / DRAWER / OPTIMAL) stay English even in zh locales — strengthens "engineering blueprint" feel
