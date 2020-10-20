class Agent {
  constructor(pos, nn) {
    this.pos = pos;
    this.size = createVector(5, 10)
    this.sensorSettings = {
      n: 7,
    }
    this.reset()

    if (nn) {
      this.nn = nn
    } else {
      this.nn = new NeuralNetwork(this.sensors.length * 2, 8, 2)
    }

    this.alive = true
    this.reachedCheckpoints = 0
    this.sensorLength = 150
  }

  reset() {
    this.steer = 0
    this.acc = createVector(5, 0)
    this.vel = createVector(0, 0)
    this.initSensors()
  }

  initSensors() {
    this.sensors = []
    const fov = 100

    for (let i = 0; i < this.sensorSettings.n; i++) {
      this.sensors.push({
        rot: Math.floor(map(i, 0, this.sensorSettings.n - 1, 90 - (fov / 2), 90 + (fov / 2))),
        pos: createVector(0, - this.sensorLength),
      })
    }
  }

  kill() {
    this.alive = false;
  }

  memorize(input) {
    this.memory.push(input)
    if (this.memory.length > this.maxMemory) {
      this.memory.shift()
    }
  }


  update(input) {
    const output = this.nn.predict(input)
    const steer = map(output[0], 0, 1, -180, 180)
    const acc = createVector(map(output[1], 0, 1, -1, 5), 0)
    acc.rotate(this.vel.heading())
    this.steer += steer
    acc.rotate(steer)
    this.vel.add(acc)
    this.vel.limit(7)
    this.vel.mult(0.9)
    this.pos.add(this.vel)
  }
}