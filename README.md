# DeratPro - Landing page
Site de prezentare pentru DeratPro, o firmă fictivă de deratizare, dezinsecție și dezinfecție.

**Link live:** https://deratpro-git-feature-contact-api-alin11-4f87.vercel.app/

## Cum rulezi local

```bash
git clone https://github.com/SionAlin/deratpro.git
cd deratpro
npm run dev
```
Pentru verificarea build-ului, deschidem http://localhost:3000

## Tehnologii

- Next.js
- Three.js
- React
- TypeScript
- Tailwind CSS v4
- Iconițe: lucide-react
- Deploy: Vercel

## Structura proiectului

Fiecare secțiune e o componentă separată în `app/components/`: `Navbar`, `Hero`, `Services`, `WhyUs`, `HowItWorks`, `Contact`. `app/page.tsx` le asamblează în ordinea paginii, cu o mică animație.

## Design si tool-ul AI folosit

**Tool:** Google Gemini (logo), Google Stitch (layout)
**Prompt folosit (pentru logo):**

Give me a logo for a web app for a business named 'DeratPro', which helps other businesses and individuals with rat control, disinsection, and disinfection. Simple dark themed, cartoon logo, no extra text(just DeratPro). I wold like the logo to have an spray toub with an crossed rat an bug on it.

**Prompt folosit (pentru layout):** 

Give me a design for a web app for a business named 'DeratPro', which helps other businesses and individuals with rat control, disinsection, and disinfection. I want a landing page with 5 vertically scrolling sections:
1. Hero: features a Three.js animation, business name, a logo with a cute scared cartoon bug, dark mode theme, and a CTA button.
2. Servicii: displays the 3 services (rat control, disinsection, and disinfection), each with a title, short description, and icon.
3. De ce DeratPro: highlights 3–4 advantages like fast intervention, approved substances, authorized personnel, and warranty.
4. Cum funcționează: illustrates a 3-step process (You call -> We evaluate -> We solve the problem).
5. Contact: features a simple form (name, phone number, message) with input validation.
I want this site to have a simple design, a dark mode theme, and to be entirely in Romanian.

## Decizii și compromisuri

- **Stitch ca ghidaj, nu ca sursă de cod.** Am luat din design paleta, fontul și ordinea secțiunilor, dar am scris componentele în React Tailwind și am simplificat layout-ul, fiindcă mockup-ul era prea încărcat.
- **Animație procedurală, nu model 3D.** Geometria e generată din cod, fără fișiere externe, ca să se încarce rapid și pe mobil.
- **Formular fără backend.** Conform cerinței, validez în client (nume, telefon, mesaj) și afișez un mesaj de confirmare. Datele nu se stochează sau trimit nicăieri.
- **Conținut fictiv.** Cifrele (15+ ani, 10.000+ intervenții) și textele sunt inventate pentru demonstrație.

## Funcționalitate adăugată

Endpoint API (`app/api/contact/route.ts`) care primește datele formularului de contact, le validează pe server și le înregistrează în loguri.