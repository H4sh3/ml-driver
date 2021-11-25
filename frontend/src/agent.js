class Agent {
  constructor(settings) {
    this.pos = settings.start.copy();
    this.inputFactor = settings.inputFactor;

    this.size = createVector(10, 20)
    this.reset()

    this.alive = true
    this.reachedCheckpoints = 0
    this.sensorLength = 150
    this.timeDead = 0
  }

  reset() {
    this.acc = createVector(0, 0)
    this.vel = createVector(0, 0)
    this.dir = createVector(1, 0)
  }

  initSensors(settings) {
    this.sensors = []
    const { fov, num, len } = settings

    for (let i = 0; i < num; i++) {
      this.sensors.push({
        rot: Math.floor(map(i, 0, num - 1, 90 - (fov / 2), 90 + (fov / 2))),
        pos: createVector(0, - len),
      })
    }

  }

  initNeuralNet(nn) {
    if (nn) {
      this.nn = nn
    } else {
      //this.nn = new NeuralNetwork(this.sensors.length * this.inputFactor + 2, Math.floor((this.sensors.length + 2) / 2), 2)
      this.nn = new NeuralNetwork(this.sensors.length * this.inputFactor, Math.floor((this.sensors.length + 2) / 2), 2)
    }
  }

  kill() {
    this.alive = false;
  }

  heading() {
    return this.dir.heading()
  }

  update(input) {
    const output = this.nn.predict(input)

    const steer = map(output[0], 0, 1, -90, 90)
    this.dir.rotate(steer * this.vel.mag())

    const accChange = map(output[0], 0, 1, -2, 2)
    this.acc.add(createVector(accChange,0).rotate(this.dir.heading()).mult(accChange))
    this.acc.add(this.dir.copy().mult(1 / (1 + this.vel.mag())))
    this.vel.add(this.acc)

    this.pos.add(this.vel)
    
    this.acc.div(2)
    this.vel.div(1.08)
  }
}

function getAcc(tractionForce, fDrag, fRoll) {
  return tractionForce.add(fDrag).add(fRoll)
}

function getFDrag(vel) {
  const cDrag = 0.0015
  const magVel = vel.mag()
  return vel.copy().mult(cDrag * magVel)
}

function getFRoll(vel) {
  const cRoll = 0.05
  return vel.copy().mult(-cRoll)
}