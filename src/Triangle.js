class Triangle {
  constructor(a, b, c = new Vec(0, 0)) {
    this.vertices = [a, b, c]
  }

  get pointPairs() {
    return arrayPairs(this.vertices) // .map((v, i, a) => [a.at(i - 1), a.at(i)])
  }

  isInside(p) {
    const sides = this.pointPairs.map(([a, b]) => { return b.subtract(a).cross(p.subtract(a)) > 0 })
    return sides.every((b) => b === sides[0])
  }

  get midpoint() {
    // return this.vertices.reduce((p, c) => c.add(p)).scale(1 / this.vertices.length)
    return this.vertices.reduce(Vec.add).scale(1 / this.vertices.length)
  }

  get area() {
    const [aa, bb, cc] = this.vertices
    return 0.5 * (aa.x * (bb.y - cc.y) + bb.x * (cc.y - aa.y) + cc.x * (aa.y - bb.y))
  }


}
// let t1 = new Triangle(new Vec(0, 5), new Vec(5, 0))
// console.log(t1.getPointPairs())