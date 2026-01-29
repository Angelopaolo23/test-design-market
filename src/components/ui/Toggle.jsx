import { motion } from 'framer-motion';

/**
 * Toggle - Switch de activar/desactivar
 *
 * Componente de toggle con animación suave y soporte
 * para label y descripción.
 *
 * @param {Object} props
 * @param {boolean} props.checked - Estado actual
 * @param {Function} props.on_change - Callback al cambiar (recibe nuevo valor)
 * @param {string} props.label - Label principal
 * @param {string} props.description - Descripción adicional
 * @param {boolean} props.disabled - Si está deshabilitado
 * @param {string} props.size - Tamaño (sm, md)
 * @param {string} props.className - Clases adicionales
 */
export function Toggle({
  checked = false,
  on_change,
  label,
  description,
  disabled = false,
  size = 'md',
  className = '',
}) {
  const handle_toggle = () => {
    if (!disabled && on_change) {
      on_change(!checked);
    }
  };

  // Tamaños del switch
  const sizes = {
    sm: {
      track: 'w-10 h-6',
      thumb: 'w-4 h-4',
      translate: checked ? 'translateX(18px)' : 'translateX(2px)',
    },
    md: {
      track: 'w-12 h-7',
      thumb: 'w-5 h-5',
      translate: checked ? 'translateX(22px)' : 'translateX(2px)',
    },
  };

  const current_size = sizes[size];

  return (
    <div
      className={`flex items-start gap-3 ${className}`}
      onClick={handle_toggle}
    >
      {/* Switch */}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        className={`
          relative shrink-0 rounded-full
          transition-colors duration-200
          ${current_size.track}
          ${checked
            ? 'bg-raios-primary'
            : 'bg-raios-text-support/30'
          }
          ${disabled
            ? 'opacity-50 cursor-not-allowed'
            : 'cursor-pointer hover:opacity-90'
          }
        `}
      >
        <motion.span
          className={`
            absolute top-1/2 -translate-y-1/2 rounded-full bg-white shadow-md
            ${current_size.thumb}
          `}
          animate={{
            x: checked ? (size === 'sm' ? 18 : 22) : 2,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
        />
      </button>

      {/* Label y descripción */}
      {(label || description) && (
        <div
          className={`
            flex flex-col gap-0.5 select-none
            ${disabled ? 'opacity-50' : 'cursor-pointer'}
          `}
        >
          {label && (
            <span className="font-sans text-sm text-raios-text-high">
              {label}
            </span>
          )}
          {description && (
            <span className="font-sans text-xs text-raios-text-support">
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default Toggle;
