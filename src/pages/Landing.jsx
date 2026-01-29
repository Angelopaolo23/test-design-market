import { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { CategoryCarousel } from '../components/sections/CategoryCarousel';
import { FeaturedWorks } from '../components/sections/FeaturedWorks';
import { BackgroundSwitcher } from '../components/backgrounds';
import {
  GlassModal,
  GlassPanel,
  GlassSheet,
  GlassSurface,
  MenuPanel,
  CartPanel,
  SearchOverlay,
} from '../components/ui';

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
  // Estado para demo de glassmorphism (temporal para desarrollo)
  const [show_modal, set_show_modal] = useState(false);
  const [show_panel, set_show_panel] = useState(false);
  const [show_sheet, set_show_sheet] = useState(false);
  const [show_menu, set_show_menu] = useState(false);
  const [show_cart, set_show_cart] = useState(false);
  const [show_search, set_show_search] = useState(false);

  // Mock data para demos
  const mock_user = {
    name: 'Elena Vega',
    username: 'elenavega',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    is_verified: true,
    is_artist: true,
  };

  const mock_stats = {
    obras: 12,
    ventas: '$45K',
    likes: 89,
  };

  const [cart_items, set_cart_items] = useState([
    {
      id: 'cart-1',
      title: 'Reflejos Nocturnos',
      artist_name: 'Elena Vega',
      price: 2900,
      quantity: 1,
      image_url: 'https://images.unsplash.com/photo-1482160549825-59d1b23cb208?w=200&h=200&fit=crop',
    },
    {
      id: 'cart-2',
      title: 'Fragmentos de Luz',
      artist_name: 'María Soledad',
      price: 3400,
      quantity: 1,
      image_url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=200&h=200&fit=crop',
    },
  ]);

  const [search_results, set_search_results] = useState(null);
  const [search_loading, set_search_loading] = useState(false);

  // Handlers para cart
  const handle_update_quantity = (item_id, new_quantity) => {
    set_cart_items(items =>
      items.map(item =>
        item.id === item_id ? { ...item, quantity: new_quantity } : item
      )
    );
  };

  const handle_remove_item = (item_id) => {
    set_cart_items(items => items.filter(item => item.id !== item_id));
  };

  // Handler para búsqueda (mock)
  const handle_search = (query) => {
    set_search_loading(true);
    // Simular delay de API
    setTimeout(() => {
      set_search_results([
        { id: 'r1', type: 'artwork', title: 'Reflejos Nocturnos', artist_name: 'Elena Vega', category: 'Fotografía', price: '$2,900', image_url: 'https://images.unsplash.com/photo-1482160549825-59d1b23cb208?w=100&h=100&fit=crop' },
        { id: 'r2', type: 'artwork', title: 'Reflections', artist_name: 'Carlos M.', category: 'Digital', price: '$1,500', image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop' },
        { id: 'r3', type: 'artist', name: 'Reflective Studio', works_count: 24 },
        { id: 'r4', type: 'category', name: 'Reflexiones' },
      ]);
      set_search_loading(false);
    }, 500);
  };

  const handle_artwork_click = (artwork_id) => {
    console.log('Artwork clicked:', artwork_id);
  };

  const handle_category_change = (category) => {
    console.log('Category changed:', category);
  };

  const handle_add_to_cart = (artwork_id) => {
    console.log('Add to cart:', artwork_id);
  };

  const handle_favorite = (artwork_id) => {
    console.log('Toggle favorite:', artwork_id);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background dinámico (Capa 0) */}
      <BackgroundSwitcher default_background="wave_grid" />

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
          on_add_to_cart={handle_add_to_cart}
          on_favorite={handle_favorite}
          autoplay_delay={8000}
        />

        {/* Obras Destacadas */}
        <FeaturedWorks />
      </main>

      {/* Footer */}
      <Footer />

      {/* === DEMO GLASSMORPHISM (eliminar en producción) === */}
      {/* Botones de prueba - fijos en esquina */}
      <div className="fixed top-20 right-4 z-30 flex flex-col gap-2">
        <GlassSurface
          variant="surface"
          shadow="subtle"
          className="p-3 rounded-lg"
        >
          <p className="text-xs text-raios-text-support mb-2 font-mono">Test UI</p>
          <div className="flex flex-col gap-1">
            <button
              onClick={() => set_show_search(true)}
              className="px-3 py-1.5 text-xs bg-raios-tertiary text-white rounded hover:bg-raios-tertiary/80"
            >
              🔍 Search
            </button>
            <button
              onClick={() => set_show_menu(true)}
              className="px-3 py-1.5 text-xs bg-raios-primary text-white rounded hover:bg-raios-primary/80"
            >
              👤 Menu
            </button>
            <button
              onClick={() => set_show_cart(true)}
              className="px-3 py-1.5 text-xs bg-raios-primary text-white rounded hover:bg-raios-primary/80"
            >
              🛒 Cart ({cart_items.length})
            </button>
            <hr className="border-raios-text-support/20 my-1" />
            <button
              onClick={() => set_show_modal(true)}
              className="px-3 py-1 text-xs bg-white/10 text-raios-text-support rounded hover:bg-white/20"
            >
              Modal
            </button>
            <button
              onClick={() => set_show_panel(true)}
              className="px-3 py-1 text-xs bg-white/10 text-raios-text-support rounded hover:bg-white/20"
            >
              Panel
            </button>
            <button
              onClick={() => set_show_sheet(true)}
              className="px-3 py-1 text-xs bg-white/10 text-raios-text-support rounded hover:bg-white/20"
            >
              Sheet
            </button>
          </div>
        </GlassSurface>
      </div>

      {/* SearchOverlay */}
      <SearchOverlay
        is_open={show_search}
        on_close={() => set_show_search(false)}
        on_search={handle_search}
        on_select_result={(result) => console.log('Selected:', result)}
        results={search_results}
        is_loading={search_loading}
        recent_searches={['óleo abstracto', 'fotografía urbana', 'Elena Vega']}
      />

      {/* MenuPanel */}
      <MenuPanel
        is_open={show_menu}
        on_close={() => set_show_menu(false)}
        user={mock_user}
        stats={mock_stats}
        on_navigate={(path) => console.log('Navigate to:', path)}
        on_logout={() => console.log('Logout')}
      />

      {/* CartPanel */}
      <CartPanel
        is_open={show_cart}
        on_close={() => set_show_cart(false)}
        items={cart_items}
        on_update_quantity={handle_update_quantity}
        on_remove_item={handle_remove_item}
        on_checkout={() => console.log('Go to checkout')}
        on_continue_shopping={() => console.log('Continue shopping')}
      />

      {/* Modal de prueba */}
      <GlassModal
        is_open={show_modal}
        on_close={() => set_show_modal(false)}
        title="GlassModal Demo"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-raios-text-support">
            Modal para confirmaciones y acciones rápidas.
          </p>
          <GlassSurface variant="light" class_name="p-4 rounded-lg">
            <p className="text-sm text-raios-text-high">Contenido del modal</p>
          </GlassSurface>
        </div>
      </GlassModal>

      {/* Panel lateral de prueba */}
      <GlassPanel
        is_open={show_panel}
        on_close={() => set_show_panel(false)}
        title="GlassPanel Demo"
        size="md"
        position="right"
      >
        <div className="space-y-4">
          <p className="text-raios-text-support">
            Panel genérico para contenido lateral.
          </p>
        </div>
      </GlassPanel>

      {/* Sheet de prueba */}
      <GlassSheet
        is_open={show_sheet}
        on_close={() => set_show_sheet(false)}
        title="GlassSheet Demo"
        height="md"
      >
        <div className="space-y-4">
          <p className="text-raios-text-support">
            Bottom sheet para acciones en mobile.
          </p>
          <div className="grid grid-cols-2 gap-2">
            {['Acción 1', 'Acción 2', 'Acción 3', 'Acción 4'].map((action) => (
              <button
                key={action}
                className="p-3 bg-raios-primary/20 rounded-lg text-raios-text-high text-sm hover:bg-raios-primary/30"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </GlassSheet>
      {/* === FIN DEMO === */}
    </div>
  );
}

export default Landing;
