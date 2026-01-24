import { motion } from 'framer-motion';
import { FiArrowRight, FiPlay } from 'react-icons/fi';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';

/**
 * Hero - Sección principal de la landing
 * Diseño dramático con gradiente sutil y tipografía de impacto
 */
export function Hero() {
  const container_variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const item_variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center overflow-hidden">
      {/* Background con gradiente sutil */}
      <div className="absolute inset-0 z-0">
        {/* Orbe de luz principal - responsivo */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[250px] md:w-[800px] md:h-[600px] rounded-full opacity-30"
          style={{
            background:
              'radial-gradient(ellipse, rgba(74, 31, 255, 0.4) 0%, rgba(142, 92, 255, 0.1) 50%, transparent 70%)',
          }}
        />
        {/* Orbe secundario - responsivo */}
        <div
          className="absolute bottom-0 right-0 w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full opacity-20"
          style={{
            background:
              'radial-gradient(circle, rgba(142, 92, 255, 0.5) 0%, transparent 60%)',
          }}
        />
      </div>

      <Container class_name="relative z-10 py-8">
        <motion.div
          variants={container_variants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Badge */}
          <motion.div variants={item_variants}>
            <span className="badge-primary mb-6 inline-flex">
              Marketplace de Arte Digital
            </span>
          </motion.div>

          {/* Título principal */}
          <motion.h1
            variants={item_variants}
            className="text-3xl md:text-[64px] md:leading-[1.1] font-bold mb-6 tracking-tight"
          >
            Descubre obras que
            <span className="block text-raios-primary">
              transforman espacios
            </span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            variants={item_variants}
            className="text-lg md:text-xl text-raios-text-support max-w-2xl mb-8 font-sans"
          >
            Conectamos artistas emergentes con coleccionistas apasionados.
            Encuentra piezas únicas que cuentan historias y aportan energía
            a cualquier ambiente.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item_variants}
            className="flex flex-wrap gap-4"
          >
            <Button
              variant="primary"
              size="lg"
              icon={<FiArrowRight />}
              icon_position="right"
            >
              Explorar Colección
            </Button>

            <Button
              variant="secondary"
              size="lg"
              icon={<FiPlay />}
              icon_position="left"
            >
              Cómo Funciona
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={item_variants}
            className="mt-12 pt-8 border-t border-raios-text-support/20"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-8 max-w-md">
              <div>
                <p className="text-2xl font-mono font-bold text-raios-text-high">
                  2.5K+
                </p>
                <p className="text-sm text-raios-text-support">
                  Obras disponibles
                </p>
              </div>
              <div>
                <p className="text-2xl font-mono font-bold text-raios-text-high">
                  850+
                </p>
                <p className="text-sm text-raios-text-support">
                  Artistas activos
                </p>
              </div>
              <div>
                <p className="text-2xl font-mono font-bold text-raios-text-high">
                  15K+
                </p>
                <p className="text-sm text-raios-text-support">
                  Coleccionistas
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

export default Hero;
