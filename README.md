# Job Tracker

A Kanban-based job tracking app that helps users manage job applications across various stages.

## Dependencies

### Front-end

- **React.js** v19
- **ShadCDN UI Library**

  - Installed using `--legacy-peer-deps` for React 19 compatibility
  - Icons: Lucide for React v0.511.0
  - Docs: [shadcn.com for React 19](https://ui.shadcn.com/docs/react-19)

### Back-end

- **Next.js** (App Router) with **TypeScript**
- **TailwindCSS** v15

  - Tailwind Prettier Plugin: v0.6.11

### Database

- **Xata.io Lite** v0.30.1

### Form Handling

- **Formik.org** v2.4.6

  - `enableReinitialize: true` is set to allow Formik to refresh when `initialValues` change

---

## Key Architecture Notes

### State Management

- Used `UserContext` to share user info globally across pages and components.
- Context is **in-memory only** and does not persist on refresh.
- Workaround: Save user credentials to `sessionStorage` and retrieve on mount to persist authentication.

### Drag and Drop

- **DnD Kit** is used for drag & drop functionality.

  - Docs: [https://docs.dndkit.com/introduction/getting-started](https://docs.dndkit.com/introduction/getting-started)
  - YouTube Tutorial: [https://www.youtube.com/watch?v=DVqVQwg_6_4\&list=PLDP6TvgDVbW1fI3EXn8eYafy5Kp4xGkBu](https://www.youtube.com/watch?v=DVqVQwg_6_4&list=PLDP6TvgDVbW1fI3EXn8eYafy5Kp4xGkBu)

#### Best Practices

- Only part of the card (e.g., the grip icon) is made draggable to avoid click vs drag conflicts.
- Wrapping the entire card made it impossible to distinguish drag from click events.

---

## FAQ / Q\&A Notes

### Job State Management

- **Initial State:**

  - On page load, `jobsList` is rendered with all jobs from `user.id`.

  ```tsx
  const [jobsList, setJobsList] = useState<JobType[]>([]);

  useEffect(() => {
    async function fetchAllJobs() {
      const data = await getJobsByUser(user.id);

      if (data) {
        const jobs = JSON.parse(data) as JobType[];
        setJobsList(jobs);
      }
    }
    fetchAllJobs();
  }, [user.id]);
  ```

- As new job cards are added via `Modal.tsx`, the function `upsertJob` pushes job card changes up from modal to card or column back to kanban for re-rendering.

  - **Add/Update Logic:**

  ```tsx
  setJobsList((prev) =>
    prev.some((j) => j.id === job.id)
      ? prev.map((j) => (j.id === job.id ? job : j))
      : [...prev, job],
  );
  ```

  - **Delete Logic:**

  ```tsx
  setJobsList((prev) => prev.filter((j) => j.id !== jobIdToRemove));
  ```

  - **Update a Job by ID:**

  ```tsx
  setJobsList((prev) =>
    prev.map((j) => (j.id === jobIdToUpdate ? { ...j, ...updatedFields } : j)),
  );
  ```

### Modal Handling

- **Opening/Closing a Modal from a Card:**
  Only toggle modal on the card itself, not the card wrapper.
  When modal was open, all clicks were triggering the modal to close prematurely — resolved by placing toggle logic only on `job-card` div rather than `job-card-wrapper`.

- **Click vs Drag Conflict Fix:**
  Only apply `DnD` draggable props to a specific element (like a grip icon) instead of the full card.

### Formik + Modal Behaviour

- Use `enableReinitialize: true` in Formik to dynamically update `initialValues` when editing a job card:

  ```tsx
  initialValues={{
    name: job?.job_name === "empty" || !job?.job_name ? "" : job.job_name,
    ...
  }}
  ```

- Also handles empty strings and undefined/null uniformly.

## Developer Notes

- `field-sizing: content` or `field-sizing: fixed` helps auto-resize `<textarea>` elements.
- Component `Modal.tsx` is reused for both “Add” (plus button) and “Edit” (clicking on a card).
- Formik values are reset conditionally based on whether a job object is passed in or not.
- Job data is passed **upward** from modal/card to Kanban board using callbacks like:

  ```tsx
  upsertJob: (job: JobType, type: string) => void;
  ```
