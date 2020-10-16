class Agent {
  constructor(pos, nn) {
    this.pos = pos;
    this.size = createVector(5, 10)
    this.sensorSettings = {
      s: {
        y: 15,
        x: 20,
        n: 5,
      }
    }
    this.reset()

    if (nn) {
      this.nn = nn
    } else {
      this.nn = new NeuralNetwork(this.sensors.length + 3, 4, 2)
    }

    this.alive = true
    this.vel = createVector()
  }

  reset() {
    this.acc = createVector()
    this.vel = createVector()
    this.initSensors()
  }

  initSensors() {
    this.sensors = []
    const fov = 90

    for (let i = 0; i < this.sensorSettings.s.n; i++) {
      this.sensors.push({ rot: map(i, 0, this.sensorSettings.s.n - 1, 90 - fov, 90 + fov), pos: createVector(0, -50) })
    }
    /*
    for (let i = 0; i < this.sensorSettings.s.n; i++) {
      this.sensors.push({ rot: map(i, 0, this.sensorSettings.s.n - 1, 90-fov, 90+fov), pos: createVector(0, -100) })
    }
    */
  }

  kill() {
    this.alive = false;
  }

  update(input) {
    const output = this.nn.predict(input)
    // first output acceleration
    // second output steering
    const steer = map(output[0], 0, 1, -90, 90)
    const acc = createVector(0, map(output[1], 0, 1, -5, 5))
    acc.rotate(steer)
    this.vel.add(acc)
    this.vel.limit(5)
    this.pos.add(this.vel)
    line(this.pos.x, this.pos.y, this.pos.x + this.vel.x * 10, this.pos.y + this.vel.y * 10)
  }
}