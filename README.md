# ThinkingHead Nigeria Limited Website

> We turn complex challenges into working systems.

This repository contains the official corporate website for **ThinkingHead Nigeria Limited** (RC 8611016), an AI-powered research, strategy, and systems engineering firm headquartered in Kaduna, Nigeria. The website communicates ThinkingHead's corporate worldview, eight practice pillars, eight-stage delivery methodology, signature project track record, executive leadership, intellectual capital (Insights), and direct discovery intake channels.

---

## Project Overview

The website establishes ThinkingHead's digital presence with calm confidence, clarity, and architectural discipline. It prioritizes evidence and systems thinking over generic marketing slogans.

Key capabilities and architectural highlights include:

* **Authoritative Corporate Storytelling**: Comprehensive presentation of ThinkingHead's identity, philosophical tenets, differentiators, and CAC corporate registration details.
* **Service Architecture**: Detailed mapping of eight integrated practice pillars with explicit outcome statements.
* **Operational Methodology**: Visual and interactive walkthrough of the 8-stage delivery framework (Discover to Scale).
* **Track Record & Evidence**: Curated signature client engagements and industry clusters with strict commercial confidentiality preservation.
* **Gated Corporate Profile**: Two-step gated intake flow capturing verified client credentials before granting document access.
* **Interactive Discovery Intake**: Client-side validated briefing form connected to server-side Route Handlers with honeypot spam protection and sliding-window rate limiting.
* **Editorial Knowledge Engine**: Local Markdown/MDX publication infrastructure with graceful handling for forthcoming thought-leadership articles.
* **Zero Bloat & Framework Independence**: Built strictly with standard Next.js App Router, React Server Components by default, and structured CSS Modules without external UI frameworks, global client state libraries, databases, or CMS dependencies.

---

## Technology Stack

The application is built using the approved, lightweight technical foundation:

* **Core Framework**: [Next.js](https://nextjs.org/) `14.2.35` (App Router)
* **UI Runtime**: [React](https://react.dev/) `^18.0.0` & `react-dom` `^18.0.0`
* **Language**: [TypeScript](https://www.typescriptlang.org/) `^5.0.0` (Strict Mode enabled)
* **Schema Validation**: [Zod](https://zod.dev/) `^4.6.5` (Unified client and server validation schemas)
* **Content Parsing**: [gray-matter](https://github.com/jonschlinkert/gray-matter) `^4.0.3` (Local Markdown frontmatter extraction)
* **Styling**: Vanilla CSS Modules with custom design tokens (`src/styles/tokens.css` and `src/styles/globals.css`)
* **Typography**: Self-hosted via `next/font/google` (`Playfair Display`, `Inter`, `JetBrains Mono`)
* **Linting**: ESLint `^8.0.0` with `eslint-config-next` `14.2.35`

No third-party CSS frameworks (Tailwind, MUI, Chakra), global client state libraries (Redux, Zustand), or headless CMS systems are present.

---

## Project Structure

```text
TH-WEBSITE/
├── docs/                                # Technical & Business Source of Truth
│   ├── THL_Digital_Expression_BRD.pdf   # Authoritative Business Requirements Document
│   ├── THL_Website_BRD.pdf              # Authoritative Functional Requirements Document
│   ├── The_Website_Architecture.md      # Approved Architecture Blueprint & Standards
│   └── Vercel_Deployment_Guide.md       # Production Deployment Manual
├── public/                              # Static Public Assets
│   ├── assets/
│   │   ├── brand/                       # Brand logo asset slot (logo.svg)
│   │   ├── docs/                        # Corporate profile PDF asset slot
│   │   └── leadership/                  # Executive portrait photo slots
│   └── robots.txt                       # Search engine crawler directives
├── src/
│   ├── app/                             # Next.js App Router Pages & API Routes
│   │   ├── layout.tsx                   # Root HTML shell, fonts, JSON-LD, header/footer
│   │   ├── not-found.tsx                # Custom branded 404 recovery page
│   │   ├── page.tsx                     # Homepage (8 approved sections)
│   │   ├── sitemap.ts                   # Dynamic XML sitemap generator (/sitemap.xml)
│   │   ├── about/                       # /about (Worldview, Vision, Differentiators)
│   │   ├── services/                    # /services (8 Practice Pillars)
│   │   ├── method/                      # /method (8 Methodology Stages & Accordion)
│   │   ├── work/                        # /work (Signature Projects & Industry Clusters)
│   │   ├── leadership/                  # /leadership (Co-founder Biographies & Monograms)
│   │   ├── insights/                    # /insights (Publication Directory & Empty State)
│   │   │   └── [slug]/                  # /insights/[slug] (Dynamic Markdown Article Handler)
│   │   ├── contact/                     # /contact (Discovery Intake Form & Profile Gate)
│   │   └── api/                         # Server-Side HTTP Route Handlers
│   │       ├── contact/route.ts         # POST /api/contact handler
│   │       └── download-profile/route.ts # POST /api/download-profile handler
│   ├── components/
│   │   ├── forms/                       # Interactive Form Client Components
│   │   │   ├── ContactForm.tsx          # Discovery Intake form component
│   │   │   ├── ProfileDownloadGate.tsx  # Gated profile trigger card
│   │   │   └── ProfileModal.tsx         # Accessible modal dialog
│   │   ├── layout/                      # Global Site Shell Components
│   │   │   ├── Header.tsx               # Primary navigation & desktop CTA
│   │   │   ├── MobileNav.tsx            # Accessible mobile drawer component
│   │   │   └── Footer.tsx               # 4-column corporate footer
│   │   ├── method/                      # Methodology Components
│   │   │   └── MethodAccordion.tsx      # Mobile interactive disclosure accordion
│   │   └── ui/                          # Reusable Primitives
│   │       ├── Button.tsx               # Polymorphic button/anchor
│   │       ├── Card.tsx                 # Structural container card
│   │       ├── Container.tsx            # Standard (1200px) and narrow (680px) containers
│   │       ├── Logo.tsx                 # Restrained brand slot component
│   │       └── SectionHeading.tsx       # Semantic heading primitive
│   ├── content/
│   │   ├── insights/                    # Markdown publication repository (.md/.mdx)
│   │   └── static/                      # Approved Corporate Content Datasets
│   │       ├── differentiators.ts       # 8 corporate differentiators
│   │       ├── leadership.ts            # Executive founder profiles
│   │       ├── method.ts                # 8 delivery methodology stages
│   │       ├── projects.ts              # 5 signature projects & industry clusters
│   │       ├── services.ts              # 8 practice pillars & outcomes
│   │       └── worldview.ts             # 5 core philosophical tenets & vision/mission
│   ├── lib/                             # Core Domain & Integration Abstractions
│   │   ├── insights.ts                  # Local Markdown reader & parser
│   │   ├── lead-repository.ts           # Provider-neutral LeadRepository interface
│   │   ├── notifications.ts             # Provider-neutral Email & WhatsApp notifiers
│   │   ├── rate-limit.ts                # Provider-neutral RateLimiter interface
│   │   ├── seo.ts                       # Corporation JSON-LD structured data generator
│   │   └── validation.ts                # Zod schemas for contact & profile forms
│   └── styles/
│       ├── globals.css                  # Modern reset, focus indicators, skip-link
│       └── tokens.css                   # Brand palette, fluid typography, 8pt spacing grid
├── .env.example                         # Environment configuration template
├── next.config.mjs                      # Security headers, CSP, and Next.js config
├── package.json                         # Project dependencies and npm scripts
└── tsconfig.json                        # Strict TypeScript compiler options
```

---

## Public Routes

| Route | Content & Responsibility | Render Strategy |
| :--- | :--- | :--- |
| `/` | Homepage: Hero, The Standard, What We Do, How We Work, Track Record, Industries, Conditional Insights preview, Closing CTA. | Static (SSG) |
| `/about` | Corporate identity, worldview (5 philosophical beliefs), vision, mission, 8 differentiators, and CAC corporate registration details. | Static (SSG) |
| `/services` | Eight core practice pillars, anchor jump links (`#research` to `#capability`), outcome statements, and sub-service placeholders. | Static (SSG) |
| `/method` | Eight-stage methodology (01 Discover to 08 Scale), activities, deliverables, desktop grid, and mobile interactive accordion. | Static (SSG) |
| `/work` | Five signature projects (LinguaRoots, ChurchFlow, Crowdfunding, Enterprise Transformation, MSME Intelligence), industry clusters, and confidentiality statement. | Static (SSG) |
| `/leadership` | Co-founder biographies (Benjamin I. Shekari & Ayodeji Olaniyan) with architectural monogram placeholders. | Static (SSG) |
| `/insights` | Editorial knowledge index. Gracefully displays *"Publications in Preparation"* while zero published articles exist. | Static (SSG) |
| `/insights/[slug]` | Dynamic article reader (680px narrow column). Returns HTTP 404 for ungenerated slugs when no articles are published. | Static (Dynamic SSG) |
| `/contact` | Engagement protocol (3 steps), direct corporate contact information, interactive Discovery Intake form, and Corporate Profile gate. | Static (SSG) |
| `/sitemap.xml` | Search engine XML sitemap containing all verified routes and automatic dynamic inclusion of future published articles. | Dynamic XML |
| `/robots.txt` | Standard search crawler instructions referencing `https://thinkinghead.ng/sitemap.xml`. | Static text |

---

## API Endpoints

The website exposes two server-side Next.js Route Handlers configured with input validation, payload size constraints, honeypot protection, sliding-window rate limiting, and safe error responses.

### `POST /api/contact`

* **Purpose**: Accepts and processes inbound Discovery Call requests from prospective clients.
* **Payload Constraints**: Maximum request size of 50 KB; Content-Type `application/json`.
* **Accepted Fields**:
  * `name`: string (2–100 characters, trimmed)
  * `organisation`: string (2–120 characters, trimmed)
  * `role`: string (2–100 characters, trimmed)
  * `email`: string (valid email format, max 120 characters)
  * `phone`: string (7–25 characters, valid phone format)
  * `challenge`: string (10–2000 characters)
  * `client_secondary_contact`: string (optional honeypot field)
* **Anti-Spam Honeypot**: If `client_secondary_contact` is populated by automated bots, the request is immediately rejected with HTTP `403 Forbidden`.
* **Rate Limiting**: Throttled to a maximum of 5 requests per 10-minute sliding window per client IP. Exceeded requests return HTTP `429 Too Many Requests` with a `Retry-After` header.
* **Lead Persistence**: Normalized into a `LeadRecord` (`type: 'discovery_call'`) and passed to `LeadRepository.saveLead()`. The current repository uses `DevelopmentLoggingLeadRepository` (console logging) until a permanent production database is selected.
* **Notifications**: Dispatched asynchronously via `EmailNotifier` and `WhatsAppNotifier`. Failures do not interrupt client confirmation or duplicate leads.
* **Success Response (HTTP 201)**:
  ```json
  {
    "success": true,
    "message": "We’ve received your message. You’ll hear from Ben within 24 hours.",
    "leadId": "dev-lead-..."
  }
  ```

---

### `POST /api/download-profile`

* **Purpose**: Verifies client credentials prior to releasing the ThinkingHead Corporate Profile document.
* **Accepted Fields**:
  * `name`: string (2–100 characters, trimmed)
  * `email`: string (valid email format, max 120 characters)
  * `organisation`: string (2–120 characters, trimmed)
  * `client_secondary_contact`: string (optional honeypot field)
* **Honeypot & Rate Limiting**: Rejects bot submissions (HTTP 403) and throttles excessive requests (HTTP 429).
* **Asset Availability Check**: Checks the physical file system for `public/assets/docs/THL_Corporate_Profile.pdf`.
* **Controlled Fallback Response (HTTP 200)**:
  Because the official 16-page PDF has not yet been delivered by ThinkingHead, the endpoint returns a controlled editorial response without fabricating a dummy file:
  ```json
  {
    "success": true,
    "message": "Thank you for your interest. The official 16-page Corporate Profile is currently in final editorial preparation. We have logged your verified request and will deliver it directly to your email as soon as published.",
    "fileAvailable": false
  }
  ```
* **Architectural Note**: Files placed under `public/assets/docs/` are inherently addressable by direct URL. If cryptographic gating is required in production, authenticated tokenized streaming should be implemented.

---

## Local Development Setup

### Prerequisites

* **Node.js**: `18.18.0` or higher (`20.x` LTS recommended)
* **npm**: `9.x` or higher (verified via `package-lock.json`)
* **Git**

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:iBotayo/TH-WEBSITE.git
   cd TH-WEBSITE
   ```
2. Install project dependencies:
   ```bash
   npm install
   ```

---

## Environment Variables

Copy `.env.example` to create your local environment file:

```bash
cp .env.example .env.local
```

### Active Variables

| Variable | Description | Default / Example Value |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL used for metadata and sitemap | `https://thinkinghead.ng` |
| `LEAD_STORAGE_PROVIDER` | Identifies active lead persistence implementation | `development_logging` |
| `NOTIFICATION_RECIPIENT_EMAIL` | Official notification destination for discovery intake | `thinkingheadng@gmail.com` |
| `SYSTEM_FROM_EMAIL` | Transactional dispatch sender address | `hello@thinkinghead.ng` |

> [!NOTE]
> `.env.local` is **not strictly required** for local development. In the absence of `.env.local`, the application falls back safely to internal defaults and logs lead submissions to stdout. Never commit production secrets, database credentials, or API keys to version control.

---

## Running the Development Server

Start the Next.js development server:

```bash
npm run dev
```

The application will be accessible at:

```text
http://localhost:3000
```

---

## Production Build

To test and compile the production bundle locally:

```bash
npm run build
```

This executes `next build`, compiling TypeScript, generating static pages (SSG), bundling client chunks, and verifying all static routes.

To run the compiled production server locally:

```bash
npm start
```

---

## Available NPM Scripts

All scripts defined in `package.json`:

| Command | Action |
| :--- | :--- |
| `npm run dev` | Launches the Next.js development server on `http://localhost:3000`. |
| `npm run build` | Compiles the production build, optimizes assets, and generates static pages. |
| `npm start` | Starts the production server using the compiled `.next` build output. |
| `npm run lint` | Runs Next.js ESLint to detect syntax, styling, and Core Web Vitals issues. |
| `npm run type-check` | Executes `tsc --noEmit` to verify TypeScript types across all files with zero output. |

---

## Content Management

Approved corporate content is maintained in static, strongly-typed TypeScript files located under `src/content/static/`:

* `worldview.ts`: 5 core philosophical tenets and vision/mission statements.
* `differentiators.ts`: 8 corporate differentiators.
* `services.ts`: 8 practice pillars, outcome statements, and sub-service copy slots.
* `method.ts`: 8 delivery methodology stages, activities, and deliverables.
* `projects.ts`: 5 signature engagements, industry clusters, and confidentiality statement.
* `leadership.ts`: Executive leadership biographies for Benjamin I. Shekari and Ayodeji Olaniyan.

This architecture intentionally avoids a CMS for the MVP, ensuring near-instant page loads, zero database overhead, and zero operational attack surface. Content changes must only be made from approved ThinkingHead source material.

---

## Insights / Editorial Content

The publishing engine is located in `src/lib/insights.ts` and reads Markdown files from `src/content/insights/`:

* **File Format**: Standard Markdown (`.md` or `.mdx`) with frontmatter metadata:
  ```markdown
  ---
  title: "Systems Over Software: Why Nigerian Enterprise Modernisation Fails"
  slug: "systems-over-software"
  date: "2026-11-01"
  author: "Ben Shekari"
  role: "Founder & Chief Executive Officer"
  category: "Perspectives"
  readingTime: "6 min read"
  excerpt: "An analysis of why enterprise technology investments stall when organisational workflows are ignored."
  published: true
  ---

  Article content begins here...
  ```
* **Current Status**: There are currently **zero approved articles** in the repository.
* **Controlled Empty State**: `/insights` displays the approved notice: *"Publications in Preparation — Approved Articles Forthcoming — No Fictional Content Published"*.
* **Dynamic Article Route**: `/insights/[slug]` renders the article within a 680px reading column when published, or returns a clean 404 if the slug does not exist.
* **Homepage Integration**: The homepage Insights preview section is conditionally omitted when zero published articles exist.

---

## Forms and Validation

The interactive Discovery Intake form (`src/components/forms/ContactForm.tsx`) and Corporate Profile request modal (`src/components/forms/ProfileModal.tsx`) adhere to strict validation and accessibility standards:

1. **Client-Side Validation**: Evaluates inputs against authoritative Zod schemas (`src/lib/validation.ts`) before dispatching HTTP requests, providing instant feedback and focusing the first erroneous field.
2. **Server-Side Validation**: Re-validates all submissions in Route Handlers (`src/app/api/contact/route.ts` and `src/app/api/download-profile/route.ts`).
3. **Accessibility**: Form controls link labels via `htmlFor`/`id`, announce errors via `aria-invalid="true"` and `aria-describedby`, maintain visible focus rings, and provide accessible loading states.
4. **Modal Dialog**: Implements `role="dialog"`, `aria-modal="true"`, dynamic focus trapping, `Escape` key listener, backdrop click closing, and focus restoration to the trigger element.

---

## Security

The website incorporates defense-in-depth controls configured in `next.config.mjs` and API handlers:

* **Strict Content Security Policy (CSP)**: Scoped strictly to `'self'`, permitting inline styles and scripts necessary for Next.js runtime hydration; zero `unsafe-eval`; zero third-party domain wildcards.
* **Strict-Transport-Security (HSTS)**: `max-age=31536000; includeSubDomains` (preload uncommitted until domain verification).
* **Frame Protection**: `X-Frame-Options: DENY` (prevents clickjacking).
* **MIME Sniffing Protection**: `X-Content-Type-Options: nosniff`.
* **Referrer Policy**: `strict-origin-when-cross-origin`.
* **Information Disclosure**: `poweredByHeader: false` suppresses `X-Powered-By: Next.js`. API responses return sanitized error messages without stack traces, database details, or credentials.
* **Honeypot & Rate Limiting**: Anti-spam honeypot fields reject automated submissions with HTTP 403; sliding-window rate limiting throttles excessive requests with HTTP 429.

> [!WARNING]
> **Rate Limiting Limitation**: The current `MemoryRateLimiter` operates in single-process memory. In multi-container or serverless deployments, each instance maintains separate memory. A distributed adapter (e.g. Upstash Redis or Vercel Edge Middleware) must be configured if multi-region throttling is required.

---

## SEO Implementation

* **Metadata**: Unique title templates, OpenGraph tags, and meta descriptions across every page.
* **Structured Data**: `Corporation` JSON-LD schema embedded in the root `<head>` with official CAC registration (`RC 8611016`), headquarters address, email, telephone, and founder records.
* **Dynamic Sitemap**: Serves valid XML at `/sitemap.xml` automatically registering public routes and future published insight articles.
* **Robots Directives**: Sourced at `/robots.txt` referencing the sitemap index.
* **Analytics**: Zero third-party tracking scripts or pixels exist in the codebase.

---

## Accessibility

* **Semantic HTML**: Proper `<header>`, `<nav>`, `<main id="main-content">`, `<section>`, `<article>`, and `<footer>` landmarks.
* **Heading Hierarchy**: Strictly one `<h1>` per page with properly nested `<h2>` and `<h3>` tags.
* **Skip Navigation**: Accessible top-level skip link jumps keyboard focus directly to `#main-content`.
* **Focus States**: High-contrast 2px focus ring (`:focus-visible`) configured globally via `--color-focus`.
* **Touch Targets**: All interactive elements (drawer trigger, buttons, links, form inputs) meet or exceed the 44px × 44px minimum tap target.
* **Reduced Motion**: `@media (prefers-reduced-motion: reduce)` respected across all modals, drawers, and CSS transitions.

---

## Responsive Design

Tested and verified across standard device viewports:

* **Mobile (375px)**: Fluid single-column layouts, mobile navigation drawer, interactive methodology accordion, and responsive form inputs with zero horizontal scrolling.
* **Tablet (768px)**: 2-column leadership cards, responsive 3-column industry cluster grids.
* **Desktop (1024px & 1280px+)**: Sticky corporate navigation header, 2-column contact/direct channel layout, 2-column methodology timeline, and max-width 1200px centered containers.

---

## Corporate Profile Status

The official 16-page ThinkingHead Corporate Profile PDF has not yet been delivered by ThinkingHead. The repository does not contain a fake or placeholder document.

When delivered, the approved PDF should be placed at:

```text
public/assets/docs/THL_Corporate_Profile.pdf
```

The route handler `POST /api/download-profile` automatically checks for the existence of this file and will switch from the controlled *"in editorial preparation"* notice to direct file delivery once the document is present.

---

## Missing & Pending Production Items

Before production cutover, the following items require external delivery or business sign-off:

### 1. Client Assets Required
* **Official Vector Logo**: `public/assets/brand/logo.svg` (Typographical slot active in `Logo.tsx`).
* **Official Founder Headshots**: `public/assets/leadership/benjamin-shekari.jpg` & `ayodeji-olaniyan.jpg` (Monogram badges active in `leadership/page.tsx`).
* **16-Page Corporate Profile PDF**: `public/assets/docs/THL_Corporate_Profile.pdf`.
* **Approved Inaugural Insights Articles**: `src/content/insights/*.md`.

### 2. Business Decisions Required
* **Lead Storage Destination**: Selection of production lead persistence target (PostgreSQL database, Supabase, Google Sheets API, or CRM webhook).
* **Transactional Email Provider**: Selection of SMTP/API service (Resend, Postmark, AWS SES, or Brevo).
* **WhatsApp Notification Provider**: Selection of WhatsApp Business API provider (Meta Cloud API, Twilio, or Termii).
* **Protected Profile Delivery**: Decision on whether the Corporate Profile requires authenticated tokenized streaming or public static URL addressability once supplied.

### 3. Production Configuration Required
* Vercel project creation & GitHub repository linkage.
* DNS configuration for `thinkinghead.ng` and `www.thinkinghead.ng`.
* Production environment variables configured in hosting dashboard.

---

## Deployment

The website is optimized for deployment on **Vercel**. For detailed configuration instructions, environment variable setup, DNS records, and serverless runtime behavior, consult:

* [docs/Vercel_Deployment_Guide.md](docs/Vercel_Deployment_Guide.md)

---

## Deployment Limitations

1. **Process-Local Rate Limiting**: In-memory rate limiting does not synchronize across distributed serverless regions.
2. **Development Lead Logging**: Inbound leads currently log to stdout. A permanent database or webhook adapter must be configured before production launch.
3. **No Production Email / WhatsApp Provider**: Notifications currently execute console stubs until business credentials are provided.
4. **Static Corporate Profile Addressability**: Placing the PDF directly under `public/assets/docs/` makes it accessible to anyone with the exact URL.
5. **No Published Insights**: The Insights section operates in editorial standby mode until approved articles are supplied.
6. **Missing Official Assets**: Vector logo, executive headshots, and Corporate Profile PDF await client delivery.

---

## Testing and Validation

Validate code quality and build integrity before committing:

```bash
# 1. Verify TypeScript types across all files (strict mode)
npm run type-check

# 2. Verify ESLint compliance
npm run lint

# 3. Verify static page generation and production build
npm run build
```

### Phase 4 Validation Status
* **TypeScript Compiler Check**: `0 errors`
* **ESLint Core Web Vitals**: `0 errors, 0 warnings`
* **Production Build**: `15/15 static and dynamic pages generated`
* **Shared First Load JS**: `87.8 kB` (All marketing content pages under 98 kB)

---

## Development Guidelines

1. **Preserve Approved Content**: Do not fabricate corporate claims, testimonials, statistics, client names, leadership achievements, or case-study outcomes.
2. **Preserve Architecture**: Do not introduce databases, CMS platforms, UI libraries, or authentication without documented business approval.
3. **Maintain Provider Neutrality**: Keep integration interfaces (`LeadRepository`, `RateLimiter`, `EmailNotifier`, `WhatsAppNotifier`) abstracted from vendor SDKs.
4. **Server Components by Default**: Reserve `'use client'` strictly for interactive controls (`MobileNav`, `MethodAccordion`, `ContactForm`, `ProfileDownloadGate`, `ProfileModal`).
5. **Never Commit Secrets**: Keep `.env.local` untracked in `.gitignore`.
6. **Validate Continuously**: Run `npm run type-check && npm run lint && npm run build` before pushing changes.

---

## Contribution & Change Workflow

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Implement your changes following project development guidelines.
3. Run the validation suite: `npm run type-check && npm run lint && npm run build`
4. Review your git diff: `git diff`
5. Commit with a concise message: `git commit -m "feat: description of change"`
6. Push the branch and open a Pull Request.

---

## License

No license file is currently included in the repository. All rights reserved by ThinkingHead Nigeria Limited.

---

## Maintainers & Ownership

* **Entity**: ThinkingHead Nigeria Limited (RC 8611016)
* **Headquarters**: 5 Pipeline Road, Bayan Dutse, Kaduna, Nigeria
* **Contact**: [hello@thinkinghead.ng](mailto:hello@thinkinghead.ng)
* Repository ownership and access details are maintained separately by ThinkingHead leadership.

---

## Documentation References

* [The Website Architecture](docs/The_Website_Architecture.md) — Technical blueprint and standards
* [Vercel Deployment Guide](docs/Vercel_Deployment_Guide.md) — Production deployment instructions
<!-- * `docs/THL_Digital_Expression_BRD.pdf` — Authoritative Digital Expression Requirements
* `docs/THL_Website_BRD.pdf` — Authoritative Website Functional Requirements -->
