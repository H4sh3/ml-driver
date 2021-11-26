s = {

}

function setup() {
    initCanvas()
    s.roads = [
    ]
    s.checkpoints = [
    ]

    s.grid = []

    const maxX = 40
    const maxY = 20

    for (let x = 1; x < maxX; x++) {
        for (let y = 1; y < maxY; y++) {
            s.grid.push(createVector((width / maxX) * x, (height / maxY) * y))
        }
    }

    s.bs = 30
    s.p1 = null
    s.editRoad = true

    s.bg = loadImage("newTrack.png")
}

function draw() {
    image(s.bg, 0, 0, width, height)

    s.grid.map(r => {
        if (createVector(mouseX, mouseY).dist(r) < 15) {
            fill(0, 255, 0)
        } else {
            fill(255)
        }
        ellipse(r.x, r.y, 3, 3)
    })

    stroke(0, 255, 0)
    s.checkpoints.map(l => {
        line(l.p1.x, l.p1.y, l.p2.x, l.p2.y)
    })
    stroke(0)
    s.roads.map(l => {
        line(l.p1.x, l.p1.y, l.p2.x, l.p2.y)
    })

    noStroke()
    if (s.editRoad) {
        text("ROAD MODE", 10, 10)
    } else {
        text("CHECKPOINT MODE", 10, 10)
    }
}

function keyPressed(value) {
    if (value.key === "Enter") {
        // switch mode
        s.editRoad = !s.editRoad
        s.p1 = null
    }
    console.log(value)
    if (value.code === "Space") {
        // console.log roads and checkpoints
        let roadStr = ''
        s.roads.map(x => {
            roadStr += `new Line(${x.p1.x},${x.p1.y},${x.p2.x},${x.p2.y}),\n`
        })
        console.log("roadStr")
        console.log(roadStr)

        let checkpointsStr = ''
        s.checkpoints.map(x => {
            checkpointsStr += `new Line(${x.p1.x},${x.p1.y},${x.p2.x},${x.p2.y}),\n`
        })
        console.log("checkpointsStr")
        console.log(checkpointsStr)
    }
}

function mousePressed() {
    let mX = 0
    let mY = 0
    s.grid.map(r => {
        if (createVector(mouseX, mouseY).dist(r) < 15) {
            mX = r.x
            mY = r.y
        }
    })
    mX = mouseX
    mY = mouseY
    if (s["p1"] != null) {
        const element = new Line(s["p1"].x, s["p1"].y, mX, mY)
        if (s.editRoad) {
            s.roads.push(element)
        } else {
            s.checkpoints.push(element)
        }
        s["p1"] = null
    } else {
        s["p1"] = {
            "x": mX,
            "y": mY,
        }
    }
}

initCanvas = () => {
    var canvasDiv = document.getElementById('p5-canvas');
    var width = canvasDiv.offsetWidth;
    const factor = width / 886
    canvasW = 886 * factor;
    canvasH = 500 * factor;
    canvas = createCanvas(canvasW, canvasH);
    canvas.parent('p5-canvas');
    return factor;
}