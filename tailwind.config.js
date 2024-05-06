/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '40rem',
      md: '48rem',
      lg: '64rem',
      xl: '80rem',
      '2xl': '96rem',
    },
    colors: {
      main: '#eec589',
      contrast: '#0e2a86',
      overlay: 'rgba(0,0,0,0.5)',
      bg: '#f0f0f0',
      text: '#0e0e0e',
    },
    fontFamily: {
      sans: ['Signika', 'sans-serif'],
    },
    extend: {
      borderRadius: {
        inner: '1rem',
        outter: '1.5rem',
      },
    },
  },
  plugins: [],
};
