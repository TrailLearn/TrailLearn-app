# Story 6.0: Sharing & Export (PDF + Vision)

Status: done

## Story

As a student,
I want to understand the TrailLearn vision and export my validated DVP as a PDF,
so that I can share a certified proof of my project's viability.

## Acceptance Criteria

1.  **Landing Page Vision (Story 6.1)**:
    *   The Landing Page must clearly explain "Lucidité vs Sélection".
    *   Highlight the "White Box" concept (transparency).
    *   Ensure the CTA leads to the DVP Wizard.
2.  **PDF Export (Story 6.2)**:
    *   Add a "Télécharger PDF" button in the Cockpit (only if validated).
    *   Generate a clean, printable document containing:
        *   Student Info & Project (City, Type).
        *   Viability Gauge & Status.
        *   Detailed Findings (White-box).
        *   Pillar Summary.
3.  **Proof of Truth (Story 6.3)**:
    *   The export must display the "Generated on [Date]" timestamp.
    *   Display the Rules Version ID (Standard of Truth).
    *   Include a "TrailLearn Certified" footer.

## Tasks / Subtasks

- [x] Landing Page Refinement (AC: 1)
  - [x] Review `src/features/landing/components/vision-section.tsx`.
  - [x] Ensure "White Box" and "Responsibility" concepts are present. (Already implemented in previous work)
- [x] PDF Generation (AC: 2, 3)
  - [x] Create a print-optimized page `/dvp/print/[id]`.
  - [x] Style it to look like a formal certificate (A4 format support via CSS).
  - [x] Include Header (Logo), Body (Gauge, Findings, Pillars), Footer (Version, Date, Certification).
  - [x] Add "Télécharger / Imprimer" button in `CockpitPage`.
  - [x] **Tech Choice**: Use CSS `@media print` + `window.print()` for V1 robust implementation.

## Dev Notes

- **PDF Strategy**: Client-side printing is the most reliable V1.
- **Security**: The print page should be protected (user own data only).

### References

- [Source: Epic 6]

## Dev Agent Record

### Agent Model Used
Amelia (Dev Agent)

### File List
- `src/app/dvp/print/[id]/page.tsx` (Created)
- `src/features/dvp/components/dvp-print-view.tsx` (Created)
- `src/server/api/routers/dvp.ts` (Modified: Added getById)
- `src/app/dvp/cockpit/page.tsx` (Modified: Added Export Button)

### Completion Notes
- Implemented a dedicated print view optimized for A4 paper.
- Secured the print route via ID/User checks.
- Added certification footer and metadata for "Proof of Truth".
