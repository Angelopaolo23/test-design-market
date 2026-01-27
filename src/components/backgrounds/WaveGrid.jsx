import { useEffect, useRef } from 'react';

/**
 * WaveGrid - Grid de ondas suaves
 * Intensidad: Baja - Muy sutil y elegante
 */
const WaveGrid = ({
  cell_size = 40,
  grid_color = '#4A1FFF',
  wave_amplitude = 30,
  wave_speed = 0.5,
  wave_count = 2,
  dark_color = '#0A0218',
}) => {
  const canvas_ref = useRef(null);
  const animation_ref = useRef();
  const time_ref = useRef(0);

  useEffect(() => {
    const canvas = canvas_ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time_ref.current += wave_speed * 0.01;

      const rows = Math.ceil(canvas.height / cell_size) + 5;
      const cols = Math.ceil(canvas.width / cell_size) + 5;

      ctx.strokeStyle = grid_color;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.4;

      // Dibujar grid ondulado - líneas verticales
      for (let col = -2; col < cols; col++) {
        ctx.beginPath();
        for (let row = -2; row < rows; row++) {
          const base_x = col * cell_size;
          const base_y = row * cell_size;

          // Aplicar múltiples ondas
          let offset_x = 0;
          for (let w = 0; w < wave_count; w++) {
            offset_x +=
              Math.sin(row * 0.1 + time_ref.current + w * 2) *
              (wave_amplitude / wave_count);
          }

          const x = base_x + offset_x;
          const y = base_y;

          if (row === -2) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Dibujar grid ondulado - líneas horizontales
      for (let row = -2; row < rows; row++) {
        ctx.beginPath();
        for (let col = -2; col < cols; col++) {
          const base_x = col * cell_size;
          const base_y = row * cell_size;

          // Aplicar múltiples ondas
          let offset_y = 0;
          for (let w = 0; w < wave_count; w++) {
            offset_y +=
              Math.sin(col * 0.1 + time_ref.current + w * 2 + 1) *
              (wave_amplitude / wave_count);
          }

          const x = base_x;
          const y = base_y + offset_y;

          if (col === -2) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Puntos en intersecciones más brillantes
      ctx.fillStyle = grid_color;
      ctx.globalAlpha = 0.6;
      for (let row = 0; row < rows; row += 2) {
        for (let col = 0; col < cols; col += 2) {
          const base_x = col * cell_size;
          const base_y = row * cell_size;

          let offset_x = 0;
          let offset_y = 0;
          for (let w = 0; w < wave_count; w++) {
            offset_x +=
              Math.sin(row * 0.1 + time_ref.current + w * 2) *
              (wave_amplitude / wave_count);
            offset_y +=
              Math.sin(col * 0.1 + time_ref.current + w * 2 + 1) *
              (wave_amplitude / wave_count);
          }

          const x = base_x + offset_x;
          const y = base_y + offset_y;

          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animation_ref.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animation_ref.current) {
        cancelAnimationFrame(animation_ref.current);
      }
    };
  }, [cell_size, grid_color, wave_amplitude, wave_speed, wave_count]);

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: dark_color,
          zIndex: -1,
        }}
      />
      <canvas
        ref={canvas_ref}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />
    </>
  );
};

export default WaveGrid;
