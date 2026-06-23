# Relax Park 5* — Tech Documentation

## Quick Start

```bash
cd relax-park-landing
npm install
npm run dev
```

Server: http://localhost:3000

---

## Tech Stack

```json
{
  "framework": "Next.js 14 (App Router)",
  "language": "TypeScript",
  "styling": "Custom CSS + CSS Variables",
  "animations": "GSAP + ScrollTrigger + Lenis",
  "smooth-scroll": "@studio-freight/lenis",
  "forms": "Native + custom hooks",
  "icons": "Custom SVG"
}
```

---

## Design Tokens

Located in `src/styles/tokens.css`

### Colors

| Name | Value | Usage |
|------|-------|-------|
| `--color-charcoal` | `#1A1A1A` | Headlines, primary text |
| `--color-stone` | `#C4B5A5` | Secondary backgrounds |
| `--color-beige` | `#E8E3DE` | Dividers, accents |
| `--color-white` | `#FAFAFA` | Main background |
| `--color-forest` | `#2D3A2F` | Hover states, buttons |
| `--color-gold` | `#B89F7A` | CTA, highlights |
| `--color-success` | `#4A7C59` | Booking confirmed |
| `--color-error` | `#8B3A3A` | Form validation |

### Typography

| Token | Desktop | Mobile |
|-------|---------|--------|
| `--text-display` | 96px | 56px |
| `--text-h1` | 72px | 42px |
| `--text-h2` | 48px | 32px |
| `--text-h3` | 32px | 24px |
| `--text-body` | 16px | 14px |

Fonts:
- Serif: Playfair Display (Google Fonts)
- Sans: Inter (Google Fonts)

### Spacing (Base Unit: 8px)

| Token | Value |
|-------|-------|
| `--space-1` | 8px |
| `--space-2` | 16px |
| `--space-3` | 24px |
| `--space-4` | 32px |
| `--space-5` | 48px |
| `--space-6` | 64px |
| `--space-8` | 96px |
| `--space-10` | 128px |
| `--space-12` | 160px |
| `--space-16` | 256px |
| `--space-20` | 320px |
| `--space-24` | 384px |

---

## Project Structure

```
relax-park-landing/
├── public/
│   ├── images/
│   │   ├── rooms/
│   │   ├── experiences/
│   │   ├── gallery/
│   │   └── README.md (media spec)
│   └── videos/
│       └── hero-bg.mp4 (poster: hero-poster.jpg)
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout + fonts
│   │   ├── page.tsx        # Main landing page
│   │   └── globals.css     # Global styles
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx  # 3 variants: primary/secondary/ghost
│   │   │   ├── Input.tsx   # Form input with label/error
│   │   │   ├── Card.tsx    # Content card with hover
│   │   │   ├── Modal.tsx   # Dialog with backdrop
│   │   │   ├── Image.tsx   # Optimized next/image wrapper
│   │   │   └── index.ts
│   │   ├── booking/
│   │   │   ├── BookingWidget.tsx  # 4-step booking flow
│   │   │   └── index.ts
│   │   ├── layout/
│   │   │   ├── Header.tsx  # Scroll-aware header
│   │   │   ├── Footer.tsx  # Site footer
│   │   │   ├── Navigation.tsx  # Section dots
│   │   │   └── index.ts
│   │   └── sections/
│   │       ├── Experiences.tsx
│   │       ├── Gallery.tsx
│   │       ├── Contacts.tsx
│   │       └── index.ts
│   ├── hooks/
│   │   ├── index.ts        # useScrollProgress, useIsMobile, etc.
│   │   └── useScrollReveal.ts  # Scroll-triggered animations
│   ├── lib/
│   │   ├── gsap-config.ts  # GSAP setup + presets
│   │   ├── lenis-setup.ts  # Smooth scroll init
│   │   ├── pms-api.ts      # TravelLine API mock/wrapper
│   │   └── utils.ts        # cn(), easing, helpers
│   └── styles/
│       ├── tokens.css      # Design tokens
│       └── global.css      # Global styles
└── package.json
```

---

## Components API

### UI Components

**Button** (`src/components/ui/Button.tsx`)
```tsx
<Button variant="primary" size="md" onClick={handleClick}>
  CTA Text
</Button>
// variants: primary | secondary | ghost
// sizes: sm (44px) | md (52px) | lg (60px)
```

**Input** (`src/components/ui/Input.tsx`)
```tsx
<Input label="Email" type="email" error="Invalid" />
```

**Card** (`src/components/ui/Card.tsx`)
```tsx
<Card 
  image="/path/to/image.jpg"
  title="Room Name"
  subtitle="2 guests"
  price="from 25 000 ₽"
/>
```

**Modal** (`src/components/ui/Modal.tsx`)
```tsx
<Modal isOpen={open} onClose={() => setOpen(false)}>
  Content here
</Modal>
```

**Image** (`src/components/ui/Image.tsx`)
```tsx
// Optimized image with lazy loading
<Image 
  src="/images/room.jpg" 
  alt="Room" 
  fill 
  priority  // For hero images
/>

// Responsive full-width image
<ResponsiveImage 
  src="/images/hero.jpg" 
  alt="Hero" 
  aspectRatio="16/9"
  priority
/>
```

### Booking Components

**BookingWidget** (`src/components/booking/BookingWidget.tsx`)
```tsx
import { BookingWidget } from '@/components/booking';

<BookingWidget />
// 4-step flow: Dates → Room → Details → Confirmation
// Integrates with PMS API via src/lib/pms-api.ts
```

---

## Animation System

### GSAP Configuration

```ts
import { gsap, animations, createFadeOnScroll } from '@/lib/gsap-config';

// Default animations (done automatically)
gsap.defaults({ duration: 1.2, ease: 'power3.inOut' });

// Fade on scroll
createFadeOnScroll(elementRef.current);

// Text stagger
createTextStagger(textElements);

// Parallax
createParallax(elementRef.current, strength: 100);
```

### Hooks

```ts
import { 
  usePrefersReducedMotion, 
  useIsMobile, 
  useScrollProgress, 
  useInViewport,
  useScrollReveal,
  useHorizontalScroll,
  useParallax 
} from '@/hooks';

// Scroll reveal animation
const { ref, isRevealed } = useScrollReveal({ threshold: 0.1, delay: 0.2 });

// Horizontal scroll section
const scrollRef = useHorizontalScroll();

// Parallax effect
const parallaxRef = useParallax(strength: 100);
```

### Lenis Smooth Scroll

```ts
import { initLenis, scrollTo } from '@/lib/lenis-setup';

// Initialize once (done in page.tsx)
initLenis();

// Programmatic scroll
scrollTo('#booking', { duration: 1.2 });
```

### Animation Presets

| Preset | Use Case | Params |
|--------|----------|--------|
| `fadeInUp` | Section headers | y: 40, opacity: 0→1, 1.2s |
| `scaleIn` | Modals, overlays | scale: 0.95→1, 1.4s |
| `imageReveal` | Image galleries | scale: 1.1→1, 1.2s |
| `textStagger` | Multi-line copy | stagger: 0.1s, 0.8s |
| `horizontalScroll` | Rooms showcase | scrub: 1s, pin: true |

---

## Page Structure

### Current Sections

| Section | ID | Component | Features |
|---------|-----|-----------|----------|
| Hero | `#hero` | HeroSection | Video bg, animated title, CTA |
| Philosophy | `#philosophy` | PhilosophySection | Typography-focused |
| Rooms | `#rooms` | RoomsSection | Grid cards, hover states |
| Experiences | `#experiences` | ExperiencesSection | 4 cards (SPA, restaurant, activities, events) |
| Gallery | `#gallery` | GallerySection | Masonry grid + lightbox |
| Booking | `#booking` | BookingSection | 4-step widget, PMS integration |
| Contacts | `#contact` | ContactsSection | Info, map placeholder, messengers |

### NavigationDots

Fixed navigation on right side. Auto-updates based on scroll position.
Click to smooth-scroll to section.

---

## PMS Integration

### TravelLine Shelter API

```ts
import { checkAvailability, type AvailabilityRequest } from '@/lib/pms-api';

const request: AvailabilityRequest = {
  checkIn: '2026-07-01',
  checkOut: '2026-07-05',
  adults: 2,
  children: 0,
};

const rooms = await checkAvailability(request);
```

### RoomRate Type

```ts
interface RoomRate {
  id: string;
  name: string;
  description: string;
  price: number;          // per night in RUB
  currency: string;       // 'RUB'
  available: boolean;
  amenities: string[];
  maxOccupancy: number;
  bedType: string;
  area: number;           // m²
}
```

### Environment Variables

Create `.env.local`:
```bash
TL_API_KEY=your_api_key_here
TL_HOTEL_ID=your_hotel_id_here
```

---

## Performance Optimization

### Image Optimization

```tsx
import NextImage from 'next/image';

<NextImage
  src="/images/hero.jpg"
  alt="Description"
  fill
  sizes="(max-width: 768px) 100vw, 1200px"
  priority // Hero images only
  quality={85}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### Lazy Loading

- `loading="lazy"` for below-fold images
- `loading="eager"` for hero/above-fold
- IntersectionObserver for scroll animations

### Cache Headers

Configured in `next.config.mjs`:
- `/images/*`: 1 year immutable
- `/videos/*`: 1 year immutable

### Code Splitting

- Automatic with Next.js App Router
- `'use client'` directive only where needed

---

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (http://localhost:3000) |
| `npm run build` | Production build |
| `npm run start` | Start prod server |
| `npm run lint` | ESLint check |

---

## Breakpoints

```css
--breakpoint-sm: 640px   /* Mobile landscape */
--breakpoint-md: 768px   /* Tablet */
--breakpoint-lg: 1024px  /* Desktop */
--breakpoint-xl: 1440px  /* Desktop large */
```

---

## TODO / Next Steps

1. **Media Content**
   - [ ] Replace placeholder gradients with real photos
   - [ ] Add hero video (720p WebM + MP4)
   - [ ] Generate blur-up placeholders (LQIP)

2. **Map Integration**
   - [ ] Add Yandex Maps or Google Maps
   - [ ] Custom marker styling
   - [ ] "Open in navigator" button

3. **PMS Production**
   - [ ] Get TravelLine API credentials
   - [ ] Implement actual API calls
   - [ ] Handle booking confirmation emails

4. **Accessibility**
   - [ ] Add aria-labels to all interactive elements
   - [ ] Keyboard navigation testing
   - [ ] Screen reader testing

5. **Analytics**
   - [ ] Add Yandex.Metrika or Google Analytics
   - [ ] Track booking funnel drop-off
   - [ ] Set up conversion goals

---

## Notes

- All animations respect `prefers-reduced-motion`
- Mobile-first responsive approach
- Smooth scroll via Lenis (1.2s duration)
- 60 FPS target on desktop, 30 FPS on mobile
- `compiler.removeConsole` enabled in production