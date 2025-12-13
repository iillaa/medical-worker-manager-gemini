# Project Status: GestMed Travail (Offline SPA)

**Goal:** Build a single-file, offline-capable React application for managing medical worker examinations, running locally in a browser without a backend.

**Latest Build:** `/sdcard/medical-worker-manager-app/index.html`

## Core Features & Implementation Details

### 1. Data Persistence (IndexedDB)
- **Library:** `localforage`
- **Stores:** `workers`, `exams`, `departments` (services), `workplaces`, `settings`.
- **Logic:** Fully offline. Data is stored in the browser. Import/Export to JSON is implemented for backup.
- **Updates:**
    - Seed data updated to specific Services (SWAG, BMPJ, SD INGHAR, BPFA, SWASS, AUTRES).
    - Workplaces simplified to generic global options (Cuisine, Foyer, Autres) applicable to all services.

### 2. Security
- **PIN Lock:** Implemented.
    - Default PIN: `0011`.
    - Protects application access on load.
    - Configurable via "Paramètres" page.

### 3. Business Logic (`src/services/logic.js`)
- **Exam Cycle:**
    - **Apte:** Next exam due in 6 months.
    - **Inapte / Apte Partielle:** Next exam due based on "Contre-visite" date (default 7 days, customizable).
- **Status Calculation:** Dynamically derives `last_exam_date` and `next_exam_due` from exam history.

### 4. User Interface (UI/UX)
- **Theme:** Modern "Indigo & Slate" SaaS-style theme.
- **Layout:** Responsive Sidebar (Desktop) / Bottom Nav (Mobile).
- **Dashboard:** Statistics for Due Soon, Overdue, Active Cases.
- **Worker Management:**
    - **List:** Searchable, filterable by Service.
    - **Detail:** Full history view with color-coded exam results.
    - **Forms:** Customized fields ("Antécédents médicaux", "Examen clinique").

### 5. Printing
- **Templates:** Dedicated hidden components for printing.
- **Documents:** "Convocation" and "Certificat d'aptitude".

### 6. Branding
- **Name:** "GestMed Travail"
- **Credits:** "RÉALISÉ PAR Dr. Kibeche Ali Dia Eddine" visible in sidebar.

## Tech Stack
- **Framework:** React 19 + Vite
- **Bundling:** `vite-plugin-singlefile` (One HTML file output).
- **Icons:** `react-icons`.
- **Date Handling:** `date-fns`.