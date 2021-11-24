const s = {

}

setup = () => {
  initCanvas()
  angleMode(DEGREES)

  s.car = getCar()
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
  background(255)
  updatePhysics()
  drawCar()
}

function drawCar() {
  push()
  translate(s.car.pos.x, s.car.pos.y)
  rotate(s.car.vel.heading())
  rect(0, 0, 10, 5)
  pop()
}

function updatePhysics() {
  const engineForce = 1
  //const target = createVector(width, height/2)
  const target = createVector(mouseX, mouseY)
  let direction = target.sub(s.car.pos)
  direction = direction.normalize()
  const tractionForce = direction.mult(engineForce)

  const cDrag = 0.011
  const magVel = s.car.vel.mag()
  const vel = s.car.vel.copy()
  const fDrag = vel.copy().mult(cDrag * magVel)

  const cRoll = 0.052
  const fRoll = vel.copy().mult(-cRoll)

  const longForce = tractionForce.add(fDrag).add(fRoll)

  s.car.vel.add(longForce)

  push()
  translate(s.car.pos.x,s.car.pos.y)
  const velVis = s.car.vel.copy().mult(10)
  line(0,0,velVis.x,velVis.y)
  pop()

  s.car.vel.limit(15)
  s.car.pos.add(s.car.vel)
}

function getCar() {
  const pos = createVector(0, height / 2)
  const acc = createVector(0, 0)
  const vel = createVector(0, 0)
  return { pos, acc, vel }
}
