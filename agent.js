class Agent {
  constructor(pos) {
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

  update() {
    // send input to nn -> use output for steering & acc
    // output is 0 to 1 , map it between -30 to 30 

    const accX = 0
    const accY = -0.5
    const steer = 45


    this.acc = createVector(accX, accY)
    this.vel.add(this.acc)
    //this.vel.rotate(steer)
    this.vel.limit(2)


    this.pos.add(this.vel)
    this.sensors.forEach(s => {
      s.add(this.vel)
    })
  }
}