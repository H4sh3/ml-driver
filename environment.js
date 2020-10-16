class Environment {
  constructor() {
    this.props = {
      popsize: 100
    }
    this.i = 0;
    this.maxI = 300;
    this.e = 0;
    this.maxE = 120;

    this.learningRate = 0.1

    this.environment = new Race()
    this.startPosition = createVector(this.environment.bs*3, this.environment.bs*1.5)
    this.initAgents()
    this.target = createVector(width / 2, height - 10)
  }

  draw() {
    this.agents.forEach(drawAgent)
    drawEnvironment(this.environment)
    fill(255, 0, 0)
    ellipse(this.target.x, this.target.y, 5, 5)
  }

  reset() {
    this.i = 0;
    this.agents.forEach(a => {
      a.pos = this.startPosition.copy()
      a.reset()
    })

    //this.learningRate *= 0.5
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
    // check collision with building
    if (this.environment.buildings.some(b => b.colliding(agent.pos))) {
      agent.kill()
    }

    // kill if agent leaves city
    if (agent.pos.x > width || agent.pos.x < 0 || agent.pos.y < 0 || agent.pos.y > height) {
      agent.kill()
    }


    if (agent.alive) {
      const inputs = []

      // sensors
      agent.sensors.forEach(s => {
        const current = s.pos.copy().rotate(s.rot)
        current.rotate(agent.vel.heading())
        current.add(agent.pos)
        if (this.environment.buildings.some(b => b.colliding(current))) {
          inputs.push(1)
        } else {
          inputs.push(0)
        }
      })


      // position
      const x = map(agent.pos.x, 0, width, 0, 1)
      const y = map(agent.pos.y, 0, height, 0, 1)
      const heading = map(agent.vel.heading(), 0, 360, 0, 1)
      inputs.push(x)
      inputs.push(y)
      inputs.push(heading)
    
      agent.update(inputs)
    }
  }

  evaluate() {
    let closestDist = Infinity
    let bestNeuralNet = this.agents[0].nn

    const alive = this.agents.filter(a => a.alive)
    if (alive.length === 0) {
      this.initAgents()
      return;
    }
    this.agents.forEach(a => {
      const dist = a.pos.dist(this.target)
      if (dist < closestDist) {
        closestDist = dist
        bestNeuralNet = a.nn
      }
    })

    console.log(`Closest was ${closestDist}`)
    console.log(`best one had ${bestNeuralNet.hidden_nodes}`)

    // repopulate
    this.agents = []
    this.agents.push(new Agent(this.startPosition, bestNeuralNet))
    while (this.agents.length < this.props.popsize) {
      if (this.agents.length < this.props.popsize * 0.9) { // fill 90% of population with mutations of best from last generation
        const a = new Agent(this.startPosition, bestNeuralNet.copy().mutate(this.learningRate))
        this.agents.push(a)
      } else {
        this.agents.push(new Agent(this.startPosition))
      }
    }

  }

  running() {
    return !this.done()
  }

  done() {
    return this.i > this.maxI
  }


}
