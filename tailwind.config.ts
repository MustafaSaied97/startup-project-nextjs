import { Config } from 'tailwindcss';
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      colors: {
        primary: '#F30303',
        primaryLighter: '#0758E7',
        secondary: '#1D1D1D',
        yellow: '#FFC400',

        dark: {
          1: '#000000',
          2: '#1E1E1E',
          3: '#292828',
        },
        light: {
          1: '#f5f5f5',
          2: '#C5C5C5',
          3: '#707070',
          4: '#F3F3F3',
        },
      },
      variants: {
        extend: {
          backgroundColor: ['dark'], // Enable dark mode variants
          textColor: ['dark'], // Enable dark mode variants
        },
      },
      screens: {
        xs: '495px',
        md: '819px',
        '3xl': '2400px',
      },
    },
  },
  plugins: [
    plugin(function ({
      addUtilities,
      addVariant,
      e,
      config,
    }: {
      addUtilities: (utilities: Record<string, any>) => void;
      addVariant: (name: string, ...arg: any) => void;
      [k: string]: any;
    }) {
      // Adding custom utilities for transition-behavior
      addUtilities({
        '.transition-allow-discrete': {
          transitionBehavior: 'allow-discrete',
        },
      });
      addVariant('starting-style', '@starting-style');
    }),
  ],
} satisfies Config;
