
// for border & checkpoint changes

let x = '[\n'
this.checkpoints.forEach(b => {
    b.lines.forEach(line => {
        const x1 = line.p1.x.toFixed(4)
        const y1 = line.p1.y.toFixed(4)
        const x2 = line.p2.x.toFixed(4)
        const y2 = line.p2.y.toFixed(4)
        x += `new Line(${x1},${y1},${x2},${y2}),\n`
    })
})
x += ']'