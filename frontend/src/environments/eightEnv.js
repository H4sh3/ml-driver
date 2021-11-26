class EightEnv {
  constructor() {
    this.bs = 30
    this.type = 'RaceEnv'
    this.buildings = []
    this.checkpoints = []
    this.addBuildings()
    this.addCheckpoints()

    this.bounds = getBounds(this.checkpoints)
    this.showSensors = false
    this.textPosition = createVector(125, 200)
    this.requiredCheckpoints = 45
    this.episodesBeforeRestart = 30
    this.agentSettings = {
      start: createVector(this.bs * 6.5, this.bs * 3.5),
      inputFactor: 1,
      extraInputs: 0,
      accReduction: 2,
      velReduction: 1.15,
      steerRange: 5,
    }

    this.dummyAgent = new Agent({ start: createVector(this.bs * 20, this.bs * 9), inputFactor: 1 })
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

  addBuildings() {
    const lines = [
      new Line(442.6000, 191.4808, 396.2000, 139.1106),
      new Line(396.2000, 243.8510, 349.8000, 191.4808),
      new Line(442.6000, 191.4808, 489.0000, 139.1106),
      new Line(489.0000, 243.8510, 535.4000, 191.4808),
      new Line(489.0000, 243.8510, 535.4000, 296.2212),
      new Line(442.6000, 296.2212, 489.0000, 348.5914),
      new Line(442.6000, 296.2212, 396.2000, 348.5914),
      new Line(396.2000, 243.8510, 349.8000, 296.2212),
      new Line(396.2000, 348.5914, 349.8000, 400.9616),
      new Line(349.8000, 400.9616, 280.2000, 427.1467),
      new Line(280.2000, 427.1467, 187.4000, 427.1467),
      new Line(187.4000, 427.1467, 117.8000, 400.9616),
      new Line(117.8000, 400.9616, 71.4000, 348.5914),
      new Line(71.4000, 348.5914, 48.2000, 270.0361),
      new Line(48.2000, 270.0361, 48.2000, 217.6659),
      new Line(48.2000, 217.6659, 71.4000, 139.1106),
      new Line(71.4000, 139.1106, 117.8000, 86.7404),
      new Line(117.8000, 86.7404, 187.4000, 60.5553),
      new Line(187.4000, 60.5553, 280.2000, 60.5553),
      new Line(396.2000, 139.1106, 349.8000, 86.7404),
      new Line(349.8000, 86.7404, 280.2000, 60.5553),
      new Line(349.8000, 191.4808, 303.4000, 139.1106),
      new Line(349.8000, 296.2212, 326.6000, 322.4063),
      new Line(326.6000, 322.4063, 303.4000, 348.5914),
      new Line(303.4000, 348.5914, 257.0000, 374.7765),
      new Line(187.4000, 374.7765, 257.0000, 374.7765),
      new Line(187.4000, 374.7765, 141.0000, 348.5914),
      new Line(141.0000, 348.5914, 117.8000, 296.2212),
      new Line(303.4000, 139.1106, 257.0000, 112.9255),
      new Line(257.0000, 112.9255, 187.4000, 112.9255),
      new Line(187.4000, 112.9255, 141.0000, 139.1106),
      new Line(141.0000, 139.1106, 117.8000, 191.4808),
      new Line(117.8000, 191.4808, 117.8000, 296.2212),
      new Line(489.0000, 139.1106, 535.4000, 86.7404),
      new Line(535.4000, 191.4808, 581.8000, 139.1106),
      new Line(535.4000, 296.2212, 581.8000, 348.5914),
      new Line(489.0000, 348.5914, 535.4000, 400.9616),
      new Line(535.4000, 400.9616, 605.0000, 427.1467),
      new Line(581.8000, 348.5914, 628.2000, 374.7765),
      new Line(605.0000, 427.1467, 697.8000, 427.1467),
      new Line(628.2000, 374.7765, 697.8000, 374.7765),
      new Line(744.2000, 348.5914, 697.8000, 374.7765),
      new Line(697.8000, 427.1467, 767.4000, 400.9616),
      new Line(767.4000, 400.9616, 813.8000, 348.5914),
      new Line(813.8000, 348.5914, 837.0000, 270.0361),
      new Line(837.0000, 217.6659, 837.0000, 270.0361),
      new Line(744.2000, 348.5914, 767.4000, 296.2212),
      new Line(767.4000, 296.2212, 767.4000, 191.4808),
      new Line(837.0000, 217.6659, 813.8000, 139.1106),
      new Line(767.4000, 191.4808, 744.2000, 139.1106),
      new Line(813.8000, 139.1106, 767.4000, 86.7404),
      new Line(767.4000, 86.7404, 697.8000, 60.5553),
      new Line(697.8000, 60.5553, 628.2000, 60.5553),
      new Line(628.2000, 60.5553, 605.0000, 60.5553),
      new Line(605.0000, 60.5553, 535.4000, 86.7404),
      new Line(744.2000, 139.1106, 697.8000, 112.9255),
      new Line(697.8000, 112.9255, 628.2000, 112.9255),
      new Line(581.8000, 139.1106, 628.2000, 112.9255),
    ]
    const block = new Block()
    lines.forEach((l, index) => {
      text(index, (l.p1.x + l.p2.x) / 2, (l.p1.y + l.p2.y) / 2)
      block.lines.push(l)
    })
    this.buildings.push(block);
  }

  addCheckpoints() {
    const checkpoints = [
      new Line(257.0000,112.9255,257.0000,60.5553),
      new Line(303.4000,139.1106,349.8000,86.7404),
      new Line(349.8000,191.4808,396.2000,139.1106),
      new Line(396.2000,243.8510,442.6000,191.4808),
      new Line(442.6000,296.2212,489.0000,243.8510),
      new Line(489.0000,348.5914,535.4000,296.2212),
      new Line(535.4000,400.9616,581.8000,348.5914),
      new Line(628.2000,427.1467,628.2000,374.7765),
      new Line(697.8000,427.1467,697.8000,374.7765),
      new Line(813.8000,348.5914,744.2000,348.5914),
      new Line(837.0000,243.8510,765.0000,243.8510),
      new Line(813.8000,139.1106,744.2000,139.1106),
      new Line(697.8000,60.5553,697.8000,112.9255),
      new Line(535.4000,86.7404,581.8000,139.1106),
      new Line(489.0000,139.1106,535.4000,191.4808),
      new Line(442.6000,191.4808,489.0000,243.8510),
      new Line(396.2000,243.8510,442.6000,296.2212),
      new Line(303.4000,348.5914,349.8000,400.9616),
      new Line(187.4000,374.7765,187.4000,427.1467),
      new Line(117.8000,296.2212,48.2000,296.2212),
      new Line(117.8000,217.6659,48.2000,217.6659),
      new Line(141.0000,139.1106,71.4000,139.1106),
      new Line(187.4000,112.9255,187.4000,60.5553),
      ]

    checkpoints.forEach(l => {
      const block = new Block()
      block.lines.push(l)
      this.checkpoints.push(block)
    })
  }
}