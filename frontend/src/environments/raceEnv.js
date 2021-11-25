class RaceEnv {
  constructor() {
    this.bs = 30
    this.type = 'RaceEnv'
    this.buildings = []
    this.checkpoints = []
    this.addBuildings(this.bs)
    this.addCheckpoints(this.bs)
    this.showSensors = false
    this.textPosition = createVector(125, 200)
    this.requiredCheckpoints = 8
    this.episodesBeforeRestart = 30
    this.agentSettings = {
      start: createVector(this.bs * 6.5, this.bs * 3.5),
      inputFactor: 1,
    }

    this.dummyAgent = new Agent({ start: createVector(this.bs * 17, this.bs * 11), inputFactor: 1 })
    const cS = getCurrentSettings()
    this.dummyAgent.initSensors(cS.sensor)
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

  draw(scaleF) {
    drawBuildings(this.buildings, scaleF)
    drawCheckpoints(this.checkpoints)
  }

  getInputs(agent) {
    return getSensorCollisionsWith(agent, this.buildings, this.showSensors)
  }

  addBuildings(bs) {
    const lines = [
      new Line(bs, bs, bs * 12, bs),
      new Line(bs * 18, bs, 28 * bs, bs),
      new Line(bs, bs, bs, 15 * bs),
      new Line(bs, 15 * bs, bs * 9, 15 * bs),
      new Line(bs * 15, 15 * bs, 26 * bs, 15 * bs),
      new Line(28 * bs, bs, 28 * bs, 8 * bs),
      new Line(26 * bs, 8 * bs, 28 * bs, 8 * bs),
      new Line(26 * bs, 8 * bs, 26 * bs, 15 * bs),
      new Line(bs * 12, bs * 1, bs * 12, bs * 6),
      new Line(bs * 18, bs * 1, bs * 18, bs * 6),
      new Line(bs * 12, bs * 6, bs * 18, bs * 6),
      new Line(bs * 20, bs * 4, bs * 26, bs * 4),
      new Line(bs * 26, bs * 4, bs * 26, bs * 6),
      new Line(bs * 20, bs * 4, bs * 20, bs * 8),
      new Line(bs * 24, bs * 6, bs * 26, bs * 6),
      new Line(bs * 16, bs * 13, bs * 24, bs * 13),
      new Line(bs * 24, bs * 6, bs * 24, bs * 13),
      new Line(bs * 10, bs * 8, bs * 20, bs * 8),
      new Line(bs * 10, bs * 8, bs * 10, bs * 4),
      new Line(bs * 4, bs * 4, bs * 10, bs * 4),
      new Line(bs * 4, bs * 4, bs * 4, bs * 14),
      new Line(bs * 12, bs * 11, bs * 4, bs * 14),
      new Line(bs * 12, bs * 11, bs * 16, bs * 13),
      new Line(bs * 12, bs * 13, bs * 15, bs * 15),
      new Line(bs * 12, bs * 13, bs * 9, bs * 15),
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
      new Line(10 * bs, 4 * bs, 12 * bs, 4 * bs),
      new Line(12 * bs, 6 * bs, 12 * bs, 8 * bs),
      new Line(18 * bs, 4 * bs, 20 * bs, 4 * bs),
      new Line(24 * bs, 1 * bs, 24 * bs, 4 * bs),
      new Line(26 * bs, 4 * bs, 28 * bs, 4 * bs),
      new Line(22 * bs, 13 * bs, 22 * bs, 15 * bs),
      new Line(12 * bs, 11 * bs, 12 * bs, 13 * bs),
      new Line(4 * bs, 14 * bs, 4 * bs, 15 * bs),
      new Line(1 * bs, 8 * bs, 4 * bs, 8 * bs),
    ]

    checkpoints.forEach(l => {
      const block = new Block()
      block.lines.push(l)
      this.checkpoints.push(block)
    })
  }
}