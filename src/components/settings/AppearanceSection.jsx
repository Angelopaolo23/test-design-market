import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { GlassSurface } from '../ui/GlassSurface';

/**
 * AppearanceSection - Sección de apariencia en Settings
 *
 * Selector de fondo animado
 */
export function AppearanceSection({ on_change }) {
  const [selected_background, set_selected_background] = useState('wave_grid');

  const backgrounds = [
    {
      id: 'wave_grid',
      name: 'Wave Grid',
      preview: 'linear-gradient(135deg, #4A1FFF 0%, #0A0218 100%)',
    },
    {
      id: 'waves',
      name: 'Waves',
      preview: 'linear-gradient(135deg, #8E5CFF 0%, #0A0218 100%)',
    },
    {
      id: 'orbs',
      name: 'Orbs',
      preview: 'radial-gradient(circle at 30% 30%, #4A1FFF 0%, #0A0218 70%)',
    },
    {
      id: 'minimal',
      name: 'Minimal',
      preview: 'linear-gradient(180deg, #0A0218 0%, #1a0a30 100%)',
    },
  ];

  const handle_select = (bg_id) => {
    set_selected_background(bg_id);
    on_change?.(bg_id);
  };

  return (
    <GlassSurface
      variant="content"
      shadow="subtle"
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {backgrounds.map((bg) => (
          <motion.button
            key={bg.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handle_select(bg.id)}
            className={`
              relative aspect-video rounded-lg overflow-hidden
              border-2 transition-colors
              ${selected_background === bg.id
                ? 'border-raios-primary'
                : 'border-transparent hover:border-raios-text-support/30'
              }
            `}
          >
            {/* Preview */}
            <div
              className="absolute inset-0"
              style={{ background: bg.preview }}
            />

            {/* Check mark */}
            {selected_background === bg.id && (
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
