class Race {
  constructor() {
    this.bs = width / 16
    this.buildings = []
    this.checkPoints = []
    this.addBuildings(this.bs)
    this.addCheckpoints(this.bs)
  }

  addBuildings(bs) {
    const blocks = [
      { x: 0, y: 0, w: width, h: bs },
      { x: 0, y: height - bs, w: width, h: bs },
      { x: 0, y: bs, w: bs, h: height - bs * 2 },
      { x: width - bs, y: bs, w: bs, h: height - bs * 2 },
      { x: 2 * bs, y: bs * 2, w: bs * 3, h: bs * 3 },
      { x: 2 * bs, y: bs * 5, w: bs * 1, h: bs * 2 },
      { x: 4 * bs, y: bs * 6, w: bs * 2, h: bs * 2 },
      { x: 5 * bs, y: bs * 4, w: bs * 2, h: bs * 1 },
      { x: 6 * bs, y: bs * 1, w: bs * 3, h: bs * 2 },
      { x: 10 * bs, y: bs * 2, w: bs * 4, h: bs * 1 },
      { x: 10 * bs, y: bs * 3, w: bs * 2, h: bs * 4 },
      { x: 13 * bs, y: bs * 4, w: bs * 2, h: bs * 4 },
      { x: 7 * bs, y: bs * 4, w: bs * 3, h: bs * 3 },
    ]

    blocks.forEach(b => {
      this.buildings.push(new Building(createVector(b.x, b.y), createVector(b.w, b.h)));
    })
  }

  addCheckpoints(bs) {
    const checkPoints = [
      { x: 5 * bs, y: 2.25 * bs, w: bs * 1, h: bs * 0.5 },
      { x: 9 * bs, y: 2.25 * bs, w: bs * 1, h: bs * 0.5 },
      { x: 14 * bs, y: 2.25 * bs, w: bs * 1, h: bs * 0.5 },
      { x: 12 * bs, y: 5.25 * bs, w: bs * 1, h: bs * 0.5 },
      { x: 6 * bs, y: 6.25 * bs, w: bs * 1, h: bs * 0.5 },
      { x: 3 * bs, y: 6.25 * bs, w: bs * 1, h: bs * 0.5 },
      { x: 1 * bs, y: 4.25 * bs, w: bs * 1, h: bs * 0.5 },
      { x: 7 * bs, y: 3 * bs, w: bs * 0.5, h: bs * 1 },
      { x: 12 * bs, y: 1 * bs, w: bs * 0.5, h: bs * 1 },
      { x: 9 * bs, y: 7 * bs, w: bs * 0.5, h: bs * 1 },
    ]

    checkPoints.forEach(b => {
      this.checkPoints.push(new Building(createVector(b.x, b.y), createVector(b.w, b.h)));
    })
  }
}