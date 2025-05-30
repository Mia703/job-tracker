# Job Tracker

**Job Tracker** is a Kanban-style job application management tools designed to help users visually organise job opportunities across four statuses: **Wish List, Applied, Rejected,** and **Offered**.

Each job card includes position details (e.g., position, company, description, salary, URL) and associated timeline events (e.g., applied, interviewed, offered, accepted). Users can add, update, delete, and reorder job cards as needed.

Inspired by [Huntr.co](https://huntr.co/), this app provides a streamlined and structured workflow for job seekers.

## Features

- User account management: sign up, login, delete account.
- Create, read, update, and delete job cards.
- Drag and drop functionality across status columns.
- Persistent data storage with Xata.io Lite.

## Technologies Used

- Frontend: React 19, TailwindCSS, ShadCN UI.
- Backend: Next.js (App Router), TypeScript.
- Database: Xata.io Lite.
- Validation: Formik.
- Deployment: Vercel.

## Installation

To run this project locally:

1. Clone and set up the repository:

```bash
  git clone https://github.com/Mia703/job-tracker.git
  cd job-tracker
```

2. Install dependencies:

```bash
  npm install --legacy-peer-deps
```

3. Set environment variables:

- Create a `.env` file in the root.
- Add you Xata API key:

```ini
  XATA_API_KEY=your_key_here
```

4. Run the development server:

```bash
  npm run dev
```

For detailed setup, refer to [Xata's Next.js Guide](https://lite.xata.io/docs/getting-started/nextjs).

## Project Structure

```bash
/src
  /app
    /components         → Kanban components
    /context            → UserContext for authentication
    /delete-account     → Account deletion page
    /signup             → User registration page
  /components/ui        → ShadCN UI components
  /pages
    /api                → API route handlers
    /job-tracker        → Main Kanban interface
  /types                → TypeScript types (User, Job)
  /utils/tasks.ts       → Async DB operations (CRUD)
```

## Developer Notes and Implementation Details

### Dependencies

- ShadCN UI (React 19 compatible):
  - Installed with --legacy-peer-deps
  - Icons: Lucide v0.511.0
  - Docs: ShadCN React 19 Docs
- TailwindCSS: v15, with Prettier plugin v0.6.11
- Formik: v2.4.6, with enableReinitialize: true
- Xata.io Lite: v0.30.1
- DnD Kit: for drag-and-drop ([Docs](https://dndkit.com/))

### Architecture Notes

#### State Management

- `UserContext` is used for global auth state.
- Data is not persisted across page refreshes.
- Workaround: store user credentials in `sessionStorage`.

#### Drag and Drop

- Only a sub-element (e.g., grip icon) is draggable to prevent click vs drag event conflicts.

#### Job State Logic

- Job cards are managed in a `jobList` state array.
- CRUD operations update this list directly:

```tsx
setJobsList((prev) =>
  prev.some((j) => j.id === job.id)
    ? prev.map((j) => (j.id === job.id ? job : j))
    : [...prev, job],
);
```

- Deletion:

```tsx
setJobsList((prev) => prev.filter((j) => j.id !== jobIdToRemove));
```

- Update:

```tsx
setJobsList((prev) =>
  prev.map((j) => (j.id === jobIdToUpdate ? { ...j, ...updatedFields } : j)),
);
```

#### Modal + Formik

- Modal is used for both add and edit job card actions.
- Use `enableReinitialize: true` for dynamic `initialValues`.
- Formik values adapt to job data or default to empty strings:

```tsx
initialValues={{
  name: job?.job_name === "empty" || !job?.job_name ? "" : job.job_name,
  ...
}}
```

#### UX Notes

- Place modal toggle logic only on the job card (not the wrapper).
- Job data is lifted up from `Modal.tsx` using callbacks:

```tsx
upsertJob: (job: JobType, type: string) => void;
```

- Use `field-sizing: content` for auto-resizing `<textarea>` inputs.

## License

Job Tracker © 2025 by Amya moore is licensed under CC BY-NC 4.0. To view a copy of this license, visit <https://creativecommons.org/licenses/by-nc/4.0/>

## Live Demo

Visit the deployed site: [kanban-job-tracker.verce.app](https://kanban-job-tracker.vercel.app/)
