class Environment {
    constructor() {

    }

    run() {
        text(this.i, width / 2, height / 2)
        this.i++
        this.updateAgent()
    }

    running() {
        return !this.done()
    }

    done() {
        return this.targets.length === 0
    }
}
