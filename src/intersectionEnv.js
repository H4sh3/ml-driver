class Intersection {
  constructor() {
    this.bs = width / 16
    this.agentStart = createVector(this.bs * 2.5, this.bs * 0.5)
    this.buildings = []
    this.checkpoints = []
    this.roads = []
    this.addBuildings(this.bs)
    this.addRoads(this.bs)
    this.addCheckpoints(this.bs)
  }

  reset() {
    this.roads.forEach(r => {
      r.cars = []
    })
  }

  getCollisionObjects() {
    return [...this.buildings, ...this.getCars()]
  }

  draw() {
    drawBuildings(this.buildings)
    drawCheckpoints(this.checkpoints)
    drawCars(this.getCars())
  }

  getInputs(agent) {
    const carsToCheck = this.getCars().filter(c => c.lines[0].p1.dist(agent.pos) < agent.sensorLength * 1.5)
    const carSensorData = getSensorCollisionsWith(agent, carsToCheck)
    const buildingSensorData = getSensorCollisionsWith(agent, this.buildings)
    return [...carSensorData, ...buildingSensorData]
  }

  addRoads() {
    this.roads.push(new Road(createVector(650, 250), createVector(-2, 0), 150))
    this.roads.push(new Road(createVector(650, 420), createVector(-3, 0), 250))
    this.roads.push(new Road(createVector(0, 465), createVector(3, 0), 250))
  }

  getCars() {
    let cars = []
    this.roads.forEach(r => {
      cars = [...cars, ...r.cars]
    })
    return cars
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

  update(i) {
    this.roads.forEach(r => r.update(i))
  }

  addCheckpoints(bs) {
    const left = bs * 1
    const right = bs * 5
    const bottom = bs * 4

    const checkpoints = [
      new Line(bs * 5, 0, bs * 5, 1 * bs),
      new Line(right + bs, 3 * bs, right, 3 * bs),
      new Line(bs * 3, bottom, bs * 3, bottom + bs),
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