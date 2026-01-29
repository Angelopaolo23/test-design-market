import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiDollarSign, FiPackage, FiTruck } from 'react-icons/fi';
import { GlassSurface } from '../ui/GlassSurface';
import { Input } from '../ui/Input';
import { FormField } from '../ui/FormField';
import { Toggle } from '../ui/Toggle';
import { Button } from '../ui/Button';

/**
 * SellerSection - Sección de configuración de vendedor en Settings
 *
 * Configuración de pagos, envíos y preferencias de venta
 *
 * Jerarquía:
 * - Stats cards: glow_subtle (información de referencia)
 * - Store info: glow_high (datos críticos para monetización)
 * - Sale preferences: glow (configuración importante)
 * - Shipping: glow_subtle (configuración secundaria)
 */
export function SellerSection({ on_save }) {
  const [is_saving, set_is_saving] = useState(false);

  // Estado mock del formulario
  const [form_data, set_form_data] = useState({
    store_name: 'Elena Vega Art',
    payout_email: 'elena.pagos@example.com',
    commission_rate: '15',
  });

  const [preferences, set_preferences] = useState({
    auto_accept_orders: true,
    notify_new_order: true,
    notify_low_stock: false,
    enable_international: false,
  });

  const handle_change = (field, value) => {
    set_form_data((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handle_toggle = (key, value) => {
    set_preferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handle_save = async () => {
    set_is_saving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set_is_saving(false);
    on_save?.();
  };

  // Stats mock
  const stats = {
    total_sales: '$45,200',
    pending_payout: '$2,350',
    active_listings: 12,
  };

  return (
    <div className="space-y-6">
      {/* Stats rápidas - glow_subtle (información de referencia) */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        <GlassSurface
          variant="content"
          shadow="glow_subtle"
          class_name="p-4 rounded-xl text-center"
        >
          <FiDollarSign className="mx-auto text-green-500 mb-2" size={24} />
          <p className="font-mono text-lg text-raios-text-high">{stats.total_sales}</p>
          <p className="text-xs text-raios-text-support">Ventas totales</p>
        </GlassSurface>

        <GlassSurface
          variant="content"
          shadow="glow_subtle"
          class_name="p-4 rounded-xl text-center"
        >
          <FiDollarSign className="mx-auto text-raios-primary mb-2" size={24} />
          <p className="font-mono text-lg text-raios-text-high">{stats.pending_payout}</p>
          <p className="text-xs text-raios-text-support">Por cobrar</p>
        </GlassSurface>

        <GlassSurface
          variant="content"
          shadow="glow_subtle"
          class_name="p-4 rounded-xl text-center"
        >
          <FiPackage className="mx-auto text-raios-tertiary mb-2" size={24} />
          <p className="font-mono text-lg text-raios-text-high">{stats.active_listings}</p>
          <p className="text-xs text-raios-text-support">Obras activas</p>
        </GlassSurface>
      </div>

      {/* Información de la tienda - glow_high (datos críticos para monetización) */}
      <GlassSurface
        variant="content"
        shadow="glow_high"
        class_name="p-5 md:p-6 rounded-xl"
      >
        <h3 className="font-mono text-lg text-raios-text-high mb-6">
          Información de tienda
        </h3>

        <div className="space-y-5">
          <FormField
            label="Nombre de tienda"
            helper_text="Este nombre aparecerá en tu perfil público"
          >
            <Input
              value={form_data.store_name}
              on_change={(value) => handle_change('store_name', value)}
              placeholder="Mi tienda de arte"
            />
          </FormField>

          <FormField
            label="Email para pagos"
            helper_text="Recibirás tus pagos en esta dirección"
          >
            <Input
              type="email"
              value={form_data.payout_email}
              on_change={(value) => handle_change('payout_email', value)}
              placeholder="pagos@email.com"
            />
          </FormField>

          <div className="p-4 rounded-lg bg-raios-primary/10 border border-raios-primary/20">
            <div className="flex items-center gap-2 mb-1">
              <FiDollarSign className="text-raios-primary" size={18} />
              <span className="font-mono text-sm text-raios-text-high">
                Comisión de plataforma
              </span>
            </div>
            <p className="text-sm text-raios-text-support">
              RAIOS cobra una comisión del <span className="text-raios-primary font-mono">{form_data.commission_rate}%</span> por cada venta realizada.
            </p>
          </div>
        </div>
      </GlassSurface>

      {/* Preferencias de venta - glow (configuración importante) */}
      <GlassSurface
        variant="content"
        shadow="glow"
        class_name="p-5 md:p-6 rounded-xl"
      >
        <h3 className="font-mono text-lg text-raios-text-high mb-6">
          Preferencias de venta
        </h3>

        <div className="space-y-4">
          <Toggle
            checked={preferences.auto_accept_orders}
            on_change={(value) => handle_toggle('auto_accept_orders', value)}
            label="Aceptar pedidos automáticamente"
            description="Los pedidos se confirmarán sin tu intervención"
          />
          <Toggle
            checked={preferences.notify_new_order}
            on_change={(value) => handle_toggle('notify_new_order', value)}
            label="Notificar nuevos pedidos"
            description="Recibe un email cuando alguien compre tu obra"
          />
          <Toggle
            checked={preferences.notify_low_stock}
            on_change={(value) => handle_toggle('notify_low_stock', value)}
            label="Alerta de stock bajo"
            description="Notificación cuando queden pocas unidades"
          />
        </div>
      </GlassSurface>

      {/* Envíos - glow_subtle (configuración secundaria) */}
      <GlassSurface
        variant="content"
        shadow="glow_subtle"
        class_name="p-5 md:p-6 rounded-xl"
      >
        <div className="flex items-center gap-2 mb-6">
          <FiTruck className="text-raios-primary" size={20} />
          <h3 className="font-mono text-lg text-raios-text-high">
            Envíos
          </h3>
        </div>

        <div className="space-y-4">
          <Toggle
            checked={preferences.enable_international}
            on_change={(value) => handle_toggle('enable_international', value)}
            label="Envíos internacionales"
            description="Permite que compradores de otros países adquieran tus obras"
          />

          <p className="text-sm text-raios-text-support p-4 bg-white/5 rounded-lg">
            Los costos de envío se calculan automáticamente según el destino y las dimensiones de la obra.
          </p>
        </div>
      </GlassSurface>

      {/* Botón guardar */}
      <div className="pt-2">
        <Button
          onClick={handle_save}
          disabled={is_saving}
          icon={is_saving ? null : <FiCheck />}
        >
          {is_saving ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </div>
    </div>
  );
}

export default SellerSection;
