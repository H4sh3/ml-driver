class Intersection {
  constructor(w) {
    this.bs = w/16
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
    const carSensorData = getSensorCollisionsWith(agent, carsToCheck, this.showSensors)
    const buildingSensorData = getSensorCollisionsWith(agent, this.buildings, this.showSensors)
    const input = [...carSensorData, ...buildingSensorData]
    return input
  }

  addRoads() {
    this.roads.push(new Road(createVector(this.bs * 9, 3 * this.bs), createVector(-2, 0), 150))
    this.roads.push(new Road(createVector(this.bs * 9, this.bs * 5.5), createVector(-3, 0), 250))
    this.roads.push(new Road(createVector(this.bs * 9, this.bs * 6.5), createVector(-3, 0), 250))
  }

  getCars() {
    let cars = []
    this.roads.forEach(r => {
      cars = [...cars, ...r.cars]
    })
    return cars
  }

  addBuildings(bs) {
    const left = bs * 2
    const right = bs * 5
    const bottom = bs * 5
    const top = bs * 2;

    const lines = [
      new Line(left, top, right, top),
      new Line(left, bottom, right, bottom),
      new Line(left, top, left, bottom),
      new Line(right, top, right, bottom),
      new Line(0, 0, right + 2 * bs, 0),
      new Line(0, bottom + 2 * bs, right + 2 * bs, bottom + 2 * bs),
      new Line(0, bottom + 2 * bs, 0, 0),
      new Line(right + 2 * bs, bottom + 2 * bs, right + 2 * bs, 0),
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
    const bottom = bs * 5

    const checkpoints = [
      new Line(bs * 4, 0, bs * 4, 2 * bs),
      new Line(right + bs * 2, 3 * bs, right, 3 * bs),
      new Line(bs * 3, bottom, bs * 3, bottom + bs * 2),
      new Line(left - bs, 3 * bs, left + bs, 3 * bs),
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