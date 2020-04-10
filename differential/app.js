console.log("HI")
let cols = 30, rows = 30, height = 300, width = 300;
let x_min = -1, x_max= 1, y_min= -1, y_max= 1;
let x_width = x_max - y_min;
let y_height = y_max - y_min;
let pathLenght = 200;
var paths = [];

function xToInterval(x){
    return (Math.sin(x) - x_min)*(width/x_width);
}

function yToInterval(y){
    return (Math.sin(y) - y_min)*(height/y_height);
}

function setup() {
    var points = []
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            points.push([x_min + x * x_width/cols, y_min + y * y_height/rows])
        }
    }
    // points.push([1 * (y_height/rows, 2 * (x_width/cols))]);
    for (p of points) {
        path = {
            'path': [p],
            'offset': Math.floor(Math.random() * pathLenght)
        };
        x = p[0];
        y = p[1];
        for (i = 0; i < pathLenght; i++) {
            // d = diff(x, y);
            // dy = d/Math.sqrt(1+d**2);
            // dx = 1/Math.sqrt(1+d**2);
            dy1 = dy(x,y);
            dx1 = dx(x,y);

            dx2=dx1/Math.sqrt(dy1**2+dx1**2)*0.04;
            dy2=dy1/Math.sqrt(dy1**2+dx1**2)*0.04;

            x = x + dx2;
            y = y + dy2;
            path['path'].push([xToInterval(x),yToInterval(y)])
        }
        paths.push(path)
    }

    createCanvas(height, width);
}

function dy(x, y) {
    // return x + y*(x^2 + y^2)*Math.sin(Math.PI/(x^2 + y^2)^0.5)
    return x*y;
}

function dx(x, y) {
    // return -y + x*(x^2 + y^2)*Math.sin(Math.PI/(x^2 + y^2)^0.5)
    return x/y;
}

function draw() {
    background(0);
    for (path of paths) {
        offset = path['offset'];
        color = -100+offset*2;
        for (i = offset; i < pathLenght && i < offset + 40; i++) {
            stroke(color);
            color += 5;
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