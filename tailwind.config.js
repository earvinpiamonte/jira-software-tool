module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      // https://github.com/tailwindlabs/tailwindcss/issues/1102#issuecomment-751418459
      screens: {
        sm: "100%",
        md: "100%",
        lg: "640px",
        xl: "640px",
      },
    },
    extend: {},
  },
  variants: {
    extend: { opacity: ["disabled"] },
  },
  plugins: [],
};
