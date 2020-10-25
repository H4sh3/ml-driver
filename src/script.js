const s = {

}

const NUM_SENSORS = "numSensorSlider";
const LEN_SENSORS = "lengthSensorSlider";

setup = () => {
  s.w = initCanvas()
  angleMode(DEGREES)
  numSensorSlider(5)
  lengthSensorSlider(125)

  s.gym = new Gym(s.w, genSettings(getValue(NUM_SENSORS), getValue(LEN_SENSORS)))
  s.gym.reset()
  s.stats = new Statistics(s.gym.environment)
}

function genSettings(num, len) {
  return {
    sensor: {
      num,
      len,
    }
  }
}

function restart() {
  s.gym = new Gym(s.w, getCurrentSettings())
  s.gym.reset()
  s.stats = new Statistics(s.gym.environment)
}

function getCurrentSettings() {
  const num = getValue(NUM_SENSORS)
  const len = getValue(LEN_SENSORS)
  return genSettings(num, len)
}

function getValue(id) {
  var el = document.getElementById(id);
  return el.value;
}

initCanvas = () => {
  var canvasDiv = document.getElementById('p5-canvas');
  var width = canvasDiv.offsetWidth;
  const factor = width / 900
  canvasW = 1020 * factor;
  canvasH = 611 * factor;
  canvas = createCanvas(canvasW, canvasH);
  canvas.parent('p5-canvas');
  return canvasW;
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

draw = () => {

  background(147, 198, 219)
  
  if (s.gym.best.checkpoints < 14) { // train / explore
    while (s.gym.running()) {
      s.gym.run()
    }
    iterDone()
  } else { // start visualize after some trainig epoch
    if (s.gym.running()) {
      s.gym.draw()
      s.gym.run()
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


function toggleSensors() {
  s.gym.environment.showSensors = !s.gym.environment.showSensors
}