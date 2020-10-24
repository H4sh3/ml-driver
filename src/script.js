const s = {

}

setup = () => {
  const w = initCanvas()
  angleMode(DEGREES)
  s.gym = new Gym(w)
  s.gym.reset()
  s.stats = new Statistics(s.gym.environment)
  createSliders()
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

createSliders = () => {
  s.slider = createSlider(1, 16, 5, 2);
  s.slider.style('width', '80px');
  s.oldSliderValue = s.slider.value()
  s.gym.numSensors = s.slider.value()
}

draw = () => {
  const currentSliderValue = s.slider.value()
  if (s.oldSliderValue != currentSliderValue) {
    s.gym.numSensors = currentSliderValue
    s.gym.reset()
    s.gym.initAgents()
    s.oldSliderValue = currentSliderValue
    s.sliderValueChanged = true
  }

  s.gym.draw()
  noFill()
  textSize(16)
  stroke(0)
  text(`Generation ${s.gym.e + 1}`, s.gym.environment.bs * 3, s.gym.environment.bs * 3)
  text(`Alive ${s.gym.agents.filter(a => a.alive).length} / ${s.gym.agents.length}`, s.gym.environment.bs * 3, s.gym.environment.bs * 4)
  background(147, 198, 219)
  s.gym.draw()
  if (s.gym.best.checkpoints < 8) { // train / explore
    while (s.gym.running()) {
      s.gym.run()
    }
    iterDone()
  } else { // start visualize after some trainig epoch
    if (s.gym.running()) {
      s.gym.run()
      s.gym.draw()
    } else {
      1
      iterDone()
    }
  }
  s.stats.draw([`Generation ${s.gym.e}`, `Iteration ${s.gym.i} / ${s.gym.maxI}`, s.gym.checkPointHistory])
}

function iterDone() {
  s.gym.e++
  s.gym.evaluate()
  s.gym.reset()
}


