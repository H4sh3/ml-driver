class Render {
  constructor(scaleF) {
    this.scaleF = scaleF

  }

  currentSettings(settings, a) {
    this.agent(a)

    fill(0)
    noStroke()
    text('Current:', (a.pos.x - 65) * this.scaleF, (a.pos.y-25) * this.scaleF)
    stroke(0)
    a.initSensors(settings.sensor)
    a.sensors.forEach(s => {
      const l = transformSensor(s, a)
      this.line(l)
    })
  }

  agents(agents) {
    agents.forEach(a => this.agent(a))
  }

  preTrain(e){ 
    noStroke()
    fill(0)
    text(`Pretraining episode ${e}`,240*this.scaleF,270*this.scaleF)
  }

  info(e,bestCP){ 
    noStroke()
    fill(0)
    text(`Episode: ${e}`,240*this.scaleF,290*this.scaleF)
    text(`Most checkpoints: ${bestCP}`,240*this.scaleF,310*this.scaleF)
  }

  agent(agent) {
    if (agent.alive) {
      fill(0, 200, 0)
    } else {
      fill(255, 0, 0)
    }

    stroke(0)
    push()
    translate(agent.pos.x * this.scaleF, agent.pos.y * this.scaleF)
    rotate(agent.vel.heading() + 90)
    rect((-agent.size.x / 2) * this.scaleF, (-agent.size.y / 2) * this.scaleF, agent.size.x * this.scaleF, agent.size.y * this.scaleF)
    pop()
  }

  drawBlock(b) {
    b.lines.forEach(l => this.line(l))
  }

  line(l) {
    line(l.p1.x * this.scaleF, l.p1.y * this.scaleF, l.p2.x * this.scaleF, l.p2.y * this.scaleF)
  }

  drawCheckpoints(checkpoints) {
    stroke(0, 255, 0)
    checkpoints.forEach(b => {
      this.drawBlock(b)
    })
  }

  environment(e) {
    this.buildings(e.buildings)
    this.drawCheckpoints(e.checkpoints)
  }

  buildings(buildings) {
    strokeWeight(2 * this.scaleF)
    stroke(0, 0, 25)
    noFill()
    buildings.forEach(b => {
      this.drawBlock(b)
    })
  }

  drawCars(cars) {
    stroke(0)
    fill(0)
    cars.forEach(b => {
      drawBlock(b)
    })
  }
}


function drawCollision(col) {
  fill(255, 0, 0)
  ellipse(col.x, col.y, 5, 5)
}

function visHeadingV(hV, pos) {
  const hVcopy = hV.copy().setMag(35)
  line(pos.x, pos.y, hVcopy.x + pos.x, hVcopy.y + pos.y)
}
