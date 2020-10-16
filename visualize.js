function drawAgent(agent) {
  fill(0, 255, 0)

  push()
  translate(agent.pos.x, agent.pos.y)
  rotate(agent.vel.heading() + 90)
  rect(0, 0, agent.size.x, agent.size.y)
  pop()

  agent.sensors.forEach(s => {
    noFill()
    const current = s.pos.copy().rotate(s.rot)
    current.rotate(agent.vel.heading())
    current.add(agent.pos)
    ellipse(current.x, current.y, 5, 5)
  })

}

function drawBlock(b) {
  rect(b.pos.x, b.pos.y, b.size.x, b.size.y)
}

function drawEnvironment(c) {
  drawBuildings(c.buildings)
  drawCheckPoints(c.checkPoints)
}

function drawCheckPoints(checkPoints) {
  fill(0, 255, 0)
  checkPoints.forEach(b => {
    drawBlock(b)
  })
}

function drawBuildings(buildings) {
  stroke(0, 0, 25)
  noFill()
  buildings.forEach(b => {
    drawBlock(b)
  })
}

function drawCollisions(sensors, building) {
  sensors.forEach(s => {
    if (building.colliding(s)) {
      fill(255, 0, 0)
      ellipse(s.x, s.y, 5, 5)
    }
    noFill()
  })
}