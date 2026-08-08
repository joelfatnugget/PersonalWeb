# Frontend Applications Roadmap & Technical Specification

> **Project Scope**: A suite of 100% client-side, zero-backend interactive web applications built directly inside `src/routes/applications/` within the `PersonalWeb` repository.

---

## 🏗 Architecture Principles

1. **100% Client-Side Execution**: All processing, parsing, vector math, and chart rendering happen in the browser using Web APIs, Web Workers, and TypeScript.
2. **Zero External Backend Overhead**: No server dependencies, external API keys, or databases required.
3. **Shared Design System**: Uses existing Tailwind CSS v4 tokens, Lucide/Iconify icons, Skeleton theme variables, and shared layout shell (`Navbar`, `Dock`, `CommandPalette`).
4. **Test-Driven Development (TDD)**: Every data transformer, parser, and math calculation utility must have corresponding unit test cases in Vitest (`npm test`).

---

## 🚀 Planned Pure Frontend Applications

### 1. ISO8583 Payment Message Parser & Visualizer
* **Route**: `src/routes/applications/iso8583-parser/+page.svelte`
* **Purpose**: Demonstrates payments domain expertise (Visa experience) by parsing raw ISO8583 credit card transaction payloads into human-readable data fields.
* **Key Features**:
  * **Interactive Input**: Paste raw Hex/ASCII payload or pick from pre-configured test scenarios (Authorization Request, Reversal, Financial Advice).
  * **Bitmap Bitmask Decoder**: Automatically decodes Primary and Secondary Bitmaps to reveal active Data Elements.
  * **Data Element Tree View**: Interactive tree breakdown of Message Type Indicator (MTI), Processing Code (DE3), Transaction Amount (DE4), Systems Trace Audit Number (DE11), Card Acceptor Data (DE43), and Additional Private Data (DE48).
  * **Field Search & Filter**: Filter data elements by field number or tag name.

### 2. Transaction Log Anomaly Visualizer
* **Route**: `src/routes/applications/transaction-visualizer/+page.svelte`
* **Purpose**: Recreates transaction log analytics experience with client-side visualization tools for anomaly detection.
* **Key Features**:
  * **Drag-and-Drop Parser**: Accepts CSV/JSON transaction log uploads (or generates realistic synthetic log streams in browser).
  * **Latency & Fraud Heatmap**: Renders latency distribution histograms, response code ratios (00 Approve, 51 Insufficient Funds, 91 Issuer Unavailable), and fraud anomaly flags.
  * **Web Worker Engine**: Runs log parsing off the main thread to prevent UI freezing during large file uploads.

### 3. Client-Side RAG & Vector Embedding Simulator
* **Route**: `src/routes/applications/rag-sandbox/+page.svelte`
* **Purpose**: Interactive demonstration of Retrieval-Augmented Generation (RAG) fundamentals built using browser-native TF-IDF and vector math.
* **Key Features**:
  * **Interactive Document Chunking**: Split technical documents into custom token chunk sizes with configurable overlap.
  * **Cosine Similarity Matcher**: Type a query and see real-time vector similarity rankings across document chunks with highlighted keyword matches.
  * **Visual Pipeline Steps**: Step-by-step visual progress: `Raw Document -> Chunking -> Vector Embedding -> Similarity Rank -> Context Payload`.

### 4. Interactive UI & Motion Component Lab
* **Route**: `src/routes/applications/component-lab/+page.svelte`
* **Purpose**: Showcase high-craft UI motion design and micro-interactions (inspired by Rauno Freiberg and Emil Kowalski).
* **Key Features**:
  * **Magnetic Dock Simulator**: Interactive configurable dock with spring physics controls.
  * **3D Card Perspective Tilt**: Live sliders for max tilt angle, scale factor, and ambient highlight opacity.
  * **Command Palette Playground**: Customizable hotkey trigger sandbox.

---

## 🛠 Implementation Plan & Next Steps

1. **Step 1: Application Hub Index (`src/routes/applications/+page.svelte`)**
   * Update the applications landing page to feature interactive cards linking to each client-side tool with badge tags (*FinTech*, *GenAI*, *Visualizer*).

2. **Step 2: Utility Parsers & TDD Unit Tests (`src/lib/utils/`)**
   * Write unit tests for ISO8583 bitmask parsing, TF-IDF cosine similarity, and CSV transaction log parsing in Vitest.
   * Verify test suite turns 100% green before wiring to Svelte 5 components.

3. **Step 3: Component Views & Interactivity**
   * Build responsive, glassmorphic UI views with Svelte 5 runes (`$state`, `$derived`).

4. **Step 4: Verification & Build**
   * Execute `npx svelte-check --threshold error` and `npm run build` to ensure 0 type errors and clean production compilation.
