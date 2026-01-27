import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiZoomIn } from 'react-icons/fi';
import { raios_transitions } from '../../utils/animations';

/**
 * ImageGallery - Galería de imágenes de obra con thumbnails
 *
 * Mobile: Imagen principal + indicadores de puntos
 * Desktop: Imagen principal + thumbnails laterales/inferiores
 *
 * @param {Object} props
 * @param {Array} props.images - Array de URLs de imágenes
 * @param {string} props.title - Título de la obra (para alt)
 * @param {Function} props.on_zoom - Callback para abrir zoom/lightbox
 */
export function ImageGallery({
  images = [],
  title = 'Obra de arte',
  on_zoom,
}) {
  const [current_index, set_current_index] = useState(0);

  // Si no hay imágenes, mostrar placeholder
  if (images.length === 0) {
    images = ['/placeholder-artwork.jpg'];
  }

  const go_to_prev = () => {
    set_current_index((prev) => (prev - 1 + images.length) % images.length);
  };

  const go_to_next = () => {
    set_current_index((prev) => (prev + 1) % images.length);
  };

  const go_to_index = (index) => {
    set_current_index(index);
  };

  return (
    <div className="relative">
      {/* Imagen principal */}
      <div className="relative aspect-[4/5] max-h-[60vh] md:max-h-[65vh] lg:max-h-[70vh] bg-raios-secondary rounded-none overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={current_index}
            src={images[current_index]}
            alt={`${title} - Imagen ${current_index + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={raios_transitions.standard}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Botón de zoom */}
        {on_zoom && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => on_zoom(current_index)}
            className="absolute top-4 right-4 p-3 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors"
            aria-label="Ampliar imagen"
          >
            <FiZoomIn size={20} />
          </motion.button>
        )}

        {/* Flechas de navegación - solo si hay más de una imagen */}
        {images.length > 1 && (
          <>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={go_to_prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors"
              aria-label="Imagen anterior"
            >
              <FiChevronLeft size={24} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={go_to_next}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors"
              aria-label="Siguiente imagen"
            >
              <FiChevronRight size={24} />
            </motion.button>
          </>
        )}

        {/* Indicadores de puntos - Mobile */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 lg:hidden">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => go_to_index(index)}
                className={`
                  w-2 h-2 rounded-full transition-all duration-300
                  ${index === current_index
                    ? 'bg-white w-6'
                    : 'bg-white/50 hover:bg-white/70'
                  }
                `}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails - Desktop */}
      {images.length > 1 && (
        <div className="hidden lg:flex gap-3 mt-4">
          {images.map((image, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => go_to_index(index)}
              className={`
                relative w-20 h-20 rounded-lg overflow-hidden
                ${index === current_index
                  ? 'ring-2 ring-raios-primary ring-offset-2 ring-offset-raios-secondary'
                  : 'opacity-60 hover:opacity-100'
                }
                transition-all duration-200
              `}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
