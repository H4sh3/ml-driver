function drawAgent(agent) {
  if (agent.alive) {
    fill(0, 200, 0)
  } else {
    fill(255, 0, 0)
  }

  stroke(0)
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

function drawCars(cars) {
  stroke(0)
  fill(0)
  cars.forEach(b => {
    drawBlock(b)
  })
}

function drawCheckpoints(checkpoints) {
  stroke(0, 255, 0)
  checkpoints.forEach(b => {
    drawBlock(b)
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

function visHeadingV(hV, pos) {
  const hVcopy = hV.copy().setMag(35)
  line(pos.x, pos.y, hVcopy.x + pos.x, hVcopy.y + pos.y)
}