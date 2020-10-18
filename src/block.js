class Block {
  constructor(pos, size, id) {
    this.pos = pos;
    this.size = size;
    this.id = id ? id : `id:${random()}`

    this.lines = []
  }

  colliding(l) {
    const intersections = []
    this.lines.forEach(blockLine => {
      const inters = checkLineIntersection(l, blockLine)
      if (inters) {
        intersections.push(inters)
      }
    })

    return intersections;
  }
}

class Line {
  constructor(x1, y1, x2, y2) {
    this.p1 = createVector(x1, y1);
    this.p2 = createVector(x2, y2);
  }
}

function checkLineIntersection(l1, l2) {
  const x1 = l1.p1.x
  const y1 = l1.p1.y
  const x2 = l1.p2.x
  const y2 = l1.p2.y
  const x3 = l2.p1.x
  const y3 = l2.p1.y
  const x4 = l2.p2.x
  const y4 = l2.p2.y
  const x = checkIntersection(x1, y1, x2, y2, x3, y3, x4, y4)

  if (x) {
    return x
  } else {
    return false
  }
}

function checkIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
  const denom = ((y4 - y3) * (x2 - x1)) - ((x4 - x3) * (y2 - y1));
  const numeA = ((x4 - x3) * (y1 - y3)) - ((y4 - y3) * (x1 - x3));
  const numeB = ((x2 - x1) * (y1 - y3)) - ((y2 - y1) * (x1 - x3));
  if (denom == 0) {
    if (numeA == 0 && numeB == 0) {
      return false;
    }
    return false;
  }
  const uA = numeA / denom;
  const uB = numeB / denom;
  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    return createVector(x1 + (uA * (x2 - x1)),y1 + (uA * (y2 - y1)));
  }
  return false;
}

function intersecting(point) {
  const result = intersectResult('intersecting');
  result.point = point;
  return point;
}

function intersectResult(type) {
  return {
    type
  };
}