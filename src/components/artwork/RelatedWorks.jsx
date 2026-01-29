import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { MasonryGrid, GlassSurface } from '../ui';
import { raios_transitions } from '../../utils/animations';

/**
 * RelatedWorks - Sección de obras relacionadas con layout Masonry
 *
 * Muestra obras del mismo artista o categoría similar.
 * Usa el mismo patrón visual que FeaturedWorks para coherencia.
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
    <GlassSurface
      variant="content"
      shadow="subtle"
      class_name="p-5 md:p-6 rounded-xl"
    >
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

      {/* Masonry Grid de obras - coherente con FeaturedWorks */}
      <MasonryGrid
        columns_mobile={2}
        columns_md={3}
        columns_lg={4}
        columns_xl={4}
        gap="12px"
      >
        {works.slice(0, 8).map((artwork, index) => (
          <motion.article
            key={artwork.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...raios_transitions.standard, delay: index * 0.05 }}
            whileHover={{ y: -4 }}
            onClick={() => handle_click(artwork)}
            className="group cursor-pointer"
          >
            {/* Imagen - sin aspect ratio fijo para masonry natural */}
            <div className="relative overflow-hidden bg-raios-secondary rounded-none">
              <img
                src={artwork.image_url || '/placeholder-artwork.jpg'}
                alt={artwork.title}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Overlay en hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-raios-secondary/90 via-raios-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Info overlay en hover */}
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="font-mono text-sm text-raios-primary font-bold">
                  {format_price(artwork.price)}
                </p>
              </div>
            </div>

            {/* Info debajo de imagen */}
            <div className="pt-2 pb-3">
              <h3 className="font-mono text-sm text-raios-text-high truncate group-hover:text-raios-primary transition-colors">
                {artwork.title}
              </h3>
              <p className="text-xs text-raios-text-support truncate mt-0.5">
                {artwork.artist_name}
              </p>
            </div>
          </motion.article>
        ))}
      </MasonryGrid>
    </GlassSurface>
  );
}

export default RelatedWorks;
