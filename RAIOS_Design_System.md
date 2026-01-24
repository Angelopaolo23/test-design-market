# ⚡ RAIOS: Design System Simplificado

## Energía Creativa | Neo-Brutalismo Limpio

Este documento consolida los lineamientos estéticos (Tokens de Diseño) definidos para el marketplace RAIOS. El objetivo es lograr un look audaz, energético y dramático, que rompa con la estética de lujo tradicional.

---

### 📱 Principio Fundamental: Mobile-First

**Todo diseño y desarrollo en RAIOS se construye desde mobile-first.**

| Principio | Descripción |
| :-------- | :---------- |
| **Diseño base = Mobile** | Los estilos sin prefijo aplican a dispositivos móviles. |
| **Escalado progresivo** | Usar breakpoints ascendentes: `base` → `md` (768px) → `lg` (1024px) → `xl` (1280px). |
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
| **Art Card / Masonry**                 | Sin bordes ni sombras. Layout de grilla irregular. Texto clave (`font-mono`) en `raios-text-high` flotando sobre la imagen.                         | **Secundario**, `raios-text-high`, `font-mono`.               | Audaz, experimental, la obra es protagonista.             |
| **Bloque Promocional Audaz (Artista)** | Bloque horizontal `w-full`. Imagen con filtro/opacidad baja sobre fondo `raios-secondary`. **Título H1/H2** en `font-mono` y `raios-text-high`.     | **Secundario**, `raios-text-high`, `raios-tertiary` (acento). | Interrupción visual, jerarquía alta, dramático.           |
| **Bloque de Categoría/Noticia**        | Bloque vertical (ej. `w-1/2`). Fondo `raios-secondary`. **Línea de Separación** en color `raios-primary` para energía. Título en `font-mono`.       | **Primario** (línea), **Secundario**, `raios-text-high`.      | Informativo, angular, contenido curado.                   |
| **Vistas Críticas (Detalle/Carrito)**  | **NO Glassmorphism**. Fondo sólido `raios-secondary`. Texto de alto contraste. Layout asimétrico (60/40) a favor de la imagen.                      | **Secundario**, `raios-text-high`.                            | Legibilidad, Claridad, Dramatismo simple.                 |
