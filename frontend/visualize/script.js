
const NUM_SENSORS = "numSensorSlider";
const LEN_SENSORS = "lengthSensorSlider";
const FOV = "fovSlider"

const s = {}

setup = () => {
  initSlider(NUM_SENSORS, 5, "1")
  initSlider(LEN_SENSORS, 5, "5")
  initSlider(FOV, 5, "5")
  initCanvas()
  const x = getAllEntry()

  s.data = new Map()


  s.nSet = new Set()
  s.lSet = new Set()
  s.fSet = new Set()


  x.forEach(v => {
    const p = parseEntry(v)
    s.nSet.add(p.n)
    s.lSet.add(p.l)
    s.fSet.add(p.f)
    if (!s.data.has(p.f)) {
      s.data.set(p.f, [])
    }
    s.data.get(p.f).push(p)
  })

  background(147, 198, 219)
  visData(s.data, 20)
}

function visData(data, n) {
  push()
  stroke(5)
  line(-250, 0, 250, 0)
  line(0, -250, 0, 250)
  data.get(n).forEach(v => visValue(v))
  pop()
}

function visValue(v) {

  const bs = 5

  const x = map(v.l, 0, 125, 0, 550)
  const y = map(v.n, 2, 10, 0, 200)

  if (v.d) {
    fill(0, map(v.c, 8, 23, 0, 255), 0)
  } else {
    fill(255, 0, 0)
  }
  noStroke()
  rect(x, y, bs, bs)
}

function normalize(v) {
  v.n /= 9
  v.l /= 125
  v.f /= 370
  return v
}

function parseEntry(x) {
  // ["RaceEnv-8-60-230", 11, true]
  key = x[0]
  settings = key.split('-')
  return {
    "n": parseInt(settings[1]), // num
    "l": parseInt(settings[2]), // len
    "f": parseInt(settings[3]), // fov
    "c": x[1], // checkpoints
    "d": x[2], // done
  }
}

draw = () => {

}

initCanvas = () => {
  canvas = createCanvas(1000, 400);
  canvas.parent('p5-canvas');
}

function initSlider(id, val, step) {
  var slider = document.getElementById(id);
  slider.value = val;
  slider.step = step;
  slider.oninput = function () {
    output.innerHTML = this.value;
    if (this.id == FOV) {
      visData(s.data, parseInt(this.value))
    }
  }
  var output = document.getElementById(`${id}Value`);
  output.innerHTML = slider.value;
}

function toggleSensors() {
  s.gym.environment.showSensors = !s.gym.environment.showSensors
}
