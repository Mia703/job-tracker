
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