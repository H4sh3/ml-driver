class Agent {
    constructor(pos, stepSize) {
        this.pos = pos;
        this.size = 10
        this.stepSize = stepSize;
        this.alive = true
        this.finished = false
    }

    kill() {
        this.alive = false;
    }

    draw() {
        stroke(1)

        if (this.alive) {
            stroke(0, 0, 0, 10)
            fill(0)
        } else {
            stroke(0, 0, 0, 10)
            fill(255, 0, 0)
        }

        rect(this.pos.x - this.size / 2, this.pos.y - this.size / 2, this.best ? this.size * 2 : this.size, this.size)
        stroke(255, 0, 0)
    }

    update(ratingMatrix) {
        let action;

        if (random() > 0.9) {
            // pick random action
            action = random([0, 1, 2, 3])
        } else {
            // use ratingMatrix
            action = ratingMatrix.getBestAction(this.pos)
        }

        if (action === 0) {
            this.pos.add(createVector(0, -this.stepSize.y))
        } else if (action === 1) {
            this.pos.add(createVector(0, this.stepSize.y))
        } else if (action === 2) {
            this.pos.add(createVector(-this.stepSize.x, 0))
        } else if (action === 3) {
            this.pos.add(createVector(this.stepSize.x, 0))
        }

        return action
    }
}