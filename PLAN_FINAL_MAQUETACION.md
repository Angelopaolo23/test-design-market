# RAIOS - Plan Final de Maquetación

> **Propósito:** Este documento sirve como roadmap y progress tracker para completar la fase de maquetación antes de comenzar la refactorización del frontend real.

---

## Estado del Proyecto

### Fecha de Inicio del Plan
- **Creado:** 2026-01-28
- **Última actualización:** 2026-01-28

### Resumen Ejecutivo
La maquetación de RAIOS está al **85-90% de completitud**. Faltan 4 componentes "ancla" que definirán patrones para el resto del sistema. Una vez implementados, el proyecto estará listo para la fase de refactorización del frontend real.

---

## Progress Tracker

```
FASE FINAL DE MAQUETACIÓN
═════════════════════════════════════════════════════════════════

[▓▓▓▓▓▓▓▓▓▓] 100% - TAREA 1: Input/FormField ✅ COMPLETADA
[▓▓▓▓▓▓▓▓▓▓] 100% - TAREA 2: Toast/Notification ✅ COMPLETADA
[▓▓▓▓▓▓▓▓▓▓] 100% - TAREA 3: EmptyState ✅ COMPLETADA
[▓▓▓▓▓▓▓▓▓▓] 100% - TAREA 4: Settings Page ✅ COMPLETADA
[▓▓▓▓▓▓▓▓▓▓] 100% - TAREA 5: Documentación Final ✅ COMPLETADA

═════════════════════════════════════════════════════════════════
PROGRESO TOTAL: [▓▓▓▓▓▓▓▓▓▓] 5/5 tareas completadas ✅ FASE COMPLETADA
═════════════════════════════════════════════════════════════════
```

---

## Componentes Ya Implementados (Contexto)

### Design System Base
- [x] `RAIOS_Design_System.md` - Documentación completa
- [x] `tailwind.config.js` - Tokens configurados
- [x] `src/utils/animations.js` - Variantes de Framer Motion

### Componentes UI
- [x] `Button` - Variantes primary, secondary, ghost
- [x] `ArtworkCard` - Card para obras con hover effects
- [x] `MasonryGrid` - Layout masonry reutilizable
- [x] `QuantitySelector` - Selector de cantidad

### Glassmorphism System
- [x] `GlassSurface` - Superficie base con blur
- [x] `GlassModal` - Modal centrado
- [x] `GlassPanel` - Panel lateral deslizante
- [x] `GlassSheet` - Bottom sheet mobile
- [x] **Variante `content`** - 60% opacidad + backdrop-blur-sm para secciones de contenido
- [x] **Shadow-glow Hierarchy** - Sistema de 3 niveles implementado:
  - `glow_high`: Máxima atención (1 por vista) - CTAs principales
  - `glow`: Importancia media - Secciones secundarias
  - `glow_subtle`: Acento suave - Elementos terciarios
- [x] **Accent line** - Para imágenes de arte (no compite con UI)
- [x] **Navbar** - 75% opacidad con blur
- [x] **Footer** - 75% opacidad con blur (coherencia con navbar)

### Panels Especializados
- [x] `MenuPanel` - Menú de usuario
- [x] `CartPanel` - Carrito de compras
- [x] `SearchOverlay` - Búsqueda global

### Layout
- [x] `Navbar` - Navegación principal con glassmorphism
- [x] `Footer` - Pie de página

### Secciones
- [x] `Hero` - Sección hero de landing
- [x] `CategoryCarousel` - Carrusel por categorías
- [x] `FeaturedWorks` - Obras destacadas con masonry

### Artwork Components
- [x] `ImageGallery` - Galería con thumbnails
- [x] `ArtworkInfo` - Panel de información de obra
- [x] `CommentsSection` - Sección de comentarios
- [x] `RelatedWorks` - Obras relacionadas con masonry

### Páginas
- [x] `Landing` - Página principal
- [x] `ArtworkDetail` - Detalle de obra

### Backgrounds
- [x] Sistema completo con múltiples variantes animadas
- [x] `BackgroundSwitcher` - Selector de fondos

---

## Tareas Pendientes (Detalle)

---

### TAREA 1: Input/FormField

**Prioridad:** ALTA
**Estimación:** 2-3 horas
**Estado:** ⏳ Pendiente

#### Descripción
Crear componentes de formulario base que sigan el Design System RAIOS. Estos componentes serán la base para todos los formularios del sistema.

#### Archivos a Crear
```
src/components/ui/
├── Input.jsx          # Input de texto base
├── FormField.jsx      # Wrapper con label + error
├── Textarea.jsx       # Textarea para textos largos
└── Select.jsx         # Select/dropdown (opcional)
```

#### Especificaciones de Diseño

**Input Base:**
- Fondo: `bg-raios-secondary/50` o `bg-white/5`
- Border: `border border-raios-text-support/20`
- Border focus: `focus:border-raios-primary`
- Text: `text-raios-text-high`
- Placeholder: `placeholder:text-raios-text-support/50`
- Rounded: `rounded-lg` (consistente con botones)
- Padding: `px-4 py-3`
- Font: `font-sans` para input, `font-mono` para labels

**Estados:**
- Default: Border sutil
- Focus: Border primary + ring sutil
- Error: Border rojo + mensaje de error
- Disabled: Opacity reducida, cursor not-allowed

**Variantes:**
- `default` - Input estándar
- `ghost` - Sin fondo, solo border
- `filled` - Con fondo más sólido

#### Props Esperadas
```typescript
interface InputProps {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  value: string;
  on_change: (value: string) => void;
  error?: string;
  helper_text?: string;
  disabled?: boolean;
  required?: boolean;
  icon_left?: ReactNode;
  icon_right?: ReactNode;
  variant?: 'default' | 'ghost' | 'filled';
}
```

#### Criterios de Aceptación
- [ ] Input renderiza correctamente en mobile y desktop
- [ ] Estados (focus, error, disabled) funcionan
- [ ] Label y helper text opcionales
- [ ] Iconos opcionales (izquierda/derecha)
- [ ] Integración con FormField wrapper
- [ ] Consistencia visual con el resto del DS
- [ ] Accesibilidad (labels, aria-attributes)

#### Notas de Implementación
- Usar `forwardRef` para permitir refs externas
- Incluir transiciones suaves en cambios de estado
- Mobile-first: padding táctil adecuado (min 44px height)

---

### TAREA 2: Toast/Notification

**Prioridad:** ALTA
**Estimación:** 2-3 horas
**Estado:** ⏳ Pendiente

#### Descripción
Sistema de notificaciones toast que use glassmorphism consistente con el resto de la UI. Debe soportar múltiples tipos (success, error, warning, info).

#### Archivos a Crear
```
src/components/ui/
├── Toast.jsx           # Componente toast individual
├── ToastContainer.jsx  # Container para posicionar toasts
└── useToast.js         # Hook para disparar toasts
```

#### Especificaciones de Diseño

**Toast Base:**
- Usar `GlassSurface` como base
- Variante `surface` con blur
- Icono a la izquierda según tipo
- Botón de cerrar opcional
- Auto-dismiss configurable

**Tipos y Colores:**
| Tipo | Icono | Color acento |
|------|-------|--------------|
| `success` | FiCheck | Verde (#22C55E) |
| `error` | FiX | Rojo (#EF4444) |
| `warning` | FiAlertTriangle | Amarillo (#F59E0B) |
| `info` | FiInfo | `raios-primary` |

**Posiciones:**
- `top-right` (default)
- `top-center`
- `bottom-right`
- `bottom-center`

**Animaciones:**
- Entrada: slide + fade desde la derecha
- Salida: fade out + slide
- Usar variantes de `raios_transitions`

#### Props Esperadas
```typescript
interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number; // ms, default 5000
  on_close?: () => void;
  action?: {
    label: string;
    on_click: () => void;
  };
}

interface UseToastReturn {
  toast: (props: Omit<ToastProps, 'id'>) => string;
  toast_success: (title: string, message?: string) => string;
  toast_error: (title: string, message?: string) => string;
  dismiss: (id: string) => void;
  dismiss_all: () => void;
}
```

#### Criterios de Aceptación
- [ ] Toast aparece con animación suave
- [ ] Auto-dismiss después de duration
- [ ] Hover pausa el auto-dismiss
- [ ] Múltiples toasts se apilan correctamente
- [ ] Botón de cerrar funciona
- [ ] Action button opcional funciona
- [ ] Hook `useToast` es fácil de usar
- [ ] Responsive: full-width en mobile
- [ ] Accesibilidad: role="alert", aria-live

#### Notas de Implementación
- Usar React Context para el estado global de toasts
- Considerar `createPortal` para renderizar fuera del DOM tree
- Limitar máximo de toasts visibles (ej: 5)

---

### TAREA 3: EmptyState

**Prioridad:** MEDIA
**Estimación:** 1-2 horas
**Estado:** ⏳ Pendiente

#### Descripción
Componente reutilizable para mostrar estados vacíos en listas, búsquedas sin resultados, etc. Sigue el patrón visual de RAIOS.

#### Archivos a Crear
```
src/components/ui/
└── EmptyState.jsx      # Componente de estado vacío
```

#### Especificaciones de Diseño

**Layout:**
- Centrado vertical y horizontal
- Icono grande arriba (icon-xl: 36px)
- Título debajo del icono
- Descripción opcional
- Action button opcional

**Estilos:**
- Icono: `text-raios-text-support/40`
- Título: `font-mono text-lg text-raios-text-high`
- Descripción: `font-sans text-raios-text-support`
- Padding generoso para "respiración"

**Variantes predefinidas:**
| Variante | Icono | Título default |
|----------|-------|----------------|
| `no_results` | FiSearch | "Sin resultados" |
| `no_items` | FiPackage | "No hay elementos" |
| `no_favorites` | FiHeart | "Sin favoritos" |
| `no_comments` | FiMessageCircle | "Sin comentarios" |
| `error` | FiAlertCircle | "Algo salió mal" |
| `custom` | (prop) | (prop) |

#### Props Esperadas
```typescript
interface EmptyStateProps {
  variant?: 'no_results' | 'no_items' | 'no_favorites' | 'no_comments' | 'error' | 'custom';
  icon?: ReactNode;        // Solo si variant='custom'
  title?: string;          // Override del default
  description?: string;
  action?: {
    label: string;
    on_click: () => void;
  };
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

#### Criterios de Aceptación
- [ ] Variantes predefinidas funcionan correctamente
- [ ] Variante custom permite icono y título personalizados
- [ ] Action button renderiza cuando se proporciona
- [ ] Tamaños (sm, md, lg) escalan proporcionalmente
- [ ] Responsive y centrado correctamente
- [ ] Animación sutil de entrada (fade + scale)

#### Notas de Implementación
- Mantener simple, no sobre-diseñar
- Los iconos deben ser de Feather Icons (react-icons/fi)
- Considerar ilustraciones SVG para versiones más elaboradas (futuro)

---

### TAREA 4: Settings Page (Skeleton)

**Prioridad:** MEDIA
**Estimación:** 3-4 horas
**Estado:** ⏳ Pendiente

#### Descripción
Crear una página de configuración que sirva como ejemplo de:
1. Uso de los nuevos componentes de formulario (Input, FormField)
2. Layout de página de configuración
3. Organización de secciones con GlassSurface

**IMPORTANTE:** Es un skeleton/maqueta. No necesita lógica real, solo validar el diseño.

#### Archivos a Crear
```
src/pages/
└── Settings.jsx        # Página de configuración

src/components/settings/
├── index.js            # Barrel export
├── ProfileSection.jsx  # Sección de perfil
├── NotificationsSection.jsx  # Sección de notificaciones
└── AppearanceSection.jsx     # Sección de apariencia (tema, etc.)
```

#### Especificaciones de Diseño

**Layout General:**
- Navbar (existente)
- Contenido en `max-w-3xl mx-auto` (más estrecho que ArtworkDetail)
- Secciones separadas con GlassSurface
- Footer (existente)

**Estructura de Página:**
```
┌─────────────────────────────────────────────┐
│  NAVBAR                                     │
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ CONFIGURACIÓN (título)               │   │
│  │ Administra tu cuenta y preferencias  │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ PERFIL                        [Edit] │   │
│  │ ┌───────┐                            │   │
│  │ │Avatar │  Nombre                    │   │
│  │ └───────┘  @username                 │   │
│  │                                      │   │
│  │ Email: _______________               │   │
│  │ Bio:   _______________               │   │
│  │        [Guardar cambios]             │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ NOTIFICACIONES                       │   │
│  │ ○ Emails de ventas                   │   │
│  │ ○ Emails de comentarios              │   │
│  │ ○ Newsletter                         │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ APARIENCIA                           │   │
│  │ Fondo animado: [Dropdown]            │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ ZONA DE PELIGRO                      │   │
│  │ [Eliminar cuenta]                    │   │
│  └─────────────────────────────────────┘   │
│                                             │
├─────────────────────────────────────────────┤
│  FOOTER                                     │
└─────────────────────────────────────────────┘
```

**Secciones a Implementar:**

1. **ProfileSection**
   - Avatar con botón de cambiar (solo UI)
   - Inputs: Nombre, Username, Email, Bio
   - Botón "Guardar cambios"

2. **NotificationsSection**
   - Toggles/checkboxes para preferencias
   - Al menos 3-4 opciones demo

3. **AppearanceSection**
   - Selector de fondo animado (integrar con BackgroundSwitcher existente)

4. **DangerZone**
   - Botón "Eliminar cuenta" (variant destructive)
   - Estilo diferenciado (borde rojo sutil)

#### Props y Componentes Necesarios

**Componente Toggle (nuevo, simple):**
```typescript
interface ToggleProps {
  checked: boolean;
  on_change: (checked: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
}
```

#### Criterios de Aceptación
- [ ] Página accesible desde ruta `/settings`
- [ ] Usa los nuevos componentes Input/FormField
- [ ] Secciones claramente separadas con GlassSurface
- [ ] Layout responsive (stack en mobile)
- [ ] Integración con sistema de backgrounds
- [ ] Consistencia visual con el resto del DS
- [ ] Muestra Toast al "guardar" (integración)

#### Notas de Implementación
- Añadir ruta en App.jsx o router
- Los datos son mock/estáticos
- Focus en validar el diseño, no la funcionalidad
- La zona de peligro debe tener confirmación (GlassModal)

---

### TAREA 5: Documentación Final

**Prioridad:** ALTA
**Estimación:** 1-2 horas
**Estado:** ⏳ Pendiente

#### Descripción
Actualizar la documentación del Design System y crear guía de migración para la fase de refactorización.

#### Archivos a Actualizar/Crear
```
├── RAIOS_Design_System.md    # Actualizar con nuevos componentes
├── MIGRATION_GUIDE.md        # NUEVO: Guía de migración
└── src/components/ui/index.js # Actualizar exports
```

#### Contenido de MIGRATION_GUIDE.md

1. **Inventario de Componentes**
   - Lista completa de componentes disponibles
   - Props de cada uno
   - Ejemplos de uso

2. **Orden de Migración Recomendado**
   - Qué migrar primero
   - Dependencias entre componentes

3. **Checklist de Migración por Página**
   - Landing
   - ArtworkDetail
   - Settings
   - (Otras páginas del frontend real)

4. **Patrones Establecidos**
   - Cómo usar glassmorphism
   - Cuándo usar cada variante de botón
   - Sistema de espaciado
   - Animaciones disponibles

#### Criterios de Aceptación
- [ ] RAIOS_Design_System.md actualizado con Input, Toast, EmptyState
- [ ] MIGRATION_GUIDE.md creado y completo
- [ ] Exports actualizados en index.js
- [ ] README.md actualizado con instrucciones de desarrollo

---

## Orden de Ejecución

```
SECUENCIA RECOMENDADA
═════════════════════════════════════════════════════════════════

1. Input/FormField ──────► Base para Settings
         │
         ▼
2. Toast/Notification ───► Feedback para Settings
         │
         ▼
3. EmptyState ───────────► Componente independiente
         │
         ▼
4. Settings Page ────────► Integra Input, Toast, valida patrones
         │
         ▼
5. Documentación Final ──► Cierra la fase de maquetación

═════════════════════════════════════════════════════════════════
```

**Razón del orden:**
- Input/FormField debe existir antes de Settings
- Toast debe existir para mostrar feedback en Settings
- EmptyState es independiente pero útil tenerlo antes
- Settings integra todo y valida que funcionan juntos
- Documentación cierra el ciclo

---

## Estimación Total

| Tarea | Estimación | Prioridad |
|-------|------------|-----------|
| Input/FormField | 2-3 horas | Alta |
| Toast/Notification | 2-3 horas | Alta |
| EmptyState | 1-2 horas | Media |
| Settings Page | 3-4 horas | Media |
| Documentación Final | 1-2 horas | Alta |
| **TOTAL** | **9-14 horas** | - |

**Tiempo calendario estimado:** 2-3 días de trabajo enfocado

---

## Criterios para "Listo para Refactorizar"

Antes de comenzar la refactorización del frontend real, verificar:

- [x] Todas las tareas marcadas como completadas
- [x] Progress tracker al 100%
- [ ] `npm run dev` sin errores
- [ ] Todas las páginas navegables y funcionales
- [x] Documentación actualizada
- [x] MIGRATION_GUIDE.md creado

---

## Notas para Futuras Sesiones de Claude Code

### Contexto del Proyecto
- **Nombre:** RAIOS - Design Marketplace
- **Stack:** React 19 + Vite + Tailwind CSS + Framer Motion
- **Principio:** Mobile-first obligatorio
- **Convención:** snake_case en variables

### Archivos Clave
- `/RAIOS_Design_System.md` - Tokens y reglas de diseño
- `/CLAUDE.md` - Instrucciones para Claude Code
- `/PLAN_FINAL_MAQUETACION.md` - Este documento (roadmap)
- `/src/utils/animations.js` - Variantes de animación

### Cómo Continuar
1. Leer este documento completo
2. Verificar el Progress Tracker
3. Continuar con la siguiente tarea pendiente
4. Actualizar el Progress Tracker al completar

### Comandos Útiles
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run lint     # Verificar código
```

---

## Historial de Actualizaciones

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-01-28 | Creación inicial del plan | Claude + Usuario |
| 2026-01-28 | TAREA 1: Input/FormField completada | Claude |
| 2026-01-28 | TAREA 2: Toast/Notification completada | Claude |
| 2026-01-28 | TAREA 3: EmptyState completada | Claude |
| 2026-01-28 | TAREA 4: Settings Page completada | Claude |
| 2026-01-28 | TAREA 5: Documentación Final completada | Claude |
| 2026-01-28 | **FASE DE MAQUETACIÓN COMPLETADA** | Claude + Usuario |
| 2026-01-28 | Implementación sistema shadow-glow hierarchy (3 niveles) | Claude |
| 2026-01-28 | Aplicación jerarquía glow en ArtworkDetail y Settings | Claude |
| 2026-01-28 | Documentación framework "Next Best Action" en Design System | Claude |

---

## Sistema de Jerarquía Visual (Shadow-Glow)

### Framework "Next Best Action"

La jerarquía de glow responde: **¿Cuál es la siguiente acción más valiosa para el objetivo de la vista?**

### Niveles Disponibles

| Nivel | Valor CSS | Uso |
|-------|-----------|-----|
| `glow_high` | `0 0 30px rgba(74,31,255,0.5)` | CTA principal, máximo 1 por vista |
| `glow` | `0 0 20px rgba(74,31,255,0.3)` | Secciones de importancia media |
| `glow_subtle` | `0 0 12px rgba(74,31,255,0.15)` | Elementos terciarios |

### Aplicación por Vista

#### ArtworkDetail
- `glow_high`: Panel de compra (ArtworkInfo)
- `glow`: Obras relacionadas (cross-sell)
- `glow_subtle`: Comentarios (social proof)
- **Accent line**: Imagen de la obra (no glow, ya es visualmente dominante)

#### Settings (Tab Cuenta)
- `glow_high`: ProfileSection (datos personales)
- `glow`: NotificationsSection (configuración importante)
- `glow_subtle`: AppearanceSection (preferencias visuales)
- **Sin glow**: DangerZoneSection (borde rojo especial)

#### Settings (Tab Vendedor)
- `glow_high`: Información de tienda (monetización)
- `glow`: Preferencias de venta
- `glow_subtle`: Stats cards, Envíos

#### Settings (Tab Direcciones)
- `glow`: Cada tarjeta de dirección (datos de envío)

### Regla para Contenido vs UI

El glow es para **elementos de UI**, no para contenido visualmente dominante:
- Imágenes de arte → Accent line (borde sutil)
- Avatares grandes → Ninguno o borde sutil
- Hero images → Ninguno

> **Principio:** "La imagen atrae, el glow guía"

---

*Fase de maquetación finalizada. Siguiente paso: verificar con `npm run dev` y proceder a refactorización del frontend real.*
