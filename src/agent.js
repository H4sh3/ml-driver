class Agent {
  constructor(pos, nn) {
    this.pos = pos;
    this.size = createVector(5, 10)
    this.sensorSettings = {
      n: 5,
    }
    this.reset()

    if (nn) {
      this.nn = nn
    } else {
      this.nn = new NeuralNetwork(this.sensors.length, 3, 2)
    }

    this.alive = true
    this.reachedCheckpoints = 0
    this.sensorLength = 150
  }

  reset() {
    this.acc = createVector(5, 0)
    this.vel = createVector(0, 0)
    this.initSensors()
  }

  initSensors() {
    this.sensors = []
    const fov = 55

    for (let i = 0; i < this.sensorSettings.n; i++) {
      this.sensors.push({
        rot: Math.floor(map(i, 0, this.sensorSettings.n - 1, 90 - fov, 90 + fov)),
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
    const steer = output[0]
    const acc = createVector(output[1] * 5, 0).rotate(this.vel.heading())
    if(steer > 0.5){
      acc.rotate(-15)
    }else{
      acc.rotate(15)
    }
    this.vel.add(acc)
    this.vel.limit(5)
    this.vel.mult(0.9)
    this.pos.add(this.vel)
  }
}