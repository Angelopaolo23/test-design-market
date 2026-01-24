import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { CategoryCarousel } from '../components/sections/CategoryCarousel';
import { FeaturedWorks } from '../components/sections/FeaturedWorks';

// Datos mock para el carrusel de categorías
const carousel_categories = ['Fotografía', 'Óleo', 'Digital', 'Minimalista'];

const carousel_artworks = [
  // Fotografía
  {
    artwork_id: 'car-1',
    title: 'Reflejos Nocturnos',
    artist_name: 'Elena Vega',
    price: 2900,
    image_url: 'https://images.unsplash.com/photo-1482160549825-59d1b23cb208?w=600&h=800&fit=crop',
    category: 'Fotografía',
  },
  {
    artwork_id: 'car-2',
    title: 'Amanecer Urbano',
    artist_name: 'Carlos Mendez',
    price: 1850,
    image_url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&h=800&fit=crop',
    category: 'Fotografía',
  },
  {
    artwork_id: 'car-3',
    title: 'Sombras de la Ciudad',
    artist_name: 'Ana Torres',
    price: 2200,
    image_url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&h=800&fit=crop',
    category: 'Fotografía',
  },
  {
    artwork_id: 'car-4',
    title: 'Luz Natural',
    artist_name: 'Pablo Ruiz',
    price: 1600,
    image_url: 'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=600&h=800&fit=crop',
    category: 'Fotografía',
  },
  // Óleo
  {
    artwork_id: 'car-5',
    title: 'Fragmentos de Luz',
    artist_name: 'María Soledad',
    price: 3400,
    image_url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=800&fit=crop',
    category: 'Óleo',
  },
  {
    artwork_id: 'car-6',
    title: 'Danza de Sombras',
    artist_name: 'Miguel Ángel',
    price: 3500,
    image_url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=800&fit=crop',
    category: 'Óleo',
  },
  {
    artwork_id: 'car-7',
    title: 'Paisaje Interior',
    artist_name: 'Sofia Blanco',
    price: 2800,
    image_url: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&h=800&fit=crop',
    category: 'Óleo',
  },
  // Digital
  {
    artwork_id: 'car-8',
    title: 'Ecos Urbanos',
    artist_name: 'Carlos Mendez',
    price: 1850,
    image_url: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?w=600&h=800&fit=crop',
    category: 'Digital',
  },
  {
    artwork_id: 'car-9',
    title: 'Silencio Digital',
    artist_name: 'Pablo Ruiz',
    price: 1950,
    image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=800&fit=crop',
    category: 'Digital',
  },
  {
    artwork_id: 'car-10',
    title: 'Vibraciones',
    artist_name: 'Carmen Sol',
    price: 3100,
    image_url: 'https://images.unsplash.com/photo-1634017839464-5c339bbe3c35?w=600&h=800&fit=crop',
    category: 'Digital',
  },
  {
    artwork_id: 'car-11',
    title: 'Neon Dreams',
    artist_name: 'Laura Chen',
    price: 2400,
    image_url: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=600&h=800&fit=crop',
    category: 'Digital',
  },
  // Minimalista
  {
    artwork_id: 'car-12',
    title: 'Geometría Emocional',
    artist_name: 'Roberto Paz',
    price: 1500,
    image_url: 'https://images.unsplash.com/photo-1509909756405-be0199881695?w=600&h=800&fit=crop',
    category: 'Minimalista',
  },
  {
    artwork_id: 'car-13',
    title: 'Espacio Vacío',
    artist_name: 'Diego Mar',
    price: 1800,
    image_url: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=600&h=800&fit=crop',
    category: 'Minimalista',
  },
  {
    artwork_id: 'car-14',
    title: 'Líneas Puras',
    artist_name: 'Ana Torres',
    price: 2100,
    image_url: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600&h=800&fit=crop',
    category: 'Minimalista',
  },
];

/**
 * Landing - Página principal del marketplace
 */
export function Landing() {
  const handle_artwork_click = (artwork_id) => {
    console.log('Artwork clicked:', artwork_id);
  };

  const handle_category_change = (category) => {
    console.log('Category changed:', category);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar fijo con glassmorphism */}
      <Navbar />

      {/* Contenido principal con padding-top para el navbar fijo */}
      <main className="flex-1 pt-[72px]">
        {/* Hero Section */}
        <Hero />

        {/* Carrusel de Categorías */}
        <CategoryCarousel
          title="Explora por Categoría"
          categories={carousel_categories}
          artworks={carousel_artworks}
          on_artwork_click={handle_artwork_click}
          on_category_change={handle_category_change}
          autoplay_delay={5000}
        />

        {/* Obras Destacadas */}
        <FeaturedWorks />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Landing;
