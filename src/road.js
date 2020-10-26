class Road {
  constructor(start, direction, length) {
    /*
    @start where cars come from
    @direction used to update where the cars drive (-1,0) (1,0) (0,-1) (0,1) also diag (1,1)
    @length length of the road
    */
    this.start = start.copy();
    this.direction = direction.copy();
    this.cars = []
    this.end = this.start.copy().add(direction.mult(length))
  }

  update(i) {
    if (i % 25 == 1) {
      this.cars.push(new Car(this.start.copy().add(createVector(15, 0))))
    }
    this.cars.forEach(c => c.move(this.direction))
    this.cars = this.cars.filter(c => c.lines[0].p1.dist(this.end) > 50)
  }
}