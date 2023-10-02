let canvas = document.getElementById("simulationWindow")
console.log("hi", canvas)
let square = new SpaceObject(250, 250, 0, 0)
let rect = new SpaceObject(250, 250, 1, 1)
let lastTime = 0
document.addEventListener("keydown", keyListener)
let ctx = canvas.getContext("2d")
console.log("hello", ctx)
draw()


let a = new Vec(5,7)
let b = new Vec(4,2)
console.log(a.x , a, a.add(b))

function keyListener(e) {
console.log(e)
if(e.key==="ArrowUp")     square.accelerate(new Vec(0, -0.25))
if(e.key==="ArrowDown")     square.accelerate(new Vec(0, 0.25))
if(e.key==="ArrowRight")     square.accelerate(new Vec(0.25, 0))
if(e.key==="ArrowLeft")     square.accelerate(new Vec(-0.25, 0))
draw()
}

function draw() {
    ctx.fillStyle = "black"
    ctx.clearRect(0, 0, 500, 500)
    ctx.fillRect(square.s.x-50,square.s.y-50,100,100)
    ctx.fillStyle = "red"
    ctx.fillRect(square.s.x-550,square.s.y-550,100,100)
    ctx.strokeRect(0, 0, 500, 500)
    ctx.fillRect(rect.s.x-50, rect.s.y-5, 100, 10)
}

function update(t) {
//console.log(square.s, rect.s)
    let dt = (t-lastTime)/10000
//square.checkBounds()
//rect.checkBounds()
square.update(dt)
rect.update(dt)

//RectX += RectVelocityX*dt*0.01
draw()
requestAnimationFrame(update)
}
requestAnimationFrame(update)

//function checkBounds() {
    //if(sX < 0) {sX += 500}
    //if(sX > 490) {sX -= 510}
   // if(sY > 490) {sY -= 510}
    //if(sY < 0) {sY += 500}
//}