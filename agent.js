class Agent {
  constructor(pos, nn) {
    this.pos = pos;
    this.size = createVector(5, 10)
    this.sensorSettings = {
      s1: {
        y: 15,
        x: 20,
        n: 4,
      },
      s2: {
        y: 25,
        x: 40,
        n: 6,
      },
    }
    this.initSensors()
    this.acc = createVector()
    this.vel = createVector()

    if (nn) {
      this.nn = nn
    } else {
      this.nn = new NeuralNetwork(this.sensors.length, 8, 2)
    }
  }

  initSensors() {
    this.sensors = []
    for (let i = 0; i < this.sensorSettings.s1.n; i++) {
      this.sensors.push(createVector(map(i, 0, this.sensorSettings.s1.n - 1, -this.sensorSettings.s1.x, this.sensorSettings.s1.x), -this.sensorSettings.s1.y).add(this.pos))
    }

    for (let i = 0; i < this.sensorSettings.s2.n; i++) {
      this.sensors.push(createVector(map(i, 0, this.sensorSettings.s2.n - 1, -this.sensorSettings.s2.x, this.sensorSettings.s2.x), -this.sensorSettings.s2.y).add(this.pos))
    }
  }

  kill() {
    this.alive = false;
  }

  update(input) {
    const output = this.nn.predict(input)
    // first output acceleration
    // second output steering

    this.acc = createVector(0, map(output[0], 0, 1, 0, 5))
    this.vel.add(this.acc)

    const steer = createVector(0, map(output[1], 0, 1, -15, 15))
    this.vel.rotate(steer)
    this.vel.limit(2)

    this.pos.add(this.vel)
    this.sensors.forEach(s => {
      s.add(this.vel)
    })
  }
}