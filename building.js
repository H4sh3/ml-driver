class Building {
  constructor(pos, size) {
    this.pos = pos;
    this.size = size;
  }

  colliding(p) {
    return p.x > this.pos.x && p.y > this.pos.y && p.x < this.pos.x + this.size.x && p.y < this.pos.y + this.size.y
  }
}