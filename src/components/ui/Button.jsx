import { motion } from 'framer-motion';

/**
 * Button - Componente de botón RAIOS
 *
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'ghost'} props.variant - Variante visual
 * @param {'sm' | 'md' | 'lg'} props.size - Tamaño del botón
 * @param {boolean} props.is_loading - Estado de carga
 * @param {boolean} props.is_disabled - Estado deshabilitado
 * @param {Function} props.on_click - Handler de click
 * @param {React.ReactNode} props.icon - Icono opcional
 * @param {'left' | 'right'} props.icon_position - Posición del icono
 * @param {React.ReactNode} props.children - Contenido del botón
 * @param {string} props.class_name - Clases adicionales
 */
export function Button({
  variant = 'primary',
  size = 'md',
  is_loading = false,
  is_disabled = false,
  on_click,
  icon,
  icon_position = 'left',
  children,
  class_name = '',
  ...rest
}) {
  const variant_classes = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
  };

  const size_classes = {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
  };

  const is_button_disabled = is_disabled || is_loading;

  return (
    <motion.button
      whileHover={!is_button_disabled ? { scale: 1.02 } : {}}
      whileTap={!is_button_disabled ? { scale: 0.98 } : {}}
      onClick={on_click}
      disabled={is_button_disabled}
      className={`
        ${variant_classes[variant]}
        ${size_classes[size]}
        ${is_button_disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${class_name}
      `}
      {...rest}
    >
      {is_loading ? (
        <span className="mr-2 animate-spin">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </span>
      ) : icon && icon_position === 'left' ? (
        <span className="mr-2">{icon}</span>
      ) : null}

      {children}

      {!is_loading && icon && icon_position === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </motion.button>
  );
}

export default Button;
