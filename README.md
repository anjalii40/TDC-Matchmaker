# 💖 TDC Matchmaker CRM Monorepo

[![Next.js 16](https://img.shields.io/badge/Frontend-Next.js%2016-163B40?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Express.js 5050](https://img.shields.io/badge/Backend-Express.js%205050-C36B7E?style=flat-square&logo=express)](https://expressjs.com/)
[![Gemini 1.5](https://img.shields.io/badge/AI-Gemini%201.5%20Flash-C59B27?style=flat-square&logo=google-gemini)](https://deepmind.google/technologies/gemini/)
[![Monorepo](https://img.shields.io/badge/Structure-Decoupled%20Monorepo-7a5c10?style=flat-square)](https://github.com/)

An internal matchmaking workspace and customer book manager designed for **The Dating Club (TDC)** matchmaking team. This application enables matchmakers to manage client portfolios, track journey stages, run the matrimonial matching engine, and generate personalized Gemini AI match insights.

---

## 🚀 Quick Start & Installation

### Step 1: Install Dependencies
Install dependencies at the monorepo root and inside both the frontend/backend modules:
```bash
npm install
npm run install:all
```

### Step 2: Configure Gemini API Key
Create a `.env.local` file in the root directory to store your API credentials:
```env
GEMINI_API_KEY="your-google-gemini-api-key"
```

> [!TIP]
> **No API Key? No Problem!**
> If `GEMINI_API_KEY` is not present, the system automatically falls back to a **smart local heuristic generator** that outputs realistic, multi-sentence partner compatibility narratives based on matching vectors.

### Step 3: Run the Development Server
Launch both development servers concurrently:
```bash
# Start backend API (Port 5050) & frontend client (Port 3000)
npm run dev:backend
# In a separate shell session
npm run dev:frontend
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Hardcoded Credentials

Access the dashboard using the following credentials:
* **Username:** `matchmaker`
* **Password:** `tdc123`

---

## 🛠️ Monorepo Scripts Directory

All workspace tasks can be orchestrated directly from the root folder:

| Command | Action / Scope | Target Location |
| :--- | :--- | :--- |
| `npm run install:all` | Installs dependencies for frontend & backend | `frontend/` & `backend/` |
| `npm run dev:backend` | Starts the Express.js API server (Port 5050) | `backend/server.js` |
| `npm run dev:frontend` | Starts the Next.js development client (Port 3000) | `frontend/` |
| `npm run build:frontend` | Compiles Next.js for production deployment | `frontend/.next/` |

---

## 📂 Project Structure

```text
Matchmaker Dashboard/
├── frontend/                 # Client SPA (Next.js 16 App Router)
│   ├── app/                  # UI Views & layouts (login, dashboard, customer details)
│   ├── components/           # Reusable widgets (cards, list tables, accordions)
│   ├── hooks/                # Client state hooks (useCustomers, useMatches, useNotes)
│   ├── styles/               # Design token stylesheets (globals.css)
│   └── next.config.mjs       # Rewrites API routing proxy to Port 5050
│
├── backend/                  # API Web Server (Node.js/Express.js ES Modules)
│   ├── config/               # Database seed loaders
│   ├── controllers/          # Endpoint controllers (auth, customers, matches, notes)
│   ├── lib/                  
│   │   ├── matching/         # Core compatibility matching algorithm formulas
│   │   └── ai/               # Gemini API SDK integration wrapper
│   ├── routes/               # Express endpoints routers mapping
│   ├── services/             # Low-level JSON database read/write service
│   └── server.js             # Express app bootloader & dotenv loaders
│
├── database/                 # Structured schemas & data files
│   ├── schemas/              # Mongoose data modeling documentation
│   └── seed/                 # Datastores files (customers.json, profiles.json)
```

---

## 📐 System Architecture

The monorepo separates view presentation from business computations and algorithms:

```mermaid
graph TD
    subgraph ClientBrowser ["Client Browser"]
        UI[Next.js 16 SPA Client<br/>Port 3000]
    end

    subgraph MonorepoInfrastructure ["Monorepo Infrastructure"]
        Proxy[Next.js API Rewrite Proxy<br/>/api/:path*]
        Server[Express.js Server API<br/>Port 5050]
        MatchEng[Matrimonial Matching Engine]
        Gemini[Google Gemini API client]
        JSON_DB[(Static JSON DB Files<br/>customers.json / profiles.json)]
    end

    UI -->|1. Request /api/customers| Proxy
    Proxy -->|2. Rewrite & Proxy| Server
    Server -->|3. Read/Write| JSON_DB
    Server -->|4. Compute Scoring| MatchEng
    Server -->|5. Generate Insight| Gemini
    Gemini -.->|Generate Match Intro| Server
    Server -->|6. JSON response| Proxy
    Proxy -->|7. Hydrate State| UI

    style ClientBrowser fill:#fdfbf7,stroke:#c36b7e,stroke-width:2px
    style MonorepoInfrastructure fill:#f3ece3,stroke:#163b40,stroke-width:2px
    style JSON_DB fill:#fff,stroke:#7a5c10,stroke-width:1px
```

---

## 🎨 User Interface Wireframes

### 1. Login Page Layout
```mermaid
graph TD
    subgraph LoginScreen ["Login Screen"]
        Box["[ TDC Matchmaker. ] Login Card"]
        User["Field: Username Input (e.g. 'matchmaker')"]
        Pass["Field: Password Input (e.g. 'tdc123')"]
        Btn["Action: Login Button (or Enter Key Submit)"]
        Help["Help Text: HARDCODED CREDENTIALS DISPLAY"]
        
        Box --> User
        User --> Pass
        Pass --> Btn
        Btn --> Help
    end
    style LoginScreen fill:#fdfbf7,stroke:#163b40,stroke-width:2px
    style Box fill:#fff,stroke:#e8e2da
```

### 2. Portfolio Dashboard Page Layout
```mermaid
graph TD
    subgraph DashboardPageLayout ["Dashboard Page Layout"]
        Header["Header: Brand Name Logo | Staff Tag | Logout Button"]
        KPIs["KPI Grid (5 Columns): Total Portfolio | New Inflow | Active Search | Matched Clients | Closed Profiles"]
        Filters["Filter Bar: Search Name Input | Gender Dropdown | Religion Dropdown | Status Dropdown | View Mode Switch (Table, Grid, Kanban)"]
        
        subgraph ViewContainer ["View Container"]
            Table["Table View (Default): Row List (Avatar, Name, Gender, Age, City, Marital Status, Completeness, Stage Badge)"]
            Grid["Card Grid View: 4-Column Cards Grid (Initials Avatar, Name, Title, Profession, Chips for Diet/Religion, Note Preview)"]
            Kanban["Kanban View: 4 Stage Columns (New | Active | Matched | Closed) containing compact client cards"]
        end
        
        Header --> KPIs
        KPIs --> Filters
        Filters --> ViewContainer
    end
    style DashboardPageLayout fill:#fdfbf7,stroke:#163b40,stroke-width:2px
    style ViewContainer fill:#f3ece3,stroke:#e8e2da
```

### 3. Customer Detail Page & Matchmaking Workspace
```mermaid
graph TD
    subgraph CustomerWorkspace ["Customer Workspace"]
        TopBar["Top Navigation: ← Back to Portfolio List | Client Name | Back to Dashboard Button"]
        
        subgraph Sidebar ["Sidebar (Left Column - 1/3 Width)"]
            Avatar["Avatar & Basic Specs (Name, Age, City, Stage Status Badge)"]
            Accordion1["CRM Controls Accordion (Search Paused Switch | Account Closed Switch)"]
            Accordion2["Customer Biodata Accordion (Personal, Career details, Religion, Lifestyle properties)"]
            NotesBox["Matchmaker notes text-area: Add meeting inputs & history timeline"]
        end
        
        subgraph SuggestedMatches ["Suggested Matches (Right Column - 2/3 Width)"]
            MatchHeader["Suggested Matches Panel Header: Opp Gender Pool Info | 'Top 5 Matches' tag"]
            Proposals["Active Proposals Panel: Collapsible list of sent match history statuses"]
            
            subgraph SuggestedMatchCardStack ["Suggested Match Card Stack"]
                EmptyState["Empty State: SVG Heart Illustration + 'Find Matches' CTA button (shown if matches not generated)"]
                Card1["Match Card: Gender Initials, Name, Profession, Location, Match Score Badge, Compatibility narrative intro"]
                Card2["Expanded Breakdown Accordion: Row Breakdown details for Caste, Tongue, Career, Location, Diet, etc"]
                CardActions["Card Action: 'Send Profile to Client' btn -> Opens Email Preview Overlay Modal"]
            end
        end
        
        TopBar --> Sidebar
        TopBar --> SuggestedMatches
    end
    style CustomerWorkspace fill:#fdfbf7,stroke:#163b40,stroke-width:2px
    style Sidebar fill:#fff,stroke:#e8e2da
    style SuggestedMatches fill:#f3ece3,stroke:#e8e2da
```

---

## 📝 Algorithmic Compatibility Engine

Matrimonial compatibility score calculations reside in [matchmaker.js](file:///Users/anjaliprajapati/Desktop/Matchmaker%20Dashboard/backend/lib/matching/matchmaker.js) and rank candidates based on 9 core Indian matrimonial vectors:

| Scoring Category | Method / Logic | Matrimonial Rationale |
| :--- | :--- | :--- |
| **1. Religion & Caste** | Matches religion. Awards full points for matching caste. Handles inter-faith exceptions. | Culturally aligned social backgrounds. |
| **2. Mother Tongue** | Identifies exact matches in spoken languages. | Communication comfort & family integration. |
| **3. Location** | Scores local matches highest. Relocatability flags award partial credit. | Eliminates geographical friction. |
| **4. Family Values** | Calculates difference on traditional $\leftrightarrow$ liberal spectrum. | Alignment of core lifestyles. |
| **5. Career & Income** | Matches salary packages relative to client income preferences. | Aligned socio-economic standing. |
| **6. Diet** | Matches food preference tiers (Jain > Veg > Eggetarian > Non-Veg). | Kitchen coordination. |
| **7. Education Level** | Evaluates equivalence in professional degrees. | Intellectual compatibility. |
| **8. Horoscope** | Evaluates manglik status and matching preferences. | Astro-compatibility preferences. |
| **9. Age** | Calculates difference tolerances. | Age gap preferences. |
