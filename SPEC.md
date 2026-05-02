# Abhinav Shivkumar Portfolio — Specification

## 1. Concept & Vision

A portfolio that feels like exploring a neural network — nodes connecting, signals flowing, systems thinking made visible. This isn't a resume converted to HTML. It's a living demonstration of how Abhinav thinks: interconnected, systematic, and always moving toward execution. The portfolio is proof that he builds things, not just designs them.

The core identity: **"The Doer"** — someone who ships real products, not just portfolio projects.

---

## 2. Design Language

### Aesthetic Direction
**"Neural Execution"** — Dark, immersive, code-inspired with animated neural network visualizations. The aesthetic bridges the gap between AI/ML expertise and real-world impact. Every visual element reinforces the message: this is someone who builds intelligent systems.

### Color Palette
```
Background (Primary):    #0a0a0f (Deep Void)
Background (Secondary):  #12121a (Neural Dark)
Background (Elevated):   #1a1a24 (Circuit Dark)
Accent (Primary):        #6366f1 (Electric Indigo)
Accent (Secondary):      #8b5cf6 (Neural Purple)
Accent (Tertiary):       #06b6d4 (Cyan Signal)
Text (Primary):          #f1f5f9 (Bright White)
Text (Secondary):        #94a3b8 (Neural Gray)
Success:                 #22c55e (Shipped Green)
Gradient:                linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)
```

### Typography
```
Headlines:  "Space Grotesk", system-ui, sans-serif (700 weight)
Body:       "Inter", system-ui, sans-serif (400-500 weight)
Code/Tech:  "JetBrains Mono", monospace

Scale:
- Display:  72px / 80px (hero)
- H1:       48px / 56px
- H2:       32px / 40px
- H3:       24px / 32px
- Body:     16-18px / 28px
- Caption:  12px / 16px
```

### Spatial System
- Base unit: 8px
- Section padding: 96-128px vertical
- Card padding: 24px
- Component gaps: 16-24px
- Maximum content width: 1200px

### Motion Philosophy
- **Purposeful**: Every animation reveals relationships or guides attention
- **Performance-first**: 60fps on desktop, graceful degradation on mobile
- **Neural-inspired**: Particles drift organically, connections pulse like synapses
- **Respectful**: Full `prefers-reduced-motion` support

Key animations:
1. Neural particle background — 80-120 particles, organic drift, connection lines
2. Scroll-triggered reveals — fade-up with stagger
3. Hover interactions — subtle lift, glow effects
4. Text reveals — line-by-line on hero

### Visual Assets
- **Icons**: Lucide React (consistent stroke weight)
- **Background**: Custom Canvas neural particle system
- **Project images**: Real screenshots/mockups
- **Decorative**: Circuit board patterns, gradient meshes

---

## 3. Layout & Structure

### Page Architecture
```
[Fixed Navigation - 64px]
[Neural Particle Background - Canvas, z-index: -1]

├── HERO (100vh)
│   └── Centered statement + CTAs
│
├── ABOUT (min-height: 100vh)
│   └── Personal story + Philosophy + Interests
│
├── PROJECTS (min-height: 100vh)
│   ├── Featured: Availo (full-width)
│   └── Grid: Other deployed projects
│
├── AI/ML (min-height: 100vh)
│   └── Showcase: ML projects with architecture details
│
├── SYSTEMS (min-height: 100vh)
│   └── LLD projects with architecture diagrams
│
├── CONNECT (min-height: 100vh)
│   └── Contact form + Social links
│
└── [Footer]
```

### Responsive Strategy
- **Desktop (1280px+)**: Full experience, 3-column grids, all animations
- **Tablet (640-1023px)**: 2-column grids, simplified animations
- **Mobile (320-639px)**: Single column, reduced particles (40-60), touch-optimized

### Visual Pacing
- Hero: Dramatic, full-screen, particle-rich
- About: Breathing room, asymmetric layout
- Projects: Dense, proof-focused
- AI/ML: Technical, architecture-forward
- Systems: Grid showcase, expandable details
- Connect: Open, inviting, clear CTAs

---

## 4. Features & Interactions

### Navigation
- Fixed position with backdrop blur
- Logo with subtle pulse animation
- Smooth scroll to sections
- Mobile: Full-screen overlay menu
- Active section indicator

### Hero Section
- Animated neural particle canvas (interactive on mouse move)
- Typed text effect for role/title
- Staggered CTA button reveal
- Floating "shipped" badges

### About Section
- Profile photo with neural overlay effect
- Personal narrative blocks with scroll reveal
- Interest cards (Chess, Medium, Research)
- Philosophy statement

### Projects Section
- Featured Availo card with Play Store badge
- Project cards with hover animations
- Live/GitHub link badges
- Tech stack tags
- Quote/note from Abhinav on each

### AI/ML Section
- Architecture diagrams
- Model metrics where applicable
- Animated neural network visualization
- Code/research links

### Systems Section
- Horizontal scroll showcase (optional)
- Expandable LLD cards
- Architecture diagrams
- Design pattern highlights

### Connect Section
- Contact form (email, subject, message)
- Social link cards
- External presence badges
- Resume download CTA

### Global Interactions
- Scroll progress indicator (optional)
- Section anchor links
- Keyboard navigation support
- Smooth scroll polyfill

### Edge Cases
- Empty states: N/A (static content)
- Loading: Skeleton loaders for images
- Form errors: Inline validation, clear error messages
- Offline: Service worker optional for this version

---

## 5. Component Inventory

### Button
- **Primary**: Gradient background (#6366f1 → #8b5cf6), white text
- **Secondary**: Transparent, gradient border, gradient text on hover
- **Ghost**: No background, accent text, underline on hover
- **States**: Default, Hover (brightness + scale), Active (scale down), Disabled (50% opacity), Loading (spinner)

### Badge
- **Shipped**: Green background/text (#22c55e)
- **In Progress**: Orange background/text (#f59e0b)
- **Tech**: Gray background, monospace font
- **Featured**: Cyan accent

### Card
- Background: #12121a
- Border: 1px solid #1e293b
- Radius: 16px
- Hover: Border → accent, translateY(-4px), glow shadow

### Navigation
- Height: 64px
- Background: rgba(10, 10, 15, 0.8) + backdrop-blur
- Links: #94a3b8 → #f1f5f9 on hover
- CTA: Primary button style

### Form Inputs
- Background: #12121a
- Border: 1px solid #1e293b → #6366f1 on focus
- Text: #f1f5f9
- Placeholder: #64748b
- Error state: Red border, error message below

### Neural Background
- Canvas element, fixed position, z-index: -1
- Particles: 2-4px, accent colors, 0.3-0.7 opacity
- Connections: Lines between particles <150px apart
- Performance: Auto-throttle, requestAnimationFrame

---

## 6. Technical Approach

### Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **Animation**: Framer Motion + Custom Canvas
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Space Grotesk, Inter, JetBrains Mono)
- **Deployment**: Vercel

### Architecture
```
/app
  layout.tsx        — Root layout, fonts, metadata
  page.tsx          — Single-page with all sections
  globals.css       — Tailwind + custom styles

/components
  /ui               — Button, Badge, Card, Input
  /sections          — Hero, About, Projects, AI, Systems, Connect
  /navigation        — NavBar, MobileNav
  /effects           — NeuralBackground, ScrollReveal, AnimatedText

/lib
  /data              — projects.ts, skills.ts
  /utils             — cn.ts, animations.ts

/public
  /images            — Project screenshots, profile
```

### Key Implementation Notes
- Use Intersection Observer for scroll animations
- Canvas particle system with performance throttling
- CSS custom properties for theme colors
- Semantic HTML throughout for accessibility
- Responsive images with next/image

---

## 7. Content Summary

### Hero
- **Name**: Abhinav Shivkumar
- **Tagline**: "I build systems that ship."
- **Subtitle**: AI/ML @ NIT Kurukshetra | Building Availo

### About
Personal story emphasizing:
- Builder mentality, not just thinker
- Availo origin story
- Chess strategy parallel
- AI research curiosity
- Medium writing

### Featured: Availo
- Live on Play Store
- Connects local shopkeepers to local customers
- Proof of execution

### Projects Grid
- AbhiDocs (collaborative editor)
- True Feedback (anonymous messaging)
- Real-Time Chat App
- ImageSelling Store

### AI/ML
- Ethereum Phishing Detection
- GAN Image Generator
- RAG Document Chat
- AI vs Real Image Detection
- Small Language Model

### Systems (LLD)
- Zomato, Spotify, Payment Gateway
- Zepto, Google Docs
- TikTakToe, Snake & Ladder
- Dating App, Discount Coupon

### Connect
- Email, LinkedIn, GitHub, Medium
- Contact form
- Resume download
