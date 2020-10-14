class Agent {
    constructor(pos, stepSize) {
        this.pos = pos;
        this.size = 10
    }

    kill() {
        this.alive = false;
    }

    draw() {
        noStroke()
        fill(0)
        rect(this.pos.x - this.size / 2, this.pos.y - this.size / 2, this.size, this.size)
    }

    update(ratingMatrix, targets) {

    }
}