let spawnpoints;
let agents;
let boxes
let population
let showSensors

let ratingMatrix

setup = () => {
    frameRate(60)
    initSpawnpoints()
    createCanvas(800, 800)
    showSensors = false
    ratingMatrix = new RatingMatrix(width, height, 14)

    //initBoxes()
    initMaze(ratingMatrix.blockWidth, ratingMatrix.blockHeight)

    population = new Population(ratingMatrix)
    population.reset()
}

draw = () => {
    background(255)
    ratingMatrix.drawMatrix()
    drawTarget()
    population.run(boxes)
    for (let b of boxes) {
        b.draw()
    }
}

initMaze = (bW, bH) => {
    boxes = []
    boxes.push(new Box(0, 0, width, bH))
    boxes.push(new Box(0, height - bH, width, bH))
    boxes.push(new Box(0, 0, bW, height))
    boxes.push(new Box(width - bW, 0, bW, height))

    boxes.push(new Box(bW, 5 * bH, width / 2 - 2 * bW, bH))
    boxes.push(new Box(width / 2 + 2 * bW, 5 * bH, width / 2 - 2 * bW, bH))

    boxes.push(new Box(bW, 9 * bH, width - bW - 2 * bW, bH))

}

initBoxes = () => {
    boxes = []
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            if (x <= 1 && y <= 1) {
                continue;
            }
            if (x === y) {
                continue;
            }
            boxes.push(new Box(x * width / 10, y * height / 10, 25, 25))
        }
    }
}

initSpawnpoints = () => {
    spawnpoints = [
        createVector(width / 2, 0),
        createVector(width / 2, height),
        createVector(0, height / 2),
        createVector(width, height / 2),
    ]
}

drawTarget = () => {
    fill(0, 255, 0)
    ellipse(population.target.x, population.target.y, 15, 15)
}


