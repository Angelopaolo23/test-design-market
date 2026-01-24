# Tech Stack - Marketplace Artístico

Documentación del stack tecnológico para replicar en el maqueteo visual.

---

## Stack Principal

### Framework & Build

| Tecnología | Versión | Notas |
|------------|---------|-------|
| **React** | 18.3.1 | JavaScript puro, NO TypeScript |
| **Vite** | 5.4.2 | Build tool, HMR rápido |
| **React Router DOM** | 6.22.3 | Routing SPA |

### Estilos

| Tecnología | Versión | Notas |
|------------|---------|-------|
| **Tailwind CSS** | 3.4.1 | Utility-first, configuración custom |
| **PostCSS** | 8.4.35 | Procesamiento CSS |
| **Autoprefixer** | 10.4.18 | Prefijos de navegador |

### Animaciones

| Tecnología | Versión | Notas |
|------------|---------|-------|
| **Framer Motion** | 11.0.8 | Animaciones declarativas |
| **CSS Keyframes** | - | Animaciones de fondo |

### Iconografía

| Tecnología | Versión | Notas |
|------------|---------|-------|
| **React Icons** | 5.0.1 | Usar Feather icons (Fi*) |

### Tipografía

| Tecnología | Notas |
|------------|-------|
| **Inter** | Google Fonts, pesos: 300, 400, 500, 600, 700 |

---

## Configuración Vite Mínima

Para el proyecto de maqueteo, usar esta configuración base:

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
```

---

## Package.json Mínimo para Maqueteo

```json
{
  "name": "design-system-mockup",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "framer-motion": "^11.0.8",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-icons": "^5.0.1",
    "react-router-dom": "^6.22.3"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "vite": "^5.4.2"
  }
}
```

---

## Tailwind Config Base

```javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      // Estos son los tokens ACTUALES - puedes redefinirlos
      colors: {
        gradient: {
          start: '#FF7B00',    // Orange
          middle: '#FF007A',   // Pink
          end: '#8B00FF',      // Purple
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'base': '1.125rem',    // 18px
        'lg': '1.25rem',       // 20px
        'xl': '1.375rem',      // 22px
        '2xl': '1.5rem',       // 24px
        '3xl': '1.875rem',     // 30px
        '4xl': '2.25rem',      // 36px
        '5xl': '3rem',         // 48px
      },
    },
  },
  plugins: [],
}
```

---

## PostCSS Config

```javascript
// postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

## Estructura de Carpetas Sugerida para Maqueteo

```
design-mockup/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
│
└── src/
    ├── main.jsx              # Entry point
    ├── App.jsx               # Router + Layout
    ├── index.css             # Tailwind imports + base styles
    │
    ├── styles/
    │   ├── tokens.css        # Design tokens (CSS variables)
    │   └── components.css    # Component classes custom
    │
    ├── components/
    │   ├── ui/               # Building blocks básicos
    │   │   ├── Button.jsx
    │   │   ├── Card.jsx
    │   │   ├── Input.jsx
    │   │   └── Badge.jsx
    │   │
    │   ├── layout/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   └── Container.jsx
    │   │
    │   └── sections/         # Secciones de landing
    │       ├── Hero.jsx
    │       ├── FeaturedWorks.jsx
    │       └── ValueProposition.jsx
    │
    └── pages/
        └── Landing.jsx       # Landing page principal
```

---

## Imports Importantes

### CSS Base (index.css)

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Importar tokens custom */
@import './styles/tokens.css';
@import './styles/components.css';
```

### Entry Point (main.jsx)

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

## Librerías NO Necesarias para Maqueteo

Estas librerías son del proyecto principal pero **NO las necesitas** para el maqueteo visual:

| Librería | Razón para excluir |
|----------|-------------------|
| Redux Toolkit | Sin lógica de estado compleja |
| Supabase | Sin backend en maqueteo |
| React Hook Form | Sin formularios funcionales |
| Swiper | Opcional, usar si hay carousels |
| date-fns | Sin manejo de fechas |
| prop-types | Opcional para maqueteo |
| MSW / Vitest | Testing no necesario en maqueteo |

---

## Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Desarrollo con hot reload
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview
```

---

## Notas de Compatibilidad

- **Node.js**: 18.x o superior recomendado
- **npm**: 9.x o superior
- **Navegadores**: Chrome, Firefox, Safari modernos
- **Mobile**: Diseño responsive obligatorio
