module.exports = {
  content: ["./index.html", "./src/**/*.{svelte,js,ts}"],
  theme: {
    extend: {
      cursor: {
        reticle: 'url("./src/assets/reticle_cursor.png") 64 64, crosshair',
      },
    },
  },
  plugins: [],
};
