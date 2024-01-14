class SpaceObject {
    constructor(s, v, baseShape, theta = 0, ttl = 999999) {
        this.s = s
        this.v = v
        this.baseShape = baseShape
        this.theta = theta
        this.omega = 0.05
        this.ttl = ttl
        this.cooldown = 0
        this.mass = this.getMass() / 100
        this.recentre()
    }

    recentre() {
        let com = this.getLocalCOM()
        this.s = this.s.add(com)
        this.baseShape = this.baseShape.map(c => c.subtract(com))
    }

    update(dt) {
        this.ttl -= dt
        this.cooldown -= dt
        this.s = this.s.add(this.v.scale(dt))
        this.v = this.v.scale(0.995)
    }
    checkBounds(bx, by) {
        const x = this.s.x
        const xx = (x + bx) % bx
        const y = this.s.y
        const yy = (y + by) % by
        this.s = new Vec(xx, yy)
    }
    accelerate(keys) {
        if (keys["ArrowUp"]) this.v = this.v.add(this.facing().scale(0.35))
        if (keys["ArrowDown"]) this.v = this.v.add(this.facing().scale(-1).scale(0.35))
        if (keys["ArrowRight"]) this.theta += this.omega
        if (keys["ArrowLeft"]) this.theta -= this.omega
        if (keys[" "] && this.cooldown < 0) {
            this.cooldown = 30
            objects.push(new SpaceObject(this.s.add(this.facing().scale(80)), this.facing().scale(5).add(this.v), bulletShape, this.theta, 200))
            this.v = this.v.add(this.facing().scale(-0.5))
        }
    }
    getShape() {
        return this.baseShape.map((p) => this.convertGlobalToLocal(p))
    }

    convertGlobalToLocal(p) {
        return p.rotate(this.theta).add(this.s)
    }
    convertLocalToGlobal(p) {
        return p.subtract(this.s).rotate(-this.theta)
    }

    getPointPairs() {
        return this.getShape().map((v, i, a) => [a.at(i - 1), a.at(i)])
    }

    getLocalPointPairs() {
        return this.baseShape.map((v, i, a) => [a.at(i - 1), a.at(i)])
    }

    getTriangles() {
        return this.getPointPairs().map(v => new Triangle(v[0], v[1], this.s))
    }

    getLocalTriangles() {
        return this.getLocalPointPairs().map(v => new Triangle(v[0], v[1]))
    }

    facing() {
        return new Vec(0, -1).rotate(this.theta)
    }
    isOneInside(a) {
        return !a.every(p => !this.isInside(p))
    }
    isInside(p) {
        const triangles = this.getTriangles()
        return !triangles.every(t => !t.isInside(p))

    }
    receiveImpulse(j) {
        this.v = this.v.add(j.scale(1 / this.mass))
    }

    getMass() {
        let triangles = this.getTriangles()
        let mass = triangles.reduce((p, c, i, a) => p + c.area, 0)
        return mass
    }

    getLocalCOM() {
        let triangles = this.getLocalTriangles()
        let mass = triangles.reduce((p, c, i, a) => p + c.area, 0)
        let weightedVec = triangles.reduce((p, c, i, a) => p.add(c.midpoint.scale(c.area)), new Vec(0, 0))
        return weightedVec.scale(1 / mass)
    }
}