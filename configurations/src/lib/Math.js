function vectorFromAngle(degreeAngle) {
  // angle in radians
  const radiansAngle = degreeToRadians(degreeAngle % 360)
  return { x: Math.round(Math.cos(radiansAngle) * 100) / 100, y: Math.round(Math.sin(radiansAngle) * 100) / 100 }
}

function degreeToRadians(d) {
  const rad = d * (Math.PI / 180)
  return Math.round(rad * 100) / 100
}

export {
  vectorFromAngle,
  degreeToRadians
}