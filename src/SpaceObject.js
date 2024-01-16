class SpaceObject {
    constructor(s, v, baseShape, theta = 0, ttl = 999999) {
        this.s = s
        this.v = v
        this.baseShape = baseShape
        this.theta = theta
        this.omega = 0.05
        this.ttl = ttl
        this.cooldown = 0
        // this.mass = 10
        this.reCenter()
    }
    update(dt) {
        this.ttl -= dt
        this.cooldown -= dt
        this.s = this.s.add(this.v.scale(dt))
        this.v = this.v.scale(0.995)
        //this.theta+=this.omega*dt
    }
    checkBounds(bx, by) {
        const x = this.s.x
        const xx = (x + bx) % bx
        const y = this.s.y
        const yy = (y + by) % by
        this.s = new Vec(xx, yy)
    }
    accelerate(keys) {
        if (keys["ArrowUp"]) this.v = this.v.add(this.facing.scale(0.35))
        if (keys["ArrowDown"]) this.v = this.v.add(this.facing.scale(-1).scale(0.35))
        if (keys["ArrowRight"]) this.theta += this.omega
        if (keys["ArrowLeft"]) this.theta -= this.omega
        if (keys[" "] && this.cooldown < 0) {
            this.cooldown = 10
            objects.push(new SpaceObject(this.s.add(this.facing.scale(80)), this.facing.scale(5).add(this.v), Triangle.makeTriangle(20,10), this.theta, 100))
            this.v = this.v.add(this.facing.scale(-0.5))
        }
    }
    get shape() {
        return this.baseShape.map((p) => p.rotate(this.theta).add(this.s))
    }
    get facing() {
        return new Vec(0, -1).rotate(this.theta)
    }
    isOneInside(a) {
        return !a.every(p => !this.isInside(p))
    }
    isInside(p) {
        let triangles = this.triangles
        return !triangles.every(t => !t.isInside(p))
    }
    get triangles() {
        return arrayPairs(this.shape).map((v, i, a) => new Triangle(v[0], v[1], this.s))
    }
    get localTriangles() {
        return arrayPairs(this.baseShape).map((v, i, a) => new Triangle(v[0], v[1]))
    }
    receiveImpulse(j) {
        this.v = this.v.add(j.scale(100 / this.mass))
    }
    get mass() {
        let triangles = this.localTriangles
        return triangles.reduce((p, c, i, a) => p + c.area, 0)
    }
    get centerOfMass() {
       let triangles = this.localTriangles
       let weightedVec = triangles.reduce((p, c, i, a) => p.add(c.midPoint.scale(c.area)), new Vec(0, 0))
       return weightedVec.scale(1 / this.mass)
    }
    reCenter() {
        const com = this.centerOfMass
        this.s = this.s.add(com)
        this.baseShape = this.baseShape.map((c) => c.subtract(com))
    } 
    static makeAsteroidShape(size, points) {
        let angle = 0
        let p1 = new Vec(0, -size)
        let coords = [p1]
        for (let i = 1; i < points; i++) {
            angle = ((Math.PI * 2) / points) * i
            coords.push(p1.rotate(angle).scale(Math.random() * 0.8 + 0.2))
        }
        return coords
    }
}