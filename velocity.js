let canvas = document.getElementById("gameWindow")
let info = document.getElementById("info")
console.log("hi", canvas)

let x = 120, y = 120, dx = 0, dy = 0, lastTime = 0




let ctx = canvas.getContext("2d")

function draw(){
    ctx.clearRect(0,0,1000,1000)
    //console.log("hi", ctx)
    ctx.strokeRect(50, 50, 100, 100)
    ctx.fillRect(x, y, 10, 10)
    //ctx.stroke()
}

document.addEventListener("keydown", keyListener)

function keyListener(e){
    console.log("key", e);
    if (e.key === "ArrowLeft") dx -= 1;
    if (e.key === "ArrowRight") dx += 1;
    if (e.key === "ArrowUp") dy -= 1;
    if (e.key === "ArrowDown") dy += 1;
}

function checkBounds (){
if (x > 150) {dx = -dx}
if (x < 50) {dx = -dx}
if (y > 150) {dy = -dy}
if (y < 50) {dy = -dy}
}

// function update(){
//     console.log(x, y);
//     checkBounds()
//     x += dx; y += dy
//     draw()
// }

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

