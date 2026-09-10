# AGENTS.md

## 1. Role

You are the primary coding agent for this project.

The project is a romantic interactive birthday website.

Your job is to produce code that is:

* Beautiful
* Emotional
* Modern
* Maintainable
* Responsive
* Performant
* Accessible
* Production-ready

Do not treat this project like a generic CRUD application or dashboard.

The emotional and visual experience is the primary product.

---

# 2. Read Before Coding

Before modifying the project:

1. Read `TECHSTACK.md`.
2. Inspect the existing project structure.
3. Inspect `package.json`.
4. Inspect `Cargo.toml`.
5. Check existing components before creating new ones.
6. Reuse existing utilities when appropriate.

Never ignore `TECHSTACK.md`.

If a proposed implementation conflicts with `TECHSTACK.md`, follow `TECHSTACK.md` unless the user explicitly changes the requirement.

---

# 3. Technology Rules

## Frontend

Use:

* Next.js 16.3.3
* React 19.2.8
* TypeScript
* Tailwind CSS 4.3.x
* shadcn/ui 4.11.0
* Motion 13.1.1

Do not introduce alternative frameworks.

Do not use:

* Bootstrap
* Material UI
* Chakra UI
* styled-components
* Emotion
* jQuery

unless explicitly requested.

---

# 4. Backend Rules

Backend language:

```text
Rust
```

Target:

```text
Rust 1.98.1
Edition 2024
```

Deployment:

```text
Vercel Rust Runtime
```

Use:

```text
vercel_runtime 2.x
```

Do not use the deprecated community:

```text
vercel-rust
```

Do not create a traditional always-running Axum server for Vercel.

Rust backend code must be compatible with Vercel Functions.

---

# 5. No Database

This project does not use a database.

Do not add:

* PostgreSQL
* MySQL
* MongoDB
* SQLite
* Prisma
* Drizzle
* Redis
* Supabase
* Firebase

unless explicitly requested.

All birthday content should remain local to the project.

---

# 6. Assets

All personal images must be stored locally.

Recommended location:

```text
public/images/
```

Audio:

```text
public/audio/
```

Fonts:

```text
public/fonts/
```

Decorations:

```text
public/decorations/
```

Do not upload personal photos to external image hosting services.

Do not replace local assets with external URLs unless explicitly requested.

---

# 7. Visual Design Rules

The website must feel:

```text
romantic
warm
personal
elegant
soft
modern
```

Avoid:

```text
corporate
dashboard
generic landing page
overly childish
overly neon
cheap template
```

The design should look intentionally created for a crush / loved one.

---

# 8. Animation Rules

Use Motion for complex UI animation.

Use CSS for simple continuous effects.

Preferred effects:

* Fade
* Scale
* Blur
* Soft slide
* Floating
* Parallax
* Heart particles
* Bubbles
* Balloons
* Confetti
* Sparkles
* Fireworks

Animations should be:

* Smooth
* Subtle
* Purposeful

Do not animate everything.

Animation should enhance the emotional experience rather than distract from the message.

---

# 9. Intro Experience

The initial page must have an intentional intro.

Target duration:

```text
~3 seconds
```

Suggested sequence:

```text
Page opens
   ↓
Soft visual reveal
   ↓
Short personal message
   ↓
3
   ↓
2
   ↓
1
   ↓
Main birthday experience
```

Do not make the intro feel like a loading screen.

It should feel like a dramatic reveal.

---

# 10. Birthday Experience

The main experience should prioritize the birthday message.

Recommended hierarchy:

```text
Greeting
    ↓
Photo
    ↓
Personal message
    ↓
Birthday card
    ↓
Decorative effects
```

The user should be able to read the message comfortably.

Never let particles or decorations cover important text.

---

# 11. Personal Photos

When implementing photo components:

* Preserve image quality.
* Use correct aspect ratios.
* Avoid aggressive cropping.
* Use `object-fit` intentionally.
* Add subtle borders or frames.
* Animate images gently.

Do not apply heavy filters unless requested.

Photos should remain the emotional focus.

---

# 12. Component Architecture

Prefer small reusable components.

Example:

```text
components/
├── birthday/
│   ├── BirthdayHero.tsx
│   ├── BirthdayCard.tsx
│   ├── BirthdayMessage.tsx
│   └── PhotoGallery.tsx
│
├── effects/
│   ├── FloatingHearts.tsx
│   ├── Balloons.tsx
│   ├── Fireworks.tsx
│   └── Sparkles.tsx
│
└── ui/
```

Do not create a component for every tiny `<div>`.

Create components when they:

* Have meaningful behavior
* Are reused
* Improve readability
* Represent a meaningful UI concept

---

# 13. Client Components

Use `"use client"` only when necessary.

A component should be a Client Component when it requires:

* `useState`
* `useEffect`
* Browser APIs
* Event handlers
* Motion interactions requiring client execution

Do not turn the entire application into a Client Component unnecessarily.

---

# 14. TypeScript

TypeScript must use strict typing.

Avoid:

```typescript
any
```

unless there is a genuinely unavoidable reason.

Prefer:

```typescript
type
interface
unknown
generics
```

over unsafe casting.

Do not silence TypeScript errors without understanding the underlying problem.

Avoid:

```typescript
// @ts-ignore
```

and

```typescript
// @ts-nocheck
```

---

# 15. Rust

Rust code must be idiomatic.

Prefer:

* Strong types
* `Result`
* `Option`
* Explicit error handling
* Small functions
* Clear modules
* Minimal dependencies

Avoid:

* `unwrap()` in production request paths
* `expect()` without a meaningful reason
* unnecessary cloning
* global mutable state
* unnecessary macros
* unnecessary abstractions

Use `cargo fmt`.

Use `cargo clippy`.

---

# 16. API Design

Because there is no database, backend endpoints should remain extremely simple.

Good:

```text
GET /api/health
```

Potential:

```text
GET /api/birthday
```

Bad:

```text
/api/users
/api/auth
/api/database
/api/admin
```

unless the user explicitly requests those features.

Do not create APIs merely because Rust exists in the stack.

---

# 17. Styling

Use Tailwind CSS first.

Use CSS modules or global CSS only when appropriate.

For complex animations:

```text
Tailwind + CSS keyframes + Motion
```

is preferred.

Avoid giant CSS files.

Avoid inline styles unless dynamic values require them.

Do not hard-code the same color repeatedly.

Use CSS variables for the project's visual tokens.

Example:

```css
:root {
  --background: ...;
  --foreground: ...;
  --rose: ...;
  --blush: ...;
}
```

---

# 18. Responsive Design

Always test mentally and structurally for:

```text
360px
390px
430px
768px
1024px
1440px
```

Do not assume desktop dimensions.

Important birthday content must remain usable on mobile.

Avoid:

```css
position: fixed;
```

for major content unless there is a clear reason.

Avoid effects that create horizontal scrolling.

---

# 19. Accessibility

Every meaningful image needs:

```tsx
alt="..."
```

Decorative elements should use:

```tsx
aria-hidden="true"
```

Interactive elements must be keyboard accessible.

Do not use a `<div>` as a button.

Respect:

```css
prefers-reduced-motion
```

Users who disable animation should still receive the complete birthday experience.

---

# 20. Performance

Avoid excessive particle counts.

Do not render hundreds or thousands of DOM elements for decorative effects.

Prefer:

```text
CSS
Motion
Canvas
```

when appropriate.

Use lazy loading for non-critical images.

Use optimized image formats.

Avoid huge client-side dependencies.

Do not add a library when 20 lines of CSS or TypeScript can solve the problem cleanly.

---

# 21. Dependencies

Before adding a dependency, ask:

1. Is it actually necessary?
2. Can existing dependencies solve it?
3. Does it significantly improve the result?
4. Is it actively maintained?
5. Is it compatible with the current stack?

Do not add dependencies simply because they are popular.

Avoid dependency duplication.

---

# 22. Version Policy

Use stable releases only.

Never install:

```text
canary
beta
alpha
nightly
experimental
```

unless explicitly requested.

Keep dependency versions and lockfiles synchronized.

Security patches take priority over feature stability.

---

# 23. Code Quality

Before considering a feature complete:

```text
pnpm lint
pnpm build
cargo fmt --check
cargo check
cargo clippy
cargo test
```

Fix errors instead of hiding them.

Do not leave:

* console errors
* TypeScript errors
* Rust warnings that can reasonably be fixed
* broken responsive layouts
* missing alt text
* unused imports
* dead code

---

# 24. Git Rules

Use clear commit messages.

Preferred format:

```text
feat: add birthday intro animation
feat: add romantic birthday card
feat: add floating hearts
fix: prevent mobile overflow
fix: optimize birthday image loading
refactor: simplify particle animation
style: improve birthday card typography
```

Do not create meaningless commits such as:

```text
update
changes
fix stuff
final
final-final
```

---

# 25. Agent Behavior

When implementing a feature:

1. Understand the existing code.
2. Plan the smallest clean implementation.
3. Reuse existing components.
4. Implement.
5. Check types.
6. Check lint.
7. Check build.
8. Check responsive behavior.
9. Check accessibility.
10. Review visual hierarchy.

Do not rewrite unrelated files.

Do not refactor the entire project when fixing one small issue.

---

# 26. Do Not Over-Engineer

This is a personal birthday website.

Do not introduce enterprise architecture.

Do not create:

* repositories
* services
* factories
* dependency injection containers
* event buses
* CQRS
* complex state management

unless the project genuinely requires them.

Prefer simple code that another developer can understand immediately.

---

# 27. Content Rules

The birthday message should feel human.

Avoid generic AI-sounding sentences such as:

```text
May your special day be filled with endless joy,
boundless happiness, and countless beautiful memories.
```

Prefer natural, personal language.

The content should feel like:

```text
a real person wrote this
for one specific person
```

The developer should preserve any personal wording supplied by the user.

Do not invent intimate memories or personal facts about the recipient.

Use placeholders when information has not been provided:

```text
[NAME]
[PERSONAL MESSAGE]
[MEMORY]
[PHOTO]
```

---

# 28. Privacy

Personal photos and personal messages are sensitive project assets.

Never:

* Upload them to third-party services
* Send them to external APIs
* Put them into analytics payloads
* Log their contents
* Expose unnecessary metadata

Keep personal assets inside the repository unless explicitly instructed otherwise.

---

# 29. Deployment Rules

Target:

```text
GitHub → Vercel
```

The project must be deployable without manually running a persistent backend server.

Rust must use Vercel's official Rust runtime.

Do not depend on:

```text
Docker server
VM
VPS
persistent process
```

for production deployment.

---

# 30. Final Quality Standard

Before declaring the website finished, it should feel like:

> "Someone spent time making this specifically for her."

It should NOT feel like:

> "Someone downloaded a birthday website template."

Visual polish, emotional pacing, typography, photography, animation and personal writing are more important than adding unnecessary technical features.

When choosing between:

```text
more technology
```

and

```text
better experience
```

choose the better experience.
