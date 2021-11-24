class Gym {
  constructor(settings, environment) {
    this.popsize = 50
    this.learningRate = 0.01
    this.settings = settings
    this.maxI = 1000;
    this.maxE = 0;
    this.environment = environment
    this.agents = []
    this.init()
    this.checkPointHistory = []
    this.postedScores = []
    this.reachedLimit = 0
  }

  reachedChecks() {
    return this.agents.reduce((max, agent) => max.reachedCheckpoints > agent.reachedCheckpoints ? max : agent);
  }

  setBest(checkpoints, net) {
    this.best = {
      checkpoints,
      net
    }
  }

  init() {
    const entry = getEntry(this.environment.type, this.settings)

    if (entry && entry.status == "model found") {
      this.setBest(entry.entry.checkpoints, NeuralNetwork.deserialize(entry.entry.model))
      this.addAgent(this.best.net)
      this.generatePopulation(this.best.net)
    } else {
      this.setBest(0, false)
      this.initAgents()
    }

    this.i = 0;
    this.e = 0;
  }

  reset() {
    this.i = 0;
    this.environment.reset()
  }

  initAgents() {
    for (let i = 0; i < this.popsize; i++) {
      const a = new Agent(this.environment.agentSettings)
      a.initSensors(this.settings.sensor)
      a.initNeuralNet()
      this.agents.push(a)
    }
  }

  run() {
    this.updateAgents()
    this.environment.update(this.i)
    this.i++
  }

  updateAgents() {
    if (this.i === 150) { // remove agents that haven't reached a checkpoint yet
      this.agents = this.agents.filter(a => a.reachedCheckpoints > 0)
    }
    this.agents.filter(a => a.alive).forEach(agent => this.updateAgent(agent))
    this.agents.filter(a => !a.alive).forEach(agent => agent.timeDead++)
  }

  handleCollisions(agent, body) {
    // check collision with walls
    body.forEach(part => {
      if (this.environment.getCollisionObjects().filter(b => b.colliding(part).length > 0).length > 0) {
        agent.kill()
      }
    })
  }

  handleCheckpoints(agent, body) {
    body.forEach(part => {
      this.environment.checkpoints.forEach((cp, index) => {
        if (cp.colliding(part).length > 0) {
          if (agent.reachedCheckpoints % this.environment.checkpoints.length == index) {
            agent.reachedCheckpoints++
          }
        }
      })
    })
  }

  getBody(agent) {
    return [new Line(agent.pos.x - 5, agent.pos.y, agent.pos.x + 5, agent.pos.y), new Line(agent.pos.x, agent.pos.y - 5, agent.pos.x, agent.pos.y + 5)]
  }

  updateAgent(agent) {
    const body = this.getBody(agent)
    this.handleCollisions(agent, body)
    this.handleCheckpoints(agent, body)

    stroke(0)

    const inputs = this.environment.getInputs(agent)
    agent.update(inputs)
  }

  getBest() {
    let bestNeuralNet = false
    let maxCheckpoints = 0
    this.agents.forEach(agent => {
      if (!bestNeuralNet || (agent.reachedCheckpoints > maxCheckpoints)) {
        maxCheckpoints = agent.reachedCheckpoints
        bestNeuralNet = agent.nn
      }
    })


    this.updateBest(maxCheckpoints, bestNeuralNet)


    if (maxCheckpoints === 0) {
      this.reset()
      this.initAgents()
      return false
    }

    return bestNeuralNet
  }

  updateBest(maxCheckpoints, bestNeuralNet) {
    if (maxCheckpoints > this.best.checkpoints) {
      this.setBest(maxCheckpoints, bestNeuralNet)
      if (maxCheckpoints > this.environment.requiredCheckpoints) {
        if (!this.postedScores.includes(maxCheckpoints)) {
          postEntry(this.environment.type, this.settings, this.best, true)
          this.postedScores.push(maxCheckpoints)
        }
      }
    }
  }

  evaluate() {
    this.e++
    const bestNeuralNet = this.getBest()

    if (!bestNeuralNet) {
      return
    }

    if (this.best.net) {
      this.addAgent(this.best.net)
    }

    this.addAgent(bestNeuralNet)
    this.generatePopulation(bestNeuralNet)
    this.reset()
  }

  addAgent(model) {
    const a = new Agent(this.environment.agentSettings)
    a.initSensors(this.settings.sensor)
    a.initNeuralNet(model.copy())
    this.agents.push(a)
  }

  generatePopulation(model) {
    this.agents = []
    this.addAgent(model)

    while (this.agents.length < this.popsize) {
      if (this.agents.length < this.popsize * 0.7) { // fill n% of population with mutations of best from last generation
        const brain = model.copy()
        brain.mutate(0.1)
        const a = new Agent(this.environment.agentSettings)
        a.initSensors(this.settings.sensor)
        a.initNeuralNet(brain)
        this.agents.push(a)
      } else {
        const a = new Agent(this.environment.agentSettings)
        a.initSensors(this.settings.sensor)
        a.initNeuralNet()
        this.agents.push(a)
      }
    }
  }

  running() {
    return this.i < this.maxI && this.agents.filter(a => a.alive).length > 0
  }
}

function getSensorCollisionsWith(agent, otherObjects, showSensors) {
  const inputs = []
  agent.sensors.forEach(sensor => {
    let closest = Infinity
    let closestPos = false
    otherObjects.forEach(b => {
      const sensorLine = transformSensor(sensor, agent)
      const cols = b.colliding(sensorLine)
      fill(0)
      cols.filter(col => col.dist(agent.pos) < agent.sensorLength).forEach(c => {
        if (agent.pos.dist(c) < closest) {
          closestPos = c
          closest = agent.pos.dist(c)
        }
      })
    })
    if (closestPos) {
      if (showSensors) {
        s.render.line({ p1: { x: agent.pos.x, y: agent.pos.y }, p2: { x: closestPos.x, y: closestPos.y } })
      }
      inputs.push(map(closestPos.dist(agent.pos), 0, agent.sensorLength, 0, 1))
    } else {
      inputs.push(1)
    }
  })
  return inputs
}

function transformSensor(s, agent) {
  const current = s.pos.copy()
  current.rotate(s.rot + agent.wheelDirection.heading())
  current.add(agent.pos)
  return new Line(current.x, current.y, agent.pos.x, agent.pos.y)
}