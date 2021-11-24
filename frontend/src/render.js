class Render {
  constructor(scaleF, textPosition) {
    this.scaleF = scaleF
    this.textPosition = textPosition
  }

  currentSettings(settings, a) {
    this.renderAgent(a)

    fill(0)
    noStroke()
    text('Current:', (a.pos.x - 65) * this.scaleF, (a.pos.y - 25) * this.scaleF)
    stroke(0)
    a.initSensors(settings.sensor)
    a.sensors.forEach(s => {
      const l = transformSensor(s, a)
      this.line(l)
    })
  }

  agents(agents) {
    agents.forEach(a => this.renderAgent(a))
  }

  inTraining() {
    noStroke()
    text(`Training in progress...`, 50 * this.scaleF, 50 * this.scaleF)
  }

  info(i, maxI, e, bestCP) {
    noStroke()
    fill(0)
    push()
    translate(this.textPosition.x * this.scaleF, this.textPosition.y * this.scaleF)
    text(`Checkpoints: ${bestCP}`, 0, 20)
    text(`Episode: ${e}`, 0, 40)
    text(`Iteration: ${i}/${maxI}`, 0, 60)
    pop()
  }

  renderAgent(agent) {
    if (agent.vel.mag() > 4) {
      fill(255, 0, 0)
    } else {
      fill(0, 200, 0)
    }

    stroke(0)
    push()
    translate(agent.pos.x * this.scaleF, agent.pos.y * this.scaleF)
    // line(0, 0, agent.vel.x*5, agent.vel.y*5)
    stroke(255,0,0)
    // line(0, 0, agent.directedAcc.x*5, agent.directedAcc.y*5)
    stroke(0)
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

  cars(cars) {
    stroke(0)
    fill(0)
    cars.forEach(b => {
      this.drawBlock(b)
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
