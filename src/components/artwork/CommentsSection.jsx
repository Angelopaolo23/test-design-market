import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMessageCircle, FiHeart, FiSend } from 'react-icons/fi';
import { GlassSurface } from '../ui/GlassSurface';

/**
 * CommentsSection - Sección de comentarios de una obra
 *
 * @param {Object} props
 * @param {Array} props.comments - Lista de comentarios
 * @param {Function} props.on_submit - Callback al enviar comentario
 * @param {Function} props.on_like - Callback al dar like a un comentario
 * @param {boolean} props.can_comment - Si el usuario puede comentar
 */
export function CommentsSection({
  comments = [],
  on_submit,
  on_like,
  can_comment = true,
}) {
  const [new_comment, set_new_comment] = useState('');
  const [is_submitting, set_is_submitting] = useState(false);

  const handle_submit = async (e) => {
    e.preventDefault();
    if (!new_comment.trim() || is_submitting) return;

    set_is_submitting(true);
    await on_submit?.(new_comment.trim());
    set_new_comment('');
    set_is_submitting(false);
  };

  // Formato de fecha relativa simple
  const format_date = (date_string) => {
    const date = new Date(date_string);
    const now = new Date();
    const diff_days = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diff_days === 0) return 'Hoy';
    if (diff_days === 1) return 'Ayer';
    if (diff_days < 7) return `Hace ${diff_days} días`;
    if (diff_days < 30) return `Hace ${Math.floor(diff_days / 7)} semanas`;
    return date.toLocaleDateString('es-MX', { month: 'short', day: 'numeric' });
  };

  return (
    <section className="py-8 md:py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-mono text-xl md:text-2xl text-raios-text-high flex items-center gap-3">
          <FiMessageCircle className="text-raios-primary" />
          Comentarios
          {comments.length > 0 && (
            <span className="text-base text-raios-text-support">
              ({comments.length})
            </span>
          )}
        </h2>
      </div>

      {/* Formulario de nuevo comentario */}
      {can_comment && (
        <form onSubmit={handle_submit} className="mb-8">
          <GlassSurface
            variant="light"
            shadow="none"
            className="p-4 rounded-xl"
          >
            <div className="flex gap-3">
              {/* Avatar placeholder del usuario actual */}
              <div className="w-10 h-10 rounded-full bg-raios-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-raios-primary text-sm font-mono">TU</span>
              </div>

              <div className="flex-1">
                <textarea
                  value={new_comment}
                  onChange={(e) => set_new_comment(e.target.value)}
                  placeholder="Escribe un comentario sobre esta obra..."
                  rows={3}
                  className="w-full bg-transparent border-none outline-none resize-none text-raios-text-high placeholder:text-raios-text-support/50"
                />

                <div className="flex justify-end mt-2">
                  <motion.button
                    whileHover={{ scale: new_comment.trim() ? 1.02 : 1 }}
                    whileTap={{ scale: new_comment.trim() ? 0.98 : 1 }}
                    type="submit"
                    disabled={!new_comment.trim() || is_submitting}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-raios-primary text-white text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-raios-primary/90 transition-colors"
                  >
                    <FiSend size={16} />
                    {is_submitting ? 'Enviando...' : 'Comentar'}
                  </motion.button>
                </div>
              </div>
            </div>
          </GlassSurface>
        </form>
      )}

      {/* Lista de comentarios */}
      {comments.length === 0 ? (
        <div className="text-center py-12">
          <FiMessageCircle size={48} className="mx-auto text-raios-text-support/30 mb-4" />
          <p className="text-raios-text-support">
            Aún no hay comentarios. ¡Sé el primero en comentar!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <GlassSurface
              key={comment.id}
              variant="light"
              shadow="none"
              className="p-4 rounded-xl"
            >
              <div className="flex gap-3">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {comment.user_avatar ? (
                    <img
                      src={comment.user_avatar}
                      alt={comment.user_name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-raios-tertiary/20 flex items-center justify-center">
                      <span className="text-raios-tertiary text-sm font-mono">
                        {comment.user_name?.charAt(0).toUpperCase() || '?'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Contenido */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-sm text-raios-text-high">
                      {comment.user_name}
                    </span>
                    <span className="text-xs text-raios-text-support">
                      {format_date(comment.created_at)}
                    </span>
                  </div>

                  <p className="text-raios-text-high text-sm leading-relaxed">
                    {comment.content}
                  </p>

                  {/* Acciones */}
                  <div className="flex items-center gap-4 mt-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => on_like?.(comment.id)}
                      className={`
                        flex items-center gap-1.5 text-xs transition-colors
                        ${comment.is_liked
                          ? 'text-raios-primary'
                          : 'text-raios-text-support hover:text-raios-primary'
                        }
                      `}
                    >
                      <FiHeart
                        size={14}
                        className={comment.is_liked ? 'fill-current' : ''}
                      />
                      {comment.likes_count > 0 && comment.likes_count}
                    </motion.button>
                  </div>
                </div>
              </div>
            </GlassSurface>
          ))}
        </div>
      )}
    </section>
  );
}

export default CommentsSection;
