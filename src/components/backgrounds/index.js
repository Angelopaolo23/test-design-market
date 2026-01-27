/**
 * Backgrounds dinámicos para RAIOS
 *
 * Selección final: 3 backgrounds de intensidad baja-media
 * que no compiten con el arte y funcionan bien con glassmorphism.
 *
 * Colores adaptados a paleta RAIOS:
 * - grid_color / line_color: #4A1FFF (raios-primary)
 * - dark_color: #0A0218 (raios-secondary)
 */

export { default as WaveGrid } from './WaveGrid';
export { default as MagneticField } from './MagneticField';
export { default as ParticleGrid } from './ParticleGrid';
export { default as BackgroundSwitcher } from './BackgroundSwitcher';

// Lista de backgrounds disponibles
export const AVAILABLE_BACKGROUNDS = [
  {
    id: 'wave_grid',
    name: 'Waves',
    description: 'Grid de ondas suaves',
    intensity: 'baja',
  },
  {
    id: 'magnetic_field',
    name: 'Aurora',
    description: 'Líneas de campo magnético',
    intensity: 'baja',
  },
  {
    id: 'particle_grid',
    name: 'P. Grid',
    description: 'Grid de partículas con movimiento',
    intensity: 'media',
  },
];
