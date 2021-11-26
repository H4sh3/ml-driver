class TrafficEnv {
  constructor() {
    this.bs = 30
    this.type = 'TrafficEnv'
    this.buildings = []
    this.checkpoints = []
    this.roads = []
    this.addBuildings(this.bs)
    this.addRoads(this.bs)
    this.addCheckpoints(this.bs)
    this.bounds = getBounds(this.checkpoints)
    this.showSensors = false
    this.textPosition = createVector(450, 100)
    this.requiredCheckpoints = 4
    this.episodesBeforeRestart = 50
    this.agentSettings = {
      start: createVector(this.bs * 7.5, this.bs * 2.5),
      inputFactor: 2,
      extraInputs: 0,
      accReduction: 1.2,
      velReduction: 1.8,
      steerRange: 15,
    }

    this.dummyAgent = new Agent({ start: createVector(this.bs * 17, this.bs * 11), inputFactor: 1 })
    const cS = getCurrentSettings()
    this.dummyAgent.initSensors(cS.sensor)
  }


  toggleSensorVis() {
    this.showSensors = !this.showSensors
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
    const carsToCheck = this.getCars().filter(c => c.lines[0].p1.dist(agent.pos) < agent.sensorLength * 1.5);
    const carSensorData = getSensorCollisionsWith(agent, carsToCheck, this.showSensors);
    const walls = getSensorCollisionsWith(agent, this.buildings, this.showSensors);
    const input = [...carSensorData, ...walls];
    return input;
  }

  addRoads() {
    this.roads.push(new Road(createVector(this.bs * 14, 8 * this.bs), createVector(-2, 0), 100, 25))
    this.roads.push(new Road(createVector(this.bs * 14, 13 * this.bs), createVector(-2, 0), 250, 35))
  }

  getCars() {
    let cars = []
    this.roads.forEach(r => {
      cars = [...cars, ...r.cars]
    })
    return cars
  }

  addBuildings(bs) {
    const bs2 = bs * 2;
    const bs4 = bs * 4;
    const bs10 = bs * 10;
    const bs12 = bs * 12;
    const bs14 = bs * 14;

    const lines = [
      new Line(bs2, bs2, bs14, bs2),
      new Line(bs4, bs4, bs12, bs4),
      new Line(bs4, bs10, bs12, bs10),
      new Line(bs2, bs12, bs14, bs12),
      new Line(bs2, bs2, bs2, bs12),
      new Line(bs4, bs4, bs4, bs10),
      new Line(bs12, bs4, bs12, bs10),
      new Line(bs14, bs2, bs14, bs12),
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
    const bs2 = bs * 2;
    const bs4 = bs * 4;
    const bs10 = bs * 10;
    const bs12 = bs * 12;
    const bs14 = bs * 14;

    const checkpoints = [
      new Line(bs12, bs4, bs14, bs4),
      new Line(bs12, bs10, bs12, bs12),
      new Line(bs2, bs10, bs4, bs10),
      new Line(bs4, bs2, bs4, bs4),
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