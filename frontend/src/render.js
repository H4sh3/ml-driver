class Render {
  constructor(scaleF, textPosition) {
    this.scaleF = scaleF
    this.textPosition = textPosition
  }

  currentSettings(settings, a) {
    fill(0)
    noStroke()
    text('Current:', (a.pos.x - 65) * this.scaleF, (a.pos.y - 25) * this.scaleF)
    stroke(0)
    a.initSensors(settings.sensor)
    a.sensors.forEach(s => {
      const l = transformSensor(s, a)
      this.line(l)
    })
    this.renderAgent(a, 0)
  }

  agents(agents) {
    agents.map((a, i) => this.renderAgent(a, i))
  }

  inTraining() {
    noStroke()
    fill(0)
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
    if (agent.isBest) {
      fill(0, 200, 0)
    } else {
      fill(100)
    }

    stroke(0)
    push()
    translate(agent.pos.x * this.scaleF, agent.pos.y * this.scaleF)

    stroke(0)
    rotate(agent.acc.heading() + 90)
    rect((-agent.size.x / 2) * this.scaleF, (-agent.size.y / 2) * this.scaleF, agent.size.x * this.scaleF, agent.size.y * this.scaleF)

    if (false) {
      stroke(255, 0, 0)
      const velMag = agent.vel.mag()
      line(0, 0, agent.vel.x * velMag * 2, agent.vel.y * velMag * 2)

      stroke(0, 255, 0)
      const directedAcc = agent.acc.mag()
      line(0, 0, agent.acc.x * directedAcc * 100, agent.acc.y * directedAcc * 100)
    }

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
    if (e.roads) {
      e.roads.forEach(road => {
        s.render.cars(road.cars)
      })
    }
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
