class Population {
    constructor() {
        this.target;
        this.agents;
        this.numAgents = 1000
        this.maxIters = 300
        this.i = 0
    }

    init(newBatch) {
        this.agents = []
        this.i = 0
        this.target = createVector(width / 2 - 250, height - 100)
        const spawnPos = createVector(50, 50)

        if (!newBatch) { // first generation
            this.spawnAgentsAt(spawnPos)
        } else if (newBatch.length > 0) {
            // add the agents we selected in last evaluation
            newBatch.forEach((agent, index) => {
                const a = new Agent(spawnPos, agent.brain, false)
                a.best = index === 0
                this.agents.push(a)
            })

            // add 1/3 of the population with new agents
            for (let i = 0; i < Math.floor(this.numAgents / 3); i++) {
                this.agents.push(new Agent(spawnPos))
            }

            // fill up with mutation of best
            while (this.agents.length < this.numAgents) {
                const agent = new Agent(spawnPos, newBatch[0].brain)
                agent.mutate()
                this.agents.push(agent)
            }
        }
    }

    evaluation() {
        const closest = new MaxSizedArray(this.numAgents / 10, 'closest')
        this.agents.map(a => closest.add(a))

        // find agent that required the least steps
        const quickest = new MaxSizedArray(this.numAgents / 10, 'stepsToFinished')
        this.agents.filter(a => a.finished).map(a => quickest.add(a))

        console.log(quickest)
        const newBatch = [...quickest.elements, ...closest.elements]

        this.init(newBatch)
        this.i = 0
    }

    spawnAgentsAt(spawnPos) {
        while (this.agents.length < this.numAgents) {
            this.agents.push(new Agent(spawnPos))
        }
    }

    run(boxes) {
        if (this.running()) {
            for (let a of this.agents) {
                a.draw()
                this.updateAgent(boxes, a)
            }
            stroke(0)
            text(this.i, width / 2, 20)
            this.i += 1
        } else {
            this.evaluation()
        }
    }

    updateAgent(boxes, a) {
        if (a.alive) {
            // collision with box
            for (let box of boxes) {
                if (a.pos.x < box.pos.x + box.size.x &&
                    a.pos.x + a.size > box.pos.x &&
                    a.pos.y < box.pos.y + box.size.y &&
                    a.pos.y + a.size > box.pos.y) {
                    a.kill()
                }
            }

            if (!a.finished) {
                a.updateClosest(this.target)
                a.update(this.getInputsForAgent(boxes, a), this.i)
            }
        }

        // reached target ?
        a.finished = a.pos.dist(this.target) < 20

    }


    running() {
        return !this.done() && this.popAlive()
    }

    done() {
        return this.i > this.maxIters
    }

    popAlive() {
        return this.agents.length > 0
    }

    getInputsForAgent(boxes, agent) {
        const boxesToCheck = boxes//.filter(b => b.pos.dist(agent.pos) < 100)

        const inputs = []
        for (let sensor of agent.sensors) {
            let cpfs;
            for (let box of boxesToCheck) {
                let intersectionsWithBox = []
                for (let side of box.lines) {
                    const intersection = sensor.checkIntersection(side)
                    if (intersection.point) {
                        intersectionsWithBox.push({ interPoint: intersection.point, dist: intersection.point.dist(agent.pos) })
                    }
                }

                if (intersectionsWithBox.length > 0) {
                    let closest = intersectionsWithBox[0]
                    for (let intersection of intersectionsWithBox) {
                        closest = intersection.dist < closest.dist ? intersection : closest
                    }
                    if (!cpfs) {
                        cpfs = closest
                    } else {
                        cpfs = closest.dist < cpfs.dist ? closest : cpfs
                    }
                }
            }
            if (cpfs) {

                if (showSensors) {
                    stroke(255, 0, 0)
                    line(agent.pos.x, agent.pos.y, cpfs.interPoint.x, cpfs.interPoint.y)
                }

                inputs.push(map(cpfs.dist, 0, 50, 0, 1))
            } else {
                inputs.push(1)
            }
        }

        // add current x pos
        inputs.push(map(agent.pos.x, 0, width, 0, 1))
        // add current y pos
        inputs.push(map(agent.pos.y, 0, height, 0, 1))

        return inputs
    }
}
