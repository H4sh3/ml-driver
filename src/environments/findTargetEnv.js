class FindTargetEnv {
  constructor() {
    this.bs = width / 16
    this.agentStart = createVector(width / 2, height / 2)
    this.buildings = []
    this.checkpoints = []
    this.addBuildings(this.bs)
    this.addCheckpoints(this.bs)
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
    return getSensorCollisionsWith(agent, this.buildings, true)
  }

  addBuildings(bs) {
    const lines = [
      new Line(1 * bs, 1 * bs, 1 * bs, 8 * bs),
      new Line(1 * bs, 1 * bs, 15 * bs, 1 * bs),
      new Line(15 * bs, 1 * bs, 15 * bs, 8 * bs),
      new Line(1 * bs, 8 * bs, 15 * bs, 8 * bs),
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
      new Line(14 * bs, 2 * bs, 13 * bs, 3 * bs),
      new Line(14 * bs, 6 * bs, 13 * bs, 7 * bs),
      new Line(2 * bs, 6 * bs, 3 * bs, 7 * bs),
      new Line(2 * bs, 2 * bs, 3 * bs, 3 * bs),
    ]

    checkpoints.forEach(l => {
      const block = new Block()
      block.lines.push(l)
      this.checkpoints.push(block)
    })
  }
}