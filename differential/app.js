console.log("HI")
let cols = 30, rows = 30, height = 300, width = 300;
let x_min = -5, x_max= 5, y_min= -5, y_max= 5;
let pathLenght = 100;
var paths = [];

function xToInterval(x){
    stepSize = width/(x_max - x_min);
    return x_min + (x/stepSize);
}

function yToInterval(y){
    stepSize = height/(y_max - y_min);
    return y_min + (y/stepSize);
}

function setup() {
    var points = []
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            points.push([x * height/rows, y * width/cols])
        }
    }
    for (p of points) {
        path = {
            'path': [p],
            'offset': Math.floor(Math.random() * pathLenght)
        };
        x = p[0];
        y = p[1];
        for (i = 0; i < pathLenght; i++) {
            d = diff(xToInterval(x), yToInterval(y));
            angle = slopeToAngle(d);
            v = p5.Vector.fromAngle(angle, 1);
            x = x + v.x;
            y = y + v.y;
            path['path'].push([x, y])
        }
        paths.push(path)
    }

    createCanvas(height, width);
}

function diff(x, y) {
    return x/Math.sin(y);
}

function slopeToAngle(slope) {
    return atan(slope);
}


function draw() {
    background(0);
    for (path of paths) {
        offset = path['offset'];
        color = -100+offset*2;
        for (i = offset; i < pathLenght && i < offset + 20; i++) {
            stroke(color);
            color += 10;
            x = path['path'][i][0];
            y = path['path'][i][1];
            point(x, y);
        }
        path['offset']++;
        if(path['offset']>=pathLenght){
            path['offset']=0
        }
    }
}