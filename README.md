# Lukenya College Website

Official website for Lukenya College, a TVETA-accredited technical and vocational college located in Emali Town, Kenya.

**Live site:** [lukenyacollege.ac.ke](https://lukenyacollege.ac.ke)

## Tech Stack

- **Framework:** Angular 18 (Standalone Components)
- **Rendering:** Server-Side Rendering (SSR) via Angular Universal + Express
- **Styling:** Tailwind CSS 3.4
- **CMS:** Sanity.io (headless, free tier)
- **Backend API:** Node.js on Render.com (application form submissions)
- **CI/CD:** GitHub Actions (lint, test, build, deploy)
- **Production:** Ubuntu VPS, PM2, nginx + Let's Encrypt

## Project Structure

```
.
├── src/                        # Angular application source
│   ├── app/
│   │   ├── landing-page/       # Homepage
│   │   ├── about-us/           # About page
│   │   ├── academic/           # Academic programs listing
│   │   ├── faqs/               # FAQ page
│   │   ├── updates/            # News & updates
│   │   ├── gallery/            # Image gallery
│   │   ├── school-of-*/        # Department pages (Engineering, Education, Business)
│   │   ├── staff-remarks/      # Staff bio pages (Principal, Deputy, HODs, Registrar)
│   │   ├── header/             # Navigation header
│   │   ├── footer/             # Footer
│   │   ├── modal/              # Application form modal
│   │   ├── services/
│   │   │   ├── api.service.ts          # Backend API (form submissions)
│   │   │   ├── cms.service.ts          # Sanity CMS client
│   │   │   └── cms-cache.service.ts    # CMS caching + SSR TransferState
│   │   └── models/
│   │       └── cms.models.ts           # TypeScript interfaces for CMS content
│   └── environment.ts/         # Environment configuration
├── cms/                        # Sanity Studio (CMS admin panel)
│   ├── schemas/                # 13 content type schemas
│   ├── sanity.config.ts        # Studio configuration
│   ├── sanity.cli.ts           # CLI configuration
│   └── seed-content.ts         # Content migration script
├── public/                     # Static assets (images, PDFs)
├── .github/workflows/          # CI/CD pipelines
│   ├── ci.yml                  # Lint + Test + Build on push/PR
│   └── deploy.yml              # Deploy to VPS on GitHub Release
├── server.ts                   # Express SSR server
└── DEPLOYMENT.md               # Deployment & rollback guide
```

## Getting Started

### Prerequisites

- Node.js 18 (see `.nvmrc`)
- npm

### Installation

```bash
git clone https://github.com/CYPHOR254/Lukenya_College.git
cd Lukenya_College
npm install
```

### Development Server

```bash
npx ng serve
```

Navigate to `http://localhost:4200/`. The app reloads on source changes.

### Linting

```bash
npm run lint
```

### Running Tests

```bash
npx ng test --watch=false --browsers=ChromeHeadless
```

50 unit tests covering all components and CMS services.

### Production Build

```bash
npm run build
```

Build output: `dist/lukenya-college/{browser,server}`

### SSR Server

```bash
node dist/lukenya-college/server/server.mjs
```

Serves at `http://localhost:4000`.

## Content Management (Sanity CMS)

Website content is managed through Sanity Studio. Non-technical staff can update content without code changes.

### Content Types

| Type | Description |
|------|-------------|
| Site Settings | Hero text, countdown timer, contact info |
| Facility Slides | Image carousel on homepage and about page |
| Value Cards | Vision, Mission, Philosophy |
| Milestones | College timeline achievements |
| Amenities | Campus amenities carousel |
| Program Categories | KNEC Courses, Short Courses |
| Academic Programs | Individual course listings |
| FAQ Topics | FAQ categories with Q&A pairs |
| Staff Members | Staff bios and photos |
| School Pages | Department-specific content |
| Gallery Images | Photo gallery with category filtering |
| News Articles | News and announcements |
| Program Options | Application form dropdown values |

### Running Sanity Studio Locally

```bash
cd cms
npm install
sanity dev
```

Studio opens at `http://localhost:3333`.

### CMS Architecture

- Components fetch content from Sanity via `CmsCacheService`
- SSR uses Angular `TransferState` to avoid duplicate API calls on hydration
- In-memory caching with `shareReplay` for client-side navigation
- Hardcoded fallback data ensures the site works if CMS is unreachable

## CI/CD

Automated via GitHub Actions. See [DEPLOYMENT.md](DEPLOYMENT.md) for full details.

- **CI** (every push/PR to `main`): Lint, test, build
- **Deploy** (on GitHub Release publish): Build + rsync to VPS + PM2 restart

## Pages

| Route | Page |
|-------|------|
| `/` | Landing page |
| `/about` | About Us |
| `/academics` | Academic programs |
| `/faqs` | Frequently asked questions |
| `/updates` | News & updates |
| `/gallery` | Image gallery |
| `/principal` | Principal's remarks |
| `/deputy-principal` | Deputy Principal's remarks |
| `/engineering-remarks` | Engineering HOD remarks |
| `/education-remarks` | Education HOD remarks |
| `/registrar` | Registrar's remarks |
| `/school-of-engineering` | School of Engineering |
| `/school-of-education` | School of Education |
| `/school-of-business` | School of Business |

## External Integrations

- **Student Portal:** [lc.mzizi.co.ke](https://lc.mzizi.co.ke/ISIMSLogin.aspx)
- **Staff Portal:** [staff.lukenyacollege.ac.ke](https://staff.lukenyacollege.ac.ke)
- **E-Learning:** [virtual.lukenyauniversity.ac.ke](https://virtual.lukenyauniversity.ac.ke/login/index.php)
- **Backend API:** Hosted on Render.com (application form submissions)
- **CMS:** Sanity.io (content management)
