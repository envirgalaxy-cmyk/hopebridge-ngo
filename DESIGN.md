# Design Brief: NGO / Non-Profit Website

## Tone & Purpose
Warm, emotionally engaging, compassionate. Storytelling-focused with human-centered imagery. Trust and authenticity balanced with inspiring impact messaging.

## Visual Direction
Premium editorial aesthetic inspired by global NGO leaders. Warm white base with sage green (trust, growth), sky blue (hope, clarity), rust accents (authenticity). Organic warmth over tech sterility.

## Typography
| Layer | Font | Use |
|-------|------|-----|
| Display | Lora (serif) | Headlines, emotional storytelling |
| Body | Inter (sans-serif) | All body copy, navigation, forms |
| Mono | Geist Mono | Impact stats, data, testimonials |

## Color Palette
| Token | OKLCH | Light | Dark | Purpose |
|-------|-------|-------|------|---------|
| Primary | 0.55 0.08 138 | Sage green | Warmer sage | Growth, trust, CTAs |
| Secondary | 0.68 0.12 257 | Sky blue | Warm blue | Hope, clarity, highlights |
| Accent | 0.6 0.18 42 | Rust/terracotta | Warmer rust | Authenticity, energy |
| Background | 0.98 0 0 | Warm white | Dark charcoal | Main surface |
| Muted | 0.95 0.02 60 | Warm ivory | Subtle dark | Zones, section backgrounds |
| Foreground | 0.18 0 0 | Dark charcoal | Off-white | Text, contrast |

## Structural Zones
| Zone | Treatment | Purpose |
|------|-----------|---------|
| Header | Warm white with subtle sage border, clean nav | Navigation, brand visibility |
| Hero | Muted warm background tint + large display type | Emotional entry, impact statement |
| Content sections | Alternating `bg-zone` / `bg-zone-alt` with generous margin | Breathing room, visual rhythm |
| Cards | `bg-card` + `shadow-card` + subtle sage border | Cause spotlights, testimonials |
| CTA buttons | Primary sage, secondary sky blue, accent rust | Action hierarchy, trust signaling |
| Footer | Warm ivory background, secondary text | Closure, secondary nav |

## Elevation & Depth
Layered backgrounds over flat color. Soft shadows (0.08 alpha) for card depth. Subtle border tints (sage-tinged) for non-dominant hierarchy. Avoid shadows with hard alpha edges.

## Spacing & Rhythm
Mobile-first: 4px grid. Headers: generous top/bottom margin (48px+). Sections: 32px internal padding, 24px gaps. Cards: 16px internal, 12px border-radius. Whitespace prioritized for breathing room.

## Component Patterns
- **Buttons**: Primary (sage bg, white text), Secondary (sky blue outline), Danger (rust). Subtle hover lift + 2px shadow.
- **Cards**: Rounded corners, soft sage border, warm white bg, internal margin 20px. Image + headline + text + link.
- **Testimonials**: Quote mark as design element (accent rust color), author name in mono, soft background tint.
- **Stats**: Large mono font (impact), secondary text in body, background highlight in muted zone.
- **Forms**: Light border, focus: sage ring, accessible contrast, helper text in muted-foreground.

## Motion
Entrance animations: fade-in (0.4s) on content load, slide-up (0.4s) on section reveals. Hover: smooth CTA color shift (0.3s), subtle shadow lift. No bouncy or distracting motion.

## Constraints & Guardrails
- No full-page gradients; use tinted backgrounds in sections.
- No rainbow color mixing; palette limited to warm white, sage, sky blue, rust, ivory, charcoal.
- No system defaults; all tokens override placeholders.
- All text meets AA+ contrast in light and dark modes.
- Responsive priority: mobile first, full UX on sm+ (640px+).

## Signature Detail
Warm-toned zone alternation creates editorial magazine feel. Sage tints in borders and muted areas tie color palette without saturating. Serif display type paired with clean sans-serif body amplifies emotional storytelling.

## Accessibility
High contrast text (0.18 L foreground on 0.98 L background). Clear focus states (sage ring). Large touch targets (44px+). Readable fonts (16px+ body). ARIA labels on interactive elements.
