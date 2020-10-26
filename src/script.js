const s = {

}

const NUM_SENSORS = "numSensorSlider";
const LEN_SENSORS = "lengthSensorSlider";
const FOV = "fovSlider"

setup = () => {
  s.fastTrain = false
  angleMode(DEGREES)

  numSensorSlider(5)
  lengthSensorSlider(95)
  fovSlider(100)
  s.selectedEnv = new RaceEnv()
  init()
}

function init() {
  const scaleF = initCanvas()
  s.gym = new Gym(genSettings(getValue(NUM_SENSORS), getValue(LEN_SENSORS), getValue(FOV)), s.selectedEnv)
  s.gym.reset()
  s.stats = new Statistics(s.gym.environment)
  s.render = new Render(scaleF, s.gym.environment.textPosition)
}

draw = () => {
  if (s.gym.e > s.gym.environment.episodesBeforeRestart && s.gym.best.checkpoints < s.gym.environment.requiredCheckpoints) {
    init(s.selectedEnv)
  }

  background(147, 198, 219)
  if (s.fastTrain || s.gym.best.checkpoints < s.gym.environment.requiredCheckpoints) { // train / explore
    s.render.preTrain(s.gym.e)
    while (s.gym.running()) {
      s.gym.run()
      if (s.gym.i % 100 == 0) {
        s.render.environment(s.gym.environment)
        s.render.agents(s.gym.agents)

      }
    }
    evaluate()
  } else { // start visualize after some trainig epoch
    if (s.gym.running()) {
      s.render.environment(s.gym.environment)
      s.render.agents(s.gym.agents.filter(a => a.timeDead < 50))
      if (s.gym.environment.roads) {
        s.gym.environment.roads.forEach(road => {
          s.render.cars(road.cars)
        })
      }
      s.gym.run()
    } else {
      evaluate()
    }
  }
  s.render.info(s.gym.i, s.gym.maxI, s.gym.e, s.gym.best.checkpoints)
  s.render.currentSettings(getCurrentSettings(), s.gym.environment.dummyAgent)
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
  s.gym = new Gym(getCurrentSettings(), s.selectedEnv)
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

function evaluate() {
  s.gym.e++
  s.gym.evaluate()
  s.gym.reset()
}


function toggleSensors() {
  s.gym.environment.showSensors = !s.gym.environment.showSensors
}


function togglePretrain() {
  s.fastTrain = !s.fastTrain
}

function toggleEnv() {
  if (s.selectedEnv.type == 'RaceEnv') {
    s.selectedEnv = new TrafficEnv()
  } else {
    s.selectedEnv = new RaceEnv()
  }
  init(s.selectedEnv)
}