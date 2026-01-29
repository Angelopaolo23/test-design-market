import { forwardRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Textarea - Componente de textarea para textos largos
 *
 * Sigue el mismo patrón visual que Input pero para
 * contenido multilinea.
 *
 * @param {Object} props
 * @param {string} props.value - Valor actual
 * @param {Function} props.on_change - Callback al cambiar valor
 * @param {string} props.placeholder - Placeholder
 * @param {string} props.error - Mensaje de error
 * @param {boolean} props.disabled - Si está deshabilitado
 * @param {string} props.variant - Variante visual (default, ghost, filled)
 * @param {number} props.rows - Número de filas visibles
 * @param {number} props.max_length - Máximo de caracteres
 * @param {boolean} props.show_count - Mostrar contador de caracteres
 * @param {string} props.className - Clases adicionales
 */
const Textarea = forwardRef(function Textarea(
  {
    value,
    on_change,
    placeholder,
    error,
    disabled = false,
    variant = 'default',
    rows = 4,
    max_length,
    show_count = false,
    className = '',
    ...props
  },
  ref
) {
  // Variantes de estilo (mismas que Input)
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

  // Estado de error
  const error_styles = error
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
    : '';

  // Estado deshabilitado
  const disabled_styles = disabled
    ? 'opacity-50 cursor-not-allowed'
    : '';

  const handle_change = (e) => {
    if (!disabled && on_change) {
      const new_value = e.target.value;
      // Respetar max_length si está definido
      if (max_length && new_value.length > max_length) {
        return;
      }
      on_change(new_value);
    }
  };

  const char_count = value?.length || 0;

  return (
    <div className={`relative ${className}`}>
      {/* Textarea */}
      <motion.textarea
        ref={ref}
        value={value}
        onChange={handle_change}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        maxLength={max_length}
        whileFocus={{ scale: 1.005 }}
        className={`
          w-full px-4 py-3 rounded-lg font-sans
          text-raios-text-high text-base
          placeholder:text-raios-text-support/50
          outline-none resize-y min-h-[100px]
          transition-all duration-200
          ${variants[variant]}
          ${error_styles}
          ${disabled_styles}
        `}
        {...props}
      />

      {/* Contador de caracteres */}
      {show_count && max_length && (
        <div className="absolute bottom-3 right-3 pointer-events-none">
          <span
            className={`
              text-xs font-mono
              ${char_count >= max_length
                ? 'text-red-500'
                : 'text-raios-text-support/50'
              }
            `}
          >
            {char_count}/{max_length}
          </span>
        </div>
      )}
    </div>
  );
});

export { Textarea };
export default Textarea;
