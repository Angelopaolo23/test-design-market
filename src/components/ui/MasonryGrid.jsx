/**
 * MasonryGrid - Layout de grilla irregular reutilizable
 *
 * Usa CSS columns para crear un efecto masonry sin dependencias JS.
 * Responsive mobile-first: 1 col → 2 cols → 3 cols → 4 cols
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Elementos a renderizar en la grilla
 * @param {number} props.columns_mobile - Columnas en mobile (default: 1)
 * @param {number} props.columns_md - Columnas en md breakpoint (default: 2)
 * @param {number} props.columns_lg - Columnas en lg breakpoint (default: 3)
 * @param {number} props.columns_xl - Columnas en xl breakpoint (default: 4)
 * @param {string} props.gap - Gap entre items (default: '4px')
 * @param {string} props.className - Clases adicionales para el contenedor
 */
export function MasonryGrid({
  children,
  columns_mobile = 1,
  columns_md = 2,
  columns_lg = 3,
  columns_xl = 4,
  gap = '4px',
  className = '',
}) {
  // Generar ID único para los estilos scoped
  const grid_id = `masonry-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <>
      <div className={`${grid_id} ${className}`}>
        {children}
      </div>

      <style>{`
        .${grid_id} {
          column-count: ${columns_mobile};
          column-gap: ${gap};
        }

        .${grid_id} > * {
          break-inside: avoid;
          page-break-inside: avoid;
          margin-bottom: ${gap};
        }

        /* md: 768px */
        @media (min-width: 768px) {
          .${grid_id} {
            column-count: ${columns_md};
          }
        }

        /* lg: 1024px */
        @media (min-width: 1024px) {
          .${grid_id} {
            column-count: ${columns_lg};
          }
        }

        /* xl: 1280px */
        @media (min-width: 1280px) {
          .${grid_id} {
            column-count: ${columns_xl};
          }
        }
      `}</style>
    </>
  );
}

export default MasonryGrid;
