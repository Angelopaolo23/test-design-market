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
 * Jerarquía de shadow-glow:
 * - glow_high: Máxima atención (1 por vista máximo) - CTAs principales
 * - glow: Importancia media - Secciones secundarias
 * - glow_subtle: Acento suave - Elementos terciarios
 *
 * @param {Object} props
 * @param {'light' | 'dark' | 'surface' | 'content'} props.variant - Variante de glassmorphism
 * @param {'none' | 'subtle' | 'float' | 'glow' | 'glow_high' | 'glow_subtle'} props.shadow - Tipo de sombra
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
  // Variantes usando clases de Tailwind (definidas en tailwind.config.js)
  const variant_classes = {
    light: 'bg-white/10 backdrop-blur-md',
    dark: 'bg-black/30 backdrop-blur-md',
    // 75% opacidad + blur suave para navbar/footer/paneles
    surface: 'bg-glass-surface backdrop-blur-sm',
    // 60% opacidad + blur suave para secciones de contenido
    content: 'bg-glass-content backdrop-blur-sm',
  };

  const border_classes = {
    light: 'border border-white/20',
    dark: 'border border-white/10',
    surface: 'border border-raios-text-support/10',
    // Híbrido: borde general sutil + línea inferior violeta (accent line)
    content: 'border border-raios-text-support/15 border-b-raios-primary/40',
  };

  // Sombras usando clases de Tailwind (definidas en tailwind.config.js)
  const shadow_classes = {
    none: '',
    subtle: 'shadow-subtle',
    float: 'shadow-float',
    glow_high: 'shadow-glow-high',
    glow: 'shadow-glow',
    glow_subtle: 'shadow-glow-subtle',
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
