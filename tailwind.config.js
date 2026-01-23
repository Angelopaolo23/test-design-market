/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Asegúrate de que esta ruta sea correcta para tu proyecto React
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // 1. PALETA DE COLORES PERSONALIZADA (raios-primary, raios-secondary, etc.)
      colors: {
        "raios-primary": "#4A1FFF", // Azul Violeta Eléctrico (Acento/CTA)
        "raios-secondary": "#0A0218", // Morado Espacial Profundo (Fondo Base)
        "raios-tertiary": "#8E5CFF", // Lavanda Brillante (Luz/Efectos)
        "raios-text-high": "#FFFFFF", // Blanco Puro (Texto principal)
        "raios-text-support": "#A8A8B3", // Gris Claro (Metadatos/Soporte)
      },

      // 2. SISTEMA DE ESPACIADO DE 6PX
      spacing: {
        1: "6px", // 6px
        2: "12px", // 12px (Espaciado S)
        3: "18px", // 18px
        4: "24px", // 24px (Espaciado M)
        6: "36px", // 36px
        8: "48px", // 48px (Espaciado L)
        12: "72px", // 72px
        // La escala de Tailwind se mantiene, pero con múltiplos de 6px
      },

      // 3. DEFINICIÓN DE LA FAMILIA DE FUENTES
      fontFamily: {
        mono: ["Space Mono", "monospace"], // Encabezados y Títulos de Impacto
        sans: ["Montserrat", "sans-serif"], // Cuerpo de Texto y Legibilidad
      },

      // 4. ESCALA TIPOGRÁFICA
      fontSize: {
        xs: ["12px", "18px"], // Metadatos
        sm: ["14px", "22px"],
        base: ["16px", "24px"], // Párrafo
        lg: ["20px", "28px"], // H4
        xl: ["24px", "30px"], // H3 (Título de Obra)
        "2xl": ["36px", "40px"], // H2 (Sección Principal)
        "3xl": ["48px", "52px"], // H1 (Titular de Impacto)
      },
    },
  },
  plugins: [],
};
