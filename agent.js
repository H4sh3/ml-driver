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

    update(ratingMatrix, e, i, maxI) {
        // check surrounding s
        let action;
        /*if (i > maxI * 0.1) { // explore
            action = random(['up', 'down', 'left', 'right'])
        } else { // use best action
            action = ratingMatrix.getBestActionForPos(this.pos)
        }
        */
        if (random() > 0.3) {
            action = random(['up', 'down', 'left', 'right'])
        } else {
            action = ratingMatrix.getBestActionForPos(this.pos)
        }
        


        if (action === 'up') {
            this.pos.add(createVector(0, -this.stepSize.y))
        } else if (action === 'down') {
            this.pos.add(createVector(0, this.stepSize.y))
        } else if (action === 'left') {
            this.pos.add(createVector(-this.stepSize.x, 0))
        } else if (action === 'right') {
            this.pos.add(createVector(this.stepSize.x, 0))
        }
    }
}