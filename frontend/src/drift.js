const s = {

}

setup = () => {
  initCanvas()
  angleMode(DEGREES)
  // frameRate(1)
  s.car = getCar()
  s.targets = [
    createVector((width / 2), (height / 2) - 200),
    createVector((width / 2) - 200, (height / 2) + 200),
    createVector((width / 2) + 200, (height / 2) + 200),
  ]
  s.currentTargetIndex = 0
  s.v = createVector(100, 0)

  s.leftPressed = false
  s.rightPressed = false
  s.upPressed = false
  background(120)
}

initCanvas = () => {
  var canvasDiv = document.getElementById('p5-canvas');
  var width = canvasDiv.offsetWidth;
  canvasW = width;
  canvasH = width;
  canvas = createCanvas(canvasW, canvasH);
  canvas.parent('p5-canvas');
  return canvasW;
}

draw = () => {
  drawTargets()
  if (s.targets.length < 2) return

  const currentTarget = s.targets[s.currentTargetIndex]
  updatePhysics(currentTarget)
  drawCar()

  if (s.car.pos.dist(currentTarget) < 50) {
    s.currentTargetIndex += 1
    s.currentTargetIndex = s.currentTargetIndex % s.targets.length
    if (s.currentTargetIndex === 0) {
      //background(120, 120, 120)
    }
  }
}

function drawTargets() {
  s.targets.map(t => {
    push()
    translate(t.x, t.y)
    fill(255, 0, 0)
    ellipse(0, 0, 5, 5)
    pop()
  })
}

function drawCar() {
  push()
  stroke(0)
  translate(s.car.pos.x, s.car.pos.y)
  rotate(s.car.dir.heading())
  rect(0, 0, 20, 10)
  pop()
}

function updatePhysics(t) {

  if (keyIsDown(LEFT_ARROW)) {
    s.car.dir.rotate(-1 * s.car.vel.mag())
  }

  if (keyIsDown(RIGHT_ARROW)) {
    s.car.dir.rotate(1 * s.car.vel.mag())
  }

  if (keyIsDown(UP_ARROW)) {
    s.car.acc.add(s.car.dir.copy().mult(1 / (1 + s.car.vel.mag())))
  }

  const direction = s.car.pos.copy().sub(t)
  if (s.car.dir.angleBetween(direction) > 0) {
    s.car.dir.rotate(-.5 * s.car.vel.mag())
  } else {
    s.car.dir.rotate(.5 * s.car.vel.mag())
  }

  s.car.acc.add(s.car.dir.copy().mult(1 / (1 + s.car.vel.mag())))

  s.car.vel.add(s.car.acc)
  s.car.pos.add(s.car.vel)

  s.car.acc.div(2)
  s.car.vel.div(1.05)

  //background(120)
  stroke(0, 255, 0)
  const accMag = s.car.acc.mag()*1000
  //line(s.car.pos.x, s.car.pos.y, s.car.pos.x + s.car.acc.x * accMag, s.car.pos.y + s.car.acc.y * accMag)

  stroke(255, 0, 0)
  const velMag = s.car.vel.mag()
  //line(s.car.pos.x, s.car.pos.y, s.car.pos.x + s.car.vel.x * velMag, s.car.pos.y + s.car.vel.y * velMag)
}
function mousePressed() {
  s.targets.push(createVector(mouseX, mouseY))
}

function getCar() {
  const pos = createVector(width / 2, 100)
  const dir = createVector(0, 1)
  const vel = createVector(0, 0)
  const acc = createVector(0, 0)
  return { pos, dir, vel, acc }
}
