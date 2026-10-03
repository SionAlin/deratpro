# DeratPro
 
A bilingual (RO/EN) landing page for a pest control company, built with Next.js, TypeScript and Three.js, with a password-protected admin dashboard backed by PostgreSQL for managing quote requests.
 
> **Note:** DeratPro is a fictional company created for a front-end exercise and later extended into a portfolio project. The contact form stores submitted data in a database, so please use **test data only**.
 
**Live demo:** https://deratpro-seven.vercel.app/
 
## Overview
 
This project implements a complete small-business web presence:
- Single-page landing site with five sections: Hero, Services, Why Us, How It Works, Contact
- Interactive Three.js animation in the Hero section
- Romanian / English language switch and dark / light theme toggle
- Contact form with client-side and server-side validation
- Quote requests saved to a PostgreSQL database
- Admin dashboard to review requests, update their status and add notes
## Project Structure
 
```
app/
├── layout.tsx                   # Root layout, font and providers
├── page.tsx                     # Landing page, assembles all sections
├── globals.css                  # Theme tokens (CSS variables) and Tailwind setup
├── api/
│   ├── contact/
│   │   └── route.ts             # Public endpoint: validates and stores a request
│   └── admin/
│       ├── login/
│       │   └── route.ts         # Checks password, starts session, rate limits
│       └── contacts/
│           └── [id]/
│               └── route.ts     # Protected PATCH: update status and notes
├── admin/
│   ├── page.tsx                 # Redirects to the dashboard
│   ├── login/
│   │   └── page.tsx             # Login page
│   └── dashboard/
│       └── page.tsx             # Protected page listing all requests
├── components/
│   ├── Navbar.tsx               # Fixed navigation with theme and language toggles
│   ├── Hero.tsx                 # Three.js animation, headline and CTA
│   ├── Services.tsx             # Rodent, insect and disinfection services
│   ├── WhyUs.tsx                # Advantages
│   ├── HowItWorks.tsx           # Three-step process
│   ├── Contact.tsx              # Validated contact form
│   ├── ThemeToggle.tsx          # Dark / light switch
│   ├── LangToggle.tsx           # RO / EN switch
│   ├── Reveal.tsx               # Scroll animations
│   └── admin/
│       ├── LoginForm.tsx        # Password form
│       └── ContactsTable.tsx    # Editable table of requests
└── lib/
    ├── i18n.tsx                 # Language context and typed dictionaries
    ├── auth.ts                  # Password check and signed session cookie
    ├── database.ts              # Lazy Neon PostgreSQL client
    └── statuses.ts              # Request statuses shared by UI and API
```
 
## Key Implementation Details
 
### Hero Animation (Three.js)
- Wireframe icosahedron plus 350 drifting particles, generated procedurally (no external 3D models)
- Subtle camera parallax following the mouse pointer
- Three.js used directly inside `useEffect`, with full cleanup of geometries, materials and the renderer on unmount
- `ResizeObserver` keeps the canvas responsive
### Internationalization
- All text lives in typed dictionaries (`ro` and `en`) in `lib/i18n.tsx`
- The `en` dictionary is typed as `typeof ro`, so a missing translation key is a compile-time error
- Chosen language persisted in `localStorage`
- The admin dashboard is intentionally Romanian only
### Theming
- Colors defined as CSS variables, with separate values for light and dark
- Default follows the system setting (`prefers-color-scheme`), manual choice persisted in `localStorage`
- Tailwind v4 theme tokens map to the variables (`bg-surface`, `text-muted`, `text-primary`)
### Contact Form and API
- Client-side validation for name, Romanian phone number and message length
- The same rules are enforced again in `POST /api/contact`, so the endpoint cannot be bypassed
- Valid requests are inserted into the `contacts` table with status `NEW`
- Queries are parameterized, which prevents SQL injection
### Admin Authentication
- Single administrator, password stored in an environment variable
- Constant-time password comparison
- On success, an HMAC-signed, `httpOnly`, `sameSite=lax` cookie with an 8-hour expiry
- Login rate limiting: 5 attempts per 15 minutes per IP (in-memory)
- Every protected page and API route checks the session on the server
### Admin Dashboard
- Lists all requests, newest first, with date, name, phone, message, status and notes
- Status selector: New, Contacted, Scheduled, Done, Canceled
- Notes up to 1000 characters
- Changes are saved with `PATCH /api/admin/contacts/[id]`, which runs an SQL `UPDATE`
- Pages are marked `noindex`
## Requirements
 
- Node.js 20+
- A PostgreSQL database (developed with the free tier of [Neon](https://neon.tech))
## Usage
 
### 1. Install
```bash
git clone https://github.com/SionAlin/deratpro.git
cd deratpro
npm install
```
 
### 2. Configure Environment
Create `.env.local` in the project root:
 
| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `ADMIN_PASSWORD` | Password for the admin dashboard |
| `ADMIN_SESSION_SECRET` | Random string, at least 32 characters (`openssl rand -base64 32`) |
 
### 3. Create the Table
Run the SQL from the **Data Structure** section below in your database console.
 
### 4. Run
```bash
npm run dev      # development at http://localhost:3000
npm run build    # production build
npm start        # run the production build
```
 
### 5. Use the Dashboard
- Open `/admin` and log in with `ADMIN_PASSWORD`
- Submit a request from the Contact section, then refresh the dashboard
- Change a status or note and click **Salvează**
## Data Structure
 
```sql
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status TEXT NOT NULL DEFAULT 'NEW',
  notes TEXT
);
```
 
Valid statuses: `NEW`, `CONTACTED`, `SCHEDULED`, `DONE`, `CANCELED`.
 
## Design
 
The UI concept was generated with **Google Stitch**, and the logo was created with **Google Gemini**.
 
**Prompt used for the layout (Google Stitch):**
 
> Give me a design for a web app for a business named 'DeratPro', which helps other businesses and individuals with rat control, disinsection, and disinfection. I want a landing page with 5 vertically scrolling sections:
1. Hero: features a Three.js animation, business name, a logo with a cute scared cartoon bug, dark mode theme, and a CTA button.
2. Servicii: displays the 3 services (rat control, disinsection, and disinfection), each with a title, short description, and icon.
3. De ce DeratPro: highlights 3–4 advantages like fast intervention, approved substances, authorized personnel, and warranty.
4. Cum funcționează: illustrates a 3-step process (You call -> We evaluate -> We solve the problem).
5. Contact: features a simple form (name, phone number, message) with input validation.
I want this site to have a simple design, a dark mode theme, and to be entirely in Romanian.
 
**Prompt used for the logo (Google Gemini):**

> Give me a logo for a web app for a business named 'DeratPro', which helps other businesses and individuals with rat control, disinsection, and disinfection. Simple dark themed, cartoon logo, no extra text(just DeratPro). I wold like the logo to have an spray toub with an crossed rat an bug on it.

## Development
 
- Next.js 16 (App Router), React, TypeScript, Tailwind CSS v4, Three.js, lucide-react
- PostgreSQL on Neon, deployed on Vercel
- Feature branches and conventional commits (`feat:`, `fix:`, `docs:`)
- AI assistants were used for design inspiration (Google Stitch) and as a coding helper; the code was reviewed and adapted by hand