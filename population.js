class Population {
    constructor(ratingMatrix) {
        this.ratingMatrix = ratingMatrix
        this.spawnPos = createVector(this.ratingMatrix.blockWidth * 1.5, this.ratingMatrix.blockHeight * 1.5)
        this.target = createVector(this.ratingMatrix.blockWidth*2.5, height - this.ratingMatrix.blockHeight *2.5)
        this.agents;
        this.numAgents = 1000
        this.maxIterations = 300
        this.i = 0
        this.e = 0
    }

    run(boxes) {
        if (this.running()) {
            for (let a of this.agents) {
                a.draw()
                this.updateAgent(boxes, a)
            }
            stroke(0)
            text(this.i, width / 2, 20)
            
            this.agents = this.agents.filter(a => a.alive)
            this.spawnAgents()
            
        } else {
            this.e += 1
            this.reset()
        }
    }

    updateAgent(boxes, a) {
        if (a.alive) {

            a.update(this.ratingMatrix, this.e, this.i, this.maxIterations)

            // after update check if still alive
            let alive = true
            // out of bounds
            if (a.pos.x < ratingMatrix.blockWidth || a.pos.x > width - ratingMatrix.blockWidth || a.pos.y < ratingMatrix.blockHeight || a.pos.y > height - ratingMatrix.blockHeight) {
                alive = false
            }
            // collision with box
            for (let box of boxes) {
                if (a.pos.x < box.pos.x + box.size.x &&
                    a.pos.x + a.size > box.pos.x &&
                    a.pos.y < box.pos.y + box.size.y &&
                    a.pos.y + a.size > box.pos.y) {
                    alive = false
                    break;
                }
            }
            if (!alive) {
                a.kill()
                this.ratingMatrix.addDeltaAtPos(a.pos, -1)
            }else{

                const maxDistDiag = createVector(this.ratingMatrix.blockWidth,this.ratingMatrix.blockHeight).dist(createVector(width-this.ratingMatrix.blockWidth,height-this.ratingMatrix.blockHeight))

                this.ratingMatrix.setRatingAtPos(a.pos, map(createVector(50,50).dist(a.pos),0,maxDistDiag,0,1))
            }

        }

        // reached target ?
        a.finished = a.pos.dist(this.target) < 20

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
