import { forwardRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Input - Componente de input base para formularios
 *
 * Sigue el Design System RAIOS con soporte para:
 * - Variantes: default, ghost, filled
 * - Estados: focus, error, disabled
 * - Iconos opcionales izquierda/derecha
 *
 * @param {Object} props
 * @param {string} props.type - Tipo de input (text, email, password, number)
 * @param {string} props.value - Valor actual
 * @param {Function} props.on_change - Callback al cambiar valor
 * @param {string} props.placeholder - Placeholder del input
 * @param {string} props.error - Mensaje de error (activa estado error)
 * @param {boolean} props.disabled - Si está deshabilitado
 * @param {string} props.variant - Variante visual (default, ghost, filled)
 * @param {React.ReactNode} props.icon_left - Icono a la izquierda
 * @param {React.ReactNode} props.icon_right - Icono a la derecha
 * @param {string} props.size - Tamaño (sm, md, lg)
 * @param {string} props.className - Clases adicionales
 */
const Input = forwardRef(function Input(
  {
    type = 'text',
    value,
    on_change,
    placeholder,
    error,
    disabled = false,
    variant = 'default',
    icon_left,
    icon_right,
    size = 'md',
    className = '',
    ...props
  },
  ref
) {
  // Variantes de estilo
  const variants = {
    default: `
      bg-raios-secondary/50
      border border-raios-text-support/20
      focus:border-raios-primary focus:ring-1 focus:ring-raios-primary/30
    `,
    ghost: `
      bg-transparent
      border border-raios-text-support/20
      focus:border-raios-primary focus:ring-1 focus:ring-raios-primary/30
    `,
    filled: `
      bg-white/10
      border border-transparent
      focus:border-raios-primary focus:ring-1 focus:ring-raios-primary/30
    `,
  };

  // Tamaños
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg',
  };

  // Estado de error
  const error_styles = error
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
    : '';

  // Estado deshabilitado
  const disabled_styles = disabled
    ? 'opacity-50 cursor-not-allowed'
    : '';

  // Padding adicional para iconos
  const icon_padding_left = icon_left ? 'pl-11' : '';
  const icon_padding_right = icon_right ? 'pr-11' : '';

  const handle_change = (e) => {
    if (!disabled && on_change) {
      on_change(e.target.value);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Icono izquierdo */}
      {icon_left && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-raios-text-support pointer-events-none">
          {icon_left}
        </div>
      )}

      {/* Input */}
      <motion.input
        ref={ref}
        type={type}
        value={value}
        onChange={handle_change}
        placeholder={placeholder}
        disabled={disabled}
        whileFocus={{ scale: 1.005 }}
        className={`
          w-full rounded-lg font-sans
          text-raios-text-high
          placeholder:text-raios-text-support/50
          outline-none
          transition-all duration-200
          ${variants[variant]}
          ${sizes[size]}
          ${error_styles}
          ${disabled_styles}
          ${icon_padding_left}
          ${icon_padding_right}
        `}
        {...props}
      />

      {/* Icono derecho */}
      {icon_right && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-raios-text-support pointer-events-none">
          {icon_right}
        </div>
      )}
    </div>
  );
});

export { Input };
export default Input;
