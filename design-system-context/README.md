# Design System Context - Marketplace Artístico

Este documento sirve como **contexto de referencia** para crear un maqueteo visual y design system simplificado en un proyecto separado, que luego será integrado de vuelta al frontend principal.

---

## Índice de Documentos

| Archivo | Propósito |
|---------|-----------|
| **README.md** (este) | Índice y guía general |
| **TECH-STACK.md** | Stack tecnológico, dependencias y versiones |
| **STYLING-SYSTEM.md** | Sistema de estilos actual (Tailwind, CSS vars, glassmorphism) |
| **COMPONENT-PATTERNS.md** | Patrones de componentes UI existentes |
| **INTEGRATION-GUIDE.md** | Cómo integrar el maqueteo de vuelta |

---

## Objetivo

Crear un **maqueteo visual** (landing page y UI principal) con un design system simplificado que:

1. Sea **visualmente atractivo** para un marketplace de arte
2. Use las **mismas tecnologías** del proyecto principal
3. Sea **fácilmente transferible** al frontend existente
4. Mantenga **convenciones snake_case** del proyecto

---

## Stack Resumido

| Tecnología | Versión | Uso |
|------------|---------|-----|
| React | 18.3.1 | Framework UI (JavaScript, NO TypeScript) |
| Vite | 5.4.2 | Build tool |
| Tailwind CSS | 3.4.1 | Estilos (utility-first) |
| Framer Motion | 11.0.8 | Animaciones |
| React Icons | 5.0.1 | Iconografía (Feather icons) |
| Inter Font | Google Fonts | Tipografía principal |

---

## Recomendación de Modelo

**Para el maqueteo visual recomiendo usar Opus 4.5** porque:

1. **Creatividad visual**: Opus tiene mejor capacidad para ideación estética y propuestas de diseño innovadoras
2. **Coherencia narrativa**: Mantiene mejor la visión de diseño a lo largo del proceso
3. **Detalle**: Mayor atención a detalles de UX/UI

**Sonnet sería adecuado si**:
- El design system ya está definido y solo necesitas implementación mecánica
- Necesitas optimizar costos y la velocidad es prioritaria

---

## Flujo de Trabajo Sugerido

```
1. MAQUETEO (Proyecto Separado)
   ├── Crear proyecto Vite + React + Tailwind
   ├── Copiar esta documentación como contexto
   ├── Desarrollar landing page + componentes core
   └── Definir tokens de diseño (colores, spacing, etc.)

2. VALIDACIÓN
   ├── Revisar visualmente el maqueteo
   ├── Ajustar según feedback
   └── Documentar decisiones de diseño

3. INTEGRACIÓN (Proyecto Principal)
   ├── Copiar tokens de diseño → tailwind.config.js
   ├── Copiar CSS custom → src/styles/
   ├── Adaptar componentes → src/components/
   └── Validar que todo funcione con la lógica existente
```

---

## Convención Crítica: snake_case

**OBLIGATORIO en todo el código:**

```javascript
// Variables y props
const user_name = "Juan";
const artwork_price = 150.00;

// Props de componentes React
<ArtworkCard
  artwork_id="123"
  artist_name="María García"
  on_click={handleClick}
/>

// Estados
const [is_loading, setIsLoading] = useState(false);
const [selected_category, setSelectedCategory] = useState(null);
```

**Excepción:** Métodos nativos (`useState`, `useEffect`, `.map()`, etc.)

---

## Archivos Clave a Revisar

Antes de comenzar el maqueteo, lee estos documentos en orden:

1. **TECH-STACK.md** - Entender qué tecnologías usar
2. **STYLING-SYSTEM.md** - Entender el sistema de estilos actual
3. **COMPONENT-PATTERNS.md** - Patrones de componentes existentes
4. **INTEGRATION-GUIDE.md** - Cómo hacer la integración final

---

## Contexto del Proyecto

**Marketplace Artístico** es una plataforma para compra/venta de obras de arte.

**Usuarios principales:**
- **Artistas**: Suben y venden sus obras
- **Coleccionistas**: Descubren y compran arte

**Tono visual deseado:**
- Profesional pero creativo
- Elegante sin ser elitista
- Enfocado en destacar las obras visuales
- Accesible y moderno

**Lo que NO funciona del diseño actual:**
- Demasiado oscuro/pesado
- Glassmorphism excesivo
- Falta jerarquía visual clara
- No destaca suficientemente las obras

---

## Contacto

Este proyecto es mantenido por un solo desarrollador. Las soluciones deben ser pragmáticas y mantenibles.

**Versión:** 1.0
**Fecha:** 2026-01-23
