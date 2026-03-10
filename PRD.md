# Product Requirements Document (PRD)
# Anam Portfolio Website

**Version:** 1.0
**Date:** 2 March 2026
**Author:** Anam + Claude
**Status:** Draft

---

## 1. Overview

A personal portfolio website showcasing Anam's work across software engineering, hospitality (The Anam Hotel Colombo), and talent management (HUGOZBOR). The site serves as a professional hub for recruiters, companies, and potential collaborators.

### 1.1 Vision
A futuristic, monochrome portfolio built around an iOS 26-inspired liquid glass design system with interactive particle backgrounds. The site should feel like looking through frosted glass panels floating in a dark, living universe — confident, calm, otherworldly.

### 1.2 Goals
- Present a cohesive professional identity across three distinct domains (tech, hospitality, talent management)
- Impress recruiters and companies with both content and craft
- Demonstrate technical skill through the website itself (the medium is the message)
- Be easy to update with new projects and ventures
- Achieve excellent performance and SEO scores

### 1.3 Non-Goals
- Blog or content publishing platform
- User authentication or accounts
- E-commerce or booking functionality
- GitHub API integration (projects are manually curated)
- CMS integration (content managed via TypeScript data files)

---

## 2. Target Audience

| Audience | What They Care About | What They See |
|---|---|---|
| **Recruiters** | Technical skills, project quality, professionalism | Clean project showcases, tech stacks, live demos |
| **Companies** | Problem-solving ability, breadth of experience | Case studies, diverse portfolio, professional presentation |
| **Collaborators** | What Anam brings to the table | Ventures, creative projects, contact info |
| **Professional Network** | Quick overview of what Anam does | LinkedIn-click landing — hero + highlights |

---

## 3. Design System

### 3.1 Visual Direction
- **Aesthetic:** Futuristic monochrome glass — iOS 26 liquid glass on dark canvas
- **Mood:** Confident, calm, otherworldly. Apple Vision Pro meets Swiss editorial.
- **Base:** Dark (#0A0A0A or similar near-black)
- **Motion:** Particles drift slowly. Glass panels have subtle refraction. Interactions feel magnetic.

### 3.2 Color Palette

```
Background:        #0A0A0A (near-black base)
Surface:           #111111 (elevated surface)
Glass Fill:        rgba(255, 255, 255, 0.04–0.08)
Glass Border:      rgba(255, 255, 255, 0.10–0.15)
Text Primary:      #F5F5F5
Text Secondary:    rgba(245, 245, 245, 0.55)
Text Muted:        rgba(245, 245, 245, 0.35)
Particle Colors:   White/grey with 0.15–0.45 opacity
Specular/Rim:      rgba(255, 255, 255, 0.3–0.5)
```

### 3.3 Typography
- **Display/Headlines:** Geometric sans-serif (e.g., Inter, Space Grotesk, or similar) — bold/semibold, large scale, tight tracking
- **Body:** Same family — regular weight, comfortable line height
- **Captions/Labels:** Same family — lighter weight, slightly open tracking, smaller size
- Font choices to be finalized during Paper design phase.

### 3.4 Spacing Rhythm
- **Section gap:** 120–160px
- **Group gap:** 40–64px
- **Element gap:** 16–24px
- **Component padding:** 24–48px

### 3.5 Core Components (From Existing Code)
These components exist in the AI-Powered-Lease-Processing repo and will be adapted for dark mode:

| Component | Adaptation Needed |
|---|---|
| **LiquidGlassCard** | Invert glass base from white-translucent to dark-translucent. Adjust specular/rim for dark bg. |
| **LiquidGlassPill** | Same inversion. Chromatic tint may need muting for monochrome palette. |
| **AuroraBackground** | Change base from #F8FAFC to #0A0A0A. Adjust particle colors to white/grey. Modify aurora glow to cooler/whiter tones. Remove colored trail or make monochrome. |

### 3.6 Design Workflow
- UI designed visually in Paper (via MCP) before code implementation
- Design iterations happen in Paper, approved designs are then translated to Next.js components

---

## 4. Site Structure & Pages

### 4.1 Navigation
- Fixed/floating glass navbar with: Logo/Name, Projects, Ventures, About, Contact
- Navigation should feel integrated with the glass aesthetic
- Mobile: hamburger menu or minimal bottom nav

### 4.2 Pages

#### HOME (/)
The landing page. First impression for everyone.

**Sections:**
1. **Hero**
   - Full-viewport height
   - Aurora particle background (active, interactive)
   - Name displayed prominently (large, bold typography)
   - One-line descriptor that captures the range (not "Full Stack Developer")
   - Subtle scroll indicator

2. **Featured Work**
   - 3–4 hand-picked highlights (mix of tech + ventures)
   - Glass cards with project thumbnail, title, brief description
   - Links to detail pages

3. **CTA / Contact Teaser**
   - Simple "Let's work together" or similar
   - Link to contact page

#### PROJECTS (/projects)
All tech projects, manually curated.

**Content per project:**
- Title
- Description (2–3 sentences)
- Tech stack (tags)
- Screenshot/thumbnail
- Links: Live demo (if available), GitHub repo
- Category/tags for filtering

**Layout:**
- Grid or staggered layout of glass project cards
- Optional: filter by category (Web App, Mobile, AI, etc.)

**Projects to include (from GitHub):**
1. AI-Powered Lease Processing & Tenant Welcome Pack Generator
2. Airtable Clone
3. Lux Vestra Website (commissioned)
4. Pokemon AI (OCR + price scraper)
5. AI Anime Girlfriend (Gemini + Elevenlabs)
6. Vape Tracker App
7. StartupLink Website (UniMelb society)
8. HUGOZBOR Website
9. Additional projects as added

#### VENTURES (/ventures)
Non-tech ventures presented as case studies.

**Ventures:**

1. **The Anam Hotel Colombo** (/ventures/anam-hotel)
   - Case study format
   - Role: Owner/Operator
   - Description of the hotel, vision, what was built
   - Visual assets (photos) — placeholder for now, real assets later
   - Key achievements/metrics if available
   - Status: Ongoing

2. **HUGOZBOR Talent Management** (/ventures/hugozbor)
   - Case study format
   - Role: Talent Manager
   - Description of the artist/creator, management scope
   - Link to hz_website
   - Social media presence / metrics
   - Status: Ongoing

**Layout:**
- Each venture gets a dedicated case-study page with rich content
- Overview page shows venture cards with brief descriptions

#### ABOUT (/about)
The polymath narrative.

**Content:**
- Professional photo (placeholder for now)
- Full bio — the story of how tech, hospitality, and talent management connect
- Skills presented contextually (woven into narrative, not logo grids)
- Timeline or journey (optional, if it adds value)
- Resume/CV download button
- Social links (GitHub, LinkedIn, etc.)

#### CONTACT (/contact)
How to reach Anam.

**Content:**
- Contact form (name, email, message)
- Email address
- Social links
- Optional: availability status ("Open to opportunities" / "Currently building")

**Technical:**
- Form submissions via Resend or Web3Forms (free tier, serverless)
- Form validation (client-side)
- Success/error states with glass-styled feedback

---

## 5. Technical Architecture

### 5.1 Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 15.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | v4 |
| Animation | Framer Motion | 11.x |
| Particle/Glass FX | Custom requestAnimationFrame | — |
| Deployment | Vercel | Free tier |
| Analytics | Vercel Analytics | Free |
| Contact Form | Resend or Web3Forms | Free tier |
| Package Manager | pnpm | — |
| Linting | ESLint + Prettier | — |

### 5.2 Repository Structure

```
anam-website/
├── public/
│   ├── images/
│   │   ├── projects/          # Project screenshots/thumbnails
│   │   └── ventures/          # Hotel photos, HUGOZBOR assets
│   ├── resume.pdf
│   └── favicon.ico
│
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── layout.tsx         # Root layout (fonts, metadata, aurora bg)
│   │   ├── page.tsx           # Home
│   │   ├── projects/
│   │   │   ├── page.tsx       # All projects grid
│   │   │   └── [slug]/
│   │   │       └── page.tsx   # Individual project detail
│   │   ├── ventures/
│   │   │   ├── page.tsx       # Ventures overview
│   │   │   └── [slug]/
│   │   │       └── page.tsx   # Case study detail
│   │   ├── about/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   │
│   ├── components/
│   │   ├── glass/             # Liquid glass design system
│   │   │   ├── LiquidGlassCard.tsx
│   │   │   ├── LiquidGlassPill.tsx
│   │   │   └── GlassButton.tsx
│   │   ├── background/
│   │   │   └── AuroraBackground.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/
│   │       ├── SectionHeading.tsx
│   │       └── ProjectCard.tsx
│   │
│   ├── data/                  # Content as TypeScript
│   │   ├── projects.ts        # Tech projects array
│   │   ├── ventures.ts        # Ventures/case studies
│   │   └── personal.ts        # Bio, socials, contact info
│   │
│   ├── lib/
│   │   ├── motion.ts          # Framer Motion variants/presets
│   │   └── utils.ts           # Helpers (cn utility, etc.)
│   │
│   └── styles/
│       └── globals.css        # Tailwind base + glass utilities + particle keyframes
│
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── package.json
├── .eslintrc.json
├── .prettierrc
├── PRD.md                     # This document
└── README.md
```

### 5.3 Key Architectural Decisions

1. **Static Site Generation (SSG):** All pages statically generated at build time. Zero runtime server cost, instant page loads, perfect for Vercel free tier.

2. **Aurora Background in Root Layout:** The particle/aurora system wraps the entire application in `layout.tsx`. It persists across navigations — no re-mount flicker, continuous ambient motion.

3. **Client Components for Glass/Particles:** Glass components and aurora background require `"use client"` for mouse tracking and rAF loops. Page content can remain server components where possible.

4. **Content as TypeScript Data Files:** No database, no CMS, no API. Projects and ventures defined as typed arrays in `/src/data/`. Adding content = adding an object and running `git push`. Type-safe, version-controlled, zero dependencies.

5. **Page Transitions:** Framer Motion `AnimatePresence` wraps page content for smooth fade/slide transitions between routes, complementing the glass aesthetic.

6. **Image Strategy:** Next.js `<Image>` for optimized loading. Placeholder images initially, real assets added incrementally. All images in `/public/images/` organized by type.

7. **SEO:** Each page has proper metadata (title, description, OG tags). Structured data for professional profile. Sitemap auto-generated.

8. **Performance Targets:** Lighthouse score 90+ across all categories. Particle system uses `will-change` and rAF efficiently. Glass effects use GPU-accelerated properties only.

---

## 6. Content Strategy

### 6.1 Tone of Voice
- Confident but not arrogant
- Direct, clear language
- Professional but personable
- Let the work speak — minimal self-promotion, maximum showcase

### 6.2 Project Data Shape

```typescript
interface Project {
  slug: string
  title: string
  description: string
  longDescription?: string
  techStack: string[]
  category: 'web-app' | 'mobile' | 'ai' | 'website' | 'other'
  thumbnail: string
  images?: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  year: number
}
```

### 6.3 Venture Data Shape

```typescript
interface Venture {
  slug: string
  title: string
  role: string
  description: string
  fullContent: string  // Rich case study text
  status: 'ongoing' | 'completed'
  thumbnail: string
  images?: string[]
  links?: { label: string; url: string }[]
  metrics?: { label: string; value: string }[]
  year: number
}
```

---

## 7. Responsive Strategy

| Breakpoint | Target | Notes |
|---|---|---|
| **Mobile** (< 640px) | 390px reference | Single column, stacked layout, particles reduced for performance |
| **Tablet** (640–1024px) | 768px reference | Two-column grids, adjusted spacing |
| **Desktop** (> 1024px) | 1440px reference | Full experience, all effects active |

### 7.1 Mobile Considerations
- Particle count reduced (40 instead of 80) for battery/performance
- Glass effects simplified (reduced blur radius)
- Touch interactions replace hover-based specular effects
- Hamburger menu for navigation

---

## 8. Deployment & Infrastructure

| Concern | Solution |
|---|---|
| Hosting | Vercel (free tier) |
| CI/CD | Vercel auto-deploy on `main` push |
| Domain | TBD — configured later |
| SSL | Automatic via Vercel |
| CDN | Vercel Edge Network (automatic) |
| Analytics | Vercel Analytics (free tier) |
| Monitoring | Vercel dashboard |

---

## 9. Development Phases

### Phase 1: Foundation
- Project scaffolding (Next.js + Tailwind + TypeScript)
- Dark-mode aurora background adaptation
- Dark-mode liquid glass components adaptation
- Global layout with persistent background

### Phase 2: Visual Design (Paper)
- Design all pages in Paper before coding
- Hero section design
- Project card design
- Venture case study layout
- Navigation design
- Contact page design
- Mobile responsive designs

### Phase 3: Core Pages
- Home page (hero + featured work + CTA)
- Projects page (grid + individual detail pages)
- Ventures page (overview + case study pages)
- About page
- Contact page (with functional form)

### Phase 4: Polish
- Page transitions and micro-interactions
- SEO metadata and OG images
- Performance optimization (particle count, lazy loading)
- Responsive fine-tuning
- Accessibility pass

### Phase 5: Launch
- Deploy to Vercel
- Connect custom domain (when ready)
- Analytics setup
- Final QA across devices

---

## 10. Success Metrics

- Lighthouse Performance: 90+
- Lighthouse SEO: 95+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Smooth 60fps particle animation on modern devices
- Recruiter feedback: "This is impressive"

---

## 11. Open Questions / Future Considerations

- [ ] Custom domain selection
- [ ] Professional photography for hotel and HUGOZBOR
- [ ] Light/dark mode toggle? (Currently dark-only by design choice)
- [ ] Internationalization (if relevant for hotel business)
- [ ] Blog addition in future version
- [ ] CMS migration if manual updates become tedious
