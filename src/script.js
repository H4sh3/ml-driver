const s = {

}

const NUM_SENSORS = "numSensorSlider";
const LEN_SENSORS = "lengthSensorSlider";
const FOV = "fovSlider"

setup = () => {
  const scaleF = initCanvas()
  s.render = new Render(scaleF)
  angleMode(DEGREES)

  numSensorSlider(5)
  lengthSensorSlider(125)
  fovSlider(100)

  s.gym = new Gym(genSettings(getValue(NUM_SENSORS), getValue(LEN_SENSORS), getValue(FOV)))
  s.gym.reset()
  s.stats = new Statistics(s.gym.environment)
}

draw = () => {
  background(147, 198, 219)

  s.render.currentSettings(getCurrentSettings(), s.gym.environment.dummyAgent)

  s.render.agents(s.gym.agents)
  s.render.environment(s.gym.environment)

  if (s.gym.best.checkpoints < 8) { // train / explore
    while (s.gym.running()) {
      s.gym.run()
    }
    iterDone()
  } else { // start visualize after some trainig epoch
    if (s.gym.running()) {
      s.gym.run()
    } else {
      1
      iterDone()
    }
  }
  //s.stats.draw([`Generation ${s.gym.e}`, `Iteration ${s.gym.i} / ${s.gym.maxI}`, s.gym.checkPointHistory])
}


function genSettings(num, len, fov) {
  return {
    sensor: {
      num,
      len,
      fov,
    }
  }
}

function restart() {
  s.gym = new Gym(getCurrentSettings())
  s.gym.reset()
  s.stats = new Statistics(s.gym.environment)
}

function getCurrentSettings() {
  const num = parseInt(getValue(NUM_SENSORS))
  const len = parseInt(getValue(LEN_SENSORS))
  const fov = parseInt(getValue(FOV))
  return genSettings(num, len, fov)
}

function getValue(id) {
  var el = document.getElementById(id);
  return el.value;
}

initCanvas = () => {
  var canvasDiv = document.getElementById('p5-canvas');
  var width = canvasDiv.offsetWidth;
  const factor = width / 886
  canvasW = 886 * factor;
  canvasH = 500 * factor;
  canvas = createCanvas(canvasW, canvasH);
  canvas.parent('p5-canvas');
  return factor;
}

numSensorSlider = (initialValue) => {
  var slider = document.getElementById(NUM_SENSORS);
  slider.value = initialValue
  var output = document.getElementById("numSensorSliderValue");
  output.innerHTML = slider.value;
  slider.oninput = function () {
    output.innerHTML = this.value;
  }
}

lengthSensorSlider = (initialValue) => {
  var slider = document.getElementById(LEN_SENSORS);
  slider.value = initialValue
  var output = document.getElementById("lengthSensorSliderValue");
  output.innerHTML = slider.value;
  slider.oninput = function () {
    output.innerHTML = this.value;
  }
}

fovSlider = (initialValue) => {
  var slider = document.getElementById(FOV);
  slider.value = initialValue
  var output = document.getElementById("fovSliderValue");
  output.innerHTML = slider.value;
  slider.oninput = function () {
    output.innerHTML = this.value;
  }
}

function iterDone() {
  s.gym.e++
  s.gym.evaluate()
  s.gym.reset()
}


function toggleSensors() {
  s.gym.environment.showSensors = !s.gym.environment.showSensors
}