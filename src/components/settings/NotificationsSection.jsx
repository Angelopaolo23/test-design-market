import { useState } from 'react';
import { GlassSurface } from '../ui/GlassSurface';
import { Toggle } from '../ui/Toggle';

/**
 * NotificationsSection - Sección de notificaciones en Settings
 *
 * Toggles para diferentes tipos de notificaciones
 *
 * Jerarquía: glow - Configuración importante pero secundaria al perfil
 */
export function NotificationsSection({ on_change }) {
  const [notifications, set_notifications] = useState({
    email_sales: true,
    email_comments: true,
    email_followers: false,
    email_newsletter: true,
    push_sales: true,
    push_messages: false,
  });

  const handle_toggle = (key, value) => {
    set_notifications((prev) => ({
      ...prev,
      [key]: value,
    }));
    on_change?.(key, value);
  };

  return (
    <GlassSurface
      variant="content"
      shadow="glow"
      class_name="p-5 md:p-6 rounded-xl"
    >
      {/* Header */}
      <h2 className="font-mono text-lg text-raios-text-high mb-6">
        Notificaciones
      </h2>

      {/* Email notifications */}
      <div className="mb-6">
        <h3 className="font-mono text-xs text-raios-text-support uppercase tracking-wider mb-4">
          Email
        </h3>
        <div className="space-y-4">
          <Toggle
            checked={notifications.email_sales}
            on_change={(value) => handle_toggle('email_sales', value)}
            label="Ventas"
            description="Recibe un email cuando vendas una obra"
          />
          <Toggle
            checked={notifications.email_comments}
            on_change={(value) => handle_toggle('email_comments', value)}
            label="Comentarios"
            description="Cuando alguien comente en tus obras"
          />
          <Toggle
            checked={notifications.email_followers}
            on_change={(value) => handle_toggle('email_followers', value)}
            label="Nuevos seguidores"
            description="Cuando alguien comience a seguirte"
          />
          <Toggle
            checked={notifications.email_newsletter}
            on_change={(value) => handle_toggle('email_newsletter', value)}
            label="Newsletter"
            description="Novedades y tendencias de RAIOS"
          />
        </div>
      </div>

      {/* Push notifications */}
      <div>
        <h3 className="font-mono text-xs text-raios-text-support uppercase tracking-wider mb-4">
          Push (Navegador)
        </h3>
        <div className="space-y-4">
          <Toggle
            checked={notifications.push_sales}
            on_change={(value) => handle_toggle('push_sales', value)}
            label="Ventas en tiempo real"
            description="Notificación instantánea de ventas"
          />
          <Toggle
            checked={notifications.push_messages}
            on_change={(value) => handle_toggle('push_messages', value)}
            label="Mensajes directos"
            description="Cuando recibas un mensaje"
          />
        </div>
      </div>
    </GlassSurface>
  );
}

export default NotificationsSection;
