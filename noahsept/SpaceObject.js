class SpaceObject {
    constructor(sX, sY, vX, vY) {
    this.s = new Vec(sX, sY)
    this.v = new Vec(vX, vY)
    
}
update(dt) {
    this.s = this.s.add(this.v.scale(dt)) 
    //this.vX = this.vX*0.9
    //this.vY = this.vY*0.9
    
}
//checkBounds() {
    //if(this.sX < 0) {this.sX += 500}
    //if(this.sX > 500) {this.sX -= 500}
   //if(this.sY > 500) {this.sY -= 500}
    //if(this.sY < 0) {this.sY += 500}
//}
accelerate(a) {
this.v = this.v.add(a) 
}
}