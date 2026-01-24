/**
 * RAIOS Animation System
 * Configuraciones y variantes estandarizadas para Framer Motion
 */

// Transiciones base
export const raios_transitions = {
  fast: { duration: 0.15, ease: [0, 0, 0.2, 1] },
  standard: { duration: 0.3, ease: [0, 0, 0.2, 1] },
  slow: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  spring: { type: 'spring', stiffness: 300, damping: 30 },
};

// Variantes de aparición (fade)
export const fade_variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: raios_transitions.standard },
  exit: { opacity: 0, transition: raios_transitions.fast },
};

// Variantes de slide (entrada desde abajo)
export const slide_up_variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: raios_transitions.standard },
  exit: { opacity: 0, y: -10, transition: raios_transitions.fast },
};

// Variantes de escala
export const scale_variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: raios_transitions.standard },
  exit: { opacity: 0, scale: 0.95, transition: raios_transitions.fast },
};

// Variantes para carrusel (item central vs laterales)
export const carousel_item_variants = {
  center: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0px)',
    zIndex: 10,
    transition: raios_transitions.slow,
  },
  left: {
    scale: 0.75,
    opacity: 0.5,
    filter: 'blur(4px)',
    zIndex: 5,
    transition: raios_transitions.slow,
  },
  right: {
    scale: 0.75,
    opacity: 0.5,
    filter: 'blur(4px)',
    zIndex: 5,
    transition: raios_transitions.slow,
  },
  hidden_left: {
    scale: 0.5,
    opacity: 0,
    filter: 'blur(8px)',
    zIndex: 0,
    x: '-100%',
    transition: raios_transitions.standard,
  },
  hidden_right: {
    scale: 0.5,
    opacity: 0,
    filter: 'blur(8px)',
    zIndex: 0,
    x: '100%',
    transition: raios_transitions.standard,
  },
};

// Variantes para contenedor con stagger
export const stagger_container_variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Variantes para items de stagger
export const stagger_item_variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: raios_transitions.standard,
  },
};
