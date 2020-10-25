class Statistics {
  constructor(env) {
    this.pos = this.getStatisticPos(env)
    this.size = this.getStatisticSize(env)
    this.pos.x+=10
    this.pos.y+=10

    this.size.x-=20
    this.size.y-=20
    this.bs = env.bs
  }

  getStatisticPos(env) {
    return createVector(env.bs * 3, env.bs * 3)
  }

  getStatisticSize(env) {
    return createVector(env.bs * 5.5, env.bs * 4)
  }

  draw(s) {
    fill(255)
    stroke(0)
    rect(this.pos.x, this.pos.y, this.size.x, this.size.y)
    fill(0)
    noStroke()
    push()
    translate(this.pos.x, this.pos.y + this.bs*0.5)
    //text(s[0], 5, 0)
    //text(s[1], 5, 20)

    text('Checkpoints reached', 5, 10)
    this.drawHistory(s[2])
    pop()
  }

  drawHistory(hist) {

    const max = Math.max(...hist)
    for (let i = 1; i < hist.length; i++) {
      const dp1 = hist[i - 1]
      const dp2 = hist[i]
      if (dp1, dp2) {
        const sx1 = map(i - 1, 0, hist.length, 0, this.bs*2)
        const sy1 = map(dp1, 0, max, this.bs * 2, this.bs*1.1)

        const sx2 = map(i, 0, hist.length, 0, this.bs*2)
        const sy2 = map(dp2, 0, max, this.bs * 2, this.bs*1.1)
        stroke(1)
        line(sx1, sy1, sx2, sy2)
        if (i == hist.length - 1) {
          text(max, sx2, sy2 - 2)
        }
      }

    }

  }
}