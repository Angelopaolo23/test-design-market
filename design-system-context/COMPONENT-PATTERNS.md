# Patrones de Componentes - Marketplace Artístico

Documentación de patrones de componentes UI para mantener consistencia al integrar.

---

## Convención Crítica: snake_case

**TODO el código debe usar snake_case:**

```jsx
// Props de componentes
<Button
  variant="primary"
  on_click={handleClick}
  is_loading={loading}
  icon_position="left"
/>

// Variables y estado
const [is_open, setIsOpen] = useState(false);
const user_name = "Juan";
const artwork_count = 10;

// Funciones
const handle_submit = () => { };
const format_price = (amount) => { };
```

**Excepción:** Métodos nativos de React/JS mantienen su nombre:
- `useState`, `useEffect`, `useCallback`
- `.map()`, `.filter()`, `.reduce()`

---

## Estructura de Componentes

### Template Base

```jsx
// src/components/ui/Button.jsx
import PropTypes from 'prop-types'; // Opcional en maqueteo
import { motion } from 'framer-motion';

/**
 * Button - Botón reutilizable con variantes
 * @param {Object} props
 * @param {string} props.variant - Variante visual: 'primary' | 'secondary' | 'ghost'
 * @param {string} props.size - Tamaño: 'sm' | 'md' | 'lg'
 * @param {boolean} props.is_loading - Estado de carga
 * @param {Function} props.on_click - Handler de click
 * @param {React.ReactNode} props.children - Contenido del botón
 */
export function Button({
  variant = 'primary',
  size = 'md',
  is_loading = false,
  on_click,
  children,
}) {
  // 1. Clases base
  const base_classes = 'inline-flex items-center justify-center font-medium rounded-lg transition-all';

  // 2. Variantes
  const variant_classes = {
    primary: 'bg-violet-600 hover:bg-violet-700 text-white',
    secondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/20',
    ghost: 'hover:bg-white/10 text-white',
  };

  // 3. Tamaños
  const size_classes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={on_click}
      disabled={is_loading}
      className={`
        ${base_classes}
        ${variant_classes[variant]}
        ${size_classes[size]}
        ${is_loading ? 'opacity-70 cursor-not-allowed' : ''}
      `}
    >
      {is_loading ? (
        <span className="animate-spin mr-2">⟳</span>
      ) : null}
      {children}
    </motion.button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  is_loading: PropTypes.bool,
  on_click: PropTypes.func,
  children: PropTypes.node.isRequired,
};
```

---

## Componentes UI Básicos (Building Blocks)

### 1. Card

```jsx
export function Card({
  children,
  variant = 'default',
  padding = 'md',
  on_click,
  is_hoverable = false,
}) {
  const padding_classes = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const variant_classes = {
    default: 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700',
    elevated: 'bg-white dark:bg-slate-800 shadow-lg',
    glass: 'glass-card', // Clase custom de glassmorphism
  };

  return (
    <div
      onClick={on_click}
      className={`
        rounded-xl ${padding_classes[padding]} ${variant_classes[variant]}
        ${is_hoverable ? 'hover:shadow-xl transition-shadow cursor-pointer' : ''}
      `}
    >
      {children}
    </div>
  );
}
```

### 2. Input

```jsx
export function Input({
  type = 'text',
  label,
  placeholder,
  value,
  on_change,
  error_message,
  is_required = false,
}) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
          {is_required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => on_change(e.target.value)}
        placeholder={placeholder}
        className={`
          w-full px-4 py-2.5 rounded-lg border transition-colors
          bg-white dark:bg-slate-800
          ${error_message
            ? 'border-red-500 focus:ring-red-500'
            : 'border-slate-300 dark:border-slate-600 focus:border-violet-500 focus:ring-violet-500'
          }
          focus:outline-none focus:ring-2 focus:ring-opacity-50
        `}
      />
      {error_message && (
        <p className="text-sm text-red-500">{error_message}</p>
      )}
    </div>
  );
}
```

### 3. Badge

```jsx
export function Badge({
  children,
  variant = 'default',
  size = 'md',
}) {
  const variant_classes = {
    default: 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200',
    success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    accent: 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400',
  };

  const size_classes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  return (
    <span className={`
      inline-flex items-center font-medium rounded-full
      ${variant_classes[variant]}
      ${size_classes[size]}
    `}>
      {children}
    </span>
  );
}
```

### 4. Avatar

```jsx
export function Avatar({
  src,
  alt,
  size = 'md',
  fallback_text,
}) {
  const size_classes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  if (!src) {
    return (
      <div className={`
        ${size_classes[size]}
        rounded-full bg-gradient-to-br from-violet-500 to-pink-500
        flex items-center justify-center text-white font-medium
      `}>
        {fallback_text?.slice(0, 2).toUpperCase() || '?'}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${size_classes[size]} rounded-full object-cover`}
    />
  );
}
```

---

## Componentes de Layout

### 1. Container

```jsx
export function Container({ children, size = 'default' }) {
  const size_classes = {
    sm: 'max-w-3xl',
    default: 'max-w-7xl',
    lg: 'max-w-screen-2xl',
    full: 'max-w-full',
  };

  return (
    <div className={`${size_classes[size]} mx-auto px-4 sm:px-6 lg:px-8`}>
      {children}
    </div>
  );
}
```

### 2. Navbar

```jsx
export function Navbar({ logo, nav_items, actions }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            {logo}
          </div>

          {/* Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            {nav_items?.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {actions}
          </div>
        </div>
      </Container>
    </nav>
  );
}
```

### 3. Section

```jsx
export function Section({
  children,
  title,
  subtitle,
  background = 'transparent',
}) {
  const bg_classes = {
    transparent: '',
    muted: 'bg-slate-50 dark:bg-slate-800/50',
    accent: 'bg-gradient-to-br from-violet-50 to-pink-50 dark:from-violet-900/20 dark:to-pink-900/20',
  };

  return (
    <section className={`py-16 md:py-24 ${bg_classes[background]}`}>
      <Container>
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
```

---

## Componentes de Dominio (Artwork)

### ArtworkCard

```jsx
import { FiHeart, FiShoppingCart } from 'react-icons/fi';

export function ArtworkCard({
  artwork_id,
  title,
  artist_name,
  price,
  image_url,
  is_favorite = false,
  on_favorite,
  on_add_to_cart,
}) {
  return (
    <Card is_hoverable padding="none">
      {/* Imagen */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-t-xl">
        <img
          src={image_url}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {/* Overlay con acciones */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity">
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <button
              onClick={(e) => { e.stopPropagation(); on_favorite?.(artwork_id); }}
              className={`p-2 rounded-full ${is_favorite ? 'bg-red-500 text-white' : 'bg-white/20 text-white'}`}
            >
              <FiHeart className={is_favorite ? 'fill-current' : ''} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); on_add_to_cart?.(artwork_id); }}
              className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30"
            >
              <FiShoppingCart />
            </button>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-slate-900 dark:text-white truncate">
          {title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          {artist_name}
        </p>
        <p className="text-lg font-bold text-violet-600 dark:text-violet-400 mt-2">
          ${price?.toLocaleString()}
        </p>
      </div>
    </Card>
  );
}
```

---

## Componentes de Feedback

### LoadingSpinner

```jsx
export function LoadingSpinner({ size = 'md', message }) {
  const size_classes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`
        ${size_classes[size]}
        border-2 border-slate-200 border-t-violet-600
        rounded-full animate-spin
      `} />
      {message && (
        <p className="text-sm text-slate-600 dark:text-slate-400">{message}</p>
      )}
    </div>
  );
}
```

### EmptyState

```jsx
export function EmptyState({
  icon: Icon,
  title,
  message,
  action_label,
  on_action,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {Icon && (
        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-slate-400" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-sm">
        {message}
      </p>
      {action_label && on_action && (
        <Button variant="primary" on_click={on_action}>
          {action_label}
        </Button>
      )}
    </div>
  );
}
```

---

## Iconografía

Usar **React Icons** con iconos **Feather**:

```jsx
import {
  FiHeart,        // Favoritos
  FiShoppingCart, // Carrito
  FiSearch,       // Búsqueda
  FiUser,         // Usuario
  FiMenu,         // Menú móvil
  FiX,            // Cerrar
  FiPlus,         // Agregar
  FiMinus,        // Quitar
  FiCheck,        // Confirmación
  FiAlertCircle,  // Advertencia
  FiImage,        // Imagen
  FiUpload,       // Subir
  FiDownload,     // Descargar
  FiEdit,         // Editar
  FiTrash2,       // Eliminar
  FiChevronLeft,  // Navegación izquierda
  FiChevronRight, // Navegación derecha
  FiArrowRight,   // Flecha derecha
  FiExternalLink, // Link externo
} from 'react-icons/fi';
```

---

## Ejemplo de Página Completa

```jsx
// pages/Landing.jsx
import { Navbar } from '../components/layout/Navbar';
import { Section } from '../components/layout/Section';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { ArtworkCard } from '../components/artwork/ArtworkCard';

export function Landing() {
  const featured_artworks = [
    // ... datos de obras
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar
        logo={<span className="font-bold text-xl">ArtMarket</span>}
        nav_items={[
          { label: 'Explorar', href: '/explore' },
          { label: 'Artistas', href: '/artists' },
          { label: 'Categorías', href: '/categories' },
        ]}
        actions={
          <>
            <Button variant="ghost" size="sm">Ingresar</Button>
            <Button variant="primary" size="sm">Registrarse</Button>
          </>
        }
      />

      {/* Hero */}
      <Section>
        <div className="pt-20 pb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Descubre Arte Único
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
            Conectamos artistas con coleccionistas apasionados por el arte contemporáneo
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="primary" size="lg">Explorar Obras</Button>
            <Button variant="secondary" size="lg">Vender Arte</Button>
          </div>
        </div>
      </Section>

      {/* Featured Works */}
      <Section
        title="Obras Destacadas"
        subtitle="Descubre las piezas más populares de nuestra colección"
        background="muted"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured_artworks.map(artwork => (
            <ArtworkCard
              key={artwork.id}
              artwork_id={artwork.id}
              title={artwork.title}
              artist_name={artwork.artist_name}
              price={artwork.price}
              image_url={artwork.image_url}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}
```

---

## Notas para Integración

1. **Mantener snake_case** - Es obligatorio en el proyecto principal
2. **Usar Framer Motion** - Para animaciones consistentes
3. **React Icons (Feather)** - Para iconografía
4. **Tailwind utilities** - Para estilos
5. **Componentes funcionales** - Con hooks de React
6. **PropTypes** - Documentar props (opcional en maqueteo)
