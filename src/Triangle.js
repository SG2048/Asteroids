class Triangle{
    constructor(a, b, c = new Vec(0, 0)) {
this.vertices = [a, b, c]
    }
    getPointPairs() {
       // let lines = []
       // for (let i = 0; i < this.vertices.length - 1; i++) {
        //    lines.push([this.vertices[i], this.vertices[i + 1]])
      //  }
      //  return lines
      return this.vertices.map((v, i, a) => [a.at(i - 1),a.at(i)])
    }
}
let t1 = new Triangle(new Vec(0, 5), new Vec(5, 0)) 
console.log(t1.getPointPairs())