# Sistema de Estilos Actual - Marketplace Artístico

Documentación del sistema de estilos actual para referencia y potencial mejora.

---

## Resumen del Diseño Actual

| Aspecto | Estado Actual | Notas |
|---------|---------------|-------|
| **Tema** | Dark mode exclusivo | Fondo oscuro con gradientes púrpura |
| **Estética** | Glassmorphism | Blur, transparencias, bordes sutiles |
| **Colores** | Orange → Pink → Purple | Gradiente principal para acentos |
| **Tipografía** | Inter | Múltiples pesos |
| **Iconos** | Feather (react-icons) | Estilo outline/line |

---

## CSS Variables Actuales

```css
:root {
  /* Texto */
  --text-primary: rgba(255, 255, 255, 0.95);
  --text-secondary: rgba(255, 255, 255, 0.85);
  --text-tertiary: rgba(255, 255, 255, 0.75);

  /* Glassmorphism */
  --glass-background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.15)
  );
  --glass-border: rgba(255, 255, 255, 0.3);
  --glass-shadow:
    0 4px 12px rgba(0, 0, 0, 0.2),
    inset 0 1px 1px rgba(255, 255, 255, 0.1);
  --glass-blur: 12px;
}
```

---

## Paleta de Colores Actual

### Colores de Gradiente (Tailwind)

```javascript
colors: {
  gradient: {
    start: '#FF7B00',    // Orange vibrante
    middle: '#FF007A',   // Pink/Magenta
    end: '#8B00FF',      // Purple profundo
  }
}
```

### Colores de Background

```css
/* Fondo principal */
background: linear-gradient(to bottom right, #0f172a, #581c87, #0f172a);

/* Overlays animados */
rgba(79, 70, 229, 0.1)   /* Indigo sutil */
rgba(147, 51, 234, 0.1)  /* Purple sutil */
rgba(217, 70, 239, 0.1)  /* Fuchsia sutil */
rgba(236, 72, 153, 0.1)  /* Pink sutil */
```

### Colores de Texto

| Variable | Valor | Uso |
|----------|-------|-----|
| `--text-primary` | rgba(255,255,255,0.95) | Títulos, texto principal |
| `--text-secondary` | rgba(255,255,255,0.85) | Subtítulos, labels |
| `--text-tertiary` | rgba(255,255,255,0.75) | Texto secundario, hints |

---

## Tipografía

### Font Family

```css
font-family: 'Inter', system-ui, sans-serif;
```

### Escala de Tamaños

| Clase | Tamaño | Uso Típico |
|-------|--------|------------|
| `text-base` | 18px | Texto body |
| `text-lg` | 20px | Texto destacado |
| `text-xl` | 22px | Subtítulos pequeños |
| `text-2xl` | 24px | Subtítulos |
| `text-3xl` | 30px | Títulos de sección |
| `text-4xl` | 36px | Títulos principales |
| `text-5xl` | 48px | Hero headlines |

### Estilos de Texto

```css
/* Títulos */
h1, h2, h3, h4, h5, h6 {
  @apply text-white font-bold;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* Párrafos */
p, span, label {
  @apply text-white/90;
}
```

---

## Componentes de Estilo (Tailwind @layer)

### glass-card

```css
.glass-card {
  @apply backdrop-blur-xl rounded-lg;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0.08)
  );
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.3),
    inset 0 1px 1px rgba(255, 255, 255, 0.1);
}

.glass-card:hover {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.1)
  );
  border-color: rgba(255, 255, 255, 0.3);
}
```

### nav-glass

```css
.nav-glass {
  @apply backdrop-blur-xl fixed w-full z-50;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0.08) 100%
  );
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.3),
    inset 0 1px 1px rgba(255, 255, 255, 0.1);
}
```

### btn-glass

```css
.btn-glass {
  @apply px-6 py-3 rounded-lg backdrop-blur-xl
         text-white text-lg border border-white/30;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0.08)
  );
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.3),
    inset 0 1px 1px rgba(255, 255, 255, 0.1);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.btn-glass:hover {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.1)
  );
  border-color: rgba(255, 255, 255, 0.4);
}
```

---

## Background Artístico

```css
.artistic-background {
  position: fixed;
  inset: 0;
  background: linear-gradient(to bottom right, #0f172a, #581c87, #0f172a);
  z-index: -1;
}

.artistic-background::before,
.artistic-background::after {
  content: '';
  position: absolute;
  inset: 0;
  animation: spiral 40s linear infinite;
}

@keyframes spiral {
  0%, 100% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(360deg) scale(1.1); }
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(0, -20px) scale(1.05); }
}
```

---

## Spacing y Layout

### Container Principal

```jsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>
```

### Espaciado Común

| Uso | Clase Tailwind |
|-----|----------------|
| Gap entre items | `gap-4`, `gap-6`, `gap-8` |
| Padding cards | `p-4`, `p-6`, `p-8` |
| Margin secciones | `my-8`, `my-12`, `my-16` |
| Padding responsive | `px-4 sm:px-6 lg:px-8` |

### Grid Layouts

```jsx
// Grid de artworks (responsive)
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {/* ArtworkCards */}
</div>

// Grid de 2 columnas
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  {/* Content */}
</div>
```

---

## Animaciones con Framer Motion

### Fade In

```jsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

### Hover Scale

```jsx
<motion.div
  whileHover={{ scale: 1.02 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  Card
</motion.div>
```

### Staggered Children

```jsx
const container_variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item_variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

<motion.div variants={container_variants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={item_variants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

---

## Problemas Identificados del Diseño Actual

| Problema | Descripción |
|----------|-------------|
| **Demasiado oscuro** | El fondo muy oscuro puede ser pesado para navegación prolongada |
| **Glassmorphism excesivo** | Blur en todo puede cansar la vista |
| **Falta contraste** | Las obras de arte no destacan suficientemente |
| **Jerarquía visual débil** | Todo tiene similar peso visual |
| **Colores limitados** | Solo gradiente naranja-rosa-púrpura |

---

## Sugerencias para Nuevo Design System

### Considerar:

1. **Tema claro/oscuro** - Opción de light mode
2. **Fondo neutro** - Que las obras sean protagonistas
3. **Menos glassmorphism** - Usar selectivamente
4. **Más white space** - Respiro visual
5. **Paleta expandida** - Más variedad cromática
6. **Jerarquía clara** - Distinguir niveles de importancia
7. **Focus en imágenes** - Las obras deben brillar

### Tokens Sugeridos para Nuevo DS

```css
/* Ejemplo de estructura de tokens más completa */
:root {
  /* Colores Base */
  --color-background: #ffffff;
  --color-surface: #f8fafc;
  --color-surface-elevated: #ffffff;

  /* Texto */
  --color-text-primary: #0f172a;
  --color-text-secondary: #475569;
  --color-text-muted: #94a3b8;

  /* Acentos */
  --color-accent-primary: #7c3aed;
  --color-accent-secondary: #ec4899;

  /* Bordes */
  --color-border: #e2e8f0;
  --color-border-hover: #cbd5e1;

  /* Sombras */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.07);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);

  /* Radios */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
}
```

---

## Archivos de Referencia del Proyecto Actual

| Archivo | Ruta | Contenido |
|---------|------|-----------|
| Tailwind Config | `/tailwind.config.js` | Tokens de diseño |
| CSS Variables | `/src/styles/gradients.css` | Variables CSS |
| Background | `/src/styles/background.css` | Fondo animado |
| Base Styles | `/src/index.css` | Estilos base + componentes |
