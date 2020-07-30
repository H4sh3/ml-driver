drawMatrix = (matrix, maxReward, blockWidth, blockHeight) => {
    for (let n = 0; n < matrix.length; n++) {
        for (let m = 0; m < matrix[n].length; m++) {
            if (matrix[n] && matrix[n][m]) {
                drawDirectionArrows(matrix, n, m, blockWidth, blockHeight, maxReward)
            }
        }
    }
}

drawDirectionArrows = (matrix, n, m, blockWidth, blockHeight, maxReward) => {
    const aW = blockWidth / 2
    const aH = blockHeight / 2

    const drawVertex = (i) => {
        f = [() => {
            vertex(0, 0)
            vertex(aW, aH)
            vertex(blockWidth, 0)
        },
        () => {
            vertex(aW, aH)
            vertex(blockWidth, blockHeight)
            vertex(0, blockHeight)
        },
        () => {
            vertex(0, 0)
            vertex(aW, aH)
            vertex(0, blockHeight)
        },
        () => {
            vertex(blockWidth, 0)
            vertex(aW, aH)
            vertex(blockWidth, blockHeight)
        }]
        f[i]()
    }

    for (let i of [0, 1, 2, 3]) {
        const g = map(matrix[n][m][i], 0, maxReward, 255, 0)
        fill(0, 0, g)

        push()
        const position = { x: blockWidth * n, y: blockHeight * m }
        translate(position.x, position.y)

        beginShape()

        strokeWeight(0.5)
        drawVertex(i)

        endShape(CLOSE)
        pop()

    }
}