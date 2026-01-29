# RAIOS - Design Market

Maqueta visual completa para un marketplace de arte digital. Implementa el design system RAIOS con estética neo-brutalista dark mode.

## Estado: COMPLETADO

Este proyecto cumplió su objetivo como **maqueta visual de referencia** para el frontend real de RAIOS.

## Qué incluye

### Páginas
- **Landing** - Hero, categorías, obras destacadas, navegación completa
- **Artwork Detail** - Galería de imágenes, info de compra, comentarios, obras relacionadas
- **Settings** - Perfil, notificaciones, apariencia, zona de peligro
- **Component Demo** (`/demo`) - Referencia visual de componentes

### Sistema de Componentes

| Categoría | Componentes |
|-----------|-------------|
| **UI Base** | Button, Input, FormField, Textarea, Toggle, EmptyState |
| **Cards** | ArtworkCard, MasonryGrid |
| **Glass** | GlassSurface, GlassModal, GlassPanel, GlassSheet |
| **Panels** | MenuPanel, CartPanel, SearchOverlay |
| **Toast** | Toast, ToastContainer, ToastProvider |
| **Layout** | Navbar, Footer, AppLayout |
| **Backgrounds** | WaveGrid, MagneticField, ParticleGrid |

### Design System

Todos los tokens están centralizados en `tailwind.config.js`:
- Colores semánticos (raios-primary, secondary, tertiary, text-high, text-support)
- Sistema de espaciado 6px
- Tipografía (Space Mono + Montserrat)
- Sombras y glows de jerarquía visual
- Glassmorphism tokens

## Stack

| Tecnología | Uso |
|------------|-----|
| React 18 | Framework UI |
| Vite | Build tool |
| Tailwind CSS | Estilos utility-first |
| Framer Motion | Animaciones |
| React Icons | Iconografía (Feather) |
| React Router | Navegación |

## Comandos

```bash
npm install     # Instalar dependencias
npm run dev     # Desarrollo (localhost:5173)
npm run build   # Build producción
npm run preview # Preview del build
```

## Estructura

```
src/
├── components/
│   ├── ui/           # Componentes base reutilizables
│   ├── layout/       # Navbar, Footer, AppLayout
│   ├── sections/     # Hero, CategoryCarousel, FeaturedWorks
│   ├── artwork/      # ImageGallery, ArtworkInfo, Comments
│   ├── settings/     # Secciones de configuración
│   └── backgrounds/  # Fondos animados
├── pages/
│   ├── Landing.jsx
│   ├── ArtworkDetail.jsx
│   ├── Settings.jsx
│   └── ComponentDemo.jsx
├── context/
│   └── AppContext.jsx  # Estado global (paneles, carrito, usuario)
└── utils/
    └── animations.js   # Variantes de Framer Motion
```

## Documentación

| Archivo | Contenido |
|---------|-----------|
| `RAIOS_Design_System.md` | Design system completo (tokens, componentes, patrones) |
| `CLAUDE.md` | Instrucciones para Claude Code |

## Principios de Diseño

1. **Mobile-First** - Diseño base para mobile, escala a desktop
2. **Neo-Brutalismo** - Arte como protagonista, UI complementaria
3. **Glassmorphism con propósito** - Profundidad sin distraer
4. **Jerarquía visual con glows** - Guiar al usuario hacia la acción principal

---

*Maqueta completada - Enero 2026*
