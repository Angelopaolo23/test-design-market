import { useState } from 'react';
import {
  FiSearch,
  FiPackage,
  FiHeart,
  FiMessageCircle,
  FiAlertCircle,
  FiImage,
} from 'react-icons/fi';
import { GlassSurface } from '../components/ui/GlassSurface';
import { Button } from '../components/ui/Button';

/**
 * ComponentDemo - Página de referencia para visualizar componentes
 *
 * Ruta: /demo
 *
 * PROPÓSITO: Servir como referencia visual para el equipo de frontend
 * durante el desarrollo. Muestra variantes, tamaños y casos de uso
 * de componentes reutilizables.
 *
 * FUTURO: Considerar migrar a Storybook cuando el proyecto escale.
 *
 * Nota técnica: Usamos versiones estáticas (sin Framer Motion) para
 * evitar conflictos con re-renders del contexto global.
 */

// Versión simplificada de EmptyState para la demo (sin animaciones)
function EmptyStatePreview({ variant, size = 'sm', show_action = true }) {
  const variants = {
    no_results: {
      icon: FiSearch,
      title: 'Sin resultados',
      description: 'No encontramos lo que buscas.',
    },
    no_items: {
      icon: FiPackage,
      title: 'No hay elementos',
      description: 'Aún no hay nada aquí.',
    },
    no_favorites: {
      icon: FiHeart,
      title: 'Sin favoritos',
      description: 'Guarda tus obras favoritas.',
    },
    no_comments: {
      icon: FiMessageCircle,
      title: 'Sin comentarios',
      description: 'Sé el primero en comentar.',
    },
    no_artworks: {
      icon: FiImage,
      title: 'Sin obras',
      description: 'Aún no hay obras publicadas.',
    },
    error: {
      icon: FiAlertCircle,
      title: 'Algo salió mal',
      description: 'Ocurrió un error. Intenta de nuevo.',
    },
  };

  const sizes = {
    sm: { icon: 28, title: 'text-base', desc: 'text-sm', padding: 'py-6 px-4', gap: 'gap-2' },
    md: { icon: 36, title: 'text-lg', desc: 'text-sm', padding: 'py-10 px-6', gap: 'gap-3' },
    lg: { icon: 48, title: 'text-xl', desc: 'text-base', padding: 'py-14 px-8', gap: 'gap-4' },
  };

  const config = variants[variant] || variants.no_items;
  const Icon = config.icon;
  const s = sizes[size];

  return (
    <div className={`flex flex-col items-center justify-center text-center ${s.padding} ${s.gap}`}>
      <div className="text-raios-text-support/40">
        <Icon size={s.icon} strokeWidth={1.5} />
      </div>
      <h3 className={`font-mono text-raios-text-high ${s.title}`}>
        {config.title}
      </h3>
      <p className={`font-sans text-raios-text-support max-w-xs ${s.desc}`}>
        {config.description}
      </p>
      {show_action && (
        <Button variant="secondary" size="sm" className="mt-2">
          Acción
        </Button>
      )}
    </div>
  );
}

export default function ComponentDemo() {
  const [selected_size, set_selected_size] = useState('sm');

  const empty_state_variants = [
    {
      variant: 'no_results',
      context: 'Búsqueda sin resultados',
      use_cases: ['Filtros que no devuelven obras', 'Búsqueda vacía'],
    },
    {
      variant: 'no_items',
      context: 'Lista vacía genérica',
      use_cases: ['Carrito vacío', 'Lista de pedidos vacía'],
    },
    {
      variant: 'no_favorites',
      context: 'Sin favoritos guardados',
      use_cases: ['Sección de favoritos del usuario'],
    },
    {
      variant: 'no_comments',
      context: 'Sin comentarios',
      use_cases: ['Sección de comentarios de una obra'],
    },
    {
      variant: 'no_artworks',
      context: 'Sin obras publicadas',
      use_cases: [
        'Perfil de artista sin obras',
        'Categoría vacía',
        'Resultados de exploración vacíos',
      ],
    },
    {
      variant: 'error',
      context: 'Error genérico',
      use_cases: ['Fallo de carga', 'Error de red'],
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="font-mono text-3xl text-raios-text-high mb-2">
            Component Demo
          </h1>
          <p className="font-sans text-raios-text-support">
            Visualización de variantes de EmptyState
          </p>
        </header>

        {/* EmptyState Variants Grid */}
        <section>
          <h2 className="font-mono text-xl text-raios-text-high mb-4">
            Todas las Variantes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {empty_state_variants.map(({ variant, context, use_cases }) => (
              <GlassSurface
                key={variant}
                variant="content"
                shadow="glow_subtle"
                className="rounded-lg overflow-hidden"
              >
                {/* Card Header */}
                <div className="px-4 py-3 border-b border-raios-text-support/10">
                  <code className="font-mono text-sm text-raios-primary">
                    variant="{variant}"
                  </code>
                  <p className="font-sans text-xs text-raios-text-support mt-1">
                    {context}
                  </p>
                </div>

                {/* EmptyState Preview */}
                <div className="min-h-[180px] flex items-center justify-center">
                  <EmptyStatePreview variant={variant} size="sm" />
                </div>

                {/* Use Cases */}
                <div className="px-4 py-3 border-t border-raios-text-support/10 bg-black/20">
                  <p className="font-mono text-xs text-raios-text-support uppercase mb-2">
                    Casos de uso:
                  </p>
                  <ul className="space-y-1">
                    {use_cases.map((use_case, idx) => (
                      <li
                        key={idx}
                        className="font-sans text-xs text-raios-text-high flex items-start gap-2"
                      >
                        <span className="text-raios-primary">•</span>
                        {use_case}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassSurface>
            ))}
          </div>
        </section>

        {/* Size Comparison for no_artworks */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-mono text-xl text-raios-text-high">
              Comparación de Tamaños (no_artworks)
            </h2>
            <div className="flex gap-2">
              {['sm', 'md', 'lg'].map((size) => (
                <button
                  key={size}
                  onClick={() => set_selected_size(size)}
                  className={`
                    px-3 py-1 rounded font-mono text-sm transition-colors
                    ${selected_size === size
                      ? 'bg-raios-primary text-white'
                      : 'bg-white/10 text-raios-text-support hover:text-white'
                    }
                  `}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['sm', 'md', 'lg'].map((size) => (
              <GlassSurface
                key={size}
                variant="content"
                shadow={selected_size === size ? 'glow' : 'glow_subtle'}
                className={`rounded-lg transition-all ${
                  selected_size === size ? 'ring-2 ring-raios-primary/50' : ''
                }`}
              >
                <div className="px-4 py-2 border-b border-raios-text-support/10">
                  <code className="font-mono text-sm text-raios-tertiary">
                    size="{size}"
                  </code>
                </div>
                <EmptyStatePreview
                  variant="no_artworks"
                  size={size}
                  show_action={true}
                />
              </GlassSurface>
            ))}
          </div>
        </section>

        {/* Customization Example */}
        <section className="mt-12">
          <h2 className="font-mono text-xl text-raios-text-high mb-4">
            Ejemplo: Perfil de Artista sin Obras
          </h2>

          <GlassSurface
            variant="content"
            shadow="glow"
            className="rounded-lg max-w-lg mx-auto"
          >
            <div className="px-4 py-2 border-b border-raios-text-support/10">
              <code className="font-mono text-xs text-raios-text-support">
                Simulación de uso real en perfil de artista
              </code>
            </div>
            <div className="py-12 px-6 flex flex-col items-center text-center gap-4">
              <div className="text-raios-text-support/40">
                <FiImage size={48} strokeWidth={1.5} />
              </div>
              <h3 className="font-mono text-xl text-raios-text-high">
                Este artista aún no tiene obras
              </h3>
              <p className="font-sans text-raios-text-support max-w-sm">
                Cuando publique su primera obra, aparecerá aquí.
                Mientras tanto, explora otros artistas increíbles.
              </p>
              <div className="flex gap-3 mt-2">
                <Button variant="primary">
                  Explorar artistas
                </Button>
                <Button variant="secondary">
                  Seguir artista
                </Button>
              </div>
            </div>
          </GlassSurface>
        </section>

        {/* Recomendación */}
        <section className="mt-12 mb-8">
          <GlassSurface variant="surface" className="rounded-lg p-6">
            <h3 className="font-mono text-lg text-raios-primary mb-3">
              Recomendación
            </h3>
            <p className="font-sans text-raios-text-support mb-4">
              La variante <code className="text-raios-tertiary">no_artworks</code> es
              útil y reutilizable. Casos confirmados:
            </p>
            <ul className="space-y-2 font-sans text-sm text-raios-text-high">
              <li className="flex gap-2">
                <span className="text-green-500">✓</span>
                Perfil de artista sin obras publicadas
              </li>
              <li className="flex gap-2">
                <span className="text-green-500">✓</span>
                Categoría vacía (sin obras asignadas)
              </li>
              <li className="flex gap-2">
                <span className="text-green-500">✓</span>
                Colección personal vacía del usuario
              </li>
              <li className="flex gap-2">
                <span className="text-green-500">✓</span>
                Resultados de exploración/filtros sin obras
              </li>
            </ul>
          </GlassSurface>
        </section>
      </div>
    </div>
  );
}
