module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    container: {
      // https://github.com/tailwindlabs/tailwindcss/issues/1102#issuecomment-751418459
      screens: {
        sm: '100%',
        md: '100%',
        lg: '540px',
        xl: '540px',
      },
    },
    extend: {},
  },
  variants: {
    extend: { opacity: ['disabled'], backgroundColor: ['disabled'] },
  },
  plugins: [require('@tailwindcss/forms')],
};
