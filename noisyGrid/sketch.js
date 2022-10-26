var stepSize = 20;

function setup() {
    createCanvas(500, 500);
}
///////////////////////////////////////////////////////////////////////
function draw() {
    background(125);

    colorGrid();
    compassGrid();
}
///////////////////////////////////////////////////////////////////////
function colorGrid() {
    noStroke();
    let from = color(255, 0, 0);
    let to = color(0, 0, 255);
    let interA = lerpColor(from, to, 0.33);
    let interB = lerpColor(from, to, 0.66);
    var scale = 1 / (50 + mouseX * 2);

    for (var x = 0; x < 25; ++x) {
        for (var y = 0; y < 25; ++y) {
            nX = noise(frameCount / 100);
            nY = noise(frameCount / 100);
            fill(
                lerpColor(from, to, noise(x / 25, y / 25, frameCount * scale))
            );
            rect(stepSize * x, stepSize * y, stepSize, stepSize);
        }
    }
    // your code here
}
///////////////////////////////////////////////////////////////////////
function compassGrid() {
    stroke(0);
    var speed = 1 / (1000 + mouseX * 100);
    translate(12.5, 12.5);

    for (var x = 0; x < 25; ++x) {
        for (var y = 0; y < 25; ++y) {
            push();
            translate(x * stepSize, y * stepSize);
            rotate(
                map(noise(x / 250, y / 250, frameCount * speed), 0, 1, 0, 360)
            );
            line(0, 0, stepSize, 0);
            pop();
            // your code here
        }
    }
}
