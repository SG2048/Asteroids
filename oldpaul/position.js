let canvas = document.getElementById("gameWindow")
console.log("hi", canvas)

let x = 1, y = 1




let ctx = canvas.getContext("2d")

function draw(){
    ctx.clearRect(0,0,1000,1000)
    //console.log("hi", ctx)
    ctx.fillRect(x, y, 10, 10)
    //ctx.stroke()
}

document.addEventListener("keydown", keyListener)

function keyListener(e){
    console.log("key", e);
    if (e.key === "ArrowLeft") x -= 10;
    if (e.key === "ArrowRight") x += 10;
    if (e.key === "ArrowUp") y -= 10;
    if (e.key === "ArrowDown") y += 10;
    update()
}


function update(){
    console.log(x, y);
    x += 0; y += 0
    draw()
}

// setInterval(update, 1000)

// increment()

