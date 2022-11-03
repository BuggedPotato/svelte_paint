module.exports = {
  content: ["./index.html", "./src/**/*.{svelte,js,ts}"],
  theme: {
    extend: {
      cursor: {
        reticle: 'url("./src/assets/reticle_cursor.cur") 32 32, crosshair',
      },
    },
  },
  plugins: [],
};
