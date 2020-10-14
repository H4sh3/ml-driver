class Environment {
  constructor() {
    this.props = {
      popsize: 1
    }
    this.i = 0;
    this.maxI = 150;
    this.e = 0;
    this.maxE = 20;

    this.city = new City()
    this.startPosition = createVector(125, height - 250)
    this.initAgents()
  }

  draw() {
    drawAgent(this.agents[0])
    drawCity(this.city)
  }

  reset() {
    this.i = 0;
    this.agents.forEach(a => {
      a.pos = this.startPosition.copy()
      a.reset()
    })
  }

  initAgents() {
    this.agents = []
    for (let i = 0; i < this.props.popsize; i++) {
      this.agents.push(new Agent(this.startPosition.copy()))
    }
  }

  run() {
    text(this.i, width / 2, height / 2)
    this.updateAgents()
    this.i++
  }

  updateAgents() {
    this.agents.forEach(agent => this.updateAgent(agent))
  }

  updateAgent(agent) {
    const inputs = []
    agent.sensors.forEach(sensor => {
      if (this.city.buildings.some(b => b.colliding(sensor))) {
        inputs.push(1)
      } else {
        inputs.push(0)
      }
    })
    agent.update(inputs)
  }

  running() {
    return !this.done()
  }

  done() {
    return this.i > this.maxI
  }
}
