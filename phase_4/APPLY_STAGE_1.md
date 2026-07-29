# Stage 1 — Routing and case-study pages

This version adds:

- React Router
- `/projects/:slug` case-study routes
- A shared project data file at `src/data/projects.js`
- “Read case study” links on the existing project cards
- Starter responsive case-study styling

## Apply it

The safest option is to copy these files into your existing project:

- `package.json`
- `src/App.jsx`
- `src/App.css`
- `src/data/projects.js`

Then run:

```bash
npm install
npm run dev
```

Test these URLs:

- `/`
- `/projects/jettrack-data-pipeline`
- `/projects/kubernetes-cost-intelligence`
- `/projects/registration-advising-system`

After confirming that they work:

```bash
git add -A
git commit -m "Add project routing and case study pages"
git push
```

Note: `package-lock.json` will be updated locally by `npm install` because this bundle adds `react-router-dom`.
