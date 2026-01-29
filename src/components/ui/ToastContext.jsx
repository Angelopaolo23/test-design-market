import { createContext, useContext, useState, useCallback } from 'react';
import { ToastContainer } from './ToastContainer';

/**
 * Toast Context - Sistema de notificaciones global
 *
 * Provee un contexto para mostrar toasts desde cualquier
 * parte de la aplicación usando el hook useToast.
 */

// Contexto
const ToastContext = createContext(null);

// Generador de IDs únicos
let toast_id_counter = 0;
const generate_toast_id = () => {
  toast_id_counter += 1;
  return `toast-${toast_id_counter}-${Date.now()}`;
};

/**
 * ToastProvider - Wrapper que provee el contexto de toasts
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido de la app
 * @param {string} props.position - Posición de los toasts
 */
export function ToastProvider({
  children,
  position = 'top-right',
}) {
  const [toasts, set_toasts] = useState([]);

  // Agregar un toast
  const add_toast = useCallback((toast_props) => {
    const id = generate_toast_id();
    const new_toast = {
      id,
      ...toast_props,
    };

    set_toasts((prev) => [...prev, new_toast]);
    return id;
  }, []);

  // Remover un toast por ID
  const dismiss_toast = useCallback((id) => {
    set_toasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  // Remover todos los toasts
  const dismiss_all = useCallback(() => {
    set_toasts([]);
  }, []);

  // Helpers para tipos específicos
  const toast = useCallback((props) => add_toast(props), [add_toast]);

  const toast_success = useCallback(
    (title, message) => add_toast({ type: 'success', title, message }),
    [add_toast]
  );

  const toast_error = useCallback(
    (title, message) => add_toast({ type: 'error', title, message }),
    [add_toast]
  );

  const toast_warning = useCallback(
    (title, message) => add_toast({ type: 'warning', title, message }),
    [add_toast]
  );

  const toast_info = useCallback(
    (title, message) => add_toast({ type: 'info', title, message }),
    [add_toast]
  );

  const context_value = {
    toasts,
    toast,
    toast_success,
    toast_error,
    toast_warning,
    toast_info,
    dismiss: dismiss_toast,
    dismiss_all,
  };

  return (
    <ToastContext.Provider value={context_value}>
      {children}
      <ToastContainer
        toasts={toasts}
        on_dismiss={dismiss_toast}
        position={position}
      />
    </ToastContext.Provider>
  );
}

/**
 * useToast - Hook para acceder al sistema de toasts
 *
 * @returns {Object} Métodos para mostrar y gestionar toasts
 *
 * @example
 * const { toast_success, toast_error } = useToast();
 * toast_success('Guardado', 'Los cambios se guardaron correctamente');
 * toast_error('Error', 'No se pudo guardar');
 */
export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast debe usarse dentro de un ToastProvider');
  }

  return context;
}

export default ToastProvider;
