class Building {
  constructor(pos, size) {
    this.pos = pos;
    this.size = size;
  }

  colliding(p) {
    const coliding = p.x > this.pos.x && p.y > this.pos.y && p.x < this.pos.x + this.size.x && p.y < this.pos.y + this.size.y
    if(coliding){
      fill(255,0,0)
      ellipse(p.x,p.y,5,5)
    }
    return coliding
  }
}