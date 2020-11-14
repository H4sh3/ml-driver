import { settingsFrom, getBoundaries, transform, genMatrix, urlFromCell } from './components/Inspector'

const data = [
  ['RaceEnv-5-100-90', 5, true],
  ['RaceEnv-3-100-120', 5, true],
  ['RaceEnv-5-50-90', 5, true],
  ['RaceEnv-9-100-10', 5, true],
]

test('should parse key', () => {
  const key = 'RaceEnv-5-100-90'
  const settings = settingsFrom(key)
  expect(settings.e).toBe('RaceEnv')
  expect(settings.n).toBe(5)
  expect(settings.l).toBe(100)
  expect(settings.f).toBe(90)
});

test('should transform keys', () => {
  const entrys = transform(data)
  expect(entrys.size).toBe(4)

  const t0 = entrys.get(data[0][0])
  expect(t0.settings.e).toBe('RaceEnv')
  expect(t0.settings.n).toBe(5)

  const t2 = entrys.get(data[2][0])
  expect(t2.settings.e).toBe('RaceEnv')
  expect(t2.settings.n).toBe(5)
  expect(t2.settings.l).toBe(50)
  expect(t2.settings.f).toBe(90)
})

test('should get boundaries from keys', () => {
  const entrys = transform(data)
  const boundaries = getBoundaries(entrys)
  expect(boundaries.n.min).toBe(3)
  expect(boundaries.n.max).toBe(9)
});


test('generate l*f array', () => {
  const entrys = transform(data)
  const boundaries = getBoundaries(entrys)
  const matrix = genMatrix(entrys, boundaries)
  expect(matrix.length).toBe(2)
});

test('should generate url from cell', () => {
  const c = { "settings": { "e": "RaceEnv", "n": 2, "l": 85, "f": 100 }, "checkpoints": 23, "solved": true }
  const url = urlFromCell(c)
  expect(url).toBe('http://localhost:5500/frontend/index.html?env=RaceEnv&n=2&l=85&f=100')
})