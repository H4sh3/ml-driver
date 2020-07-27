function mutate(x) {
    if (random(1) < 0.1) {
        let offset = randomGaussian() * 0.5;
        let newx = x + offset;
        return newx;
    } else {
        return x;
    }
}
class Agent {
    constructor(pos, brain) {

        if (brain instanceof NeuralNetwork) {
            this.brain = brain.copy();
        } else {
            this.brain = new NeuralNetwork(6, 24, 4);
        }

        this.pos = pos.copy();
        this.vel = createVector(0, 0)


        this.size = 10
        this.stepsize = 10;
        this.alive = true
        this.finished = false
        this.closest = Infinity
        this.sensorLength = 50
        this.best = false
        this.stepsToFinished = 0
        this.maxSpeed = 5

        this.sensors = []
        // left
        this.sensors.push(new Line(this.pos.x, this.pos.y, this.pos.x - this.sensorLength, this.pos.y))
        // right
        this.sensors.push(new Line(this.pos.x, this.pos.y, this.pos.x + this.sensorLength, this.pos.y))
        // up
        this.sensors.push(new Line(this.pos.x, this.pos.y, this.pos.x, this.pos.y - this.sensorLength))
        // down
        this.sensors.push(new Line(this.pos.x, this.pos.y, this.pos.x, this.pos.y + this.sensorLength))


        //find length
        const p0 = createVector(0, 0)
        const p1 = createVector(0, this.sensorLength)
        let p2 = createVector(0, 0)

        while (p0.dist(p2) < p0.dist(p1)) {
            p2.add(createVector(1, 1))
        }
        const diagSensorLength = p2.x

        // top left
        //this.sensors.push(new Line(this.pos.x, this.pos.y, this.pos.x - diagSensorLength, this.pos.y - diagSensorLength))
        //// top right
        //this.sensors.push(new Line(this.pos.x, this.pos.y, this.pos.x + diagSensorLength, this.pos.y - diagSensorLength))
        //// bottom right
        //this.sensors.push(new Line(this.pos.x, this.pos.y, this.pos.x + diagSensorLength, this.pos.y + diagSensorLength))
        //// bottom left
        //this.sensors.push(new Line(this.pos.x, this.pos.y, this.pos.x - diagSensorLength, this.pos.y + diagSensorLength))
    }

    mutate() {
        this.brain.mutate(mutate);
    }

    updateClosest(target) {
        const dist = this.pos.dist(target)
        this.closest = dist < this.closest ? dist : this.closest
    }

    kill() {
        this.alive = false;
    }

    draw() {
        stroke(0)
        if (this.best) {
            fill(0, 0, 255)
        } else {
            if (this.alive) {
                stroke(0, 0, 0, 10)
                fill(0, 255, 0)
            } else {
                stroke(0, 0, 0, 10)
                fill(255, 0, 0)
            }

        }
        rect(this.pos.x - this.size / 2, this.pos.y - this.size / 2, this.best ? this.size * 2 : this.size, this.size)
        stroke(255, 0, 0)
        if (showSensors) {
            for (let s of this.sensors) { s.draw() }
        }
    }

    update(inputs,i) {
        if (this.pos.x < 10 || this.pos.x > width - 10 || this.pos.y < 10 || this.pos.y > height - 10) {
            this.kill()
        }

        if (!this.finished) {
            this.stepsToFinished += 1
        }

        if (i % 5 === 0) {

            const output = this.brain.predict(inputs)
            let action = output.indexOf(Math.max(...output));

            let acc = createVector(0, 0)
            if (action === 0) { // up
                acc.add(createVector(0, -this.stepsize))
            } else if (action === 1) { // down
                acc.add(createVector(0, this.stepsize))
            } else if (action === 2) { // left
                acc.add(createVector(-this.stepsize, 0))
            } else if (action === 3) { // right
                acc.add(createVector(this.stepsize, 0))
            }

            this.vel.add(acc).limit(this.maxSpeed)
        }
        this.pos.add(this.vel)

    }

    add(v) {
        for (let i = 0; i < this.sensors.length; i++) {
            this.sensors[i].add(v)
        }
        this.pos.add(v)
    }
}