# MATCHMAKER-CRM Architecture Overview

The MATCHMAKER-CRM application is structured as a decoupled monorepo, cleanly dividing the view layer, backend API logic, static datastore files, and documentation.

## Directory Layout

```
MATCHMAKER-CRM/
├── frontend/             # Next.js App Router Single-Page Application (SPA)
│   ├── app/              # Client routing & page views
│   ├── components/       # Custom React reusable components
│   ├── hooks/            # Client state hooks (useCustomers, etc)
│   ├── styles/           # CSS files (globals.css)
│   └── next.config.mjs   # Configured with proxy rewrites pointing to backend
│
├── backend/              # Standalone Node.js/Express.js Web Server (Port 5050)
│   ├── controllers/      # Express request/response endpoints handlers
│   ├── routes/           # Mount paths (/api/customers, etc)
│   ├── services/         # Database file operations (loadJSON/saveJSON)
│   ├── middleware/       # Auth validation & error handlers
│   └── lib/              # Matching engine & AI text generators
│
├── database/             # Schemas & Seeding Layer
│   ├── schemas/          # Document model structures (Customer, Match, etc)
│   └── seed/             # JSON databases files (customers, profiles)
│
└── docs/                 # Technical documentation
```

## System Workflow

1. **Client Rendering**: Next.js (port 3000) renders views. When a page component requests data, it calls hooks (e.g. `useCustomers`).
2. **API Proxying**: Next.js dev server rewrites all `/api/*` calls and redirects them to the Node/Express server (port 5050).
3. **Backend Processing**: Express server routes the request through a controller to a service.
4. **Data Operations**: Services read or write records directly from the database seed folder (`database/seed/customers.json` and `database/seed/profiles.json`).
