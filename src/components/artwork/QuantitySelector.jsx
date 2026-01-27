import { motion } from 'framer-motion';
import { FiMinus, FiPlus } from 'react-icons/fi';

/**
 * QuantitySelector - Selector de cantidad para agregar al carrito
 *
 * @param {Object} props
 * @param {number} props.quantity - Cantidad actual
 * @param {Function} props.on_change - Callback con nueva cantidad
 * @param {number} props.min - Cantidad mínima (default: 1)
 * @param {number} props.max - Cantidad máxima (default: 10)
 * @param {boolean} props.disabled - Estado deshabilitado
 */
export function QuantitySelector({
  quantity = 1,
  on_change,
  min = 1,
  max = 10,
  disabled = false,
}) {
  const handle_decrement = () => {
    if (quantity > min && !disabled) {
      on_change?.(quantity - 1);
    }
  };

  const handle_increment = () => {
    if (quantity < max && !disabled) {
      on_change?.(quantity + 1);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <motion.button
        whileHover={{ scale: disabled || quantity <= min ? 1 : 1.1 }}
        whileTap={{ scale: disabled || quantity <= min ? 1 : 0.9 }}
        onClick={handle_decrement}
        disabled={disabled || quantity <= min}
        className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-raios-text-support hover:text-raios-text-high hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Disminuir cantidad"
      >
        <FiMinus size={18} />
      </motion.button>

      <span className="w-12 text-center font-mono text-lg text-raios-text-high">
        {quantity}
      </span>

      <motion.button
        whileHover={{ scale: disabled || quantity >= max ? 1 : 1.1 }}
        whileTap={{ scale: disabled || quantity >= max ? 1 : 0.9 }}
        onClick={handle_increment}
        disabled={disabled || quantity >= max}
        className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-raios-text-support hover:text-raios-text-high hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Aumentar cantidad"
      >
        <FiPlus size={18} />
      </motion.button>
    </div>
  );
}

export default QuantitySelector;
