# Plan de Implementación: Backgrounds Dinámicos RAIOS

## Contexto del Proyecto

**Proyecto:** RAIOS - Marketplace de arte digital (maqueteo visual/UI)
**Objetivo:** Integrar backgrounds dinámicos como parte de la identidad visual
**Arquitectura:** Sistema de capas con glassmorphism (ver RAIOS_Design_System.md)

### Stack Tecnológico
- React 18 + Vite
- Tailwind CSS
- Framer Motion
- Backgrounds: CSS/SVG preferido (mejor rendimiento)

### Decisiones Tomadas
- [x] Background por defecto seleccionado: **WaveGrid (Waves)**
- [x] Variantes adicionales: **MagneticField (Aurora)**, **ParticleGrid (P. Grid)**
- [x] Colores adaptados a paleta RAIOS
- [x] Backgrounds descartados eliminados del proyecto

---

## Checklist de Implementación

### Fase 1: Evaluación de Backgrounds
- [x] Recibir ruta del repositorio de backgrounds
- [x] Explorar estructura y tecnologías de cada background
- [x] Evaluar compatibilidad con stack actual
- [x] Evaluar rendimiento de cada opción
- [x] Documentar pros/contras de cada background
- [x] Presentar opciones con recomendaciones al usuario

### Fase 2: Selección y Adaptación
- [x] Usuario selecciona 1 background principal + 1-2 variantes
- [x] Adaptar colores a paleta RAIOS (primary, secondary, tertiary)
- [x] Crear componentes de background (5 adaptados)
- [x] Crear BackgroundSwitcher para testing visual
- [x] Integrar en layout principal (Capa 0)
- [ ] Verificar rendimiento en mobile y desktop

### Fase 3: Integración con Glassmorphism
- [x] Crear componente `GlassSurface.jsx`
- [x] Ajustar valores de blur/opacidad contra el background real
- [x] Crear variantes: `GlassModal`, `GlassPanel`, `GlassSheet`
- [x] Testear visualmente todas las combinaciones (demo en Landing)

### Fase 4: Implementación de Navegación por Capas
- [x] Configurar React Router (BrowserRouter, Routes)
- [x] Crear página ArtworkDetail (/artwork/:id)
- [x] Componentes de detalle: ImageGallery, ArtworkInfo, QuantitySelector
- [x] Sección de comentarios: CommentsSection
- [x] Obras relacionadas: RelatedWorks
- [x] Integración con CartPanel y MenuPanel
- [ ] Testear flujo completo: Landing → Detalle → Volver

---

## Progress Tracker

| Fecha | Sesión | Progreso | Notas |
| :---- | :----- | :------- | :---- |
| 2026-01-24 | 1 | Design System actualizado con arquitectura de capas | Carrusel completado, glassmorphism definido |
| 2026-01-25 | 2 | Evaluación de backgrounds completada | 26 backgrounds evaluados, 5 recomendados para MVP |
| 2026-01-25 | 3 | 5 backgrounds adaptados e integrados | TSX→JSX, colores RAIOS, BackgroundSwitcher creado |
| 2026-01-26 | 4 | 5 backgrounds adicionales adaptados | Total: 10 backgrounds evaluados |
| 2026-01-26 | 5 | Selección final: 3 backgrounds | Waves (default), Aurora, P. Grid |
| 2026-01-26 | 6 | Fase 3 completada: Glassmorphism | GlassSurface, GlassModal, GlassPanel, GlassSheet |
| 2026-01-26 | 7 | Componentes especializados | MenuPanel, CartPanel, SearchOverlay (MVP) |
| 2026-01-26 | 8 | MenuPanel y CartPanel responsive | Layouts adaptados: mobile vertical, desktop horizontal/2-col |
| 2026-01-26 | 9 | Documentación actualizada | Patrones de layout responsivo documentados en Design System |
| 2026-01-27 | 10 | Fase 4: ArtworkDetail | React Router + página detalle con Core, Comentarios, Relacionados |
| 2026-01-27 | 11 | Correcciones ArtworkDetail | Mobile-first fix, Navbar correcto, Background visible |

---

## Pendiente próxima sesión

**Tarea:** Modificar `ImageGallery.jsx` para soportar imágenes verticales y horizontales.

**Estrategia:** Contenedor con `max-height` fijo + `object-contain` para que ambas orientaciones se vean completas sin recorte.

**Archivo:** `/src/components/artwork/ImageGallery.jsx`

---

## ✅ Sesión Completada: 5 Backgrounds Adaptados

### Tarea Completada
Los 5 backgrounds recomendados fueron adaptados de TSX a JSX.

### Backgrounds Seleccionados (3 finales)

| # | Archivo | Nombre | Descripción | Intensidad | Estado |
|:--|:--------|:-------|:------------|:-----------|:-------|
| 1 | `WaveGrid.jsx` | Waves | Grid de ondas suaves | Baja | **DEFAULT** |
| 2 | `MagneticField.jsx` | Aurora | Líneas de campo magnético | Baja | Alternativa |
| 3 | `ParticleGrid.jsx` | P. Grid | Grid de partículas | Media | Alternativa |

**Criterios de selección:**
- Movimiento sutil pero perceptible
- No compite con el arte (protagonista)
- Funciona bien con glassmorphism
- No fatiga la vista en uso prolongado

### Archivos Finales (Selección definitiva)
```
/src/components/backgrounds/
├── WaveGrid.jsx            # DEFAULT - Ondas suaves (intensidad baja)
├── MagneticField.jsx       # Aurora - Líneas onduladas (intensidad baja)
├── ParticleGrid.jsx        # P. Grid - Partículas en grid (intensidad media)
├── BackgroundSwitcher.jsx  # Switcher para desarrollo (3 opciones)
└── index.js                # Exports centralizados
```

### Integración
- BackgroundSwitcher integrado en `Landing.jsx`
- Build verificado exitosamente

### Próximos Pasos
1. [ ] Probar visualmente cada background con `npm run dev`
2. [ ] Verificar rendimiento en mobile
3. [ ] Seleccionar background por defecto definitivo
4. [ ] Remover controles de BackgroundSwitcher para producción

---

## Repositorio de Backgrounds

**Ruta local:** `/Users/angelopaolo23/Desarrollador/CLAUCODE-ONWEB/background-markettest1`
**Cantidad de opciones:** ~25 backgrounds

### Análisis Técnico General

| Aspecto | Hallazgo |
| :------ | :------- |
| **Tecnología** | TypeScript + React (.tsx) |
| **Renderizado** | Canvas 2D (no WebGL) ✅ Buen rendimiento |
| **Posicionamiento** | `position: fixed`, `z-index: -1` ✅ Listo para Capa 0 |
| **Props** | Configurables (colores, velocidad, cantidad) ✅ Fácil adaptar |
| **Conversión** | TSX → JSX (solo quitar tipos) ✅ Simple |

### Evaluación de Backgrounds

| # | Nombre | Descripción | Intensidad | Recomendado |
| :- | :----- | :---------- | :--------- | :---------- |
| 1 | FloatingParticles | Partículas flotantes con glow | Baja | ⭐ Sí |
| 2 | EnergyWaves | Ondas de energía desde epicentros | Media | ⭐ Sí |
| 3 | NeonCircuitGrid | Grid estilo PCB con pulsos | Media | ⭐ Sí |
| 4 | MagneticField | Líneas de campo magnético | Baja | ⭐ Sí |
| 5 | SacredGeometry | Geometría sagrada rotativa | Alta | Posible |
| 6 | SpirographLightning | Espirógrafos con rayos | Alta | No |
| 7 | ElectricConnections | Conexiones eléctricas | Media | Posible |
| 8 | GlitchGrid | Grid con efecto glitch | Alta | No |
| 9 | PlasmaBalls | Bolas de plasma | Alta | No |
| 10 | OscilloscopeMandalas | Mandalas tipo osciloscopio | Alta | No |
| 11 | HexagonalGrid | Grid hexagonal | Baja | ⭐ Sí |
| 12 | FractalLightningTree | Árbol de rayos fractal | Alta | No |
| 13 | FlowingGrid | Grid fluido | Media | Posible |
| 14 | LightningBolts | Rayos eléctricos | Alta | No |
| 15 | VectorDisplay | Display vectorial retro | Media | Posible |
| 16 | ScanningGrid | Grid con scanning | Media | Posible |
| 17 | FuturisticGrid | Grid futurista | Media | Posible |
| 18 | RetroEffect | Efecto retro | Alta | No |
| 19 | SynthwaveSacredGeometry | Geometría synthwave | Alta | No |
| 20 | PlasmaEffect | Efecto plasma | Alta | No |
| 21 | OscilloscopeWaves | Ondas de osciloscopio | Media | Posible |
| 22 | KaleidoscopeElectric | Caleidoscopio eléctrico | Alta | No |
| 23 | ParticleGrid | Grid de partículas | Media | ⭐ Sí |
| 24 | ElectricBackground | Fondo eléctrico base | Media | Posible |
| 25 | WaveGrid | Grid de ondas | Baja | ⭐ Sí |
| 26 | CircuitBoardMandala | Mandala de circuito | Alta | No |

### Recomendaciones para RAIOS

**Criterios de selección:**
1. Intensidad BAJA-MEDIA (no competir con el arte)
2. Movimiento sutil (no distraer)
3. Compatible con glassmorphism (debe verse bien con blur encima)

**Top 5 recomendados:**
1. **FloatingParticles** - Sutil, elegante, bajo consumo
2. **EnergyWaves** - Energético pero no invasivo
3. **HexagonalGrid** - Minimalista, tech feel
4. **ParticleGrid** - Balance entre movimiento y sutileza
5. **WaveGrid** - Ondas suaves, muy sutil

**Adaptación de colores RAIOS:**
```javascript
// Props para adaptar a paleta RAIOS
{
  darkColor: '#0A0218',      // raios-secondary
  particleColor: '#4A1FFF',  // raios-primary
  // o
  waveColor: '#8E5CFF',      // raios-tertiary
}
```

---

## Notas de Sesión

### Sesión 1 (2026-01-24)
- Creado componente CategoryCarousel con efectos spotlight
- Definido sistema de animaciones estandarizado
- Agregado glassmorphism y sombras al Design System
- Agregada arquitectura de capas al Design System
- **Próximo paso:** Recibir ruta de backgrounds y evaluar opciones

---

## Archivos Clave para Referencia

```
/RAIOS_Design_System.md          → Tokens y reglas de diseño
/CLAUDE.md                       → Reglas de desarrollo (mobile-first, snake_case)
/src/utils/animations.js         → Variantes de animación reutilizables
/src/components/sections/        → Componentes de sección (Hero, Carousel, etc.)
/src/components/ui/              → Componentes UI (Button, Card, etc.)
```

---

## Roadmap de Componentes Post-Backgrounds

Una vez completada la integración de backgrounds, estos son los componentes a desarrollar en orden de prioridad:

### Prioridad Alta (Core del Marketplace)

| Componente | Descripción | Dependencias |
| :--------- | :---------- | :----------- |
| `GlassSurface.jsx` | Componente base para superficies glassmorphism | Background integrado |
| `GlassModal.jsx` | Modal/Popover con glassmorphism | GlassSurface |
| `ArtworkDetail.jsx` | Vista detalle de obra (popover desde masonry) | GlassModal |
| `CartPanel.jsx` | Panel lateral de carrito (slide-in) | GlassSurface |
| `CartItem.jsx` | Item individual en el carrito | - |
| `CheckoutSummary.jsx` | Resumen de compra | CartItem |

### Prioridad Media (Experiencia de Usuario)

| Componente | Descripción | Dependencias |
| :--------- | :---------- | :----------- |
| `ArtistProfile.jsx` | Perfil de artista (popover o página) | GlassSurface |
| `ArtistCard.jsx` | Card de artista para carrusel/grids | - |
| `SearchOverlay.jsx` | Búsqueda con glassmorphism | GlassModal |
| `FilterPanel.jsx` | Filtros de obras (categoría, precio, etc.) | GlassSurface |
| `Notification.jsx` | Toast/notificaciones (confirmación compra, etc.) | - |

### Prioridad Baja (Polish y Extras)

| Componente | Descripción | Dependencias |
| :--------- | :---------- | :----------- |
| `UserMenu.jsx` | Menú de usuario (dropdown glassmorphism) | GlassSurface |
| `SettingsPanel.jsx` | Configuraciones (incluye selector de background futuro) | GlassModal |
| `EmptyState.jsx` | Estados vacíos (carrito vacío, sin resultados) | - |
| `LoadingSkeleton.jsx` | Skeletons para loading states | - |

### Secciones de Landing Pendientes

| Sección | Descripción | Estado |
| :------ | :---------- | :----- |
| `Hero.jsx` | Sección hero con stats | ✅ Completado |
| `CategoryCarousel.jsx` | Carrusel por categorías | ✅ Completado |
| `FeaturedWorks.jsx` | Masonry de obras destacadas | ✅ Completado |
| `FeaturedArtists.jsx` | Carrusel/grid de artistas destacados | ⏳ Pendiente |
| `HowItWorks.jsx` | Sección explicativa del marketplace | ⏳ Pendiente |
| `Testimonials.jsx` | Testimonios de compradores/artistas | ⏳ Pendiente |
| `Newsletter.jsx` | Suscripción a newsletter | ⏳ Pendiente |

### Páginas Completas

| Página | Componentes Principales | Estado |
| :----- | :---------------------- | :----- |
| `Landing.jsx` | Hero, Carousel, FeaturedWorks | 🔄 En progreso |
| `Explore.jsx` | FilterPanel, Masonry con paginación | ⏳ Pendiente |
| `ArtworkPage.jsx` | ArtworkDetail como página completa | ⏳ Pendiente |
| `ArtistPage.jsx` | ArtistProfile, obras del artista | ⏳ Pendiente |
| `CartPage.jsx` | CartPanel, CheckoutSummary | ⏳ Pendiente |
| `CheckoutPage.jsx` | Formulario de pago (maqueteo) | ⏳ Pendiente |

---

## Orden de Implementación Recomendado

```
1. Backgrounds (actual)
   ↓
2. GlassSurface + GlassModal (base para todo)
   ↓
3. ArtworkDetail (primer popover real, valida el sistema de capas)
   ↓
4. CartPanel + CartItem (flujo de compra)
   ↓
5. Secciones landing faltantes (FeaturedArtists, HowItWorks)
   ↓
6. Páginas adicionales (Explore, ArtistPage)
   ↓
7. Polish (Settings, EmptyStates, Skeletons)
```

---

## Cómo Continuar en Nueva Sesión

1. Leer este archivo (`PLAN_BACKGROUNDS.md`)
2. Revisar el Progress Tracker para saber dónde quedamos
3. Leer `RAIOS_Design_System.md` para contexto de diseño
4. Revisar el Roadmap de Componentes para mantener dirección
5. Continuar con el siguiente item del checklist no completado
