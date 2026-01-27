import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { FiSearch, FiX, FiClock, FiImage, FiUser, FiTag } from 'react-icons/fi';
import { GlassSurface } from './GlassSurface';
import { overlay_variants } from '../../utils/animations';

/**
 * SearchOverlay - "Discovery Portal" (MVP Version)
 *
 * Búsqueda global simplificada para MVP.
 * Versión futura: tendencias, artistas destacados, sugerencias IA.
 *
 * @param {Object} props
 * @param {boolean} props.is_open - Estado de visibilidad
 * @param {Function} props.on_close - Callback al cerrar
 * @param {Function} props.on_search - Callback de búsqueda (recibe query)
 * @param {Function} props.on_select_result - Callback al seleccionar resultado
 * @param {Array} props.results - Resultados de búsqueda
 * @param {boolean} props.is_loading - Estado de carga
 * @param {Array} props.recent_searches - Búsquedas recientes (localStorage)
 */
export function SearchOverlay({
  is_open = false,
  on_close,
  on_search,
  on_select_result,
  results = null,
  is_loading = false,
  recent_searches = [],
}) {
  const [query, set_query] = useState('');
  const input_ref = useRef(null);
  const debounce_ref = useRef(null);

  // Autofocus al abrir
  useEffect(() => {
    if (is_open && input_ref.current) {
      setTimeout(() => input_ref.current?.focus(), 100);
    }
    if (!is_open) {
      set_query('');
    }
  }, [is_open]);

  // Manejo de ESC
  const handle_key_down = useCallback(
    (event) => {
      if (event.key === 'Escape' && on_close) {
        on_close();
      }
    },
    [on_close]
  );

  useEffect(() => {
    if (is_open) {
      document.addEventListener('keydown', handle_key_down);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handle_key_down);
      document.body.style.overflow = '';
    };
  }, [is_open, handle_key_down]);

  // Debounced search
  const handle_input_change = (value) => {
    set_query(value);

    if (debounce_ref.current) {
      clearTimeout(debounce_ref.current);
    }

    if (value.trim().length >= 2) {
      debounce_ref.current = setTimeout(() => {
        on_search?.(value.trim());
      }, 300);
    }
  };

  const handle_select = (result) => {
    on_select_result?.(result);
    on_close?.();
  };

  const handle_recent_click = (search_term) => {
    set_query(search_term);
    on_search?.(search_term);
  };

  // Agrupar resultados por tipo
  const grouped_results = results ? {
    obras: results.filter(r => r.type === 'artwork'),
    artistas: results.filter(r => r.type === 'artist'),
    categorias: results.filter(r => r.type === 'category'),
  } : null;

  const has_results = grouped_results && (
    grouped_results.obras.length > 0 ||
    grouped_results.artistas.length > 0 ||
    grouped_results.categorias.length > 0
  );

  const overlay_content = (
    <AnimatePresence>
      {is_open && (
        <div className="fixed inset-0 z-50 flex flex-col">
          {/* Backdrop */}
          <motion.div
            variants={overlay_variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-raios-secondary/95 backdrop-blur-lg"
            onClick={on_close}
          />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 flex flex-col h-full max-w-2xl mx-auto w-full px-4 pt-20 md:pt-32"
          >
            {/* Search Input */}
            <div className="relative">
              <FiSearch
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-raios-text-support"
              />
              <input
                ref={input_ref}
                type="text"
                value={query}
                onChange={(e) => handle_input_change(e.target.value)}
                placeholder="Buscar obras, artistas..."
                className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/10 rounded-xl text-raios-text-high placeholder-raios-text-support/50 focus:outline-none focus:border-raios-primary/50 font-sans text-lg"
              />
              {query && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => set_query('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-raios-text-support hover:text-raios-text-high"
                >
                  <FiX size={20} />
                </motion.button>
              )}
            </div>

            {/* Results Area */}
            <div className="flex-1 overflow-y-auto mt-6 pb-20">
              {/* Loading */}
              {is_loading && (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-2 border-raios-primary/30 border-t-raios-primary rounded-full animate-spin" />
                </div>
              )}

              {/* No query - Show recent */}
              {!is_loading && !query && recent_searches.length > 0 && (
                <div>
                  <p className="text-xs text-raios-text-support uppercase tracking-wider mb-3 font-mono flex items-center gap-2">
                    <FiClock size={14} />
                    Recientes
                  </p>
                  <div className="space-y-1">
                    {recent_searches.slice(0, 5).map((search, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ x: 4 }}
                        onClick={() => handle_recent_click(search)}
                        className="w-full text-left px-3 py-2 rounded-lg text-raios-text-support hover:text-raios-text-high hover:bg-white/5 transition-colors"
                      >
                        {search}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* No query, no recent */}
              {!is_loading && !query && recent_searches.length === 0 && (
                <div className="text-center py-12 text-raios-text-support">
                  <p>Escribe para buscar obras y artistas</p>
                </div>
              )}

              {/* Results */}
              {!is_loading && query && has_results && (
                <div className="space-y-6">
                  {/* Obras */}
                  {grouped_results.obras.length > 0 && (
                    <div>
                      <p className="text-xs text-raios-text-support uppercase tracking-wider mb-3 font-mono flex items-center gap-2">
                        <FiImage size={14} />
                        Obras
                      </p>
                      <div className="space-y-2">
                        {grouped_results.obras.map((result) => (
                          <motion.button
                            key={result.id}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handle_select(result)}
                            className="w-full text-left"
                          >
                            <GlassSurface
                              variant="light"
                              shadow="none"
                              className="p-3 rounded-lg flex items-center gap-3 hover:bg-white/10 transition-colors"
                            >
                              {result.image_url ? (
                                <img
                                  src={result.image_url}
                                  alt={result.title}
                                  className="w-12 h-12 rounded-lg object-cover"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-lg bg-raios-primary/20 flex items-center justify-center">
                                  <FiImage className="text-raios-primary" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="font-mono text-sm text-raios-text-high truncate">
                                  {result.title}
                                </p>
                                <p className="text-xs text-raios-text-support truncate">
                                  {result.artist_name} · {result.category}
                                </p>
                              </div>
                              <p className="font-mono text-sm text-raios-primary">
                                {result.price}
                              </p>
                            </GlassSurface>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Artistas */}
                  {grouped_results.artistas.length > 0 && (
                    <div>
                      <p className="text-xs text-raios-text-support uppercase tracking-wider mb-3 font-mono flex items-center gap-2">
                        <FiUser size={14} />
                        Artistas
                      </p>
                      <div className="space-y-2">
                        {grouped_results.artistas.map((result) => (
                          <motion.button
                            key={result.id}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handle_select(result)}
                            className="w-full text-left"
                          >
                            <GlassSurface
                              variant="light"
                              shadow="none"
                              className="p-3 rounded-lg flex items-center gap-3 hover:bg-white/10 transition-colors"
                            >
                              <div className="w-10 h-10 rounded-full bg-raios-tertiary/20 flex items-center justify-center">
                                <FiUser className="text-raios-tertiary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-mono text-sm text-raios-text-high truncate">
                                  {result.name}
                                </p>
                                <p className="text-xs text-raios-text-support">
                                  {result.works_count} obras
                                </p>
                              </div>
                            </GlassSurface>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Categorías */}
                  {grouped_results.categorias.length > 0 && (
                    <div>
                      <p className="text-xs text-raios-text-support uppercase tracking-wider mb-3 font-mono flex items-center gap-2">
                        <FiTag size={14} />
                        Categorías
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {grouped_results.categorias.map((result) => (
                          <motion.button
                            key={result.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handle_select(result)}
                            className="px-4 py-2 bg-raios-primary/20 text-raios-primary rounded-lg text-sm hover:bg-raios-primary/30 transition-colors"
                          >
                            {result.name}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* No results */}
              {!is_loading && query && results && !has_results && (
                <div className="text-center py-12">
                  <p className="text-raios-text-support mb-2">
                    No encontramos resultados para "{query}"
                  </p>
                  <p className="text-sm text-raios-text-support/70">
                    Intenta con otros términos
                  </p>
                </div>
              )}
            </div>

            {/* Close button - Fixed bottom */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={on_close}
                className="p-3 rounded-full bg-white/10 text-raios-text-support hover:text-raios-text-high hover:bg-white/20 transition-colors"
              >
                <FiX size={24} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  if (typeof window === 'undefined') return null;
  return createPortal(overlay_content, document.body);
}

export default SearchOverlay;
