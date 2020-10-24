class Statistics {
  constructor(env) {
    this.pos = this.getStatisticPos(env)
    this.size = this.getStatisticSize(env)
    this.bs = env.bs
  }

  getStatisticPos(env) {
    return createVector(env.bs * 2, env.bs * 2)
  }

  getStatisticSize(env) {
    return createVector(env.bs * 3, env.bs * 2)
  }

  draw(s) {
    fill(255)
    stroke(0)
    rect(this.pos.x, this.pos.y, this.size.x, this.size.y + this.bs)
    fill(0)
    noStroke()
    push()
    translate(this.pos.x, this.pos.y + this.bs)
    text(s[0], 0, 0)
    text(s[1], 0, 20)
    this.drawHistory(s[2])
    pop()
  }

  drawHistory(hist) {

    const max = Math.max(...hist)
    text('Checkpoints reached', 0, 40)
    for (let i = 1; i < hist.length; i++) {
      const dp1 = hist[i - 1]
      const dp2 = hist[i]
      if (dp1, dp2) {
        const sx1 = map(i - 1, 0, hist.length, 0, 100)
        const sy1 = map(dp1, 0, max, 0, 50)

        const sx2 = map(i, 0, hist.length, 0, 100)
        const sy2 = map(dp2, 0, max, 0, 50)
        stroke(1)
        const yEnd = height * 0.25 - 3 - sy2
        line(sx1, height * 0.25 - 3 - sy1, sx2, yEnd)
        if (i == hist.length - 1) {
          text(max, sx2, yEnd - 2)
        }
      }

    }

  }
}