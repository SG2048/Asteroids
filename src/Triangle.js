class Triangle {
  constructor (a, b, c = new Vec(0, 0)) {
    this.vertices = [a, b, c]
  }

  getPointPairs () {
    return this.vertices.map((v, i, a) => [a.at(i-1), a.at(i)])
  }

  isInside (p) {
    let thetas = this.vertices.map(v => v.subtract(p).theta() * 180 / Math.PI)
    const lines = this.getPointPairs()
    // console.log(...lines.flat());
    const sides = lines.map(([a, b]) => {
      return b.subtract(a).cross(p.subtract(a)) > 0
    })
     const inside = sides.every((b) => b === sides[0])

     return inside
  }

  midpoint(){
    return this.vertices.reduce((p, c, i, a) => c.add(p)).scale(1 / verticeArray.length)
  }

  area(){
    const [aa, bb, cc] = this.vertices
    // console.log(aa.x, aa.y, bb.x, bb.y, cc.x, cc.y);
    return 0.5 * (aa.x * (bb.y - cc.y) + bb.x * (cc.y - aa.y) + cc.x * (aa.y - bb.y))
  }

  

}

console.log(new Triangle(new Vec(2, 0), new Vec(0, 2), new Vec(1,0)).area())
