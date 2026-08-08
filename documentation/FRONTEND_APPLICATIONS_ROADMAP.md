# Developer Applications Suite & Technical Roadmap

> **Document Scope**: Complete architectural specifications, data requirements, and planned feature specs for the zero-backend, 100% client-side developer utilities within the `PersonalWeb` portfolio codebase (`src/routes/applications/`).

---

## 🏗 Architectural Guidelines

1. **Client-Side Autonomy**: All data conversions, byte-level bitmasking, EBCDIC translations, and schema validations execute 100% in the user's browser using TypeScript and Web APIs.
2. **Zero Dependency Overhead**: Avoid heavy external backend services or server state. Keep utilities lightweight and fast.
3. **Consistent Design System**: Retain Skeleton UI design system, Tailwind CSS v4 styling, glassmorphism aesthetics, dark mode persistence, and Svelte 5 runes (`$state`, `$derived`).
4. **Test-Driven Development (TDD)**: Every byte transformer, unpacker, and protocol calculator must maintain unit test coverage in Vitest (`npm test`).

---

## 🟢 Live Applications (Deployed)

### 1. IBM Character Set TLV Parser (`/applications/tlv-parser`)
* **Status**: **Live App**
* **Route**: [`src/routes/applications/tlv-parser/+page.svelte`](file:///Users/joel/Documents/Github/PersonalWeb/frontend/src/routes/applications/tlv-parser/+page.svelte)
* **Core Capabilities**:
  * BER-TLV byte stream parsing with recursive nested tag decoding.
  * Specialized IBM Code Page selection (`IBM037`, `IBM500`, `IBM1047`, `IBM273`, `IBM278`, `IBM280`, `IBM284`, `IBM285`, `IBM297`).
  * Bidirectional Hex <-> Raw Literal text translation.
  * Real-time search filter and tag dictionary lookup (EMV ISO/IEC 7816-4 specs).

---

## 💡 Planned Future Application Ideas (Roadmap Specs)

The following concepts represent prospective pure-frontend developer utilities designed for future implementation:

### 1. ISO 8583 Financial Message Parser
* **Concept Scope**: Financial transaction payload analyzer for payment networks (Visa/Mastercard/Amex).
* **Technical Specifications**:
  * **MTI Parsing**: Deconstruct 4-digit Message Type Indicators (e.g. `0100` Auth Request, `0110` Auth Response, `0420` Reversal Advice).
  * **Bitmap Unpacking**: Decode 64-bit Primary and Secondary bitmaps to determine present Data Elements (DE 1 through DE 128).
  * **Variable Length Unpackers**: Support for Fixed, LLVAR (2-digit length prefix), and LLLVAR (3-digit length prefix) field formats.
  * **Field Mapping**: Human-readable label breakdown for Processing Code (DE3), Transaction Amount (DE4), Systems Trace Audit Number (DE11), Card Acceptor Data (DE43), and Private Data (DE48).

### 2. Mainframe Packed Decimal (COMP-3) Converter
* **Concept Scope**: Binary & byte-level converter for COBOL COMP-3 packed numeric representations.
* **Technical Specifications**:
  * **Hex Nibble Extraction**: Split byte sequences into high and low 4-bit nibbles.
  * **Numeric Reconstruction**: Convert decimal digits and validate sign nibble (`C` for positive, `D` for negative, `F` for unsigned).
  * **Decimal Point Positioning**: Configurable implied decimal point placement for financial currency amounts.

### 3. EMV Cryptogram & Certificate Inspector
* **Concept Scope**: Smart card security auditor for Chip & PIN (EMV) transactions.
* **Technical Specifications**:
  * **Cryptogram Verification**: Decode Application Cryptogram (ARQC / AAC / TC) input fields.
  * **Issuer Application Data (IAD)**: Parse CVR (Card Verification Results) and DAC/CCN fields.
  * **RSA Key Hierarchy**: Visual breakdown of Scheme CA Public Key, Issuer Public Key, and ICC Public Key certificate chains.

### 4. JWT & OAuth Token Security Suite
* **Concept Scope**: Web token inspector and cryptographic signature tester.
* **Technical Specifications**:
  * **Header & Payload Decoder**: Formatted JSON view of JOSE headers (`alg`, `typ`, `kid`) and standard claims (`iss`, `sub`, `aud`, `exp`, `nbf`, `iat`).
  * **Expiry Audit**: Real-time relative expiration timer and timestamp converter.
  * **HMAC Signature Check**: Client-side signature verification using Web Crypto API (`HMAC-SHA256`).

### 5. Banking API Payload Inspector & Transformer
* **Concept Scope**: Data transformation utility for financial web APIs.
* **Technical Specifications**:
  * **ISO 20022 XML Validator**: Parse `pacs.008` (Credit Transfer) and `camt.053` (Bank Statement) XML payloads.
  * **JSON <-> XML Converter**: Zero-dependency structural transformer for payment payloads.
  * **Field Anonymizer**: Automatic masking of sensitive fields (PAN, CVV, Cardholder Name) for test data sanitization.

---

## 📝 Maintenance & Contribution Workflow

1. When starting work on a new utility from this roadmap, create its corresponding route directory under `src/routes/applications/<app-id>/`.
2. Implement utility functions in `src/lib/<app-id>/` and write Vitest unit tests before rendering the UI.
3. Update `src/routes/applications/+page.svelte` to register the new app card with `isLive: true` and `status: 'Live App'`.
