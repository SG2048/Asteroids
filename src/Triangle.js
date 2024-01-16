class Triangle {
  constructor(a, b, c = new Vec(0, 0)) {
    this.vertices = [a, b, c]
  }
  get pointPairs() {
    return arrayPairs(this.vertices)
  }
  isInside(p) {
    let lines = this.pointPairs
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
  static makeTriangle(length = 100, width = 50){
    return [new Vec(0, -length), new Vec(-width/2, 0), new Vec(width/2, 0)]
  }
}
