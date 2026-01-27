import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { raios_transitions } from '../../utils/animations';

/**
 * RelatedWorks - Sección de obras relacionadas
 *
 * Muestra obras del mismo artista o categoría similar.
 *
 * @param {Object} props
 * @param {Array} props.works - Lista de obras relacionadas
 * @param {string} props.title - Título de la sección
 * @param {string} props.see_more_link - Link para ver más
 * @param {Function} props.on_artwork_click - Callback al hacer click (alternativo a navigate)
 */
export function RelatedWorks({
  works = [],
  title = 'Obras relacionadas',
  see_more_link,
  on_artwork_click,
}) {
  const navigate = useNavigate();

  // Formato de precio
  const format_price = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handle_click = (artwork) => {
    if (on_artwork_click) {
      on_artwork_click(artwork);
    } else {
      navigate(`/artwork/${artwork.id}`);
    }
  };

  if (works.length === 0) return null;

  return (
    <section className="py-8 md:py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-mono text-xl md:text-2xl text-raios-text-high">
          {title}
        </h2>

        {see_more_link && (
          <motion.a
            href={see_more_link}
            whileHover={{ x: 4 }}
            className="flex items-center gap-2 text-raios-primary hover:text-raios-tertiary transition-colors text-sm"
          >
            Ver más
            <FiArrowRight size={16} />
          </motion.a>
        )}
      </div>

      {/* Grid de obras */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {works.slice(0, 4).map((artwork, index) => (
          <motion.article
            key={artwork.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...raios_transitions.standard, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            onClick={() => handle_click(artwork)}
            className="group cursor-pointer"
          >
            {/* Imagen */}
            <div className="relative aspect-[3/4] mb-3 overflow-hidden bg-raios-secondary">
              <img
                src={artwork.image_url || '/placeholder-artwork.jpg'}
                alt={artwork.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlay en hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-raios-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Info */}
            <div>
              <h3 className="font-mono text-sm md:text-base text-raios-text-high truncate group-hover:text-raios-primary transition-colors">
                {artwork.title}
              </h3>
              <p className="text-xs text-raios-text-support truncate mt-1">
                {artwork.artist_name}
              </p>
              <p className="font-mono text-sm text-raios-primary mt-2">
                {format_price(artwork.price)}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default RelatedWorks;
