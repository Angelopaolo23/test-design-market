import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { FiX } from 'react-icons/fi';
import { GlassSurface } from './GlassSurface';
import { overlay_variants, panel_variants } from '../../utils/animations';

/**
 * GlassPanel - Panel lateral con glassmorphism (slide-in desde derecha)
 *
 * Ideal para: carrito, filtros, configuraciones.
 * En mobile ocupa más ancho, en desktop tiene ancho fijo.
 *
 * @param {Object} props
 * @param {boolean} props.is_open - Estado de visibilidad
 * @param {Function} props.on_close - Callback al cerrar
 * @param {string} props.title - Título del panel (opcional)
 * @param {'sm' | 'md' | 'lg'} props.size - Ancho del panel
 * @param {'left' | 'right'} props.position - Lado desde donde aparece
 * @param {boolean} props.show_close_button - Mostrar botón X
 * @param {boolean} props.close_on_overlay - Cerrar al click en overlay
 * @param {React.ReactNode} props.children - Contenido
 */
export function GlassPanel({
  is_open = false,
  on_close,
  title,
  size = 'md',
  position = 'right',
  show_close_button = true,
  close_on_overlay = true,
  close_on_escape = true,
  class_name = '',
  children,
}) {
  // Manejo de ESC
  const handle_key_down = useCallback(
    (event) => {
      if (event.key === 'Escape' && close_on_escape && on_close) {
        on_close();
      }
    },
    [close_on_escape, on_close]
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

  // Tamaños del panel
  const size_classes = {
    sm: 'w-full max-w-xs',
    md: 'w-full max-w-sm md:max-w-md',
    lg: 'w-full max-w-md md:max-w-lg',
  };

  // Variantes según posición
  const position_variants = {
    right: {
      hidden: { x: '100%', opacity: 0 },
      visible: { x: 0, opacity: 1, transition: { duration: 0.3, ease: [0, 0, 0.2, 1] } },
      exit: { x: '100%', opacity: 0, transition: { duration: 0.15, ease: [0, 0, 0.2, 1] } },
    },
    left: {
      hidden: { x: '-100%', opacity: 0 },
      visible: { x: 0, opacity: 1, transition: { duration: 0.3, ease: [0, 0, 0.2, 1] } },
      exit: { x: '-100%', opacity: 0, transition: { duration: 0.15, ease: [0, 0, 0.2, 1] } },
    },
  };

  const position_classes = {
    right: 'right-0',
    left: 'left-0',
  };

  const handle_overlay_click = () => {
    if (close_on_overlay && on_close) {
      on_close();
    }
  };

  const panel_content = (
    <AnimatePresence>
      {is_open && (
        <div className="fixed inset-0 z-40">
          {/* Overlay */}
          <motion.div
            variants={overlay_variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-raios-secondary/85 backdrop-blur-md"
            onClick={handle_overlay_click}
          />

          {/* Panel */}
          <GlassSurface
            as_motion
            variants={position_variants[position]}
            initial="hidden"
            animate="visible"
            exit="exit"
            variant="surface"
            shadow="float"
            className={`
              absolute top-0 ${position_classes[position]} h-full
              ${size_classes[size]}
              flex flex-col
              ${class_name}
            `}
          >
            {/* Header */}
            {(title || show_close_button) && (
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-raios-text-support/10">
                {title && (
                  <h2 className="font-mono text-lg md:text-xl text-raios-text-high">
                    {title}
                  </h2>
                )}
                {show_close_button && on_close && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={on_close}
                    className="p-2 rounded-lg text-raios-text-support hover:text-raios-text-high hover:bg-white/10 transition-colors"
                    aria-label="Cerrar"
                  >
                    <FiX size={20} />
                  </motion.button>
                )}
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              {children}
            </div>
          </GlassSurface>
        </div>
      )}
    </AnimatePresence>
  );

  if (typeof window === 'undefined') return null;
  return createPortal(panel_content, document.body);
}

export default GlassPanel;
