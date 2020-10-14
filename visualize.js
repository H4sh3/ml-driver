function drawAgent(agent) {
  fill(0,255,0)

  push()
  translate(agent.pos.x - agent.size.x / 2, agent.pos.y - agent.size.y / 2)
  //rotate(agent.vel.heading()-90)
  rect(0,0, agent.size.x, agent.size.y)
  pop()

  agent.sensors.forEach(s => {
    noFill()
    ellipse(s.x, s.y, 5, 5)
  })
}

function drawBuilding(b) {
  stroke(0, 0, 25)
  noFill()
  rect(b.pos.x, b.pos.y, b.size.x, b.size.y)
}

function drawCity(c) {
  c.buildings.forEach(b => {
    drawBuilding(b)
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