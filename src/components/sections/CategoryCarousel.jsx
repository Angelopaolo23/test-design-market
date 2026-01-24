import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiHeart, FiShoppingCart } from 'react-icons/fi';
import { raios_transitions } from '../../utils/animations';

/**
 * CategoryCarousel - Carrusel de obras por categoría
 * Diseño spotlight: obra central destacada, laterales claramente separadas
 *
 * @param {Object} props
 * @param {string} props.title - Título de la sección (ej: "Categorías")
 * @param {Array} props.categories - Lista de categorías disponibles
 * @param {Array} props.artworks - Lista de obras a mostrar
 * @param {Function} props.on_artwork_click - Handler al hacer click en una obra
 * @param {Function} props.on_category_change - Handler al cambiar de categoría
 * @param {Function} props.on_add_to_cart - Handler al agregar al carrito
 * @param {Function} props.on_favorite - Handler al agregar a favoritos
 * @param {number} props.autoplay_delay - Delay en ms para autoplay (default: 8000)
 */
export function CategoryCarousel({
  title = 'Categorías',
  categories = [],
  artworks = [],
  on_artwork_click,
  on_category_change,
  on_add_to_cart,
  on_favorite,
  autoplay_delay = 8000,
}) {
  const [active_category, set_active_category] = useState(categories[0] || '');
  const [current_index, set_current_index] = useState(0);
  const [is_interacting, set_is_interacting] = useState(false);
  const [drag_start_x, set_drag_start_x] = useState(0);
  const [progress, set_progress] = useState(0);
  const [favorites, set_favorites] = useState(new Set());
  const progress_interval_ref = useRef(null);

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
    set_progress(0);
    set_current_index((prev) => {
      const total = filtered_artworks.length;
      return total > 0 ? (prev - 1 + total) % total : 0;
    });
  }, [filtered_artworks.length]);

  const go_to_next = useCallback(() => {
    set_is_interacting(true);
    set_progress(0);
    set_current_index((prev) => {
      const total = filtered_artworks.length;
      return total > 0 ? (prev + 1) % total : 0;
    });
  }, [filtered_artworks.length]);

  // Progress bar y auto-play
  useEffect(() => {
    if (filtered_artworks.length <= 1) return;

    if (progress_interval_ref.current) {
      clearInterval(progress_interval_ref.current);
    }

    const interval_time = 50;
    const increment = (interval_time / autoplay_delay) * 100;

    progress_interval_ref.current = setInterval(() => {
      set_progress((prev) => {
        if (prev >= 100) {
          if (!is_interacting) {
            set_current_index((idx) => {
              const total = filtered_artworks.length;
              return total > 0 ? (idx + 1) % total : 0;
            });
          }
          set_is_interacting(false);
          return 0;
        }
        return prev + increment;
      });
    }, interval_time);

    return () => {
      if (progress_interval_ref.current) {
        clearInterval(progress_interval_ref.current);
      }
    };
  }, [current_index, is_interacting, autoplay_delay, filtered_artworks.length]);

  // Reset index y progress cuando cambia la categoría
  useEffect(() => {
    set_current_index(0);
    set_progress(0);
    set_is_interacting(true);
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

  // Handlers de acciones
  const handle_add_to_cart = (e, artwork_id) => {
    e.stopPropagation();
    set_is_interacting(true);
    set_progress(0);
    on_add_to_cart?.(artwork_id);
  };

  const handle_favorite = (e, artwork_id) => {
    e.stopPropagation();
    set_is_interacting(true);
    set_progress(0);
    set_favorites((prev) => {
      const new_set = new Set(prev);
      if (new_set.has(artwork_id)) {
        new_set.delete(artwork_id);
      } else {
        new_set.add(artwork_id);
      }
      return new_set;
    });
    on_favorite?.(artwork_id);
  };

  const { prev, current, next } = get_visible_indices();
  const current_artwork = filtered_artworks[current];
  const is_current_favorite = current_artwork && favorites.has(current_artwork.artwork_id);

  return (
    <section className="py-12 md:py-16 overflow-hidden">
      {/* Header: Título + Tags de categoría */}
      <div className="px-4 md:px-8 lg:px-16 mb-8">
        <h2 className="font-mono text-2xl md:text-3xl text-raios-text-high font-bold mb-6">
          {title}
        </h2>

        {/* Tags de categorías */}
        <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                set_active_category(category);
                set_is_interacting(true);
                set_progress(0);
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

      {/* Carrusel - Layout con flexbox */}
      <div
        className="relative px-4 md:px-8"
        onMouseDown={handle_drag_start}
        onMouseUp={handle_drag_end}
        onTouchStart={handle_drag_start}
        onTouchEnd={handle_drag_end}
      >
        {/* Flechas de navegación */}
        {filtered_artworks.length > 1 && (
          <>
            <button
              onClick={go_to_prev}
              className="hidden md:flex absolute left-4 lg:left-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-raios-secondary/80 backdrop-blur-md text-raios-text-high border border-raios-text-support/20 hover:border-raios-primary hover:text-raios-primary transition-colors"
              aria-label="Obra anterior"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={go_to_next}
              className="hidden md:flex absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-raios-secondary/80 backdrop-blur-md text-raios-text-high border border-raios-text-support/20 hover:border-raios-primary hover:text-raios-primary transition-colors"
              aria-label="Siguiente obra"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Container de items - Flexbox centrado */}
        <div className="flex items-center justify-center gap-4 md:gap-8 lg:gap-12">
          <AnimatePresence mode="popLayout">
            {filtered_artworks.length > 0 ? (
              <>
                {/* Item izquierdo */}
                {filtered_artworks.length > 1 && prev !== -1 && (
                  <motion.div
                    key={`left-${filtered_artworks[prev]?.artwork_id}`}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 0.5, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={raios_transitions.slow}
                    className="hidden md:block shrink-0 w-[180px] lg:w-[220px]"
                    style={{ filter: 'blur(4px)' }}
                  >
                    <img
                      src={filtered_artworks[prev]?.image_url}
                      alt={filtered_artworks[prev]?.title}
                      className="w-full h-auto object-cover aspect-[3/4]"
                      draggable={false}
                    />
                  </motion.div>
                )}

                {/* Item central - Destacado */}
                {current !== -1 && (
                  <motion.div
                    key={`center-${filtered_artworks[current]?.artwork_id}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={raios_transitions.slow}
                    className="shrink-0 w-[280px] md:w-[350px] lg:w-[400px] cursor-pointer relative z-10"
                    onClick={() => on_artwork_click?.(filtered_artworks[current]?.artwork_id)}
                  >
                    <div className="relative shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
                      <img
                        src={filtered_artworks[current]?.image_url}
                        alt={filtered_artworks[current]?.title}
                        className="w-full h-auto object-cover aspect-[3/4]"
                        draggable={false}
                      />
                      {/* Overlay sutil */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            'linear-gradient(to top, rgba(10, 2, 24, 0.5) 0%, transparent 40%)',
                        }}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Item derecho */}
                {filtered_artworks.length > 2 && next !== -1 && (
                  <motion.div
                    key={`right-${filtered_artworks[next]?.artwork_id}`}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 0.5, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={raios_transitions.slow}
                    className="hidden md:block shrink-0 w-[180px] lg:w-[220px]"
                    style={{ filter: 'blur(4px)' }}
                  >
                    <img
                      src={filtered_artworks[next]?.image_url}
                      alt={filtered_artworks[next]?.title}
                      className="w-full h-auto object-cover aspect-[3/4]"
                      draggable={false}
                    />
                  </motion.div>
                )}
              </>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-raios-text-support font-sans text-lg py-20"
              >
                No hay obras en esta categoría
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Indicadores de posición - mobile */}
        {filtered_artworks.length > 1 && (
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {filtered_artworks.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  set_current_index(index);
                  set_is_interacting(true);
                  set_progress(0);
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

      {/* Progress bar */}
      {filtered_artworks.length > 1 && (
        <div className="px-4 md:px-8 lg:px-16 mt-6">
          <div className="max-w-md mx-auto h-1 bg-raios-text-support/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-raios-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.05, ease: 'linear' }}
            />
          </div>
        </div>
      )}

      {/* Info de la obra activa + CTAs */}
      {current_artwork && (
        <motion.div
          key={current_artwork.artwork_id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={raios_transitions.standard}
          className="px-4 md:px-8 lg:px-16 mt-6 text-center"
        >
          <h3 className="font-mono text-xl md:text-2xl text-raios-text-high font-bold">
            {current_artwork.title}
          </h3>
          <p className="font-sans text-raios-text-support mt-1">
            {current_artwork.artist_name}
          </p>
          <p className="font-mono text-2xl md:text-3xl text-raios-primary font-bold mt-2">
            ${current_artwork.price?.toLocaleString()}
          </p>

          {/* CTAs - Glassmorphism en favoritos, sólido en carrito */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => handle_favorite(e, current_artwork.artwork_id)}
              className={`
                inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-sans font-medium
                transition-all duration-300 backdrop-blur-md border
                ${
                  is_current_favorite
                    ? 'bg-raios-primary/30 border-raios-primary text-raios-primary'
                    : 'bg-white/10 border-white/20 text-raios-text-high hover:bg-white/20 hover:border-raios-primary hover:text-raios-primary'
                }
              `}
            >
              <FiHeart className={`w-5 h-5 ${is_current_favorite ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">Favoritos</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => handle_add_to_cart(e, current_artwork.artwork_id)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-sans font-medium bg-raios-primary text-white hover:bg-white hover:text-raios-primary transition-all duration-300 shadow-lg shadow-raios-primary/30"
            >
              <FiShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">Agregar al carrito</span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </section>
  );
}

export default CategoryCarousel;
