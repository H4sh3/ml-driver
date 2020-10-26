class Agent {
  constructor(settings) {
    this.pos = settings.start.copy();
    this.inputFactor = settings.inputFactor;

    this.size = createVector(10, 20)
    this.reset()

    this.alive = true
    this.reachedCheckpoints = 0
    this.sensorLength = 150
  }

  reset() {
    this.nextCP;
    this.steer = 0
    this.acc = createVector(5, 0)
    this.vel = createVector(0, 0)
    this.headingV = createVector(1, 0)
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
      this.nn = new NeuralNetwork(this.sensors.length * this.inputFactor, Math.floor((this.sensors.length + 2) / 2), 2)
    }
  }

  kill() {
    this.alive = false;
  }

  heading() {
    return this.headingV.heading()
  }

  update(input) {
    const output = this.nn.predict(input)

    const steer = map(output[0], 0, 1, -90, 90)
    this.headingV.rotate(steer)

    const accForce = map(output[0], 0, 1, -2, 12)
    const tractionForce = this.headingV.copy().mult(accForce)

    const fDrag = getFDrag(this.vel)
    const fRoll = getFRoll(this.vel)
    const acc = getAcc(tractionForce, fDrag, fRoll)
    this.vel.add(acc)
    this.vel.limit(8)
    this.pos.add(acc)
  }
}

function getAcc(tractionForce, fDrag, fRoll) {
  return tractionForce.add(fDrag).add(fRoll)
}

function getFDrag(vel) {
  const cDrag = 0.01
  const magVel = vel.mag()
  return vel.copy().mult(cDrag * magVel)
}

function getFRoll(vel) {
  const cRoll = 0.05
  return vel.copy().mult(-cRoll)
}