const s = {

}

setup = () => {
  createCanvas(800, 800)
  angleMode(DEGREES)
  s.agent = new Agent(createVector(85, height - 150))
  s.city = new City()
  /*
  environment = new Environment()
  environment.reset()
  */
}

draw = () => {
  background(255)

  drawAgent(s.agent)
  drawCity(s.city)
  s.city.buildings.forEach(b => drawCollisions(s.agent.sensors, b))

  s.agent.update()
  /*
  if (environment.e < 100) {
      while (environment.running()) {
          environment.run()
      }
      environment.e++
      environment.reset()
  } else {
      if (environment.running()) {
          environment.run()
          environment.draw()
      } else {
          environment.e++
          environment.reset()
      }
  }
  */
}
