class Agent {
  constructor(pos) {
    this.pos = pos;
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

  initSensors(n) {
    n = 5
    this.sensors = []
    const fov = 100

    for (let i = 0; i < n; i++) {
      this.sensors.push({
        rot: Math.floor(map(i, 0, n - 1, 90 - (fov / 2), 90 + (fov / 2))),
        pos: createVector(0, - this.sensorLength),
      })
    }

  }

  initNeuralNet(nn) {
    if (nn) {
      this.nn = nn
    } else {
      this.nn = new NeuralNetwork(5 * 2, 10, 2)
    }
  }

  kill() {
    this.alive = false;
  }

  heading() {
    return this.headingV.heading()
  }

  update(input, tractionConstant) {
    const output = this.nn.predict(input)

    const steer = map(output[0], 0, 1, -5, 5)
    this.headingV.rotate(steer)

    const engineForce = map(output[1], 0, 1, -1, 15)
    const engine = this.headingV.copy().mult(engineForce)

    const speed = this.vel.mag()

    const drag = this.vel.copy().mult(-tractionConstant).mult(speed)

    const rollingRes = this.vel.copy().mult(-0.90)

    const acc = engine.add(drag).add(rollingRes)
    this.vel.add(acc)
    this.vel.limit(15)
    this.pos.add(this.vel)
  }
}