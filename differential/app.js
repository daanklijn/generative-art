let cols = 30, rows = 30, height = 200, width = 200;
let scale = 10;
let x_min = -scale, x_max= scale, y_min= -scale, y_max= scale;
let x_width = x_max - y_min;
let y_height = y_max - y_min;
var paths = [];
pathLength = 400;
stepSize = 0.04;
gridSize = 40;
var t = 0;

var lines = [];

function setup() {
    for(x=x_min; x<x_max; x+=(x_width/gridSize)) {
        for (y = y_min; y < y_max; y +=(y_height/gridSize)) {
            let lin = new Line(x,y);
            lines.push(lin);
        }
    }
    var canv=createCanvas(height, width);
    // canv.hide();
    frameRate(22);
    createLoop({duration:3,gif:true});
}

function xToGrid(x){
    return (width/x_width)*(x-x_min);
}

function yToGrid(y){
    return (height/y_height)*(y-y_min);
}

function dy(x, y) {
    // Differential 2
    // return 4*Math.atan2(5*Math.sin(x),y)

    // Differential 4
    // return 2*Math.sin(x)*Math.cos(y)

    // Differential 5
    // return 10*Math.sin(x)

    // Differential 6
    // return Math.sqrt(x) + y*(x^2 + y^2)*Math.sin(Math.PI/(x^2 + y^2)^0.5)^2
    return x + y*(x^2 + y^2)*Math.sin(Math.PI/(x^2 + y^2)^0.5)
}

function dx(x, y) {
    // Differential 2
    // return 4*Math.atan2(5*Math.sin(y),x)

    // Differential 4
    // return 2*Math.sin(y)*Math.cos(x)

    // Differential 5
    // return 10*Math.sin(y^2)

    // Differential 6
    // return Math.sqrt(y) + x*(x^2 + y^2)*Math.sin(Math.PI/(x^2 + y^2)^0.5)^2
    return -y + x*(x^2 + y^2)*Math.sin(Math.PI/(x^2 + y^2)^0.5)
}

function draw() {
    background(0);
    noFill();
    stroke(255);
    for(var lin of lines)
    {
        lin.draw();
    }
    t++;
}

class Line{
    constructor(x,y){
        this.offset = random()*255;
        this.path = [];
        var x1 = x;
        var y1 = y;

        for (var i = 1; i < pathLength; i++) {
            // curveVertex(x1, y1);
            var ny1 = y1 + dy(x1, y1)*stepSize;
            var nx1 = x1 + dx(x1, y1)*stepSize;
            this.path.push([xToGrid(x1),yToGrid(y1),xToGrid(nx1),yToGrid(ny1)]);
            x1 = nx1;
            y1 = ny1;
        }
    }

    draw(){
        var color = this.offset;
        for(var lin of this.path){
            if(color < 0){
                color = 255;
            }
            stroke(color);
            line(...lin);
            color -= 10;
        }
        this.offset-=10;
        if(this.offset<0){
            this.offset=255;
        }
    }

}