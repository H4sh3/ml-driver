const s = {

}

setup = () => {
  createCanvas(1600, 900)
  angleMode(DEGREES)
  s.gym = new Gym()
  s.gym.reset()
}

draw = () => {
  background(255)
  noFill()
  textSize(16)
  text(`Generation ${s.gym.e+1}`,s.gym.environment.bs*3,s.gym.environment.bs*2)
  if (false && s.gym.e < s.gym.maxE) { // train / explore
    while (s.gym.running()) {
      s.gym.run()
    }
    s.gym.e++
    s.gym.evaluate()
    s.gym.reset()
  } else { // visualize trained agent in s.environment
    if (s.gym.running()) {
      s.gym.run()
      s.gym.draw()
    } else {
      s.gym.e++
      s.gym.evaluate()
      s.gym.reset()
    }
  }
}
