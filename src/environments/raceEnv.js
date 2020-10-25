class Race {
  constructor() {
    this.bs = 60
    this.agentStart = createVector(this.bs * 5.5, this.bs * 3.5)
    this.buildings = []
    this.checkpoints = []
    this.addBuildings(this.bs)
    this.addCheckpoints(this.bs)
    this.showSensors = true
  }
  toggleSensorVis() {
    this.showSensors = !this.showSensors
  }

  reset() {

  }

  update() {

  }

  getCollisionObjects() {
    return this.buildings
  }

  draw() {
    drawBuildings(this.buildings)
    drawCheckpoints(this.checkpoints)
  }

  getInputs(agent) {
    return getSensorCollisionsWith(agent, this.buildings,this.showSensors)
  }

  addBuildings(bs) {
    const lines = [
      new Line(bs, bs, bs * 6, bs),
      new Line(bs * 9, bs, 15* bs, bs),
      new Line(bs, bs, bs, 8 * bs),
      new Line(bs, 8 * bs, bs * 2, 8 * bs),
      new Line(bs * 7.5, 8 * bs, 13* bs, 8 * bs),
      new Line(15*bs, bs, 15*bs, 4 * bs),
      new Line(13 * bs, 4 * bs, 15* bs, 4 * bs),
      new Line(13 * bs, 4 * bs, 13 * bs, 8 * bs),
      new Line(bs * 6, bs * 1, bs * 6, bs * 3),
      new Line(bs * 9, bs * 1, bs * 9, bs * 3),
      new Line(bs * 6, bs * 3, bs * 9, bs * 3),
      new Line(bs * 10, bs * 2, bs * 14, bs * 2),
      new Line(bs * 14, bs * 2, bs * 14, bs * 3),
      new Line(bs * 10, bs * 2, bs * 10, bs * 4),
      new Line(bs * 12, bs * 3, bs * 14, bs * 3),
      new Line(bs * 8, bs * 7, bs * 12, bs * 7),
      new Line(bs * 12, bs * 3, bs * 12, bs * 7),
      new Line(bs * 5, bs * 4, bs * 10, bs * 4),
      new Line(bs * 5, bs * 4, bs * 5, bs * 2),
      new Line(bs * 2, bs * 2, bs * 5, bs * 2),
      new Line(bs * 2, bs * 2, bs * 2, bs * 7),
      new Line(bs * 4, bs * 6.5, bs * 4.5, bs * 7),
      new Line(bs * 6, bs * 5.5, bs * 4.5, bs * 7),
      new Line(bs * 4, bs * 6.5, bs * 2, bs * 7),
      new Line(bs * 6, bs * 5.5, bs * 8, bs * 7),
      new Line(bs * 6, bs * 6.5, bs * 7.5, bs * 8),
      new Line(bs * 6, bs * 6.5, bs * 4.5, bs * 8),
      new Line(bs * 3.5, bs * 7.5, bs * 4.5, bs * 8),
      new Line(bs * 3.5, bs * 7.5, bs * 2, bs * 8),
    ]


    const block = new Block()
    lines.forEach((l, index) => {
      text(index, (l.p1.x + l.p2.x) / 2, (l.p1.y + l.p2.y) / 2)
      block.lines.push(l)
    })
    this.buildings.push(block);
  }

  addCheckpoints(bs) {
    const checkpoints = [
      new Line(5 * bs, 2 * bs, 6 * bs, 2 * bs),
      new Line(6 * bs, 3 * bs, 6 * bs, 4 * bs),
      new Line(9 * bs, 2 * bs, 10 * bs, 2 * bs),
      new Line(12 * bs, 1 * bs, 12 * bs, 2 * bs),
      new Line(14 * bs, 2 * bs, 15 * bs, 2 * bs),
      new Line(11 * bs, 7 * bs, 11 * bs, 8 * bs),
      new Line(4.5 * bs, 7 * bs, 4.5 * bs, 8 * bs),
      new Line(2 * bs, 7 * bs, 2 * bs, 8 * bs),
      new Line(1 * bs, 4 * bs, 2 * bs, 4 * bs),
    ]

    checkpoints.forEach(l => {
      const block = new Block()
      block.lines.push(l)
      this.checkpoints.push(block)
    })
  }
}