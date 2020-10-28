const s = {

}

setup = () => {
  createCanvas(500, 500)
  angleMode(DEGREES)
  frameRate(60)
  s.i = 0
}

draw = () => {
  background(255)
  const vlength = 50


  s.target = createVector(1, 0).mult(vlength)
  s.pos = createVector(0, 1).mult(vlength)
  s.vel = createVector(mouseX-width/2, mouseY-height/2).limit(vlength)
  var desired = s.target.copy().sub(s.pos)

  // Scale to maximum speed
  desired.setMag(5);

  // Steering = Desired minus velocity
  var steer = p5.Vector.sub(desired, s.vel);



  push()
  translate(width / 2, height / 2)
  /* stroke(255, 0, 0)
  drawVector(s.v1)
  stroke(0, 255, 0)
  drawVector(s.v2)
 */
  stroke(255, 0, 0)
  drawVector(s.target)

  stroke(0, 255, 0)
  drawVector(s.pos)

  stroke(0, 0, 255)
  drawVector(s.vel)

  stroke(255,0,255)
  drawVector(steer)

  pop()

}

function drawVector(v) {
  0, 0, v.x, v.y)
}

