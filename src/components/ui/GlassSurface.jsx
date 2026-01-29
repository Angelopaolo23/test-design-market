import { forwardRef } from 'react';
import { motion } from 'framer-motion';

/**
 * GlassSurface - Componente base para superficies con glassmorphism
 *
 * Variantes predefinidas según RAIOS Design System:
 * - light: bg-white/10, para overlays sutiles
 * - dark: bg-black/30, para botones sobre imágenes
 * - surface: bg-raios-secondary/80, para modales y paneles flotantes (default)
 * - content: bg más sólido con borde violeta sutil, para secciones de contenido
 *            que necesitan destacarse del background animado
 *
 * NOTA: Usar 'content' en vistas críticas (ArtworkDetail, Settings, etc.)
 * donde el contenido compite visualmente con el background.
 *
 * @param {Object} props
 * @param {'light' | 'dark' | 'surface' | 'content'} props.variant - Variante de glassmorphism
 * @param {'none' | 'subtle' | 'float' | 'glow'} props.shadow - Tipo de sombra
 * @param {boolean} props.has_border - Mostrar borde sutil
 * @param {string} props.class_name - Clases adicionales
 * @param {React.ReactNode} props.children - Contenido
 */
const GlassSurface = forwardRef(function GlassSurface(
  {
    variant = 'surface',
    shadow = 'float',
    has_border = true,
    class_name = '',
    children,
    as_motion = false,
    ...rest
  },
  ref
) {
  const variant_classes = {
    light: 'bg-white/10 backdrop-blur-md',
    dark: 'bg-black/30 backdrop-blur-md',
    surface: 'bg-raios-secondary/80 backdrop-blur-xl',
    // Variante 'content' para secciones de contenido principal
    // 60% opacidad + blur suave
    content: 'bg-[rgba(10,2,24,0.60)] backdrop-blur-sm',
  };

  const border_classes = {
    light: 'border border-white/20',
    dark: 'border border-white/10',
    surface: 'border border-raios-text-support/10',
    // Híbrido: borde general sutil + línea inferior violeta (accent line)
    content: 'border border-raios-text-support/15 border-b-raios-primary/40',
  };

  const shadow_classes = {
    none: '',
    subtle: 'shadow-[0_4px_16px_rgba(0,0,0,0.2)]',
    float: 'shadow-[0_8px_32px_rgba(0,0,0,0.4)]',
    glow: 'shadow-[0_0_20px_rgba(74,31,255,0.3)]',
  };

  const classes = `
    ${variant_classes[variant]}
    ${has_border ? border_classes[variant] : ''}
    ${shadow_classes[shadow]}
    ${class_name}
  `.trim();

  if (as_motion) {
    return (
      <motion.div ref={ref} className={classes} {...rest}>
        {children}
      </motion.div>
    );
  }

  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  );
});

export default GlassSurface;
export { GlassSurface };
