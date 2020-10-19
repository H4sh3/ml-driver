function drawAgent(agent, index) {
  if (index === 0) {
    fill(255, 0, 0)
  } else {
    fill(0, 255, 0)
  }

  push()
  translate(agent.pos.x, agent.pos.y)
  rotate(agent.vel.heading() + 90)
  rect(-agent.size.x / 2, -agent.size.y / 2, agent.size.x, agent.size.y)
  pop()
}

function drawBlock(b) {
  b.lines.forEach(l => {
    line(l.p1.x, l.p1.y, l.p2.x, l.p2.y)
  })
}

function drawEnvironment(c) {
  drawBuildings(c.buildings)
  drawCheckpoints(c.checkpoints)
  drawCars(c.cars)
}

function drawCars(drawCars) {
  stroke(0)
  drawCars.forEach(b => {
    drawBlock(b)
  })
}

function drawCheckpoints(checkpoints) {
  stroke(0, 255, 0)
  checkpoints.forEach((b, index) => {
    text(index, (b.lines[0].p1.x + b.lines[0].p2.x) / 2, (b.lines[0].p1.y + b.lines[0].p2.y) / 2)
    //drawBlock(b)
  })
}

function drawBuildings(buildings) {
  strokeWeight(2)
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