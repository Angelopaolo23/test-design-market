import { useState } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { GlassSurface } from '../ui/GlassSurface';
import { GlassModal } from '../ui/GlassModal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { FormField } from '../ui/FormField';

/**
 * DangerZoneSection - Zona de acciones peligrosas en Settings
 *
 * Eliminar cuenta con confirmación modal
 */
export function DangerZoneSection({ on_delete_account }) {
  const [show_modal, set_show_modal] = useState(false);
  const [confirmation_text, set_confirmation_text] = useState('');
  const [is_deleting, set_is_deleting] = useState(false);

  const required_text = 'ELIMINAR';
  const can_delete = confirmation_text === required_text;

  const handle_delete = async () => {
    if (!can_delete) return;

    set_is_deleting(true);
    // Simular eliminación
    await new Promise((resolve) => setTimeout(resolve, 2000));
    set_is_deleting(false);
    set_show_modal(false);
    on_delete_account?.();
  };

  return (
    <>
      <GlassSurface
        variant="content"
        shadow="subtle"
        has_border={false}
        class_name="p-5 md:p-6 rounded-xl border border-red-500/20"
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <FiAlertTriangle className="text-red-500" size={20} />
          <h2 className="font-mono text-lg text-red-500">
            Zona de peligro
          </h2>
        </div>

        <p className="text-sm text-raios-text-support mb-4">
          Estas acciones son permanentes y no se pueden deshacer.
        </p>

        {/* Delete button */}
        <Button
          variant="ghost"
          onClick={() => set_show_modal(true)}
          className="border-red-500/50 text-red-500 hover:bg-red-500/10 hover:border-red-500"
        >
          Eliminar mi cuenta
        </Button>
      </GlassSurface>

      {/* Confirmation Modal */}
      <GlassModal
        is_open={show_modal}
        on_close={() => {
          set_show_modal(false);
          set_confirmation_text('');
        }}
        title="Eliminar cuenta"
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <FiAlertTriangle className="text-red-500 shrink-0" size={24} />
            <p className="text-sm text-raios-text-high">
              Esta acción eliminará permanentemente tu cuenta, todas tus obras y datos asociados.
            </p>
          </div>

          <FormField
            label={`Escribe "${required_text}" para confirmar`}
          >
            <Input
              value={confirmation_text}
              on_change={set_confirmation_text}
              placeholder={required_text}
              error={confirmation_text && !can_delete ? 'El texto no coincide' : ''}
            />
          </FormField>

          <div className="flex gap-3 pt-2">
            <Button
              variant="ghost"
              onClick={() => {
                set_show_modal(false);
                set_confirmation_text('');
              }}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={handle_delete}
              disabled={!can_delete || is_deleting}
              className={`
                flex-1
                ${can_delete
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-red-500/30 cursor-not-allowed'
                }
              `}
            >
              {is_deleting ? 'Eliminando...' : 'Eliminar cuenta'}
            </Button>
          </div>
        </div>
      </GlassModal>
    </>
  );
}

export default DangerZoneSection;
