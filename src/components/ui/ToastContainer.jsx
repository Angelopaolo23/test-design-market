import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import { Toast } from './Toast';

/**
 * ToastContainer - Contenedor que posiciona los toasts
 *
 * Renderiza los toasts usando un portal para que estén
 * fuera del flujo normal del DOM.
 *
 * @param {Object} props
 * @param {Array} props.toasts - Lista de toasts activos
 * @param {Function} props.on_dismiss - Callback para cerrar un toast
 * @param {string} props.position - Posición: top-right, top-center, bottom-right, bottom-center
 */
export function ToastContainer({
  toasts = [],
  on_dismiss,
  position = 'top-right',
}) {
  // Posiciones disponibles
  const positions = {
    'top-right': 'top-4 right-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  };

  const position_class = positions[position] || positions['top-right'];

  // Usar portal para renderizar fuera del DOM tree principal
  return createPortal(
    <div
      className={`
        fixed z-50 ${position_class}
        flex flex-col gap-3
        pointer-events-none
        max-h-screen overflow-hidden
        p-4
      `}
      aria-live="polite"
      aria-label="Notificaciones"
    >
      <AnimatePresence mode="popLayout">
        {toasts.slice(0, 5).map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            on_close={on_dismiss}
          />
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
}

export default ToastContainer;
