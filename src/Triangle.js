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

  get midpoint(){
    return Triangle.midpoint(this.vertices)
  }

  static midpoint(verticeArray) {
    return verticeArray.reduce((p, c, i, a) => c.add(p)).scale(1 / verticeArray.length)
  }

}

console.log(new Triangle(new Vec(100, 0), new Vec(0, 100)).midpoint)
