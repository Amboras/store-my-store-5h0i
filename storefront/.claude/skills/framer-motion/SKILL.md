---
name: framer-motion
description: Add animations and motion to the storefront using Framer Motion. Use when the user asks to animate a component, add transitions, entrance effects, hover interactions, scroll-triggered animations, page transitions, or any motion/animation work. Triggers on "animate", "transition", "motion", "fade in", "slide", "hover effect", "scroll animation", "AnimatePresence", "stagger".
---

# Framer Motion in this Storefront

Package: `framer-motion`. Import from `"framer-motion"` in `'use client'` components only — animations cannot run in Server Components.

## Core import

```tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
```

## Basic animation

Extract animation values as variables — keeps JSX clean and avoids prop verbosity:

```tsx
const from = { opacity: 0, y: 20 }
const to = { opacity: 1, y: 0 }
const timing = { duration: 0.4, ease: 'easeOut' }

<motion.div initial={from} animate={to} transition={timing}>
  content
</motion.div>
```

Replace any HTML element: `motion.div`, `motion.section`, `motion.ul`, `motion.img`, etc.

## Variants — clean, reusable

Variants let parent and child share animation state by name. No need to pass props down:

```tsx
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

<motion.div variants={fadeUp} initial="hidden" animate="visible">
```

## Staggered children

```tsx
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

<motion.ul variants={container} initial="hidden" animate="visible">
  {products.map(p => (
    <motion.li key={p.id} variants={item}>{...}</motion.li>
  ))}
</motion.ul>
```

## Exit animations — AnimatePresence

AnimatePresence lets components animate out before unmounting. Wrap conditionally rendered content:

```tsx
const modalFrom = { opacity: 0, scale: 0.95 }
const modalTo = { opacity: 1, scale: 1 }
const modalExit = { opacity: 0, scale: 0.95 }
const modalTiming = { duration: 0.2 }

<AnimatePresence mode="wait">
  {isOpen && (
    <motion.div
      key="modal"
      initial={modalFrom}
      animate={modalTo}
      exit={modalExit}
      transition={modalTiming}
    >
      {children}
    </motion.div>
  )}
</AnimatePresence>
```

The `key` prop is required so Framer Motion tracks the element. `mode="wait"` ensures exit finishes before enter starts.

## Cart drawer (slide in from right)

```tsx
const drawerFrom = { x: '100%' }
const drawerTo = { x: 0 }
const drawerExit = { x: '100%' }
const drawerSpring = { type: 'spring', stiffness: 300, damping: 30 }

<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={drawerFrom}
      animate={drawerTo}
      exit={drawerExit}
      transition={drawerSpring}
      className="fixed right-0 top-0 h-full w-80 bg-background shadow-xl"
    >
      {children}
    </motion.div>
  )}
</AnimatePresence>
```

## Hover and tap interactions

```tsx
const hoverState = { scale: 1.03 }
const tapState = { scale: 0.97 }
const buttonSpring = { type: 'spring', stiffness: 400, damping: 17 }

<motion.button
  whileHover={hoverState}
  whileTap={tapState}
  transition={buttonSpring}
>
  Add to cart
</motion.button>
```

## Scroll-triggered — whileInView

```tsx
const sectionFrom = { opacity: 0, y: 40 }
const sectionTo = { opacity: 1, y: 0 }
const viewportOpts = { once: true, margin: '-80px' }
const sectionTiming = { duration: 0.5, ease: 'easeOut' }

<motion.section
  initial={sectionFrom}
  whileInView={sectionTo}
  viewport={viewportOpts}
  transition={sectionTiming}
>
```

`once: true` means it only triggers the first time it enters the viewport — always set this on product grids or performance suffers.

## Scroll-linked values — useScroll / useTransform

```tsx
'use client'
import { useScroll, useTransform, motion } from 'framer-motion'

const { scrollY } = useScroll()
const opacity = useTransform(scrollY, [0, 200], [1, 0])
const heroStyle = { opacity }

<motion.div style={heroStyle}>hero content</motion.div>
```

## Spring physics (feels natural)

```tsx
const spring = { type: 'spring', stiffness: 260, damping: 20 }
// use as: transition={spring}
```

Common spring presets:
- Snappy: `{ type: 'spring', stiffness: 400, damping: 25 }`
- Bouncy: `{ type: 'spring', stiffness: 200, damping: 12 }`
- Smooth: `{ type: 'spring', stiffness: 100, damping: 20 }`

## Tailwind CSS variables as motion values

This storefront uses CSS variables for theming. Use them in animate values:

```tsx
const accentAnim = { backgroundColor: 'hsl(var(--accent))' }

<motion.div animate={accentAnim} />
```

## Layout animations — reordering without jumps

```tsx
<motion.li layout key={item.id}>
```

Add `layout` to any element that changes position when siblings are added/removed (e.g. cart items). Framer Motion automatically FLIP-animates the position change.

## Performance rules

1. **Never animate width/height** — use `scaleX`/`scaleY` + `layout` instead
2. **Prefer `opacity` and `transform`** — GPU-composited, never cause repaints
3. **Use `will-change-transform`** Tailwind class on elements that animate continuously
4. **Always use `once: true`** in `viewport` on product grid cards — animating 20+ cards on every scroll is jank
5. **Don't wrap Server Components** — add `'use client'` to the file or create a thin client wrapper

## Reducing motion (accessibility)

```tsx
import { useReducedMotion } from 'framer-motion'

function AnimatedCard() {
  const reduce = useReducedMotion()
  const from = { opacity: 0, y: reduce ? 0 : 24 }
  const to = { opacity: 1, y: 0 }
  return <motion.div initial={from} animate={to} />
}
```

Always respect `prefers-reduced-motion`. `useReducedMotion()` returns `true` when the OS setting is enabled.

## Common patterns for this storefront

**Product card hover lift:**
```tsx
const hoverLift = { y: -4 }
const quickTiming = { duration: 0.2 }

<motion.div whileHover={hoverLift} transition={quickTiming}>
  <ProductCard ... />
</motion.div>
```

**Page section fade-up on load:**
```tsx
const sectionFrom = { opacity: 0, y: 32 }
const sectionTo = { opacity: 1, y: 0 }
const sectionTiming = { duration: 0.5, delay: 0.1 }

<motion.section
  initial={sectionFrom}
  animate={sectionTo}
  transition={sectionTiming}
>
```

**Toast-style notification (slide + fade):**
```tsx
const toastFrom = { opacity: 0, x: 48 }
const toastTo = { opacity: 1, x: 0 }
const toastExit = { opacity: 0, x: 48 }
// use as: initial={toastFrom} animate={toastTo} exit={toastExit}
```

**Skeleton shimmer is already in Tailwind** — use `animate-pulse` class, no Framer Motion needed for loading states.
