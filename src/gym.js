class Gym {
  constructor(settings) {
    this.popsize = 25
    this.learningRate = 0.01

    this.settings = settings

    this.maxI = 1000;

    this.maxE = 0;
    this.environment = new Race()
    this.init()

    this.checkPointHistory = []
  }

  reachedChecks() {
    return this.agents.reduce((max, agent) => max.reachedCheckpoints > agent.reachedCheckpoints ? max : agent);
  }



  init() {
    this.initAgents()
    this.i = 0;
    this.e = 0;
    this.best = {
      checkpoints: 0,
      net: false,
    }
  }

  reset() {
    this.i = 0;
  }

  initAgents() {
    this.agents = []
    for (let i = 0; i < this.popsize; i++) {
      const a = new Agent(this.environment.agentStart.copy())
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
          if (agent.reachedCheckpoints === 0) {
            agent.reachedCheckpoints++
            agent.nextCP = (index + 1) % this.environment.checkpoints.length
          } else {
            if (index == agent.nextCP) {
              agent.reachedCheckpoints++
              agent.nextCP = (index + 1) % this.environment.checkpoints.length
            }
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
        agent.currentCP = agent.currentCP + 1 % this.environment.checkpoints
      }
    })
    return { bestNeuralNet, maxCheckpoints }
  }

  evaluate() {


    const { bestNeuralNet, maxCheckpoints } = this.getBest()

    console.log(`Best one reached ${maxCheckpoints} checkpoints!`)

    if (maxCheckpoints > this.best.checkpoints) {
      this.best.checkpoints = maxCheckpoints
      this.best.net = bestNeuralNet
    }

    if (maxCheckpoints === 0) {
      this.reset()
      this.initAgents()
      return;
    }

    this.checkPointHistory.push(maxCheckpoints)
    this.agents = []

    const goodBrains = [bestNeuralNet, this.best.net]
    goodBrains.filter(b => b).forEach(b => {
      const a = new Agent(this.environment.agentStart)
      a.initSensors(this.settings.sensor)
      a.initNeuralNet(b.copy())
      this.agents.push(a)
    })


    while (this.agents.length < this.popsize) {
      if (this.agents.length < this.popsize * 0.7) { // fill n% of population with mutations of best from last generation
        const brain = bestNeuralNet.copy()
        brain.mutate(0.1)
        const a = new Agent(this.environment.agentStart)
        a.initSensors(this.settings.sensor)
        a.initNeuralNet(brain)
        this.agents.push(a)
      } else {
        const a = new Agent(this.environment.agentStart)
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
  current.rotate(s.rot + agent.headingV.heading())
  current.add(agent.pos)
  return new Line(current.x, current.y, agent.pos.x, agent.pos.y)
}