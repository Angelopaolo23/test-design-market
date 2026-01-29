import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { raios_transitions } from '../../utils/animations';

/**
 * ImageGallery - Galería de imágenes de obra con thumbnails
 *
 * Mobile: Imagen principal + indicadores de puntos
 * Desktop: Imagen principal + thumbnails laterales/inferiores
 *
 * Jerarquía visual: La imagen usa accent line sutil (no glow) porque
 * el arte es visualmente dominante por naturaleza. El glow se reserva
 * para elementos UI que guían hacia acciones.
 *
 * @param {Object} props
 * @param {Array} props.images - Array de URLs de imágenes
 * @param {string} props.title - Título de la obra (para alt)
 * @param {boolean} props.show_accent - Mostrar accent line inferior (default: true)
 */
export function ImageGallery({
  images = [],
  title = 'Obra de arte',
  show_accent = true,
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

  // Clases para accent line - conecta visualmente con el sistema de diseño sin competir con el panel de acción
  const accent_classes = show_accent
    ? 'border-b-2 border-b-raios-primary/30'
    : '';

  return (
    <div className="relative">
      {/* Imagen principal - object-contain para mostrar imagen completa sin recorte */}
      {/* Altura limitada: 50vh mobile, 55vh tablet, 60vh desktop - evita desborde en imágenes verticales */}
      {/* bg-raios-secondary para coherencia cromática con el resto de la app */}
      {/* Accent line sutil: la imagen atrae atención naturalmente, el accent la integra al sistema visual */}
      <div className={`relative h-[50vh] md:h-[55vh] lg:h-[60vh] max-h-[600px] bg-raios-secondary rounded-lg overflow-hidden flex items-center justify-center ${accent_classes}`}>
        <AnimatePresence mode="wait">
          <motion.img
            key={current_index}
            src={images[current_index]}
            alt={`${title} - Imagen ${current_index + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={raios_transitions.standard}
            className="max-w-full max-h-full object-contain"
          />
        </AnimatePresence>

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
