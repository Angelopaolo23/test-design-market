import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSearch, FiShoppingCart, FiUser, FiSettings } from 'react-icons/fi';
import { Container } from './Container';
import { Button } from '../ui/Button';
import { useApp } from '../../context';

const nav_items = [
  { label: 'Explorar', href: '/explorar' },
  { label: 'Artistas', href: '/artistas' },
  { label: 'Categorías', href: '/categorias' },
];

/**
 * Navbar - Barra de navegación con glassmorphism sutil
 *
 * Integrada con AppContext para controlar paneles globales
 */
export function Navbar() {
  const navigate = useNavigate();
  const { open_search, open_menu, open_cart, cart_count } = useApp();
  const [is_mobile_open, set_is_mobile_open] = useState(false);

  const toggle_mobile = () => set_is_mobile_open(!is_mobile_open);
  const close_mobile = () => set_is_mobile_open(false);

  return (
    <header className="nav-glass">
      <Container>
        <nav className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-mono text-xl font-bold text-raios-text-high">
              RAIOS
            </span>
            <span className="hidden sm:inline font-mono text-xs text-raios-primary tracking-widest">
              ART
            </span>
          </Link>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {nav_items.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="font-sans text-sm text-raios-text-support hover:text-raios-text-high transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Actions - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {/* Search */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={open_search}
              className="p-2 text-raios-text-support hover:text-raios-text-high transition-colors"
              aria-label="Buscar"
            >
              <FiSearch size={20} />
            </motion.button>

            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={open_cart}
              className="p-2 text-raios-text-support hover:text-raios-text-high transition-colors relative"
              aria-label="Carrito"
            >
              <FiShoppingCart size={20} />
              {cart_count > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-raios-primary rounded-full text-[10px] font-mono flex items-center justify-center text-white">
                  {cart_count > 9 ? '9+' : cart_count}
                </span>
              )}
            </motion.button>

            {/* Settings */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/settings')}
              className="p-2 text-raios-text-support hover:text-raios-text-high transition-colors"
              aria-label="Configuración"
            >
              <FiSettings size={20} />
            </motion.button>

            <div className="w-px h-6 bg-raios-text-support/20 mx-2" />

            {/* User Menu */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={open_menu}
              className="p-2 text-raios-text-support hover:text-raios-text-high transition-colors"
              aria-label="Menú de usuario"
            >
              <FiUser size={20} />
            </motion.button>

            <Button variant="primary" size="sm">
              Vender Arte
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            {/* Search - Mobile */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={open_search}
              className="p-2 text-raios-text-support"
              aria-label="Buscar"
            >
              <FiSearch size={22} />
            </motion.button>

            {/* Cart - Mobile */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={open_cart}
              className="p-2 text-raios-text-support relative"
              aria-label="Carrito"
            >
              <FiShoppingCart size={22} />
              {cart_count > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-raios-primary rounded-full text-[10px] font-mono flex items-center justify-center text-white">
                  {cart_count > 9 ? '9+' : cart_count}
                </span>
              )}
            </motion.button>

            {/* Menu Toggle */}
            <button
              className="p-2 text-raios-text-high"
              onClick={toggle_mobile}
              aria-label={is_mobile_open ? 'Cerrar menú' : 'Abrir menú'}
            >
              {is_mobile_open ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {is_mobile_open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-raios-text-support/10"
          >
            <Container class_name="py-4">
              <div className="flex flex-col gap-4">
                {nav_items.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="font-sans text-base text-raios-text-support hover:text-raios-text-high transition-colors py-2"
                    onClick={close_mobile}
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="h-px bg-raios-text-support/10 my-2" />

                {/* User actions mobile */}
                <button
                  onClick={() => {
                    close_mobile();
                    open_menu();
                  }}
                  className="flex items-center gap-3 py-2 text-raios-text-support hover:text-raios-text-high transition-colors"
                >
                  <FiUser size={20} />
                  <span>Mi cuenta</span>
                </button>

                <button
                  onClick={() => {
                    close_mobile();
                    navigate('/settings');
                  }}
                  className="flex items-center gap-3 py-2 text-raios-text-support hover:text-raios-text-high transition-colors"
                >
                  <FiSettings size={20} />
                  <span>Configuración</span>
                </button>

                <div className="h-px bg-raios-text-support/10 my-2" />

                <Button variant="primary" size="md" class_name="w-full">
                  Vender Arte
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
