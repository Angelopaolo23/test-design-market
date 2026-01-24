import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';

/**
 * ArtworkCard - Card de obra de arte estilo RAIOS (Masonry)
 * Sin bordes ni sombras, altura dinámica según imagen
 *
 * @param {Object} props
 * @param {string} props.artwork_id - ID de la obra
 * @param {string} props.title - Título de la obra
 * @param {string} props.artist_name - Nombre del artista
 * @param {number} props.price - Precio de la obra
 * @param {string} props.image_url - URL de la imagen
 * @param {string[]} props.tags - Tags/categorías de la obra (array)
 * @param {string} props.description - Descripción corta de la obra
 * @param {boolean} props.is_favorite - Estado de favorito
 * @param {Function} props.on_favorite - Handler de favorito
 * @param {Function} props.on_add_to_cart - Handler de agregar al carrito
 * @param {Function} props.on_click - Handler de click en la card
 */
export function ArtworkCard({
  artwork_id,
  title,
  artist_name,
  price,
  image_url,
  tags = [],
  description,
  is_favorite = false,
  on_favorite,
  on_add_to_cart,
  on_click,
}) {
  const handle_action_click = (e, action) => {
    e.stopPropagation();
    action?.(artwork_id);
  };

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      onClick={() => on_click?.(artwork_id)}
      className="group cursor-pointer relative overflow-hidden"
    >
      {/* Imagen - altura natural */}
      <div className="relative overflow-hidden">
        <img
          src={image_url}
          alt={title}
          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Overlay con gradiente - siempre visible en mobile, hover en desktop */}
        <div
          className="absolute inset-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(to top, rgba(10, 2, 24, 0.95) 0%, rgba(10, 2, 24, 0.5) 50%, transparent 100%)',
          }}
        />

        {/* Acciones flotantes - siempre visibles en mobile, hover en desktop */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 md:translate-y-2 md:group-hover:translate-y-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => handle_action_click(e, on_favorite)}
            className={`
              p-3 md:p-2.5 rounded-full backdrop-blur-md transition-colors
              ${
                is_favorite
                  ? 'bg-raios-primary text-white'
                  : 'bg-black/30 text-white hover:bg-black/50'
              }
            `}
            aria-label={is_favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            <FiHeart className={`${is_favorite ? 'fill-current' : ''} w-6 h-6 md:w-5 md:h-5`} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => handle_action_click(e, on_add_to_cart)}
            className="p-3 md:p-2.5 rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-md transition-colors"
            aria-label="Agregar al carrito"
          >
            <FiShoppingCart className="w-6 h-6 md:w-5 md:h-5" />
          </motion.button>
        </div>

        {/* ========== MOBILE: Contenido visible siempre (< 768px) ========== */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:hidden">
          {/* Título - DESTACADO */}
          <h3 className="font-mono text-2xl text-raios-text-high font-bold line-clamp-2">
            {title}
          </h3>

          <p className="font-sans text-lg text-raios-text-support mt-1">
            {artist_name}
          </p>

          {description && (
            <p className="font-sans text-base text-raios-text-support/80 mt-2 line-clamp-2">
              {description}
            </p>
          )}

          {/* Tags - Mobile */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block px-2.5 py-1 rounded text-xs font-mono uppercase tracking-wider bg-raios-tertiary/30 text-raios-tertiary backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Precio - DESTACADO (más grande en mobile) */}
          <p className="font-mono text-3xl text-raios-primary font-bold mt-3">
            ${price?.toLocaleString()}
          </p>
        </div>

        {/* ========== DESKTOP: Contenido en hover (≥ 768px) ========== */}
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 hidden md:block">
          {/* Título - DESTACADO */}
          <h3 className="font-mono text-xl text-raios-text-high font-bold line-clamp-2">
            {title}
          </h3>

          <p className="font-sans text-base text-raios-text-support mt-1">
            {artist_name}
          </p>

          {/* Descripción - Desktop */}
          {description && (
            <p className="font-sans text-sm text-raios-text-support/80 mt-2 line-clamp-2">
              {description}
            </p>
          )}

          {/* Tags - Desktop */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-raios-tertiary/30 text-raios-tertiary backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Precio - DESTACADO */}
          <p className="font-mono text-2xl text-raios-primary font-bold mt-2">
            ${price?.toLocaleString()}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export default ArtworkCard;
