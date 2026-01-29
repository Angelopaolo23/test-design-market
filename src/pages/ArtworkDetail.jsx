import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { BackgroundSwitcher } from '../components/backgrounds';
import { ImageGallery, ArtworkInfo, CommentsSection, RelatedWorks } from '../components/artwork';
import { GlassSurface } from '../components/ui/GlassSurface';
import { CartPanel } from '../components/ui/CartPanel';
import { MenuPanel } from '../components/ui/MenuPanel';
import { slide_up_variants, raios_transitions } from '../utils/animations';

/**
 * ArtworkDetail - Página de detalle de obra
 *
 * Layout responsive:
 * - Mobile: Stack vertical (imagen → info → comentarios → relacionados)
 * - Desktop: Dos columnas (imagen izq | info der) + secciones abajo
 */
export function ArtworkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estados de UI
  const [is_cart_open, set_is_cart_open] = useState(false);
  const [is_menu_open, set_is_menu_open] = useState(false);
  const [is_favorite, set_is_favorite] = useState(false);
  const [cart_items, set_cart_items] = useState([]);

  // ============ DATOS DEMO ============
  // En producción, estos vendrían de una API usando el `id`
  const artwork = {
    id: id || '1',
    title: 'Reflejos Nocturnos',
    artist_name: 'Elena Vega',
    artist_username: 'elenavega',
    price: 2900,
    description: 'Una exploración visual de la ciudad cuando el sol se oculta. Los reflejos de las luces neón sobre el asfalto mojado crean un paisaje onírico donde lo real y lo imaginario se fusionan. Esta pieza captura ese momento fugaz entre el día y la noche.',
    materials: 'Impresión giclée sobre papel algodón 310g',
    dimensions: '60 x 80 cm',
    inspiration: 'Las noches de lluvia en la Ciudad de México, donde cada charco se convierte en un portal a otra dimensión.',
    year: 2024,
    edition: '1/25',
    available: true,
    images: [
      'https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80',
      'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&q=80',
      'https://images.unsplash.com/photo-1482160549825-59d1b23cb208?w=800&q=80',
    ],
  };

  const comments = [
    {
      id: '1',
      user_name: 'Carlos Mendez',
      user_avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      content: 'Increíble trabajo con los reflejos. Se siente como estar ahí en esa noche lluviosa.',
      created_at: '2024-01-20T10:00:00Z',
      likes_count: 12,
      is_liked: false,
    },
    {
      id: '2',
      user_name: 'María López',
      user_avatar: null,
      content: 'Me encanta cómo capturas la esencia de la ciudad nocturna. ¡Definitivamente quiero una para mi sala!',
      created_at: '2024-01-18T15:30:00Z',
      likes_count: 8,
      is_liked: true,
    },
    {
      id: '3',
      user_name: 'Diego Rivera',
      user_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      content: 'El uso del color es magistral. Los tonos neón contrastan perfectamente con los oscuros.',
      created_at: '2024-01-15T09:15:00Z',
      likes_count: 5,
      is_liked: false,
    },
  ];

  const related_works = [
    {
      id: '2',
      title: 'Amanecer Digital',
      artist_name: 'Elena Vega',
      price: 3200,
      image_url: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&q=80',
    },
    {
      id: '3',
      title: 'Fragmentos Urbanos',
      artist_name: 'Elena Vega',
      price: 2500,
      image_url: 'https://images.unsplash.com/photo-1482160549825-59d1b23cb208?w=600&q=80',
    },
    {
      id: '4',
      title: 'Ecos de Neón',
      artist_name: 'Carlos Mendez',
      price: 1800,
      image_url: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&q=80',
    },
    {
      id: '5',
      title: 'Sinfonía Nocturna',
      artist_name: 'María Torres',
      price: 4100,
      image_url: 'https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=600&q=80',
    },
  ];

  // Usuario demo para MenuPanel
  const demo_user = {
    name: 'Elena Vega',
    username: 'elenavega',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    is_verified: true,
    is_artist: true,
  };

  const demo_stats = {
    obras: 12,
    ventas: '$45K',
    likes: 89,
  };
  // ============ FIN DATOS DEMO ============

  // Handlers
  const handle_add_to_cart = (artwork_data, quantity) => {
    const new_item = {
      id: artwork_data.id,
      title: artwork_data.title,
      artist_name: artwork_data.artist_name,
      price: artwork_data.price,
      image_url: artwork_data.images?.[0],
      quantity,
    };

    set_cart_items((prev) => {
      const existing = prev.find((item) => item.id === new_item.id);
      if (existing) {
        return prev.map((item) =>
          item.id === new_item.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, new_item];
    });

    // Abrir carrito después de agregar
    set_is_cart_open(true);
  };

  const handle_favorite = () => {
    set_is_favorite((prev) => !prev);
  };

  const handle_share = async () => {
    if (navigator.share) {
      await navigator.share({
        title: artwork.title,
        text: `Mira esta obra de ${artwork.artist_name}`,
        url: window.location.href,
      });
    } else {
      // Fallback: copiar URL
      navigator.clipboard.writeText(window.location.href);
      alert('URL copiada al portapapeles');
    }
  };

  const handle_comment_submit = (content) => {
    console.log('Nuevo comentario:', content);
    // En producción: enviar a API
  };

  const handle_comment_like = (comment_id) => {
    console.log('Like a comentario:', comment_id);
    // En producción: enviar a API
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="min-h-screen bg-raios-secondary overflow-x-hidden">
      {/* Background dinámico - Capa 0 */}
      <div className="fixed inset-0 z-0">
        <BackgroundSwitcher show_controls={false} default_background="waves" />
      </div>

      {/* Navbar - Capa 2 */}
      <div className="relative z-30">
        <Navbar />
      </div>

      {/* Contenido principal - Capa 1 */}
      <main className="relative z-10 pt-20 md:pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Hero: Imagen + Info */}
          <motion.section
            variants={slide_up_variants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-12"
          >
            {/* Galería de imágenes */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <ImageGallery
                images={artwork.images}
                title={artwork.title}
              />
            </div>

            {/* Info de la obra - CTA principal, máxima jerarquía */}
            <div>
              <GlassSurface
                variant="content"
                shadow="glow_high"
                class_name="p-5 md:p-6 lg:p-8 rounded-xl"
              >
                <ArtworkInfo
                  artwork={artwork}
                  on_add_to_cart={handle_add_to_cart}
                  on_favorite={handle_favorite}
                  on_share={handle_share}
                  is_favorite={is_favorite}
                />
              </GlassSurface>
            </div>
          </motion.section>

          {/* Separador */}
          <div className="border-t border-raios-text-support/10 my-8" />

          {/* Obras relacionadas - Cross-sell, retiene en flujo de compra */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...raios_transitions.standard, delay: 0.2 }}
          >
            <GlassSurface
              variant="content"
              shadow="glow"
              class_name="p-5 md:p-6 lg:p-8 rounded-xl"
            >
              <RelatedWorks
                works={related_works}
                title="Más obras de Elena Vega"
                see_more_link={`/artist/${artwork.artist_username}`}
              />
            </GlassSurface>
          </motion.div>

          {/* Separador */}
          <div className="border-t border-raios-text-support/10 my-8" />

          {/* Comentarios - Social proof, refuerzo de decisión */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...raios_transitions.standard, delay: 0.3 }}
          >
            <GlassSurface
              variant="content"
              shadow="glow_subtle"
              class_name="p-5 md:p-6 lg:p-8 rounded-xl"
            >
              <CommentsSection
                comments={comments}
                on_submit={handle_comment_submit}
                on_like={handle_comment_like}
                can_comment={true}
              />
            </GlassSurface>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>

      {/* Panels - Capa 3 */}
      <CartPanel
        is_open={is_cart_open}
        on_close={() => set_is_cart_open(false)}
        items={cart_items}
        on_update_quantity={(id, qty) => {
          set_cart_items((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
          );
        }}
        on_remove_item={(id) => {
          set_cart_items((prev) => prev.filter((item) => item.id !== id));
        }}
        on_checkout={() => console.log('Ir a checkout')}
        on_continue_shopping={() => set_is_cart_open(false)}
      />

      <MenuPanel
        is_open={is_menu_open}
        on_close={() => set_is_menu_open(false)}
        user={demo_user}
        stats={demo_stats}
        on_navigate={(path) => {
          console.log('Navegar a:', path);
          set_is_menu_open(false);
        }}
        on_logout={() => console.log('Logout')}
      />
    </div>
  );
}

export default ArtworkDetail;
