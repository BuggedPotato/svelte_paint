export const tools = {
  brushSizeFromInput: (e) => {
    return Math.ceil(e.target.value ** 3);
  },
  swapColours: (paint) => {
    const foo = paint.colour.secondary;
    paint.colour.secondary = paint.colour.primary;
    paint.colour.primary = foo;
    // paint = paint; // svelte intensifies
  },
};
