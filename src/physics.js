//let canvas = document.getElementById("simulationWindow")
const dl = new DrawLayer(document.getElementById("simulationWindow").getContext("2d"), "white", "black", "white")
const G = 1
let objects = [
    new SpaceObject(new Vec(250, 250), new Vec(0, 0), SpaceObject.makeTriangleShape(50, 20), 0, 99999, "ship"),
]
let gravityObjects = [
    { s: new Vec(250, 250), mass: 1400 },
    { s: new Vec(125, 375), mass: 7000 },
    { s: new Vec(200, 450), mass: 4010 }
]
let grid = [100, 200, 300]
for (const n of grid) {
    for (const m of grid) {
        objects.push(new SpaceObject(new Vec(m, n), new Vec(-1, 1), SpaceObject.makeAsteroidShape(52, 10), 0, 99999))
    }
}
let debugMode = true
let lastTime = 0
let keyLog = {}
document.addEventListener("keydown", (e) => {
    keyLog[e.key] = true
    if (e.key === "p") {
        console.log(objects[0].momentOfInertia)
    }
    if (e.key === "o") {
        //objects.forEach((o) => o.v = putInOrbit(gravityObjects[0], o.s))
    }
    if (e.key === "d") {
        debugMode = !debugMode
    }
})
document.addEventListener("keyup", (e) => { keyLog[e.key] = false })
draw()


function draw() {
    dl.reset()
    objects.forEach((o) => dl.drawShape(o.shape))
    objects.forEach((o, i) => {
        dl.drawArrowRel(o.s, o.v.scale(20))
        const ke = Math.round(o.kineticEnergy)
        const pe = gravitationalPotentials(objects, o.s) * o.mass
        if (debugMode) {
            dl.fillText(ke.toFixed(1), o.s.x, o.s.y, "red")
            dl.fillText(pe.toFixed(1), o.s.x, o.s.y + 20, "blue")
            dl.fillText((ke + pe).toFixed(1), o.s.x - 100, o.s.y, "green")
            dl.drawArrowRel(o.s, calculateGravities(objects, o.s).scale(2500), "green")
        }
        //dl.drawArrowRel(new Vec(100, 100), o.v.scale(5))
        // dl.drawArrowRel(o.s, calculateGravity(gravityObjects[0], o.s).scale(2500), "green")
        dl.drawShape(o.history, true, "white")
        //dl.drawArrowRel(new Vec(50 * i, 200), o.v.scale(5))
    }
    )
    let gridTwo = [50, 100, 150, 200, 250, 300, 350, 400, 450]
    for (const n of gridTwo) {
        for (const m of gridTwo) {
            //ctx.fillText(gravitationalPotential(gravityObjects[0], new Vec(n, m)).toFixed(1), n, m)
            //drawLineRel(n, m, ...calculateGravity(gravityObjects[0], new Vec(n, m)).scale(1000))
        }
    }
    dl.drawArrowRel(new Vec(300, 300), objects.map((o) => o.v.scale(o.mass)).reduce(Vec.add).scale(1 / 100), "white")
    let vectorStart = new Vec(300, 300)
    objects.map((o) => o.v.scale(o.mass / 100)).forEach((v) => {
        dl.drawArrowRel(vectorStart, v, "grey")
        vectorStart = vectorStart.add(v)
    }
    )
}

function doCollisions(o, oo, p) {
    let collisionDirection = (o.s.subtract(oo.s)).unit
    let mo = o.v.scale(o.mass)
    let moo = oo.v.scale(oo.mass)
    let frameOfReference = (mo.add(moo).scale(1 / (o.mass + oo.mass)))
    let impulse = frameOfReference.subtract(o.v).scale(o.mass * 2)
    if (impulse.dot(collisionDirection) > 0) {
        o.receiveImpulse(impulse, p)
        oo.receiveImpulse(impulse.scale(-1), p)
    }
}
function updatePhysics(dt) {
    objects.forEach((o, i) => {
        o.update(dt, calculateGravities(objects, o.s))
        o.checkBounds(500, 500)
        //o.applyGravity(gravityObjects[0], dt)
        if (o.ttl < 0) { objects.splice(i, 1) }
    }
    )
    objects.forEach((o, i) => {
        objects.forEach((oo, ii) => {
            if (o.isOneInside(oo.shape) && o != oo) {
                doCollisions(o, oo, o.whichOneIsInside(oo.shape))
            }
        })
    })
}
function update(t) {
    let itt = 5
    let dt = 0.05 / itt //(t - lastTime) / 50 //fix
    for (let i = 0; i < itt; i++) { updatePhysics(dt) }


    objects[0].accelerate(keyLog)
    draw()
    lastTime = t
    setTimeout(update, 1)
}
setTimeout(update, 1)



