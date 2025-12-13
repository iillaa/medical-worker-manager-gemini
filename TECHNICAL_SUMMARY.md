# Technical Summary: Medical Worker Manager

## File Structure

### Project Root (`medical-worker-manager/`)
- **`package.json`**: Project configuration, dependencies (React, Vite, etc.), and build scripts.
- **`vite.config.js`**: Vite configuration, specifically set up with `vite-plugin-singlefile` to bundle the entire app into one HTML file.
- **`dist/index.html`**: The production build artifact. This is the single self-contained file used by the end-user.

### Source Code (`src/`)
- **`main.jsx`**: The entry point. Initializes React and renders `App.jsx`.
- **`App.jsx`**: The main application container. Handles routing (view switching), global loading state, and layout structure.
- **`index.css`**: Global stylesheets. Contains the CSS variables, utility classes, and specific component styles (e.g., `.card`, `.btn`, tables).

### Components (`src/components/`)
- **`Dashboard.jsx`**: The home view. Computes and displays statistics (Due Soon, Overdue, Positive Cases) and quick links.
- **`WorkerList.jsx`**: Displays the table of workers. Handles search filtering, pagination (if any), and triggers the "Add Worker" modal. Also handles Data Import/Export.
- **`WorkerDetail.jsx`**: Shows the full profile of a worker and their exam history.
- **`AddWorkerForm.jsx`**: A modal form for creating or editing worker profiles.
- **`ExamForm.jsx`**: The complex form for recording medical exams. Handles logic for Lab Results -> Treatment -> Decision (Apte/Inapte).
- **`PrintTemplates.jsx`**: Contains the HTML structure for printable documents (Convocation, Certificate), hidden from view until printing.

### Services (`src/services/`)
- **`db.js`**: Data Access Layer. Wraps `localforage` to handle all IndexedDB interactions (Workers, Exams).
- **`logic.js`**: Business Logic Layer. Contains pure functions for date calculations (`calculateNextExamDue`, `isOverdue`), status updates, and dashboard statistics aggregation.

## Tech Stack
- **Core Framework**: React 19 (Functional Components, Hooks).
- **Build Tool**: Vite (Fast development and bundling).
- **Bundler Plugin**: `vite-plugin-singlefile` (Enables the offline, zero-dependency HTML output).
- **Language**: JavaScript (ES Modules).
- **Styling**: Standard CSS (Custom styles in `index.css`).
- **Icons**: `react-icons` (Feather/Material icons).
- **Date Handling**: `date-fns` (Robust date manipulation).
- **Storage Library**: `localforage` (Asynchronous storage wrapper).

## Data Storage
- **Mechanism**: **IndexedDB** (via the browser).
- **Library**: `localforage` is used as an abstraction layer.
- **Persistence**: Data is persistent across browser sessions and reloads.
- **Offline**: The app and its data are fully local. No remote server or SQL database is involved.
- **Backup**: Data is *not* synced to the cloud. Users must use the built-in "Export JSON" feature to backup their data manually.

## Key Features
1.  **Worker Management**: CRUD (Create, Read, Update) operations for worker profiles.
2.  **Exam Logic Cycle**: 
    - Handles "Apte" (6-month validity).
    - Handles "Inapte/Apte Partielle" (Requires Treatment & Retest).
    - Auto-calculates `next_exam_due` based on the latest decision and retest dates.
3.  **Dashboard**: Real-time aggregation of "Due Soon" (15 days) and "Overdue" workers.
4.  **Search**: Real-time filtering of the worker list by name.
5.  **Offline Capability**: Runs entirely in the browser without internet.
6.  **Printing**: Generates professional print layouts for Certificates and Convocations.
7.  **Data Portability**: Import/Export full database to JSON.

## Potential Issues / Areas for Improvement
1.  **Scalability**: While IndexedDB is robust, loading *all* exams into memory to calculate stats (in `logic.js`) might become slow if the database grows to thousands of records. Pagination or database-level querying would be better long-term.
2.  **Browser Data Clearing**: If the user explicitly clears their browser "Site Data" or "Cache", the database could be wiped. The "Export" feature is critical for mitigation.
3.  **Conflict Resolution**: If the app is opened in two tabs simultaneously, database writes might conflict (though IndexedDB handles transactions well, the UI state might get out of sync).
4.  **Security**: There is currently no login or PIN protection (mentioned as a future todo). Anyone with access to the device/file can view the data.
