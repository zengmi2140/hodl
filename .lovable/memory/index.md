# Memory: index.md
Updated: just now

# Project Memory

## Core
- Offline Bitcoin sandbox (signers, wallets, nodes). State-controlled unified page for single/multi-sig.
- Use standard emoji icons (📱, 💻). No icon libraries (like lucide-react).
- Desktop layout frozen: do not modify component lists or arrows unless explicitly asked.
- Lovable tagger enabled in development mode only.
- Active design system: **Terminal Console** — phosphor green/amber on near-black (dark) or deep green on cream (light), CRT scanlines, mono font (Recursive MONO=1), ASCII brackets `[*]`/`[ ]`, blinking cursor `▊`, inverse selection (fg/bg swap), bracketed transfer tags `[USB]`. English terminal labels stay English in zh locales.

## Memories
- [Multisig Logic](mem://features/multisig-mode-overview) — Multisig thresholds, slot colors, compatibility filtering, and progress calculations
- [Desktop Layout](mem://design/multisig-layout-details) — Desktop flexbox centering, fixed columns, layout measurement pattern, unified styles
- [Mobile Layout](mem://design/mobile-layout-strategy) — Mobile vertical cards, bottom sheets, auto-scroll, interactions, and specific mobile components
- [Tech Standards](mem://technical/security-and-robustness) — Security, robust parsing, logging, and asset optimization rules
- [Blueprint Design (legacy)](mem://design/architectural-blueprint) — Previous design system, replaced by Terminal Console
