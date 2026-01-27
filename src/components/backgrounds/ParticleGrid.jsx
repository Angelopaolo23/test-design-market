import { useEffect, useRef } from 'react';

/**
 * ParticleGrid - Grid de partículas con movimiento sutil
 * Intensidad: Media - Balance entre movimiento y sutileza
 */
const ParticleGrid = ({
  cell_size = 50,
  grid_color = '#4A1FFF',
  particle_count = 8,
  particle_size = 2,
  dark_color = '#0A0218',
}) => {
  const canvas_ref = useRef(null);
  const animation_ref = useRef();
  const particles_ref = useRef([]);

  useEffect(() => {
    const canvas = canvas_ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Inicializar partículas en el grid
      particles_ref.current = [];
      const rows = Math.ceil(canvas.height / cell_size);
      const cols = Math.ceil(canvas.width / cell_size);

      // Líneas horizontales
      for (let i = 0; i <= rows; i++) {
        const y = i * cell_size;
        for (let j = 0; j < particle_count; j++) {
          const x = (j / particle_count) * canvas.width;
          particles_ref.current.push({
            x: x + (Math.random() - 0.5) * 10,
            y: y + (Math.random() - 0.5) * 10,
            target_x: x,
            target_y: y,
            size: particle_size + Math.random() * particle_size,
          });
        }
      }

      // Líneas verticales
      for (let i = 0; i <= cols; i++) {
        const x = i * cell_size;
        for (let j = 0; j < particle_count; j++) {
          const y = (j / particle_count) * canvas.height;
          particles_ref.current.push({
            x: x + (Math.random() - 0.5) * 10,
            y: y + (Math.random() - 0.5) * 10,
            target_x: x,
            target_y: y,
            size: particle_size + Math.random() * particle_size,
          });
        }
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Actualizar y dibujar partículas
      particles_ref.current.forEach((particle) => {
        // Movimiento jitter
        particle.x += (Math.random() - 0.5) * 0.5;
        particle.y += (Math.random() - 0.5) * 0.5;

        // Volver hacia posición target
        particle.x += (particle.target_x - particle.x) * 0.05;
        particle.y += (particle.target_y - particle.y) * 0.05;

        // Dibujar partícula con glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 3
        );
        gradient.addColorStop(0, grid_color);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Núcleo
        ctx.fillStyle = grid_color;
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animation_ref.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animation_ref.current) {
        cancelAnimationFrame(animation_ref.current);
      }
    };
  }, [cell_size, grid_color, particle_count, particle_size]);

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

export default ParticleGrid;
