

function isOutOfBounds(agent) {
    const outTop = agent.pos.x < this.bounds.left
    const outBottom = agent.pos.x > this.bounds.right
    const outLeft = agent.pos.y < this.bounds.top
    const outRight = agent.pos.y > this.bounds.bottom
    return outTop || outBottom || outLeft || outRight
}

function getBounds(checkpoints) {
    bounds = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }
    checkpoints.forEach(c => {
        const l = c.lines[0]
        const pointNames = ["p1", "p2"]
        pointNames.forEach(point => {
            if (l[point].x < this.bounds.left) {
                this.bounds.left = l[point].x
            }
            if (l[point].x > this.bounds.right) {
                this.bounds.right = l[point].x
            }
            if (l[point].y < this.bounds.top) {
                this.bounds.top = l[point].y
            }
            if (l[point].y > this.bounds.bottom) {
                this.bounds.bottom = l[point].y
            }
        })
    })

    return bounds
}