import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiShare2, FiShoppingCart } from 'react-icons/fi';
import { QuantitySelector } from './QuantitySelector';

/**
 * ArtworkInfo - Panel de información de la obra
 *
 * Incluye: título, artista, precio, descripción, materiales, inspiración,
 * selector de cantidad y botón de agregar al carrito.
 *
 * @param {Object} props
 * @param {Object} props.artwork - Datos de la obra
 * @param {Function} props.on_add_to_cart - Callback al agregar (artwork, quantity)
 * @param {Function} props.on_favorite - Callback al marcar favorito
 * @param {Function} props.on_share - Callback al compartir
 * @param {boolean} props.is_favorite - Si está en favoritos
 */
export function ArtworkInfo({
  artwork = {},
  on_add_to_cart,
  on_favorite,
  on_share,
  is_favorite = false,
}) {
  const [quantity, set_quantity] = useState(1);
  const [is_adding, set_is_adding] = useState(false);

  // Datos de la obra con defaults
  const {
    title = 'Título de la Obra',
    artist_name = 'Artista',
    artist_username = 'artista',
    price = 0,
    description = 'Descripción de la obra...',
    materials = 'No especificado',
    dimensions = 'No especificado',
    inspiration = null,
    year = new Date().getFullYear(),
    edition = null, // ej: "1/10" para ediciones limitadas
    available = true,
  } = artwork;

  // Formato de precio
  const format_price = (value) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handle_add_to_cart = async () => {
    set_is_adding(true);
    await on_add_to_cart?.(artwork, quantity);
    // Simular delay de feedback
    setTimeout(() => set_is_adding(false), 500);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header: Título y artista */}
      <div className="mb-4 md:mb-6">
        <h1 className="font-mono text-2xl md:text-3xl lg:text-4xl text-raios-text-high font-bold leading-tight">
          {title}
        </h1>
        <p className="text-raios-text-support mt-2">
          por{' '}
          <span className="text-raios-primary hover:text-raios-tertiary transition-colors cursor-pointer">
            {artist_name}
          </span>
          <span className="text-raios-text-support/60"> @{artist_username}</span>
        </p>
        {year && (
          <p className="text-sm text-raios-text-support/60 mt-1">{year}</p>
        )}
      </div>

      {/* Precio */}
      <div className="mb-6">
        <p className="font-mono text-3xl md:text-4xl text-raios-primary font-bold">
          {format_price(price)}
        </p>
        {edition && (
          <p className="text-sm text-raios-text-support mt-1">
            Edición limitada: {edition}
          </p>
        )}
      </div>

      {/* Acciones de compra */}
      <div className="flex flex-col gap-4 mb-8">
        {/* Cantidad */}
        <div>
          <p className="text-xs text-raios-text-support uppercase tracking-wider mb-2 font-mono">
            Cantidad
          </p>
          <QuantitySelector
            quantity={quantity}
            on_change={set_quantity}
            min={1}
            max={available ? 10 : 0}
            disabled={!available}
          />
        </div>

        {/* Botón agregar al carrito */}
        <motion.button
          whileHover={{ scale: available ? 1.02 : 1 }}
          whileTap={{ scale: available ? 0.98 : 1 }}
          onClick={handle_add_to_cart}
          disabled={!available || is_adding}
          className={`
            w-full flex items-center justify-center gap-3 p-4 rounded-lg font-mono text-sm
            transition-all duration-300
            ${available
              ? 'bg-raios-primary text-white hover:bg-white hover:text-raios-primary shadow-lg shadow-raios-primary/30'
              : 'bg-raios-text-support/20 text-raios-text-support cursor-not-allowed'
            }
          `}
        >
          <FiShoppingCart size={20} />
          {is_adding ? 'Agregando...' : available ? 'Agregar al carrito' : 'No disponible'}
        </motion.button>

        {/* Favorito y Compartir */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={on_favorite}
            className={`
              flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border
              transition-all duration-300
              ${is_favorite
                ? 'bg-raios-primary/20 border-raios-primary text-raios-primary'
                : 'border-raios-text-support/20 text-raios-text-support hover:border-raios-primary hover:text-raios-primary'
              }
            `}
          >
            <FiHeart size={18} className={is_favorite ? 'fill-current' : ''} />
            <span className="text-sm">{is_favorite ? 'En favoritos' : 'Favoritos'}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={on_share}
            className="flex items-center justify-center gap-2 p-3 rounded-lg border border-raios-text-support/20 text-raios-text-support hover:border-raios-primary hover:text-raios-primary transition-all duration-300"
          >
            <FiShare2 size={18} />
            <span className="text-sm">Compartir</span>
          </motion.button>
        </div>
      </div>

      {/* Descripción */}
      <div className="mb-6">
        <h3 className="text-xs text-raios-text-support uppercase tracking-wider mb-2 font-mono">
          Descripción
        </h3>
        <p className="text-raios-text-high leading-relaxed">
          {description}
        </p>
      </div>

      {/* Inspiración (si existe) */}
      {inspiration && (
        <div className="mb-6">
          <h3 className="text-xs text-raios-text-support uppercase tracking-wider mb-2 font-mono">
            Inspiración
          </h3>
          <p className="text-raios-text-support leading-relaxed italic">
            "{inspiration}"
          </p>
        </div>
      )}

      {/* Especificaciones */}
      <div className="mt-auto pt-6 border-t border-raios-text-support/10">
        <h3 className="text-xs text-raios-text-support uppercase tracking-wider mb-4 font-mono">
          Especificaciones
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-raios-text-support">Materiales</p>
            <p className="text-sm text-raios-text-high mt-1">{materials}</p>
          </div>
          <div>
            <p className="text-xs text-raios-text-support">Dimensiones</p>
            <p className="text-sm text-raios-text-high mt-1">{dimensions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtworkInfo;
