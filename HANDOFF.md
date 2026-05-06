# Handoff Report — Rainnier Singson Portfolio

> Internal handoff document for developers and collaborators picking up this codebase.

---

## 1. Design Tokens

This project uses hardcoded CSS values (no custom property layer yet). The following table documents all recurring values as if they were design tokens — ready to be converted to CSS variables in a future refactor.

### Color

| Token Name | Value | Usage |
|---|---|---|
| `--color-bg-base` | `#0b0b0f` | Page background |
| `--color-bg-section` | `#111115` | Alternate dark sections (`.bg-dark`) |
| `--color-bg-card` | `#18181b` | Cards, video containers, profile image |
| `--color-bg-card-hover` | `#27272a` | Tab hover, nav border, dividers |
| `--color-text-primary` | `#ffffff` | Headings, nav logo, active links |
| `--color-text-secondary` | `#d1d5db` | About body text, hover states |
| `--color-text-muted` | `#b0b0b8` | Hero subtitle, hero tags |
| `--color-text-dim` | `#9ca3af` | Nav links (inactive), tab labels |
| `--color-text-faint` | `#6b7280` | Project descriptions, category labels, footer |
| `--color-accent-light` | `#e5e7eb` | First paragraph in about text |
| `--color-border` | `#27272a` | Nav bottom border (scrolled), social divider |
| `--color-border-faint` | `#18181b` | Footer top border |
| `--color-overlay-modal` | `rgba(0,0,0,0.95)` | Video modal backdrop |
| `--color-overlay-hero` | `rgba(0,0,0,0.7)` | Hero gradient overlay endpoint |
| `--color-nav-bg` | `rgba(0,0,0,0.75)` | Sticky nav background (scrolled) |

### Typography

| Token Name | Value | Usage |
|---|---|---|
| `--font-family-base` | `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif` | Body font stack |
| `--font-weight-black` | `900` | All headings, nav links, tab buttons |
| `--line-height-base` | `1.3` | Body default |
| `--line-height-prose` | `1.75` | About section paragraphs |
| `--font-size-h1` | `clamp(4rem, 12vw, 9rem)` | Hero name |
| `--font-size-h2` | `clamp(3rem, 8vw, 8rem)` | Section headings |
| `--font-size-hero-subtitle` | `clamp(1.25rem, 3vw, 2rem)` | Hero tagline |
| `--font-size-email` | `clamp(1.5rem, 4vw, 2.5rem)` | Contact email link |
| `--font-size-nav` | `0.9rem` | Nav link labels |
| `--font-size-tab` | `1rem` | Tab button labels |
| `--font-size-project-title` | `1.5rem` | Project card title |
| `--font-size-project-category` | `0.75rem` | Project category label |
| `--font-size-footer` | `0.875rem` | Footer copyright |
| `--letter-spacing-wide` | `0.08em` | Nav logo, nav links |
| `--letter-spacing-tight` | `-0.02em` | h1, h2 headings |
| `--letter-spacing-label` | `0.05em` | Tab buttons, category labels |

### Spacing

| Token Name | Value | Usage |
|---|---|---|
| `--spacing-section` | `6rem 1.5rem` | Default section padding |
| `--spacing-section-mobile` | `4rem 1rem` | Section padding on mobile |
| `--spacing-container-max` | `1280px` | Max content width |
| `--spacing-container-pad` | `0 1.5rem` | Container horizontal padding |
| `--spacing-nav-pad` | `1.25rem 2rem` | Nav inner padding |
| `--spacing-grid-gap` | `2rem` | Projects grid gap |
| `--spacing-about-gap` | `4rem` | About grid gap |
| `--spacing-card-radius` | `12px` | Project thumbnail border radius |
| `--spacing-video-radius` | `16px` | Demo reel container border radius |

### Motion

| Token Name | Value | Usage |
|---|---|---|
| `--transition-base` | `0.3s` | Most hover transitions |
| `--transition-nav-highlight` | `0.4s cubic-bezier(0.22, 1, 0.36, 1)` | Nav sliding highlight |
| `--transition-reel-zoom` | `0.6s ease` | Reel preview video scale on hover |
| `--transition-hero-fade` | `1s ease-out` | Hero content fade-in animation |
| `--transition-title-reveal` | `0.8s ease` | Title span reveal animation |
| `--scroll-lock-duration` | `700ms` | Click-scroll lock timeout in JS |

---

## 2. Accessibility Statement

**Lighthouse Accessibility Score: 92 / 100**

![Lighthouse Accessibility Score — 92](./lighthouse-accessibility.png)

> *Screenshot taken via Chrome DevTools Lighthouse audit.*

### Known Flagged Issues

| Severity | Issue | Notes |
|---|---|---|
| ⚠️ Warning | Background and foreground colors do not have sufficient contrast ratio | Affects muted text (`#6b7280`, `#9ca3af`) on dark backgrounds. Low-priority copy only. |
| ℹ️ Advisory | `<video>` elements should contain a `<track>` element with `[kind="captions"]` | Applies to `fastpreview.mp4` (hero) and `preview.mp4` (reel). Videos are decorative/atmospheric; captions not applicable, but `aria-hidden` could be added. |
| ℹ️ Advisory | Identical links have the same purpose | Multiple social links share similar visible labels. Could be resolved by adding `aria-label` attributes. |

### Manual Check Items
Lighthouse flagged **10 additional items** requiring manual review (keyboard navigation, focus order, ARIA landmarks, etc.). A full manual audit using the [Google Accessibility Review Guide](https://web.dev/accessibility) is recommended before production launch.

---

## 3. BEM Index

This project uses a loose BEM-inspired naming convention. Below is an index of the major components and their block → element → modifier structure.

---

### `site-nav` — Sticky Navigation

```
.site-nav                    Block
  .site-nav.scrolled         Modifier — applied on scroll (backdrop blur + border)
  .nav-inner                 Element — max-width wrapper + flex row
  .nav-logo                  Element — "RS" logotype link
  .nav-toggle                Element — hamburger button (mobile only)
  .nav-links                 Element — link container
    .nav-links.open          Modifier — visible on mobile when toggled
  .nav-highlight             Element — animated sliding highlight bar
  .nav-link                  Element — individual anchor
    .nav-link.active         Modifier — white highlight + black text
    .nav-link--cta           Modifier — filled white pill style (unused in current nav)
```

---

### `hero` — Full-screen Landing

```
.hero                        Block
  .hero-bg-video             Element — absolute-positioned video wrapper
  .hero-content              Element — z-indexed text group
    .title-reveal            Element — animated h1 wrapper
      span (nth-child)       Staggered reveal via animation-delay
  .hero-subtitle             Element — tagline paragraph
  .hero-tags                 Element — role label row (Filmmaker • Director • VFX)
```

---

### `video-container` / `reel-preview` — Demo Reel

```
.video-container             Block — 16:9 aspect-ratio wrapper
  .reel-preview              Modifier — adds video zoom + overlay hover behavior
    video                    Native element — looping preview
    .project-overlay         Element — centered play button layer
      .play-button           Element — circular border ring
        .play-icon           Element — CSS triangle (▶)
.video-modal                 Block — fixed fullscreen overlay
  iframe#youtubePlayer       Element — YouTube embed
  .close-btn                 Element — × dismiss button
```

---

### `tabs` — Work Filter Bar

```
.tabs                        Block — flex row of filter buttons
  .tab-button                Element — individual filter
    .tab-button.active       Modifier — white bg, black text
```

---

### `projects-grid` — Work Cards

```
.projects-grid               Block — CSS grid container
  .project-card              Element — anchor wrapping entire card
    .project-thumbnail       Element — 16:9 image wrapper
      img                    Native — project thumbnail
      .project-placeholder   Element — fallback initial letter (no image)
      .project-overlay       Element — play button overlay on hover
    .project-category        Element — uppercase label (e.g. "Music Video")
    .project-title           Element — project name h3
    .project-description     Element — role / credit line
.empty-state                 Sibling block — shown when Films tab is empty
  .empty-state.hidden        Modifier — display:none via !important
```

---

### `about-grid` — About Section

```
.about-grid                  Block — two-column grid (image + text)
  .profile-image             Element — square image wrapper (padding-bottom: 100%)
    img                      Native — profile photo
  .about-text                Element — flex column of paragraphs
    p:first-child            Larger lead paragraph (1.5rem)
    p                        Standard body copy (1.125rem)
```

---

### `contact-content` — Contact Section

```
.contact-content             Block — flex column
  .email-link                Element — large mailto anchor with icon
    svg                      Inline mail icon
  .social-divider            Element — top-bordered follow section
    .social-label            Element — "Follow" uppercase label
    .social-links            Element — flex row/column of platform links
      .social-link           Element — icon + handle anchor
        svg                  Inline platform icon
```

---

*Last updated: 2026 — Rainnier Singson Portfolio v1.0*
