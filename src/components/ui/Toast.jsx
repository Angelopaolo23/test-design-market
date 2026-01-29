import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiX, FiAlertTriangle, FiInfo } from 'react-icons/fi';
import { GlassSurface } from './GlassSurface';
import { raios_transitions } from '../../utils/animations';

/**
 * Toast - Notificación individual
 *
 * @param {Object} props
 * @param {string} props.id - ID único del toast
 * @param {string} props.type - Tipo: success, error, warning, info
 * @param {string} props.title - Título del mensaje
 * @param {string} props.message - Mensaje descriptivo (opcional)
 * @param {number} props.duration - Duración en ms (0 = no auto-dismiss)
 * @param {Function} props.on_close - Callback al cerrar
 * @param {Object} props.action - Acción opcional { label, on_click }
 */
export function Toast({
  id,
  type = 'info',
  title,
  message,
  duration = 5000,
  on_close,
  action,
}) {
  // Configuración por tipo
  const types = {
    success: {
      icon: FiCheck,
      color: 'text-green-500',
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
    },
    error: {
      icon: FiX,
      color: 'text-red-500',
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
    },
    warning: {
      icon: FiAlertTriangle,
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
    },
    info: {
      icon: FiInfo,
      color: 'text-raios-primary',
      bg: 'bg-raios-primary/10',
      border: 'border-raios-primary/30',
    },
  };

  const config = types[type] || types.info;
  const Icon = config.icon;

  // Auto-dismiss
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        on_close?.(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, on_close]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.95 }}
      transition={raios_transitions.standard}
      className="pointer-events-auto"
    >
      <GlassSurface
        variant="surface"
        shadow="float"
        className={`
          p-4 rounded-lg min-w-[300px] max-w-[400px]
          border ${config.border}
        `}
      >
        <div className="flex gap-3">
          {/* Icono */}
          <div className={`shrink-0 ${config.color}`}>
            <Icon size={20} />
          </div>

          {/* Contenido */}
          <div className="flex-1 min-w-0">
            <p className="font-mono text-sm text-raios-text-high font-medium">
              {title}
            </p>
            {message && (
              <p className="font-sans text-sm text-raios-text-support mt-1">
                {message}
              </p>
            )}

            {/* Action button */}
            {action && (
              <button
                onClick={() => {
                  action.on_click?.();
                  on_close?.(id);
                }}
                className="mt-2 text-sm font-mono text-raios-primary hover:text-raios-tertiary transition-colors"
              >
                {action.label}
              </button>
            )}
          </div>

          {/* Botón cerrar */}
          <button
            onClick={() => on_close?.(id)}
            className="shrink-0 text-raios-text-support hover:text-raios-text-high transition-colors"
            aria-label="Cerrar notificación"
          >
            <FiX size={18} />
          </button>
        </div>
      </GlassSurface>
    </motion.div>
  );
}

export default Toast;
