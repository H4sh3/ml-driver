class RatingMatrix {
    constructor(width, height, res) {
        this.resolution = res
        this.matrix = initField(this.resolution)
        this.blockWidth = width / this.resolution
        this.blockHeight = height / this.resolution
    }

    drawMatrix() {
        for (let n = 0; n < this.matrix.length; n++) {
            for (let m = 0; m < this.matrix[n].length; m++) {
                if (this.matrix[n] && this.matrix[n][m]) {
                    noStroke()
                    fill(0, map(this.matrix[n][m], 0, 1, 0, 255), 0)
                }
                rect(this.blockWidth * n, this.blockHeight * m, this.blockWidth, this.blockHeight)
            }
        }
    }

    addDeltaAtPos(pos, delta) {
        const cords = this.getCordsForPos(pos)
        this.matrix[cords.n][cords.m] += delta
    }

    setRatingAtPos(pos, rating) {
        const cords = this.getCordsForPos(pos)
        this.matrix[cords.n][cords.m] = rating
    }

    getCordsForPos = (pos) => {
        const n = Math.floor(pos.x / this.blockWidth)
        const m = Math.floor(pos.y / this.blockHeight)
        return { n, m }
    }

    getBestActionForCords(n, m) {
        const actionRatingPairs = [
            { direction: 'up', value: fieldWrapper(this.matrix, n, m - 1) },
            { direction: 'down', value: fieldWrapper(this.matrix, n, m + 1) },
            { direction: 'left', value: fieldWrapper(this.matrix, n - 1, m) },
            { direction: 'right', value: fieldWrapper(this.matrix, n + 1, m) },
        ]

        actionRatingPairs.sort((a, b) => (a.value < b.value) ? 1 : ((b.value < a.value) ? -1 : 0));
        const highestRating = actionRatingPairs[0].value
        const bestPairs = actionRatingPairs.filter(e => e.value === highestRating)

        return bestPairs[Math.floor(Math.random() * bestPairs.length)].direction;
    }

    getBestActionForPos(pos) {
        const { n, m } = this.getCordsForPos(pos)
        return this.getBestActionForCords(n, m)
    }
}

fieldWrapper = (matrix, n, m) => {
    return matrix[n] && typeof matrix[n][m] !== 'undefined' ? matrix[n][m] : 0
}

initField = (res) => {
    const m = []
    for (let i = 0; i < res; i++) {
        let n = []
        for (let j = 0; j < res; j++) {
            n.push(Math.random())
        }
        m.push(n)
    }
    return m
}
