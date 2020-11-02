
const NUM_SENSORS = "numSensorSlider";

const s = {}

setup = () => {
  initSlider(NUM_SENSORS, 5, "1")

  initCanvas()
  const x = getAllEntrys()

  s.data = new Map()


  s.nSet = new Set()
  s.lSet = new Set()
  s.fSet = new Set()


  x.forEach(v => {
    const p = parseEntry(v)
    s.nSet.add(p.n)
    s.lSet.add(p.l)
    s.fSet.add(p.f)
    if (!s.data.has(p.n)) {
      s.data.set(p.n, [])
    }
    s.data.get(p.n).push(p)
  })

  visData(s.data, 2)
}

function visData(data, n) {
  stroke(5)
  background(147, 198, 219)
  data.get(n).forEach(v => visValue(v))
}

function visValue(v) {

  const bs = 5

  const x = map(v.f, 20, 370, 0, s.fSet.size)
  const y = map(v.l, 0, 125, 0, s.lSet.size)

  noStroke()
  if (v.d) {
    fill(0, map(v.c, 8, 23, 0, 255), 0)
    rect(x*bs*1.1, y*bs*1.5, bs, bs)
  }
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
    if (this.id == NUM_SENSORS) {
      visData(s.data, parseInt(this.value))
    }
  }
  var output = document.getElementById(`${id}Value`);
  output.innerHTML = slider.value;
}

function toggleSensors() {
  s.gym.environment.showSensors = !s.gym.environment.showSensors
}
