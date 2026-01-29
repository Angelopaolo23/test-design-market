import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { GlassSurface } from '../ui/GlassSurface';
import { useApp } from '../../context';

/**
 * AppearanceSection - Sección de apariencia en Settings
 *
 * Selector de fondo animado conectado al estado global (AppContext)
 *
 * Jerarquía: glow_subtle - Preferencias terciarias, personalización visual
 */
export function AppearanceSection({ on_change }) {
  const { active_background, set_active_background } = useApp();

  // Backgrounds disponibles (deben coincidir con AVAILABLE_BACKGROUNDS)
  const backgrounds = [
    {
      id: 'wave_grid',
      name: 'Waves',
      description: 'Grid de ondas suaves',
      preview: 'linear-gradient(135deg, #4A1FFF 0%, #0A0218 100%)',
    },
    {
      id: 'magnetic_field',
      name: 'Aurora',
      description: 'Líneas de campo magnético',
      preview: 'linear-gradient(135deg, #8E5CFF 0%, #0A0218 100%)',
    },
    {
      id: 'particle_grid',
      name: 'P. Grid',
      description: 'Grid de partículas con movimiento',
      preview: 'radial-gradient(circle at 30% 30%, #4A1FFF 0%, #0A0218 70%)',
    },
  ];

  const handle_select = (bg_id) => {
    set_active_background(bg_id);
    on_change?.(bg_id);
  };

  return (
    <GlassSurface
      variant="content"
      shadow="glow_subtle"
      class_name="p-5 md:p-6 rounded-xl"
    >
      {/* Header */}
      <h2 className="font-mono text-lg text-raios-text-high mb-2">
        Apariencia
      </h2>
      <p className="text-sm text-raios-text-support mb-6">
        Personaliza el fondo animado de la aplicación
      </p>

      {/* Background options */}
      <div className="grid grid-cols-3 gap-3">
        {backgrounds.map((bg) => (
          <motion.button
            key={bg.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handle_select(bg.id)}
            className={`
              relative aspect-video rounded-lg overflow-hidden
              border-2 transition-colors
              ${active_background === bg.id
                ? 'border-raios-primary'
                : 'border-transparent hover:border-raios-text-support/30'
              }
            `}
            title={bg.description}
          >
            {/* Preview */}
            <div
              className="absolute inset-0"
              style={{ background: bg.preview }}
            />

            {/* Check mark */}
            {active_background === bg.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 w-5 h-5 rounded-full bg-raios-primary flex items-center justify-center"
              >
                <FiCheck size={12} className="text-white" />
              </motion.div>
            )}

            {/* Label */}
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
              <span className="font-mono text-xs text-white">{bg.name}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </GlassSurface>
  );
}

export default AppearanceSection;
