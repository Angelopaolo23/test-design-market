/**
 * Container - Wrapper responsive con max-width
 *
 * @param {Object} props
 * @param {'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'} props.size - Ancho máximo
 * @param {boolean} props.is_centered - Centrar contenido
 * @param {string} props.class_name - Clases adicionales
 * @param {React.ReactNode} props.children - Contenido
 */
export function Container({
  size = 'xl',
  is_centered = true,
  class_name = '',
  children,
}) {
  const size_classes = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
  };

  return (
    <div
      className={`
        ${size_classes[size]}
        ${is_centered ? 'mx-auto' : ''}
        px-4 sm:px-6 lg:px-8
        ${class_name}
      `}
    >
      {children}
    </div>
  );
}

export default Container;
