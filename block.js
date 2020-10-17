class Block {
  constructor(pos, size, id) {
    this.pos = pos;
    this.size = size;
    this.id = id ? id : `id:${random()}`
  }

  colliding(p) {
    const coliding = p.x > this.pos.x && p.y > this.pos.y && p.x < this.pos.x + this.size.x && p.y < this.pos.y + this.size.y
    if(coliding){
      ellipse(p.x,p.y,5,5)
    }
    return coliding
  }
}