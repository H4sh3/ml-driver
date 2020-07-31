class Environment {
    constructor() {
        this.ratingMatrix = new RatingMatrix(width, height, 14)
        this.spawnPos = createVector(this.ratingMatrix.blockWidth * 1.5, this.ratingMatrix.blockHeight * 1.5)
        this.targets = []
        this.addTargets()
        this.boxes = initBoxes(width, height, this.ratingMatrix.blockWidth, this.ratingMatrix.blockHeight)
        this.agent;
        this.i = 0
        this.e = 0
    }

    run() {
        text(this.i, width / 2, height / 2)
        this.i++
        this.updateAgent()
    }

    addTargets() {
        // this.targets.push(createVector((width / 2) - this.ratingMatrix.blockWidth / 2, height / 2 - this.ratingMatrix.blockHeight * 3.5))
        // this.targets.push(createVector(this.ratingMatrix.blockWidth * 1.5, height - this.ratingMatrix.blockHeight * 2.5))
        this.targets.push({ m: 20, n: 11 })
        //this.targets.push({ m: 7, n: 3 })
    }

    draw() {
        drawMatrix(...this.ratingMatrix.getDrawParams())
        drawTargets(this.targets, this.ratingMatrix.blockWidth, this.ratingMatrix.blockHeight)
        drawBoxes(this.boxes)
        this.agent.draw()
    }

    updateAgent() {
        const oldPos = this.agent.pos.copy()
        const action = this.agent.update(this.ratingMatrix, this.targets)
        // after update check if still alive
        // out of bounds

        // collision with box
        let died = false
        for (let box of this.boxes) {
            if (this.agent.pos.x < box.pos.x + box.size.x &&
                this.agent.pos.x + this.agent.size > box.pos.x &&
                this.agent.pos.y < box.pos.y + box.size.y &&
                this.agent.pos.y + this.agent.size > box.pos.y) {
                died = true
                break;
            }
        }

        // found target ? 
        const cords = this.ratingMatrix.getCordsForPos(this.agent.pos)
        const foundTarget = this.targets.some(t => t.n === cords.n && t.m === cords.m)


        let reward = 0
        if (foundTarget) {
            reward = 10
        } else if (died) {
            reward = -1
            this.agent.pos = oldPos
        } else {
            reward = -0.1
        }

        let oldValue = this.ratingMatrix.getMatrixAtPos(oldPos, this.targets)[action]
        let next_max = this.ratingMatrix.getHighestRewardAtPos(this.agent.pos, this.targets)
        //text(next_max, a.pos.x, a.pos.y)
        let newValue = (1 - 0.6) * oldValue + 1 * (reward + 0.6 * next_max)
        //let newValue = oldValue + (reward + next_max)
        this.ratingMatrix.setRewardAtPos(oldPos, action, newValue, this.targets)
        this.targets = this.targets.filter(t => !(t.n === cords.n && t.m === cords.m))
    }

    stringifyTargets() {
        let s = ''
        for (let t of this.targets) {
            s += `${t.x},${t.y}`
        }
        return s
    }

    reset() {
        this.spawnAgent()
        this.addTargets()
        this.i = 0
    }

    spawnAgent() {
        this.agent = new Agent(createVector(this.spawnPos.x, this.spawnPos.y), { x: this.ratingMatrix.blockWidth, y: this.ratingMatrix.blockHeight })
    }

    running() {
        return !this.done()
    }

    done() {
        return this.targets.length === 0
    }
}
