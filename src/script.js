const s = {

}

setup = () => {
  createCanvas(1600, 900)
  angleMode(DEGREES)
  s.environment = new Environment()
  s.environment.reset()
}

draw = () => {
  background(255)
  if (s.environment.e < s.environment.maxE) { // train / explore
    while (s.environment.running()) {
      s.environment.run()
    }
    s.environment.e++
    s.environment.evaluate()
    s.environment.reset()
  } else { // visualize trained agent in s.environment
    s.environment.popsize = 5
    if (s.environment.running()) {
      s.environment.run()
      s.environment.draw()
    } else {
      s.environment.e++
      s.environment.evaluate()
      s.environment.reset()
    }
  }
}
