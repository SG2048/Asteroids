let canvas = document.getElementById("simulationWindow")
console.log("hi", canvas)
const triangleShape = [new Vec(0, -50), new Vec(-50, 50), new Vec(50, 50)]
const bulletShape = [new Vec(0, -20), new Vec(-5, 20), new Vec(5, 20)]
const asteroidShape = [new Vec(0, -50), new Vec(50, -20), new Vec(50, 20), new Vec(0, 50), new Vec(-50, 20), new Vec(-50, -20)]
let objects = [
    new SpaceObject(new Vec(250, 250), new Vec(0, 0), triangleShape),
    new SpaceObject(new Vec(450, 50), new Vec(0, 0), makeAsteroidShape(50, 4)),
    new SpaceObject(new Vec(50, 20), new Vec(0, 0), makeAsteroidShape(50, 6)),
    new SpaceObject(new Vec(350, 60), new Vec(0, 0), makeAsteroidShape(50, 10, 0.6, 0.2))
]
let lastTime = 0
let keyLog = {}
//document.addEventListener("keydown", keyListener)
document.addEventListener("keydown", (e) => { keyLog[e.key] = true })
document.addEventListener("keyup", (e) => { keyLog[e.key] = false })
let ctx = canvas.getContext("2d")
console.log("hello", ctx)
draw()

//console.log(objects[0].isInside(new Vec(240, 240)), objects[0].isInside(new Vec(30, 30)))
//console.log(a.subtract(new Vec(2, 2)))

//console.log(a.mag())



function keyListener(e) {
    objects[0].accelerate(e.key)
    draw()
}

function draw() {
    //const triangleShape = [[100, 100], [150, 150], [50, 150], [100, 100]]
    ctx.fillStyle = "black"
    ctx.clearRect(0, 0, 500, 500)
    //ctx.fillRect(square.s.x - 50, square.s.y - 50, 100, 100)
    //ctx.fillStyle = "red"
    //ctx.fillRect(square.s.x - 550, square.s.y - 550, 100, 100)
    ctx.strokeRect(0, 0, 500, 500)

    ctx.beginPath()

    function drawShape(s) {
        ctx.moveTo(s[0].x, s[0].y)
        s.forEach((p) => {
            //console.log(p.x, p)
            return ctx.lineTo(p.x, p.y)
        }
        )
        ctx.closePath()
        ctx.stroke()
    }
    //drawShape(triangleShape)
    objects.forEach((o) => drawShape(o.getShape()))
    objects.forEach((o, i) => {
        drawArrowRel(o.s, o.v.scale(20))
        //drawArrowRel(new Vec(100, 100), o.v.scale(5))
        //drawArrowRel(new Vec(50 * i, 200), o.v.scale(5))
    }
    )
    drawArrowRel(new Vec(100, 300), objects.map((o) => o.v).reduce((p, c) => p.add(c)).scale(5))
    let vectorStart = new Vec(300, 300)
    objects.map((o) => o.v.scale(20)).forEach((v) => {
    drawArrowRel(vectorStart, v)
    vectorStart = vectorStart.add(v)
    }
    )
}

function drawLineAbs(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.closePath()
    ctx.stroke()
}

function drawLineRel(x, y, dx, dy) {
    drawLineAbs(x, y, x + dx, y + dy)
}

function drawArrowRel(a, da) {
    const end = a.add(da)
    const side1 = da.unit().rotate(Math.PI * 3 / 4).scale(10)
    const side2 = da.unit().rotate(Math.PI * 5 / 4).scale(10)
    drawLineRel(a.x, a.y, da.x, da.y)
    drawLineRel(end.x, end.y, side1.x, side1.y)
    drawLineRel(end.x, end.y, side2.x, side2.y)
}

function update(t) {
    let vec = new Vec(0,0)
    // console.log(objects[0].convertLocalToGlobal(vec), objects[0].convertLocalToGlobal(vec) );
    let dt = (t - lastTime) / 50
    objects.forEach((o) => o.checkBounds(500, 500))
    objects.forEach((o) => o.update(dt))
    objects.forEach((o, i) => {
        if (o.ttl < 0) { objects.splice(i, 1) }
    }
    )
    objects.forEach((o, i) => {
        objects.forEach((oo, ii) => {
            if (o.isOneInside(oo.getShape()) && o != oo) {
                let collisionDirection = (o.s.subtract(oo.s)).unit()
                o.receiveImpulse(collisionDirection.scale(10))
                oo.receiveImpulse(collisionDirection.scale(10).scale(-1))
                //o.ttl = 0
                //oo.ttl = 0

            }
        })
    })
    //console.log(square.s)
    objects[0].accelerate(keyLog)
    //RectX += RectVelocityX*dt*0.01
    draw()
    lastTime = t
    requestAnimationFrame(update)
}
requestAnimationFrame(update)

function makeAsteroidShape(size, points, mult = 0.4, add = 0.8) {
    let angle = 0
    let p1 = new Vec(0, -size)
    let coords = [p1]
    for (let i = 1; i < points; i++) {
        angle = ((Math.PI * 2) / points) * i
        //console.log(angle)
        coords.push(p1.rotate(angle).scale(Math.random() * mult + add ))
        //console.log(coords)
    }
    return coords
}


