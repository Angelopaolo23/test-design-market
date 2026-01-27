# RAIOS - Issues Backlog

Listado de mejoras y features pendientes para futuras iteraciones.

---

## 🔍 SearchOverlay v2 - "Discovery Portal" Completo

**Prioridad:** Media
**Etiquetas:** `enhancement`, `ux`, `search`

### Descripción
Evolucionar el SearchOverlay MVP a una experiencia de descubrimiento completa.

### Estado Actual (MVP)
- ✅ Input de búsqueda con debounce
- ✅ Resultados agrupados (obras, artistas, categorías)
- ✅ Historial de búsquedas recientes
- ✅ Estados de loading y vacío

### Mejoras Propuestas

#### 1. Estado Inicial con Tendencias
```
┌─────────────────────────────────────────────────┐
│  TENDENCIAS                                     │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          │
│  │ Arte │ │Neo   │ │Color │ │Mini- │          │
│  │Digit.│ │Brutal│ │Block │ │malis.│          │
│  └──────┘ └──────┘ └──────┘ └──────┘          │
└─────────────────────────────────────────────────┘
```
- Tags de categorías trending (basado en vistas/ventas)
- Actualización semanal o diaria

#### 2. Artistas Destacados
```
│  ARTISTAS DESTACADOS                           │
│  ┌────────────────────────────────────────┐    │
│  │ 👤 Elena Vega    👤 Carlos M.    +12   │    │
│  └────────────────────────────────────────┘    │
```
- Top artistas por ventas o nuevos
- Avatares clickeables

#### 3. Sugerencias Inteligentes
- Autocompletado basado en búsquedas populares
- "Quizás quisiste decir..." para typos
- Filtros rápidos (precio, categoría, técnica)

#### 4. Búsqueda por Voz (futuro)
- Integración con Web Speech API
- Icono de micrófono en el input

### Criterios de Aceptación
- [ ] Estado inicial muestra tendencias cuando no hay query
- [ ] Artistas destacados visibles al abrir
- [ ] Autocompletado funcional
- [ ] Performance: resultados en <300ms
- [ ] Accesibilidad: navegación por teclado completa

### Dependencias
- API de tendencias/analytics
- Suficiente contenido (obras, artistas) para que tenga sentido

---

## 🛒 CartPanel - Persistencia y Animaciones

**Prioridad:** Alta
**Etiquetas:** `enhancement`, `cart`

### Mejoras Propuestas
- [ ] Persistir carrito en localStorage
- [ ] Animación al agregar/eliminar items
- [ ] Notificación toast al agregar obra
- [ ] Badge con contador en navbar
- [ ] Sincronización con backend (cuando exista)

---

## 👤 MenuPanel - Estados de Usuario

**Prioridad:** Media
**Etiquetas:** `enhancement`, `auth`

### Mejoras Propuestas
- [ ] Estado "no logueado" con CTA de login/registro
- [ ] Estado "comprador" (sin stats de artista)
- [ ] Estado "artista" (con stats y crear obra)
- [ ] Notificaciones pendientes badge
- [ ] Link a "Conviértete en artista"

---

## 📱 Responsive Improvements

**Prioridad:** Alta
**Etiquetas:** `responsive`, `mobile`

### Mejoras Propuestas
- [ ] MenuPanel: en desktop, dropdown en lugar de panel completo
- [ ] SearchOverlay: input fijo en mobile con resultados scrolleables
- [ ] CartPanel: bottom sheet en mobile, panel en desktop
- [ ] Gestos: swipe para cerrar panels

---

## 🎨 Página de Detalle de Obra

**Prioridad:** Alta
**Etiquetas:** `feature`, `page`

### Estructura Propuesta
```
/artwork/:id

┌─────────────────────────────────────────────────────────┐
│ [Navbar]                                                │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────────┐  ┌─────────────────────────┐ │
│  │                      │  │ Título de la Obra       │ │
│  │      GALERÍA         │  │ por Artista             │ │
│  │      IMÁGENES        │  │                         │ │
│  │                      │  │ $2,900 MXN              │ │
│  │                      │  │                         │ │
│  │  [•] [○] [○] [○]     │  │ [Cantidad] [AGREGAR]    │ │
│  └──────────────────────┘  │                         │ │
│                            │ Descripción...          │ │
│                            │                         │ │
│                            │ Materiales: ...         │ │
│                            │ Dimensiones: ...        │ │
│                            └─────────────────────────┘ │
│                                                         │
│  ─────────────────────────────────────────────────────  │
│  COMENTARIOS (12)                                       │
│  [...]                                                  │
│                                                         │
│  ─────────────────────────────────────────────────────  │
│  OBRAS RELACIONADAS                                     │
│  [Card] [Card] [Card] [Card]                           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Componentes Necesarios
- [ ] ImageGallery (con thumbnails y zoom)
- [ ] ArtworkInfo (precio, descripción, specs)
- [ ] QuantitySelector
- [ ] AddToCartButton
- [ ] CommentsSection
- [ ] RelatedWorks (reutiliza CategoryCarousel?)

---

## 📝 Página de Crear/Editar Obra

**Prioridad:** Media
**Etiquetas:** `feature`, `page`, `forms`

### Estructura Propuesta
```
/artwork/new
/artwork/:id/edit

- Formulario multi-step o tabs
- Upload de imágenes con drag & drop
- Preview en tiempo real
- Guardado automático (borrador)
```

---

## 🔔 Sistema de Notificaciones

**Prioridad:** Baja
**Etiquetas:** `feature`, `notifications`

### Tipos
- Toast para acciones (agregado al carrito, guardado)
- Badge en navbar
- Panel de notificaciones (nuevas ventas, likes, comentarios)

---

## Notas

Para agregar una nueva issue:
1. Copiar el template de issue existente
2. Agregar al final del archivo
3. Actualizar prioridad según roadmap actual
