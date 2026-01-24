import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { raios_transitions } from '../../utils/animations';

/**
 * CategoryCarousel - Carrusel de obras por categoría
 * Diseño spotlight: obra central destacada, laterales difuminadas
 *
 * @param {Object} props
 * @param {string} props.title - Título de la sección (ej: "Categorías")
 * @param {Array} props.categories - Lista de categorías disponibles
 * @param {Array} props.artworks - Lista de obras a mostrar
 * @param {Function} props.on_artwork_click - Handler al hacer click en una obra
 * @param {Function} props.on_category_change - Handler al cambiar de categoría
 * @param {number} props.autoplay_delay - Delay en ms para autoplay (default: 5000)
 */
export function CategoryCarousel({
  title = 'Categorías',
  categories = [],
  artworks = [],
  on_artwork_click,
  on_category_change,
  autoplay_delay = 5000,
}) {
  const [active_category, set_active_category] = useState(categories[0] || '');
  const [current_index, set_current_index] = useState(0);
  const [is_interacting, set_is_interacting] = useState(false);
  const [drag_start_x, set_drag_start_x] = useState(0);

  // Filtrar obras por categoría activa
  const filtered_artworks = artworks.filter(
    (artwork) =>
      artwork.category?.toLowerCase() === active_category?.toLowerCase()
  );

  // Calcular índices de items visibles (prev, current, next)
  const get_visible_indices = useCallback(() => {
    const total = filtered_artworks.length;
    if (total === 0) return { prev: -1, current: -1, next: -1 };

    const prev = (current_index - 1 + total) % total;
    const next = (current_index + 1) % total;

    return { prev, current: current_index, next };
  }, [current_index, filtered_artworks.length]);

  // Navegación
  const go_to_prev = useCallback(() => {
    set_is_interacting(true);
    set_current_index((prev) => {
      const total = filtered_artworks.length;
      return total > 0 ? (prev - 1 + total) % total : 0;
    });
  }, [filtered_artworks.length]);

  const go_to_next = useCallback(() => {
    set_is_interacting(true);
    set_current_index((prev) => {
      const total = filtered_artworks.length;
      return total > 0 ? (prev + 1) % total : 0;
    });
  }, [filtered_artworks.length]);

  // Auto-play
  useEffect(() => {
    if (filtered_artworks.length <= 1) return;

    const timer = setTimeout(() => {
      if (!is_interacting) {
        go_to_next();
      }
      set_is_interacting(false);
    }, autoplay_delay);

    return () => clearTimeout(timer);
  }, [
    current_index,
    is_interacting,
    autoplay_delay,
    go_to_next,
    filtered_artworks.length,
  ]);

  // Reset index cuando cambia la categoría
  useEffect(() => {
    set_current_index(0);
    on_category_change?.(active_category);
  }, [active_category, on_category_change]);

  // Manejo de swipe/drag
  const handle_drag_start = (e) => {
    const client_x = e.touches ? e.touches[0].clientX : e.clientX;
    set_drag_start_x(client_x);
    set_is_interacting(true);
  };

  const handle_drag_end = (e) => {
    const client_x = e.changedTouches
      ? e.changedTouches[0].clientX
      : e.clientX;
    const diff = drag_start_x - client_x;
    const threshold = 50;

    if (diff > threshold) {
      go_to_next();
    } else if (diff < -threshold) {
      go_to_prev();
    }
  };

  const { prev, current, next } = get_visible_indices();

  // Variantes de animación para los items
  const item_variants = {
    center: {
      x: 0,
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      zIndex: 10,
    },
    left: {
      x: '-60%',
      scale: 0.7,
      opacity: 0.4,
      filter: 'blur(6px)',
      zIndex: 5,
    },
    right: {
      x: '60%',
      scale: 0.7,
      opacity: 0.4,
      filter: 'blur(6px)',
      zIndex: 5,
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      transition: raios_transitions.fast,
    },
  };

  return (
    <section className="py-12 md:py-16 overflow-hidden">
      {/* Header: Título + Tags de categoría */}
      <div className="px-4 md:px-8 lg:px-16 mb-8">
        <h2 className="font-mono text-2xl md:text-3xl text-raios-text-high font-bold mb-6">
          {title}
        </h2>

        {/* Tags de categorías - scroll horizontal en mobile */}
        <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                set_active_category(category);
                set_is_interacting(true);
              }}
              className={`
                shrink-0 px-4 py-2 rounded text-sm font-mono uppercase tracking-wider
                transition-all duration-300
                ${
                  active_category === category
                    ? 'bg-raios-primary text-white'
                    : 'bg-raios-tertiary/30 text-raios-tertiary hover:bg-raios-tertiary/50'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Carrusel */}
      <div
        className="relative h-[400px] md:h-[500px] flex items-center justify-center"
        onMouseDown={handle_drag_start}
        onMouseUp={handle_drag_end}
        onTouchStart={handle_drag_start}
        onTouchEnd={handle_drag_end}
      >
        {/* Flechas de navegación - solo desktop */}
        {filtered_artworks.length > 1 && (
          <>
            <button
              onClick={go_to_prev}
              className="hidden md:flex absolute left-4 lg:left-8 z-20 w-12 h-12 items-center justify-center rounded-full bg-raios-secondary/80 text-raios-text-high border border-raios-text-support/20 hover:border-raios-primary hover:text-raios-primary transition-colors"
              aria-label="Obra anterior"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={go_to_next}
              className="hidden md:flex absolute right-4 lg:right-8 z-20 w-12 h-12 items-center justify-center rounded-full bg-raios-secondary/80 text-raios-text-high border border-raios-text-support/20 hover:border-raios-primary hover:text-raios-primary transition-colors"
              aria-label="Siguiente obra"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Items del carrusel */}
        <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            {filtered_artworks.length > 0 ? (
              <>
                {/* Item izquierdo */}
                {filtered_artworks.length > 1 && prev !== -1 && (
                  <CarouselItem
                    key={`left-${filtered_artworks[prev]?.artwork_id}`}
                    artwork={filtered_artworks[prev]}
                    variant="left"
                    variants={item_variants}
                    on_click={on_artwork_click}
                  />
                )}

                {/* Item central */}
                {current !== -1 && (
                  <CarouselItem
                    key={`center-${filtered_artworks[current]?.artwork_id}`}
                    artwork={filtered_artworks[current]}
                    variant="center"
                    variants={item_variants}
                    on_click={on_artwork_click}
                    is_active
                  />
                )}

                {/* Item derecho */}
                {filtered_artworks.length > 2 && next !== -1 && (
                  <CarouselItem
                    key={`right-${filtered_artworks[next]?.artwork_id}`}
                    artwork={filtered_artworks[next]}
                    variant="right"
                    variants={item_variants}
                    on_click={on_artwork_click}
                  />
                )}
              </>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-raios-text-support font-sans text-lg"
              >
                No hay obras en esta categoría
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Indicadores de posición - mobile */}
        {filtered_artworks.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 md:hidden">
            {filtered_artworks.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  set_current_index(index);
                  set_is_interacting(true);
                }}
                className={`
                  w-2 h-2 rounded-full transition-all duration-300
                  ${
                    index === current_index
                      ? 'bg-raios-primary w-6'
                      : 'bg-raios-text-support/40'
                  }
                `}
                aria-label={`Ir a obra ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info de la obra activa */}
      {filtered_artworks[current] && (
        <motion.div
          key={filtered_artworks[current]?.artwork_id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={raios_transitions.standard}
          className="px-4 md:px-8 lg:px-16 mt-6 text-center"
        >
          <h3 className="font-mono text-xl md:text-2xl text-raios-text-high font-bold">
            {filtered_artworks[current]?.title}
          </h3>
          <p className="font-sans text-raios-text-support mt-1">
            {filtered_artworks[current]?.artist_name}
          </p>
          <p className="font-mono text-2xl md:text-3xl text-raios-primary font-bold mt-2">
            ${filtered_artworks[current]?.price?.toLocaleString()}
          </p>
        </motion.div>
      )}
    </section>
  );
}

/**
 * CarouselItem - Item individual del carrusel
 */
function CarouselItem({
  artwork,
  variant,
  variants,
  on_click,
  is_active = false,
}) {
  if (!artwork) return null;

  return (
    <motion.div
      layout
      initial={variant}
      animate={variant}
      exit="exit"
      variants={variants}
      className={`
        absolute cursor-pointer
        ${is_active ? 'w-[280px] md:w-[400px]' : 'w-[200px] md:w-[280px]'}
      `}
      onClick={() => is_active && on_click?.(artwork.artwork_id)}
      style={{ originX: 0.5, originY: 0.5 }}
    >
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={artwork.image_url}
          alt={artwork.title}
          className="w-full h-auto object-cover aspect-[3/4]"
          draggable={false}
        />

        {/* Overlay sutil en items activos */}
        {is_active && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, rgba(10, 2, 24, 0.6) 0%, transparent 50%)',
            }}
          />
        )}
      </div>
    </motion.div>
  );
}

export default CategoryCarousel;
