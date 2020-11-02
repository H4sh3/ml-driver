const s = {

}

const NUM_SENSORS = "numSensorSlider";
const LEN_SENSORS = "lengthSensorSlider";
const FOV = "fovSlider"

setup = () => {
  s.fastTrain = false
  s.posted = false
  angleMode(DEGREES)

  s.selectedEnv = new RaceEnv()
  
  initSlider(NUM_SENSORS,5, "1")
  initSlider(LEN_SENSORS,80, "5")
  initSlider(FOV,90, "5")

  //s.gym = new Gym(genSettings(parsed.num, parsed.len, parsed.fov), new RaceEnv())
  s.gym = new Gym(getCurrentSettings(), s.selectedEnv)
  init()
}

function parseSelection(sel) {
  const split = sel.split('-')
  return {
    env: split[0],
    num: parseInt(split[1]),
    len: parseInt(split[2]),
    fov: parseInt(split[3]),
  }
}

function init() {
  const scaleF = initCanvas()
  s.stats = new Statistics(s.gym.environment)
  s.render = new Render(scaleF, s.gym.environment.textPosition)
}

draw = () => {

  background(147, 198, 219)
  if (s.posted) {
    noStroke()
    text("Agent can't solve with this settings, change settings or restart to try again", 50, 50)
    renderSettings()
    return
  }
  
  if (!s.posted && s.gym.reachedLimit > 15) { // cant solve apparently
    postEntry(s.gym.environment.type, s.gym.settings, s.gym.best, false)
    s.posted = true
  }

  if (s.gym.e > s.gym.environment.episodesBeforeRestart && s.gym.best.checkpoints < s.gym.environment.requiredCheckpoints) {
    s.gym.e = 0
    s.gym.reachedLimit++
    s.gym.reset()
    s.gym.setBest(0,false)
  }

  if (!s.gym.solved && s.gym.best.checkpoints >= s.gym.environment.requiredCheckpoints) {
    s.gym.solved = true
  }

  if (s.fastTrain || s.gym.best.checkpoints < s.gym.environment.requiredCheckpoints) { // train / explore
    while (s.gym.running()) {
      s.gym.run()
      if (s.gym.i % 100 == 0) {
        s.render.environment(s.gym.environment)
        s.render.agents(s.gym.agents)

      }
    }
    s.gym.evaluate()
  } else {
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
      s.gym.evaluate()
    }
  }
  renderSettings()
}

function renderSettings() {
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
  s.posted = false
}

function getCurrentSettings() {
  const num = getValue(NUM_SENSORS)
  const len = getValue(LEN_SENSORS)
  const fov = getValue(FOV)
  return genSettings(num, len, fov)
}

function getValue(id) {
  var el = document.getElementById(id);
  return parseInt(el.value);
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

function initSlider(id, val, step) {
  var slider = document.getElementById(id);
  slider.value = val;
  slider.step = step;
  slider.oninput = function () {
    output.innerHTML = this.value;
  }
  var output = document.getElementById(`${id}Value`);
  output.innerHTML = slider.value;
}

function toggleSensors() {
  s.gym.environment.showSensors = !s.gym.environment.showSensors
}

function toggleFastTrain() {
  s.fastTrain = !s.fastTrain
}

function toggleEnv() {
  if (s.selectedEnv.type == 'RaceEnv') {
    s.selectedEnv = new TrafficEnv()
  } else {
    s.selectedEnv = new RaceEnv()
  }
  s.gym = new Gym(getCurrentSettings(), s.selectedEnv)
  init()
}