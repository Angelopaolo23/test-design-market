import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiMapPin } from 'react-icons/fi';
import { GlassSurface } from '../ui/GlassSurface';
import { Button } from '../ui/Button';
import { EmptyState } from '../ui/EmptyState';

/**
 * AddressesSection - Sección de direcciones en Settings
 *
 * Lista de direcciones guardadas con acciones de editar/eliminar
 *
 * Jerarquía: glow - Datos importantes para completar compras/envíos
 */
export function AddressesSection({ on_add, on_edit, on_delete }) {
  // Datos mock de direcciones
  const [addresses] = useState([
    {
      id: '1',
      label: 'Casa',
      name: 'Elena Vega',
      street: 'Av. Insurgentes Sur 1234',
      colony: 'Del Valle',
      city: 'Ciudad de México',
      state: 'CDMX',
      zip: '03100',
      phone: '+52 55 1234 5678',
      is_default: true,
    },
    {
      id: '2',
      label: 'Oficina',
      name: 'Elena Vega',
      street: 'Paseo de la Reforma 500',
      colony: 'Juárez',
      city: 'Ciudad de México',
      state: 'CDMX',
      zip: '06600',
      phone: '+52 55 8765 4321',
      is_default: false,
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header con botón de agregar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-mono text-lg text-raios-text-high">
            Mis Direcciones
          </h2>
          <p className="text-sm text-raios-text-support mt-1">
            Administra tus direcciones de envío
          </p>
        </div>
        <Button
          variant="secondary"
          icon={<FiPlus />}
          onClick={on_add}
        >
          <span className="hidden sm:inline">Agregar dirección</span>
          <span className="sm:hidden">Agregar</span>
        </Button>
      </div>

      {/* Lista de direcciones */}
      {addresses.length === 0 ? (
        <GlassSurface
          variant="content"
          shadow="glow"
          class_name="rounded-xl"
        >
          <EmptyState
            variant="custom"
            icon={<FiMapPin size={36} />}
            title="Sin direcciones"
            description="Agrega una dirección para recibir tus compras"
            action={{
              label: 'Agregar dirección',
              on_click: on_add,
            }}
          />
        </GlassSurface>
      ) : (
        <div className="grid gap-4">
          {addresses.map((address) => (
            <GlassSurface
              key={address.id}
              variant="content"
              shadow="glow"
              class_name="p-5 rounded-xl"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Info de dirección */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-sm text-raios-text-high">
                      {address.label}
                    </span>
                    {address.is_default && (
                      <span className="px-2 py-0.5 text-xs bg-raios-primary/20 text-raios-primary rounded">
                        Principal
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-raios-text-high">
                    {address.name}
                  </p>
                  <p className="text-sm text-raios-text-support mt-1">
                    {address.street}
                  </p>
                  <p className="text-sm text-raios-text-support">
                    {address.colony}, {address.city}, {address.state} {address.zip}
                  </p>
                  <p className="text-sm text-raios-text-support mt-2">
                    {address.phone}
                  </p>
                </div>

                {/* Acciones */}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => on_edit?.(address.id)}
                    className="p-2 rounded-lg text-raios-text-support hover:text-raios-primary hover:bg-raios-primary/10 transition-colors"
                    aria-label="Editar dirección"
                  >
                    <FiEdit2 size={18} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => on_delete?.(address.id)}
                    className="p-2 rounded-lg text-raios-text-support hover:text-red-500 hover:bg-red-500/10 transition-colors"
                    aria-label="Eliminar dirección"
                  >
                    <FiTrash2 size={18} />
                  </motion.button>
                </div>
              </div>
            </GlassSurface>
          ))}
        </div>
      )}
    </div>
  );
}

export default AddressesSection;
