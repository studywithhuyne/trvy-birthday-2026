# Birthday Website — Technical Stack

## 1. Project Overview

This project is a romantic interactive birthday website created as a personal birthday gift.

The website should feel:

* Romantic
* Warm
* Elegant
* Personal
* Soft
* Emotional
* Modern
* Interactive
* Mobile-friendly

The website is intended to be deployed on **Vercel** through **GitHub**.

There is **no database**.

All static assets such as:

* Photos
* Decorative images
* Audio
* Fonts
* Local content

must be stored inside the repository.

The website should not depend on an external CMS or database.

---

# 2. Core Technology Stack

## Frontend

### Framework

* **Next.js 16.3.3**
* App Router
* TypeScript
* React Server Components where appropriate

Next.js is the primary frontend framework and deployment framework.

Do not introduce another frontend framework.

---

## UI Library

### React

* **React 19.2.8**

React is used for interactive UI components and client-side state.

---

## Styling

### Tailwind CSS

* **Tailwind CSS 4.3.x**

Use Tailwind CSS as the primary styling system.

Do not introduce:

* Bootstrap
* Material UI
* styled-components
* Emotion
* unnecessary CSS frameworks

Custom CSS is allowed when Tailwind is insufficient, especially for:

* Complex animations
* Decorative effects
* Background effects
* Keyframes
* Special typography

---

## Component Library

### shadcn/ui

* **shadcn/ui 4.11.0**

Use shadcn/ui selectively.

Do not make the website look like a generic dashboard.

Components should be customized heavily to match the romantic birthday theme.

Prefer custom visual composition over default shadcn styling.

---

# 3. Animation

## Motion

Use:

* **Motion 13.1.1**

Motion is the primary animation library.

Use it for:

* Intro animation
* Page transitions
* Text reveal
* Card entrance
* Image reveal
* Floating hearts
* Floating balloons
* Soft hover effects
* Scroll-triggered animations
* Birthday card opening
* Emotional transitions

Avoid manually implementing complicated JavaScript animation loops when Motion can handle them.

---

# 4. Decorative Effects

The website should use lightweight 2D effects.

Preferred techniques:

1. CSS animations
2. Motion
3. SVG
4. DOM elements
5. Canvas only when necessary

Decorative effects may include:

* Hearts
* Bubbles
* Balloons
* Sparkles
* Confetti
* Fireworks
* Glowing particles
* Floating particles

Do not introduce Three.js or WebGL unless a later requirement specifically needs 3D.

This website is primarily a romantic 2D experience.

---

# 5. Backend

## Language

* **Rust 1.98.1**
* Edition **2024**

Rust is required for backend functionality.

---

## Deployment Runtime

Use:

* **Vercel Rust Runtime**
* `vercel_runtime 2.4.0`

Rust functions live inside:

```text
/api
```

Example:

```text
api/
├── health.rs
└── message.rs
```

Each Rust API entry point should be implemented as a Vercel Function.

---

# 6. Backend Architecture

The backend is intentionally small.

There is no:

* Database
* Authentication system
* ORM
* Redis
* External API dependency
* Persistent server
* WebSocket server

Rust should only provide functionality that genuinely benefits from having a backend.

Example endpoints:

```text
GET /api/health
GET /api/birthday
```

Possible future endpoints:

```text
GET /api/message
GET /api/memories
```

Static birthday content should remain in the frontend unless there is a clear reason to move it into Rust.

Do not create unnecessary backend complexity.

---

# 7. Data Storage

No database.

Project-local assets should use:

```text
public/
├── images/
├── audio/
├── fonts/
└── decorations/
```

Example:

```text
public/images/
├── birthday-01.webp
├── birthday-02.webp
├── birthday-03.webp
└── portrait.webp
```

Prefer:

* WebP
* AVIF

for photographs when appropriate.

Avoid unnecessarily large PNG/JPEG assets.

---

# 8. Suggested Project Structure

```text
birthday-website/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   │
│   ├── birthday/
│   │   └── page.tsx
│   │
│   └── components/
│       ├── intro/
│       ├── birthday-card/
│       ├── effects/
│       ├── gallery/
│       └── ui/
│
├── components/
│   ├── birthday/
│   ├── effects/
│   └── ui/
│
├── lib/
│   ├── utils.ts
│   └── constants.ts
│
├── public/
│   ├── images/
│   ├── audio/
│   ├── fonts/
│   └── decorations/
│
├── api/
│   └── health.rs
│
├── src-rs/
│   └── lib.rs
│
├── Cargo.toml
├── Cargo.lock
├── package.json
├── pnpm-lock.yaml
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── components.json
├── vercel.json
│
├── AGENTS.md
├── TECHSTACK.md
└── README.md
```

The exact structure may be simplified if a directory is unnecessary.

Do not create empty abstractions merely to match this structure.

---

# 9. User Experience

The website should follow this general flow.

## Stage 1 — Intro

When the user opens the website:

* Full-screen experience
* Soft romantic background
* Minimal text
* Elegant typography
* Subtle animation
* No overwhelming decorations immediately

Example concept:

```text
Hey...

I made something
just for you.
```

Then:

```text
3
```

```text
2
```

```text
1
```

Then transition into the main birthday experience.

The intro should last approximately **3 seconds**.

The transition should feel intentional rather than like a normal page reload.

---

# 10. Main Birthday Experience

After the intro:

```text
Happy Birthday, [Name] ♡
```

The main experience should contain:

* Birthday greeting
* Personal message
* Photos
* Birthday card
* Decorative effects
* Romantic atmosphere

The content should feel like a personal letter rather than a generic birthday template.

---

# 11. Birthday Card

The birthday card is the main visual centerpiece.

Possible structure:

```text
┌─────────────────────────────┐
│                             │
│       Happy Birthday ♡      │
│                             │
│          [Photo]            │
│                             │
│   Personal birthday text    │
│                             │
│       With love,            │
│          [Name]             │
│                             │
└─────────────────────────────┘
```

The card should have:

* Soft rounded corners
* Elegant shadows
* Subtle glass / paper texture
* Romantic typography
* Gentle entrance animation
* Photo framing
* Responsive layout

Do not make it look like an admin dashboard card.

---

# 12. Visual Direction

Recommended visual language:

### Colors

Primary:

* Soft pink
* Rose
* Blush
* Warm white
* Champagne
* Deep wine

Secondary:

* Lavender
* Soft peach
* Warm beige

Avoid excessive neon colors.

---

## Typography

Use two complementary font categories:

### Heading

Elegant serif or display font.

### Body

Clean modern sans-serif.

The combination should feel like:

```text
romantic letter
+
modern web design
```

Do not use more than 2–3 font families.

Fonts should preferably be self-hosted inside:

```text
public/fonts/
```

when licensing permits.

---

# 13. Responsive Design

Mobile-first.

The website must work well on:

* Mobile portrait
* Mobile landscape
* Tablet
* Laptop
* Desktop

Special attention must be given to:

* Photo sizes
* Birthday card width
* Floating effects
* Text wrapping
* Viewport height
* Touch interaction

Do not design desktop first and simply shrink it.

---

# 14. Performance

This is a visual website, but performance still matters.

Rules:

* Optimize all images.
* Use Next.js Image where appropriate.
* Lazy-load non-critical images.
* Avoid huge background videos.
* Avoid unnecessary JavaScript.
* Avoid excessive DOM particles.
* Respect `prefers-reduced-motion`.
* Keep animations GPU-friendly.
* Avoid continuously running expensive animation loops.

The visual experience must remain smooth on mid-range mobile devices.

---

# 15. Accessibility

The website is romantic and decorative, but accessibility is still required.

Must include:

* Semantic HTML
* Image alt text
* Keyboard-accessible interactive elements
* Visible focus states
* Sufficient text contrast
* Reduced-motion support

Decorative elements should use:

```html
aria-hidden="true"
```

when appropriate.

---

# 16. Security

Never expose secrets in the frontend.

Do not commit:

```text
.env
.env.local
*.key
*.pem
```

If environment variables are required later, use Vercel Environment Variables.

Never place sensitive information inside:

```text
NEXT_PUBLIC_*
```

unless it is intentionally public.

---

# 17. Package Management

Use **pnpm**.

All dependencies must be recorded in:

```text
package.json
pnpm-lock.yaml
```

Rust dependencies must be recorded in:

```text
Cargo.toml
Cargo.lock
```

Do not randomly mix:

* npm
* yarn
* pnpm
* bun

Use pnpm consistently for the frontend.

---

# 18. Version Policy

Use the latest stable versions available when the project is initialized.

Current baseline:

```text
Next.js       16.3.3
React         19.2.8
Tailwind CSS  4.3.x
shadcn/ui     4.11.0
Motion        13.1.1
Rust          1.98.1
Rust edition  2024
```

Do not automatically upgrade to:

* beta
* canary
* nightly
* experimental

unless explicitly requested.

Patch-level upgrades are encouraged when they contain security fixes.

Always update lockfiles together with dependency updates.

---

# 19. Deployment

Deployment target:

**Vercel**

Repository:

**GitHub**

Expected flow:

```text
Local development
       ↓
Git
       ↓
GitHub
       ↓
Vercel
       ↓
Production
```

Rust functions must be compatible with Vercel's official Rust Runtime.

Do not use the deprecated community `vercel-rust` runtime.

Vercel's official Rust runtime replaced the old community runtime.

---

# 20. Development Commands

Frontend:

```bash
pnpm install
pnpm dev
```

Production build:

```bash
pnpm build
pnpm start
```

Rust:

```bash
cargo check
cargo test
cargo build
```

Before committing:

```bash
pnpm lint
cargo check
cargo test
```

---

# 21. Engineering Philosophy

The project should prioritize:

1. Emotional impact
2. Visual quality
3. Smooth interaction
4. Performance
5. Simplicity
6. Maintainability

Do not over-engineer a birthday website.

Every technology must have a clear reason to exist.

The website should feel handcrafted for one person, not generated from a generic template.
