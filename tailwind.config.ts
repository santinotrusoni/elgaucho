import type { Config } from 'tailwindcss';

// NUEVA IDENTIDAD VISUAL (rebrand pedido por el cliente):
// #D99058 (terracota) como color principal, #F4EDE3 (crema) como fondo.
//
// Truco de mantenimiento: en vez de renombrar clases en cada componente,
// se mantienen los MISMOS nombres de token que ya se usaban en toda la
// Home (base.black, neutral.white, accent) pero con los valores hex
// cambiados. Como el 90% del sitio ya seguía el patrón semántico
// "bg-base-black text-neutral-white" para fondo/texto principal, cambiar
// el valor acá reskinea todo el sitio de una sola vez. base.black ahora
// ES el crema de fondo; neutral.white ahora ES el texto oscuro. Los
// nombres quedan desalineados de su significado literal a propósito,
// documentado acá para quien continúe el proyecto.

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: {
          black: '#F4EDE3', // fondo principal del sitio (antes negro, ahora crema)
          dark: '#FFFFFF', // superficie de cards (antes gris oscuro, ahora blanco puro para contraste sobre crema)
          darker: '#EFE4D2', // superficie secundaria/hover (crema un poco más oscuro)
          surface: '#E9DCC5', // bordes/divisores sutiles
        },
        neutral: {
          white: '#2B2115', // texto principal (antes blanco, ahora tinta oscura cálida)
        },
        accent: {
          DEFAULT: '#D99058', // terracota — color principal de marca
          dark: '#B9724A', // hover/pressed
          light: '#E6AD7C', // variante clara para fondos suaves
        },
        // Tailwind's "white" se remapea acá también: todos los usos de
        // border-white/10, bg-white/[0.03], text-white/70, etc. (usados
        // como "línea/tinte sutil sobre el fondo") ahora tiñen con la
        // tinta oscura en vez de blanco puro — necesario porque el fondo
        // pasó de oscuro a claro y un tinte "blanco" ya no se vería.
        white: '#2B2115',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        ui: ['var(--font-body)', 'sans-serif'],
      },
      fontSize: {
        // Tipografía fluida con clamp() (Parte de optimización mobile):
        // escala sola entre 320px y 1920px sin necesitar breakpoints manuales.
        'hero-mobile': ['clamp(2.5rem, 10vw, 3.75rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'hero-desktop': ['clamp(4rem, 9vw, 9rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'section-title': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      spacing: {
        section: '10rem',
        'section-mobile': '5rem',
      },
      backdropBlur: {
        glass: '20px',
      },
      boxShadow: {
        glow: '0 0 60px rgba(217, 144, 88, 0.35)', // glow ahora en tono terracota
        'glow-sm': '0 0 30px rgba(217, 144, 88, 0.25)',
        card: '0 10px 40px -10px rgba(43, 33, 21, 0.15)', // sombra suave cálida para cards sobre fondo claro
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
