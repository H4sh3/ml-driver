class Box {
    constructor(x, y, width, height) {
        this.pos = createVector(x,y)
        this.size = { x: width, y: height }
        this.lines = [
            new Line(x, y, x + this.size.x, y), // top
            new Line(x, y + this.size.y, x + this.size.x, y + this.size.y), // bottom
            new Line(x, y, x, y + this.size.y), // left
            new Line(x + this.size.x, y, x + this.size.x, y + this.size.y), // right
        ]
    }

    draw() {
        for (let l of this.lines) {
            l.draw()
        }
        //fill(219, 96, 20, 50)
        noFill()
        strokeWeight(3)
        rect(this.pos.x , this.pos.y , this.size.x, this.size.y)
    }
}