class Vec{
    constructor(x,y) {
    this.x = x
    this.y = y
    }
    add(a) {
    return new Vec(this.x + a.x, this.y + a.y)
    }
    scale(s) {
        return new Vec(this.x * s, this.y * s)
    }
}
