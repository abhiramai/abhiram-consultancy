# GenAI Theme - Development Style Guide

This guide documents the patterns, conventions, and design decisions used in the GenAI Astro theme. Follow these guidelines to maintain consistency when adding new components or pages.

## 🎨 Design System

### Color Palette

We use HSL-based CSS variables for theming:

```css
/* Light mode */
--background: 0 0% 100%;
--foreground: 222.2 84% 4.9%;
--primary: 222.2 47.4% 11.2%;

/* Dark mode */
--background: 222.2 84% 4.9%;
--foreground: 210 40% 98%;
--primary: 210 40% 98%;
```

**Primary Gradient**: Purple to Pink (`from-purple-600 to-pink-600` in light, `from-purple-400 to-pink-400` in dark)

### Typography

- **Font**: Inter (system fallback: sans-serif)
- **Headings**: Font weight 700 (bold)
- **Body**: Font weight 400 (normal)
- **Scale**:
  - Hero: `text-4xl md:text-6xl` (36px → 60px)
  - H1: `text-3xl md:text-4xl` (30px → 36px)
  - H2: `text-2xl md:text-3xl` (24px → 30px)
  - H3: `text-xl` (20px)
  - Body: `text-base` (16px)
  - Small: `text-sm` (14px)

### Spacing

- **Container**: `container mx-auto px-4`
- **Section padding**: `py-20 md:py-32`
- **Component gaps**: `gap-4`, `gap-6`, `gap-8`
- **Max widths**:
  - Content: `max-w-4xl`
  - Component showcase: `max-w-6xl`
  - Full width: `max-w-7xl`

### Border Radius

- **Small**: `rounded-md` (6px)
- **Medium**: `rounded-lg` (8px)
- **Large**: `rounded-xl` (12px)
- **Extra Large**: `rounded-2xl` (16px)
- **Full**: `rounded-full`

### Shadows

- **Small**: `shadow-sm`
- **Medium**: `shadow-md`
- **Large**: `shadow-lg`
- **Extra Large**: `shadow-2xl`

## 🏗️ Architecture Patterns

### File Organization

```
src/
├── components/
│   ├── ui/              # Primitive components (shadcn/ui)
│   │   ├── button.tsx
│   │   └── card.tsx
│   ├── ComponentName.tsx  # Feature components
│   └── SectionName.tsx    # Page sections
├── pages/
│   ├── index.astro      # Homepage
│   └── [feature].astro  # Feature pages
├── layouts/
│   └── main.astro       # Main layout
├── lib/
│   └── utils.ts         # Utility functions
└── styles/
    └── global.css       # Global styles
```

### Component Structure

#### React Components (.tsx)

```tsx
import { ComponentType } from "react";
import { Icon } from "lucide-react";
import { withBase } from "@/lib/utils";

interface ComponentNameProps {
  title: string;
  description?: string;
  variant?: "default" | "primary" | "secondary";
}

export function ComponentName({
  title,
  description,
  variant = "default",
}: ComponentNameProps) {
  return (
    <div className="border rounded-lg p-6 bg-card hover:shadow-md transition-all">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
```

**Key Patterns:**
1. Always define TypeScript interfaces for props
2. Use optional props with default values
3. Import icons from `lucide-react`
4. Use semantic HTML elements
5. Add hover states with transitions

#### Astro Pages (.astro)

```astro
---
import Layout from '../layouts/main.astro';
import { ComponentName } from '@/components/ComponentName';

const base = import.meta.env.BASE_URL;
---

<Layout title="Page Title - GenAI">
  <section class="py-20 md:py-32">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        {/* Header */}
        <div class="text-center space-y-4 mb-16">
          <h1 class="text-4xl md:text-6xl font-bold">
            Page{" "}
            <span class="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Title
            </span>
          </h1>
          <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
            Page description goes here
          </p>
        </div>

        {/* Content */}
        <ComponentName client:load />
      </div>
    </div>
  </section>
</Layout>
```

**Key Patterns:**
1. Always import base path: `const base = import.meta.env.BASE_URL;`
2. Use proper title format: `"Feature - GenAI"`
3. Center content with max-width containers
4. Use gradient text for emphasis
5. Add `client:load` for interactive React components

## 🎭 Component Patterns

### Cards

```tsx
<div className="border rounded-lg p-6 bg-card hover:shadow-md transition-all">
  <h3 className="font-semibold mb-2">Card Title</h3>
  <p className="text-sm text-muted-foreground">Card content</p>
</div>
```

### Buttons

```tsx
import { Button } from "@/components/ui/button";

// Primary
<Button>Click me</Button>

// Secondary
<Button variant="outline">Click me</Button>

// With icon
<Button>
  <Icon className="h-4 w-4 mr-2" />
  Click me
</Button>
```

### Icons

```tsx
import { IconName } from "lucide-react";

// Standard size
<IconName className="h-5 w-5" />

// In card header
<div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
  <IconName className="h-5 w-5 text-primary" />
</div>

// With gradient background
<div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
  <IconName className="h-5 w-5 text-white" />
</div>
```

### Gradients

```tsx
// Text gradient
<span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
  Gradient Text
</span>

// Background gradient
<div className="bg-gradient-to-br from-purple-500/5 to-pink-500/5">
  Content
</div>

// Border gradient (using pseudo-element)
<div className="relative overflow-hidden rounded-lg border">
  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20" />
  <div className="relative p-6">Content</div>
</div>
```

## 🔗 Routing Patterns

### Internal Links

**Always use the `withBase()` utility for internal links in React components:**

```tsx
import { withBase } from "@/lib/utils";

// In React components
<a href={withBase("/components")}>Components</a>
<a href={withBase("/#features")}>Features</a>

// In Astro pages
<a href={`${base}components`}>Components</a>
<a href={`${base}#features`}>Features</a>
```

### Navigation Items Pattern

```tsx
const navItems = [
  { label: "Features", href: withBase("/#features") },
  { label: "Pricing", href: withBase("/#pricing") },
  { label: "Components", href: withBase("/components") },
];
```

## 🎬 Animation Patterns

### Framer Motion

```tsx
import { motion } from "framer-motion";

// Fade in
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>

// Stagger children
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    visible: { transition: { staggerChildren: 0.1 } },
  }}
>
  {items.map((item) => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### CSS Animations

```css
/* Define in global.css */
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}
```

```tsx
// Use in components
<div className="animate-shimmer" />
```

## 🌓 Dark Mode Patterns

### Theme Toggle

```tsx
// Check current theme
const isDark = document.documentElement.classList.contains("dark");

// Toggle theme
document.documentElement.classList.toggle("dark");
localStorage.setItem("theme", isDark ? "light" : "dark");
```

### Dark Mode Styles

```tsx
// Background colors
<div className="bg-background text-foreground">

// Card colors
<div className="bg-card text-card-foreground">

// Muted text
<p className="text-muted-foreground">

// Dark mode specific
<div className="bg-white dark:bg-gray-900">
```

## ♿ Accessibility Patterns

### Semantic HTML

```tsx
// Use proper heading hierarchy
<h1>Main Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>

// Use semantic elements
<nav>...</nav>
<main>...</main>
<footer>...</footer>
<article>...</article>
<section>...</section>
```

### ARIA Labels

```tsx
// Interactive elements
<button aria-label="Close menu">
  <X className="h-4 w-4" />
</button>

// Form inputs
<input
  type="email"
  aria-label="Email address"
  placeholder="Enter your email"
/>
```

### Focus States

```tsx
// Always include focus states
<button className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
  Click me
</button>
```

## 📝 Code Style

### TypeScript

```tsx
// Use interfaces for props
interface ComponentProps {
  title: string;
  count?: number;
}

// Type function components
export function Component({ title, count = 0 }: ComponentProps) {
  // ...
}

// Use type for unions
type Status = "idle" | "loading" | "success" | "error";
```

### Naming Conventions

- **Components**: PascalCase (`CommandPalette.tsx`)
- **Functions**: camelCase (`withBase`, `handleClick`)
- **Constants**: UPPER_SNAKE_CASE (`BASE_PATH`)
- **CSS Classes**: kebab-case (handled by Tailwind)
- **Files**: PascalCase for components, kebab-case for pages

### Import Order

```tsx
// 1. React/external libraries
import { useState } from "react";
import { motion } from "framer-motion";

// 2. UI components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// 3. Custom components
import { ComponentName } from "@/components/ComponentName";

// 4. Utilities
import { withBase, cn } from "@/lib/utils";

// 5. Icons
import { Icon1, Icon2 } from "lucide-react";
```

## 🎯 Common Patterns

### Page Header

```tsx
<div className="text-center space-y-4 mb-16">
  <h1 className="text-4xl md:text-6xl font-bold">
    Page{" "}
    <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
      Title
    </span>
  </h1>
  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
    Page description
  </p>
</div>
```

### Feature Card

```tsx
<div className="border rounded-lg p-6 bg-card hover:shadow-md transition-all">
  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 mb-4">
    <Icon className="h-6 w-6 text-white" />
  </div>
  <h3 className="text-xl font-bold mb-2">Feature Title</h3>
  <p className="text-muted-foreground">Feature description</p>
</div>
```

### Metric Card

```tsx
<div className="border rounded-lg p-6 bg-card">
  <div className="flex items-center justify-between mb-4">
    <p className="text-sm text-muted-foreground">Metric Name</p>
    <Icon className="h-5 w-5 text-primary" />
  </div>
  <p className="text-3xl font-bold">1,234</p>
  <p className="text-sm text-green-600 dark:text-green-400 mt-2">
    +12% from last month
  </p>
</div>
```

### CTA Section

```tsx
<div className="border rounded-lg p-8 bg-gradient-to-br from-purple-500/5 to-pink-500/5 text-center">
  <h3 className="text-2xl font-bold mb-2">Call to Action</h3>
  <p className="text-muted-foreground mb-6">
    Compelling description
  </p>
  <Button>Get Started</Button>
</div>
```

## 🧪 Testing New Components

When creating a new component:

1. **Create the component file**
   ```bash
   src/components/NewComponent.tsx
   ```

2. **Follow the structure**
   ```tsx
   import { ComponentType } from "react";

   interface NewComponentProps {
     title: string;
   }

   export function NewComponent({ title }: NewComponentProps) {
     return (
       <div className="border rounded-lg p-6 bg-card">
         <h3 className="font-bold">{title}</h3>
       </div>
     );
   }
   ```

3. **Test in isolation first**
   - Add to `/components` or `/advanced-components` page
   - Use `client:load` directive
   - Include code example with CodeBlock

4. **Verify**
   - Dark mode works
   - Responsive on mobile
   - Accessible (keyboard navigation, screen readers)
   - Matches design system

## 📦 Adding New Pages

1. **Create the page file**
   ```bash
   src/pages/new-page.astro
   ```

2. **Use the template**
   ```astro
   ---
   import Layout from '../layouts/main.astro';
   const base = import.meta.env.BASE_URL;
   ---

   <Layout title="New Page - GenAI">
     <section class="py-20 md:py-32">
       <div class="container mx-auto px-4">
         <div class="max-w-4xl mx-auto">
           {/* Content */}
         </div>
       </div>
     </section>
   </Layout>
   ```

3. **Add to navigation**
   - Update `Header.tsx` navItems
   - Update `Footer.tsx` links
   - Update `CommandPalette.tsx` commands

4. **Test routing**
   ```bash
   npm run build
   ```

## 🚀 Performance Best Practices

1. **Lazy load interactive components**
   ```astro
   <Component client:load />
   ```

2. **Optimize images**
   - Use `loading="lazy"`
   - Provide width/height
   - Use modern formats (WebP)

3. **Minimize JavaScript**
   - Only use React for interactive components
   - Static content stays in Astro

4. **Use CSS transitions over JavaScript**
   ```tsx
   // Good
   <div className="transition-all hover:shadow-md" />

   // Avoid if possible
   <motion.div animate={{ boxShadow: "..." }} />
   ```

## 🎨 Design Tokens

```typescript
// Common spacing values
const spacing = {
  xs: "gap-2",    // 8px
  sm: "gap-4",    // 16px
  md: "gap-6",    // 24px
  lg: "gap-8",    // 32px
  xl: "gap-12",   // 48px
};

// Common sizes
const sizes = {
  icon: "h-5 w-5",
  iconLg: "h-6 w-6",
  iconXl: "h-8 w-8",
  avatar: "h-10 w-10",
  avatarLg: "h-12 w-12",
};
```

## 🔍 Debugging Tips

1. **Check base path issues**
   - All internal links must use `withBase()` or `${base}`
   - Test locally at `/astro-genai-startup-theme/`

2. **Dark mode not working**
   - Check `document.documentElement.classList.contains("dark")`
   - Verify CSS variables in `global.css`

3. **Component not interactive**
   - Add `client:load` directive in Astro files
   - Check console for React hydration errors

4. **Build fails**
   - Check TypeScript types
   - Verify all imports exist
   - Test with `npm run build`

## 📚 Resources

- [Astro Docs](https://docs.astro.build/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [Radix UI](https://www.radix-ui.com/)

---

**Remember**: Consistency is key! Follow these patterns to maintain the professional, cohesive feel of the GenAI theme.
