class Population {
    constructor(ratingMatrix) {
        this.ratingMatrix = ratingMatrix
        this.spawnPos = createVector(this.ratingMatrix.blockWidth * 1.5, this.ratingMatrix.blockHeight * 1.5)
        //this.target = createVector(this.ratingMatrix.blockWidth * 2.5, height - this.ratingMatrix.blockHeight * 2.5)
        //this.target = createVector(this.ratingMatrix.blockWidth * 2.5, height/2 )
        this.targets = [//createVector((width / 2) + this.ratingMatrix.blockWidth / 2, height / 2 - this.ratingMatrix.blockHeight * 2.5),
        createVector(this.ratingMatrix.blockWidth * 1.5, height - this.ratingMatrix.blockHeight * 2.5)]
        this.agents;
        this.numAgents = 1
        this.maxIterations = 300
        this.i = 0
        this.e = 0
    }

    run(boxes) {
        if (this.running()) {
            for (let a of this.agents) {
                // a.draw()
                this.updateAgent(boxes, a)
            }
            stroke(0)

            this.agents = this.agents.filter(a => a.alive)
            this.spawnAgents()

        } else {
            this.e += 1
            this.reset()
        }
    }

    updateAgent(boxes, a) {
        if (a.alive) {


            const oldPos = a.pos.copy()
            const action = a.update(this.ratingMatrix, this.e, this.i, this.maxIterations)
            // after update check if still alive
            // out of bounds

            // collision with box
            for (let box of boxes) {
                if (a.pos.x < box.pos.x + box.size.x &&
                    a.pos.x + a.size > box.pos.x &&
                    a.pos.y < box.pos.y + box.size.y &&
                    a.pos.y + a.size > box.pos.y) {
                    a.kill()
                    break;
                }
            }

            // reached target ?
            let foundTarget = false
            this.targets.map(t => {
                if (a.pos.dist(t) < 25) {
                    foundTarget = true
                }
            })
            this.targets = this.targets.filter(t => a.pos.dist(t) > 20)

            for (let target of this.targets) {

                if (a.pos.dist(target) < 20) {
                    foundTarget = true
                    break;
                }
            }

            let reward = -1
            if (foundTarget) {
                reward = 1
                this.ratingMatrix.setRewardAtPos(oldPos, action, reward)
            } else {
                if (a.alive) {
                    reward = this.ratingMatrix.getHighestRewardAtPos(a.pos) * 0.9
                    this.ratingMatrix.setRewardAtPos(oldPos, action, reward)
                } else {
                    reward = -10
                    this.ratingMatrix.setRewardAtPos(oldPos, action, reward)
                }
            }


        }
    }

    reset() {
        this.i = 0
        this.agents = []
        this.spawnAgents()
    }

    spawnAgents() {
        while (this.agents.length < this.numAgents) {
            this.agents.push(new Agent(createVector(this.spawnPos.x, this.spawnPos.y), { x: this.ratingMatrix.blockWidth, y: this.ratingMatrix.blockHeight }))
        }
    }

    running() {
        return !this.done() && this.popAlive()
    }

    done() {
        return this.i > this.maxIterations
    }

    popAlive() {
        return this.agents.filter(a => a.alive).length > 0
    }
}
