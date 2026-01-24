# RAIOS - Marketplace de Arte

Maqueteo visual para un marketplace de arte digital. Este proyecto implementa el design system RAIOS con un enfoque neo-brutalista y estética dark mode.

## Propósito

Este repositorio es un **maqueteo visual** (sin lógica de negocio) que será integrado posteriormente a un proyecto React existente. El objetivo es definir y validar:

- Design system completo (colores, tipografía, spacing, iconografía)
- Componentes UI reutilizables
- Layout de landing page con grid masonry
- Experiencia mobile-first

## Stack Tecnológico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| React | 18.3.1 | Framework UI (JavaScript) |
| Vite | 5.4.2 | Build tool |
| Tailwind CSS | 3.4.1 | Estilos utility-first |
| Framer Motion | 11.0.8 | Animaciones |
| React Icons | 5.0.1 | Iconografía (Feather) |

## Estructura del Proyecto

```
src/
├── components/
│   ├── ui/              # Building blocks (Button, ArtworkCard)
│   ├── layout/          # Navbar, Footer, Container
│   └── sections/        # Hero, FeaturedWorks
├── pages/
│   └── Landing.jsx      # Página principal
├── styles/
│   └── tokens.css       # Variables CSS del design system
└── index.css            # Tailwind + clases de componentes
```

## Design System RAIOS

### Colores

| Token | Hex | Uso |
|-------|-----|-----|
| `raios-primary` | #4A1FFF | CTAs, acentos |
| `raios-secondary` | #0A0218 | Fondo principal |
| `raios-tertiary` | #8E5CFF | Efectos, gradientes |
| `raios-text-high` | #FFFFFF | Texto principal |
| `raios-text-support` | #A8A8B3 | Texto secundario |

### Tipografía

- **Space Mono** (`font-mono`): Headers, títulos, precios
- **Montserrat** (`font-sans`): Body, descripciones

### Principios

- **Mobile-First**: Todo se diseña primero para mobile
- **Sistema de 6px**: Spacing basado en múltiplos de 6px
- **Neo-Brutalismo**: Sin bordes ni sombras en cards, obras como protagonistas

## Comandos

```bash
# Instalar dependencias
npm install

# Desarrollo con hot reload
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview
```

## Documentación

- `RAIOS_Design_System.md` - Tokens y reglas de diseño completas
- `CLAUDE.md` - Guía para desarrollo con Claude Code
- `design-system-context/` - Contexto para integración al proyecto principal
