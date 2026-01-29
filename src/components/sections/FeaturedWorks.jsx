import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { ArtworkCard } from '../ui/ArtworkCard';
import { Button } from '../ui/Button';

// Datos mock con diferentes aspect ratios para masonry
// Usando imágenes de Unsplash con dimensiones variadas
const mock_artworks = [
  {
    id: '1',
    title: 'Fragmentos de Luz',
    artist_name: 'María Soledad',
    price: 2400,
    image_url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=700&fit=crop',
    tags: ['Abstracto', 'Óleo'],
    description: 'Una exploración visual de la luz fragmentada a través de prismas geométricos.',
  },
  {
    id: '2',
    title: 'Ecos Urbanos',
    artist_name: 'Carlos Mendez',
    price: 1850,
    image_url: 'https://images.unsplash.com/photo-1767398903318-c34c7fef7d25?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['Digital', 'Urbano'],
    description: 'Paisajes metropolitanos reimaginados en tonos neón y texturas digitales.',
  },
  {
    id: '3',
    title: 'Naturaleza Oculta',
    artist_name: 'Ana Torres',
    price: 3200,
    image_url: 'https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=500&h=650&fit=crop',
    tags: ['Surrealismo', 'Naturaleza', 'Mixta'],
    description: 'Formas orgánicas que revelan mundos escondidos dentro de la flora silvestre.',
  },
  {
    id: '4',
    title: 'Geometría Emocional',
    artist_name: 'Roberto Paz',
    price: 1500,
    image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&h=500&fit=crop',
    tags: ['Minimalista', 'Geométrico'],
    description: 'La intersección entre las matemáticas y el sentimiento humano.',
  },
  {
    id: '5',
    title: 'Memoria del Color',
    artist_name: 'Laura Chen',
    price: 2750,
    image_url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&h=750&fit=crop',
    tags: ['Expresionismo', 'Acrílico'],
    description: 'Capas de pigmento que evocan recuerdos de infancia y nostalgia.',
  },
  {
    id: '6',
    title: 'Silencio Digital',
    artist_name: 'Pablo Ruiz',
    price: 1950,
    image_url: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=500&h=380&fit=crop',
    tags: ['Digital', 'Conceptual'],
    description: 'El vacío contemplativo del espacio digital contemporáneo.',
  },
  {
    id: '7',
    title: 'Horizonte Interior',
    artist_name: 'Sofia Blanco',
    price: 2100,
    image_url: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=500&h=600&fit=crop',
    tags: ['Abstracto', 'Paisaje'],
    description: 'Paisajes emocionales que existen solo en el mundo interior.',
  },
  {
    id: '8',
    title: 'Danza de Sombras',
    artist_name: 'Miguel Ángel',
    price: 3500,
    image_url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&h=450&fit=crop',
    tags: ['Clásico', 'Figurativo', 'Óleo'],
    description: 'Figuras en movimiento capturadas entre la luz y la oscuridad.',
  },
  {
    id: '9',
    title: 'Reflejos Nocturnos',
    artist_name: 'Elena Vega',
    price: 2900,
    image_url: 'https://images.unsplash.com/photo-1482160549825-59d1b23cb208?w=500&h=700&fit=crop',
    tags: ['Fotografía', 'Nocturno'],
    description: 'La ciudad dormida reflejada en charcos de lluvia nocturna.',
  },
  {
    id: '10',
    title: 'Caos Ordenado',
    artist_name: 'Andrés Luna',
    price: 1750,
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=550&fit=crop',
    tags: ['Abstracto', 'Experimental'],
    description: 'Patrones aleatorios que revelan estructura subyacente.',
  },
  {
    id: '11',
    title: 'Vibraciones',
    artist_name: 'Carmen Sol',
    price: 3100,
    image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=350&fit=crop',
    tags: ['Digital', 'Música', 'Sinestesia'],
    description: 'Visualización de ondas sonoras transformadas en color y forma.',
  },
  {
    id: '12',
    title: 'Esencia Pura',
    artist_name: 'Diego Mar',
    price: 2600,
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=650&fit=crop',
    tags: ['Retrato', 'Realismo'],
    description: 'La búsqueda de la verdad a través del rostro humano.',
  },
];

/**
 * FeaturedWorks - Sección de obras destacadas con layout Masonry
 *
 * Layout híbrido:
 * - Full-width hasta xl (inmersivo en Landing)
 * - max-w-[1600px] centrado en 2xl+ (evita imágenes gigantes en ultrawide)
 */
export function FeaturedWorks() {
  const handle_favorite = (artwork_id) => {
    console.log('Toggle favorite:', artwork_id);
  };

  const handle_add_to_cart = (artwork_id) => {
    console.log('Add to cart:', artwork_id);
  };

  const handle_click = (artwork_id) => {
    console.log('View artwork:', artwork_id);
  };

  return (
    <section className="py-8 md:py-12">
      {/* Contenedor con max-width para pantallas ultrawide */}
      <div className="max-w-[1600px] 2xl:mx-auto">
        {/* Header con padding normal */}
        <div className="px-4 md:px-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-mono text-2xl md:text-3xl text-raios-text-high"
              >
                Obras Destacadas
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-sans text-base text-raios-text-support mt-2 max-w-xl"
              >
                Descubre las piezas más populares de nuestra colección,
                seleccionadas por su impacto visual y originalidad.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Button
                variant="ghost"
                icon={<FiArrowRight />}
                icon_position="right"
              >
                Ver todas
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Masonry Grid - Full width con mínimo padding */}
        <div className="px-1 md:px-2">
          <div className="masonry-grid">
            {mock_artworks.map((artwork) => (
              <div
                key={artwork.id}
                className="masonry-item"
                style={{
                  breakInside: 'avoid',
                  marginBottom: '4px',
                }}
              >
                <ArtworkCard
                  artwork_id={artwork.id}
                  title={artwork.title}
                  artist_name={artwork.artist_name}
                  price={artwork.price}
                  image_url={artwork.image_url}
                  tags={artwork.tags}
                  description={artwork.description}
                  on_favorite={handle_favorite}
                  on_add_to_cart={handle_add_to_cart}
                  on_click={handle_click}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Estilos CSS para masonry responsive */}
      <style>{`
        .masonry-grid {
          column-count: 1;
          column-gap: 4px;
        }

        /* md: 768px - 2 columnas */
        @media (min-width: 768px) {
          .masonry-grid {
            column-count: 2;
          }
        }

        /* lg: 1024px - 3 columnas */
        @media (min-width: 1024px) {
          .masonry-grid {
            column-count: 3;
          }
        }

        /* xl: 1280px - 4 columnas */
        @media (min-width: 1280px) {
          .masonry-grid {
            column-count: 4;
          }
        }

        .masonry-item {
          break-inside: avoid;
          page-break-inside: avoid;
        }
      `}</style>
    </section>
  );
}

export default FeaturedWorks;
