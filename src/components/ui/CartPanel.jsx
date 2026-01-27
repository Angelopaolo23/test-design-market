import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { FiMinus, FiPlus, FiTrash2, FiArrowRight, FiArrowLeft, FiX, FiShoppingBag } from 'react-icons/fi';
import { GlassSurface } from './GlassSurface';
import { overlay_variants, modal_variants } from '../../utils/animations';

/**
 * CartPanel - "Studio Cart"
 *
 * Mobile: Layout vertical centrado
 * Desktop (lg+): Dos columnas (items izq | resumen+checkout der)
 *
 * @param {Object} props
 * @param {boolean} props.is_open - Estado de visibilidad
 * @param {Function} props.on_close - Callback al cerrar
 * @param {Array} props.items - Items del carrito
 * @param {Function} props.on_update_quantity - Callback al cambiar cantidad
 * @param {Function} props.on_remove_item - Callback al eliminar item
 * @param {Function} props.on_checkout - Callback al ir a checkout
 * @param {Function} props.on_continue_shopping - Callback al seguir comprando
 */
export function CartPanel({
  is_open = false,
  on_close,
  items = [],
  on_update_quantity,
  on_remove_item,
  on_checkout,
  on_continue_shopping,
}) {
  // Calcular totales
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const item_count = items.reduce((sum, item) => sum + item.quantity, 0);

  // Formato de precio
  const format_price = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Manejo de ESC
  const handle_key_down = useCallback(
    (event) => {
      if (event.key === 'Escape' && on_close) {
        on_close();
      }
    },
    [on_close]
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

  const handle_quantity_change = (item_id, delta) => {
    const item = items.find(i => i.id === item_id);
    if (item) {
      const new_quantity = Math.max(1, item.quantity + delta);
      on_update_quantity?.(item_id, new_quantity);
    }
  };

  // Componente reutilizable para un item del carrito
  const CartItem = ({ item, variant = 'compact' }) => (
    <GlassSurface
      variant="light"
      shadow="none"
      className={`p-3 rounded-lg ${variant === 'expanded' ? 'p-4' : ''}`}
    >
      <div className="flex gap-3">
        {/* Imagen */}
        <div className={`flex-shrink-0 rounded-lg overflow-hidden bg-raios-secondary ${variant === 'expanded' ? 'w-24 h-24' : 'w-20 h-20'}`}>
          {item.image_url ? (
            <img
              src={item.image_url}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl">
              🖼️
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className={`font-mono text-raios-text-high truncate ${variant === 'expanded' ? 'text-base' : 'text-sm'}`}>
            {item.title}
          </h4>
          <p className="text-xs text-raios-text-support truncate">
            {item.artist_name}
          </p>
          <p className={`font-mono text-raios-primary mt-1 ${variant === 'expanded' ? 'text-base' : 'text-sm'}`}>
            {format_price(item.price)}
          </p>

          {/* Controles de cantidad */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handle_quantity_change(item.id, -1)}
                disabled={item.quantity <= 1}
                className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center text-raios-text-support hover:text-raios-text-high disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <FiMinus size={14} />
              </motion.button>
              <span className="font-mono text-sm text-raios-text-high w-6 text-center">
                {item.quantity}
              </span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handle_quantity_change(item.id, 1)}
                className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center text-raios-text-support hover:text-raios-text-high"
              >
                <FiPlus size={14} />
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => on_remove_item?.(item.id)}
              className="p-1.5 rounded-md text-raios-text-support hover:text-red-400 hover:bg-red-400/10 transition-colors"
            >
              <FiTrash2 size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </GlassSurface>
  );

  // Componente vacío
  const EmptyCart = ({ variant = 'mobile' }) => (
    <div className={`flex flex-col items-center justify-center text-center ${variant === 'desktop' ? 'py-16' : 'h-full py-12'}`}>
      <div className="w-20 h-20 rounded-full bg-raios-primary/10 flex items-center justify-center mb-4">
        <FiShoppingBag size={32} className="text-raios-primary/50" />
      </div>
      <p className="text-raios-text-support mb-4 text-lg">
        Tu carrito está vacío
      </p>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          on_continue_shopping?.();
          on_close?.();
        }}
        className="text-raios-primary hover:text-raios-tertiary transition-colors"
      >
        Explorar obras →
      </motion.button>
    </div>
  );

  // Componente de resumen
  const CheckoutSummary = ({ variant = 'mobile' }) => (
    <div className={variant === 'desktop' ? '' : 'bg-raios-secondary/50'}>
      {/* Resumen */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-raios-text-support">Subtotal ({item_count} {item_count === 1 ? 'obra' : 'obras'})</span>
          <span className="text-raios-text-high">{format_price(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-raios-text-support">Envío</span>
          <span className="text-green-400">Gratis</span>
        </div>
        <div className="border-t border-raios-text-support/10 pt-3">
          <div className="flex justify-between items-baseline">
            <span className="font-mono text-raios-text-high">Total</span>
            <span className="font-mono text-2xl text-raios-text-high">
              {format_price(subtotal)}
            </span>
          </div>
        </div>
      </div>

      {/* CTA Checkout */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={on_checkout}
        className="w-full flex items-center justify-center gap-2 p-4 bg-raios-primary text-white rounded-lg font-mono text-sm hover:bg-raios-primary/90 transition-colors"
      >
        Continuar compra
        <FiArrowRight size={18} />
      </motion.button>

      {/* Link seguir explorando */}
      <motion.button
        whileHover={{ x: -4 }}
        onClick={() => {
          on_continue_shopping?.();
          on_close?.();
        }}
        className="w-full flex items-center justify-center gap-2 mt-3 p-2 text-raios-text-support hover:text-raios-text-high transition-colors text-sm"
      >
        <FiArrowLeft size={16} />
        Seguir explorando
      </motion.button>
    </div>
  );

  const modal_content = (
    <AnimatePresence>
      {is_open && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-3 md:p-4 lg:p-8">
          {/* Overlay */}
          <motion.div
            variants={overlay_variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-raios-secondary/85 backdrop-blur-md"
            onClick={on_close}
          />

          {/* Panel - Responsive */}
          <GlassSurface
            as_motion
            variants={modal_variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            variant="surface"
            shadow="float"
            className="
              relative w-full rounded-xl overflow-hidden
              max-w-[95vw] md:max-w-lg lg:max-w-4xl xl:max-w-5xl
              max-h-[90vh] lg:max-h-[80vh]
            "
          >
            {/* Botón cerrar - Absoluto */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={on_close}
              className="absolute top-3 right-3 lg:top-5 lg:right-5 z-10 p-2 rounded-lg text-raios-text-support hover:text-raios-text-high hover:bg-white/10 transition-colors"
              aria-label="Cerrar"
            >
              <FiX size={20} />
            </motion.button>

            {/* ============ MOBILE/TABLET LAYOUT ============ */}
            <div className="lg:hidden flex flex-col h-full max-h-[90vh]">
              {/* Header */}
              <div className="p-4 md:p-5 border-b border-raios-text-support/10">
                <h2 className="font-mono text-xl text-raios-text-high pr-10">
                  Tu Selección
                </h2>
                <p className="text-sm text-raios-text-support mt-1">
                  {item_count} {item_count === 1 ? 'obra' : 'obras'} · {format_price(subtotal)}
                </p>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-4 md:p-5">
                {items.length === 0 ? (
                  <EmptyCart variant="mobile" />
                ) : (
                  <div className="space-y-3">
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} variant="compact" />
                    ))}
                  </div>
                )}
              </div>

              {/* Resumen y CTA */}
              {items.length > 0 && (
                <div className="p-4 md:p-5 border-t border-raios-text-support/10 bg-raios-secondary/50">
                  <CheckoutSummary variant="mobile" />
                </div>
              )}
            </div>

            {/* ============ DESKTOP LAYOUT (lg+) - Dos columnas ============ */}
            <div className="hidden lg:flex h-full max-h-[80vh]">
              {/* Columna izquierda - Items */}
              <div className="flex-1 flex flex-col border-r border-raios-text-support/10">
                {/* Header */}
                <div className="p-5 xl:p-6 border-b border-raios-text-support/10">
                  <h2 className="font-mono text-2xl text-raios-text-high">
                    Tu Selección
                  </h2>
                  <p className="text-sm text-raios-text-support mt-1">
                    {item_count} {item_count === 1 ? 'obra' : 'obras'} en tu carrito
                  </p>
                </div>

                {/* Lista de items scrolleable */}
                <div className="flex-1 overflow-y-auto p-5 xl:p-6">
                  {items.length === 0 ? (
                    <EmptyCart variant="desktop" />
                  ) : (
                    <div className="space-y-4">
                      {items.map((item) => (
                        <CartItem key={item.id} item={item} variant="expanded" />
                      ))}
                    </div>
                  )}
                </div>

                {/* Link seguir explorando - solo si hay items */}
                {items.length > 0 && (
                  <div className="p-5 xl:p-6 border-t border-raios-text-support/10">
                    <motion.button
                      whileHover={{ x: -4 }}
                      onClick={() => {
                        on_continue_shopping?.();
                        on_close?.();
                      }}
                      className="flex items-center gap-2 text-raios-text-support hover:text-raios-text-high transition-colors text-sm"
                    >
                      <FiArrowLeft size={16} />
                      Seguir explorando
                    </motion.button>
                  </div>
                )}
              </div>

              {/* Columna derecha - Resumen (sticky) */}
              <div className="w-80 xl:w-96 flex flex-col bg-raios-secondary/30">
                <div className="p-5 xl:p-6 flex-1 flex flex-col">
                  <h3 className="font-mono text-lg text-raios-text-high mb-6">
                    Resumen del pedido
                  </h3>

                  {items.length > 0 ? (
                    <div className="flex-1 flex flex-col justify-between">
                      <CheckoutSummary variant="desktop" />
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <p className="text-raios-text-support text-sm text-center">
                        Agrega obras para ver el resumen
                      </p>
                    </div>
                  )}
                </div>

                {/* Badges de confianza */}
                {items.length > 0 && (
                  <div className="p-5 xl:p-6 border-t border-raios-text-support/10">
                    <div className="flex flex-wrap gap-3 text-xs text-raios-text-support">
                      <span className="flex items-center gap-1">
                        <span className="text-green-400">✓</span> Pago seguro
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="text-green-400">✓</span> Envío gratis
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="text-green-400">✓</span> Garantía de autenticidad
                      </span>
                    </div>
                  </div>
                )}
              </div>
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

export default CartPanel;
