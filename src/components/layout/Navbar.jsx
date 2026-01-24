import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';
import { Container } from './Container';
import { Button } from '../ui/Button';

const nav_items = [
  { label: 'Explorar', href: '#explorar' },
  { label: 'Artistas', href: '#artistas' },
  { label: 'Categorías', href: '#categorias' },
  { label: 'Cómo funciona', href: '#como-funciona' },
];

/**
 * Navbar - Barra de navegación con glassmorphism sutil
 */
export function Navbar() {
  const [is_mobile_open, setIsMobileOpen] = useState(false);

  const toggle_mobile = () => setIsMobileOpen(!is_mobile_open);

  return (
    <header className="nav-glass">
      <Container>
        <nav className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <span className="font-mono text-xl font-bold text-raios-text-high">
              RAIOS
            </span>
            <span className="hidden sm:inline font-mono text-xs text-raios-primary tracking-widest">
              ART
            </span>
          </a>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {nav_items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-sans text-sm text-raios-text-support hover:text-raios-text-high transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Actions - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <button
              className="p-2 text-raios-text-support hover:text-raios-text-high transition-colors"
              aria-label="Buscar"
            >
              <FiSearch size={20} />
            </button>

            <button
              className="p-2 text-raios-text-support hover:text-raios-text-high transition-colors relative"
              aria-label="Carrito"
            >
              <FiShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-raios-primary rounded-full text-[10px] font-mono flex items-center justify-center">
                2
              </span>
            </button>

            <div className="w-px h-6 bg-raios-text-support/20 mx-2" />

            <Button variant="ghost" size="sm" icon={<FiUser size={18} />}>
              Ingresar
            </Button>

            <Button variant="primary" size="sm">
              Vender Arte
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-raios-text-high"
            onClick={toggle_mobile}
            aria-label={is_mobile_open ? 'Cerrar menú' : 'Abrir menú'}
          >
            {is_mobile_open ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
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
                  <a
                    key={item.label}
                    href={item.href}
                    className="font-sans text-base text-raios-text-support hover:text-raios-text-high transition-colors py-2"
                    onClick={toggle_mobile}
                  >
                    {item.label}
                  </a>
                ))}

                <div className="h-px bg-raios-text-support/10 my-2" />

                <div className="flex gap-4">
                  <Button variant="secondary" size="md" class_name="flex-1">
                    Ingresar
                  </Button>
                  <Button variant="primary" size="md" class_name="flex-1">
                    Vender
                  </Button>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
