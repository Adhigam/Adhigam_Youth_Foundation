# Adhigam Youth Foundation - React Architecture & Documentation

This document provides a comprehensive overview of the Adhigam Youth Foundation website's structure, technology stack, and component architecture following the migration to a modern React ecosystem. 

## Technology Stack

The project has been scaled from raw HTML/CSS/JS to a sophisticated single-page React frontend.

- **Core Framework**: [React 19](https://react.dev/) via [Vite](https://vitejs.dev/) (for blazing-fast build tooling and Hot Module Replacement).
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for a highly modular, utility-first styling methodology combined with native modern CSS definitions.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for fluid page transitions, scroll animations, and interactive component lifecycles.
- **Icons**: [Lucide React](https://lucide.dev/) for a consistent, lightweight, and modern SVG icon system.
- **Deployment**: Configured out of the box for serverless deployment on [Vercel](https://vercel.com/) via the `vercel.json` file.

---

## Directory Structure Overview

Now that the application has been flattened to the root directory, the structure represents a standard production-grade Vite environment:

```text
/ (Project Root)
├── .gitignore              # Specifies intentionally untracked files for Git
├── eslint.config.js        # Strict linting rules to ensure code quality
├── index.html              # The foundational HTML file (entry point mapped by Vite)
├── package.json            # Node dependencies and project scripts
├── postcss.config.js       # PostCSS processor rules, essential for Tailwind CSS
├── tailwind.config.js      # Global layout tokens, custom color themes, and font configurations
├── vercel.json             # Vercel deployment configurations mapped to target the `dist` build
├── vite.config.js          # Vite compiler and plugin integrations
│
├── /public                 # Static assets that bypass the asset compiler (favicons, absolute images)
│   ├── Adhigam_Logo.jpg    # Main organization branding
│   ├── favicon.svg         # Tab-bar logo
│   └── /asset              # Global image library (webp format for optimized loading)
│
└── /src                    # The powerhouse directory holding all dynamic React source code
    ├── App.jsx             # The root container merging all UI sections together
    ├── App.css             # Supplementary styling for the App wrapper
    ├── index.css           # Contains Tailwind import directives and global vanilla CSS scope
    ├── main.jsx            # The React Virtual DOM rendering injection point
    │
    ├── /assets             # Compiled local imagery/SVGs accessed directly inside components
    │
    └── /components         # Highly modular, single-responsibility UI building blocks
```

---

## Component Architecture (`/src/components`)

The core architecture operates as a **Single Page Application (SPA)** that layers individual semantic components vertically. Users navigate by scrolling natively down the page.

Each component is encapsulated in its own `.jsx` file:

- **`Navbar.jsx`**: A fixed/sticky global navigation header linking to different sections internally.
- **`Hero.jsx`**: The critical top-fold landing banner designed for maximum impact and immediate user engagement.
- **`About.jsx`**: The "Who We Are" text-driven section detailing Adhigam's mission overlayed with design assets.
- **`Programs.jsx`**: A grid or list-view module showcasing the foundational programs (Kathak, Theater, Creative Learning).
- **`Impact.jsx`**: A data-driven display (likely utilizing statistics/counters) to visually validate the foundation's socio-economic footprint.
- **`Events.jsx`**: Section detailing recent or upcoming organizational happenings and campaigns.
- **`Gallery.jsx`**: A visual masonry or grid component providing an immersive look into Adhigam's real-world impact.
- **`Testimonials.jsx`**: Social-proof UI module rotating voices and feedback from those touched by the foundation.
- **`Volunteer.jsx`**: Action-oriented form layout encouraging visitors to donate their time and register.
- **`Donate.jsx`**: High-priority financial contribution portal and guidance.
- **`Footer.jsx`**: Bottom-level site manifest featuring copyright, legal info, social links, and physical contact maps.

## Rendering Flow

1. The browser requests the page and is served `/index.html`.
2. Vite executes the linked `/src/main.jsx` script.
3. React dynamically creates its root virtual environment inside the `<div id="root">` element.
4. `App.jsx` mounts and stacks every child component (Navbar, Hero, About...) linearly, wrapping them in styling properties defined by `index.css`.
5. User navigates and visually interacts with elements powered by underlying framer-motion declarative animations.

## Deployment Lifecycle
- Triggered by pushes into the `main` branch.
- Vercel automatically runs the `$ npm run build` script defined in `package.json`.
- Vite spins up a compiler, minifies the code, bundles assets efficiently, and saves production files strictly to the local `/dist` directory. 
- Vercel routes incoming traffic to this finalized `/dist` cache via rules defined in `vercel.json` (also capturing client-side SPA routing loops effectively).
