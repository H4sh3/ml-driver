const s = {

}

setup = () => {
  createCanvas(1600, 900)
  angleMode(DEGREES)

  s.car = getCar()
  background(255)
}

draw = () => {
  updateCar()
  drawCar()
}

function drawCar() {
  push()
  translate(s.car.pos.x, s.car.pos.y)
  //rotate(s.car.vel.heading())
  rect(0, 0, 10, 5)
  pop()
}

function updateCar() {
  const target = createVector(mouseX, mouseY)
  const acc = target.sub(s.car.pos).normalize()

  
  acc.mult(10)
  
  const diff = acc.sub(s.car.vel).mult(0.15)
  
  line(s.car.pos.x + diff.x * 25, s.car.pos.y + diff.y * 25, s.car.pos.x, s.car.pos.y)
  s.car.vel.add(diff)


  line(s.car.pos.x + s.car.vel.x * 10, s.car.pos.y + s.car.vel.y * 10, s.car.pos.x, s.car.pos.y)

  s.car.vel.limit(50)
  s.car.pos.add(s.car.vel)
}


function getCar() {
  const pos = createVector(width / 2, height / 2)
  const acc = createVector(0, 0)
  const vel = createVector(0, 0)
  return { pos, acc, vel }
}
