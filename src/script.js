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
  text(`Generation ${s.gym.e + 1}`, s.gym.environment.bs * 3, s.gym.environment.bs * 2)
  if (s.gym.e < s.gym.maxE) { // train / explore
    while (s.gym.running()) {
      s.gym.run()
    }
    iterDone()
  } else { // start visualize after some trainig epoch
    if (s.gym.running()) {
      s.gym.run()
      s.gym.draw()
    } else {
      iterDone()
    }
  }
}

function iterDone() {
  s.gym.e++
  s.gym.evaluate()
  s.gym.reset()
}