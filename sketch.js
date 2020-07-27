let spawnpoints;
let agents;
let boxes
let population

let showSensors

setup = () => {
    frameRate(60)
    initSpawnpoints()
    createCanvas(800, 800)
    showSensors = false

    //initBoxes()
    initMaze()

    population = new Population()
    population.init()
}

initMaze = () => {
    boxes = []
    const wallsize = 20
    boxes.push(new Box(0, 0, width, wallsize))
    boxes.push(new Box(0, height - wallsize, width, wallsize))
    boxes.push(new Box(0, 0, wallsize, height))
    boxes.push(new Box(width-wallsize, 0, wallsize, height))

    boxes.push(new Box(wallsize,150,width/2-50,wallsize))
    boxes.push(new Box(width/2+50,150,width/2-50,wallsize))

    boxes.push(new Box(wallsize+75,350,width-wallsize-100,wallsize))
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

draw = () => {
    background(120)
    drawTarget()
    population.run(boxes)
    for (let b of boxes) {
        b.draw()
    }
}

drawTarget = () => {
    fill(0, 255, 0)
    ellipse(population.target.x, population.target.y, 15, 15)
}


