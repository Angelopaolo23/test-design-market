/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // 1. PALETA DE COLORES PERSONALIZADA
      colors: {
        "raios-primary": "rgb(74 31 255 / <alpha-value>)", // #4A1FFF - Azul Violeta Eléctrico
        "raios-secondary": "rgb(10 2 24 / <alpha-value>)", // #0A0218 - Morado Espacial Profundo
        "raios-tertiary": "rgb(142 92 255 / <alpha-value>)", // #8E5CFF - Lavanda Brillante
        "raios-text-high": "rgb(255 255 255 / <alpha-value>)", // #FFFFFF - Blanco Puro
        "raios-text-support": "rgb(168 168 179 / <alpha-value>)", // #A8A8B3 - Gris Claro
      },

      // 2. SISTEMA DE ESPACIADO DE 6PX
      spacing: {
        1: "6px",
        2: "12px",
        3: "18px",
        4: "24px",
        6: "36px",
        8: "48px",
        12: "72px",
      },

      // 3. TIPOGRAFÍA
      fontFamily: {
        mono: ["Space Mono", "monospace"],
        sans: ["Montserrat", "sans-serif"],
      },

      fontSize: {
        xs: ["12px", "18px"],
        sm: ["14px", "22px"],
        base: ["16px", "24px"],
        lg: ["20px", "28px"],
        xl: ["24px", "30px"],
        "2xl": ["36px", "40px"],
        "3xl": ["48px", "52px"],
      },

      // 4. SOMBRAS PERSONALIZADAS (migrado de tokens.css)
      boxShadow: {
        // Sombras de elevación
        "raios-sm": "0 1px 2px rgba(0, 0, 0, 0.3)",
        "raios-md": "0 4px 8px rgba(0, 0, 0, 0.4)",
        "raios-lg": "0 8px 24px rgba(0, 0, 0, 0.5)",
        // Glow para botón primario
        "glow-primary": "0 0 20px rgba(74, 31, 255, 0.4)",
        // Glows de jerarquía visual (usados en GlassSurface)
        "glow-high": "0 0 30px rgba(74, 31, 255, 0.5)",
        "glow": "0 0 20px rgba(74, 31, 255, 0.3)",
        "glow-subtle": "0 0 12px rgba(74, 31, 255, 0.15)",
        // Sombras de flotación
        "float": "0 8px 32px rgba(0, 0, 0, 0.4)",
        "subtle": "0 4px 16px rgba(0, 0, 0, 0.2)",
      },

      // 5. TRANSICIONES
      transitionDuration: {
        "fast": "150ms",
        "normal": "250ms",
        "slow": "400ms",
      },

      // 6. GLASSMORPHISM (colores base)
      backgroundColor: {
        "glass-surface": "rgba(10, 2, 24, 0.75)",
        "glass-content": "rgba(10, 2, 24, 0.60)",
      },

      // 7. BACKDROP BLUR
      backdropBlur: {
        "glass": "12px",
      },

      // 8. BORDER COLORS
      borderColor: {
        "glass": "rgba(142, 92, 255, 0.2)",
      },
    },
  },
  plugins: [],
};
