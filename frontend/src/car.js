class Car {
  constructor(pos) {
    this.pos = pos;
    this.initLines(pos)
    this.type = 'Car'
  }

  initLines(pos) {
    const carLength = 17.5
    const carHeight = 10
    const topLeft = createVector(pos.x, pos.y)
    const topRight = createVector(pos.x + carLength, pos.y)
    const bottomLeft = createVector(pos.x, pos.y + carHeight)
    const bottomRight = createVector(pos.x + carLength, pos.y + carHeight)
    
    this.lines = []
    const l1 = new Line(topLeft.x, topLeft.y, topRight.x, topRight.y)
    const l2 = new Line(topLeft.x, topLeft.y, bottomLeft.x, bottomLeft.y)
    const l3 = new Line(bottomRight.x, bottomRight.y, bottomLeft.x, bottomLeft.y)
    const l4 = new Line(bottomRight.x, bottomRight.y, topRight.x, topRight.y)

    this.lines.push(l1)
    this.lines.push(l2)
    this.lines.push(l3)
    this.lines.push(l4)
  }

  toStart() {
    this.initLines(this.pos)
  }

  move(direction) {
    this.lines.forEach(l => {
      l.p1.x += direction.x
      l.p1.y += direction.y
      l.p2.x += direction.x
      l.p2.y += direction.y
    })
  }

  colliding(l) {
    const intersections = []
    this.lines.forEach(blockLine => {
      const inters = checkLineIntersection(l, blockLine)
      if (inters) {
        intersections.push(inters)
      }
    })

    return intersections;
  }
}