class Intersection {
  constructor() {
    this.bs = width / 16
    this.buildings = []
    this.checkpoints = []
    this.addBuildings(this.bs)
    this.addCheckpoints(this.bs)

    this.carMin = 2 * this.bs
    this.carSpawnX = 6 * this.bs
    this.cars = []
  }

  addCar() {
    // this.cars.push(new Car(createVector(650+random(-15,15), 135)))
    // this.cars.push(new Car(createVector(650+random(-15,15), 235)))
    // this.cars.push(new Car(createVector(650+random(-15,15), 335)))
    if(random() > 0.4){
      this.cars.push(new Car(createVector(600+random(-15,15), 410+random(1,10))))
    }
    this.cars.push(new Car(createVector(600+random(-15,15), 465+random(-5,5))))
  }

  addBuildings(bs) {
    const left = bs * 1
    const right = bs * 5
    const bottom = bs * 4

    const lines = [
      new Line(left, bs, right, bs),
      new Line(left, bottom, right, bottom),
      new Line(left, bs, left, bottom),
      new Line(right, bs, right, bottom),

      new Line(left - bs, 0, right + bs, 0),
      new Line(left - bs, bottom + bs, right + bs, bottom + bs),
      new Line(left - bs, 0, left - bs, bottom + bs),
      new Line(right + bs, 0, right + bs, bottom + bs),
    ]


    const block = new Block()
    lines.forEach((l, index) => {
      text(index, (l.p1.x + l.p2.x) / 2, (l.p1.y + l.p2.y) / 2)
      block.lines.push(l)
    })
    this.buildings.push(block);
  }

  addCheckpoints(bs) {
    const left = bs * 1
    const right = bs * 5
    const bottom = bs * 4

    const checkpoints = [
      new Line(bs * 6, 0, bs * 3, 1 * bs),
      new Line(right + bs, 3 * bs, right, 3 * bs),
      // new Line(right + bs, 7 * bs, right, 7 * bs),
      new Line(bs * 3, bottom, bs * 3, bottom+bs),
      // new Line(left - bs, 7 * bs, left, 7 * bs),
      new Line(left - bs, 3 * bs, left, 3 * bs),
    ]

    checkpoints.forEach(l => {
      stroke(255, 0, 0)
      line(l.p1.x, l.p1.y, l.p2.x, l.p2.y)
      const block = new Block()
      block.lines.push(l)
      this.checkpoints.push(block)
    })
  }
}