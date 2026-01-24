# Guía de Integración - Design System al Proyecto Principal

Cómo transferir el maqueteo visual al proyecto frontend existente.

---

## Flujo de Integración

```
MAQUETEO (proyecto-mockup/)          PRINCIPAL (frontend/creative-market/)
─────────────────────────────        ─────────────────────────────────────
src/styles/tokens.css         ──►    src/styles/tokens.css (NUEVO)
tailwind.config.js            ──►    tailwind.config.js (MERGE)
src/styles/components.css     ──►    src/styles/components.css (NUEVO)
src/components/ui/*           ──►    src/components/common/* (ADAPTAR)
src/components/layout/*       ──►    src/components/layout/* (ADAPTAR)
src/pages/Landing.jsx         ──►    src/pages/Home.jsx (ADAPTAR)
```

---

## Paso 1: Tokens de Diseño

### 1.1 Crear archivo de tokens

Copiar los tokens definidos en el maqueteo a:
```
src/styles/tokens.css
```

Ejemplo de estructura:
```css
/* src/styles/tokens.css */
:root {
  /* === COLORES === */

  /* Backgrounds */
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f8fafc;
  --color-bg-tertiary: #f1f5f9;

  /* Texto */
  --color-text-primary: #0f172a;
  --color-text-secondary: #475569;
  --color-text-muted: #94a3b8;

  /* Acentos */
  --color-accent-primary: #7c3aed;
  --color-accent-primary-hover: #6d28d9;
  --color-accent-secondary: #ec4899;

  /* Bordes */
  --color-border-default: #e2e8f0;
  --color-border-hover: #cbd5e1;

  /* Estados */
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;

  /* === SOMBRAS === */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);

  /* === RADIOS === */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;

  /* === TRANSICIONES === */
  --transition-fast: 150ms ease;
  --transition-normal: 200ms ease;
  --transition-slow: 300ms ease;
}

/* Dark mode (opcional) */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-primary: #0f172a;
    --color-bg-secondary: #1e293b;
    --color-bg-tertiary: #334155;
    --color-text-primary: #f8fafc;
    --color-text-secondary: #cbd5e1;
    --color-text-muted: #64748b;
    --color-border-default: #334155;
    --color-border-hover: #475569;
  }
}
```

### 1.2 Importar en index.css

Agregar import al inicio de `src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import './styles/tokens.css';       /* NUEVO */
@import './styles/background.css';   /* Opcional: mantener o eliminar */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Paso 2: Tailwind Config

### 2.1 Merge de configuración

Fusionar el `tailwind.config.js` del maqueteo con el existente:

```javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      // NUEVOS tokens del design system
      colors: {
        // Mantener gradientes existentes para compatibilidad
        gradient: {
          start: '#FF7B00',
          middle: '#FF007A',
          end: '#8B00FF',
        },
        // NUEVOS colores del design system
        background: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          tertiary: 'var(--color-bg-tertiary)',
        },
        foreground: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
        },
        accent: {
          primary: 'var(--color-accent-primary)',
          secondary: 'var(--color-accent-secondary)',
        },
        border: {
          DEFAULT: 'var(--color-border-default)',
          hover: 'var(--color-border-hover)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'base': '1.125rem',
        'lg': '1.25rem',
        'xl': '1.375rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
      },
    },
  },
  plugins: [],
}
```

---

## Paso 3: Componentes de Estilo Custom

### 3.1 Crear/actualizar components.css

```css
/* src/styles/components.css */

@layer components {
  /* === CARDS === */
  .card {
    @apply bg-background-primary rounded-xl border border-border;
    box-shadow: var(--shadow-sm);
  }

  .card-elevated {
    @apply bg-background-primary rounded-xl;
    box-shadow: var(--shadow-lg);
  }

  .card-hoverable {
    @apply card transition-shadow duration-200;
  }

  .card-hoverable:hover {
    box-shadow: var(--shadow-xl);
  }

  /* === BUTTONS === */
  .btn {
    @apply inline-flex items-center justify-center font-medium rounded-lg;
    @apply transition-all duration-200;
  }

  .btn-primary {
    @apply btn bg-accent-primary text-white;
    @apply hover:bg-accent-primary/90;
  }

  .btn-secondary {
    @apply btn bg-background-secondary text-foreground-primary border border-border;
    @apply hover:bg-background-tertiary;
  }

  .btn-ghost {
    @apply btn text-foreground-primary;
    @apply hover:bg-background-secondary;
  }

  .btn-sm { @apply px-3 py-1.5 text-sm; }
  .btn-md { @apply px-4 py-2 text-base; }
  .btn-lg { @apply px-6 py-3 text-lg; }

  /* === INPUTS === */
  .input {
    @apply w-full px-4 py-2.5 rounded-lg border border-border;
    @apply bg-background-primary text-foreground-primary;
    @apply transition-colors duration-200;
    @apply focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary;
  }

  .input-error {
    @apply border-red-500 focus:ring-red-500/50 focus:border-red-500;
  }

  /* === LEGACY: Mantener glassmorphism para compatibilidad === */
  .glass-card {
    @apply backdrop-blur-xl rounded-lg;
    background: linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.08));
    border: 1px solid rgba(255,255,255,0.2);
    box-shadow: 0 4px 12px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1);
  }

  .btn-glass {
    @apply px-6 py-3 rounded-lg backdrop-blur-xl text-white text-lg border border-white/30;
    background: linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.08));
  }

  .nav-glass {
    @apply backdrop-blur-xl fixed w-full z-50;
    background: linear-gradient(to bottom, rgba(255,255,255,0.15), rgba(255,255,255,0.08));
    border-bottom: 1px solid rgba(255,255,255,0.2);
  }
}
```

### 3.2 Importar components.css

Agregar a `src/index.css`:

```css
@import './styles/tokens.css';
@import './styles/components.css';  /* NUEVO */
@import './styles/background.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Paso 4: Adaptar Componentes

### 4.1 Mapeo de componentes

| Maqueteo | Proyecto Principal | Acción |
|----------|-------------------|--------|
| `ui/Button.jsx` | `common/Button.jsx` | Crear nuevo o reemplazar |
| `ui/Card.jsx` | `common/Card.jsx` | Crear nuevo |
| `ui/Input.jsx` | `forms/Input.jsx` | Fusionar con existente |
| `layout/Navbar.jsx` | `Navbar.jsx` | Actualizar estilos |
| `layout/Container.jsx` | `common/Container.jsx` | Crear nuevo |
| `artwork/ArtworkCard.jsx` | `artwork/ArtworkCard.jsx` | Actualizar estilos |

### 4.2 Proceso de adaptación

Para cada componente:

1. **Copiar estructura base** del maqueteo
2. **Mantener props snake_case** del proyecto principal
3. **Mantener lógica de negocio** existente
4. **Actualizar solo los estilos** con nuevos tokens

Ejemplo - ArtworkCard:

```jsx
// ANTES (estilos actuales)
<div className="glass-card p-4">
  <h3 className="text-white">{title}</h3>
</div>

// DESPUÉS (nuevos tokens)
<div className="card-hoverable p-4">
  <h3 className="text-foreground-primary font-semibold">{title}</h3>
</div>
```

---

## Paso 5: Páginas

### 5.1 Home/Landing

El `src/pages/Home.jsx` es el principal candidato para actualizar:

1. Mantener la lógica de datos (fetching, Redux, etc.)
2. Actualizar el JSX con nuevos componentes/estilos
3. Mantener los handlers existentes

### 5.2 Otras páginas

Actualizar gradualmente:
1. `Explore.jsx`
2. `ArtworkDetail.jsx`
3. `Cart.jsx`
4. etc.

---

## Paso 6: Testing Visual

### 6.1 Verificar en desarrollo

```bash
npm run dev
```

Revisar:
- [ ] Colores aplicados correctamente
- [ ] Tipografía consistente
- [ ] Espaciado correcto
- [ ] Responsive funciona
- [ ] Animaciones suaves
- [ ] Dark mode (si aplica)

### 6.2 Verificar funcionalidad

Los tests existentes deben seguir pasando:

```bash
npm test
```

Si hay tests que dependen de clases CSS específicas, pueden necesitar actualización.

---

## Checklist de Integración

```markdown
## Pre-Integración
- [ ] Maqueteo aprobado visualmente
- [ ] Tokens de diseño documentados
- [ ] Componentes del maqueteo listos

## Archivos a Crear/Modificar
- [ ] src/styles/tokens.css (CREAR)
- [ ] src/styles/components.css (CREAR o MODIFICAR)
- [ ] src/index.css (MODIFICAR imports)
- [ ] tailwind.config.js (MERGE)

## Componentes a Actualizar
- [ ] src/components/common/* (building blocks)
- [ ] src/components/Navbar.jsx
- [ ] src/components/Footer.jsx
- [ ] src/components/artwork/ArtworkCard.jsx
- [ ] src/pages/Home.jsx

## Validación
- [ ] npm run dev funciona sin errores
- [ ] Visual match con maqueteo
- [ ] npm test pasa
- [ ] Responsive verificado
- [ ] Performance ok

## Post-Integración
- [ ] Eliminar estilos legacy no usados
- [ ] Documentar cambios
- [ ] Commit con mensaje descriptivo
```

---

## Estrategia de Migración Gradual

Si prefieres una migración gradual en lugar de big-bang:

### Fase 1: Tokens
- Agregar tokens sin modificar componentes
- Los tokens coexisten con estilos actuales

### Fase 2: Building Blocks
- Crear nuevos componentes UI con nuevos estilos
- Los componentes antiguos siguen funcionando

### Fase 3: Home Page
- Actualizar solo la página principal
- Resto del sitio mantiene estilo actual

### Fase 4: Páginas Restantes
- Ir actualizando página por página
- Cada actualización es un commit separado

### Fase 5: Limpieza
- Eliminar estilos legacy no usados
- Eliminar clases CSS obsoletas
- Consolidar componentes duplicados

---

## Rollback

Si algo sale mal:

```bash
# Ver cambios
git status
git diff

# Descartar cambios no commiteados
git checkout -- .

# Revertir último commit
git revert HEAD
```

Por eso es importante:
1. Commitear antes de cada cambio mayor
2. Usar branches para cambios grandes
3. Mantener backup de archivos críticos

---

## Preguntas Frecuentes

### ¿Debo eliminar el glassmorphism actual?

No inmediatamente. Mantenerlo como fallback permite:
- Migración gradual
- Rollback fácil si algo falla
- Componentes que aún no se actualizaron siguen funcionando

### ¿Qué pasa con los tests?

Si los tests usan clases CSS específicas (ej: `.glass-card`):
- Actualizar los tests junto con los componentes
- O mantener las clases legacy temporalmente

### ¿Cómo manejar dark/light mode?

Opciones:
1. **CSS media query** - Automático según sistema
2. **Clase en `<html>`** - Manual con toggle
3. **Solo light mode** - Simplifica desarrollo

### ¿Qué hacer con componentes muy diferentes?

Si un componente del maqueteo es muy diferente al existente:
1. Crear versión nueva (ej: `ArtworkCardV2.jsx`)
2. Probar en paralelo
3. Migrar gradualmente las páginas
4. Eliminar versión antigua cuando no se use
