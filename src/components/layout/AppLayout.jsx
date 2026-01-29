import { useNavigate } from 'react-router-dom';
import { BackgroundSwitcher } from '../backgrounds';
import { SearchOverlay, MenuPanel, CartPanel } from '../ui';
import { useApp } from '../../context';

/**
 * AppLayout - Layout global de la aplicación
 *
 * Contiene:
 * - Background dinámico (Capa 0)
 * - Paneles globales (Search, Menu, Cart)
 *
 * Las páginas individuales manejan su propio Navbar y Footer
 * para permitir variaciones (ej: ArtworkDetail sin footer visible inicialmente)
 */
export function AppLayout({ children }) {
  const navigate = useNavigate();
  const {
    // Search
    is_search_open,
    close_search,
    search_results,
    search_loading,
    recent_searches,
    handle_search,
    // Menu
    is_menu_open,
    close_menu,
    user,
    user_stats,
    // Cart
    is_cart_open,
    close_cart,
    cart_items,
    update_cart_quantity,
    remove_from_cart,
  } = useApp();

  // Handlers de navegación desde paneles
  const handle_navigate = (path) => {
    close_menu();
    navigate(path);
  };

  const handle_search_select = (result) => {
    close_search();
    if (result.type === 'artwork') {
      navigate(`/artwork/${result.id}`);
    } else if (result.type === 'artist') {
      navigate(`/artist/${result.id}`);
    } else if (result.type === 'category') {
      navigate(`/category/${result.name.toLowerCase()}`);
    }
  };

  return (
    <>
      {/* Background dinámico - Capa 0 (global) */}
      <div className="fixed inset-0 z-0">
        <BackgroundSwitcher show_controls={false} default_background="wave_grid" />
      </div>

      {/* Contenido de la página */}
      {children}

      {/* Paneles Globales - Capa 3 */}
      <SearchOverlay
        is_open={is_search_open}
        on_close={close_search}
        on_search={handle_search}
        on_select_result={handle_search_select}
        results={search_results}
        is_loading={search_loading}
        recent_searches={recent_searches}
      />

      <MenuPanel
        is_open={is_menu_open}
        on_close={close_menu}
        user={user}
        stats={user_stats}
        on_navigate={handle_navigate}
        on_logout={() => {
          close_menu();
          console.log('Logout');
        }}
      />

      <CartPanel
        is_open={is_cart_open}
        on_close={close_cart}
        items={cart_items}
        on_update_quantity={update_cart_quantity}
        on_remove_item={remove_from_cart}
        on_checkout={() => {
          close_cart();
          navigate('/checkout');
        }}
        on_continue_shopping={close_cart}
      />
    </>
  );
}

export default AppLayout;
