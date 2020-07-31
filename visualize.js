drawMatrix = (matrix, maxReward, minReward, blockWidth, blockHeight) => {
    for (let n = 0; n < matrix.length; n++) {
        for (let m = 0; m < matrix[n].length; m++) {
            if (matrix[n] && matrix[n][m]) {
                drawDirectionArrows(matrix, n, m, blockWidth, blockHeight, maxReward, minReward)
            }
        }
    }
}

drawDirectionArrows = (matrix, n, m, blockWidth, blockHeight, maxReward, minReward) => {
    const aW = blockWidth / 2
    const aH = blockHeight / 2

    const drawVertex = (i) => {
        f = [() => {
            vertex(aW, aH)
            vertex(blockWidth, blockHeight)
            vertex(0, blockHeight)
        },
        () => {
            vertex(0, 0)
            vertex(aW, aH)
            vertex(blockWidth, 0)
        },
        () => {
            vertex(blockWidth, 0)
            vertex(aW, aH)
            vertex(blockWidth, blockHeight)
        },
        () => {
            vertex(0, 0)
            vertex(aW, aH)
            vertex(0, blockHeight)
        }]
        f[i]()
    }


    for (let i of [0, 1, 2, 3]) {
        stroke(255,255,255)
        if(matrix[n][m].hasTarget[i]){
            const g = map(matrix[n][m].hasTarget[i], minReward, maxReward, 0, 255)
            fill(0, g, 0)
        }else{
            fill(255,255,255)
        }

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

getMinRmaxR = (arr) => {
    let minR = arr[0];
    let maxR = arr[0];

    for (let i = 1; i <= arr.length; i++) {
        if (arr[i] < minR) {
            minR = arr[i]
        }
        if (arr[i] > maxR) {
            maxR = arr[i]
        }
    }
    return { minR, maxR }
}

// boxes

drawBoxes = (boxes) => {
    for (let b of boxes) {
        b.draw()
    }
}

drawTargets = (targets, bW, bH) => {
    for (let b of targets) {
        fill(255, 0, 0)
        noStroke()
        ellipse(bW * 0.5 + (b.n * bW), bH * 0.5 + (b.m * bH), 15, 15)
    }
}