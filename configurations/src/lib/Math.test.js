import { vectorFromAngle, degreeToRadians } from './Math'

test('should convert degree to radians', () => {
  let radians = degreeToRadians(0)
  expect(radians).toBe(0)

  radians = degreeToRadians(90)
  expect(radians).toBe(1.57)

  radians = degreeToRadians(180)
  expect(radians).toBe(3.14)
})

test('should create vector', () => {
  const v = vectorFromAngle(0)
  expect(v.x).toBe(1)
  expect(v.y).toBe(0)

  const v1 = vectorFromAngle(180)
  expect(v1.x).toBe(-1)
  expect(v1.y).toBe(0)
})