class TargetEnv {
  constructor() {
    this.bs = 30
    this.type = 'RaceEnv'
    this.buildings = []
    this.checkpoints = []
    this.addBuildings(this.bs)
    this.addCheckpoints(this.bs)
    this.bounds = getBounds(this.checkpoints)
    this.showSensors = false
    this.textPosition = createVector(125, 200)
    this.requiredCheckpoints = 2
    this.episodesBeforeRestart = 30
    this.agentSettings = {
      start: createVector(this.bs * 3.7, this.bs * 2.9),
      inputFactor: 1,
      extraInputs: 2,
      accReduction: 2,
      velReduction: 1.15,
      steerRange: 5,
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
    const nextCP = this.checkpoints[agent.reachedCheckpoints % this.checkpoints.length]
    const cpXcenter = (nextCP.lines[0].p1.x + nextCP.lines[0].p2.x) / 2
    const cpYcenter = (nextCP.lines[0].p1.y + nextCP.lines[0].p2.y) / 2
    //fill(255, 0, 0)
    //ellipse(cpXcenter, cpYcenter, 5, 5)
    const directionToCheckpoint = agent.pos.copy().sub(createVector(cpXcenter, cpYcenter)).normalize()
    //line(agent.pos.x, agent.pos.y, agent.pos.x + (directionToCheckpoint.x * 5), agent.pos.y + (directionToCheckpoint.y * 5))
    return [...getSensorCollisionsWith(agent, this.buildings, this.showSensors), directionToCheckpoint.x, directionToCheckpoint.y]
  }

  addBuildings(bs) {
    const lines = []

    const n = 0
    const ymax = 17 * bs
    const xmax = 30 * bs

    lines.push(new Line(n, n, n, ymax))
    lines.push(new Line(xmax, n, xmax, ymax))
    lines.push(new Line(n, n, xmax, n))
    lines.push(new Line(n, ymax, xmax, ymax))

    const houses = 6

    for (let row = 0; row < houses; row += 1) {
      for (let col = 0; col < houses; col += 1) {
        const x = ((xmax / houses) * row) + bs
        const y = ((ymax / houses) * col) + bs
        lines.push(new Line(x, y, x + bs, y))
        lines.push(new Line(x, y + bs, x + bs, y + bs))
        lines.push(new Line(x, y, x, y + bs))
        lines.push(new Line(x + bs, y, x + bs, y + bs))
      }
    }


    const block = new Block()
    lines.forEach((l, index) => {
      text(index, (l.p1.x + l.p2.x) / 2, (l.p1.y + l.p2.y) / 2)
      block.lines.push(l)
    })
    this.buildings.push(block);
  }

  addCheckpoints(bs) {
    const checkpoints = [
    ]

    checkpoints.push(new Line(6.5 * bs, 1.5 * bs, 6.5 * bs, 4.4 * bs))
    checkpoints.push(new Line(11.5 * bs, 7 * bs, 11.5 * bs, 10 * bs))
    //checkpoints.push(new Line(16.5 * bs, 7 * bs, 16.5 * bs, 10 * bs))
    checkpoints.push(new Line(16.5 * bs, 13 * bs, 16.5 * bs, 16 * bs))
    checkpoints.push(new Line(21.5 * bs, 13 * bs, 21.5 * bs, 16 * bs))
    checkpoints.push(new Line(26.5 * bs, 13 * bs, 26.5 * bs, 16 * bs))

    checkpoints.forEach(l => {
      const block = new Block()
      block.lines.push(l)
      this.checkpoints.push(block)
    })
  }
}