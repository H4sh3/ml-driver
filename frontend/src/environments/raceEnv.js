class RaceEnv {
  constructor() {
    this.bs = 30
    this.type = 'RaceEnv'
    this.buildings = []
    this.checkpoints = []
    this.addBuildings(this.bs)
    this.addCheckpoints(this.bs)
    this.bounds = getBounds(this.checkpoints)
    this.showSensors = false
    this.textPosition = createVector(210, 200)
    this.requiredCheckpoints = 25
    this.episodesBeforeRestart = 30
    this.agentSettings = {
      start: createVector(this.bs * 14.5, this.bs * 2.5),
      inputFactor: 1,
      extraInputs: 0,
      accReduction: 1.5,
      velReduction: 1.25,
      steerRange: 5,
    }

    this.dummyAgent = new Agent({ start: createVector(this.bs * 23, this.bs * 9), inputFactor: 1 })
    const cS = getCurrentSettings()
    this.dummyAgent.initSensors(cS.sensor)
  }

  toggleSensorVis() {
    this.showSensors = !this.showSensors
  }

  reset() {

  }

  update() {

  }

  getCollisionObjects() {
    return this.buildings
  }

  draw(scaleF) {
    drawBuildings(this.buildings, scaleF)
    drawCheckpoints(this.checkpoints)
  }

  getInputs(agent) {
    return getSensorCollisionsWith(agent, this.buildings, this.showSensors)
  }

  addBuildings(bs) {
    const lines1 = [
      new Line(bs, bs, bs * 12, bs),
      new Line(bs * 18, bs, 28 * bs, bs),
      new Line(bs, bs, bs, 15 * bs),
      new Line(bs, 15 * bs, bs * 9, 15 * bs),
      new Line(bs * 15, 15 * bs, 26 * bs, 15 * bs),
      new Line(28 * bs, bs, 28 * bs, 8 * bs),
      new Line(26 * bs, 8 * bs, 28 * bs, 8 * bs),
      new Line(26 * bs, 8 * bs, 26 * bs, 15 * bs),
      new Line(bs * 12, bs * 1, bs * 12, bs * 6),
      new Line(bs * 18, bs * 1, bs * 18, bs * 6),
      new Line(bs * 12, bs * 6, bs * 18, bs * 6),
      new Line(bs * 20, bs * 4, bs * 26, bs * 4),
      new Line(bs * 26, bs * 4, bs * 26, bs * 6),
      new Line(bs * 20, bs * 4, bs * 20, bs * 8),
      new Line(bs * 24, bs * 6, bs * 26, bs * 6),
      new Line(bs * 16, bs * 13, bs * 24, bs * 13),
      new Line(bs * 24, bs * 6, bs * 24, bs * 13),
      new Line(bs * 10, bs * 8, bs * 20, bs * 8),
      new Line(bs * 10, bs * 8, bs * 10, bs * 4),
      new Line(bs * 4, bs * 4, bs * 10, bs * 4),
      new Line(bs * 4, bs * 4, bs * 4, bs * 14),
      new Line(bs * 12, bs * 11, bs * 4, bs * 14),
      new Line(bs * 12, bs * 11, bs * 16, bs * 13),
      new Line(bs * 12, bs * 13, bs * 15, bs * 15),
      new Line(bs * 12, bs * 13, bs * 9, bs * 15),
    ]
    const lines = [
      new Line(202, 62.96417555528751, 138, 104.94029259214585),
      new Line(138, 104.94029259214585, 106, 175.89991901159684),
      new Line(106, 175.89991901159684, 92, 254.85499629521135),
      new Line(92, 254.85499629521135, 102, 340.8060930849689),
      new Line(102, 340.8060930849689, 153, 427.75662123274685),
      new Line(153, 427.75662123274685, 241, 466.7344441955439),
      new Line(241, 466.7344441955439, 361, 479.7270518498096),
      new Line(361, 479.7270518498096, 493, 478.72762049178914),
      new Line(493, 478.72762049178914, 614, 477.7281891337687),
      new Line(614, 477.7281891337687, 727, 475.72932641772786),
      new Line(727, 475.72932641772786, 829, 454.7412678992987),
      new Line(829, 454.7412678992987, 890, 393.775955060052),
      new Line(890, 393.775955060052, 899, 302.8277014801923),
      new Line(899, 302.8277014801923, 879, 217.87603604845518),
      new Line(879, 217.87603604845518, 849, 145.91697827098375),
      new Line(849, 145.91697827098375, 800, 75.95678320955318),
      new Line(800, 75.95678320955318, 717, 47.97270518498096),
      new Line(717, 47.97270518498096, 616, 32.98123481467441),
      new Line(616, 32.98123481467441, 517, 27.984078024572227),
      new Line(517, 27.984078024572227, 517, 27.984078024572227),
      new Line(416, 29.9829407406131, 416, 29.9829407406131),
      new Line(204, 63.96360691330794, 272, 41.97611703685834),
      new Line(273, 39.977254320817465, 355, 29.9829407406131),
      new Line(355, 29.9829407406131, 519, 27.984078024572227),
      new Line(363, 106.93915530818671, 294, 111.93631209828891),
      new Line(294, 111.93631209828891, 212, 152.9129977771268),
      new Line(212, 152.9129977771268, 190, 208.88115382627126),
      new Line(190, 208.88115382627126, 183, 277.8419175296814),
      new Line(183, 277.8419175296814, 199, 351.7998380231937),
      new Line(199, 351.7998380231937, 266, 391.7770923440112),
      new Line(266, 391.7770923440112, 381, 405.7691313562973),
      new Line(381, 405.7691313562973, 475, 406.76856271431774),
      new Line(476, 406.76856271431774, 603, 407.7679940723381),
      new Line(603, 407.7679940723381, 720, 401.7714059242155),
      new Line(720, 401.7714059242155, 813, 360.7947202453776),
      new Line(813, 360.7947202453776, 823, 273.84419209759966),
      new Line(823, 273.84419209759966, 807, 199.88627160408734),
      new Line(807, 199.88627160408734, 738, 140.91982148088155),
      new Line(738, 140.91982148088155, 656, 98.94370444402323),
      new Line(656, 98.94370444402323, 509, 95.94541036996192),
      new Line(509, 95.94541036996192, 400, 96.94484172798235),
      new Line(396, 97.9442730860028, 361, 108.93801802422759)
    ]
    const block = new Block()
    lines.forEach((l, index) => {
      text(index, (l.p1.x + l.p2.x) / 2, (l.p1.y + l.p2.y) / 2)
      block.lines.push(l)
    })
    this.buildings.push(block);
  }

  addCheckpoints(bs) {
    const checkpoints1 = [
      new Line(10 * bs, 4 * bs, 12 * bs, 4 * bs),
      new Line(12 * bs, 6 * bs, 12 * bs, 8 * bs),
      new Line(18 * bs, 4 * bs, 20 * bs, 4 * bs),
      new Line(24 * bs, 1 * bs, 24 * bs, 4 * bs),
      new Line(26 * bs, 4 * bs, 28 * bs, 4 * bs),
      new Line(22 * bs, 13 * bs, 22 * bs, 15 * bs),
      new Line(12 * bs, 11 * bs, 12 * bs, 13 * bs),
      new Line(4 * bs, 14 * bs, 4 * bs, 15 * bs),
      new Line(1 * bs, 8 * bs, 4 * bs, 8 * bs),
    ]

    const checkpoints = [
      new Line(469, 23.98635259249048, 468, 105.93972395016628),
      new Line(602, 27.984078024572227, 591, 108.93801802422759),
      new Line(719, 40.9766856788379, 681, 123.92948839453415),
      new Line(830, 98.94370444402323, 769, 173.90105629555597),
      new Line(879, 196.887977530026, 804, 229.86921234470043),
      new Line(910, 292.83338789998794, 812, 297.8305446900901),
      new Line(904, 391.7770923440112, 805, 354.798132097255),
      new Line(858, 451.74297382523736, 748, 379.7839160477659),
      new Line(715, 486.72307135595264, 687, 393.775955060052),
      new Line(595, 485.7236399979322, 586, 398.77311185015424),
      new Line(499, 484.72420863991175, 492, 399.7725432081747),
      new Line(296, 481.7259145658505, 320, 388.77879826994985),
      new Line(171, 442.7480916030534, 234, 363.79301431943895),
      new Line(97, 351.7998380231937, 200, 316.8197404924784),
      new Line(74, 225.87148691261868, 197, 213.87831061637343),
      new Line(95, 121.93062567849327, 243, 155.9112918511881),
      new Line(235, 32.98123481467441, 308, 124.92891975255458),
      new Line(365, 19.988627160408733, 392, 113.93517481432977)
    ]

    checkpoints.forEach(l => {
      const block = new Block()
      block.lines.push(l)
      this.checkpoints.push(block)
    })
  }
}