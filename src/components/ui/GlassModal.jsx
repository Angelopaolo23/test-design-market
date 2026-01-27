import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { FiX } from 'react-icons/fi';
import { GlassSurface } from './GlassSurface';
import { overlay_variants, modal_variants } from '../../utils/animations';

/**
 * GlassModal - Modal con glassmorphism para RAIOS
 *
 * Usa portales para renderizar en el nivel correcto de z-index (Capa 3-4).
 * Incluye manejo de ESC y click en overlay para cerrar.
 *
 * @param {Object} props
 * @param {boolean} props.is_open - Estado de visibilidad
 * @param {Function} props.on_close - Callback al cerrar
 * @param {string} props.title - Título del modal (opcional)
 * @param {'sm' | 'md' | 'lg' | 'xl' | 'full'} props.size - Tamaño del modal
 * @param {boolean} props.show_close_button - Mostrar botón X
 * @param {boolean} props.close_on_overlay - Cerrar al click en overlay
 * @param {boolean} props.close_on_escape - Cerrar con tecla ESC
 * @param {React.ReactNode} props.children - Contenido del modal
 */
export function GlassModal({
  is_open = false,
  on_close,
  title,
  size = 'md',
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

  // Tamaños del modal
  const size_classes = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[95vw] md:max-w-[90vw]',
  };

  const handle_overlay_click = () => {
    if (close_on_overlay && on_close) {
      on_close();
    }
  };

  const modal_content = (
    <AnimatePresence>
      {is_open && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            variants={overlay_variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-raios-secondary/85 backdrop-blur-md"
            onClick={handle_overlay_click}
          />

          {/* Modal */}
          <GlassSurface
            as_motion
            variants={modal_variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            variant="surface"
            shadow="float"
            className={`
              relative w-full ${size_classes[size]}
              rounded-lg overflow-hidden
              max-h-[90vh] flex flex-col
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

  // Renderizar en portal
  if (typeof window === 'undefined') return null;
  return createPortal(modal_content, document.body);
}

export default GlassModal;
