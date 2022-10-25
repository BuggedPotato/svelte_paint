export default {
  clear: (e, c) => {
    const ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
  },
};
