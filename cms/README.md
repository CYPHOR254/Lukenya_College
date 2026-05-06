# Lukenya College CMS (Sanity)

## Quick Setup

### 1. Create Sanity Account & Project

```bash
# Install Sanity CLI globally
npm install -g sanity

# Login to Sanity (creates free account if needed)
sanity login

# Create a new project (choose free plan)
sanity init --project-plan free
```

When prompted:
- Project name: `Lukenya College`
- Dataset: `production`
- Choose `Clean project with no predefined schemas`

After init, note your **Project ID** (e.g., `abc123xyz`).

### 2. Update Project IDs

Replace `YOUR_PROJECT_ID` in these files:

1. `cms/sanity.config.ts` (line with `projectId`)
2. `src/environment.ts/environment.ts` (sanity.projectId)
3. `cms/seed-content.ts` (if running migration)

### 3. Install CMS Dependencies

```bash
cd cms
npm install
```

### 4. Start Sanity Studio (local dev)

```bash
cd cms
npm run dev
```

Studio opens at `http://localhost:3333`

### 5. Seed Content

```bash
# Create a write token at https://manage.sanity.io > API > Tokens
# Update the token in seed-content.ts

cd cms
npx ts-node seed-content.ts
```

### 6. Deploy Studio

```bash
cd cms
npx sanity deploy
```

This deploys to `https://lukenya-college.sanity.studio` (free hosting).

## Content Types

| Type | Description | Managed by |
|------|-------------|------------|
| Site Settings | Hero text, countdown, contact info | Admin |
| Facility Slides | Image carousel on home/about pages | Admin |
| Value Cards | Vision, Mission, Philosophy | Admin |
| Milestones | College timeline milestones | Admin |
| Amenities | Campus amenities carousel | Admin |
| Program Categories | KNEC Courses, Short Courses | Academic staff |
| Academic Programs | Individual course listings | Academic staff |
| FAQ Topics | FAQ categories and Q&A pairs | Admin |
| Staff Members | Staff bios and photos | Admin |
| School Pages | Engineering, Education, Business page content | HODs |
| Gallery Images | Photo gallery with categories | Admin |
| News Articles | News and updates | Admin |
| Program Options | Application form dropdown values | Admin |

## For Content Editors

1. Go to `https://lukenya-college.sanity.studio`
2. Login with your Sanity account
3. Click on any content type in the left sidebar
4. Edit content and click "Publish"
5. Changes appear on the website within minutes (CDN cache)
