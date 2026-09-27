# Product Context: PersonalWeb (Joel Tan Portfolio)

## 1. Product Identity
PersonalWeb is a high-performance portfolio and technical showcase for Joel Tan (Software Engineer, Fullstack & Generative AI). It serves as an interactive credential verification system and engineering hub for hiring teams, recruiters, and engineering leaders.

## 2. Target Users & User Intent

### Primary: Technical Recruiters (15–30s scan)
- **Goal:** Verify location (Singapore), current role (Fullstack Developer @ Visa Inc), core technologies (Python, React, TypeScript, Docker), and download clean PDF resume.
- **Critical Flow:** Accessible top-level navigation, immediate hero credentials panel, and direct PDF download CTA.

### Secondary: Engineering Leaders & Hiring Managers (2–5m deep dive)
- **Goal:** Assess technical depth, architecture rigor, live applications, and technical writing.
- **Critical Flow:** Bento Grid project previews with deep linking, live applications (e.g. IBM Character Set TLV Parser), and technical essays on payment systems (ISO8583, fraud checks).

### Tertiary: Peer Engineers & Collaborators
- **Goal:** Explore open-source contributions, developer utilities, and interactive visualizations.
- **Critical Flow:** GitHub repositories, live interactive byte inspector, and clean source code links.

## 3. Core UX Principles & Ethics

1. **Respect User Autonomy:**
   - URL hash synchronization on modals (`/projects#proj-id`) ensures standard browser back/forward buttons function correctly.
   - Modals and overlays can always be dismissed via `Escape` key, backdrop click, or visible close button.

2. **Design for Real Conditions:**
   - Full responsiveness down to 320px mobile viewports with an accessible mobile navigation drawer.
   - Reduced motion support: `@media (prefers-reduced-motion: reduce)` disables all intrusive transitions, tilt effects, and pulsing animations.
   - Offline resilience: Zero external runtime image textures or un-bundled dependencies.

3. **Make Intent Visible:**
   - Clear visual feedback on interactive states and keyboard navigation in Command Palette.
   - Plain, honest labeling with verified metrics (e.g. Visa GenAI test automation efficiency gains).
   - Strict rejection of deceptive patterns, artificial urgency, and dark patterns.
