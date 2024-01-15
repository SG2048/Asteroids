class Triangle {
  constructor(a, b, c = new Vec(0, 0)) {
    this.vertices = [a, b, c]
  }
  getPointPairs() {
    // let lines = []
    // for (let i = 0; i < this.vertices.length - 1; i++) {
    //    lines.push([this.vertices[i], this.vertices[i + 1]])
    //  }
    //  return lines
    return this.vertices.map((v, i, a) => [a.at(i - 1), a.at(i)])
  }
  isInside(p) {
    let lines = this.getPointPairs()
    let sides = lines.map(([a, b]) => {
      return b.subtract(a).cross(p.subtract(a)) > 0
    })
    let inside = sides.every((b) => b === sides[0])
    return inside
  }
  get midPoint() {
    return this.vertices.reduce((p, c, i, a) => c.add(p)).scale(1 / this.vertices.length)
  }
  get area() {
    const [aa, bb, cc] = this.vertices
    return Math.abs(0.5 * (aa.x * (bb.y - cc.y) + bb.x * (cc.y - aa.y) + cc.x * (aa.y - bb.y)))
  }
}
let t1 = new Triangle(new Vec(0, 5), new Vec(5, 0))
console.log(t1.area)