# Project Gemini: Personal Website

## 🎯 Project Goal
To build a high-performance, professional personal website that serves as a dynamic portfolio for recruiters. The design philosophy is "**Simple yet Advanced**"—visual minimalism powered by complex, fluid interactivity.

## 🛠 Tech Stack

### Core
- **Framework:** SvelteKit (Svelte 5 Runes)
- **Build Tool:** Vite
- **Language:** TypeScript

### Styling & UI
- **Tailwind CSS v4:** Utility-first CSS framework.
- **Skeleton (v3/Next):** Core design system and theme management (`wintry` theme).
- **shadcn-svelte:** For robust, accessible interactive components (Dialogs, Cards).
- **Flowbite-Svelte:** For specialized UI elements.
- **SMUI:** Material Design accents where appropriate.

### Icons
- **Iconify:** General purpose icons.
- **Lucide Svelte:** Consistent, clean UI icons.
- **Hugeicons:** High-quality stroke icons for primary navigation.

---

## 🏗 Architecture

### 1. Single Source of Truth (`src/lib/data.ts`)
All content—experience, projects, resume details—will be stored in a strictly typed JSON structure. This decouples content from presentation, making the site easy to update without touching HTML.

### 2. Global State & App Shell
- **App Shell:** Managed by Skeleton's AppShell component.
- **Theme:** Dark/Light mode toggle persisted in local storage.
- **Navigation:** A hybrid approach using a top bar for core nav and a "Floating Dock" for quick actions/socials.

---

## ✨ Key Features & Implementation Plan

### 1. Hero Section (Home)
*   **Concept:** "The Hook." High-impact typography and a brief personal statement.
*   **Tech:** Large responsive text, potentially a subtle background animation (particles or gradient mesh) using Svelte canvas or CSS-only effects.

### 2. The Timeline (Experience Page)
*   **Concept:** A vertical history of professional roles.
*   **Advanced Features:**
    *   **Intersection Observer:** Elements fade/slide in as user scrolls.
    *   **Skill Highlighting:** Hovering "React" in one card highlights "React" in *all* other cards to show experience longevity.
    *   **Deep Linking:** Cards have unique IDs (`#exp-google-2023`) to allow direct linking from the Resume page.

### 3. The Bento Grid (Projects Page)
*   **Concept:** A gallery layout inspired by bento boxes (mixed aspect ratios).
*   **Advanced Features:**
    *   **Interactive Cards:** `1x1` and `2x2` grid cells.
    *   **Live Preview:** Hovering a project card triggers a video preview or 3D tilt effect.
    *   **Filtering:** Filter by tech stack (e.g., "Show only Svelte projects").

### 4. Interactive Resume
*   **Concept:** A web-native recreation of the PDF resume.
*   **Advanced Features:**
    *   **Deep Linking:** Clicking a job title on the resume performs a **View Transition** to the Experience Timeline, scrolling automatically to the detailed entry.
    *   **Print Styles:** Custom CSS `@media print` rules so the web page prints perfectly as a physical PDF.

### 5. Command Center / Floating Dock
*   **Concept:** Persistent access to high-value links (GitHub, LinkedIn, Resume Download).
*   **Tech:** A floating container fixed to the bottom/side with "magnetic" hover effects on icons.

---

## 📝 Development Roadmap

1.  **Data Layer:** Create `src/lib/data.ts` and define TypeScript interfaces.
2.  **Layout:** Configure the Skeleton App Shell and Navigation.
3.  **Hero:** Build the landing page.
4.  **Experience:** Implement the Timeline with animation logic.
5.  **Projects:** Build the Bento Grid component.
6.  **Resume:** Create the Resume view and implement the cross-linking logic.
7.  **Polish:** Add View Transitions, SEO meta tags, and A11y checks.
