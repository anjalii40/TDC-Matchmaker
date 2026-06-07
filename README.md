# TDC Matchmaker Dashboard & Matching Algorithm MVP

An elegant, internal tool MVP designed for the **The Dating Club (TDC)** matchmakers to manage customer books, track journey stages, review algorithm-suggested matches, write staff notes, and trigger match emails to clients.

## 🚀 Quick Start & Installation

### 1. Installation
Clone or navigate to the repository directory and install the required dependencies:
```bash
npm install
```

### 2. Configure OpenAI API (Optional)
This dashboard calls the OpenAI API to generate personalized matching introductions. To enable this, set your API key as an environment variable:
```bash
export OPENAI_API_KEY="your-openai-api-key"
```
*Note: If no API key is provided, the dashboard features a **smart local heuristic generator** that outputs highly realistic, multi-sentence partner compatibility summaries so you can test all features seamlessly.*

### 3. Running Locally
Run the development server locally:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
To build the application for production deployment (e.g. Vercel):
```bash
npm run build
```

---

## 🔑 Login Credentials

Access the dashboard using the following hardcoded matchmaker credentials:
- **Username:** `matchmaker`
- **Password:** `tdc123`

---

## 📂 Project Structure

```text
Matchmaker Dashboard/
├── app/
│   ├── api/
│   │   ├── customers/
│   │   │   ├── [id]/
│   │   │   │   ├── matches/
│   │   │   │   │   └── route.js    # Matches suggestion & AI intro generator API
│   │   │   │   └── route.js        # Update client status & append meeting notes API
│   │   │   └── route.js            # Customer book list API
│   │   └── layout.js
│   ├── dashboard/
│   │   ├── [id]/
│   │   │   └── page.js             # Detailed Client & Match suggestions workspace
│   │   └── page.js                 # Portfolio search table
│   ├── globals.css                 # Premium custom theme stylesheet
│   └── page.js                     # Login page
├── data/
│   ├── customers.json              # Primary assigned clients (persisted)
│   └── profiles.json               # 100+ simulated candidate pool profiles
├── lib/
│   └── matchmaker.js               # Core matching algorithms & scoring engine
├── jsconfig.json                   # Path alias configs (@/*)
├── package.json
└── README.md
```

---

## 📝 Technical Write-up

### 1. Technology Choices
- **Frontend & Backend (Next.js 15 App Router):** A unified Next.js setup acts as both a React frontend and a serverless Node.js backend. This choice guarantees 100% compatibility with Vercel deployment, as the API routes `/api/...` compile directly into serverless functions. It removes the operational complexity of deploying a separate Express server container.
- **Styling (Vanilla CSS Modules & Variables):** Followed the aesthetic guidelines to avoid generic utility classes. Built a tailored matrimonial palette (warm cream backgrounds, deep rose accent actions, deep teal typography, and amber highlighting) using custom CSS variables, structural grids, accordion panels, and animations.
- **Database (Static JSON Files):** Used read/write static JSON files in `/data` acting as a mock database. Updates (adding meeting notes and changing status tags) are written directly to `customers.json` to persist the state across browser reloads.

### 2. Matching Logic & Algorithms
The matching engine is written in [lib/matchmaker.js](file:///Users/anjaliprajapati/Desktop/Matchmaker%20Dashboard/lib/matchmaker.js) and operates under gender-specific rules:

- **For Male Clients (Strict Filter with Scoring):**
  - **Age:** Matches women who are up to 5 years younger than him (`0 <= male.age - female.age <= 5`).
  - **Height:** Matches women who are shorter than him (`female.height < male.height`).
  - **Income:** Matches women whose income is less than or equal to his (`female.income <= male.income`).
  - **Views on Children:** Compatible views on kids (must match, or either is marked `Maybe`).
  - *Robust Fallback:* If fewer than 5 candidates meet these strict filters, the filters relax dynamically (e.g., age difference up to 8 years younger/2 years older, equal height, or income within 30% higher) to guarantee a selection of matches is always suggested.
  - Matches are then ranked using a compatibility score based on shared mother tongue, location proximity, and aligned family values.

- **For Female Clients (Thoughtful Compatability Scoring):**
  - Evaluates all male candidates on soft matrimonial alignment vectors:
    - **Profession Alignment (30% weight):** Assesses educational levels and income brackets. Awards points if the male's income is similar or higher (traditionally preferred in Indian matrimony).
    - **Relocation Alignment (25% weight):** Assesses shared geographic flexibility (e.g. if both are open to relocate or live in the same city).
    - **Family Values Alignment (25% weight):** Calculates proximity on a progressive-to-conservative spectrum (`traditional` vs `moderate` vs `liberal`).
    - **Kids Preference Alignment (20% weight):** Deducts points or filters out absolute conflicts (e.g., strict "Yes" and strict "No" on wanting children).
  - Candidates are sorted and the top 5 are returned.

### 3. AI Integration
- **Personalized Match Intros:** When matches are retrieved, the `/api/customers/[id]/matches` route calls OpenAI's `gpt-4o-mini` model to write a warm, third-person 2-3 sentence introduction highlighting mutual values, career paths, and lifestyle alignments.
- **Local Heuristic Fallback:** If `OPENAI_API_KEY` is not present, the system runs a local rule-based text engine. It dynamically extracts traits (e.g., "As fellow tech professionals at Swiggy and Google, Priya and Rohan share...") to produce high-fidelity intros for testing.
- **Match Score Engine:** Combines structural matching filters with bonus compatibility points (e.g. same mother tongue, shared dietary preference, and matching horoscope preferences) to map each match to a `0-100` score, categorized into badges: `High Potential` (80-100), `Good Fit` (60-79), and `Maybe` (<60).

### 4. Key Assumptions Made
- All clients in `customers.json` are seeking partners of the opposite gender.
- Height and Income are recorded in standard units (centimeters and INR per annum).
- A mock email transaction is sufficient to simulate sending a profile, which updates the UI state to "Sent" to prevent duplicate emails from being dispatched during a session.
