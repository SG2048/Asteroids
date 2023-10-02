let canvas = document.getElementById("gameWindow")
let info = document.getElementById("info")
console.log("hi", canvas)

let square = new Square(100, 100, 10, 10)




let ctx = canvas.getContext("2d")

function draw(){
    ctx.clearRect(0,0,1000,1000)
    //console.log("hi", ctx)
    ctx.strokeRect(50, 50, 100, 100)
    ctx.fillRect(square.s.x, square.s.y, 10, 10)
    //ctx.stroke()
}

document.addEventListener("keydown", keyListener)

function keyListener(e){
    console.log("key", e);
    if (e.key === "ArrowLeft") square.accelerate(new Vec);
    if (e.key === "ArrowRight") square.s.x += 1;
    if (e.key === "ArrowUp") square.v.y -= 1;
    if (e.key === "ArrowDown") square.v.y += 1;
}

function checkBounds (){
if (x > 150) {dx = -dx}
if (x < 50) {dx = -dx}
if (y > 150) {dy = -dy}
if (y < 50) {dy = -dy}
}

function update(){
    console.log(x, y);
    checkBounds()
    x += dx; y += dy
    draw()
}

 //setInterval(update, 100)

 function update(t){
    dt = t - lastTime
    console.log(x, y, dx, dy, dt);
    checkBounds()
    x += dx*dt/500; y += dy*dt/500
    draw()
    lastTime = t
    requestAnimationFrame(update)


}

 requestAnimationFrame(update)

// increment()

