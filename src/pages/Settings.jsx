import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { BackgroundSwitcher } from '../components/backgrounds';
import {
  SettingsTabs,
  ProfileSection,
  NotificationsSection,
  AppearanceSection,
  DangerZoneSection,
  AddressesSection,
  SellerSection,
} from '../components/settings';
import { useToast } from '../components/ui';
import { slide_up_variants, raios_transitions } from '../utils/animations';

/**
 * Settings - Página de configuración con tabs
 *
 * Estructura:
 * - Cuenta: Perfil, Notificaciones, Apariencia, Zona de peligro
 * - Direcciones: Lista de direcciones de envío
 * - Vendedor: Configuración de tienda y pagos
 */
export function Settings() {
  const navigate = useNavigate();
  const { toast_success, toast_error, toast_info } = useToast();
  const [active_tab, set_active_tab] = useState('cuenta');

  // Scroll to top on mount and tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [active_tab]);

  // Handlers
  const handle_profile_save = () => {
    toast_success('Perfil actualizado', 'Los cambios se guardaron correctamente');
  };

  const handle_notification_change = (key, value) => {
    toast_success(
      'Preferencia actualizada',
      `${key.replace(/_/g, ' ')} ${value ? 'activado' : 'desactivado'}`
    );
  };

  const handle_appearance_change = (bg_id) => {
    toast_success('Fondo cambiado', `Ahora estás usando el fondo "${bg_id}"`);
  };

  const handle_delete_account = () => {
    toast_error('Cuenta eliminada', 'Tu cuenta ha sido eliminada permanentemente');
  };

  const handle_add_address = () => {
    toast_info('Agregar dirección', 'Esta función estará disponible pronto');
  };

  const handle_edit_address = (id) => {
    toast_info('Editar dirección', `Editando dirección ${id}`);
  };

  const handle_delete_address = (id) => {
    toast_info('Eliminar dirección', `Eliminando dirección ${id}`);
  };

  const handle_seller_save = () => {
    toast_success('Configuración guardada', 'Tu configuración de vendedor se actualizó');
  };

  // Contenido por tab
  const render_tab_content = () => {
    switch (active_tab) {
      case 'cuenta':
        return (
          <motion.div
            key="cuenta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={raios_transitions.standard}
            className="space-y-6"
          >
            <ProfileSection on_save={handle_profile_save} />
            <NotificationsSection on_change={handle_notification_change} />
            <AppearanceSection on_change={handle_appearance_change} />
            <DangerZoneSection on_delete_account={handle_delete_account} />
          </motion.div>
        );

      case 'direcciones':
        return (
          <motion.div
            key="direcciones"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={raios_transitions.standard}
          >
            <AddressesSection
              on_add={handle_add_address}
              on_edit={handle_edit_address}
              on_delete={handle_delete_address}
            />
          </motion.div>
        );

      case 'vendedor':
        return (
          <motion.div
            key="vendedor"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={raios_transitions.standard}
          >
            <SellerSection on_save={handle_seller_save} />
          </motion.div>
        );

      default:
        return null;
    }
  };

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
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          {/* Header */}
          <motion.div
            variants={slide_up_variants}
            initial="hidden"
            animate="visible"
            className="mb-6"
          >
            {/* Back button */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-raios-text-support hover:text-raios-text-high transition-colors mb-4"
            >
              <FiArrowLeft size={18} />
              <span className="text-sm">Volver</span>
            </button>

            {/* Title */}
            <h1 className="font-mono text-2xl md:text-3xl text-raios-text-high font-bold">
              Configuración
            </h1>
            <p className="text-raios-text-support mt-2">
              Administra tu cuenta y preferencias
            </p>
          </motion.div>

          {/* Tabs */}
          <SettingsTabs
            active_tab={active_tab}
            on_change={set_active_tab}
          />

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {render_tab_content()}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default Settings;
