# Revisión del RAIOS Design System

> **Propósito:** Documentar hallazgos y tareas pendientes para refinar el Design System antes de la refactorización del frontend.
> **Fecha:** 2026-01-29
> **Estado:** Pendiente de implementación

---

## Contexto

El archivo `/RAIOS_Design_System.md` está **85% completo** pero tiene inconsistencias y secciones faltantes que pueden causar confusión durante la refactorización del frontend real.

**Principio de cambios:** NO modificar definiciones correctas. Solo:
- Corregir inconsistencias de nomenclatura
- Agregar secciones faltantes
- Refinar explicaciones confusas

---

## Hallazgos y Tareas

### 1. NOMENCLATURA INCONSISTENTE

**Problema:** El doc mezcla snake_case y kebab-case.

**Corrección necesaria:**

| Actual (incorrecto) | Correcto (snake_case) |
|---------------------|----------------------|
| `glass-surface` | `glass_surface` |
| `glass-content` | `glass_content` |
| `glass-light` | `glass_light` |
| `glass-dark` | `glass_dark` |
| `shadow-float` | `shadow_float` |
| `shadow-subtle` | `shadow_subtle` |

**Archivo:** RAIOS_Design_System.md, sección "Glassmorphism y Sombras"

---

### 2. SOMBRAS VS GLOWS NO DIFERENCIADOS

**Problema:** Hay dos sistemas que parecen mezclados:
- Sombras de elevación (float, subtle)
- Glows de jerarquía visual (glow_high, glow, glow_subtle)

**Corrección:** Separar claramente en dos subsecciones:

```markdown
#### Sombras de Elevación
Para crear profundidad y "flotación" de elementos.

| Token | Valor | Uso |
| shadow_float | 0 8px 32px rgba(0,0,0,0.4) | Cards carrusel, elementos flotantes |
| shadow_subtle | 0 4px 16px rgba(0,0,0,0.2) | Elevación sutil, dropdowns |

#### Glows de Jerarquía Visual
Para guiar atención según el framework "Next Best Action".

| Token | Valor | Uso |
| glow_high | 0 0 30px rgba(74,31,255,0.5) | CTA principal (máx 1/vista) |
| glow | 0 0 20px rgba(74,31,255,0.3) | Secciones secundarias |
| glow_subtle | 0 0 12px rgba(74,31,255,0.15) | Elementos terciarios |
```

---

### 3. ESCALA TIPOGRÁFICA INCOMPLETA

**Problema:** Solo documenta hasta `text-base`. Faltan tamaños pequeños.

**Agregar a la tabla existente:**

| Clase | Uso en RAIOS | Tamaño |
|-------|--------------|--------|
| `text-sm` | Metadatos, helper text, descripciones secundarias | 14px |
| `text-xs` | Labels de formulario, badges, timestamps | 12px |

---

### 4. SECCIÓN FALTANTE: Componentes de Formulario

**Agregar nueva sección después de "Border Radius":**

```markdown
### 📝 Componentes de Formulario

#### Input Base
- Fondo: `bg-white/5`
- Border: `border border-raios-text-support/20`
- Border focus: `focus:border-raios-primary focus:ring-1 focus:ring-raios-primary/30`
- Texto: `text-raios-text-high`
- Placeholder: `placeholder:text-raios-text-support/50`
- Rounded: `rounded-lg`
- Padding: `px-4 py-3`
- Font: `font-sans`

#### Estados
| Estado | Estilo |
|--------|--------|
| Default | Border `raios-text-support/20` |
| Focus | Border `raios-primary` + ring sutil |
| Error | Border `red-500` + mensaje rojo debajo |
| Disabled | `opacity-50 cursor-not-allowed` |

#### FormField (wrapper)
Combina: Label (font-mono, text-xs, uppercase) + Input + Helper/Error text

#### Toggle
- Track off: `bg-raios-text-support/30`
- Track on: `bg-raios-primary`
- Thumb: `bg-white`
- Transición: 200ms

#### Textarea
Mismos estilos que Input, con `min-h-[120px]` y `resize-y`
```

---

### 5. SECCIÓN FALTANTE: Sistema de Notificaciones (Toast)

**Agregar nueva sección:**

```markdown
### 🔔 Sistema de Notificaciones (Toast)

#### Tipos y Colores
| Tipo | Icono | Color acento |
|------|-------|--------------|
| `success` | FiCheck | `#22C55E` (green-500) |
| `error` | FiX | `#EF4444` (red-500) |
| `warning` | FiAlertTriangle | `#F59E0B` (amber-500) |
| `info` | FiInfo | `raios-primary` |

#### Especificaciones
- Base: `GlassSurface variant="surface"`
- Posición default: `top-right`
- Duración default: 5000ms
- Max visible: 5 toasts
- Animación entrada: slide-in desde derecha + fade
- Animación salida: fade-out

#### Estructura
```
┌─────────────────────────────────────┐
│ [Icon] Título                    [X]│
│       Mensaje opcional              │
│       [Acción opcional]             │
└─────────────────────────────────────┘
```
```

---

### 6. SECCIÓN FALTANTE: EmptyState

**Agregar:**

```markdown
### 📭 Estados Vacíos (EmptyState)

#### Variantes Predefinidas
| Variante | Icono | Título default |
|----------|-------|----------------|
| `no_results` | FiSearch | "Sin resultados" |
| `no_items` | FiPackage | "No hay elementos" |
| `no_favorites` | FiHeart | "Sin favoritos" |
| `no_comments` | FiMessageCircle | "Sin comentarios" |
| `error` | FiAlertCircle | "Algo salió mal" |

#### Estilos
- Icono: `text-raios-text-support/40`, tamaño `icon-xl` (36px)
- Título: `font-mono text-lg text-raios-text-high`
- Descripción: `font-sans text-raios-text-support`
- Centrado vertical y horizontal
- Animación entrada: fade + scale sutil
```

---

### 7. BOTÓN GHOST NO DOCUMENTADO

**En la sección de botones, agregar:**

| Variante | Estilo | Uso |
|----------|--------|-----|
| `ghost` | Sin fondo, sin border. Texto `raios-text-support`. Hover: `text-raios-text-high` | Acciones terciarias, links de navegación |

---

### 8. BREAKPOINTS COMPLETOS

**Agregar tabla explícita:**

```markdown
### 📱 Breakpoints

| Prefijo | Min-width | Uso típico |
|---------|-----------|------------|
| (base) | 0px | Mobile phones |
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablets |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Desktop grande |
| `2xl` | 1536px | Ultrawide |
```

---

## Orden de Implementación

1. ✅ Corregir nomenclatura (snake_case)
2. ✅ Separar sombras vs glows
3. ✅ Completar escala tipográfica
4. ✅ Agregar sección Formularios
5. ✅ Agregar sección Toast
6. ✅ Agregar sección EmptyState
7. ✅ Documentar botón ghost
8. ✅ Agregar breakpoints

---

## Prompt para Siguiente Sesión

```
Necesito que refines el archivo /RAIOS_Design_System.md según los hallazgos documentados en /DESIGN_SYSTEM_REVIEW.md

Reglas:
1. NO modificar definiciones que ya están correctas
2. Solo corregir inconsistencias de nomenclatura (usar snake_case)
3. Agregar las secciones faltantes documentadas
4. Mantener el estilo y formato del documento existente
5. Preservar todo el contenido existente que está correcto

Lee primero DESIGN_SYSTEM_REVIEW.md para entender exactamente qué cambiar, luego aplica los cambios a RAIOS_Design_System.md

Al terminar, haz commit con mensaje descriptivo.
```

---

## Archivos Relevantes

- `/RAIOS_Design_System.md` - Archivo a modificar
- `/DESIGN_SYSTEM_REVIEW.md` - Este archivo (guía de cambios)
- `/src/components/ui/` - Componentes implementados como referencia
