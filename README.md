
# Job Tracker

A Khanban-based job tracker.


## Dependencies

- Front-end: React.js v19
- Back-end: Next.js + Typescript + TailwindCSS v15
    - Form Validation: Formik.org v2.4.6
- Database: Xata.io Lite v0.30.1
- UI: ShadCDN (installed using `--legacy-peer-deps` because of React v19)
    - Reference: https://ui.shadcn.com/docs/react-19
    - Icons: Lucide for React v0.511.0
- Other Dependencies:
    - Tailwind Prettier Plugin v0.6.11

Used UserContext to pass logged in user information to other pages and components, however, useContext is **in-memory only**, meaning the context doesn't persist across page refreshes. To ensure the user auth persists first get the user credentials and save to sessionstorage, then get from sessionstorage and save to UserContext.

`field-sizing: fixed` or `field-sizing: content` allows a textarea to resize based on the content inside the textarea or stay a fixed size.

DnD Kit Quick Start: https://docs.dndkit.com/introduction/getting-started

DnD Kit Tutorial: https://www.youtube.com/watch?v=DVqVQwg_6_4&list=PLDP6TvgDVbW1fI3EXn8eYafy5Kp4xGkBu


Wrapping the entire job card in the DnD draggable attributes makes it hard to distinguish between an actual click vs a drag. So, instead of making the entire card draggable, make only a part of the card draggable. In this case it's the grip icon.

The modal is reused for both the plus button and when clicking on a job card. However, for some reason the toggle `displayModal` wasn't alternating, instead just `!displayModal` to keep accurate. Plus moved the onclick function from the job-wrapper to the actual job card. Because what was happening is that all clicks when the modal was open were toggling the opening or closing of the modal. 

Formik `enableReinitialize: true` tells Formik to reset its internal state whenever `initialValues` changes.