# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Principles

### Mobile-First (OBLIGATORIO)

**Todo desarrollo debe ser pensado y construido desde mobile-first.**

- Diseñar primero para pantallas pequeñas, luego escalar a desktop
- Usar breakpoints de Tailwind en orden ascendente: `base` → `sm` → `md` → `lg` → `xl`
- Cada funcionalidad y elemento estético debe ser consistente con la UX en mobile
- Probar siempre primero en viewport móvil antes de verificar en desktop
- Los estilos base (sin prefijo) aplican a mobile, los prefijos (`md:`, `lg:`) agregan para pantallas más grandes

```jsx
// ✅ CORRECTO: Mobile-first
<div className="text-xl md:text-2xl lg:text-3xl">

// ❌ INCORRECTO: Desktop-first
<div className="text-3xl sm:text-xl">
```

---

## Commands

- `npm run dev` - Start Vite dev server with HMR
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Architecture

This is **RAIOS**, a design marketplace built with React 19 + Vite + Tailwind CSS.

### Design System (RAIOS)

The project implements a neo-brutalist dark theme defined in `RAIOS_Design_System.md`. Key design tokens are configured in `tailwind.config.js`:

**Color tokens** (use these semantic names):
- `raios-primary` (#4A1FFF) - Electric violet for CTAs and accents
- `raios-secondary` (#0A0218) - Deep space purple for backgrounds
- `raios-tertiary` (#8E5CFF) - Bright lavender for effects/gradients
- `raios-text-high` (#FFFFFF) - Primary text
- `raios-text-support` (#A8A8B3) - Secondary text and metadata

**Typography**:
- `font-mono` (Space Mono) - Headers, titles, prices
- `font-sans` (Montserrat) - Body text, descriptions, forms

**Spacing**: Uses a 6px base system (spacing-1=6px, spacing-2=12px, spacing-4=24px, spacing-8=48px)

### Component Patterns

- **Header/NavBar**: Glassmorphism with `bg-raios-secondary/90 backdrop-blur-sm`
- **Primary Button**: `bg-raios-primary` with hover inversion to white bg
- **Secondary Button**: Transparent with `border-raios-primary`, fills on hover
- **Art Cards**: No borders/shadows, text overlays with `font-mono`
- **Critical views** (detail/cart): Solid `bg-raios-secondary`, no glassmorphism, 60/40 asymmetric layout

Google Fonts are imported in `src/index.css`.
