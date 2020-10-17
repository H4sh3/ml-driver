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
  drawCheckpoints(c.checkpoints)
}

function drawCheckpoints(checkpoints) {
  fill(0, 255, 0)
  checkpoints.forEach((b, index) => {
    drawBlock(b)
    text(index, b.pos.x, b.pos.y)
  })
}

function drawBuildings(buildings) {
  stroke(0, 0, 25)
  noFill()
  buildings.forEach(b => {
    drawBlock(b)
  })
}

function drawCollision(col) {
  fill(255, 0, 0)
  ellipse(col.x, col.y, 5, 5)
}