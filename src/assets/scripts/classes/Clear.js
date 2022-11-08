export class Clear {
  draw(c) {
    c.getContext("2d").clearRect(0, 0, c.width, c.height);
  }
}
