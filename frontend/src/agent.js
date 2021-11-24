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
    this.steer = 0
    this.acc = 0
    this.vel = createVector(0, 0)
    this.directedAcc = createVector(0, 0)
    this.wheelDirection = createVector(1, 0)
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
    return this.wheelDirection.heading()
  }

  update(input) {
    const output = this.nn.predict(input)

    const steer = map(output[0], 0, 1, -90, 90)
    this.wheelDirection.rotate(steer)

    const accChange = map(output[0], 0, 1, -.1, 2)
    this.acc += accChange
    this.acc = max(this.acc, 3)

    this.directedAcc = this.wheelDirection.copy().mult(this.acc)
    this.directedAcc.limit(5)

    this.vel.x = lerp(this.vel.x, this.directedAcc.x, 0.15)
    this.vel.y = lerp(this.vel.y, this.directedAcc.y, 0.15)
    //if (this.vel.mag() > 4) {
    //} else {
    //  this.vel.x = lerp(this.vel.x, this.directedAcc.x, 0.7)
    //  this.vel.y = lerp(this.vel.y, this.directedAcc.y, 0.7)
    //}
    this.pos.add(this.vel)

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