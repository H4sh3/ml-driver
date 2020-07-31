class Box {
    constructor(x, y, width, height) {
        this.pos = createVector(x, y)
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
        fill(120, 120, 120)
        strokeWeight(3)
        rect(this.pos.x, this.pos.y, this.size.x, this.size.y)
    }
}

initBoxes = (width,height,bW,bH) => {
    let boxes = []

    boxes.push(new Box(0, 0, width, bH))
    boxes.push(new Box(0, height - bH, width, bH))
    boxes.push(new Box(0, 0, bW, height))
    boxes.push(new Box(width - bW, 0, bW, height))

    boxes.push(new Box(bW, 5 * bH, width / 2 - 2 * bW, bH))
    boxes.push(new Box(width / 2 + 2 * bW, 5 * bH, width / 2 - 2 * bW, bH))

    boxes.push(new Box(bW*5, 9 * bH, width - bW - 5 * bW, bH))

    boxes.push(new Box(bW, 17 * bH, width - bW - 5 * bW, bH))
    boxes.push(new Box(bW*3, 19 * bH, width - bW - 5 * bW, bH))
    boxes.push(new Box(bW*19, 12*bH, bW, bH*8))
    boxes.push(new Box(bW*15, 10*bH, bW, bH*6))
    boxes.push(new Box(bW*13, 11*bH, bW, bH*6))
    boxes.push(new Box(bW*11, 10*bH, bW, bH*6))

    return boxes
}
