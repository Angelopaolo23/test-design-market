# RAIOS - Guía de Migración al Frontend Real

> **Propósito:** Esta guía proporciona el roadmap y las instrucciones para migrar los componentes de esta maquetación al frontend real de RAIOS.

---

## Resumen de Componentes Disponibles

### Componentes UI Base

| Componente | Ubicación | Descripción |
|------------|-----------|-------------|
| `Button` | `ui/Button.jsx` | Botón con variantes (primary, secondary, ghost) |
| `Input` | `ui/Input.jsx` | Input de texto con variantes y estados |
| `FormField` | `ui/FormField.jsx` | Wrapper con label, error, helper text |
| `Textarea` | `ui/Textarea.jsx` | Textarea con contador de caracteres |
| `Toggle` | `ui/Toggle.jsx` | Switch de activar/desactivar |
| `ArtworkCard` | `ui/ArtworkCard.jsx` | Card de obra con hover effects |
| `MasonryGrid` | `ui/MasonryGrid.jsx` | Layout masonry CSS columns |
| `EmptyState` | `ui/EmptyState.jsx` | Estados vacíos con variantes |

### Sistema Glassmorphism

| Componente | Ubicación | Descripción |
|------------|-----------|-------------|
| `GlassSurface` | `ui/GlassSurface.jsx` | Superficie base con blur |
| `GlassModal` | `ui/GlassModal.jsx` | Modal centrado |
| `GlassPanel` | `ui/GlassPanel.jsx` | Panel lateral deslizante |
| `GlassSheet` | `ui/GlassSheet.jsx` | Bottom sheet mobile |

### Panels Especializados

| Componente | Ubicación | Descripción |
|------------|-----------|-------------|
| `MenuPanel` | `ui/MenuPanel.jsx` | Menú de usuario |
| `CartPanel` | `ui/CartPanel.jsx` | Carrito de compras |
| `SearchOverlay` | `ui/SearchOverlay.jsx` | Búsqueda global |

### Sistema de Toast

| Componente | Ubicación | Descripción |
|------------|-----------|-------------|
| `Toast` | `ui/Toast.jsx` | Toast individual |
| `ToastContainer` | `ui/ToastContainer.jsx` | Container posicionable |
| `ToastProvider` | `ui/ToastContext.jsx` | Provider global |
| `useToast` | `ui/ToastContext.jsx` | Hook para disparar toasts |

### Layout

| Componente | Ubicación | Descripción |
|------------|-----------|-------------|
| `Navbar` | `layout/Navbar.jsx` | Navegación principal |
| `Footer` | `layout/Footer.jsx` | Pie de página |

### Secciones

| Componente | Ubicación | Descripción |
|------------|-----------|-------------|
| `Hero` | `sections/Hero.jsx` | Hero de landing |
| `CategoryCarousel` | `sections/CategoryCarousel.jsx` | Carrusel por categorías |
| `FeaturedWorks` | `sections/FeaturedWorks.jsx` | Obras destacadas masonry |

### Artwork Components

| Componente | Ubicación | Descripción |
|------------|-----------|-------------|
| `ImageGallery` | `artwork/ImageGallery.jsx` | Galería con thumbnails |
| `ArtworkInfo` | `artwork/ArtworkInfo.jsx` | Panel de información |
| `CommentsSection` | `artwork/CommentsSection.jsx` | Sección de comentarios |
| `RelatedWorks` | `artwork/RelatedWorks.jsx` | Obras relacionadas |
| `QuantitySelector` | `artwork/QuantitySelector.jsx` | Selector de cantidad |

### Settings Components

| Componente | Ubicación | Descripción |
|------------|-----------|-------------|
| `ProfileSection` | `settings/ProfileSection.jsx` | Sección de perfil |
| `NotificationsSection` | `settings/NotificationsSection.jsx` | Notificaciones |
| `AppearanceSection` | `settings/AppearanceSection.jsx` | Apariencia |
| `DangerZoneSection` | `settings/DangerZoneSection.jsx` | Zona de peligro |

### Backgrounds

| Componente | Ubicación | Descripción |
|------------|-----------|-------------|
| `BackgroundSwitcher` | `backgrounds/index.jsx` | Selector de fondos animados |
| Múltiples variantes | `backgrounds/*.jsx` | Wave, Orbs, Grid, etc. |

---

## Orden de Migración Recomendado

### Fase 1: Fundamentos (Día 1)

```
1. Copiar archivos de configuración
   ├── tailwind.config.js (tokens de diseño)
   ├── src/utils/animations.js (variantes Framer Motion)
   └── src/index.css (imports de fuentes)

2. Copiar componentes base
   ├── ui/Button.jsx
   ├── ui/GlassSurface.jsx
   └── ui/Input.jsx, FormField.jsx, Textarea.jsx, Toggle.jsx
```

### Fase 2: Sistema de Feedback (Día 1-2)

```
3. Sistema de Toast
   ├── ui/Toast.jsx
   ├── ui/ToastContainer.jsx
   ├── ui/ToastContext.jsx
   └── Envolver App en ToastProvider

4. Estados vacíos
   └── ui/EmptyState.jsx
```

### Fase 3: Glassmorphism (Día 2)

```
5. Componentes Glass
   ├── ui/GlassModal.jsx
   ├── ui/GlassPanel.jsx
   └── ui/GlassSheet.jsx

6. Panels especializados
   ├── ui/MenuPanel.jsx
   ├── ui/CartPanel.jsx
   └── ui/SearchOverlay.jsx
```

### Fase 4: Layout (Día 2-3)

```
7. Layout base
   ├── layout/Navbar.jsx
   ├── layout/Footer.jsx
   └── backgrounds/* (opcional)

8. Grids
   └── ui/MasonryGrid.jsx
```

### Fase 5: Páginas (Día 3-4)

```
9. Migrar página por página
   ├── Landing (integrar secciones existentes)
   ├── ArtworkDetail (artwork/*)
   └── Settings (settings/*)
```

---

## Checklist de Migración por Página

### Landing Page

- [ ] Navbar integrado
- [ ] Hero section
- [ ] CategoryCarousel con datos reales
- [ ] FeaturedWorks con API
- [ ] Footer
- [ ] Backgrounds animados
- [ ] MenuPanel conectado a auth
- [ ] CartPanel conectado a estado global
- [ ] SearchOverlay conectado a API

### Artwork Detail

- [ ] ImageGallery con imágenes reales
- [ ] ArtworkInfo con datos de API
- [ ] CommentsSection con API
- [ ] RelatedWorks con API
- [ ] Add to cart funcional
- [ ] Favoritos funcional
- [ ] Share funcional

### Settings

- [ ] ProfileSection conectado a API de usuario
- [ ] NotificationsSection conectado a preferencias
- [ ] AppearanceSection persistiendo preferencias
- [ ] DangerZoneSection con API de eliminación
- [ ] Toasts funcionando

---

## Patrones Establecidos

### Uso de Glassmorphism

```jsx
// Cuándo usar cada variante de GlassSurface
<GlassSurface variant="light" />   // Botones sobre imágenes
<GlassSurface variant="dark" />    // Overlays oscuros
<GlassSurface variant="surface" /> // Paneles, modales, navbar
```

### Sistema de Espaciado (6px base)

```jsx
// Usar clases de Tailwind configuradas
className="p-4"    // 24px (4 × 6px)
className="gap-2"  // 12px (2 × 6px)
className="mb-8"   // 48px (8 × 6px)
```

### Tipografía

```jsx
// Headers y títulos
<h1 className="font-mono text-2xl">Título</h1>

// Cuerpo de texto
<p className="font-sans text-base">Descripción</p>

// Labels de formulario
<label className="font-mono text-sm uppercase tracking-wider">Label</label>
```

### Colores Semánticos

```jsx
// Primario (CTAs, acentos)
className="bg-raios-primary text-white"

// Secundario (fondos)
className="bg-raios-secondary"

// Texto
className="text-raios-text-high"     // Principal
className="text-raios-text-support"  // Secundario
```

### Animaciones

```jsx
import { raios_transitions, slide_up_variants } from '../utils/animations';

// Transiciones
<motion.div transition={raios_transitions.standard} />
<motion.div transition={raios_transitions.fast} />
<motion.div transition={raios_transitions.slow} />

// Variantes de entrada
<motion.div variants={slide_up_variants} initial="hidden" animate="visible" />
```

### Sistema de Toast

```jsx
import { useToast } from '../components/ui';

function MyComponent() {
  const { toast_success, toast_error, toast_warning, toast_info } = useToast();

  const handle_save = async () => {
    try {
      await saveData();
      toast_success('Guardado', 'Los cambios se aplicaron correctamente');
    } catch (error) {
      toast_error('Error', 'No se pudo guardar');
    }
  };
}
```

---

## Convenciones de Código

### Naming

- **Variables/funciones:** `snake_case`
- **Componentes:** `PascalCase`
- **Archivos de componentes:** `PascalCase.jsx`
- **Props de callbacks:** `on_action` (ej: `on_click`, `on_change`)

### Estructura de Componentes

```jsx
/**
 * ComponentName - Descripción breve
 *
 * @param {Object} props
 * @param {string} props.prop_name - Descripción
 */
export function ComponentName({
  prop_name,
  on_action,
  className = '',
}) {
  // Estado
  const [state, set_state] = useState();

  // Handlers
  const handle_action = () => {};

  // Render
  return (
    <div className={`base-classes ${className}`}>
      {/* Contenido */}
    </div>
  );
}

export default ComponentName;
```

### Mobile-First

```jsx
// ✅ Correcto: base es mobile, escala hacia arriba
className="text-sm md:text-base lg:text-lg"

// ❌ Incorrecto: desktop-first
className="text-lg md:text-base sm:text-sm"
```

---

## Archivos Clave

| Archivo | Propósito |
|---------|-----------|
| `RAIOS_Design_System.md` | Tokens y reglas de diseño |
| `CLAUDE.md` | Instrucciones para Claude Code |
| `PLAN_FINAL_MAQUETACION.md` | Progress tracker (completado) |
| `tailwind.config.js` | Configuración de tokens |
| `src/utils/animations.js` | Variantes de animación |
| `src/index.css` | Imports de fuentes Google |

---

## Comandos de Desarrollo

```bash
# Desarrollo
npm run dev

# Build producción
npm run build

# Lint
npm run lint

# Preview build
npm run preview
```

---

## Notas Finales

1. **No copiar datos mock:** Los archivos contienen datos de ejemplo. Reemplazar con llamadas a API reales.

2. **Ajustar rutas de importación:** Las rutas pueden cambiar según la estructura del frontend real.

3. **Verificar dependencias:** Asegurar que el frontend real tenga:
   - `framer-motion`
   - `react-icons`
   - `react-router-dom`
   - Tailwind CSS configurado

4. **Testing:** Probar cada componente migrado individualmente antes de integrar.

5. **Iteración:** Esta guía es un punto de partida. Ajustar según las necesidades específicas del proyecto.

---

*Documento creado: 2026-01-28*
*Fase de maquetación: COMPLETADA*
