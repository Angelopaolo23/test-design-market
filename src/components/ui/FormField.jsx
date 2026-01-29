import { motion, AnimatePresence } from 'framer-motion';
import { raios_transitions } from '../../utils/animations';

/**
 * FormField - Wrapper para inputs con label, helper text y error
 *
 * Proporciona estructura consistente para campos de formulario:
 * - Label con indicador de requerido
 * - Slot para el input (children)
 * - Helper text opcional
 * - Mensaje de error con animación
 *
 * @param {Object} props
 * @param {string} props.label - Label del campo
 * @param {string} props.helper_text - Texto de ayuda
 * @param {string} props.error - Mensaje de error
 * @param {boolean} props.required - Si el campo es requerido
 * @param {React.ReactNode} props.children - Input o componente de formulario
 * @param {string} props.className - Clases adicionales
 */
export function FormField({
  label,
  helper_text,
  error,
  required = false,
  children,
  className = '',
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {/* Label */}
      {label && (
        <label className="font-mono text-sm text-raios-text-high uppercase tracking-wider">
          {label}
          {required && (
            <span className="text-raios-primary ml-1">*</span>
          )}
        </label>
      )}

      {/* Input slot */}
      {children}

      {/* Helper text o Error */}
      <AnimatePresence mode="wait">
        {error ? (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={raios_transitions.fast}
            className="text-sm text-red-500 font-sans"
          >
            {error}
          </motion.p>
        ) : helper_text ? (
          <motion.p
            key="helper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={raios_transitions.fast}
            className="text-sm text-raios-text-support font-sans"
          >
            {helper_text}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default FormField;
