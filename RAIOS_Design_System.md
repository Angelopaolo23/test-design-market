# ⚡ RAIOS: Design System Simplificado

## Energía Creativa | Neo-Brutalismo Limpio

Este documento consolida los lineamientos estéticos (Tokens de Diseño) definidos para el marketplace RAIOS. El objetivo es lograr un look audaz, energético y dramático, que rompa con la estética de lujo tradicional.

> **Implementación:** Todos los tokens de diseño están centralizados en `tailwind.config.js`. No se usan archivos CSS de tokens separados. Esto garantiza una única fuente de verdad y autocomplete en el IDE.

---

### 📱 Principio Fundamental: Mobile-First

**Todo diseño y desarrollo en RAIOS se construye desde mobile-first.**

| Principio | Descripción |
| :-------- | :---------- |
| **Diseño base = Mobile** | Los estilos sin prefijo aplican a dispositivos móviles. |
| **Escalado progresivo** | Usar breakpoints ascendentes: `base` → `sm` (640px) → `md` (768px) → `lg` (1024px) → `xl` (1280px). |
| **UX consistente** | Cada elemento debe ofrecer una experiencia óptima en mobile antes de adaptarse a desktop. |
| **Contenido prioritario** | En mobile, mostrar lo esencial. En desktop, expandir con información adicional si aplica. |

> **Regla:** Si un componente no funciona bien en mobile, no está terminado.

---

### 🎨 Paleta de Colores (Electricidad y Dramatismo)

Los colores se definen con nombres semánticos que reflejan su propósito en la interfaz.

| Token Semántico      | Nombre                   | Hex Code  | Uso Principal                                                    |
| :------------------- | :----------------------- | :-------- | :--------------------------------------------------------------- |
| `raios-primary`      | Azul Violeta Eléctrico   | `#4A1FFF` | Color de Acento y CTA (Comprar, Links Activos).                  |
| `raios-secondary`    | Morado Espacial Profundo | `#0A0218` | Fondo Dominante de la aplicación (Dark Mode).                    |
| `raios-tertiary`     | Lavanda Brillante        | `#8E5CFF` | Acentos visuales sutiles: Gradientes, Circuitos, Efectos de luz. |
| `raios-text-high`    | Blanco Puro              | `#FFFFFF` | Tipografía principal y títulos.                                  |
| `raios-text-support` | Gris Claro               | `#A8A8B3` | Tipografía secundaria, bordes sutiles, iconos, metadatos.        |

#### Colores de Estado (Feedback)

| Token | Hex Code | Uso Principal |
| :---- | :------- | :------------ |
| `state-success` | `#22C55E` (green-500) | Confirmaciones, acciones exitosas, validación positiva. |
| `state-error` | `#EF4444` (red-500) | Errores, validación negativa, acciones destructivas. |
| `state-warning` | `#F59E0B` (amber-500) | Advertencias, acciones que requieren atención. |
| `state-info` | `raios-primary` | Información neutral, tips, ayuda contextual. |

> **Nota:** Los colores de estado usan la paleta de Tailwind para consistencia con el ecosistema. Se aplican en bordes, textos e iconos, nunca como fondos sólidos dominantes.

---

### 🖋️ Tipografía (Cibernética y Geométrica)

Las fuentes deben ser importadas desde Google Fonts y aplicadas a través de `tailwind.config.js`.

| Token Semántico | Fuente         | Estilo                 | Propósito                                                                  |
| :-------------- | :------------- | :--------------------- | :------------------------------------------------------------------------- |
| `font-mono`     | **Space Mono** | Display, Monospace     | Encabezados (H1-H6), Títulos de Obra, Precios de impacto.                  |
| `font-sans`     | **Montserrat** | Sans-serif, Geométrica | Cuerpo de Texto (Párrafos), Descripciones, Formularios (Alta Legibilidad). |

#### Escala Tipográfica Base

La escala de tamaño de fuente se mapeará directamente en las clases de Tailwind (`text-xl`, `text-2xl`, etc.).

| Clase (Ej.) | Uso en RAIOS                       | Tamaño (Ej.) |
| :---------- | :--------------------------------- | :----------- |
| `text-3xl`  | Título H1 (Página de Inicio)       | 48px         |
| `text-2xl`  | Título H2 (Sección Principal)      | 36px         |
| `text-xl`   | Título H3 (Título de Obra en Card) | 24px         |
| `text-lg`   | Subtítulos H4 / Navegación         | 20px         |
| `text-base` | Cuerpo de Texto (P)                | 16px         |
| `text-sm`   | Metadatos, helper text, descripciones secundarias | 14px |
| `text-xs`   | Labels de formulario, badges, timestamps | 12px |

---

### 📐 Espaciado (Sistema de $6\text{px}$)

Se utilizará un sistema de espaciado basado en $6\text{px}$ para un look único. La configuración se aplicará en `tailwind.config.js`.

| Clase (Ej.) | Valor (px) | Multiplicador | Uso Principal                                                     |
| :---------- | :--------- | :------------ | :---------------------------------------------------------------- |
| `spacing-1` | 6px        | 1x            | Espaciado mínimo.                                                 |
| `spacing-2` | 12px       | 2x            | Padding de botones, márgenes pequeños.                            |
| `spacing-4` | 24px       | 4x            | Márgenes de _Masonry Grid_ (`gutter`), separación de componentes. |
| `spacing-8` | 48px       | 8x            | Márgenes entre secciones grandes.                                 |

---

### 🎯 Iconografía (Escala de Iconos)

Los iconos siguen el sistema de espaciado de 6px para mantener consistencia visual. Se utiliza **Feather Icons** (via `react-icons/fi`) por su estilo outline limpio.

| Token       | Tamaño (px) | Multiplicador | Uso Principal                                              |
| :---------- | :---------- | :------------ | :--------------------------------------------------------- |
| `icon-sm`   | 18px        | 3x            | Metadatos, badges, indicadores secundarios.                |
| `icon-md`   | 24px        | 4x            | Acciones principales, navegación, botones de acción.       |
| `icon-lg`   | 30px        | 5x            | Estados destacados, elementos de énfasis.                  |
| `icon-xl`   | 36px        | 6x            | Hero sections, estados vacíos, ilustraciones.              |

#### Consideraciones Responsive

| Contexto           | Tamaño Recomendado | Área Táctil Mínima |
| :----------------- | :----------------- | :----------------- |
| Mobile (< 768px)   | `icon-md` (24px)   | 48px               |
| Desktop (≥ 768px)  | `icon-sm` (18-20px)| 40px               |

> **Nota UX:** Los elementos interactivos deben tener un área táctil mínima de 44-48px en dispositivos móviles para cumplir con las guidelines de accesibilidad.

---

### 🧱 Reglas de Layout y Estilo (Componentes)

Esta sección define las directrices visuales para los componentes clave de la interfaz, aplicando los tokens definidos.

| Componente                             | Regla de Diseño                                                                                                                                     | Tokens Aplicados                                              | Carácter Visual                                           |
| :------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------ | :-------------------------------------------------------- |
| **Header (NavBar)**                    | **Glassmorphism Sutil**. Fondo `raios-secondary` (#0A0218) con opacidad media (`/90`) y `backdrop-blur-sm`. Logo y navegación en `raios-text-high`. | **Secundario**, `raios-text-high`, `font-mono`.               | Flotante, tecnológico, alto contraste.                    |
| **Botón Primario (CTA)**               | Fondo `raios-primary`. Texto `raios-text-high`. **Hover** con inversión de color (Fondo blanco, texto `raios-primary`).                             | **Primario**, `raios-text-high`.                              | Máximo impacto y CTA de Energía.                          |
| **Botón Secundario**                   | **Transparente** con borde delgado en `raios-primary`. Texto en `raios-primary`. **Hover** con fondo lleno de `raios-primary`.                      | **Primario** (para borde y texto).                            | Acción de soporte, mantiene la energía sin ser dominante. |
| **Botón Ghost**                        | Sin fondo, sin border. Texto `raios-text-high`. **Hover**: `bg-white/10` (feedback visual sutil). | `raios-text-high`, `bg-white/10`. | Acciones terciarias, links de navegación, acciones sutiles. |
| **Art Card / Masonry**                 | Sin bordes ni sombras. Layout de grilla irregular. Texto clave (`font-mono`) en `raios-text-high` flotando sobre la imagen.                         | **Secundario**, `raios-text-high`, `font-mono`.               | Audaz, experimental, la obra es protagonista.             |
| **Bloque Promocional Audaz (Artista)** | Bloque horizontal `w-full`. Imagen con filtro/opacidad baja sobre fondo `raios-secondary`. **Título H1/H2** en `font-mono` y `raios-text-high`.     | **Secundario**, `raios-text-high`, `raios-tertiary` (acento). | Interrupción visual, jerarquía alta, dramático.           |
| **Bloque de Categoría/Noticia**        | Bloque vertical (ej. `w-1/2`). Fondo `raios-secondary`. **Línea de Separación** en color `raios-primary` para energía. Título en `font-mono`.       | **Primario** (línea), **Secundario**, `raios-text-high`.      | Informativo, angular, contenido curado.                   |
| **Vistas Críticas (Detalle/Settings)** | Secciones de contenido envueltas en `GlassSurface variant="content"` para separación clara del background. Layout asimétrico (60/40) a favor de la imagen. | **Secundario**, `raios-text-high`, **`glass_content`**.       | Legibilidad, Claridad, Separación visual.                 |

> **IMPORTANTE - Clarificación sobre "Vistas Críticas":**
>
> La regla original "NO Glassmorphism" se refería a evitar transparencia excesiva **en las imágenes de las obras de arte**, no en los contenedores de UI.
>
> **Interpretación correcta:**
> - ❌ NO aplicar glassmorphism/transparencia a las imágenes de obras (el arte es protagonista)
> - ✅ SÍ usar `GlassSurface variant="content"` para contenido que necesita legibilidad (ArtworkInfo, Comments, Settings)
> - ✅ SÍ usar `GlassSurface variant="surface"` para elementos flotantes transitorios (Navbar, modales, paneles)
>
> **Razón:** Con backgrounds animados, el contenido necesita separación visual para ser legible. La variante `content` usa un fondo casi sólido (95% opacidad) con borde violeta sutil que crea una separación clara sin perder la cohesión visual.
>
> **Cuándo usar cada variante:**
> | Variante | Opacidad | Borde | Uso |
> | :------- | :------- | :---- | :-- |
> | `surface` | 75% | muy sutil | Navbar, modales, CartPanel, MenuPanel |
> | `content` | 60% | violeta sutil | ArtworkInfo, Comments, Settings sections |

---

### 🔲 Border Radius (Esquinas)

El estilo neo-brutalista prefiere esquinas más angulares. Se define un sistema consistente:

| Token | Valor | Uso Principal |
| :---- | :---- | :------------ |
| `rounded-none` | 0px | Imágenes de obras de arte (protagonismo sin distracción). |
| `rounded-sm` | 4px | Esquinas sutiles en elementos secundarios. |
| `rounded` | 6px | Tags, badges, chips de categoría. |
| `rounded-lg` | 12px | Botones, inputs, cards de UI. |
| `rounded-full` | 9999px | Botones de acción circulares (favorito, carrito). |

> **Principio:** Las obras de arte no llevan rounded (el arte es el protagonista). Los elementos de UI sí pueden tenerlo.

---

### 📱 Breakpoints

| Prefijo | Min-width | Uso típico |
| :------ | :-------- | :--------- |
| (base) | 0px | Mobile phones |
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablets |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Desktop grande |
| `2xl` | 1536px | Ultrawide |

---

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
| :----- | :----- |
| Default | Border `raios-text-support/20` |
| Focus | Border `raios-primary` + ring sutil |
| Error | Border `red-500` + mensaje rojo debajo |
| Disabled | `opacity-50 cursor-not-allowed` |

#### FormField (wrapper)
Combina: Label (`font-mono`, `text-xs`, `uppercase`) + Input + Helper/Error text

#### Toggle
- Track off: `bg-raios-text-support/30`
- Track on: `bg-raios-primary`
- Thumb: `bg-white`
- Transición: 200ms

#### Textarea
Mismos estilos que Input, con `min-h-[120px]` y `resize-y`

---

### 🔗 Links y Anclas

#### Estilos Base

| Tipo | Estilo | Uso |
| :--- | :----- | :-- |
| **Link inline** | `text-raios-primary` + hover: `text-raios-tertiary` + `underline` | Links dentro de párrafos, textos legales. |
| **Link navegación** | `text-raios-text-high` + hover: `text-raios-primary` | Menús, navbars, breadcrumbs. |
| **Link sutil** | `text-raios-text-support` + hover: `text-raios-text-high` | Metadatos, footers, info secundaria. |

#### Estados

| Estado | Estilo |
| :----- | :----- |
| Default | Color base según tipo |
| Hover | Cambio de color + `transition-colors duration-150` |
| Focus | `outline-none ring-2 ring-raios-primary/50 ring-offset-2 ring-offset-raios-secondary` |
| Active | `opacity-80` |
| Visited | Mismo que default (no diferenciar para mantener estética limpia) |

#### Accesibilidad
- Los links deben ser distinguibles del texto normal (color diferente o subrayado)
- El estado focus debe ser visible para navegación por teclado
- Usar `ring-offset` para separar el ring del background oscuro

```jsx
// Link inline (dentro de texto)
<a className="text-raios-primary hover:text-raios-tertiary underline transition-colors">
  Ver términos
</a>

// Link de navegación
<a className="text-raios-text-high hover:text-raios-primary transition-colors">
  Explorar
</a>

// Link sutil (footer, metadata)
<a className="text-raios-text-support hover:text-raios-text-high transition-colors">
  @artista
</a>
```

---

### ⏳ Estados de Carga (Loading States)

#### Skeleton Base

Placeholder animado que indica contenido cargando.

| Token | Valor | Uso |
| :---- | :---- | :-- |
| `skeleton-base` | `bg-raios-text-support/10` | Color base del skeleton |
| `skeleton-shine` | `bg-gradient-to-r from-transparent via-white/5 to-transparent` | Efecto de brillo |
| `skeleton-animation` | `animate-pulse` o shimmer custom | Animación de carga |

#### Variantes de Skeleton

| Variante | Forma | Uso |
| :------- | :---- | :-- |
| `skeleton-text` | `h-4 rounded` | Líneas de texto |
| `skeleton-title` | `h-6 rounded w-3/4` | Títulos |
| `skeleton-avatar` | `rounded-full` | Avatares, iconos circulares |
| `skeleton-image` | `rounded-lg aspect-[4/3]` | Imágenes de obras |
| `skeleton-button` | `h-10 rounded-lg w-32` | Botones |

#### Implementación

```jsx
// Skeleton de texto (múltiples líneas)
<div className="space-y-2 animate-pulse">
  <div className="h-4 bg-raios-text-support/10 rounded w-full" />
  <div className="h-4 bg-raios-text-support/10 rounded w-5/6" />
  <div className="h-4 bg-raios-text-support/10 rounded w-4/6" />
</div>

// Skeleton de card de obra
<div className="animate-pulse">
  <div className="aspect-[4/3] bg-raios-text-support/10 rounded-lg" />
  <div className="mt-3 space-y-2">
    <div className="h-4 bg-raios-text-support/10 rounded w-3/4" />
    <div className="h-3 bg-raios-text-support/10 rounded w-1/2" />
  </div>
</div>

// Skeleton de avatar + nombre
<div className="flex items-center gap-3 animate-pulse">
  <div className="w-10 h-10 bg-raios-text-support/10 rounded-full" />
  <div className="space-y-1">
    <div className="h-4 bg-raios-text-support/10 rounded w-24" />
    <div className="h-3 bg-raios-text-support/10 rounded w-16" />
  </div>
</div>
```

#### Spinners

Para acciones puntuales (submit de formulario, carga de botón).

| Variante | Tamaño | Uso |
| :------- | :----- | :-- |
| `spinner-sm` | 16px | Dentro de botones pequeños |
| `spinner-md` | 24px | Botones estándar, inline |
| `spinner-lg` | 32px | Carga de sección |

```jsx
// Spinner base
<svg className="animate-spin h-5 w-5 text-raios-primary" viewBox="0 0 24 24">
  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
</svg>
```

#### Reglas de Uso

| Contexto | Tipo de loading | Razón |
| :------- | :-------------- | :---- |
| Lista de obras | Skeleton cards | Preserva layout, menos "salto" visual |
| Botón submit | Spinner inline | Feedback inmediato de acción |
| Página completa | Skeleton de secciones | UX percibida más rápida |
| Búsqueda | Spinner + texto | Indica proceso activo |
| Imagen individual | Skeleton + fade-in | Transición suave cuando carga |

> **Principio:** Usar skeletons cuando conocemos la estructura del contenido. Usar spinners para acciones donde no sabemos cuánto tardará.

---

### 🔔 Sistema de Notificaciones (Toast)

#### Tipos y Colores

| Tipo | Icono | Color acento |
| :--- | :---- | :----------- |
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

---

### 📭 Estados Vacíos (EmptyState)

#### Variantes Predefinidas

| Variante | Icono | Título default |
| :------- | :---- | :------------- |
| `no_results` | FiSearch | "Sin resultados" |
| `no_items` | FiPackage | "No hay elementos" |
| `no_favorites` | FiHeart | "Sin favoritos" |
| `no_comments` | FiMessageCircle | "Sin comentarios" |
| `no_artworks` | FiImage | "Sin obras" |
| `error` | FiAlertCircle | "Algo salió mal" |

#### Estilos
- Icono: `text-raios-text-support/40`, tamaño `icon-xl` (36px)
- Título: `font-mono text-lg text-raios-text-high`
- Descripción: `font-sans text-raios-text-support`
- Centrado vertical y horizontal
- Animación entrada: fade + scale sutil

#### Reglas de Uso: ¿Cuándo incluir acción?

La prop `action` es **opcional**. Usar según el contexto:

| Variante | ¿Acción? | Razón | Ejemplo |
| :------- | :------- | :---- | :------ |
| `no_results` | ✅ Sí | Usuario "atrapado" sin salida | "Limpiar filtros", "Explorar todo" |
| `no_items` | ⚠️ Depende | Si hay forma de agregar desde otro lugar | "Ir a comprar" (carrito vacío) |
| `no_favorites` | ✅ Sí | Invitar a explorar | "Descubrir obras" |
| `no_comments` | ❌ No | Input de comentario ya visible arriba | — |
| `no_artworks` | ⚠️ Depende | Varía según quién ve (ver abajo) | — |
| `error` | ✅ Sí | Ofrecer recuperación | "Reintentar", "Ir al inicio" |

**Caso especial `no_artworks`:**

| Contexto | ¿Acción? | Razón |
| :------- | :------- | :---- |
| Perfil propio del artista | ✅ Sí | "Publicar tu primera obra" |
| Perfil de otro artista | ❌ No | Visitante no puede hacer nada |
| Categoría vacía | ✅ Sí | "Explorar otras categorías" |
| Colección vacía del usuario | ✅ Sí | "Agregar obras" |

**Principio general:** Incluir acción cuando el usuario está "atrapado" y necesita una salida. Omitir cuando el contexto ya provee la acción (ej: input visible) o cuando el usuario no puede hacer nada al respecto

---

### 🪟 Glassmorphism y Sombras

El glassmorphism complementa el neo-brutalismo agregando profundidad y sofisticación sin perder la energía audaz.

#### Tokens de Glassmorphism

| Token | Valor | Uso Principal |
| :---- | :---- | :------------ |
| `glass_light` | `bg-white/10 backdrop-blur-md border-white/20` | Botones secundarios, overlays sutiles. |
| `glass_dark` | `bg-black/30 backdrop-blur-md border-white/10` | Botones sobre imágenes, acciones flotantes. |
| `glass_surface` | `bg-raios-secondary/75 backdrop-blur-sm border-raios-text-support/10` | Navbar, footer, paneles flotantes. |
| `glass_content` | `bg-[rgba(10,2,24,0.60)] backdrop-blur-sm border-raios-primary/15` | **Secciones de contenido crítico** (ArtworkInfo, Settings, Comments). |

> **Nota sobre opacidades:** Se usa 75% para `glass_surface` (navbar/footer) y 60% para `glass_content`. El `backdrop-blur-sm` se prefiere sobre `xl` porque blur excesivo no produce el efecto glass deseado con nuestro background animado.

#### Sombras de Elevación

Para crear profundidad y "flotación" de elementos.

| Token | Valor | Uso Principal |
| :---- | :---- | :------------ |
| `shadow_float` | `0 8px 32px rgba(0, 0, 0, 0.4)` | Cards en carrusel, elementos que "flotan". |
| `shadow_subtle` | `0 4px 16px rgba(0, 0, 0, 0.2)` | Elevación sutil, dropdowns. |

#### Glows de Jerarquía Visual

Para guiar atención según el framework "Next Best Action". Sistema de 3 niveles para establecer jerarquía visual mediante glow violeta.

| Token | Valor | Intensidad | Uso Principal |
| :---- | :---- | :--------- | :------------ |
| `glow_high` | `0 0 30px rgba(74, 31, 255, 0.5)` | Máxima | CTA principal, panel de compra. **Máximo 1 por vista.** |
| `glow` | `0 0 20px rgba(74, 31, 255, 0.3)` | Media | Secciones secundarias (comentarios, formularios). |
| `glow_subtle` | `0 0 12px rgba(74, 31, 255, 0.15)` | Suave | Elementos terciarios (obras relacionadas, metadatos). |

**Reglas de uso:**
1. **Máximo 1 elemento con `glow_high` por vista** - Reservar para el CTA principal
2. **`glow` puede repetirse moderadamente** - Para secciones de importancia media
3. **`glow_subtle` para acentos secundarios** - Elementos que complementan, no compiten

---

#### Framework de Jerarquía Visual por Vista

La asignación de glow depende del **principio rector** de cada vista. Cada página tiene un "North Star" que define qué elemento recibe máxima atención.

##### Principio: "Next Best Action"

> La jerarquía responde: **¿Cuál es la siguiente acción más valiosa que queremos que el usuario tome?**

##### Matriz de Decisión por Vista

| Vista | Principio Rector | glow_high | glow | glow_subtle |
|:------|:-----------------|:----------|:-----|:------------|
| **ArtworkDetail** | Monetización directa | Panel de compra | Obras relacionadas (cross-sell) | Comentarios (social proof) |
| **Categories/Artists** | Descubrimiento → Monetización | Obras destacadas | Filtros/navegación | Metadatos |
| **Settings** | Captura de preferencias | Sección activa del formulario | Otras secciones | Información contextual |
| **Proposals** | Participación comunitaria | Crear nueva proposal | Proposals existentes | Instrucciones/guías |
| **News** | Consumo de contenido | Artículo principal/destacado | Artículos secundarios | Navegación/tags |
| **Landing** | Engagement inicial | Hero CTA | Categorías/Obras destacadas | Footer/info |

##### Lógica de Asignación

1. **Identificar el North Star de la vista** - ¿Cuál es el objetivo principal?
2. **Mapear acciones a valor** - ¿Qué acción acerca más al usuario al objetivo?
3. **Asignar jerarquía descendente** - Mayor glow = mayor valor para el objetivo

##### Ejemplo: ArtworkDetail

```
Objetivo: Monetización directa (venta de la obra)

┌─────────────────────────────────────────────────┐
│  ArtworkInfo (glow_high)                        │
│  → Acción: Comprar                              │
│  → Valor: Transacción directa                   │
├─────────────────────────────────────────────────┤
│  RelatedWorks (glow)                            │
│  → Acción: Explorar más obras                   │
│  → Valor: Cross-sell, retiene en flujo de compra│
├─────────────────────────────────────────────────┤
│  Comments (glow_subtle)                         │
│  → Acción: Leer/escribir opiniones              │
│  → Valor: Social proof (refuerza, no convierte) │
└─────────────────────────────────────────────────┘
```

```jsx
// Panel de compra - acción primaria
<GlassSurface variant="content" shadow="glow_high">
  <ArtworkInfo />
</GlassSurface>

// Obras relacionadas - retención en flujo de compra
<GlassSurface variant="content" shadow="glow">
  <RelatedWorks />
</GlassSurface>

// Comentarios - refuerzo de decisión
<GlassSurface variant="content" shadow="glow_subtle">
  <CommentsSection />
</GlassSurface>
```

##### Ejemplo: Proposals

```
Objetivo: Participación comunitaria (feedback, reportes, ideas)

┌─────────────────────────────────────────────────┐
│  CreateProposal (glow_high)                     │
│  → Acción: Crear nueva proposal                 │
│  → Valor: Genera contenido, engagement activo   │
├─────────────────────────────────────────────────┤
│  ProposalsList (glow)                           │
│  → Acción: Leer/votar proposals existentes      │
│  → Valor: Engagement pasivo, validación social  │
├─────────────────────────────────────────────────┤
│  Guidelines (glow_subtle)                       │
│  → Acción: Consultar reglas                     │
│  → Valor: Soporte, no es acción principal       │
└─────────────────────────────────────────────────┘
```

> **Principio clave:** El glow guía al usuario hacia la acción que más valor genera para el objetivo de la vista. No es decorativo, es funcional.

##### Contenido vs UI: Cuándo NO usar glow

El glow es un recurso de **UI**, no de contenido. Algunos elementos no necesitan glow porque ya son visualmente dominantes por naturaleza:

| Elemento | Recurso visual | Razón |
|:---------|:---------------|:------|
| Imagen de obra | Accent line (`border-b-raios-primary/30`) | El arte atrae atención naturalmente, no necesita competir |
| Avatares grandes | Ninguno o borde sutil | Ya son punto focal visual |
| Hero images | Ninguno | Dominan por tamaño y color |

**Flujo visual en ArtworkDetail:**
```
┌──────────────────────┐
│                      │
│       IMAGEN         │  ← Atención natural (el arte)
│                      │
├──────────────────────┤  ← accent line (integra al sistema)
└──────────────────────┘

┌──────────────────────┐
│   Panel de compra    │  ← glow_high (guía hacia acción)
│   [Comprar]          │
└──────────────────────┘
```

> **Regla:** La imagen atrae, el glow guía. No uses glow para contenido que ya es visualmente dominante.

#### Cuándo usar cada uno

| Contexto | Estilo | Ejemplo |
| :------- | :----- | :------ |
| Fondos principales | Sólido (`raios-secondary`) | Body, secciones. |
| Elementos flotantes | `glass_surface` + shadow | Navbar, modales, tooltips, CartPanel. |
| **Contenido sobre background** | **`glass_content`** | **ArtworkInfo, Settings sections, Comments.** |
| Botones sobre imágenes | `glass_dark` | Favorito/carrito en cards. |
| CTAs primarios | Sólido (`raios-primary`) | Deben destacar sobre el glass. |
| Cards en spotlight | `shadow_float` | Carrusel, elementos destacados. |
| Panel de compra | `glow_high` | ArtworkInfo, checkout. |
| Secciones secundarias | `glow` | Comentarios, formularios. |
| Contenido terciario | `glow_subtle` | Relacionados, metadatos. |

> **Principio:** El glassmorphism crea capas y profundidad. Usarlo en elementos de UI, no en el contenido artístico.

> **IMPORTANTE - Regla de legibilidad:** Cuando el contenido necesita ser claramente legible sobre el background animado (formularios, información de producto, comentarios), usar `glass_content` en lugar de `glass_surface`. El background ligeramente más sólido garantiza la legibilidad sin sacrificar completamente la sensación de capas.

---

### 🎬 Animaciones y Transiciones

Sistema de animaciones estandarizado para mantener coherencia visual en toda la aplicación. Utiliza Framer Motion como motor principal.

#### Duraciones

| Token | Valor | Uso Principal |
| :---- | :---- | :------------ |
| `duration-fast` | 150ms | Hovers, micro-interacciones, cambios de estado inmediatos. |
| `duration-standard` | 300ms | Transiciones de UI generales, apariciones/desapariciones. |
| `duration-slow` | 500ms | Carruseles, entradas/salidas de página, animaciones de énfasis. |

#### Curvas de Easing (Framer Motion)

| Token | Valor | Uso Principal |
| :---- | :---- | :------------ |
| `ease-out` | `[0, 0, 0.2, 1]` | Entradas de elementos (aparecen rápido, desaceleran). |
| `ease-in-out` | `[0.4, 0, 0.2, 1]` | Movimientos continuos, transiciones de posición. |
| `ease-spring` | `{ type: "spring", stiffness: 300, damping: 30 }` | Rebote sutil, sensación orgánica. |

#### Variantes Reutilizables (Framer Motion)

```javascript
// Configuración base exportable
export const raios_transitions = {
  fast: { duration: 0.15, ease: [0, 0, 0.2, 1] },
  standard: { duration: 0.3, ease: [0, 0, 0.2, 1] },
  slow: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  spring: { type: "spring", stiffness: 300, damping: 30 },
};

// Variantes de aparición
export const fade_variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: raios_transitions.standard },
  exit: { opacity: 0, transition: raios_transitions.fast },
};

// Variantes de slide (entrada desde abajo)
export const slide_up_variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: raios_transitions.standard },
  exit: { opacity: 0, y: -10, transition: raios_transitions.fast },
};

// Variantes de escala
export const scale_variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: raios_transitions.standard },
  exit: { opacity: 0, scale: 0.95, transition: raios_transitions.fast },
};

// Variantes para carrusel (item central vs laterales)
export const carousel_variants = {
  center: {
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
    zIndex: 10,
    transition: raios_transitions.slow
  },
  side: {
    scale: 0.75,
    opacity: 0.5,
    filter: "blur(4px)",
    zIndex: 5,
    transition: raios_transitions.slow
  },
  hidden: {
    scale: 0.5,
    opacity: 0,
    filter: "blur(8px)",
    zIndex: 0,
    transition: raios_transitions.standard
  },
};
```

#### Reglas de Uso

| Contexto | Duración | Easing | Ejemplo |
| :------- | :------- | :----- | :------ |
| Hover en botones | `fast` | `ease-out` | Cambio de color/escala en botón. |
| Aparición de cards | `standard` | `ease-out` | Cards entrando en viewport (whileInView). |
| Transición de carrusel | `slow` | `ease-in-out` | Cambio de obra activa en carrusel. |
| Modales/Overlays | `standard` | `ease-out` | Apertura/cierre de modales. |
| Navegación de página | `slow` | `ease-in-out` | Transiciones entre rutas. |

> **Principio:** Las animaciones deben sentirse naturales y no interrumpir el flujo del usuario. Menos es más.

---

### 🏗️ Arquitectura de Capas (Glassmorphism Layers)

RAIOS utiliza un sistema de capas que crea profundidad y sofisticación. El background animado es parte de la identidad visual de la marca.

#### Sistema de Capas

```
┌─────────────────────────────────────────────────────────────┐
│  CAPA 4: Modales de alta prioridad (confirmaciones, alerts) │  z-50
├─────────────────────────────────────────────────────────────┤
│  CAPA 3: Popovers/Sheets (detalle obra, carrito, config)    │  z-40
├─────────────────────────────────────────────────────────────┤
│  CAPA 2: Navegación fija (navbar, tabs)                     │  z-30
├─────────────────────────────────────────────────────────────┤
│  CAPA 1: Contenido principal (landing, masonry, listas)     │  z-10
├─────────────────────────────────────────────────────────────┤
│  CAPA 0: Background dinámico (siempre visible)              │  z-0
└─────────────────────────────────────────────────────────────┘
```

#### Descripción de Capas

| Capa | z-index | CSS Variable | Contenido | Estilo |
| :--- | :------ | :----------- | :-------- | :----- |
| **Capa 0** | z-0 | `--z-background` | Background animado (orbes, gradientes, partículas) | Fijo, siempre visible, define identidad visual |
| **Capa 1** | z-10 | `--z-content` | Contenido scrolleable (landing, masonry, listas) | Puede ser semi-transparente en partes |
| **Capa 2** | z-30 | `--z-navigation` | Navbar, tabs de navegación | `glass_surface` con backdrop-blur |
| **Capa 3** | z-40 | `--z-overlay` | Paneles, carrito, sheets, popovers | `glass_surface` como popover/modal |
| **Capa 4** | z-50 | `--z-modal` | Modales, alertas, confirmaciones, toasts | `glass_surface` o sólido según urgencia |

> **Nota:** Las variables CSS (`--z-*`) están definidas en `tokens.css` y corresponden directamente a las clases de Tailwind (`z-0`, `z-10`, etc.).

#### Background Dinámico (Capa 0)

El background es parte de la identidad de RAIOS. Características:

| Aspecto | Especificación |
| :------ | :------------- |
| **Tipo** | Gradientes animados, orbes de luz, efectos sutiles |
| **Colores** | Derivados de la paleta RAIOS (primary, secondary, tertiary) |
| **Movimiento** | Lento y sutil, no distrae del contenido |
| **Rendimiento** | Preferir CSS/SVG sobre canvas/WebGL para mejor performance |
| **Personalización** | MVP: 1 background por defecto. Futuro: 2-3 variantes opcionales |

#### Superficies Glassmorphism (Capas 2-4)

Componentes que "flotan" sobre el background usan glassmorphism para dejar entrever la capa inferior.

```jsx
// Componente GlassSurface base (variante surface)
<div className="
  bg-raios-secondary/75
  backdrop-blur-sm
  border border-raios-text-support/10
  shadow-[0_8px_32px_rgba(0,0,0,0.4)]
">
  {children}
</div>
```

#### Transiciones entre Capas

| Transición | Animación | Duración |
| :--------- | :-------- | :------- |
| **Abrir popover** | `scale: 0.95 → 1` + `opacity: 0 → 1` | 300ms |
| **Cerrar popover** | `scale: 1 → 0.98` + `opacity: 1 → 0` | 200ms |
| **Slide-in (carrito)** | `x: 100% → 0` + `opacity: 0 → 1` | 300ms |
| **Card → Detalle** | Card hace `scale: 1 → 1.02`, luego fade a popover | 400ms total |

#### Ejemplo: Flujo de navegación

```
Usuario en Landing (Capa 1)
        ↓ click en artwork card
Card hace scale-up sutil (feedback)
        ↓
Fade del contenido de Capa 1
        ↓
Aparece Detalle (Capa 3) como glassmorphism popover
        ↓
Background (Capa 0) visible a través del blur
```

#### Principios de Diseño

1. **El background es identidad**: Define el "look" de RAIOS, siempre presente
2. **Glassmorphism = profundidad**: Crea sensación de capas y modernidad
3. **El arte es protagonista**: Las obras nunca compiten con el background (imágenes sólidas, sin transparencia)
4. **Transiciones fluidas**: La navegación se siente como "moverse entre capas", no "cambiar de página"
5. **Performance primero**: Backgrounds CSS > Canvas > WebGL

> **Visión:** RAIOS se siente como una app moderna de alta gama, donde el usuario navega entre superficies flotantes sobre un ambiente visual distintivo.

---

### 🧩 Arquitectura de Componentes UI

Decisiones de UX/UI sobre cuándo usar cada tipo de componente.

#### Principio del Backdrop

Cuando se abre un modal/panel/sheet, el backdrop debe:
- **Mostrar el background animado** (Capa 0), no el contenido de la página
- Usar `bg-raios-secondary/85 backdrop-blur-md` para oscurecer el contenido pero dejar entrever el background
- La transición de animación ya comunica el cambio de capa

```jsx
// Backdrop correcto
<div className="bg-raios-secondary/85 backdrop-blur-md" />

// NO usar (muestra demasiado contenido)
<div className="bg-black/60 backdrop-blur-sm" />
```

#### Matriz de Componentes

| Componente | Uso correcto | NO usar para |
|:-----------|:-------------|:-------------|
| **GlassModal** | Confirmaciones, alertas, acciones rápidas | Contenido extenso, páginas completas |
| **GlassPanel** | Menú de usuario, carrito, filtros | Navegación principal, contenido indexable |
| **GlassSheet** | Acciones contextuales (mobile), quick actions | Formularios largos, contenido SEO |
| **SearchOverlay** | Búsqueda global con resultados en vivo | - |
| **Página completa** | Todo lo que necesita URL propia | - |

#### Regla de Oro

> Si el contenido merece URL propia, merece página propia.

| Contenido | Tipo | Razón |
|:----------|:-----|:------|
| Categorías | Página | SEO, compartible |
| Artistas | Página | Perfil público, SEO |
| Detalle de obra | Página | SEO, compartible, contenido extenso |
| Explorar | Página | Core del marketplace |
| Crear/Editar obra | Página | Formulario extenso, borradores |
| Carrito | Panel | Contexto de compra, temporal |
| Menú usuario | Panel | Navegación secundaria |
| Filtros | Panel/Sheet | Contextual, no necesita URL |
| Confirmaciones | Modal | Acción puntual |
| Quick view | Sheet | Preview, no reemplaza detalle |

---

### 🎛️ Componentes Especializados (Patrones)

> **Nota:** Esta sección documenta los patrones detallados de cada componente especializado, incluyendo estructura, decisiones de diseño y layouts responsivos.

#### MenuPanel - "Command Center"

**Estructura:**
```
┌─────────────────────────────────────────┐
│ HEADER: Avatar + Nombre + Btn Perfil    │
├─────────────────────────────────────────┤
│ STATS: Grid 3 cols (Obras/Ventas/Likes) │
├─────────────────────────────────────────┤
│ CTA: "Nueva Obra" (solo artistas)       │
├─────────────────────────────────────────┤
│ ACCIONES: Grid 2x2 con iconos color     │
├─────────────────────────────────────────┤
│ FOOTER: Config | Cerrar sesión          │
└─────────────────────────────────────────┘
```

**Decisiones de diseño:**
- Stats visibles = gamification sutil, el usuario ve su progreso
- Grid de acciones = más escaneable que lista vertical
- Iconos con color = identificación rápida por color
- CTA prominente = incentivar creación de contenido

#### CartPanel - "Studio Cart"

**Estructura:**
```
┌─────────────────────────────────────────┐
│ HEADER: "Tu Selección" + count + total  │
├─────────────────────────────────────────┤
│ ITEMS: Mini-cards con img + controles   │
│   - Imagen 80x80                        │
│   - Título + Artista + Precio           │
│   - Controles cantidad inline           │
├─────────────────────────────────────────┤
│ RESUMEN: Subtotal / Envío / Total       │
│ CTA: "Continuar compra" →               │
│ LINK: ← "Seguir explorando"             │
└─────────────────────────────────────────┘
```

**Decisiones de diseño:**
- Header con total = usuario sabe cuánto lleva sin scroll
- Items como cards = más visual que lista plana
- Controles inline = editar sin salir del flujo
- Resumen sticky = siempre visible para decisión
- Paso intermedio = no es checkout, es preview

#### SearchOverlay - "Discovery Portal"

**Estructura MVP:**
```
┌─────────────────────────────────────────┐
│ INPUT: Autofocus + placeholder + clear  │
├─────────────────────────────────────────┤
│ SIN QUERY: Historial recientes          │
│ CON QUERY: Resultados agrupados         │
│   - Obras (con imagen)                  │
│   - Artistas (con avatar)               │
│   - Categorías (como tags)              │
├─────────────────────────────────────────┤
│ BTN CLOSE: Centro inferior              │
└─────────────────────────────────────────┘
```

**Decisiones de diseño:**
- Overlay completo = enfoque total en búsqueda
- Debounce 300ms = balance UX/performance
- Resultados agrupados = fácil escaneo por tipo
- Recientes = acceso rápido sin escribir

#### Layouts Responsivos (Mobile → Desktop)

Los componentes especializados implementan **layouts diferenciados** por breakpoint, no solo "escala con más padding".

**MenuPanel - Layouts:**

| Breakpoint | Layout | Descripción |
|:-----------|:-------|:------------|
| Mobile/md | Vertical centrado | Stack vertical, max-w-[95vw] md:max-w-md |
| lg/xl | Dashboard horizontal | Fila 1: Usuario + Stats, Fila 2: Gestionar (grid 4-col) |

```
Desktop (lg+):
┌─────────────────────────────────────────────────────────────┐
│  [Avatar] Nombre        │    STATS                          │
│          @username      │  [Obras] [Ventas] [Likes]         │
│  [   Ver perfil    ]    │                                   │
├─────────────────────────────────────────────────────────────┤
│  GESTIONAR                                                  │
│  [Mis Obras] [Ventas] [Compras] [Favoritos]    [Nueva Obra] │
├─────────────────────────────────────────────────────────────┤
│  [⚙ Configuración]                      [→ Cerrar sesión]  │
└─────────────────────────────────────────────────────────────┘
```

**CartPanel - Layouts:**

| Breakpoint | Layout | Descripción |
|:-----------|:-------|:------------|
| Mobile/md | Vertical centrado | Stack: header → items (scroll) → resumen |
| lg/xl | Dos columnas | Izq: items scrolleables, Der: resumen sticky |

```
Desktop (lg+):
┌─────────────────────────────────────────────────────────────┐
│  TU SELECCIÓN           │    RESUMEN DEL PEDIDO            │
│  3 obras en tu carrito  │                                   │
├─────────────────────────┤    Subtotal: $8,700              │
│  [Item 1]               │    Envío: Gratis                  │
│  [Item 2]               │    ───────────────                │
│  [Item 3]               │    Total: $8,700                  │
│                         │                                   │
│  ← Seguir explorando    │    [  Continuar compra  →  ]     │
│                         │    ✓ Pago seguro ✓ Envío gratis  │
└─────────────────────────────────────────────────────────────┘
```

#### Principios de Diseño Responsivo

1. **Transformar, no escalar**: En desktop los layouts cambian estructuralmente, no solo agregan padding
2. **Mobile = vertical**: Stack de secciones en una columna
3. **Desktop = horizontal/grid**: Aprovechar el ancho con columnas y filas
4. **Elementos prioritarios**: En mobile mostrar lo esencial, en desktop expandir con más info
5. **Acciones contextuales**: En mobile al final, en desktop a la derecha o en su propia columna
