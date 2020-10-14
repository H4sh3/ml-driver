const s = {

}

setup = () => {
  createCanvas(800, 800)
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
      s.environment.reset()
      console.log(s.environment.e)
  } else { // visualize trained agent in s.environment
      if (s.environment.running()) {
          s.environment.run()
          s.environment.draw()
      } else {
          s.environment.e++
          s.environment.reset()
      }
  }
}
