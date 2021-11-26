const s = {

}

const NUM_SENSORS = "numSensorSlider";
const LEN_SENSORS = "lengthSensorSlider";
const FOV = "fovSlider"

setup = () => {
  s.fastTrain = false
  s.posted = false
  angleMode(DEGREES)

  s.selectedEnv = new TrafficEnv()

  const settings = settingsFromUrl(window.location.search.substr(1))

  if (settings) {
    initSlider(NUM_SENSORS, settings.n, "1")
    initSlider(LEN_SENSORS, settings.l, "5")
    initSlider(FOV, settings.f, "5")
    s.gym = new Gym(genSettings(settings.n, settings.l, settings.f), s.selectedEnv)
  } else {
    initSlider(NUM_SENSORS, 7, "1")
    initSlider(LEN_SENSORS, 80, "5")
    initSlider(FOV, 170, "5")
    s.gym = new Gym(getCurrentSettings(), s.selectedEnv)
  }

  init()
}

function settingsFromUrl(url) {
  const params = []
  url.split('&').forEach(p => {
    params.push(p.split('='))
  })

  if (params.length != 4) {
    return false
  }

  const env = params[0][1]
  const n = parseInt(params[1][1])
  const l = parseInt(params[2][1])
  const f = parseInt(params[3][1])

  if (env == "RaceEnv") {
    s.selectedEnv = new RaceEnv()
  } else {
    s.selectedEnv = new TrafficEnv()
  }

  return { env, n, l, f }
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

function mousePressed() {

}

draw = () => {

  background(147, 198, 219)
  if (s.posted) {
    noStroke()
    text("Agent couldn't solve in 15 episodes, change settings or restart to try again", 50, 50)
    renderSettings()
    return
  }

  checkSolved()

  // fast train / explore (don't visualize)
  s.render.environment(s.gym.environment)
  if (s.fastTrain || s.gym.best.checkpoints < s.gym.environment.requiredCheckpoints) {
    s.render.inTraining()
    while (s.gym.running()) {
      s.gym.run()
    }
    s.gym.evaluate()
  } else {
    if (s.gym.running()) {
      s.render.agents(s.gym.agents.filter(a => a.timeDead < 50), s.gym.environment.toggleSensors)
      s.gym.agents.filter(a => isOutOfBounds(a, s.gym.environment.bounds)).map(a => a.kill())
      s.gym.run()
    } else {
      s.gym.evaluate()
    }
  }
  /* 
    let highscoreAgentIndex;
    let highscore = 0
    s.gym.agents.filter(a => a.alive).map((a, i) => {
      // a.isBest = false
      if (a.reachedCheckpoints > highscore) {
        highscoreAgentIndex = i
        highscore = a.reachedCheckpoints
      }
    })
    if (highscoreAgentIndex) {
      s.gym.agents[highscoreAgentIndex].isBest = true
      s.render.renderAgent(s.gym.agents[highscoreAgentIndex])
    } */

  s.gym.environment.checkpoints.map((block, i) => {
    text(i, block.lines[0].p1.x, block.lines[0].p1.y)
  })

  renderSettings()
}

function checkSolved() {
  // cant solve apparently
  if (!s.posted && s.gym.reachedLimit > 15) {
    postEntry(s.gym.environment.type, s.gym.settings, s.gym.best, false)
    s.posted = true
  }

  // did not solve in episode limit
  if (s.gym.e > s.gym.environment.episodesBeforeRestart && s.gym.best.checkpoints < s.gym.environment.requiredCheckpoints) {
    s.gym.e = 0
    s.gym.reachedLimit++
    s.gym.reset()
    s.gym.setBest(0, false)
  }

  // solved
  if (!s.gym.solved && s.gym.best.checkpoints >= s.gym.environment.requiredCheckpoints) {
    s.gym.solved = true
  }
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

function toggleEnv(envIndex) {
  switch (envIndex) {
    case 0:
      s.selectedEnv = new EightEnv()
      break;
    case 1:
      s.selectedEnv = new RaceEnv()
      break;
    case 2:
      s.selectedEnv = new TargetEnv()
      break;
    case 3:
      s.selectedEnv = new TrafficEnv()
      break;
  }
  console.log(s.selectedEnv)
  s.gym = new Gym(getCurrentSettings(), s.selectedEnv)
  init()
}