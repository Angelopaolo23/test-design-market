import { useEffect, useRef } from 'react';

/**
 * MagneticField - Líneas de campo magnético onduladas
 * Intensidad: Baja - Elegante y sutil
 */
const MagneticField = ({
  line_count = 15,
  line_color = '#4A1FFF',
  line_width = 2,
  opacity = 0.3,
  animation_speed = 0.5,
  field_type = 'aurora',
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
      time_ref.current += animation_speed * 0.01;

      ctx.strokeStyle = line_color;
      ctx.lineWidth = line_width;
      ctx.globalAlpha = opacity;

      if (field_type === 'aurora') {
        // Líneas verticales onduladas tipo aurora
        const spacing = canvas.width / line_count;
        for (let i = 0; i < line_count; i++) {
          const x = i * spacing;
          ctx.beginPath();

          for (let y = 0; y < canvas.height; y += 5) {
            const offset = Math.sin(y * 0.01 + time_ref.current + i * 0.3) * 30;
            const current_x = x + offset;

            if (y === 0) {
              ctx.moveTo(current_x, y);
            } else {
              ctx.lineTo(current_x, y);
            }
          }

          ctx.stroke();
        }
      } else if (field_type === 'vertical') {
        // Líneas verticales suaves
        const spacing = canvas.width / line_count;
        for (let i = 0; i < line_count; i++) {
          const x = i * spacing;
          const offset = Math.sin(time_ref.current + i * 0.5) * 50;

          ctx.beginPath();
          ctx.moveTo(x + offset, 0);
          ctx.lineTo(x + offset, canvas.height);
          ctx.stroke();
        }
      } else if (field_type === 'horizontal') {
        // Líneas horizontales onduladas
        const spacing = canvas.height / line_count;
        for (let i = 0; i < line_count; i++) {
          const y = i * spacing;
          ctx.beginPath();

          for (let x = 0; x < canvas.width; x += 5) {
            const offset = Math.sin(x * 0.01 + time_ref.current + i * 0.3) * 30;
            const current_y = y + offset;

            if (x === 0) {
              ctx.moveTo(x, current_y);
            } else {
              ctx.lineTo(x, current_y);
            }
          }

          ctx.stroke();
        }
      } else if (field_type === 'radial') {
        // Líneas radiales desde el centro
        const center_x = canvas.width / 2;
        const center_y = canvas.height / 2;
        const max_radius = Math.max(canvas.width, canvas.height);

        for (let i = 0; i < line_count; i++) {
          const angle = (i / line_count) * Math.PI * 2;
          const angle_offset = Math.sin(time_ref.current + i * 0.2) * 0.3;

          ctx.beginPath();
          ctx.moveTo(center_x, center_y);

          for (let r = 0; r < max_radius; r += 20) {
            const current_angle = angle + angle_offset + Math.sin(r * 0.01 + time_ref.current) * 0.2;
            const x = center_x + Math.cos(current_angle) * r;
            const y = center_y + Math.sin(current_angle) * r;
            ctx.lineTo(x, y);
          }

          ctx.stroke();
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
  }, [line_count, line_color, line_width, opacity, animation_speed, field_type]);

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

export default MagneticField;
