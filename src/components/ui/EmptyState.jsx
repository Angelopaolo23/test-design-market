import { motion } from 'framer-motion';
import {
  FiSearch,
  FiPackage,
  FiHeart,
  FiMessageCircle,
  FiAlertCircle,
  FiImage,
} from 'react-icons/fi';
import { Button } from './Button';
import { raios_transitions } from '../../utils/animations';

/**
 * EmptyState - Componente para estados vacíos
 *
 * Muestra un mensaje visual cuando no hay contenido disponible.
 * Incluye variantes predefinidas para casos comunes.
 *
 * @param {Object} props
 * @param {string} props.variant - Variante predefinida
 * @param {React.ReactNode} props.icon - Icono personalizado (solo si variant='custom')
 * @param {string} props.title - Título (override del default)
 * @param {string} props.description - Descripción adicional
 * @param {Object} props.action - Acción opcional { label, on_click }
 * @param {string} props.size - Tamaño: sm, md, lg
 * @param {string} props.className - Clases adicionales
 */
export function EmptyState({
  variant = 'no_items',
  icon: custom_icon,
  title: custom_title,
  description,
  action,
  size = 'md',
  className = '',
}) {
  // Configuraciones predefinidas por variante
  const variants = {
    no_results: {
      icon: FiSearch,
      title: 'Sin resultados',
      default_description: 'No encontramos lo que buscas. Intenta con otros términos.',
    },
    no_items: {
      icon: FiPackage,
      title: 'No hay elementos',
      default_description: 'Aún no hay nada aquí.',
    },
    no_favorites: {
      icon: FiHeart,
      title: 'Sin favoritos',
      default_description: 'Guarda tus obras favoritas para verlas después.',
    },
    no_comments: {
      icon: FiMessageCircle,
      title: 'Sin comentarios',
      default_description: 'Sé el primero en comentar.',
    },
    no_artworks: {
      icon: FiImage,
      title: 'Sin obras',
      default_description: 'Aún no hay obras publicadas.',
    },
    error: {
      icon: FiAlertCircle,
      title: 'Algo salió mal',
      default_description: 'Ocurrió un error. Por favor intenta de nuevo.',
    },
    custom: {
      icon: null,
      title: 'Sin contenido',
      default_description: '',
    },
  };

  const config = variants[variant] || variants.no_items;
  const Icon = custom_icon || config.icon;
  const title = custom_title || config.title;
  const final_description = description || config.default_description;

  // Tamaños
  const sizes = {
    sm: {
      icon: 28,
      title: 'text-base',
      description: 'text-sm',
      padding: 'py-8 px-4',
      gap: 'gap-3',
    },
    md: {
      icon: 36,
      title: 'text-lg',
      description: 'text-sm',
      padding: 'py-12 px-6',
      gap: 'gap-4',
    },
    lg: {
      icon: 48,
      title: 'text-xl',
      description: 'text-base',
      padding: 'py-16 px-8',
      gap: 'gap-5',
    },
  };

  const current_size = sizes[size];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={raios_transitions.standard}
      className={`
        flex flex-col items-center justify-center text-center
        ${current_size.padding}
        ${current_size.gap}
        ${className}
      `}
    >
      {/* Icono */}
      {Icon && (
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ ...raios_transitions.standard, delay: 0.1 }}
          className="text-raios-text-support/40"
        >
          <Icon size={current_size.icon} strokeWidth={1.5} />
        </motion.div>
      )}

      {/* Título */}
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...raios_transitions.standard, delay: 0.15 }}
        className={`font-mono text-raios-text-high ${current_size.title}`}
      >
        {title}
      </motion.h3>

      {/* Descripción */}
      {final_description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...raios_transitions.standard, delay: 0.2 }}
          className={`font-sans text-raios-text-support max-w-sm ${current_size.description}`}
        >
          {final_description}
        </motion.p>
      )}

      {/* Action button */}
      {action && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...raios_transitions.standard, delay: 0.25 }}
        >
          <Button
            variant="secondary"
            onClick={action.on_click}
          >
            {action.label}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}

export default EmptyState;
