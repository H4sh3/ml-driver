class Environment {
  constructor() {
    this.props = {
      popsize: 50
    }
    this.i = 0;
    this.maxI = 1000;
    this.e = 0;
    this.maxE = 250;

    this.learningRate = 0.01

    this.environment = new Race()
    this.startPosition = createVector(this.environment.bs * 3, this.environment.bs * 1.5)
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

    // check collision with checkpoints
    const nextCheckpoint = this.environment.checkpoints[agent.reachedCheckpoints]
    if (nextCheckpoint.colliding(agent.pos)) {
      agent.reachedCheckpoints++;
    }

    // kill if agent leaves city
    if (agent.pos.x > width || agent.pos.x < 0 || agent.pos.y < 0 || agent.pos.y > height) {
      agent.kill()
    }


    if (agent.alive) {
      const inputs = []

      // sensors
      agent.sensors.forEach(a => {

        this.updateCheckpointDist(agent)
        const current = a.pos.copy().rotate(a.rot)
        current.rotate(agent.vel.heading())
        current.add(agent.pos)
        const maxMag = a.pos.mag()
        const collisions = this.environment.buildings.filter(b => b.colliding(current))

        if (collisions.length === 0) {
          inputs.push(1)
        } else {
          let foundNonColliding = false;
          for (let i = 1; i > 0.1; i -= 0.1) {
            const downscaled = a.pos.copy().mult(i).rotate(a.rot)
            downscaled.rotate(agent.vel.heading())
            downscaled.add(agent.pos)
            if (!collisions[0].colliding(downscaled)) {
              const downscaled = a.pos.copy().mult(i + 0.1)
              const v = map(downscaled.mag(), 0, maxMag, 0, 1)
              inputs.push(v)
              foundNonColliding = true
              drawCollision(a.pos)
              break;
            }
          }
          if (!foundNonColliding) {
            inputs.push(1)
          }
        }

        // position
      })
      agent.update(inputs)
    }
  }

  updateCheckpointDist(a) {
    const { checkpoints } = this.environment
    const nextCheckpoint = checkpoints[a.reachedCheckpoints]

    const startToCheckpoint = this.startPosition.dist(nextCheckpoint.pos)
    const agentToCheckpoint = a.pos.dist(nextCheckpoint.pos)
    const traveledDist = startToCheckpoint - agentToCheckpoint
    a.traveled += traveledDist
  }

  evaluate() {

    const alive = this.agents.filter(a => a.alive)
    if (alive.length === 0) {
      this.initAgents()
      return;
    }

    let bestNeuralNet = false
    let bestTrav = 0
    this.agents.forEach(a => {
      if (!bestNeuralNet || (a.traveled > bestTrav)) {
        bestTrav = a.traveled
        bestNeuralNet = a.nn
      }
    })

    console.log(`WOw it traveled ${bestTrav}`)

    // repopulate
    this.agents = []
    this.agents.push(new Agent(this.startPosition, bestNeuralNet))
    while (this.agents.length < this.props.popsize) {
      if (this.agents.length < this.props.popsize * 0.9) { // fill 90% of population with mutations of best from last generation
        const best = bestNeuralNet.copy()
        best.mutate(0.1)
        const a = new Agent(this.startPosition, best)
        this.agents.push(a)
      } else {
        this.agents.push(new Agent(this.startPosition))
      }
    }

  }

  running() {
    return this.i < this.maxI && this.agents.filter(a => a.alive).length > 0
  }
}
