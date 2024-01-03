class Triangle {
  constructor (a, b, c = new Vec(0, 0)) {
    this.vertices = [a, b, c]
  }

  isInside (p) {
    let thetas = this.vertices.map(v => v.subtract(p).theta() * 180 / Math.PI)
    console.log(this.vertices)
    console.log(thetas)
    console.log(thetas.reduce((p, c, i, a) => c - p, thetas[2]))
  }

  midpoint(){
    return this.vertices.reduce((p, c, i, a) => c.add(p)).scale(1 / verticeArray.length)
  }

  area(){
    const [aa, bb, cc] = this.vertices
    console.log(aa.x, aa.y, bb.x, bb.y, cc.x, cc.y);
    return 0.5 * (aa.x * (bb.y - cc.y) + bb.x * (cc.y - aa.y) + cc.x * (aa.y - bb.y))
  }

  

}

console.log(new Triangle(new Vec(2, 0), new Vec(0, 2), new Vec(1,0)).area())
