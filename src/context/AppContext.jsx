import { createContext, useContext, useState } from 'react';

/**
 * AppContext - Estado global de la aplicación
 *
 * Maneja:
 * - Paneles (search, menu, cart)
 * - Carrito de compras
 * - Usuario (mock)
 */
const AppContext = createContext(null);

// Mock data
const MOCK_USER = {
  name: 'Elena Vega',
  username: 'elenavega',
  avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  is_verified: true,
  is_artist: true,
};

const MOCK_STATS = {
  obras: 12,
  ventas: '$45K',
  likes: 89,
};

export function AppProvider({ children }) {
  // Estado de paneles
  const [is_search_open, set_is_search_open] = useState(false);
  const [is_menu_open, set_is_menu_open] = useState(false);
  const [is_cart_open, set_is_cart_open] = useState(false);

  // Estado del background
  const [active_background, set_active_background] = useState('wave_grid');

  // Estado del carrito
  const [cart_items, set_cart_items] = useState([
    {
      id: 'cart-1',
      title: 'Reflejos Nocturnos',
      artist_name: 'Elena Vega',
      price: 2900,
      quantity: 1,
      image_url: 'https://images.unsplash.com/photo-1482160549825-59d1b23cb208?w=200&h=200&fit=crop',
    },
  ]);

  // Estado de búsqueda
  const [search_results, set_search_results] = useState(null);
  const [search_loading, set_search_loading] = useState(false);
  const [recent_searches] = useState(['óleo abstracto', 'fotografía urbana', 'Elena Vega']);

  // Handlers de paneles
  const open_search = () => set_is_search_open(true);
  const close_search = () => set_is_search_open(false);
  const open_menu = () => set_is_menu_open(true);
  const close_menu = () => set_is_menu_open(false);
  const open_cart = () => set_is_cart_open(true);
  const close_cart = () => set_is_cart_open(false);

  // Handlers del carrito
  const add_to_cart = (item) => {
    set_cart_items((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i
        );
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
    open_cart();
  };

  const update_cart_quantity = (item_id, new_quantity) => {
    if (new_quantity <= 0) {
      remove_from_cart(item_id);
      return;
    }
    set_cart_items((prev) =>
      prev.map((item) =>
        item.id === item_id ? { ...item, quantity: new_quantity } : item
      )
    );
  };

  const remove_from_cart = (item_id) => {
    set_cart_items((prev) => prev.filter((item) => item.id !== item_id));
  };

  const cart_count = cart_items.reduce((sum, item) => sum + item.quantity, 0);

  // Handler de búsqueda (mock)
  const handle_search = (query) => {
    if (!query.trim()) {
      set_search_results(null);
      return;
    }

    set_search_loading(true);
    // Simular delay de API
    setTimeout(() => {
      set_search_results([
        {
          id: 'r1',
          type: 'artwork',
          title: 'Reflejos Nocturnos',
          artist_name: 'Elena Vega',
          category: 'Fotografía',
          price: '$2,900',
          image_url: 'https://images.unsplash.com/photo-1482160549825-59d1b23cb208?w=100&h=100&fit=crop',
        },
        {
          id: 'r2',
          type: 'artwork',
          title: 'Fragmentos de Luz',
          artist_name: 'María Soledad',
          category: 'Óleo',
          price: '$3,400',
          image_url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=100&h=100&fit=crop',
        },
        { id: 'r3', type: 'artist', name: 'Elena Vega Studio', works_count: 24 },
        { id: 'r4', type: 'category', name: 'Arte Digital' },
      ]);
      set_search_loading(false);
    }, 400);
  };

  const value = {
    // Paneles
    is_search_open,
    is_menu_open,
    is_cart_open,
    open_search,
    close_search,
    open_menu,
    close_menu,
    open_cart,
    close_cart,

    // Carrito
    cart_items,
    cart_count,
    add_to_cart,
    update_cart_quantity,
    remove_from_cart,

    // Búsqueda
    search_results,
    search_loading,
    recent_searches,
    handle_search,

    // Usuario (mock)
    user: MOCK_USER,
    user_stats: MOCK_STATS,

    // Background
    active_background,
    set_active_background,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

export default AppContext;
