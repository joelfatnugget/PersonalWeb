# Design System & Craft Guidelines: PersonalWeb

## 1. Design Direction: Modern Precision & High Signal
The interface adheres to visual minimalism powered by fluid, accessible interactivity. It eliminates synthetic AI design tropes (decorative gradient text, arbitrary 5px left-border side tabs, intrusive bounce keyframes, and fake terminal windows) in favor of high-contrast typography, semantic cards, and responsive bento layouts.

## 2. Color Palette & Theming (Tailwind CSS v4)

- **Light Mode:**
  - Background: Crisp neutral white (`bg-white` / `bg-surface-50`)
  - Text Primary: Deep charcoal (`text-surface-900` / `#0f172a`)
  - Text Secondary: Neutral slate (`text-surface-600` / `#475569`)
  - Border: Subtle stroke (`border-surface-200` / `#e2e8f0`)

- **Dark Mode:**
  - Background: Obsidian black & deep slate (`dark:bg-black` / `dark:bg-surface-950` / `dark:bg-surface-900`)
  - Text Primary: Pure white (`dark:text-white`)
  - Text Secondary: Muted cool gray (`dark:text-surface-300` / `#cbd5e1`)
  - Border: Subtle dark stroke (`dark:border-surface-800` / `#1e293b`)

- **Accent Primary:** Electric Blue (`primary-500` #3b82f6, `primary-600` #2563eb)
- **Status Accents:**
  - Emerald (`text-emerald-500` / `bg-emerald-500/10`): Live status, healthy levels, verified metrics
  - Sky (`text-sky-500`): Letters, hex bytes, documentation links
  - Amber (`text-amber-500`): Caution, symbols, warnings

## 3. Typography
- **Headings & Brand:** Clean geometric sans (`font-black`, `font-extrabold`, `tracking-tight`). No gradient clipping.
- **Body & Content:** Highly readable sans-serif with comfortable line height (`leading-relaxed`).
- **Code & Telemetry:** Monospace (`font-mono`, `text-xs` / `text-sm`) for bytes, hex addresses, code pages, and timestamps.

## 4. Layout Architecture
- **Navigation:**
  - Desktop: Fixed blur top bar with quick search trigger and theme switcher.
  - Mobile: Hamburger toggle with full-route slide-down drawer (`Home`, `Experience`, `Projects`, `Blog`, `Applications`, `Resume`).
  - Dock: Compact quick action container aligned for mobile horizontal limits and desktop vertical docking.
- **Projects (Bento Grid):** 3-column responsive layout with 2-column featured spans, modal hash sync, and deep links.
- **Data Tables & Inspectors:** Full 17-column CSS grid (`grid-cols-[repeat(17,minmax(0,1fr))]`) for 256-byte matrices.

## 5. Motion & Accessibility Floor
- **Universal Reduced Motion:** All components, transitions (`in:fly`), and 3D tilts query `prefers-reduced-motion` and collapse to duration 0 or static display.
- **No Layout Thrashing:** Dynamic pointer tilt caches bounding client rects on `mouseenter` rather than re-computing on `mousemove`.
- **Keyboard Trapping & ARIA:** Dialogs and Command Palette feature accessible ARIA roles, focus management, `Escape` key dismissal, and Arrow/Enter traversal.
