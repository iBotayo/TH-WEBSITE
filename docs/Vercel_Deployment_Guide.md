# ThinkingHead Nigeria Limited — Vercel Deployment & Production Readiness Guide

This guide documents the technical requirements, deployment procedures, and production considerations for hosting the ThinkingHead corporate website on Vercel.

---

## 1. Hosting Architecture Overview

The ThinkingHead website is built on **Next.js 14 App Router** with a hybrid static and dynamic architecture:

* **Static Content Layer (SSG)**: Pre-rendered at build time and served directly from the Vercel Global Edge Network (CDN).
  * `/` (Homepage)
  * `/about` (Worldview, Vision, Differentiators)
  * `/services` (Eight Core Service Pillars)
  * `/method` (Eight-Stage Methodology)
  * `/work` (Signature Projects & Industry Clusters)
  * `/leadership` (Executive Biographies & Monogram Placeholders)
  * `/insights` (Publication Index & Editorial Empty State)
  * `/insights/[slug]` (Dynamic Markdown Article Handler)
  * `/contact` (Interactive Discovery Intake & Profile Gate)
  * `/sitemap.xml` (Automated Dynamic XML Sitemap)
  * `/_not-found` (Custom 404 Recovery Page)
* **Dynamic Serverless Function Layer**: Executed on-demand via Node.js Serverless Functions:
  * `POST /api/contact` (Discovery Intake Processing)
  * `POST /api/download-profile` (Gated Corporate Profile Requests)

---

## 2. Vercel Build Configuration

When importing the repository to Vercel, use the following standard settings:

| Setting | Value |
| :--- | :--- |
| **Framework Preset** | Next.js |
| **Root Directory** | `./` |
| **Build Command** | `npm run build` (or `next build`) |
| **Output Directory** | `.next` (automatically detected) |
| **Install Command** | `npm install` |
| **Node.js Version** | `20.x` (Recommended) |

---

## 3. Environment Variables

Configure the following variables in the **Vercel Project Settings → Environment Variables**:

| Variable | Target Environments | Purpose | Example Value |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Production, Preview | Canonical URL for sitemap and metadata | `https://thinkinghead.ng` |
| `LEAD_STORAGE_PROVIDER` | Production | Identifies active persistence adapter | `development_logging` (until DB approved) |
| `NOTIFICATION_RECIPIENT_EMAIL` | Production | Official lead notification destination | `thinkingheadng@gmail.com` |
| `SYSTEM_FROM_EMAIL` | Production | Transactional dispatch address | `hello@thinkinghead.ng` |

> [!NOTE]
> Production-specific credentials (database connection strings, SMTP/API keys for Resend/Postmark, Meta WhatsApp Cloud API tokens) must only be added when ThinkingHead leadership provides approved provider selection and credentials.

---

## 4. Production Domain & DNS Setup

To link the custom domain `thinkinghead.ng`:

1. In Vercel, navigate to **Settings → Domains**.
2. Add `thinkinghead.ng` and `www.thinkinghead.ng`.
3. Configure DNS records at your domain registrar:
   * **Apex Domain (`thinkinghead.ng`)**: `A` record pointing to `76.76.21.21` (or registrar ALIAS/ANAME to `cname.vercel-dns.com`).
   * **Subdomain (`www.thinkinghead.ng`)**: `CNAME` record pointing to `cname.vercel-dns.com`.
4. Vercel automatically provisions and renews SSL/TLS certificates via Let's Encrypt.

---

## 5. Production Limitations & Transition Paths

### 5.1 In-Memory Rate Limiting
* **Current State**: Uses `MemoryRateLimiter`, which maintains request timestamps in Node.js process memory.
* **Serverless Limitation**: Vercel serverless functions spin up and terminate dynamically across multiple isolated execution environments. In-memory state is not shared between concurrent instances.
* **Production Recommendation**: Prior to high-volume campaigns, swap the `RateLimiter` interface implementation with an Upstash Redis or Vercel Edge Middleware sliding-window limiter.

### 5.2 Gated Profile Asset Addressability
* **Current State**: The 16-page Corporate Profile PDF has not yet been delivered by ThinkingHead.
* **Security Consideration**: If placed directly under `public/assets/docs/THL_Corporate_Profile.pdf`, the file is statically served by the CDN and directly accessible by URL if the link is shared.
* **Production Recommendation**: If strict access control is required, transition the PDF to a private serverless route handler that streams the file only after form submission verification.

### 5.3 Missing Official Assets
The following assets are pending delivery from ThinkingHead:
1. `public/assets/brand/logo.svg` (Official Vector Logo)
2. `public/assets/leadership/benjamin-shekari.jpg` & `ayodeji-olaniyan.jpg` (Executive Headshots)
3. `public/assets/docs/THL_Corporate_Profile.pdf` (16-Page Corporate Profile PDF)
4. `src/content/insights/*.md` (Inaugural Thought-Leadership Publications)
