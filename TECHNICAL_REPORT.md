# Technical Report: Medical Worker Manager

## 1. File Structure & Responsibilities

### Core Configuration
- **`package.json`**: Manages project dependencies (React, Vite, etc.) and scripts (`npm run build`).
- **`vite.config.js`**: Configuration for the build tool. Crucially uses `vite-plugin-singlefile` to bundle the entire app (CSS, JS, Assets) into one portable `index.html`.

### Source Code (`src/`)
- **`main.jsx`**: The application entry point. Mounts the React app to the DOM.
- **`App.jsx`**: The main layout container. Manages the global view state (Dashboard vs. Workers vs. Details) and renders the Sidebar and Main Content areas.
- **`index.css`**: The global stylesheet. Contains all custom CSS variables (themes), utility classes, and specific component styles (Cards, Tables, Modals, Mobile Layouts).

### Components (`src/components/`)
- **`Dashboard.jsx`**: Displays high-level statistics (Due Soon, Overdue, Positive Cases) using grid cards and summary tables.
- **`WorkerList.jsx`**: The main registry view. Handles displaying workers in a table, searching by name/matricule, and navigating to details.
- **`AddWorkerForm.jsx`**: A modal form for creating and editing worker profiles. Handles dropdowns for Services and Workplaces.
- **`WorkerDetail.jsx`**: A comprehensive view for a single worker. Shows profile info and a chronological history of medical exams.
- **`ExamForm.jsx`**: The core medical interface. Handles input for exam dates, lab results, treatments, and generating the final decision (Apte/Inapte).
- **`PrintTemplates.jsx`**: Hidden components that structure data specifically for printing (Certificates, Convocations) using CSS `@media print`.

### Services (`src/services/`)
- **`db.js`**: The Data Access Layer. Uses `localforage` to interact with the browser's IndexedDB. Handles CRUD operations for Workers, Exams, Departments, and Workplaces. Includes logic to seed initial data.
- **`logic.js`**: Pure business logic functions. Calculates due dates (e.g., "6 months from now" or "7 days retest"), determines overdue status, and aggregates dashboard statistics.

## 2. Tech Stack

- **Core Framework**: **React 19** (JavaScript). Chosen for its component-based architecture and efficient state management.
- **Build Tool**: **Vite**. Ultra-fast development server and bundler.
- **Bundling Strategy**: **vite-plugin-singlefile**. Allows the app to be distributed as a single HTML file with no external dependencies.
- **Database**: **IndexedDB** (via **localforage** library). This is a browser-based NoSQL database that allows for significant data storage (MBs to GBs) persistently without an internet connection.
- **Styling**: **Custom CSS** (CSS Variables & Flexbox/Grid). No heavy framework like Bootstrap was used to keep the file size small and control precise "Medical SaaS" aesthetics.
- **Icons**: **React Icons** (FaUser, FaFileMedical, etc.) for intuitive UI.
- **Date Handling**: **date-fns**. Used for robust date math (adding months/days) and formatting.

## 3. Data Storage

- **Mechanism**: The data is **NOT** hardcoded in JS (except for the initial "Seed" data used to populate the DB the first time).
- **Persistence**: Data is saved in the browser's **IndexedDB**. This is much more powerful and capacious than `LocalStorage`.
- **Reliability**: Data persists even if the browser is closed or the device is restarted.
- **Backup**: An **Export/Import** feature (JSON format) is implemented in `WorkerList.jsx` to allow users to save a backup file to their device.

## 4. Key Features

- **Offline-First**: Runs entirely without internet.
- **Smart Scheduling**: Automatically calculates the next exam date:
    - **Apte**: +6 Months.
    - **Inapte/Partiel**: +7 to 10 Days (based on treatment logic).
- **Dashboard Analytics**: Real-time counters for "Due Soon" and "Overdue" workers.
- **Search & Filter**: Instant search by Name or Matricule.
- **Responsive Design**: Adapts layout for Desktops (Sidebar), Tablets (Landscape Modals), and Phones (Bottom Navigation).
- **Printing**: Generates professional, clean printouts for certificates.

## 5. Potential Issues & Refactoring

- **Performance at Scale**: Currently, `logic.js` loads *all* exams into memory to calculate dashboard stats. If the database grows to 10,000+ records, this might become slow. **Refactoring:** Implement IndexedDB cursors or indexes to query only relevant records.
- **Conflict Management**: If the user opens the app in multiple tabs, data might get out of sync until a reload. **Refactoring:** Add a `BroadcastChannel` listener to sync tabs.
- **Browser Clearing**: If the user specifically goes to "Clear Browsing Data" and selects "Site settings/Offline data", the database will be wiped. The "Export" feature is the primary mitigation for this.
