import { useState } from 'react';
import WaveGrid from './WaveGrid';
import MagneticField from './MagneticField';
import ParticleGrid from './ParticleGrid';
import { AVAILABLE_BACKGROUNDS } from './index';

/**
 * BackgroundSwitcher - Componente para cambiar entre backgrounds durante desarrollo
 *
 * Props:
 * - default_background: ID del background por defecto ('wave_grid')
 * - show_controls: Mostrar controles de selección (default: true)
 * - on_change: Callback cuando cambia el background
 */
const BackgroundSwitcher = ({
  default_background = 'wave_grid',
  show_controls = true,
  on_change,
}) => {
  const [active_background, set_active_background] = useState(default_background);

  const handle_change = (bg_id) => {
    set_active_background(bg_id);
    on_change?.(bg_id);
  };

  const render_background = () => {
    switch (active_background) {
      case 'wave_grid':
        return <WaveGrid />;
      case 'magnetic_field':
        return <MagneticField />;
      case 'particle_grid':
        return <ParticleGrid />;
      default:
        return <WaveGrid />;
    }
  };

  return (
    <>
      {/* Background activo */}
      {render_background()}

      {/* Controles de selección (para desarrollo) */}
      {show_controls && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 100,
            display: 'flex',
            gap: '8px',
            padding: '12px 16px',
            backgroundColor: 'rgba(10, 2, 24, 0.9)',
            backdropFilter: 'blur(12px)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {AVAILABLE_BACKGROUNDS.map((bg) => (
            <button
              key={bg.id}
              onClick={() => handle_change(bg.id)}
              style={{
                padding: '8px 16px',
                backgroundColor:
                  active_background === bg.id ? '#4A1FFF' : 'transparent',
                color: '#FFFFFF',
                border:
                  active_background === bg.id
                    ? 'none'
                    : '1px solid rgba(74, 31, 255, 0.5)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'Space Mono, monospace',
                fontSize: '12px',
                transition: 'all 0.2s ease',
              }}
              title={`${bg.description} (Intensidad: ${bg.intensity})`}
            >
              {bg.name}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default BackgroundSwitcher;
