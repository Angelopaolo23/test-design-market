import { motion } from 'framer-motion';
import { FiUser, FiMapPin, FiShoppingBag } from 'react-icons/fi';

/**
 * SettingsTabs - Navegación por tabs para Settings
 *
 * Mobile: Scroll horizontal con tabs
 * Desktop: Tabs horizontales centradas
 *
 * @param {Object} props
 * @param {string} props.active_tab - Tab activa actual
 * @param {Function} props.on_change - Callback al cambiar de tab
 */
export function SettingsTabs({ active_tab, on_change }) {
  const tabs = [
    {
      id: 'cuenta',
      label: 'Cuenta',
      icon: FiUser,
    },
    {
      id: 'direcciones',
      label: 'Direcciones',
      icon: FiMapPin,
    },
    {
      id: 'vendedor',
      label: 'Vendedor',
      icon: FiShoppingBag,
    },
  ];

  return (
    <div className="relative mb-8">
      {/* Tabs container con scroll horizontal en mobile */}
      <div className="flex overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:justify-center">
        <div className="flex gap-2 md:gap-3 p-1 bg-white/5 rounded-lg border border-raios-text-support/10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const is_active = active_tab === tab.id;

            return (
              <motion.button
                key={tab.id}
                onClick={() => on_change(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative flex items-center gap-2 px-4 py-2.5 rounded-md
                  font-mono text-sm whitespace-nowrap
                  transition-colors duration-200
                  ${is_active
                    ? 'text-white'
                    : 'text-raios-text-support hover:text-raios-text-high'
                  }
                `}
              >
                {/* Background animado para tab activa */}
                {is_active && (
                  <motion.div
                    layoutId="active-tab-bg"
                    className="absolute inset-0 bg-raios-primary rounded-md"
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}

                {/* Contenido */}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon size={18} />
                  {tab.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Indicador de scroll en mobile (gradientes) */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-raios-secondary to-transparent pointer-events-none md:hidden" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-raios-secondary to-transparent pointer-events-none md:hidden" />
    </div>
  );
}

export default SettingsTabs;
