import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { FiUser, FiImage, FiShoppingBag, FiDollarSign, FiHeart, FiSettings, FiLogOut, FiPlus, FiChevronRight, FiX } from 'react-icons/fi';
import { GlassSurface } from './GlassSurface';
import { overlay_variants, modal_variants } from '../../utils/animations';

/**
 * MenuPanel - "Command Center" del usuario
 *
 * Mobile: Layout vertical centrado
 * Desktop (lg+): Layout horizontal expandido tipo dashboard
 *
 * @param {Object} props
 * @param {boolean} props.is_open - Estado de visibilidad
 * @param {Function} props.on_close - Callback al cerrar
 * @param {Object} props.user - Datos del usuario
 * @param {Object} props.stats - Estadísticas del usuario
 * @param {Function} props.on_navigate - Callback de navegación (recibe path)
 * @param {Function} props.on_logout - Callback de cerrar sesión
 */
export function MenuPanel({
  is_open = false,
  on_close,
  user = {},
  stats = {},
  on_navigate,
  on_logout,
}) {
  // Datos por defecto para demo
  const default_user = {
    name: 'Usuario',
    username: 'usuario',
    avatar_url: null,
    is_verified: false,
    is_artist: false,
    ...user,
  };

  const default_stats = {
    obras: 0,
    ventas: '$0',
    likes: 0,
    ...stats,
  };

  // Manejo de ESC
  const handle_key_down = useCallback(
    (event) => {
      if (event.key === 'Escape' && on_close) {
        on_close();
      }
    },
    [on_close]
  );

  useEffect(() => {
    if (is_open) {
      document.addEventListener('keydown', handle_key_down);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handle_key_down);
      document.body.style.overflow = '';
    };
  }, [is_open, handle_key_down]);

  const handle_navigate = (path) => {
    on_navigate?.(path);
    on_close?.();
  };

  // Acciones principales
  const main_actions = [
    { icon: FiImage, label: 'Mis Obras', path: '/my-works', color: 'text-raios-primary' },
    { icon: FiDollarSign, label: 'Ventas', path: '/sales', color: 'text-green-400' },
    { icon: FiShoppingBag, label: 'Compras', path: '/purchases', color: 'text-raios-tertiary' },
    { icon: FiHeart, label: 'Favoritos', path: '/favorites', color: 'text-pink-400' },
  ];

  const modal_content = (
    <AnimatePresence>
      {is_open && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-3 md:p-4 lg:p-8">
          {/* Overlay */}
          <motion.div
            variants={overlay_variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-raios-secondary/85 backdrop-blur-md"
            onClick={on_close}
          />

          {/* Panel - Responsive: vertical en mobile, horizontal en lg+ */}
          <GlassSurface
            as_motion
            variants={modal_variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            variant="surface"
            shadow="float"
            className="
              relative w-full rounded-xl overflow-hidden
              max-w-[95vw] md:max-w-md lg:max-w-4xl xl:max-w-5xl
              max-h-[90vh] lg:max-h-[70vh]
            "
          >
            {/* Botón cerrar - Absoluto */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={on_close}
              className="absolute top-3 right-3 lg:top-4 lg:right-4 z-10 p-2 rounded-lg text-raios-text-support hover:text-raios-text-high hover:bg-white/10 transition-colors"
              aria-label="Cerrar"
            >
              <FiX size={20} />
            </motion.button>

            {/* ============ MOBILE/TABLET LAYOUT ============ */}
            <div className="lg:hidden flex flex-col h-full">
              {/* Header - Usuario */}
              <div className="p-4 md:p-5 border-b border-raios-text-support/10">
                <div className="flex items-start gap-4 pr-10">
                  {/* Avatar */}
                  <div className="relative">
                    {default_user.avatar_url ? (
                      <img
                        src={default_user.avatar_url}
                        alt={default_user.name}
                        className="w-14 h-14 md:w-16 md:h-16 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg bg-raios-primary/20 flex items-center justify-center">
                        <FiUser size={24} className="text-raios-primary" />
                      </div>
                    )}
                    {default_user.is_verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-raios-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-mono text-lg text-raios-text-high truncate">
                      {default_user.name}
                    </h3>
                    <p className="text-sm text-raios-text-support truncate">
                      @{default_user.username}
                    </p>
                    {default_user.is_artist && (
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-raios-primary/20 text-raios-primary rounded">
                        Artista
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Content scrollable */}
              <div className="flex-1 overflow-y-auto">
                {/* Stats */}
                {default_user.is_artist && (
                  <div className="p-4 md:p-5 border-b border-raios-text-support/10">
                    <p className="text-xs text-raios-text-support uppercase tracking-wider mb-3 font-mono">
                      Stats
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: default_stats.obras, label: 'Obras' },
                        { value: default_stats.ventas, label: 'Ventas' },
                        { value: default_stats.likes, label: 'Likes' },
                      ].map((stat) => (
                        <GlassSurface
                          key={stat.label}
                          variant="light"
                          shadow="none"
                          className="p-3 rounded-lg text-center"
                        >
                          <p className="font-mono text-lg text-raios-text-high">
                            {stat.value}
                          </p>
                          <p className="text-xs text-raios-text-support">
                            {stat.label}
                          </p>
                        </GlassSurface>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Crear Obra */}
                {default_user.is_artist && (
                  <div className="p-4 md:px-5 md:pt-5 md:pb-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handle_navigate('/artwork/new')}
                      className="w-full flex items-center justify-center gap-2 p-3 bg-raios-primary text-white rounded-lg font-mono text-sm hover:bg-raios-primary/90 transition-colors"
                    >
                      <FiPlus size={18} />
                      Nueva Obra
                    </motion.button>
                  </div>
                )}

                {/* Acciones principales - Grid */}
                <div className="p-4 md:px-5">
                  <p className="text-xs text-raios-text-support uppercase tracking-wider mb-3 font-mono">
                    Gestionar
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {main_actions.map((action) => (
                      <motion.button
                        key={action.path}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handle_navigate(action.path)}
                        className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left"
                      >
                        <action.icon size={20} className={action.color} />
                        <span className="text-sm text-raios-text-high">
                          {action.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Ver Perfil */}
                <div className="px-4 md:px-5 pb-2">
                  <motion.button
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handle_navigate('/profile')}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <span className="text-sm text-raios-text-high">Ver perfil completo</span>
                    <FiChevronRight size={18} className="text-raios-text-support" />
                  </motion.button>
                </div>
              </div>

              {/* Footer - Config y Logout */}
              <div className="p-4 md:p-5 border-t border-raios-text-support/10 mt-auto">
                <div className="flex items-center justify-between">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handle_navigate('/settings')}
                    className="flex items-center gap-2 p-2 rounded-lg text-raios-text-support hover:text-raios-text-high hover:bg-white/5 transition-colors"
                  >
                    <FiSettings size={18} />
                    <span className="text-sm">Configuración</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={on_logout}
                    className="flex items-center gap-2 p-2 rounded-lg text-raios-text-support hover:text-red-400 hover:bg-white/5 transition-colors"
                  >
                    <FiLogOut size={18} />
                    <span className="text-sm">Salir</span>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* ============ DESKTOP LAYOUT (lg+) - Two Row Dashboard ============ */}
            <div className="hidden lg:block p-6 xl:p-8">
              {/* Fila 1: Usuario + Stats */}
              <div className="flex items-start gap-8 xl:gap-12">
                {/* Usuario + Ver perfil */}
                <div className="flex-shrink-0">
                  <div className="flex items-center gap-4 mb-4">
                    {/* Avatar */}
                    <div className="relative">
                      {default_user.avatar_url ? (
                        <img
                          src={default_user.avatar_url}
                          alt={default_user.name}
                          className="w-16 h-16 xl:w-20 xl:h-20 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 xl:w-20 xl:h-20 rounded-xl bg-raios-primary/20 flex items-center justify-center">
                          <FiUser size={28} className="text-raios-primary" />
                        </div>
                      )}
                      {default_user.is_verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-raios-primary rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="min-w-0">
                      <h3 className="font-mono text-lg xl:text-xl text-raios-text-high">
                        {default_user.name}
                      </h3>
                      <p className="text-sm text-raios-text-support">
                        @{default_user.username}
                      </p>
                      {default_user.is_artist && (
                        <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-raios-primary/20 text-raios-primary rounded">
                          Artista
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Botón perfil */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handle_navigate('/profile')}
                    className="w-full flex items-center justify-center gap-2 p-2.5 rounded-lg border border-raios-text-support/20 text-raios-text-support hover:text-raios-text-high hover:border-raios-primary transition-colors text-sm"
                  >
                    Ver perfil
                    <FiChevronRight size={16} />
                  </motion.button>
                </div>

                {/* Separador vertical */}
                <div className="w-px self-stretch bg-raios-text-support/10" />

                {/* Stats (solo artistas) */}
                {default_user.is_artist && (
                  <div className="flex-1">
                    <p className="text-xs text-raios-text-support uppercase tracking-wider mb-3 font-mono">
                      Stats
                    </p>
                    <div className="flex gap-4">
                      {[
                        { value: default_stats.obras, label: 'Obras' },
                        { value: default_stats.ventas, label: 'Ventas' },
                        { value: default_stats.likes, label: 'Likes' },
                      ].map((stat) => (
                        <GlassSurface
                          key={stat.label}
                          variant="light"
                          shadow="none"
                          className="p-4 xl:p-5 rounded-lg text-center min-w-[90px] xl:min-w-[100px]"
                        >
                          <p className="font-mono text-2xl xl:text-3xl text-raios-text-high">
                            {stat.value}
                          </p>
                          <p className="text-xs text-raios-text-support mt-1">
                            {stat.label}
                          </p>
                        </GlassSurface>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Fila 2: Gestionar + Nueva Obra */}
              <div className="mt-6 pt-6 border-t border-raios-text-support/10">
                <div className="flex items-end justify-between gap-6">
                  {/* Acciones en grid */}
                  <div className="flex-1">
                    <p className="text-xs text-raios-text-support uppercase tracking-wider mb-3 font-mono">
                      Gestionar
                    </p>
                    <div className="grid grid-cols-4 gap-3">
                      {main_actions.map((action) => (
                        <motion.button
                          key={action.path}
                          whileHover={{ scale: 1.03, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handle_navigate(action.path)}
                          className="flex flex-col items-center justify-center gap-2 p-4 xl:p-5 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-center"
                        >
                          <action.icon size={24} className={action.color} />
                          <span className="text-sm text-raios-text-high">
                            {action.label}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* CTA Nueva Obra (artistas) */}
                  {default_user.is_artist && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handle_navigate('/artwork/new')}
                      className="flex-shrink-0 flex items-center justify-center gap-2 px-6 py-4 bg-raios-primary text-white rounded-lg font-mono text-sm hover:bg-raios-primary/90 transition-colors"
                    >
                      <FiPlus size={18} />
                      Nueva Obra
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Footer: Configuración prominente + Cerrar sesión */}
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-raios-text-support/10">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handle_navigate('/settings')}
                  className="flex items-center gap-3 px-5 py-3 rounded-lg bg-white/5 text-raios-text-high hover:bg-white/10 transition-colors"
                >
                  <FiSettings size={20} />
                  <span className="text-sm font-medium">Configuración</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={on_logout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-raios-text-support hover:text-red-400 hover:bg-red-400/10 transition-colors"
                >
                  <FiLogOut size={18} />
                  <span className="text-sm">Cerrar sesión</span>
                </motion.button>
              </div>
            </div>
          </GlassSurface>
        </div>
      )}
    </AnimatePresence>
  );

  // Renderizar en portal
  if (typeof window === 'undefined') return null;
  return createPortal(modal_content, document.body);
}

export default MenuPanel;
