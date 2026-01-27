import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { FiX } from 'react-icons/fi';
import { GlassSurface } from './GlassSurface';
import { overlay_variants, sheet_variants } from '../../utils/animations';

/**
 * GlassSheet - Bottom sheet con glassmorphism (mobile-first)
 *
 * Ideal para: acciones rápidas, detalles en mobile, menús contextuales.
 * En mobile sube desde abajo, en desktop puede comportarse como modal.
 *
 * @param {Object} props
 * @param {boolean} props.is_open - Estado de visibilidad
 * @param {Function} props.on_close - Callback al cerrar
 * @param {string} props.title - Título del sheet (opcional)
 * @param {'sm' | 'md' | 'lg' | 'full'} props.height - Altura del sheet
 * @param {boolean} props.show_handle - Mostrar handle de arrastre
 * @param {boolean} props.show_close_button - Mostrar botón X
 * @param {React.ReactNode} props.children - Contenido
 */
export function GlassSheet({
  is_open = false,
  on_close,
  title,
  height = 'md',
  show_handle = true,
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

  // Alturas del sheet
  const height_classes = {
    sm: 'max-h-[40vh]',
    md: 'max-h-[60vh]',
    lg: 'max-h-[80vh]',
    full: 'max-h-[95vh]',
  };

  const handle_overlay_click = () => {
    if (close_on_overlay && on_close) {
      on_close();
    }
  };

  const sheet_content = (
    <AnimatePresence>
      {is_open && (
        <div className="fixed inset-0 z-40 flex items-end md:items-center md:justify-center">
          {/* Overlay */}
          <motion.div
            variants={overlay_variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-raios-secondary/85 backdrop-blur-md"
            onClick={handle_overlay_click}
          />

          {/* Sheet - mobile: bottom, desktop: center */}
          <GlassSurface
            as_motion
            variants={sheet_variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            variant="surface"
            shadow="float"
            className={`
              relative w-full ${height_classes[height]}
              rounded-t-2xl md:rounded-lg
              md:max-w-lg md:max-h-[80vh]
              flex flex-col
              ${class_name}
            `}
          >
            {/* Handle (solo mobile) */}
            {show_handle && (
              <div className="flex justify-center pt-3 pb-1 md:hidden">
                <div className="w-10 h-1 bg-raios-text-support/30 rounded-full" />
              </div>
            )}

            {/* Header */}
            {(title || show_close_button) && (
              <div className="flex items-center justify-between p-4 border-b border-raios-text-support/10">
                {title && (
                  <h2 className="font-mono text-lg text-raios-text-high">
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
            <div className="flex-1 overflow-y-auto p-4">
              {children}
            </div>
          </GlassSurface>
        </div>
      )}
    </AnimatePresence>
  );

  if (typeof window === 'undefined') return null;
  return createPortal(sheet_content, document.body);
}

export default GlassSheet;
