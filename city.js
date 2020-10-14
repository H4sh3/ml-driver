class City {
  constructor() {
    this.props = {
      w: 6,
      h: 6,
    }
    this.addBuildings()
  }

  addBuildings() {
    this.buildings = []
    for (let x = 0; x < this.props.w; x++) {
      for (let y = 0; y < this.props.h; y++) {
        
        const posX = map(x, 0, this.props.w, 0, width);
        const posY = map(y, 0, this.props.h, 0, height);
        const w = (width / this.props.w) *0.55//* random(0.5, 0.75);
        const h = (width / this.props.h) *0.55//* random(0.5, 0.75);

        this.buildings.push(new Building(createVector(posX, posY), createVector(w, h)));
      }
    }

  }
}