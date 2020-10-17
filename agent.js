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
      this.nn = new NeuralNetwork(this.sensors.length, 3, 2)
    }

    this.alive = true
    this.reachedCheckpoints = 0

    this.memory = [];
    this.maxMemory = 50;
    this.traveled= 0
  }

  reset() {
    this.distanceTraveled = 0
    this.acc = createVector()
    this.vel = createVector(5, 0)
    this.initSensors()
  }

  initSensors() {
    this.sensors = []
    const fov = 70

    for (let i = 0; i < this.sensorSettings.s.n; i++) {
      this.sensors.push({ rot: map(i, 0, this.sensorSettings.s.n - 1, 90 - fov, 90 + fov), pos: createVector(0, -75) })
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
    this.memorize({ input, output })
    // first output acceleration
    // second output steering
    const steer = map(output[0], 0, 1, -5, 5)
    this.vel.rotate(steer)
    this.pos.add(this.vel)
    this.distanceTraveled + this.vel.mag()
    line(this.pos.x, this.pos.y, this.pos.x + this.vel.x * 10, this.pos.y + this.vel.y * 10)
  }
}