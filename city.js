class City {
  constructor() {
    this.props = {
      w: 5,
      h: 5,
    }
    this.addBuildings()
  }

  addBuildings() {
    this.buildings = []

    this.buildings.push(new Building(createVector(0, 50), createVector(200, height)));
    this.buildings.push(new Building(createVector(width - 200, 50), createVector(200, height)));
    this.buildings.push(new Building(createVector(0, 0), createVector(width, 50)));

    this.buildings.push(new Building(createVector(200, 300), createVector(350, 50)));

    this.buildings.push(new Building(createVector(250, 500), createVector(350, 50)));

  }
}