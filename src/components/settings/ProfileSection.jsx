import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCamera, FiCheck } from 'react-icons/fi';
import { GlassSurface } from '../ui/GlassSurface';
import { Input } from '../ui/Input';
import { FormField } from '../ui/FormField';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';

/**
 * ProfileSection - Sección de perfil en Settings
 *
 * Incluye: avatar, nombre, username, email, bio
 */
export function ProfileSection({ on_save }) {
  // Estado mock del formulario
  const [form_data, set_form_data] = useState({
    name: 'Elena Vega',
    username: 'elenavega',
    email: 'elena@example.com',
    bio: 'Artista visual explorando la intersección entre lo digital y lo analógico. Especializada en fotografía nocturna y arte generativo.',
  });

  const [is_saving, set_is_saving] = useState(false);

  const handle_change = (field, value) => {
    set_form_data((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handle_save = async () => {
    set_is_saving(true);
    // Simular guardado
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set_is_saving(false);
    on_save?.();
  };

  return (
    <GlassSurface
      variant="content"
      shadow="subtle"
      class_name="p-5 md:p-6 rounded-xl"
    >
      {/* Header */}
      <h2 className="font-mono text-lg text-raios-text-high mb-6">
        Perfil
      </h2>

      {/* Avatar */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
            alt="Avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute bottom-0 right-0 p-2 rounded-full bg-raios-primary text-white shadow-lg"
            aria-label="Cambiar avatar"
          >
            <FiCamera size={14} />
          </motion.button>
        </div>
        <div>
          <p className="font-mono text-raios-text-high">{form_data.name}</p>
          <p className="text-sm text-raios-text-support">@{form_data.username}</p>
        </div>
      </div>

      {/* Formulario */}
      <div className="space-y-5">
        {/* Nombre */}
        <FormField label="Nombre" required>
          <Input
            value={form_data.name}
            on_change={(value) => handle_change('name', value)}
            placeholder="Tu nombre"
          />
        </FormField>

        {/* Username */}
        <FormField
          label="Username"
          helper_text="Tu identificador único en RAIOS"
        >
          <Input
            value={form_data.username}
            on_change={(value) => handle_change('username', value)}
            placeholder="username"
          />
        </FormField>

        {/* Email */}
        <FormField
          label="Email"
          required
          helper_text="No compartiremos tu email con nadie"
        >
          <Input
            type="email"
            value={form_data.email}
            on_change={(value) => handle_change('email', value)}
            placeholder="tu@email.com"
          />
        </FormField>

        {/* Bio */}
        <FormField
          label="Biografía"
          helper_text="Cuéntanos sobre ti y tu trabajo"
        >
          <Textarea
            value={form_data.bio}
            on_change={(value) => handle_change('bio', value)}
            placeholder="Escribe algo sobre ti..."
            rows={4}
            max_length={300}
            show_count
          />
        </FormField>

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
    </GlassSurface>
  );
}

export default ProfileSection;
